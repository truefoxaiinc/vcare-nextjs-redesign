import type { Metadata } from 'next';
import { ProductCard } from '@/components/product-card';
import { Breadcrumbs, PageIntro } from '@/components/site-shell';
import { publishedProducts } from '@/data/catalog';

export const metadata: Metadata = {
  title: 'Vidar Flooring Products',
  description: 'Browse Vidar laminate and engineered hardwood flooring at Vcare. Request a quote to confirm current colour options and availability.',
  alternates: { canonical: '/suppliers/vidar' }
};

const vidarProducts = publishedProducts.filter(product => product.supplier === 'Vidar');

const regionalListings = [
  { label: 'East of Canada', href: 'https://vidarflooring.com/en/laminate-resultpage/location/EAST+OF+CANADA' },
  { label: 'West of Canada', href: 'https://vidarflooring.com/en/laminate-resultpage/location/WEST+OF+CANADA' },
  { label: 'Seattle', href: 'https://vidarflooring.com/en/laminate-resultpage/location/SEATTLE' }
];

export default function VidarSupplierPage() {
  return (
    <>
      <PageIntro
        eyebrow="VIDAR FLOORING"
        title="Vidar flooring."
        description="Browse verified Vidar laminate and engineered hardwood products. Request a quote to confirm current colour options and availability."
      />
      <Breadcrumbs items={[{ label: 'Shop floors', href: '/products' }, { label: 'Suppliers', href: '/products' }, { label: 'Vidar' }]} />
      <section className="section">
        <div className="container">
          <div className="section-top">
            <div>
              <div className="eyebrow"><span />VIDAR PRODUCT COLLECTIONS</div>
              <h2>Explore Vidar products.</h2>
            </div>
            <p>Product images and specifications are from Vidar’s published listings. Confirm availability when you request a quote.</p>
          </div>
          <nav className="supplier-region-links" aria-label="Vidar regional laminate listings">
            <span>Regional listings:</span>
            {regionalListings.map(listing => (
              <a key={listing.label} href={listing.href} target="_blank" rel="noreferrer">
                {listing.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
          <div className="product-grid">
            {vidarProducts.map(product => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>
    </>
  );
}
