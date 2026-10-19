import { NextRequest, NextResponse } from 'next/server';
import { authenticatedAdmin } from '@/lib/admin-auth';

export function isAuthorizedAdminRequest(request: NextRequest): boolean {
  return authenticatedAdmin(request.headers.get('authorization')) !== null;
}

export function proxy(request: NextRequest) {
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    return new NextResponse(null, { status: 404 });
  }
  if (!isAuthorizedAdminRequest(request)) {
    return new NextResponse('Authentication required.', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Vcare catalogue preview", charset="UTF-8"' }
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
