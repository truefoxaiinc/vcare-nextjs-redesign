import Image from 'next/image';
import Link from 'next/link';
import { illustrativeProductImageAlt, money } from '@/data/catalog';
import type { Product } from '@/data/catalog';

export function ProductCard({product}:{product:Product}) {
  const save = product.was ? Math.round((1-product.price/product.was)*100) : 0;
  return <article className="product-card">
    <Link className="product-image" href={'/products/'+product.slug}><Image src={product.image} alt={illustrativeProductImageAlt} fill sizes="(max-width: 650px) 50vw, (max-width: 1100px) 33vw, 25vw"/><span className="product-category">{product.category}</span>{save>0&&<span className="sale-tag">Save {save}%</span>}<span className="quick-view">Explore floor <b>↗</b></span></Link>
    <div className="product-info"><div><span className="product-tone">{product.tone} · {product.wood}</span><h3><Link href={'/products/'+product.slug}>{product.name}</Link></h3></div><div className="product-price"><strong>{money(product.price)}</strong><span>/ sq. ft.</span>{product.was&&<del>{money(product.was)}</del>}</div><Link className="product-quote" href={'/get-a-quote?product='+encodeURIComponent(product.name)}>Ask about this floor <span>↗</span></Link></div>
  </article>;
}
