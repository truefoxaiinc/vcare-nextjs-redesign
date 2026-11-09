import { createChatSession, deleteChatSession, sendChatMessage, type ChatSession } from './chatbot-session';

/**
 * Inactive, opt-in controller for future UI integration.
 * A controller instance holds credentials only in memory.
 */
export type ChatControllerState = 'idle' | 'connecting' | 'ready' | 'sending' | 'closing' | 'closed';
export type ChatControllerDependencies = {
  create: typeof createChatSession;
  send: typeof sendChatMessage;
  remove: typeof deleteChatSession;
};

const defaultDependencies: ChatControllerDependencies = {
  create: createChatSession,
  send: sendChatMessage,
  remove: deleteChatSession
};

export class ChatController {
  private stateValue: ChatControllerState = 'idle';
  private session: ChatSession | null = null;
  private operation: AbortController | null = null;
  private closeRequested = false;
  private pending: Promise<unknown> | null = null;

  constructor(private readonly api: ChatControllerDependencies = defaultDependencies) {}

  get state(): ChatControllerState {
    return this.stateValue;
  }

  /** A deliberate user opt-in is required before any network call. */
  async start(consented: boolean): Promise<void> {
    if (!consented) throw new Error('Explicit chat consent required');
    if (this.stateValue !== 'idle') throw new Error('Chat already started');
    this.stateValue = 'connecting';
    const operation = new AbortController();
    this.operation = operation;
    const pending = this.api.create(operation.signal);
    this.pending = pending;
    try {
      const session = await pending;
      this.session = session;
      if (this.closeRequested) return;
      this.stateValue = 'ready';
    } catch (error) {
      if (!this.closeRequested) this.stateValue = 'idle';
      throw error;
    } finally {
      if (this.operation === operation) this.operation = null;
      if (this.pending === pending) this.pending = null;
    }
  }

  async send(message: string): Promise<string> {
    if (this.stateValue !== 'ready' || !this.session || this.closeRequested) {
      throw new Error('Chat session is not ready');
    }
    this.stateValue = 'sending';
    const operation = new AbortController();
    this.operation = operation;
    const pending = this.api.send(this.session, message, operation.signal);
    this.pending = pending;
    try {
      const reply = await pending;
      if (this.closeRequested) throw new Error('Chat has been closed');
      return reply;
    } finally {
      if (this.operation === operation) this.operation = null;
      if (this.pending === pending) this.pending = null;
      if (!this.closeRequested) this.stateValue = 'ready';
    }
  }

  /**
   * Abort outstanding work and attempt backend deletion.
   * Idempotent; closing before session creation waits for creation to settle.
   * Backend TTL is the fallback if deletion fails.
   */
  async close(): Promise<void> {
    if (this.stateValue === 'closed') return;
    if (this.closeRequested) throw new Error('Chat close already in progress');
    this.closeRequested = true;
    this.stateValue = 'closing';
    this.operation?.abort();
    try {
      if (this.pending) {
        try { await this.pending; } catch { /* cancellation or network failure */ }
      }
      const session = this.session;
      this.session = null;
      if (session) await this.api.remove(session);
    } finally {
      this.stateValue = 'closed';
      this.operation = null;
      this.pending = null;
    }
  }
}
