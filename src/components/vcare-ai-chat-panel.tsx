'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

import { ChatController } from '@/lib/chatbot-controller';

type Message = { id: number; role: 'visitor' | 'assistant'; text: string };
const suggestions = ['Help me choose flooring for a kitchen', 'Compare vinyl and laminate', 'How do I request a quote?'];

/**
 * Opt-in UI. No session is created until the visitor explicitly accepts the disclosure.
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
          <div className="vcare-ai-chat-brand-copy">
            <h2 id="vcare-ai-chat-title">Vcare Flooring</h2>
            <p>AI flooring assistant</p>
          </div>
        </div>
      </header>
      <div className="vcare-ai-chat-content">
        {status === 'consent' ? (
          <div className="vcare-ai-chat-consent">
            <div className="vcare-ai-chat-intro">
              <span className="vcare-ai-chat-intro-mark" aria-hidden="true">V</span>
              <div>
                <span className="vcare-ai-chat-eyebrow">WELCOME</span>
                <p className="vcare-ai-chat-welcome">Let’s find the right floor for your space.</p>
              </div>
            </div>
            <div className="vcare-ai-chat-disclosure">
              <svg aria-hidden="true" viewBox="0 0 20 20" width="17" height="17">
                <path d="M5.5 8V6.2a4.5 4.5 0 0 1 9 0V8m-10 0h11v9h-11z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="10" cy="12" r="1" fill="currentColor" />
              </svg>
              <p>Starting shares your messages with Vcare and its configured AI model provider. Avoid sharing sensitive information. AI responses can be inaccurate; verify product details and quotes with our team. You can end the chat and request deletion.</p>
            </div>
            <button className="vcare-ai-chat-primary" type="button" onClick={accept}>
              Start a conversation
              <svg aria-hidden="true" viewBox="0 0 20 20" width="17" height="17">
                <path d="M3.5 10h12m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {error && <p role="alert">{error}</p>}
          </div>
        ) : (
          <div className="vcare-ai-chat-conversation">
            <div className="vcare-ai-chat-messages" role="log" aria-live="polite" aria-label="AI chat messages" aria-relevant="additions">
              {messages.length === 0 && (
                <div className="vcare-ai-chat-welcome-message">
                  <span className="vcare-ai-chat-message-mark" aria-hidden="true">V</span>
                  <div className="vcare-ai-chat-message vcare-ai-chat-message-assistant">
                    <strong>Vcare AI</strong>
                    <p>Hi! Tell me about your room or project, and I’ll help you explore flooring options.</p>
                  </div>
                </div>
              )}
              {messages.map((message) => (
                <article className={`vcare-ai-chat-message-row vcare-ai-chat-message-row-${message.role}`} key={message.id}>
                  {message.role === 'assistant' && <span className="vcare-ai-chat-message-mark" aria-hidden="true">V</span>}
                  <div className={`vcare-ai-chat-message vcare-ai-chat-message-${message.role}`}>
                    <strong>{message.role === 'visitor' ? 'You' : 'Vcare AI'}</strong>
                    <p>{message.text}</p>
                  </div>
                </article>
              ))}
              {messages.length === 0 && (
                <div className="vcare-ai-chat-suggestions" aria-label="Suggested questions">
                  {suggestions.map((suggestion) => (
                    <button className="vcare-ai-chat-suggestion" type="button" key={suggestion} onClick={() => setDraft(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="vcare-ai-chat-status" role="status" aria-live="polite">
              {status === 'connecting' ? 'Connecting securely…' :
                status === 'sending' ? 'Vcare AI is replying…' : 'Ready to help'}
            </p>
            {error && <p className="vcare-ai-chat-error" role="alert">{error}</p>}
            <form className="vcare-ai-chat-form" onSubmit={send}>
              <label className="vcare-ai-chat-sr-only" htmlFor="vcare-ai-chat-message">Your message</label>
              <div className="vcare-ai-chat-composer">
                <input
                  id="vcare-ai-chat-message"
                  className="vcare-ai-chat-input"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  maxLength={2000}
                  placeholder="Ask a flooring question..."
                  autoComplete="off"
                  disabled={status !== 'ready'}
                />
                <button className="vcare-ai-chat-send" type="submit" aria-label="Send message" disabled={status !== 'ready' || !draft.trim()}>
                  <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
                    <path d="M3 10h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
            <div className="vcare-ai-chat-footer">
              <span>AI can make mistakes. Verify product details with Vcare.</span>
              <button className="vcare-ai-chat-end" type="button" onClick={() => void close()}>End chat</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
