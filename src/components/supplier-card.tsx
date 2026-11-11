import Link from 'next/link';
import Image from 'next/image';
import type { Supplier } from '@/data/catalog';

export function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <article className="supplier-card">
      <small>FLOORING SUPPLIER</small>
      {supplier.logoPath && (
        <div className="supplier-logo" style={{ position: 'relative', width: 180, height: 80, maxWidth: '100%' }}>
          <Image src={supplier.logoPath} alt={`${supplier.name} logo`} fill sizes="180px" style={{ objectFit: 'contain' }} />
        </div>
      )}
      <h3>{supplier.name}</h3>
      {supplier.categories.length > 0 && <p>{supplier.categories.join(' · ')}</p>}
      <Link className="product-quote" href={'/get-a-quote?product=' + encodeURIComponent(supplier.name)}>
        Request a Quote <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
