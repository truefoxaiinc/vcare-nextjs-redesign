import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import robots from '@/app/robots';
import { publishedProducts } from '@/data/catalog';
import { siteUrl } from '@/lib/seo';

describe('search index integrity', () => {
  it('uses absolute canonical-origin sitemap URLs with no duplicate paths', () => {
    const urls = sitemap().map(entry => entry.url);
    expect(urls.length).toBeGreaterThan(0);
    expect(new Set(urls).size).toBe(urls.length);
    for (const url of urls) {
      const parsed = new URL(url);
      expect(parsed.origin).toBe(new URL(siteUrl).origin);
      expect(parsed.search).toBe('');
      expect(parsed.hash).toBe('');
      expect(parsed.pathname.startsWith('/admin')).toBe(false);
      expect(parsed.pathname.startsWith('/api/')).toBe(false);
    }
  });

  it('includes only published product URLs', () => {
    const urls = new Set(sitemap().map(entry => entry.url));
    for (const product of publishedProducts) {
      expect(urls.has(`${siteUrl}/products/${product.slug}`)).toBe(true);
    }
  });

  it('declares a sitemap and excludes private admin and API paths', () => {
    const rules = robots();
    expect(rules.sitemap).toBe(`${siteUrl}/sitemap.xml`);
    expect(JSON.stringify(rules.rules)).toContain('/admin');
    expect(JSON.stringify(rules.rules)).toContain('/api/');
  });
});
