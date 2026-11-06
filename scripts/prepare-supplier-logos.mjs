import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// Copy only the ten reviewed supplier assets from docs to Next.js public assets.
const files = [
  "grandeurflooring-logo.png",
  "Tosca-logo.webp",
  "Floorsatwork-logo.avif",
  "Toucan-logo.avif",
  "Simba-logo.png",
  "Wickham-logo.svg",
  "Northernest-logo.png",
  "Sherwood-logo.webp",
  "Lee Flooring-logo.webp",
  "Weiss-logo.avif"
];
const source = join(process.cwd(), 'docs', 'supplier-logos');
const destination = join(process.cwd(), 'public', 'images', 'suppliers');
mkdirSync(destination, { recursive: true });
for (const file of files) {
  const from = join(source, file);
  if (!existsSync(from)) throw new Error('Missing supplier logo: ' + from);
  copyFileSync(from, join(destination, file));
}
console.log('Prepared ' + files.length + ' supplier logos');
