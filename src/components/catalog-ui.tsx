'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Product } from '@/data/catalog';
import { money } from '@/data/catalog';

export function ProductCard({product}:{product:Product}) {
  const save = product.was ? Math.round((1-product.price/product.was)*100) : 0;
  return <article className="product-card">
    <Link className="product-image" href={'/products/'+product.slug}><Image src={product.image} alt={product.alt} fill sizes="(max-width: 650px) 50vw, (max-width: 1100px) 33vw, 25vw" unoptimized/><span className="product-category">{product.category}</span>{save>0&&<span className="sale-tag">Save {save}%</span>}<span className="quick-view">Explore floor <b>↗</b></span></Link>
    <div className="product-info"><div><span className="product-tone">{product.tone} · {product.wood}</span><h3><Link href={'/products/'+product.slug}>{product.name}</Link></h3></div><div className="product-price"><strong>{money(product.price)}</strong><span>/ sq. ft.</span>{product.was&&<del>{money(product.was)}</del>}</div><Link className="product-quote" href={'/get-a-quote?product='+encodeURIComponent(product.name)}>Ask about this floor <span>↗</span></Link></div>
  </article>;
}

export function ProductExplorer({products,initialCategory}:{products:Product[];initialCategory?:string}) {
  const [category,setCategory]=useState(initialCategory??'All floors');
  const [query,setQuery]=useState('');
  const [sort,setSort]=useState('featured');
  const categories=['All floors','Hardwood','Engineered Hardwood','Laminate','Vinyl'];
  const filtered=useMemo(()=> {
    let list=products.filter(p=>(category==='All floors'||p.category===category)&&(!query||p.name.toLowerCase().includes(query.toLowerCase())||p.tone.toLowerCase().includes(query.toLowerCase())));
    if(sort==='low') list=[...list].sort((a,b)=>a.price-b.price);
    if(sort==='high') list=[...list].sort((a,b)=>b.price-a.price);
    return list;
  },[products,category,query,sort]);
  return <div className="catalog-layout">
    <aside className="catalog-aside"><small>SHOP BY FLOOR</small>{categories.map(c=><button key={c} className={category===c?'filter-active':''} onClick={()=>setCategory(c)}>{c}<span>{c==='All floors'?products.length:products.filter(p=>p.category===c).length}</span></button>)}<div className="aside-note"><b>Not sure where to start?</b><p>Tell us about your space and we’ll help narrow the options.</p><Link href="/get-a-quote">Talk with our team ↗</Link></div></aside>
    <div className="catalog-results"><div className="catalog-toolbar"><label className="search-box"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search colour, style or collection" aria-label="Search floors"/></label><label className="sort-label">Sort by <select value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div>
      <p className="result-count">Showing {filtered.length} thoughtfully selected floors</p>{filtered.length?<div className="product-grid">{filtered.map(p=><ProductCard key={p.slug} product={p}/>)}</div>:<div className="empty-state"><h3>No floors found</h3><p>Try another search or choose a different collection.</p><button className="button button-outline" onClick={()=>{setQuery('');setCategory('All floors')}}>Clear filters</button></div>}
    </div>
  </div>;
}

export function AreaCalculator({price}:{price:number}) {
 const [length,setLength]=useState('');const [width,setWidth]=useState('');
 const area=Number(length)*Number(width);const needed=Math.ceil(area*1.1);const estimate=area?money(area*price*1.1):'—';
 return <div className="calculator"><div><small>PLAN YOUR PROJECT</small><h3>Estimate what you’ll need</h3><p>Enter room dimensions. We’ll add 10% for cuts and fitting.</p></div><div className="calc-inputs"><label>Length (ft)<input type="number" min="0" step="0.1" value={length} onChange={e=>setLength(e.target.value)} placeholder="e.g. 14"/></label><label>Width (ft)<input type="number" min="0" step="0.1" value={width} onChange={e=>setWidth(e.target.value)} placeholder="e.g. 12"/></label></div><div className="calc-result"><div><span>Approx. area</span><b>{area?needed+' sq. ft.':'—'}</b></div><div><span>Approx. material*</span><b>{estimate}</b></div><small>*Planning estimate only. Box coverage and final pricing are confirmed with your quote.</small></div></div>;
}
