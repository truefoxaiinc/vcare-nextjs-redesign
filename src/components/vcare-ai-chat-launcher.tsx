'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { VcareAiChatPanel } from './vcare-ai-chat-panel';

/**
 * The server chooses this launcher only when rollout gates are explicitly on.
 * Opening the panel does not create a session; the panel requires consent.
 */
export function VcareAiChatLauncher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null;

  return (
    <div className="vcare-chat-widget">
      {open ? (
        <section className="vcare-chat-panel vcare-ai-chat-window" aria-label="Vcare AI chat">
          <button
            className="vcare-chat-close vcare-ai-chat-close"
            type="button"
            aria-label="Close AI chat"
            onClick={() => setOpen(false)}
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
              <path d="m5 5 10 10M15 5 5 15" fill="none" stroke="currentColor" strokeWidth="1.7" />
            </svg>
          </button>
          <VcareAiChatPanel />
        </section>
      ) : (
        <button
          className="vcare-chat-launcher"
          type="button"
          aria-label="Open Vcare AI chat"
          aria-expanded={false}
          onClick={() => setOpen(true)}
        >
          <svg aria-hidden="true" viewBox="0 0 28 28" width="25" height="25">
            <path d="M5 6.5h18v13H13l-5.5 4v-4H5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M9 11h10M9 15h7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span>Chat with Vcare AI</span>
        </button>
      )}
    </div>
  );
}
