import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { Breadcrumbs, PageIntro } from '@/components/site-shell';
import { publishedProducts, suppliers } from '@/data/catalog';

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

const regionalListings = [
  { label: 'East of Canada', href: 'https://vidarflooring.com/en/laminate-resultpage/location/EAST+OF+CANADA' },
  { label: 'West of Canada', href: 'https://vidarflooring.com/en/laminate-resultpage/location/WEST+OF+CANADA' },
  { label: 'Seattle', href: 'https://vidarflooring.com/en/laminate-resultpage/location/SEATTLE' }
];

export function generateStaticParams() {
  return suppliers.map(supplier => ({ slug: supplier.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supplier = suppliers.find(item => item.slug === slug);
  if (!supplier) return {};
  const hasPublishedProducts = publishedProducts.some(product => product.supplier === supplier.name);

  return {
    title: supplier.name + ' Flooring Products',
    description: hasPublishedProducts
      ? 'Browse published ' + supplier.name + ' flooring products at Vcare. Request a quote to confirm current options and availability.'
      : 'Contact Vcare to discuss current ' + supplier.name + ' product options for your project.',
    alternates: { canonical: '/suppliers/' + supplier.slug }
  };
}

export default async function SupplierPage({ params }: Props) {
  const { slug } = await params;
  const supplier = suppliers.find(item => item.slug === slug);
  if (!supplier) notFound();

  const supplierProducts = publishedProducts.filter(product => product.supplier === supplier.name);

  return (
    <>
      <PageIntro
        eyebrow="FLOORING SUPPLIER"
        title={supplier.name + ' flooring.'}
        description={supplierProducts.length > 0
          ? 'Browse published ' + supplier.name + ' products. Request a quote to confirm current options and availability.'
          : 'Contact us to discuss current ' + supplier.name + ' product options for your project.'}
      />
      <Breadcrumbs items={[{ label: 'Suppliers', href: '/suppliers' }, { label: supplier.name }]} />
      <section className="section">
        <div className="container">
          <div className="section-top">
            <div>
              <div className="eyebrow"><span />SUPPLIER PRODUCT COLLECTIONS</div>
              <h2>Explore {supplier.name} products.</h2>
            </div>
            <p>Product options and availability are confirmed with your quote.</p>
          </div>
          {supplier.name === 'Vidar' && (
            <nav className="supplier-region-links" aria-label="Vidar regional laminate listings">
              <span>Regional listings:</span>
              {regionalListings.map(listing => (
                <a key={listing.label} href={listing.href} target="_blank" rel="noreferrer">
                  {listing.label} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </nav>
          )}
          {supplierProducts.length > 0 ? (
            <div className="product-grid">
              {supplierProducts.map(product => <ProductCard key={product.slug} product={product} />)}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No products are published for this supplier yet</h3>
              <p>Contact us to discuss current {supplier.name} product options for your project.</p>
              <Link className="button button-primary" href={'/get-a-quote?product=' + encodeURIComponent(supplier.name)}>Request a Quote ↗</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
