import { readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('../public/images/installation/', import.meta.url);
const maxFileBytes = 250 * 1024;
const maxGalleryBytes = 3 * 1024 * 1024;
const maxFiles = 16;

async function run() {
  const files = (await readdir(root)).filter(name => /\.(jpe?g|png|webp|avif)$/i.test(name)).sort();
  let total = 0;
  let failed = false;
  for (const name of files) {
    const bytes = (await stat(new URL(name, root))).size;
    total += bytes;
    if (bytes > maxFileBytes) {
      console.error(`OVER BUDGET ${name}: ${bytes} bytes (limit ${maxFileBytes})`);
      failed = true;
    }
  }
  if (files.length > maxFiles) {
    console.error(`OVER BUDGET gallery file count: ${files.length} (limit ${maxFiles})`);
    failed = true;
  }
  if (total > maxGalleryBytes) {
    console.error(`OVER BUDGET gallery total: ${total} bytes (limit ${maxGalleryBytes})`);
    failed = true;
  }
  console.log(`Installation gallery: ${files.length} images, ${(total / 1024 / 1024).toFixed(2)} MiB source bytes`);
  if (failed) process.exitCode = 1;
}
run().catch(error => {
  console.error('Asset budget check failed:', error.message);
  process.exitCode = 1;
});
