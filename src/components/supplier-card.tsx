import Link from 'next/link';
import Image from 'next/image';
import type { Supplier } from '@/data/catalog';

export function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <article className="supplier-card">
      <small>FLOORING SUPPLIER</small>
      {supplier.logoPath && (
        <div className={`supplier-logo${supplier.logoBackground ? ` supplier-logo-${supplier.logoBackground}` : ''}`}>
          <Image src={supplier.logoPath} alt={`${supplier.name} logo`} fill sizes="180px" style={{ objectFit: 'contain' }} />
        </div>
      )}
      <h3>{supplier.name}</h3>
      {supplier.categories.length > 0 && <p>{supplier.categories.join(' · ')}</p>}
      {supplier.productListingHref && (
        <Link className="supplier-products-link" href={supplier.productListingHref}>
          Browse products <span aria-hidden="true">↗</span>
        </Link>
      )}
      <Link className="product-quote" href={'/get-a-quote?product=' + encodeURIComponent(supplier.name)}>
        Request a Quote <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
