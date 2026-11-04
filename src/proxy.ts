import { NextRequest, NextResponse } from 'next/server';
import { authenticatedAdmin } from '@/lib/admin-auth';

export function isAuthorizedAdminRequest(request: NextRequest): boolean {
  return authenticatedAdmin(request.headers.get('authorization')) !== null;
}

function privateResponse(status: number, headers: Record<string, string> = {}) {
  return new NextResponse(status === 401 ? 'Authentication required.' : null, {
    status,
    headers: { 'Cache-Control': 'private, no-store, max-age=0', 'X-Robots-Tag': 'noindex, nofollow', ...headers }
  });
}

export function proxy(request: NextRequest) {
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    return privateResponse(404);
  }
  if (!isAuthorizedAdminRequest(request)) {
    return privateResponse(401, { 'WWW-Authenticate': 'Basic realm="Vcare catalogue preview", charset="UTF-8"' });
  }
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'private, no-store, max-age=0');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return response;
}

export const config = { matcher: ['/admin', '/admin/:path*'] };
