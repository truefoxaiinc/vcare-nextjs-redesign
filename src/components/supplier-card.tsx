import Link from 'next/link';
import Image from 'next/image';
import type { Supplier } from '@/data/catalog';

export function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <article className="supplier-card">
      <small>FLOORING SUPPLIER</small>
      {supplier.logoPath && (
        <div className="supplier-logo">
          <Image src={supplier.logoPath} alt={`${supplier.name} logo`} width={180} height={80} sizes="180px" style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }} />
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
