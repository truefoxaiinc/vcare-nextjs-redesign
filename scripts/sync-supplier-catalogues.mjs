#!/usr/bin/env node
/**
 * Discover product records from the approved suppliers' official public catalogues.
 *
 * This deliberately does not invent prices, availability, descriptions or image URLs.
 * It follows official XML sitemaps and extracts Schema.org Product JSON-LD from product
 * pages. The output is a reviewable source snapshot, not an automatic publication action.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const suppliers = [
  { name: 'Grandeur', origin: 'https://grandeurflooring.ca' },
  { name: 'Tosca', origin: 'https://toscaflooring.com' },
  { name: 'Floorsatwork', origin: 'https://floorsatwork.com' },
  { name: 'Toucan', origin: 'https://www.toucanflooring.com' },
  { name: 'Simba', origin: 'https://simbaflooringcorp.com' },
  { name: 'Wickham', origin: 'https://wickhamhardwood.com' },
  { name: 'Northernest', origin: 'https://northernestflooring.ca' },
  { name: 'Sherwood', origin: 'https://sherwoodforestproducts.com' },
  { name: 'Pangolin', origin: 'https://pangolflooring.com' },
  { name: 'Lee Flooring', origin: 'https://leeflooring.ca' },
  { name: 'Woden', origin: 'https://www.wodenflooring.com' },
  { name: 'Weiss', origin: 'https://www.weissflooring.ca' }
];

const outputPath = resolve(process.argv[2] ?? 'data/supplier-catalogue-discovery.json');
const maxPagesPerSupplier = Number(process.env.SUPPLIER_SYNC_MAX_PAGES ?? 500);
const delayMs = Number(process.env.SUPPLIER_SYNC_DELAY_MS ?? 250);
const userAgent = 'VcareSupplierCatalogueResearch/1.0 (+https://vcarehardwoodfloors.ca; catalogue metadata discovery)';
const sleep = ms => new Promise(resolveSleep => setTimeout(resolveSleep, ms));
const normalizeText = value => typeof value === 'string' ? value.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/\\s+/g, ' ').trim() : '';
const absoluteUrl = (value, base) => {
  try {
    const url = new URL(value, base);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch { return null; }
};
const slugify = value => normalizeText(value).toLowerCase().normalize('NFKD').replace(/[\\u0300-\\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function fetchText(url) {
  const response = await fetch(url, { headers: { 'user-agent': userAgent, accept: 'text/html,application/xml,application/xhtml+xml,*/*' }, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return { text: await response.text(), contentType: response.headers.get('content-type') ?? '' };
}

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>\\s*([^<]+?)\\s*<\\/loc>/gi)].map(match => match[1].replaceAll('&amp;', '&'));
}

async function discoverSitemaps(origin) {
  const candidates = [new URL('/sitemap.xml', origin).href, new URL('/sitemap_index.xml', origin).href];
  const robots = await fetchText(new URL('/robots.txt', origin).href).catch(() => null);
  if (robots) {
    for (const match of robots.text.matchAll(/^\\s*Sitemap:\\s*(\\S+)/gim)) candidates.unshift(match[1]);
  }
  const found = new Set();
  const queue = [...new Set(candidates)];
  while (queue.length && found.size < 30) {
    const sitemapUrl = queue.shift();
    if (found.has(sitemapUrl)) continue;
    try {
      const { text: xml } = await fetchText(sitemapUrl);
      found.add(sitemapUrl);
      for (const loc of extractLocs(xml)) {
        if (/\\.xml(?:\\?|$)/i.test(loc) && found.size + queue.length < 30) queue.push(loc);
      }
    } catch { /* alternate sitemap locations are expected */ }
  }
  return [...found];
}

function productObjects(value, found = []) {
  if (!value || typeof value !== 'object') return found;
  if (Array.isArray(value)) {
    for (const item of value) productObjects(item, found);
    return found;
  }
  const types = Array.isArray(value['@type']) ? value['@type'] : [value['@type']];
  if (types.some(type => String(type).toLowerCase() === 'product')) found.push(value);
  if (value['@graph']) productObjects(value['@graph'], found);
  return found;
}

