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
    expect(isLiveChatEnabled({})).toBe(false);
  });

  it('requires UI opt-in and proxy opt-in independently', () => {
    expect(isLiveChatEnabled({ ...config, VCARE_AI_CHAT_UI_ENABLED: 'false' })).toBe(false);
    expect(isLiveChatEnabled({ ...config, VCARE_CHAT_PROXY_ENABLED: 'false' })).toBe(false);
  });

  it('requires configured backend origin and allowlist for HTTPS', () => {
    expect(isLiveChatEnabled({ ...config, VCARE_CHAT_BACKEND_ORIGIN: '' })).toBe(false);
    expect(isLiveChatEnabled({ ...config, VCARE_CHAT_BACKEND_ALLOWED_HOSTS: '' })).toBe(false);
    expect(isLiveChatEnabled(config)).toBe(true);
  });

  it('allows reviewed loopback HTTP proxy in staging', () => {
    expect(isLiveChatEnabled({
      VCARE_AI_CHAT_UI_ENABLED: 'true',
      VCARE_CHAT_PROXY_ENABLED: 'true',
      VCARE_CHAT_BACKEND_ORIGIN: 'http://127.0.0.1:18690'
    })).toBe(true);
  });
  it('rejects an HTTPS origin whose hostname is not exactly allowlisted', () => {
    expect(isLiveChatEnabled({
      ...config,
      VCARE_CHAT_BACKEND_ORIGIN: 'https://evil.example'
    })).toBe(false);
    expect(isLiveChatEnabled({
      ...config,
      VCARE_CHAT_BACKEND_ORIGIN: 'https://chat.vcarehardwoodfloors.ca.evil.example'
    })).toBe(false);
  });

  it('rejects credentialed, malformed, and non-root upstream URLs', () => {
    for (const origin of [
      'https://user:pass@chat.vcarehardwoodfloors.ca',
      'https://chat.vcarehardwoodfloors.ca/hidden',
      'https://chat.vcarehardwoodfloors.ca/?token=secret',
      'not-a-url',
      'http://evil.example',
      'http://127.0.0.1.evil.example:18690'
    ]) {
      expect(isLiveChatEnabled({
        ...config,
        VCARE_CHAT_BACKEND_ORIGIN: origin
      })).toBe(false);
    }
  });

  it('accepts a matching host in a comma-separated allowlist', () => {
    expect(isLiveChatEnabled({
      ...config,
      VCARE_CHAT_BACKEND_ALLOWED_HOSTS: 'other.example, CHAT.VCAREHARDWOODFLOORS.CA'
    })).toBe(true);
  });

});
