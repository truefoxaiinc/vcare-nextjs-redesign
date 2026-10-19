import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const worker = vi.hoisted(() => ({ run: vi.fn() }));

vi.mock('@/lib/notification-service', () => ({
  runNotificationWorker: worker.run
}));

import { POST } from '@/app/api/internal/notification-worker/route';

function request(authorization?: string) {
  return new NextRequest('https://example.test/api/internal/notification-worker', {
    method: 'POST',
    headers: authorization ? { authorization } : {}
  });
}

describe('POST /api/internal/notification-worker', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    worker.run.mockReset();
  });

  it('rejects missing configuration and invalid authorization before loading the worker', async () => {
    vi.stubEnv('NOTIFICATION_WORKER_SECRET', '');
    expect((await POST(request('Bearer wrong'))).status).toBe(503);

    vi.stubEnv('NOTIFICATION_WORKER_SECRET', 'test-worker-secret');
    expect((await POST(request('Bearer wrong'))).status).toBe(401);
    expect(worker.run).not.toHaveBeenCalled();
  });

  it('runs only with the server-side worker secret', async () => {
    vi.stubEnv('NOTIFICATION_WORKER_SECRET', 'test-worker-secret');
    worker.run.mockResolvedValue({ claimed: 1, delivered: 1, retried: 0, dead: 0, stale: 0, purged: 0 });

    const response = await POST(request('Bearer test-worker-secret'));

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ ok: true, delivered: 1 });
    expect(worker.run).toHaveBeenCalledOnce();
  });
});
