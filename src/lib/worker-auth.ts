import { timingSafeEqual } from 'node:crypto';

export function isAuthorizedWorkerRequest(authorization: string | null, secret: string): boolean {
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(authorization ?? '');
  return received.length === expected.length && timingSafeEqual(received, expected);
}
