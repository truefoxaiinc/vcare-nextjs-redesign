import { NextRequest, NextResponse } from 'next/server';
import { isAuthorizedWorkerRequest } from '@/lib/worker-auth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const secret = process.env.NOTIFICATION_WORKER_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'Notification worker is not configured.' }, { status: 503 });
  }
  if (!isAuthorizedWorkerRequest(request.headers.get('authorization'), secret)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const { runNotificationWorker } = await import('@/lib/notification-service');
    const result = await runNotificationWorker();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    console.error(
      'Notification worker failed.',
      error instanceof Error ? error.name : 'UnknownError'
    );
    return NextResponse.json(
      { ok: false, error: 'Notification processing is temporarily unavailable.' },
      { status: 503 }
    );
  }
}
