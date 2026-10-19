import Link from 'next/link';
import type { Product } from '@/data/catalog';
import { CatalogProductImage } from '@/components/catalog-product-image';
import { ProductCard } from '@/components/product-card';
import { Breadcrumbs } from '@/components/site-shell';

type Props = {
  product: Product;
  related: Product[];
  categoryHref: string;
  productsHref?: string;
  productHrefBase?: string;
  preview?: boolean;
};

export function ProductDetail({ product, related, categoryHref, productsHref = '/products', productHrefBase = '/products', preview = false }: Props) {
  return <>
    <div className="product-detail container">
      <Breadcrumbs items={[{ label: preview ? 'Draft catalogue' : 'Shop floors', href: productsHref }, { label: product.category, href: categoryHref }, { label: product.name }]} />
      <div className="detail-grid">
        <div className="detail-photo"><CatalogProductImage src={product.imageUrl} alt={product.imageAlt} sizes="(max-width: 760px) 100vw, 55vw" priority /></div>
        <div className="detail-copy">
          <span className="detail-kicker">{product.category} · {product.supplier}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          {preview && <p className="product-approval-status">Image authorization: {product.imageAuthorizationStatus} · Description authorization: {product.descriptionAuthorizationStatus ?? 'pending'} · Publication: {product.publicationStatus}{product.sourceStatus === 'unresolved' ? ' · Source link unresolved' : ''}</p>}
          {product.specifications && <div className="spec-list">{Object.entries(product.specifications).map(([label, value]) => <div className="spec-row" key={label}><b>{label}</b><span>{value}</span></div>)}</div>}
          <p>Ask our team about current availability, samples and product details for your project.</p>
          <div className="detail-actions"><Link className="button button-primary" href={'/get-a-quote?product=' + encodeURIComponent(product.name)}>Request a Quote <span aria-hidden="true">↗</span></Link><a className="button button-outline" href="tel:+16473914283">Call 647 391 4283</a></div>
          <p className="detail-small">Product information is provided by the supplier. <a href={product.sourceUrl} target="_blank" rel="noreferrer">View supplier listing ↗</a></p>
        </div>
      </div>
    </div>
    {related.length > 0 && <section className="section section-cream"><div className="container"><div className="section-top"><div><div className="eyebrow"><span />MORE TO EXPLORE</div><h2>Similar floors to consider.</h2></div><Link className="section-link" href={productsHref}>Browse all floors <span>↗</span></Link></div><div className="product-grid">{related.map(item => <ProductCard key={item.slug} product={item} hrefBase={productHrefBase} showApprovalStatus={preview} />)}</div></div></section>}
  </>;
}
