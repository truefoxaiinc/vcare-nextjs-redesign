/**
 * Opt-in browser adapter for reviewed catalogue cards.
 * Not wired into the public demo widget until the authenticated backend is live.
 */
export type RecommendationCard = {
  slug: string;
  name: string;
  category: string;
  supplier: string;
  description: string;
  canonical_url: string;
};

export type RecommendationResult = {
  products: RecommendationCard[];
  source_commit: string | null;
  evidence_status: 'matched' | 'no_match' | 'unavailable';
};

const PRODUCT_ORIGINS = new Set([
  'https://www.vcarehardwoodfloors.ca',
  'https://vcarehardwoodfloors.ca'
]);

export function isApprovedProductLink(url: string, slug: string): boolean {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return false;
  try {
    const parsed = new URL(url);
    return (
      PRODUCT_ORIGINS.has(parsed.origin) &&
      parsed.pathname === '/products/' + slug &&
      !parsed.search &&
      !parsed.hash &&
      !parsed.username &&
      !parsed.password
    );
  } catch {
    return false;
  }
}

export function parseRecommendations(input: unknown): RecommendationResult {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new Error('Invalid recommendation response');
  }
  const value = input as Record<string, unknown>;
  if (
    !['matched', 'no_match', 'unavailable'].includes(String(value.evidence_status)) ||
    !Array.isArray(value.products) ||
    value.products.length > 3 ||
    !(value.source_commit === null ||
      (typeof value.source_commit === 'string' && /^[a-f0-9]{40}$/.test(value.source_commit)))
  ) {
    throw new Error('Invalid recommendation metadata');
  }
  const products = value.products.map((item: unknown) => {
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      throw new Error('Invalid product card');
    }
    const product = item as Record<string, unknown>;
    for (const key of ['slug', 'name', 'category', 'supplier', 'description', 'canonical_url']) {
      if (typeof product[key] !== 'string' || !(product[key] as string).trim()) {
        throw new Error('Incomplete product card');
      }
    }
    if (!isApprovedProductLink(product.canonical_url as string, product.slug as string)) {
      throw new Error('Unapproved product link');
    }
    return {
      slug: product.slug as string,
      name: product.name as string,
      category: product.category as string,
      supplier: product.supplier as string,
      description: product.description as string,
      canonical_url: product.canonical_url as string
    };
  });
  if (
    (value.evidence_status === 'matched' && (products.length === 0 || value.source_commit === null)) ||
    (value.evidence_status !== 'matched' && products.length !== 0)
  ) {
    throw new Error('Inconsistent recommendation evidence');
  }
  return {
    products,
    source_commit: value.source_commit as string | null,
    evidence_status: value.evidence_status as RecommendationResult['evidence_status']
  };
}

export async function fetchRecommendations(
  sessionId: string,
  token: string,
  query: string,
  signal?: AbortSignal
): Promise<RecommendationResult> {
  // Same-origin only. Cross-origin backend access requires a reviewed server proxy.
  if (!/^[a-f0-9-]{36}$/i.test(sessionId) || !token.trim()) {
    throw new Error('Invalid chat session');
  }
  const cleaned = query.trim();
  if (cleaned.length < 2 || cleaned.length > 120) {
    throw new Error('Invalid recommendation query');
  }
  const response = await fetch(
    '/api/v1/chat/sessions/' + encodeURIComponent(sessionId) +
      '/recommendations?q=' + encodeURIComponent(cleaned),
    {
      method: 'GET',
      headers: { Authorization: 'Bearer ' + token, Accept: 'application/json' },
      credentials: 'same-origin',
      cache: 'no-store',
      signal
    }
  );
  if (!response.ok) throw new Error('Recommendations temporarily unavailable');
  return parseRecommendations(await response.json());
}
