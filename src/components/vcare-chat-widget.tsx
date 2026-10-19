'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';

type Message = {
  id: number;
  role: 'visitor' | 'demo';
  text: string;
};

const suggestions = [
  'What flooring can I browse?',
  'How do I request a quote?',
  'How can I contact Vcare?'
];

const demoReply =
  'This is a demo reply, not live AI or Vcare support. I can’t verify current prices, availability, or product specifications. Please use the links below or contact Vcare for confirmed information.';

export function VcareChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isReplyPending, setIsReplyPending] = useState(false);
  const nextMessageId = useRef(0);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpen.current) {
        launcherRef.current?.focus();
        wasOpen.current = false;
      }
      return;
    }

    wasOpen.current = true;
    inputRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isReplyPending) return;

    const timeout = window.setTimeout(() => {
      nextMessageId.current += 1;
      setMessages((current) => [
        ...current,
        { id: nextMessageId.current, role: 'demo', text: demoReply }
      ]);
      setIsReplyPending(false);
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [isReplyPending]);

  useEffect(() => {
    if (isOpen && !isReplyPending && messages.length > 0) {
      inputRef.current?.focus();
    }
  }, [isOpen, isReplyPending, messages.length]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isReplyPending]);

  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null;

  function sendMessage(text: string) {
    const cleaned = text.trim();
    if (!cleaned || isReplyPending) return;

    nextMessageId.current += 1;
    setMessages((current) => [
      ...current,
      { id: nextMessageId.current, role: 'visitor', text: cleaned }
    ]);
    setDraft('');
    setIsReplyPending(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(draft);
  }

  return (
    <div className="vcare-chat-widget">
      {isOpen ? (
        <section
          className="vcare-chat-panel"
          id="vcare-chat-panel"
          aria-labelledby="vcare-chat-title"
          aria-describedby="vcare-chat-disclaimer"
        >
          <header className="vcare-chat-header">
            <div className="vcare-chat-brand">
              <span className="vcare-chat-mark" aria-hidden="true">V</span>
              <div>
                <span className="vcare-chat-eyebrow">VCARE FLOORING</span>
                <h2 id="vcare-chat-title">A little help to get started.</h2>
              </div>
            </div>
            <button
              className="vcare-chat-close"
              type="button"
              aria-label="Close Vcare chat demo"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
                <path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </button>
          </header>

          <div className="vcare-chat-disclaimer" id="vcare-chat-disclaimer">
            Demo only · not connected to live support
          </div>

          <div
            className="vcare-chat-messages"
            ref={messageListRef}
            role="log"
            aria-label="Chat demo messages"
            aria-live="polite"
            aria-relevant="additions"
            aria-busy={isReplyPending}
          >
            {messages.length === 0 ? (
              <div className="vcare-chat-welcome">
                <p className="vcare-chat-welcome-title">Welcome to Vcare.</p>
                <p>What would you like to explore?</p>
                <div className="vcare-chat-suggestions" aria-label="Suggested demo questions">
                  {suggestions.map((suggestion) => (
                    <button
                      className="vcare-chat-suggestion"
                      type="button"
                      key={suggestion}
                      onClick={() => sendMessage(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="vcare-chat-thread">
                {messages.map((message) => (
                  <article
                    className={'vcare-chat-message vcare-chat-message-' + message.role}
                    key={message.id}
                  >
                    <span className="vcare-chat-message-label">
                      {message.role === 'visitor' ? 'You' : 'Demo response'}
                    </span>
                    <p>{message.text}</p>
                    {message.role === 'demo' && (
                      <nav className="vcare-chat-links" aria-label="Vcare website links">
                        <Link href="/products">Browse products</Link>
                        <Link href="/get-a-quote">Request a quote</Link>
                        <Link href="/contact-us">Contact Vcare</Link>
                      </nav>
                    )}
                  </article>
                ))}
                {isReplyPending && (
                  <p className="vcare-chat-loading" role="status">
                    Preparing a demo response…
                  </p>
                )}
              </div>
            )}
          </div>

          <form className="vcare-chat-form" onSubmit={handleSubmit}>
            <label className="vcare-chat-input-label" htmlFor="vcare-chat-input">
              Your message
            </label>
            <div className="vcare-chat-input-row">
              <input
                id="vcare-chat-input"
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                maxLength={500}
                placeholder="Type a question…"
                autoComplete="off"
                disabled={isReplyPending}
              />
              <button
                className="vcare-chat-send"
                type="submit"
                aria-label="Send demo message"
                disabled={!draft.trim() || isReplyPending}
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
                  <path d="M3 10h13m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <p className="vcare-chat-form-note">Messages stay in this demo and are not sent.</p>
          </form>
        </section>
      ) : (
        <button
          className="vcare-chat-launcher"
          ref={launcherRef}
          type="button"
          aria-label="Open Vcare chat demo"
          aria-expanded={false}
          aria-controls="vcare-chat-panel"
          onClick={() => setIsOpen(true)}
        >
          <svg aria-hidden="true" viewBox="0 0 28 28" width="25" height="25">
            <path d="M5 6.5h18v13H13l-5.5 4v-4H5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M9 11h10M9 15h7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>Chat demo</span>
        </button>
      )}
    </div>
  );
}
