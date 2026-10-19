import { timingSafeEqual } from 'node:crypto';

function matchesCredential(received: string, expected: string): boolean {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

export function authenticatedAdmin(authorization: string | null): string | null {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  if (!username || !password || !authorization?.startsWith('Basic ')) return null;
  try {
    const decoded = Buffer.from(authorization.slice(6), 'base64').toString('utf8');
    const separator = decoded.indexOf(':');
    if (separator < 0) return null;
    return matchesCredential(decoded.slice(0, separator), username) &&
      matchesCredential(decoded.slice(separator + 1), password)
      ? username
      : null;
  } catch {
    return null;
  }
}
