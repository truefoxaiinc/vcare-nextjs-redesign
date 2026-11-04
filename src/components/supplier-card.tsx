import Link from 'next/link';
import type { Supplier } from '@/data/catalog';

export function SupplierCard({ supplier }: { supplier: Supplier }) {
  return (
    <article className="supplier-card">
      <small>FLOORING SUPPLIER</small>
      <h3>{supplier.name}</h3>
      {supplier.categories.length > 0 && <p>{supplier.categories.join(' · ')}</p>}
      <Link className="product-quote" href={'/get-a-quote?product=' + encodeURIComponent(supplier.name)}>
        Request a Quote <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
