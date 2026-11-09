/**
 * Opt-in, in-memory browser session client for the authenticated FastAPI API.
 * Not connected to the public demo widget; no browser storage or auto-start.
 */
const SESSION_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const API = '/api/v1/chat/sessions';

export type ChatSession = {
  sessionId: string;
  token: string;
  expiresAt: string;
};

export type ChatReply = { reply: string; session_id: string };

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Invalid chat response');
  }
  return value as Record<string, unknown>;
}

function validSessionId(value: string): boolean {
  return SESSION_ID.test(value);
}

export function parseSession(value: unknown): ChatSession {
  const data = record(value);
  if (
    typeof data.session_id !== 'string' ||
    !validSessionId(data.session_id) ||
    typeof data.token !== 'string' ||
    !/^[A-Za-z0-9_-]{24,256}$/.test(data.token) ||
    typeof data.expires_at !== 'string' ||
    !Number.isFinite(Date.parse(data.expires_at)) ||
    Date.parse(data.expires_at) <= Date.now()
  ) {
    throw new Error('Invalid chat session response');
  }
  return {
    sessionId: data.session_id,
    token: data.token,
    expiresAt: data.expires_at
  };
}

function assertSession(session: ChatSession): void {
  if (
    !validSessionId(session.sessionId) ||
    !session.token ||
    !Number.isFinite(Date.parse(session.expiresAt)) ||
    Date.parse(session.expiresAt) <= Date.now()
  ) {
    throw new Error('Chat session expired or invalid');
  }
}

function requestHeaders(session: ChatSession): HeadersInit {
  return {
    Authorization: 'Bearer ' + session.token,
    Accept: 'application/json'
  };
}

export async function createChatSession(signal?: AbortSignal): Promise<ChatSession> {
  const response = await fetch(API, {
    method: 'POST',
    cache: 'no-store',
    credentials: 'same-origin',
    headers: { Accept: 'application/json' },
    signal
  });
  if (!response.ok) throw new Error('Chat session unavailable');
  return parseSession(await response.json());
}

export async function sendChatMessage(
  session: ChatSession,
  message: string,
  signal?: AbortSignal
): Promise<string> {
  assertSession(session);
  const cleaned = message.trim();
  if (!cleaned || cleaned.length > 2000) throw new Error('Invalid chat message');
  const response = await fetch(
    API + '/' + encodeURIComponent(session.sessionId) + '/messages',
    {
      method: 'POST',
      headers: { ...requestHeaders(session), 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: cleaned }),
      credentials: 'same-origin',
      cache: 'no-store',
      signal
    }
  );
  if (!response.ok) throw new Error('Chat response unavailable');
  const data = record(await response.json());
  if (
    data.session_id !== session.sessionId ||
    typeof data.reply !== 'string' ||
    !data.reply.trim() ||
    data.reply.length > 10000
  ) {
    throw new Error('Invalid chat reply');
  }
  return data.reply;
}

export async function deleteChatSession(
  session: ChatSession,
  signal?: AbortSignal
): Promise<void> {
  if (!validSessionId(session.sessionId) || !session.token) {
    throw new Error('Invalid chat session');
  }
  const response = await fetch(API + '/' + encodeURIComponent(session.sessionId), {
    method: 'DELETE',
    headers: requestHeaders(session),
    credentials: 'same-origin',
    cache: 'no-store',
    signal
  });
  if (!response.ok) throw new Error('Chat deletion unavailable');
}

/**
 * Caller owns lifecycle: do not persist the returned credentials.
 * Closing a widget must invoke deletion where possible; backend TTL remains
 * the fallback for network failures or abrupt tab closure.
 */
