'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

import { ChatController } from '@/lib/chatbot-controller';

type Message = { id: number; role: 'visitor' | 'assistant'; text: string };

/**
 * Standalone opt-in UI. Intentionally not mounted in the production layout.
 * No session is created until the visitor explicitly accepts the disclosure.
 */
export function VcareAiChatPanel() {
  const controller = useRef<ChatController | null>(null);
  const nextId = useRef(0);
  const [status, setStatus] = useState<'consent' | 'connecting' | 'ready' | 'sending' | 'closed'>('consent');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');
  const [deletionWarning, setDeletionWarning] = useState('');

  useEffect(() => {
    return () => {
      const active = controller.current;
      controller.current = null;
      if (active) void active.close().catch(() => {
        // Unmount cannot display a warning; backend expiry remains the fallback.
      });
    };
  }, []);

  async function accept() {
    if (status !== 'consent') return;
    const active = new ChatController();
    controller.current = active;
    setError('');
    setStatus('connecting');
    try {
      await active.start(true);
      if (controller.current === active) setStatus('ready');
    } catch {
      if (controller.current === active) {
        controller.current = null;
        setStatus('consent');
        setError('Unable to start a private chat right now. Please try again later.');
      }
    }
  }

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const active = controller.current;
    const text = draft.trim();
    if (!active || status !== 'ready' || !text || text.length > 2000) return;
    nextId.current += 1;
    const messageId = nextId.current;
    setMessages((current) => [...current, { id: messageId, role: 'visitor', text }]);
    setDraft('');
    setError('');
    setStatus('sending');
    try {
      const reply = await active.send(text);
      if (controller.current !== active) return;
      nextId.current += 1;
      setMessages((current) => [...current, { id: nextId.current, role: 'assistant', text: reply }]);
    } catch {
      if (controller.current === active) {
        // Preserve the visitor's message for retry instead of silently losing it.
        // Remove the optimistic bubble so retry will not duplicate it.
        setMessages((current) => current.filter((message) => message.id !== messageId));
        setDraft((current) => current || text);
        setError('The assistant could not reply. Your message is ready to retry.');
      }
    } finally {
      if (controller.current === active) setStatus('ready');
    }
  }

  async function close() {
    const active = controller.current;
    controller.current = null;
    setStatus('closed');
    setDraft('');
    setMessages([]);
    setError('');
    if (!active) return;
    try {
      await active.close();
    } catch {
      setDeletionWarning('We could not confirm server-side deletion. Your session will expire automatically.');
    }
  }

  if (status === 'closed') {
    return (
      <section aria-label="Vcare AI chat closed">
        <p>Chat closed. Messages have been cleared from this page.</p>
        {deletionWarning && <p role="alert">{deletionWarning}</p>}
      </section>
    );
  }

  return (
    <section aria-labelledby="vcare-ai-chat-title" className="vcare-ai-chat-panel">
      <h2 id="vcare-ai-chat-title">Vcare AI flooring assistant</h2>
      {status === 'consent' ? (
        <div>
          <p>
            If you start a chat, your messages will be sent to Vcare’s AI backend
            and its configured AI model provider to generate responses. Please
            avoid sharing sensitive personal information. Responses may be
            inaccurate; confirm product details, pricing and availability with Vcare.
          </p>
          <p>
            You can end the session and request deletion at any time. If deletion
            cannot be confirmed, the backend’s expiry policy applies.
          </p>
          <button type="button" onClick={accept}>I understand — start AI chat</button>
          {error && <p role="alert">{error}</p>}
        </div>
      ) : (
        <div>
          <div role="log" aria-live="polite" aria-label="AI chat messages" aria-relevant="additions">
            {messages.map((message) => (
              <p key={message.id}>
                <strong>{message.role === 'visitor' ? 'You' : 'AI assistant'}:</strong> {message.text}
              </p>
            ))}
          </div>
          <p role="status" aria-live="polite">
            {status === 'connecting' ? 'Connecting securely…' :
              status === 'sending' ? 'Preparing a response…' : 'Ready to help with flooring questions.'}
          </p>
          {error && <p role="alert">{error}</p>}
          <form onSubmit={send}>
            <label htmlFor="vcare-ai-chat-message">Your message</label>
            <input
              id="vcare-ai-chat-message"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={2000}
              autoComplete="off"
              disabled={status !== 'ready'}
            />
            <button type="submit" disabled={status !== 'ready' || !draft.trim()}>
              Send message
            </button>
          </form>
          <button type="button" onClick={() => void close()}>
            End chat and request deletion
          </button>
        </div>
      )}
    </section>
  );
}
