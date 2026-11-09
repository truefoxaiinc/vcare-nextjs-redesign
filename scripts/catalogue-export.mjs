/**
 * Offline, review-gated export of the actual Next.js publishedProducts collection.
 * Usage: node scripts/catalogue-export.mjs --out /tmp/vcare-catalogue-review.json
 * Never runs on website build or automatically activates the chatbot.
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import ts from 'typescript';

const BASE = resolve(fileURLToPath(new URL('..', import.meta.url)));
const FILES = {
  'catalog-authorization.ts': 'catalog-authorization.mjs',
  'supplier-product-imports.ts': 'supplier-product-imports.mjs',
  'catalog.ts': 'catalog.mjs',
};
const SITE = 'https://www.vcarehardwoodfloors.ca';

export function buildSnapshot(products, sourceCommit) {
  if (!/^[a-f0-9]{40}$/.test(sourceCommit)) throw new Error('Expected full git commit SHA');
  const slugs = new Set();
  const rows = products.map((product) => {
    if (product.publicationStatus !== 'published' || product.sourceStatus !== 'verified'
      || product.descriptionAuthorizationStatus !== 'approved'
      || product.imageAuthorizationStatus !== 'approved'
      || !product.descriptionAuthorizationReference?.trim()
      || !product.imageAuthorizationReference?.trim()
      || !product.descriptionAuthorizedBy?.trim()
      || !product.imageAuthorizedBy?.trim()
      || !product.descriptionAuthorizedAt || Number.isNaN(Date.parse(product.descriptionAuthorizedAt))
      || !product.imageAuthorizedAt || Number.isNaN(Date.parse(product.imageAuthorizedAt))) {
      throw new Error('Unapproved product in publishedProducts: ' + product.slug);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.slug) || slugs.has(product.slug)) {
      throw new Error('Invalid or duplicate slug: ' + product.slug);
    }
    slugs.add(product.slug);
    return {
      slug: product.slug,
      name: product.name,
      category: product.category,
      supplier: product.supplier,
      description: product.description,
      canonical_url: SITE + '/products/' + product.slug,
      publication_status: product.publicationStatus,
      source_status: product.sourceStatus,
      description_authorization_status: product.descriptionAuthorizationStatus,
      description_authorization_reference: product.descriptionAuthorizationReference,
      image_authorization_status: product.imageAuthorizationStatus,
      image_authorization_reference: product.imageAuthorizationReference,
    };
  });
  rows.sort((a, b) => a.slug.localeCompare(b.slug, 'en'));
  return { schema_version: 1, source_commit: sourceCommit, products: rows };
}

function compileCatalogue(directory) {
  for (const [source, target] of Object.entries(FILES)) {
    const raw = readFileSync(join(BASE, 'src/data', source), 'utf8');
    const result = ts.transpileModule(raw, {
      fileName: source,
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
      reportDiagnostics: true,
    });
    if (result.diagnostics?.length) throw new Error('TypeScript transpilation failed: ' + source);
    const js = result.outputText.replaceAll(
      /from ['"]@\\/data\\/(catalog-authorization|supplier-product-imports)['"]/g,
      (_match, name) => `from './${name}.mjs'`,
    );
    if (js.includes('@/data/')) throw new Error('Unexpected unresolved module alias: ' + source);
    writeFileSync(join(directory, target), js, { mode: 0o600 });
  }
}

export async function exportCatalogue(output) {
  if (!output) throw new Error('Explicit --out path is required');
  const target = resolve(output);
  if (existsSync(target)) throw new Error('Refusing to overwrite existing snapshot');
  const status = execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], { cwd: BASE, encoding: 'utf8' });
  if (status.trim()) throw new Error('Commit all tracked changes before exporting');
  const sha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: BASE, encoding: 'utf8' }).trim();
  const directory = mkdtempSync(join(tmpdir(), 'vcare-catalogue-'));
  try {
    compileCatalogue(directory);
    const { publishedProducts } = await import(pathToFileURL(join(directory, 'catalog.mjs')).href);
    const snapshot = buildSnapshot(publishedProducts, sha);
    const bytes = Buffer.from(JSON.stringify(snapshot, null, 2) + '\n');
    writeFileSync(target, bytes, { flag: 'wx', mode: 0o600 });
    return { count: snapshot.products.length, sha256: createHash('sha256').update(bytes).digest('hex'), sourceCommit: sha, path: target };
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const index = process.argv.indexOf('--out');
  const output = index >= 0 && process.argv.length === index + 2 ? process.argv[index + 1] : null;
  exportCatalogue(output).then(
    (result) => console.log(JSON.stringify(result, null, 2)),
    (error) => { console.error(error.message); process.exitCode = 1; },
  );
}
