import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));

import { getPrisma } from '@/lib/prisma';

describe('Prisma initialization', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('does not require database configuration until a database operation is requested', () => {
    vi.stubEnv('DATABASE_URL', '');
    expect(() => getPrisma()).toThrow('DATABASE_URL must be configured');
  });
});
