import { NextRequest, NextResponse } from 'next/server';
import { isAuthorizedWorkerRequest } from '@/lib/worker-auth';

export const runtime = 'nodejs';

type Props = {
  params: Promise<{ jobId: string }>;
};

export async function POST(request: NextRequest, { params }: Props) {
  const secret = process.env.NOTIFICATION_WORKER_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'Notification worker is not configured.' }, { status: 503 });
  }
  if (!isAuthorizedWorkerRequest(request.headers.get('authorization'), secret)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  const { jobId } = await params;
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(jobId)) {
    return NextResponse.json({ ok: false, error: 'Invalid notification job ID.' }, { status: 400 });
  }

  try {
    const { replayNotificationJob } = await import('@/lib/notification-service');
    const replayed = await replayNotificationJob(jobId);
    if (!replayed) {
      return NextResponse.json(
        { ok: false, error: 'Notification job is not eligible for replay.' },
        { status: 409 }
      );
    }
    return NextResponse.json({ ok: true, replayed: true });
  } catch (error) {
    console.error(
      'Notification replay failed.',
      error instanceof Error ? error.name : 'UnknownError'
    );
    return NextResponse.json(
      { ok: false, error: 'Notification replay is temporarily unavailable.' },
      { status: 503 }
    );
  }
}
