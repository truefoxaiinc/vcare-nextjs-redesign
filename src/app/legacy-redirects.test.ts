import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as productRedirect } from '@/app/product/[slug]/route';
import { GET as categoryRedirect } from '@/app/product-category/[category]/route';

function request(path: string) {
  return new NextRequest(`https://www.vcarehardwoodfloors.ca${path}`);
}

describe('legacy WordPress redirects', () => {
  it('permanently redirects old product URLs without dropping campaign query parameters', async () => {
    const response = await productRedirect(
      request('/product/example-floor/?utm_source=old-site'),
      { params: Promise.resolve({ slug: 'example-floor' }) }
    );
    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe(
      'https://www.vcarehardwoodfloors.ca/products/example-floor?utm_source=old-site'
    );
  });

  it.each([
    ['hardwood', '/products/hardwood'],
    ['hardwood-floors', '/products/hardwood'],
    ['engineered', '/products/engineered-hardwood'],
    ['engineered-hardwood', '/products/engineered-hardwood'],
    ['laminate', '/products/laminate'],
    ['laminate-floors', '/products/laminate'],
    ['vinyl', '/products/vinyl'],
    ['vinyl-floors', '/products/vinyl'],
    ['offers', '/offers'],
    ['unrecognized-category', '/products']
  ])('redirects category %s to %s', async (category, expected) => {
    const response = await categoryRedirect(
      request(`/product-category/${category}/`),
      { params: Promise.resolve({ category }) }
    );
    expect(response.status).toBe(301);
    expect(new URL(response.headers.get('location')!).pathname).toBe(expected);
  });

  it('does not redirect to an external host via a category name', async () => {
    const response = await categoryRedirect(
      request('/product-category/unknown?ref=legacy'),
      { params: Promise.resolve({ category: 'https://attacker.example' }) }
    );
    const location = new URL(response.headers.get('location')!);
    expect(location.origin).toBe('https://www.vcarehardwoodfloors.ca');
    expect(location.pathname).toBe('/products');
    expect(location.searchParams.get('ref')).toBe('legacy');
  });
});
