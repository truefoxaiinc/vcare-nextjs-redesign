/**
 * Server-only rollout gate. Never import this module into client components.
 * It validates the exact upstream origin and hostname rather than relying on
 * URL string prefixes or the mere presence of an allowlist.
 */
export function isLiveChatEnabled(env: Readonly<Record<string, string | undefined>> = process.env): boolean {
  if (env.VCARE_AI_CHAT_UI_ENABLED !== 'true' || env.VCARE_CHAT_PROXY_ENABLED !== 'true') {
    return false;
  }
  const raw = env.VCARE_CHAT_BACKEND_ORIGIN;
  if (!raw) return false;

  try {
    const url = new URL(raw);
    if (url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
      return false;
    }
    const local = ['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname);
    if (local && url.protocol === 'http:') return true;

    const allowed = (env.VCARE_CHAT_BACKEND_ALLOWED_HOSTS ?? '')
      .split(',')
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean);
    if (!allowed.includes(url.hostname.toLowerCase())) return false;
    if (url.protocol === 'http:' && /^[a-z0-9.-]+$/.test(url.hostname)) return true;
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}
