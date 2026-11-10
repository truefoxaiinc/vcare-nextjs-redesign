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
  it('shares a single deletion attempt across concurrent close calls', async () => {
    const { controller, api } = setup();
    let resolveDelete!: () => void;
    vi.mocked(api.remove).mockImplementationOnce(
      () => new Promise<void>((resolve) => { resolveDelete = resolve; })
    );
    await controller.start(true);
    const first = controller.close();
    const second = controller.close();
    expect(second).toBe(first);
    expect(controller.state).toBe('closing');
    expect(api.remove).toHaveBeenCalledTimes(1);
    resolveDelete();
    await Promise.all([first, second]);
    expect(controller.state).toBe('closed');
    expect(api.remove).toHaveBeenCalledTimes(1);
  });

  it('shares deletion failure with every concurrent close caller', async () => {
    const { controller, api } = setup();
    vi.mocked(api.remove).mockRejectedValueOnce(new Error('Delete unavailable'));
    await controller.start(true);
    const first = controller.close();
    const second = controller.close();
    expect(first).toBe(second);
    await expect(first).rejects.toThrow('Delete unavailable');
    await expect(second).rejects.toThrow('Delete unavailable');
    expect(api.remove).toHaveBeenCalledTimes(1);
    expect(controller.state).toBe('closed');
  });

  it('waits for a late session creation only once during concurrent close', async () => {
    const { controller, api } = setup();
    let resolveCreate!: (value: typeof session) => void;
    vi.mocked(api.create).mockImplementationOnce(
      () => new Promise((resolve) => { resolveCreate = resolve; })
    );
    const starting = controller.start(true);
    const first = controller.close();
    const second = controller.close();
    expect(first).toBe(second);
    resolveCreate(session);
    await starting;
    await Promise.all([first, second]);
    expect(api.remove).toHaveBeenCalledTimes(1);
    expect(controller.state).toBe('closed');
  });

});
