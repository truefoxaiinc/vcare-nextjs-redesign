/**
 * Server-only rollout gate. Never import this module into client components.
 * All three independent switches must be enabled deliberately.
 */
export function isLiveChatEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  return (
    env.VCARE_AI_CHAT_UI_ENABLED === 'true' &&
    env.VCARE_CHAT_PROXY_ENABLED === 'true' &&
    typeof env.VCARE_CHAT_BACKEND_ORIGIN === 'string' &&
    env.VCARE_CHAT_BACKEND_ORIGIN.length > 0 &&
    (
      env.VCARE_CHAT_BACKEND_ORIGIN.startsWith('http://127.0.0.1:') ||
      env.VCARE_CHAT_BACKEND_ORIGIN.startsWith('http://localhost:') ||
      (env.VCARE_CHAT_BACKEND_ORIGIN.startsWith('https://') &&
        typeof env.VCARE_CHAT_BACKEND_ALLOWED_HOSTS === 'string' &&
        env.VCARE_CHAT_BACKEND_ALLOWED_HOSTS.trim().length > 0)
    )
  );
}
