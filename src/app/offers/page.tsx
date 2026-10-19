import type { Metadata } from 'next';
import { ProductExplorer } from '@/components/catalog-ui';
import { Breadcrumbs, PageIntro } from '@/components/site-shell';
import { publishedProducts } from '@/data/catalog';

export const metadata: Metadata = {
  title: 'Flooring Options & Quotes in Barrie',
  description: 'Explore flooring supplier options from Vcare Hardwood Floors in Thornton, Ontario. Contact us to confirm products and availability for your project.',
  alternates: { canonical: '/offers' }
};

export default function OffersPage() {
  return (
    <>
      <PageIntro
        eyebrow="CURRENT FLOORING OPTIONS"
        title="Find a floor that fits your project."
        description="Browse our flooring suppliers by material. Request a quote to discuss current products, availability and your project."
      />
      <Breadcrumbs items={[{ label: 'Flooring options' }]} />
      <section className="section">
        <div className="container">
          <div className="section-top">
            <div>
              <div className="eyebrow"><span />SUPPLIERS BY FLOOR TYPE</div>
              <h2>Let’s find the right options.</h2>
            </div>
            <p>Product details and availability are confirmed with your quote.</p>
          </div>
          <ProductExplorer products={publishedProducts} />
        </div>
      </section>
    </>
  );
}