function extractJsonLd(html) {
  const products = [];
  for (const match of html.matchAll(/<script[^>]+type=["']application\\/ld\\+json["'][^>]*>([\\s\\S]*?)<\\/script>/gi)) {
    try { productObjects(JSON.parse(match[1].replace(/^\\uFEFF/, '')), products); } catch { /* malformed third-party JSON-LD */ }
  }
  return products;
}

function categoryFor(product, pageUrl) {
  const text = [product.category, product.name, product.description, pageUrl].flat(Infinity).join(' ').toLowerCase();
  if (/laminate/.test(text)) return 'Laminate';
  if (/vinyl|spc|lvt|wpc|rigid.?core/.test(text)) return 'Vinyl';
  if (/engineered/.test(text)) return 'Engineered Hardwood';
  if (/hardwood|solid wood|oak|maple|ash|hickory|walnut/.test(text)) return 'Hardwood';
  return 'Unclassified';
}

function imageFrom(product, pageUrl) {
  const candidate = Array.isArray(product.image) ? product.image[0] : product.image;
  if (typeof candidate === 'string') return absoluteUrl(candidate, pageUrl);
  if (candidate && typeof candidate === 'object') return absoluteUrl(candidate.url ?? candidate.contentUrl, pageUrl);
  return null;
}

function mapProduct(raw, supplier, pageUrl) {
  const name = normalizeText(raw.name);
  if (!name) return null;
  const offers = Array.isArray(raw.offers) ? raw.offers[0] : raw.offers;
  const description = normalizeText(raw.description);
  const imageUrl = imageFrom(raw, pageUrl);
  return {
    slug: supplier.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + slugify(name),
    name,
    supplier: supplier.name,
    category: categoryFor(raw, pageUrl),
    description: description || null,
    imageUrl,
    sourceUrl: absoluteUrl(raw.url ?? pageUrl, pageUrl),
    sku: normalizeText(raw.sku) || null,
    brand: normalizeText(raw.brand?.name ?? raw.brand) || null,
    price: offers?.price != null && offers?.price !== '' ? String(offers.price) : null,
    priceCurrency: offers?.priceCurrency ?? null,
    availability: offers?.availability ?? null,
    sourceType: 'Schema.org Product JSON-LD',
    discoveredAt: new Date().toISOString()
  };
}

async function main() {
  const report = { generatedAt: new Date().toISOString(), method: 'official-sitemap + Schema.org Product JSON-LD', suppliers: [], products: [] };
  for (const supplier of suppliers) {
    const entry = { supplier: supplier.name, origin: supplier.origin, sitemapsFound: [], candidatePages: 0, productRecords: 0, errors: [] };
    try {
      entry.sitemapsFound = await discoverSitemaps(supplier.origin);
      const pageUrls = new Set();
      for (const sitemapUrl of entry.sitemapsFound) {
        try {
          const { text: xml } = await fetchText(sitemapUrl);
          for (const loc of extractLocs(xml)) {
            const url = absoluteUrl(loc, supplier.origin);
            if (url && new URL(url).hostname === new URL(supplier.origin).hostname && !/\\.(?:jpg|jpeg|png|webp|avif|pdf|xml)(?:$|\\?)/i.test(url)) pageUrls.add(url);
          }
        } catch (error) { entry.errors.push('Sitemap ' + sitemapUrl + ': ' + error.message); }
      }
      const candidates = [...pageUrls].filter(url => !/(?:\\/blog\\/|\\/news\\/|\\/about|\\/contact|\\/privacy|\\/terms)/i.test(url)).slice(0, maxPagesPerSupplier);
      entry.candidatePages = candidates.length;
      for (const url of candidates) {
        await sleep(delayMs);
        try {
          const { text: html } = await fetchText(url);
          for (const raw of extractJsonLd(html)) {
            const record = mapProduct(raw, supplier, url);
            if (record) report.products.push(record);
          }
        } catch (error) {
          if (entry.errors.length < 20) entry.errors.push(url + ': ' + error.message);
        }
      }
    } catch (error) { entry.errors.push('Supplier discovery failed: ' + error.message); }
    entry.productRecords = report.products.filter(product => product.supplier === supplier.name).length;
    entry.status = entry.productRecords ? 'records-found' : 'needs-manual-import';
    report.suppliers.push(entry);
    console.log(supplier.name + ': ' + entry.productRecords + ' product records from ' + entry.candidatePages + ' pages');
  }

  const unique = new Map();
  for (const product of report.products) {
    const key = product.supplier + '|' + (product.sourceUrl ?? product.slug);
    if (!unique.has(key)) unique.set(key, product);
  }
  report.products = [...unique.values()].sort((a, b) => a.supplier.localeCompare(b.supplier) || a.name.localeCompare(b.name));
  report.summary = {
    approvedSupplierCount: suppliers.length,
    suppliersWithRecords: report.suppliers.filter(item => item.productRecords > 0).length,
    suppliersNeedingManualImport: report.suppliers.filter(item => item.productRecords === 0).map(item => item.supplier),
    uniqueProductRecords: report.products.length
  };
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(report, null, 2) + '\\n', 'utf8');
  console.log('Wrote ' + report.products.length + ' product records to ' + outputPath);
  if (report.suppliers.some(item => item.errors.length)) console.warn('Some supplier pages could not be crawled; inspect the report before importing.');
}

main().catch(error => { console.error(error); process.exitCode = 1; });
