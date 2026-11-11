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
  const sending = useRef(false);
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
    // React state updates are asynchronous; the ref prevents rapid repeated
    // consent clicks from creating multiple backend sessions.
    if (status !== 'consent' || controller.current !== null) return;
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
    if (!active || status !== 'ready' || sending.current || !text || text.length > 2000) return;
    // Set synchronously before React commits the sending state.
    sending.current = true;
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
      if (controller.current === active) {
        sending.current = false;
        setStatus('ready');
      }
    }
  }

  async function close() {
    const active = controller.current;
    controller.current = null;
    sending.current = false;
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
      <section aria-label="Vcare AI chat closed" className="vcare-ai-chat-panel vcare-ai-chat-closed">
        <div className="vcare-ai-chat-closed-message">
          <span className="vcare-chat-mark" aria-hidden="true">V</span>
          <h2>Chat closed.</h2>
          <p>Messages have been cleared from this page.</p>
          {deletionWarning && <p role="alert">{deletionWarning}</p>}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="vcare-ai-chat-title" className="vcare-ai-chat-panel">
      <header className="vcare-chat-header vcare-ai-chat-header">
        <div className="vcare-chat-brand">
          <span className="vcare-chat-mark" aria-hidden="true">V</span>
          <div>
            <span className="vcare-chat-eyebrow">VCARE FLOORING · AI ASSISTANT</span>
            <h2 id="vcare-ai-chat-title">A little help to get started.</h2>
          </div>
        </div>
      </header>
      <div className="vcare-ai-chat-content">
        {status === 'consent' ? (
          <div className="vcare-ai-chat-consent">
            <p className="vcare-ai-chat-welcome">How can we help with your floors?</p>
            <p>
              Starting shares your messages with Vcare and its configured AI model provider. Avoid sharing sensitive information; AI may be inaccurate. You can end the chat and request deletion, with unconfirmed sessions subject to the backend’s expiry policy.
            </p>
            <button className="vcare-ai-chat-primary" type="button" onClick={accept}>I understand — start AI chat</button>
            {error && <p role="alert">{error}</p>}
          </div>
        ) : (
          <div className="vcare-ai-chat-conversation">
            <div className="vcare-ai-chat-messages" role="log" aria-live="polite" aria-label="AI chat messages" aria-relevant="additions">
              {messages.map((message) => (
                <p className={`vcare-ai-chat-message vcare-ai-chat-message-${message.role}`} key={message.id}>
                  <strong>{message.role === 'visitor' ? 'You' : 'AI assistant'}:</strong> {message.text}
                </p>
              ))}
            </div>
            <p className="vcare-ai-chat-status" role="status" aria-live="polite">
              {status === 'connecting' ? 'Connecting securely…' :
                status === 'sending' ? 'Preparing a response…' : 'Ready to help with flooring questions.'}
            </p>
            {error && <p className="vcare-ai-chat-error" role="alert">{error}</p>}
            <form className="vcare-ai-chat-form" onSubmit={send}>
              <label htmlFor="vcare-ai-chat-message">Your message</label>
              <input
                id="vcare-ai-chat-message"
                className="vcare-ai-chat-input"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={2000}
                autoComplete="off"
                disabled={status !== 'ready'}
              />
              <button className="vcare-ai-chat-primary" type="submit" disabled={status !== 'ready' || !draft.trim()}>
                Send message
              </button>
            </form>
            <button className="vcare-ai-chat-end" type="button" onClick={() => void close()}>
              End chat and request deletion
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
