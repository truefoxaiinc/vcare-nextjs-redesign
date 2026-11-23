import type { Metadata } from 'next';
import { SupplierCard } from '@/components/supplier-card';
import { Breadcrumbs, PageIntro } from '@/components/site-shell';
import { suppliers } from '@/data/catalog';

export const metadata: Metadata = {
  title: 'Flooring Suppliers',
  description: 'Explore flooring suppliers and browse their available products at Vcare Hardwood Floors in Thornton, Ontario.',
  alternates: { canonical: '/suppliers' }
};

export default function SuppliersPage() {
  return (
    <>
      <PageIntro
        eyebrow="OUR SUPPLIER NETWORK"
        title="Meet our flooring suppliers."
        description="Browse supplier brands, then select a supplier to see products and images currently listed in our catalogue."
      />
      <Breadcrumbs items={[{ label: 'Suppliers' }]} />
      <section className="section section-cream">
        <div className="container">
          <div className="section-top">
            <div>
              <div className="eyebrow"><span />FLOORING PARTNERS</div>
              <h2>Explore our suppliers.</h2>
            </div>
            <p>Product options and availability are confirmed with your quote.</p>
          </div>
          <div className="product-grid">
            {suppliers.map(supplier => <SupplierCard key={supplier.name} supplier={supplier} />)}
          </div>
        </div>
      </section>
    </>
  );
}
