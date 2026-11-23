import { describe, expect, it } from 'vitest';
import { categories, isProductPublishable, products, publishedProducts, suppliers } from '@/data/catalog';
import { generateStaticParams } from '@/app/products/[slug]/page';
import sitemap from '@/app/sitemap';
import { siteUrl } from '@/lib/seo';

describe('flooring supplier mapping', () => {
  it('lists approved suppliers and the additional supplier brands', () => {
    expect(suppliers.map(supplier => supplier.name)).toEqual([
      'Grandeur', 'Tosca', 'Floorsatwork', 'Toucan', 'Simba', 'Wickham',
      'Northernest', 'Sherwood', 'Pangolin', 'Lee Flooring', 'Woden', 'Weiss',
      'Purelux', 'Vidar'
    ]);
    expect(Object.fromEntries(categories.map(category => [category.title, category.suppliers]))).toEqual({
      'Hardwood': ['Wickham', 'Tosca'],
      'Engineered Hardwood': ['Floorsatwork', 'Vidar'],
      'Laminate': ['Toucan', 'Floorsatwork', 'Lee Flooring', 'Vidar'],
      'Vinyl': ['Toucan', 'Floorsatwork', 'Pangolin', 'Lee Flooring']
    });
    expect(suppliers.find(supplier => supplier.name === 'Grandeur')?.categories).toEqual([]);
    expect(suppliers.find(supplier => supplier.name === 'Vidar')?.categories).toEqual(['Engineered Hardwood', 'Laminate']);
    expect(suppliers.find(supplier => supplier.name === 'Vidar')?.productListingHref).toBe('/suppliers/vidar');
  });

  it('maps all fourteen supplied supplier logos and keeps unapproved brands out of product publishing', () => {
    const withLogos = suppliers.filter(supplier => supplier.logoPath);
    expect(withLogos).toHaveLength(14);
    expect(withLogos.every(supplier => supplier.logoPath?.startsWith('/images/suppliers/'))).toBe(true);
    expect(suppliers.find(supplier => supplier.name === 'Pangolin')?.logoPath).toContain('Pangol-logo.webp');
    expect(suppliers.find(supplier => supplier.name === 'Woden')?.logoPath).toContain('woodenflooring-logo.avif');
    expect(suppliers.find(supplier => supplier.name === 'Sherwood')?.logoPath).toContain('sharwood-logo.jpeg');
    expect(suppliers.find(supplier => supplier.name === 'Lee Flooring')?.logoPath).toContain('Lee%20Flooring-logo.webp');
    expect(suppliers.find(supplier => supplier.name === 'Purelux')?.logoPath).toContain('Purelux-footer-logo-.png');
    expect(suppliers.find(supplier => supplier.name === 'Purelux')?.logoBackground).toBe('dark');
    expect(suppliers.find(supplier => supplier.name === 'Purelux')?.productCatalogueEnabled).toBe(false);
    expect(suppliers.find(supplier => supplier.name === 'Vidar')?.logoPath).toContain('vidar-logo.png');
    expect(suppliers.find(supplier => supplier.name === 'Vidar')?.productCatalogueEnabled).toBe(true);
    expect(suppliers.find(supplier => supplier.name === 'Purelux')?.categories).toEqual([]);
    expect(publishedProducts.some(product => product.supplier === 'Vidar')).toBe(true);
    expect(publishedProducts.some(product => product.supplier === 'Purelux')).toBe(false);
  });

  it('links Vidar to its published products and floor categories', () => {
    const vidar = suppliers.find(supplier => supplier.name === 'Vidar');
    expect(vidar?.productListingHref).toBe('/suppliers/vidar');
    expect(vidar?.categories).toEqual(['Engineered Hardwood', 'Laminate']);
    expect(categories.find(category => category.title === 'Engineered Hardwood')?.suppliers).toContain('Vidar');
    expect(categories.find(category => category.title === 'Laminate')?.suppliers).toContain('Vidar');
    expect(publishedProducts.filter(product => product.supplier === 'Vidar')).toHaveLength(9);
  });

  it('publishes Vidar laminate collections with supplier images and verified specifications', () => {
    const vidarLaminateProducts = publishedProducts.filter(product => product.supplier === 'Vidar' && product.category === 'Laminate');
    expect(vidarLaminateProducts.map(product => product.name)).toEqual([
      'Laminate Flooring Collection-DB25',
      'Laminate Flooring Collection-HZ',
      'Laminate Flooring Collection-LP',
      'Laminate Flooring Collection-NK25',
      'Laminate Flooring Collection-SD25',
      'Laminate Flooring Collection-TF25'
    ]);
    expect(vidarLaminateProducts.every(product =>
      product.imageUrl?.includes('vidarflooring.com/media/acfgallery/content/') &&
      product.sourceUrl.includes('vidarflooring.com/en/component/content/article/') &&
      product.specifications?.Thickness === '1/2 inch' &&
      product.specifications.Width === '7 1/2 inch' &&
      product.imageAuthorizedAt === '2026-11-23' &&
      isProductPublishable(product)
    )).toBe(true);
  });

  it('imports supplier products and applies client-reported authorization', () => {
    expect(products).toHaveLength(48);
    expect(products.reduce<Record<string, number>>((counts, product) => {
      counts[product.supplier] = (counts[product.supplier] ?? 0) + 1;
      return counts;
    }, {})).toEqual({
      'Floors at Work': 7,
      Toucan: 15,
      Vidar: 16,
      Tosca: 5,
      'Lee Flooring': 7,
      Wickham: 4
    });

    for (const product of products) {
      const authorizationDate = product.supplier === 'Vidar' && product.category === 'Laminate' ? '2026-11-23' : '2026-10-19';
      // Preserve historical imported records for review, even when the supplier is no longer approved for display.
      expect(product.sourceUrl).toMatch(/^https:\/\//);
      expect(product.imageUrl).toMatch(/^https:\/\//);
      expect(product.description.trim().length).toBeGreaterThan(0);
      expect(product.imageAuthorizationStatus).toBe('approved');
      expect(product.descriptionAuthorizationStatus).toBe('approved');
      expect(product.imageAuthorizedBy).toBe('Vcare client (reported)');
      expect(product.descriptionAuthorizedBy).toBe('Vcare client (reported)');
      expect(product.imageAuthorizedAt).toBe(authorizationDate);
      expect(product.descriptionAuthorizedAt).toBe(authorizationDate);
      expect(product.imageAuthorizationReference).toContain('Client-reported');
      expect(product.descriptionAuthorizationReference).toContain('Client-reported');
      expect(product.publicationStatus).toBe(product.sourceStatus === 'unresolved' ? 'draft' : 'published');
    }
    expect(products.filter(product => product.sourceStatus === 'unresolved')).toHaveLength(7);
    expect(products.filter(product => product.publicationStatus === 'published')).toHaveLength(47);
    expect(publishedProducts.every(product => suppliers.some(supplier => supplier.name === product.supplier))).toBe(true);
    expect(publishedProducts.some(product => product.supplier === 'Vidar')).toBe(true);
    expect(publishedProducts.some(product => product.supplier === 'Floors at Work')).toBe(false);
  });

  it('stages resumable supplier imports without duplicate slugs or source URLs', () => {
    expect(new Set(products.map(product => product.slug)).size).toBe(products.length);
    expect(new Set(products.map(product => product.sourceUrl)).size).toBe(products.length);
    expect(products.filter(product => product.supplier === 'Vidar')).toHaveLength(16);
    expect(products.filter(product => product.supplier === 'Toucan' && product.category === 'Vinyl')).toHaveLength(12);
    expect(products.filter(product => product.supplier === 'Lee Flooring' && product.category === 'Vinyl')).toHaveLength(4);
    expect(products.filter(product => product.supplier === 'Lee Flooring' && product.category === 'Laminate')).toHaveLength(3);
    expect(products.filter(product => product.supplier === 'Floors at Work' && product.category === 'Vinyl')).toHaveLength(5);
    expect(products.filter(product => product.supplier === 'Wickham' && product.category === 'Hardwood')).toHaveLength(4);
    expect(products.filter(product => product.supplier === 'Vidar' || (product.supplier === 'Toucan' && product.category === 'Vinyl')).every(product => product.specifications && Object.keys(product.specifications).length > 0)).toBe(true);
  });

  it('records unresolved supplier source links for admin review', () => {
    expect(products.filter(product => product.sourceStatus === 'unresolved').map(product => product.supplier)).toEqual(Array(7).fill('Vidar'));
    expect(products.filter(product => product.supplier === 'Vidar' && product.sourceStatus === 'verified').map(product => product.sourceUrl)).toEqual([
      'https://www.vidarflooring.com/en/component/content/article/american-oak-driftwood?catid=19',
      'https://www.vidarflooring.com/en/component/content/article/7-1-2%E2%80%98%E2%80%99-collection-american-white-oak-moon-light?catid=19',
      'https://www.vidarflooring.com/en/component/content/article/7-1-2-collection-american-white-oak-urban-grey?catid=19',
      'https://vidarflooring.com/en/component/content/article/laminate-flooring-collection-db25?catid=18',
      'https://vidarflooring.com/en/component/content/article/laminate-flooring-collection-hz?catid=18',
      'https://vidarflooring.com/en/component/content/article/laminate-flooring-collection-lp?catid=18',
      'https://vidarflooring.com/en/component/content/article/laminate-flooring-collection-nk25?catid=18',
      'https://vidarflooring.com/en/component/content/article/laminate-flooring-collection-sd25?catid=18',
      'https://vidarflooring.com/en/component/content/article/laminate-flooring-collection-tf25?catid=18'
    ]);
  });

  it('publishes only records explicitly approved for publication and media reuse', () => {
    const product = products[0];
    expect(isProductPublishable({
      ...product,
      publicationStatus: 'published',
      imageAuthorizationStatus: 'approved',
      imageAuthorizedBy: undefined,
      imageAuthorizedAt: undefined,
      imageAuthorizationReference: undefined
    })).toBe(false);

    expect(isProductPublishable({
      ...product,
      publicationStatus: 'published',
      imageAuthorizationStatus: 'approved',
      imageAuthorizedBy: 'Vcare reviewer',
      imageAuthorizedAt: '2026-10-19T00:00:00.000Z',
      imageAuthorizationReference: 'permission-email-123',
      descriptionAuthorizationStatus: 'approved',
      descriptionAuthorizedBy: 'Vcare reviewer',
      descriptionAuthorizedAt: '2026-10-19T00:00:00.000Z',
      descriptionAuthorizationReference: 'permission-email-123',
      sourceStatus: 'verified'
    })).toBe(true);

    expect(isProductPublishable({
      ...product,
      publicationStatus: 'published',
      imageAuthorizationStatus: 'pending',
      imageAuthorizedBy: 'Vcare reviewer',
      imageAuthorizedAt: '2026-10-19T00:00:00.000Z',
      imageAuthorizationReference: 'permission-email-123',
      descriptionAuthorizationStatus: 'approved',
      descriptionAuthorizedBy: 'Vcare reviewer',
      descriptionAuthorizedAt: '2026-10-19T00:00:00.000Z',
      descriptionAuthorizationReference: 'permission-email-123'
    })).toBe(false);

    expect(isProductPublishable({
      ...product,
      publicationStatus: 'published',
      imageAuthorizationStatus: 'approved',
      imageAuthorizedBy: 'Vcare reviewer',
      imageAuthorizedAt: '2026-10-19T00:00:00.000Z',
      imageAuthorizationReference: 'permission-email-123',
      descriptionAuthorizationStatus: 'approved',
      descriptionAuthorizedBy: 'Vcare reviewer',
      descriptionAuthorizedAt: '2026-10-19T00:00:00.000Z',
      descriptionAuthorizationReference: 'permission-email-123',
      sourceStatus: 'unresolved'
    })).toBe(false);
  });

  it('generates public product routes and sitemap entries only for published products', async () => {
    const routeSlugs = generateStaticParams().map(({ slug }) => slug);
    const sitemapUrls = (await sitemap()).map(entry => entry.url);

    for (const product of products.filter(product => product.publicationStatus === 'draft')) {
      expect(routeSlugs).not.toContain(product.slug);
      expect(sitemapUrls).not.toContain(`${siteUrl}/products/${product.slug}`);
    }
    expect(routeSlugs).toEqual([...categories.map(category => category.slug), ...publishedProducts.map(product => product.slug)]);
  });
});
