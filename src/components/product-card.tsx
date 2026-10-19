import Link from 'next/link';
import type { Product } from '@/data/catalog';
import { CatalogProductImage } from '@/components/catalog-product-image';

type Props = { product: Product; hrefBase?: string; showApprovalStatus?: boolean };

export function ProductCard({ product, hrefBase = '/products', showApprovalStatus = false }: Props) {
  const href = `${hrefBase}/${product.slug}`;
  return (
    <article className="product-card">
      <Link className="product-image" href={href} aria-label={'Explore ' + product.name}>
        <CatalogProductImage src={product.imageUrl} alt={product.imageAlt} sizes="(max-width: 650px) 50vw, (max-width: 1100px) 33vw, 25vw" />
        <span className="product-category">{product.category}</span>
        <span className="quick-view">View Details <b aria-hidden="true">↗</b></span>
      </Link>
      <div className="product-info">
        <div>
          <span className="product-tone">{product.supplier}</span>
          <h3><Link href={href}>{product.name}</Link></h3>
          <p className="product-description">{product.description}</p>
          <Link className="product-details-link" href={href}>View Details <span aria-hidden="true">â†—</span></Link>
          {showApprovalStatus && <p className="product-approval-status">Image: {product.imageAuthorizationStatus} · Description: {product.descriptionAuthorizationStatus ?? 'pending'} · Publication: {product.publicationStatus}{product.sourceStatus === 'unresolved' ? ' · Source link unresolved' : ''}</p>}
        </div>
        <Link className="product-quote" href={'/get-a-quote?product=' + encodeURIComponent(product.name)}>
          Request a Quote <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
