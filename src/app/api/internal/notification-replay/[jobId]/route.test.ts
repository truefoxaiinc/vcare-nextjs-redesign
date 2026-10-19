import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const worker = vi.hoisted(() => ({ replay: vi.fn() }));

vi.mock('@/lib/notification-service', () => ({
  replayNotificationJob: worker.replay
}));

import { POST } from '@/app/api/internal/notification-replay/[jobId]/route';

function request(authorization?: string) {
  return new NextRequest('https://example.test/api/internal/notification-replay/job-1', {
    method: 'POST',
    headers: authorization ? { authorization } : {}
  });
}

describe('POST /api/internal/notification-replay/[jobId]', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    worker.replay.mockReset();
  });

  it('requires the worker secret before invoking replay', async () => {
    vi.stubEnv('NOTIFICATION_WORKER_SECRET', 'test-worker-secret');
    expect((await POST(request('Bearer wrong'), { params: Promise.resolve({ jobId: 'job-1' }) })).status).toBe(401);
    expect(worker.replay).not.toHaveBeenCalled();
  });

  it('returns conflict when the job is not eligible for replay', async () => {
    vi.stubEnv('NOTIFICATION_WORKER_SECRET', 'test-worker-secret');
    worker.replay.mockResolvedValue(false);

    const response = await POST(request('Bearer test-worker-secret'), {
      params: Promise.resolve({ jobId: 'job-1' })
    });

    expect(response.status).toBe(409);
  });

  it('replays an eligible failed job through the service boundary', async () => {
    vi.stubEnv('NOTIFICATION_WORKER_SECRET', 'test-worker-secret');
    worker.replay.mockResolvedValue(true);

    const response = await POST(request('Bearer test-worker-secret'), {
      params: Promise.resolve({ jobId: 'job-1' })
    });

    expect(response.status).toBe(200);
    expect(worker.replay).toHaveBeenCalledWith('job-1');
  });
});
