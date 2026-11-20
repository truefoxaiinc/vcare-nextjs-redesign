'use client';

import { useEffect, useState } from 'react';

import { VcareAiChatLauncher } from './vcare-ai-chat-launcher';
import { VcareChatWidget } from './vcare-chat-widget';

function isEnabledResponse(value: unknown): value is { enabled: boolean } {
  return value !== null && typeof value === 'object' && 'enabled' in value &&
    typeof value.enabled === 'boolean';
}

export function ChatLauncherGate() {
  const [liveChatEnabled, setLiveChatEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    void fetch('/api/v1/chat/config', {
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    }).then(async (response) => {
      if (!response.ok) throw new Error('Chat configuration unavailable');
      const payload: unknown = await response.json();
      if (!isEnabledResponse(payload)) throw new Error('Invalid chat configuration');
      if (active) setLiveChatEnabled(payload.enabled);
    }).catch(() => {
      if (active) setLiveChatEnabled(false);
    });

    return () => {
      active = false;
    };
  }, []);

  if (liveChatEnabled === null) return null;
  return liveChatEnabled ? <VcareAiChatLauncher /> : <VcareChatWidget />;
}
