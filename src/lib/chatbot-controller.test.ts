import { describe, expect, it, vi } from 'vitest';

import { ChatController, type ChatControllerDependencies } from './chatbot-controller';

const session = {
  sessionId: '123e4567-e89b-12d3-a456-426614174000',
  token: 'a'.repeat(40),
  expiresAt: '2099-01-01T00:00:00Z'
};

function setup() {
  const api: ChatControllerDependencies = {
    create: vi.fn().mockResolvedValue(session),
    send: vi.fn().mockResolvedValue('What kind of flooring do you prefer?'),
    remove: vi.fn().mockResolvedValue(undefined)
  };
  return { controller: new ChatController(api), api };
}

describe('opt-in chat controller', () => {
  it('does not contact the backend without explicit consent', async () => {
    const { controller, api } = setup();
    expect(controller.state).toBe('idle');
    await expect(controller.start(false)).rejects.toThrow('consent');
    expect(api.create).not.toHaveBeenCalled();
    await expect(controller.send('Hi')).rejects.toThrow('not ready');
  });

  it('creates, sends, and deletes only after opt-in', async () => {
    const { controller, api } = setup();
    await controller.start(true);
    expect(controller.state).toBe('ready');
    expect(await controller.send('Hi')).toContain('flooring');
    await controller.close();
    expect(controller.state).toBe('closed');
    expect(api.create).toHaveBeenCalledTimes(1);
    expect(api.send).toHaveBeenCalledWith(session, 'Hi', expect.any(AbortSignal));
    expect(api.remove).toHaveBeenCalledWith(session);
    await controller.close();
    expect(api.remove).toHaveBeenCalledTimes(1);
  });

  it('rejects overlapping messages', async () => {
    const { controller, api } = setup();
    let resolve!: (value: string) => void;
    vi.mocked(api.send).mockImplementationOnce(() => new Promise((r) => { resolve = r; }));
    await controller.start(true);
    const first = controller.send('first');
    await expect(controller.send('second')).rejects.toThrow('not ready');
    resolve('Reply');
    expect(await first).toBe('Reply');
    expect(controller.state).toBe('ready');
  });

  it('does not expose a late response after closing', async () => {
    const { controller, api } = setup();
    let resolve!: (value: string) => void;
    vi.mocked(api.send).mockImplementationOnce(() => new Promise((r) => { resolve = r; }));
    await controller.start(true);
    const reply = controller.send('Hi');
    const closing = controller.close();
    resolve('Late reply');
    await expect(reply).rejects.toThrow('closed');
    await closing;
    expect(api.remove).toHaveBeenCalledWith(session);
    expect(controller.state).toBe('closed');
  });

  it('deletes a session created while close is requested', async () => {
    const { controller, api } = setup();
    let resolve!: (value: typeof session) => void;
    vi.mocked(api.create).mockImplementationOnce(() => new Promise((r) => { resolve = r; }));
    const starting = controller.start(true);
    const closing = controller.close();
    resolve(session);
    await starting;
    await closing;
    expect(api.remove).toHaveBeenCalledWith(session);
    expect(controller.state).toBe('closed');
  });

  it('closes locally even if backend deletion fails', async () => {
    const { controller, api } = setup();
    vi.mocked(api.remove).mockRejectedValueOnce(new Error('Network unavailable'));
    await controller.start(true);
    await expect(controller.close()).rejects.toThrow('Network unavailable');
    expect(controller.state).toBe('closed');
  });
});
