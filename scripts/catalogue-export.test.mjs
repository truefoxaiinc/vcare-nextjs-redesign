import assert from 'node:assert/strict';
import { test } from 'node:test';

import { buildSnapshot } from './catalogue-export.mjs';

const approved = {
  slug: 'oak-sample',
  name: 'Oak Sample',
  category: 'Hardwood',
  supplier: 'Wickham',
  description: 'Example description',
  publicationStatus: 'published',
  sourceStatus: 'verified',
  descriptionAuthorizationStatus: 'approved',
  descriptionAuthorizationReference: 'review-1',
  descriptionAuthorizedBy: 'Reviewer',
  descriptionAuthorizedAt: '2026-10-19',
  imageAuthorizationStatus: 'approved',
  imageAuthorizationReference: 'review-2',
  imageAuthorizedBy: 'Reviewer',
  imageAuthorizedAt: '2026-10-19',
};
const commit = 'a'.repeat(40);

test('export preserves approved source evidence and canonical link', () => {
  const snapshot = buildSnapshot([approved], commit);
  assert.equal(snapshot.source_commit, commit);
  assert.equal(snapshot.products[0].canonical_url, 'https://www.vcarehardwoodfloors.ca/products/oak-sample');
  assert.equal(snapshot.products[0].description_authorization_reference, 'review-1');
  assert.equal(snapshot.products[0].image_authorization_reference, 'review-2');
  assert.equal(snapshot.products[0].source_status, 'verified');
});

test('rejects pending, draft, unverified and missing reviewer metadata', () => {
  for (const patch of [
    { publicationStatus: 'draft' },
    { sourceStatus: 'unresolved' },
    { descriptionAuthorizationStatus: 'pending' },
    { imageAuthorizationStatus: 'pending' },
    { imageAuthorizedBy: '' },
    { descriptionAuthorizationReference: '' },
    { descriptionAuthorizedAt: 'invalid' },
  ]) {
    assert.throws(() => buildSnapshot([{ ...approved, ...patch }], commit));
  }
});

test('rejects duplicate and unsafe slugs', () => {
  assert.throws(() => buildSnapshot([approved, approved], commit));
  assert.throws(() => buildSnapshot([{ ...approved, slug: '../admin' }], commit));
});

test('sorts records deterministically', () => {
  const snapshot = buildSnapshot([
    { ...approved, slug: 'vinyl-floor' }, approved,
  ], commit);
  assert.deepEqual(snapshot.products.map(p => p.slug), ['oak-sample', 'vinyl-floor']);
});
