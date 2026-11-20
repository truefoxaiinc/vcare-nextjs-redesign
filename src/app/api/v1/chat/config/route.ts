import { connection, NextResponse } from 'next/server';

import { isLiveChatEnabled } from '@/lib/chatbot-rollout';

export async function GET() {
  await connection();
  return NextResponse.json(
    { enabled: isLiveChatEnabled() },
    { headers: { 'Cache-Control': 'private, no-store, max-age=0', 'X-Robots-Tag': 'noindex' } }
  );
}
