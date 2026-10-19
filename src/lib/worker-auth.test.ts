import { describe, expect, it } from 'vitest';
import { isAuthorizedWorkerRequest } from '@/lib/worker-auth';

describe('isAuthorizedWorkerRequest', () => {
  it('requires an exact bearer token', () => {
    expect(isAuthorizedWorkerRequest('Bearer example-secret', 'example-secret')).toBe(true);
    expect(isAuthorizedWorkerRequest('bearer example-secret', 'example-secret')).toBe(false);
    expect(isAuthorizedWorkerRequest('Bearer wrong', 'example-secret')).toBe(false);
    expect(isAuthorizedWorkerRequest(null, 'example-secret')).toBe(false);
  });
});
