import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  createChatSession,
  deleteChatSession,
  parseSession,
  sendChatMessage
} from './chatbot-session';

const sessionId = '123e4567-e89b-12d3-a456-426614174000';
const token = 'a'.repeat(40);
const expires_at = '2099-01-01T00:00:00Z';
const session = { sessionId, token, expiresAt: expires_at };

afterEach(() => vi.unstubAllGlobals());

describe('chat session validation', () => {
  it('parses an authenticated session', () => {
    expect(parseSession({ session_id: sessionId, token, expires_at })).toEqual(session);
  });

  it('rejects expired or malformed credentials', () => {
    expect(() => parseSession({ session_id: sessionId, token, expires_at: '2020-01-01' })).toThrow();
    expect(() => parseSession({ session_id: 'bad', token, expires_at })).toThrow();
    expect(() => parseSession({ session_id: sessionId, token: '', expires_at })).toThrow();
  });
});

describe('same-origin session lifecycle', () => {
  it('creates a session only when explicitly invoked', async () => {
    const mock = vi.fn().mockResolvedValue({
      ok: true, json: async () => ({ session_id: sessionId, token, expires_at })
    });
    vi.stubGlobal('fetch', mock);
    expect(await createChatSession()).toEqual(session);
    expect(mock).toHaveBeenCalledWith('/api/v1/chat/sessions', expect.objectContaining({
      method: 'POST', cache: 'no-store', credentials: 'same-origin'
    }));
  });

  it('sends authorized messages and validates session identity', async () => {
    const mock = vi.fn().mockResolvedValue({
      ok: true, json: async () => ({ reply: 'How large is your room?', session_id: sessionId })
    });
    vi.stubGlobal('fetch', mock);
    expect(await sendChatMessage(session, '  Hello  ')).toBe('How large is your room?');
    expect(mock).toHaveBeenCalledWith(
      '/api/v1/chat/sessions/' + sessionId + '/messages',
      expect.objectContaining({
        method: 'POST', body: JSON.stringify({ message: 'Hello' }),
        headers: expect.objectContaining({ Authorization: 'Bearer ' + token })
      })
    );
    mock.mockResolvedValueOnce({
      ok: true, json: async () => ({ reply: 'Wrong session', session_id: 'other' })
    });
    await expect(sendChatMessage(session, 'Hi')).rejects.toThrow('Invalid chat reply');
  });

  it('rejects blank messages before network activity', async () => {
    const mock = vi.fn();
    vi.stubGlobal('fetch', mock);
    await expect(sendChatMessage(session, '   ')).rejects.toThrow();
    expect(mock).not.toHaveBeenCalled();
  });

  it('deletes a session with bearer auth', async () => {
    const mock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', mock);
    await deleteChatSession(session);
    expect(mock).toHaveBeenCalledWith(
      '/api/v1/chat/sessions/' + sessionId,
      expect.objectContaining({
        method: 'DELETE', credentials: 'same-origin',
        headers: expect.objectContaining({ Authorization: 'Bearer ' + token })
      })
    );
  });
  it('rejects malformed in-memory bearer credentials before any network request', async () => {
    const mock = vi.fn();
    vi.stubGlobal('fetch', mock);
    const malformed = [
      '',
      'short',
      'a'.repeat(257),
      'a'.repeat(24) + '\\r\\nX-Injected: value',
      'a'.repeat(24) + ' space',
      'a'.repeat(24) + '.'
    ];
    for (const badToken of malformed) {
      const invalid = { ...session, token: badToken };
      await expect(sendChatMessage(invalid, 'Hello')).rejects.toThrow('invalid');
      await expect(deleteChatSession(invalid)).rejects.toThrow('Invalid chat session');
    }
    expect(mock).not.toHaveBeenCalled();
  });

});
