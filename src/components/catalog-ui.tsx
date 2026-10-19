'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Product } from '@/data/catalog';
import { categories, suppliers } from '@/data/catalog';
import { ProductCard } from '@/components/product-card';
import { SupplierCard } from '@/components/supplier-card';

export function ProductExplorer({ products, initialCategory, hrefBase, showApprovalStatus = false, productLabel = 'verified product' }: { products: Product[]; initialCategory?: string; hrefBase?: string; showApprovalStatus?: boolean; productLabel?: string }) {
  const [category, setCategory] = useState(initialCategory ?? 'All floors');
  const [supplier, setSupplier] = useState('All suppliers');
  const [query, setQuery] = useState('');
  const filterCategories = ['All floors', ...categories.map(item => item.title)];
  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter(product => {
      const matchesCategory = category === 'All floors' || product.category === category;
      const matchesSupplier = supplier === 'All suppliers' || product.supplier === supplier;
      const searchText = [product.name, product.supplier, product.category, product.description].join(' ').toLowerCase();
      return matchesCategory && matchesSupplier && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [category, products, query, supplier]);
  const filteredSuppliers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return suppliers.filter(item => {
      const matchesCategory = category === 'All floors' || item.categories.some(value => value === category);
      const matchesSupplier = supplier === 'All suppliers' || item.name === supplier;
      const searchText = [item.name, ...item.categories].join(' ').toLowerCase();
      return matchesCategory && matchesSupplier && (!normalizedQuery || searchText.includes(normalizedQuery));
    });
  }, [category, query, supplier]);

  return (
    <div className="catalog-layout">
      <aside className="catalog-aside">
        <small>SHOP BY FLOOR</small>
        {filterCategories.map(item => (
          <button key={item} className={category === item ? 'filter-active' : ''} onClick={() => setCategory(item)}>
            {item}
            <span>{item === 'All floors' ? products.length : products.filter(product => product.category === item).length}</span>
          </button>
        ))}
        <label className="catalog-supplier-filter">
          Supplier
          <select value={supplier} onChange={event => setSupplier(event.target.value)}>
            <option>All suppliers</option>
            {suppliers.map(item => <option key={item.name}>{item.name}</option>)}
          </select>
        </label>
        <div className="aside-note">
          <b>Not sure where to start?</b>
          <p>Tell us about your space and we’ll help narrow the options.</p>
          <Link href="/get-a-quote">Talk with our team ↗</Link>
        </div>
      </aside>
      <div className="catalog-results">
        <div className="catalog-toolbar">
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search products, suppliers or floor type" aria-label="Search flooring products" />
          </label>
        </div>
        <section className="catalog-product-section" aria-labelledby="catalog-products-heading">
          <div className="section-top">
            <div>
              <div className="eyebrow"><span />VCARE FLOORING CATALOG</div>
              <h2 id="catalog-products-heading">Explore flooring products.</h2>
            </div>
            <p>Product details and availability are confirmed with your quote.</p>
          </div>
          <p className="result-count">Showing {filteredProducts.length} {productLabel}{filteredProducts.length === 1 ? '' : 's'}</p>
          {filteredProducts.length ? (
            <div className="product-grid">
              {filteredProducts.map(product => <ProductCard key={product.slug} product={product} hrefBase={hrefBase} showApprovalStatus={showApprovalStatus} />)}
            </div>
          ) : (
            <div className="empty-state">
              <h3>Product imagery is awaiting supplier approval</h3>
              <p>We’ve recorded verified supplier products, but are not publishing their descriptions or images until reuse permission is confirmed. Ask us about currently available options.</p>
              <Link className="button button-primary" href="/get-a-quote">Request a Quote ↗</Link>
            </div>
          )}
        </section>
        <section className="catalog-suppliers-section" aria-labelledby="catalog-suppliers-heading">
          <div className="section-top">
            <div>
              <div className="eyebrow"><span />OUR SUPPLIER NETWORK</div>
              <h2 id="catalog-suppliers-heading">Browse suppliers.</h2>
            </div>
          </div>
          <p className="result-count">Showing {filteredSuppliers.length} supplier{filteredSuppliers.length === 1 ? '' : 's'}</p>
          {filteredSuppliers.length ? (
            <div className="product-grid">
              {filteredSuppliers.map(item => <SupplierCard key={item.name} supplier={item} />)}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No suppliers found</h3>
              <p>Try another search or choose a different floor type.</p>
              <button className="button button-outline" onClick={() => { setQuery(''); setCategory('All floors'); setSupplier('All suppliers'); }}>Clear filters</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
