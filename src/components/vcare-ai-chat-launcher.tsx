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
        <section className="vcare-chat-panel" aria-label="Vcare AI chat">
          <button
            className="vcare-chat-close"
            type="button"
            aria-label="Close AI chat"
            onClick={() => setOpen(false)}
          >
            Close
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
          Chat with Vcare AI
        </button>
      )}
    </div>
  );
}
