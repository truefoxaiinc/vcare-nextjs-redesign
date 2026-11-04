import { afterEach, describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { proxy } from '@/proxy';

const originalUsername = process.env.ADMIN_USERNAME;
const originalPassword = process.env.ADMIN_PASSWORD;

afterEach(() => {
  if (originalUsername === undefined) delete process.env.ADMIN_USERNAME;
  else process.env.ADMIN_USERNAME = originalUsername;
  if (originalPassword === undefined) delete process.env.ADMIN_PASSWORD;
  else process.env.ADMIN_PASSWORD = originalPassword;
});

describe('admin catalogue authentication', () => {
  it('fails closed and disables caching when credentials are not configured', () => {
    delete process.env.ADMIN_USERNAME;
    delete process.env.ADMIN_PASSWORD;
    const response = proxy(new NextRequest('http://localhost/admin/products'));
    expect(response.status).toBe(404);
    expect(response.headers.get('cache-control')).toContain('no-store');
    expect(response.headers.get('x-robots-tag')).toContain('noindex');
  });

  it('challenges invalid credentials and accepts configured credentials without caching', () => {
    process.env.ADMIN_USERNAME = 'reviewer';
    process.env.ADMIN_PASSWORD = 'test-password';
    const unauthorized = proxy(new NextRequest('http://localhost/admin/products'));
    expect(unauthorized.status).toBe(401);
    expect(unauthorized.headers.get('www-authenticate')).toContain('Basic');
    expect(unauthorized.headers.get('cache-control')).toContain('no-store');

    const invalid = `Basic ${Buffer.from('reviewer:wrong-password').toString('base64')}`;
    expect(proxy(new NextRequest('http://localhost/admin/catalogue-preview', {
      headers: { authorization: invalid }
    })).status).toBe(401);

    const authorization = `Basic ${Buffer.from('reviewer:test-password').toString('base64')}`;
    for (const path of ['/admin/products', '/admin/catalogue-preview']) {
      const response = proxy(new NextRequest('http://localhost' + path, { headers: { authorization } }));
      expect(response.status).toBe(200);
      expect(response.headers.get('cache-control')).toContain('no-store');
      expect(response.headers.get('x-robots-tag')).toContain('noindex');
    }
  });
});
