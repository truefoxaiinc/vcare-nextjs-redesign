import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductExplorer } from '@/components/catalog-ui';
import { products } from '@/data/catalog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Catalogue Preview | Vcare Admin',
  robots: { index: false, follow: false }
};

export default function CataloguePreviewPage() {
  return (
    <main className="admin-shell">
      <section className="admin-content">
        <div className="admin-top">
          <span className="admin-breadcrumb">Vcare / Authenticated product preview</span>
          <Link className="admin-user" href="/products">View public catalogue</Link>
        </div>
        <div className="admin-preview-notice">
          <b>Private draft preview — {products.length} products</b>
          <span>All records are shown for internal review. Draft images and descriptions are not published or licensed for public use by this preview.</span>
        </div>
        <div className="admin-title">
          <div>
            <h1>Flooring catalogue preview</h1>
            <p>Review product images, source descriptions, categories, suppliers and recorded authorization status.</p>
          </div>
        </div>
        <ProductExplorer
          products={products}
          hrefBase="/admin/products"
          showApprovalStatus
          productLabel="catalogue product"
        />
      </section>
    </main>
  );
}
