import { describe, expect, it } from 'vitest';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const script = resolve(process.cwd(), 'scripts/worker-poll.mjs');
const baseEnv = {
  ...process.env,
  VCARE_WORKER_URL: 'https://vcare.example/api/internal/notification-worker',
  NOTIFICATION_WORKER_SECRET: 'test-only-worker-secret-very-long'
};

describe('operator worker polling script', () => {
  it('rejects missing configuration without leaking secrets', () => {
    const result = spawnSync(process.execPath, [script], {
      env: { ...baseEnv, NOTIFICATION_WORKER_SECRET: '' }, encoding: 'utf8'
    });
    expect(result.status).toBe(2);
    expect(result.stderr).toContain('configuration_missing');
  });

  it('rejects non-HTTPS, query strings, and incorrect paths', () => {
    for (const url of [
      'http://vcare.example/api/internal/notification-worker',
      'https://vcare.example/api/internal/notification-worker?token=abc',
      'https://vcare.example/api/internal/notification-replay'
    ]) {
      const result = spawnSync(process.execPath, [script], {
        env: { ...baseEnv, VCARE_WORKER_URL: url }, encoding: 'utf8'
      });
      expect(result.status).toBe(2);
      expect(result.stderr).toContain('invalid_url');
    }
  });
});
