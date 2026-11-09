import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  fetchRecommendations,
  isApprovedProductLink,
  parseRecommendations
} from './chatbot-recommendations';

const product = {
  slug: 'oak-sample',
  name: 'Oak Sample',
  category: 'Hardwood',
  supplier: 'Reviewed Supplier',
  description: 'Approved flooring description',
  canonical_url: 'https://www.vcarehardwoodfloors.ca/products/oak-sample'
};
const source_commit = 'a'.repeat(40);

afterEach(() => vi.unstubAllGlobals());

describe('approved product card boundary', () => {
  it('accepts source-backed cards without price or stock fields', () => {
    const result = parseRecommendations({
      products: [product],
      source_commit,
      evidence_status: 'matched'
    });
    expect(result.products).toEqual([product]);
  });

  it.each([
    'https://evil.example/products/oak-sample',
    'http://www.vcarehardwoodfloors.ca/products/oak-sample',
    'https://www.vcarehardwoodfloors.ca/products/oak-sample?price=1',
    'https://www.vcarehardwoodfloors.ca/products/another',
    'javascript:alert(1)'
  ])('rejects unsafe product link %s', (url) => {
    expect(isApprovedProductLink(url, product.slug)).toBe(false);
    expect(() => parseRecommendations({
      products: [{ ...product, canonical_url: url }],
      source_commit,
      evidence_status: 'matched'
    })).toThrow();
  });

  it('rejects inconsistent evidence and fabricated metadata', () => {
    expect(() => parseRecommendations({
      products: [product], source_commit: null, evidence_status: 'matched'
    })).toThrow();
    expect(() => parseRecommendations({
      products: [product], source_commit, evidence_status: 'unavailable'
    })).toThrow();
    expect(() => parseRecommendations({
      products: Array(4).fill(product), source_commit, evidence_status: 'matched'
    })).toThrow();
  });
});

describe('authenticated recommendation fetch', () => {
  it('uses same-origin, no-store and bearer authorization', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ products: [], source_commit: null, evidence_status: 'unavailable' })
    });
    vi.stubGlobal('fetch', fetchMock);
    const result = await fetchRecommendations('123e4567-e89b-12d3-a456-426614174000', 'secret', 'vinyl flooring');
    expect(result.evidence_status).toBe('unavailable');
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/chat/sessions/123e4567-e89b-12d3-a456-426614174000/recommendations?q=vinyl%20flooring',
      expect.objectContaining({
        method: 'GET', cache: 'no-store', credentials: 'same-origin',
        headers: { Authorization: 'Bearer secret', Accept: 'application/json' }
      })
    );
  });

  it('does not fetch without an authenticated session', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await expect(fetchRecommendations('invalid', '', 'oak')).rejects.toThrow();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
