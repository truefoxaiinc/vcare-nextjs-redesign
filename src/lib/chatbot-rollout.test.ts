import { describe, expect, it } from 'vitest';
import { isLiveChatEnabled } from './chatbot-rollout';

describe('server-side live AI chat rollout', () => {
  const config = {
    VCARE_AI_CHAT_UI_ENABLED: 'true',
    VCARE_CHAT_PROXY_ENABLED: 'true',
    VCARE_CHAT_BACKEND_ORIGIN: 'https://chat.vcarehardwoodfloors.ca',
    VCARE_CHAT_BACKEND_ALLOWED_HOSTS: 'chat.vcarehardwoodfloors.ca'
  };

  it('is disabled by default', () => {
    expect(isLiveChatEnabled({} as NodeJS.ProcessEnv)).toBe(false);
  });

  it('requires UI opt-in and proxy opt-in independently', () => {
    expect(isLiveChatEnabled({ ...config, VCARE_AI_CHAT_UI_ENABLED: 'false' } as NodeJS.ProcessEnv)).toBe(false);
    expect(isLiveChatEnabled({ ...config, VCARE_CHAT_PROXY_ENABLED: 'false' } as NodeJS.ProcessEnv)).toBe(false);
  });

  it('requires configured backend origin and allowlist for HTTPS', () => {
    expect(isLiveChatEnabled({ ...config, VCARE_CHAT_BACKEND_ORIGIN: '' } as NodeJS.ProcessEnv)).toBe(false);
    expect(isLiveChatEnabled({ ...config, VCARE_CHAT_BACKEND_ALLOWED_HOSTS: '' } as NodeJS.ProcessEnv)).toBe(false);
    expect(isLiveChatEnabled(config as NodeJS.ProcessEnv)).toBe(true);
  });

  it('allows reviewed loopback HTTP proxy in staging', () => {
    expect(isLiveChatEnabled({
      VCARE_AI_CHAT_UI_ENABLED: 'true',
      VCARE_CHAT_PROXY_ENABLED: 'true',
      VCARE_CHAT_BACKEND_ORIGIN: 'http://127.0.0.1:18690'
    } as NodeJS.ProcessEnv)).toBe(true);
  });
});
