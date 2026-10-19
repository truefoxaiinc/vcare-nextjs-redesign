import type { Product } from '@/data/catalog';
import { clientReportedAuthorization } from '@/data/catalog-authorization';

const publishedImport = {
  publicationStatus: 'published' as const,
  sourceStatus: 'verified' as const,
  ...clientReportedAuthorization
};

const verifiedVidarSources: Record<string, string> = {
  driftwood: 'https://www.vidarflooring.com/en/component/content/article/american-oak-driftwood?catid=19',
  moonlight: 'https://www.vidarflooring.com/en/component/content/article/7-1-2%E2%80%98%E2%80%99-collection-american-white-oak-moon-light?catid=19',
  'urban-grey': 'https://www.vidarflooring.com/en/component/content/article/7-1-2-collection-american-white-oak-urban-grey?catid=19'
};

const vidarOakProducts = [
  ['driftwood', 'Driftwood', 'american-oak-driftwood', '58/9/2_Collection_-_American_White_Oak-Driftwood_original.png'],
  ['macaroon', 'Macaroon', '7-1-2-collection-american-white-oak-macaroon', '115/9/2_Collection_-_American_White_Oak-Macaroon_-_new_original.png'],
  ['moonlight', 'Moonlight', '7-1-2%E2%80%98%E2%80%99-collection-american-white-oak-moon-light', '235/9/2_Collection_-_American_White_Oak-Moonlight_-_new_original.png'],
  ['naked-oak', 'Naked Oak', '7-1-2-collection-american-white-oak-naked-oak', '242/9/2_Collection_-_American_White_Oak-Naked_Oak_original.png'],
  ['pearl', 'Pearl', '7-1-2-collection-american-white-oak-pearl', '114/9/2_Collection_-_American_White_Oak-Pearl_original.png'],
  ['silver-stone', 'Silver Stone', 'american-oak-silver-stone', '54/9/2_Collection_-_American_White_Oak-Silverstone_-_new_original.png'],
  ['sky', 'Sky', 'american-oak-sky', '55/9/2_Collection_-_American_White_Oak-Sky_-_new_original.png'],
  ['toffee-crunch', 'Toffee Crunch', '7-1-2-collection-american-white-oak-toffee-crunch', '116/9/2_Collection_-_American_White_Oak-Toffee_Crunch1_-_new_original.png'],
  ['urban-grey', 'Urban Grey', '7-1-2-collection-american-white-oak-urban-grey', '243/9/2_Collection_-_American_White_Oak-Urban_Grey_original.png'],
  ['wheatberry', 'Wheatberry', '7-1-2-collection-american-white-oak-wheatberry', '244/9/2_Collection_-_American_White_Oak-Wheatberry_original.png']
] as const;

const vidarProducts: Product[] = vidarOakProducts.map(([slug, colour, sourceSlug, imagePath]) => ({
  slug: `vidar-american-white-oak-${slug}`,
  name: `7 1/2'' Collection American White Oak – ${colour}`,
  category: 'Engineered Hardwood',
  supplier: 'Vidar',
  description: `Vidar lists ${colour} in its American Oak 7 engineered hardwood collection. The supplier specifies American white oak, 9/16-inch thickness, 7 1/2-inch width, a 3 mm veneer and a wirebrushed surface.`,
  imageUrl: `https://www.vidarflooring.com/media/acfgallery/content/${imagePath}`,
  imageAlt: `Supplier product image for Vidar American White Oak ${colour}`,
  sourceUrl: verifiedVidarSources[slug] ?? `https://vidarflooring.com/en/product/engineered-hardwood/${sourceSlug}`,
  sourceStatus: verifiedVidarSources[slug] ? 'verified' : 'unresolved',
  publicationStatus: verifiedVidarSources[slug] ? 'published' : 'draft',
  specifications: {
    Species: 'American White Oak',
    Collection: 'American Oak 7',
    Thickness: '9/16 inch',
    Width: '7 1/2 inch',
    Veneer: '3 mm',
    Surface: 'Wirebrushed'
  },
  ...clientReportedAuthorization
}));

const toucanSpc86 = [
  ['tfspc8610', 'TFSPC8610-F | Birch Whisper', '8610-1.webp?v=1781210200'],
  ['tfspc8609', 'TFSPC8609-F | Driftwood Shore', '8609-1.webp?v=1781210193'],
  ['tfspc8608', 'TFSPC8608-F | Prairie Dawn', '8608-1.webp?v=1781210201'],
  ['tfspc8607', 'TFSPC8607-F | Maple Glow', '8607-1.webp?v=1781210174'],
  ['tfspc8606', 'TFSPC8606-F | Harvest Amber', '8606-1.webp?v=1781210188'],
  ['tfspc8605', 'TFSPC8605-F | Boreal Light', '8605-1.webp?v=1781210205'],
  ['tfspc8604', 'TFSPC8604-F | Maple Dusk', '8604-1.webp?v=1781210195'],
  ['tfspc8603', 'TFSPC8603-F | Rocky Trail', '8603-1.webp?v=1781210202'],
  ['tfspc8602', 'TFSPC8602-F | Northern Linen', '8602-1.webp?v=1781210191'],
  ['tfspc8601', 'TFSPC8601-F | Morning Mist', '8601-1.webp?v=1781210167']
] as const;

const toucanSpc86Products: Product[] = toucanSpc86.map(([handle, name, image]) => ({
  slug: `toucan-${handle}`,
  name,
  category: 'Vinyl',
  supplier: 'Toucan',
  description: 'Toucan’s Whispers of Canada SPC 86 Series is an 8 mm rigid SPC plank with a waterproof stone core, 2 mm pre-attached pad, click-lock installation and a 20 mil wear layer.',
  imageUrl: `https://cdn.shopify.com/s/files/1/0910/9726/8503/files/${image}`,
  imageAlt: `Supplier product image for ${name}`,
  sourceUrl: `https://www.toucanflooring.com/products/${handle}`,
  specifications: {
    Series: 'SPC 86 / Whispers of Canada',
    Construction: 'Rigid SPC',
    Thickness: '8 mm (6 + 2 mm)',
    Underpad: '2 mm pre-attached',
    'Wear layer': '20 mil',
    Installation: 'I4F click-lock',
    Certification: 'FloorScore',
    Warranty: '30-year residential; 10-year light commercial'
  },
  ...publishedImport
}));

const toucanLuxcore = [
  ['tfcet1012', 'TFCET1012-F | Axios', 'TFCET1012-1.webp?v=1778609893'],
  ['tfcet1011', 'TFCET1011-F | Madera', 'TFCET1011-1.webp?v=1778609886']
] as const;

const toucanLuxcoreProducts: Product[] = toucanLuxcore.map(([handle, name, image]) => ({
  slug: `toucan-${handle}`,
  name,
  category: 'Vinyl',
  supplier: 'Toucan',
  description: 'Toucan’s LUXCORE is a 10 mm luxury vinyl plank with a patented three-layer ABA hybrid core, a waterproof construction, 2 mm pre-attached pad and a 22 mil wear layer.',
  imageUrl: `https://cdn.shopify.com/s/files/1/0910/9726/8503/files/${image}`,
  imageAlt: `Supplier product image for ${name}`,
  sourceUrl: `https://www.toucanflooring.com/products/${handle}`,
  specifications: {
    Series: 'CET10 / LUXCORE',
    Construction: 'ABA hybrid core',
    Thickness: '10 mm',
    Underpad: '2 mm pre-attached',
    'Wear layer': '22 mil / 0.5 mm',
    Installation: 'I4F click-lock in Canada',
    Certification: 'FloorScore',
    Warranty: '30-year residential; 10-year commercial'
  },
  ...publishedImport
}));

const leeHearthstone = [
  ['ancient', 'Ancient', '906'],
  ['anubis', 'Anubis', '904'],
  ['cache', 'Cache', '901'],
  ['canal', 'Canal', '908']
] as const;

const leeVinylProducts: Product[] = leeHearthstone.map(([handle, name, sku]) => ({
  slug: `lee-flooring-hearthstone-${handle}`,
  name,
  category: 'Vinyl',
  supplier: 'Lee Flooring',
  description: `Lee Flooring lists ${name} as a Hearthstone vinyl floor with 7 1/4-inch by 48-inch planks, a 7+2 mm EVA construction and drop-click installation.`,
  imageUrl: `https://leeflooring.ca/wp-content/uploads/2026/08/${name}.webp`,
  imageAlt: `Supplier product image for Lee Flooring ${name}`,
  sourceUrl: `https://leeflooring.ca/products/vinyl/hearthstone/${handle}/`,
  specifications: {
    SKU: sku,
    Collection: 'Hearthstone',
    Dimensions: '7 1/4 in × 48 in × 7+2 mm EVA',
    'Coverage per box': '15.31 sq. ft.',
    Installation: 'Drop click',
    'Radiant heat': 'Suitable for hydronic systems',
    Warranty: '25-year residential'
  },
  ...publishedImport
}));

const wickhamAsh = [
  ['almond', 'Almond', '2025/01/Domestic-plancher-bois-franc-ash-frene-almond-amande-hardwood-floor.jpg'],
  ['antique', 'Antique', '2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-antique.jpg'],
  ['barewood-2', 'Barewood', '2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-barewood.jpg'],
  ['beach', 'Beach', '2023/01/hardwood-flooring-plancher-bois-domestic-ash-frene-beach.jpg']
] as const;

const wickhamHardwoodProducts: Product[] = wickhamAsh.map(([handle, colour, imagePath]) => ({
  slug: `wickham-domestic-ash-${colour.toLowerCase()}`,
  name: `Ash, ${colour}`,
  category: 'Hardwood',
  supplier: 'Wickham',
  description: `Wickham lists Ash, ${colour} in its Domestic collection with solid and engineered hardwood construction options and matte, satin or semi-gloss finishes.`,
  imageUrl: `https://wickhamhardwood.com/wp-content/uploads/${imagePath}`,
  imageAlt: `Supplier product image for Wickham Domestic Ash ${colour}`,
  sourceUrl: `https://wickhamhardwood.com/product/ash-${handle}/`,
  specifications: {
    Species: 'Ash',
    Collection: 'Domestic',
    'Solid widths': '2 1/4 in, 3 1/4 in, 4 1/4 in, 5 in',
    'Engineered 1/2 width': '5 in',
    'Engineered 3/4 width': '7 in',
    Finishes: 'Matte 10°, Satin 35°, Semi-gloss 55°'
  },
  ...publishedImport
}));

const leeSignatureLaminate = [
  ['r1', 'R01', '3311', 'Soft Beige Oak', 'R01A.webp'],
  ['r2', 'R02', '3312', 'Desert Oak', 'R02A.webp'],
  ['r4', 'R04', '8764', 'Light Honey Oak', 'R04A.webp']
] as const;

const leeLaminateProducts: Product[] = leeSignatureLaminate.map(([handle, name, sku, colour, image]) => ({
  slug: `lee-flooring-signature-${handle}`,
  name,
  category: 'Laminate',
  supplier: 'Lee Flooring',
  description: `Lee Flooring lists ${name} (${colour}) in its 24-hour water-resistant Signature laminate collection with an AC4 rating and floating installation.`,
  imageUrl: `https://leeflooring.ca/wp-content/uploads/2025/03/${image}`,
  imageAlt: `Supplier product image for Lee Flooring ${name} ${colour}`,
  sourceUrl: `https://leeflooring.ca/products/laminate/water-resistant/signature/${handle}/`,
  specifications: {
    SKU: sku,
    Collection: '24Hr Water-Resistant Signature',
    Colour: colour,
    Dimensions: '7 1/2 in × 1/2 in × 48 in',
    'AC rating': 'AC4',
    'Coverage per box': '20.8 sq. ft.',
    Installation: 'Floating',
    'Radiant heat': 'Suitable for hydronic systems',
    Warranty: '35-year residential'
  },
  ...publishedImport
}));

const floorsAtWorkVinyl = [
  ['7mm-classic-collection', '7mm Classic Collection', 'bali.jpg?v=1787544689', '7mm NAF Classic', '7 mm', '7 mm × 182 mm × 1524 mm', '17.91 sq. ft.'],
  ['7mm-aqua-select', '7mm Aqua Select', 'collingwood.jpg?v=1787545276', '7mm NAF AquaSelect', '7 mm', '7 mm × 182 mm × 1524 mm', '17.91 sq. ft.'],
  ['7mm-aquaplus-gold', '7mm AquaPlus GOLD', 'dupont.jpg?v=1791483869', '7mm AquaPlus GOLD', '7 mm', '7 mm × 182 mm × 1524 mm', '17.91 sq. ft.'],
  ['9mm-aqua-platinum', '9mm Aqua Platinum', 'gemini056957.jpg?v=1787546062', '9mm NAF AQUA PLATINUM', '9 mm', '9 mm × 182 mm × 1500 mm', '14.69 sq. ft.'],
  ['10mm-aquawood', '10mm AquaWood', 'volga.jpg?v=1787542306', '10mm NAF AquaWood WPC Vinyl', '10 mm', '10 mm × 228 mm × 1524 mm', '29.92 sq. ft.']
] as const;

const floorsAtWorkVinylProducts: Product[] = floorsAtWorkVinyl.map(([handle, name, image, collection, thickness, plankSize, coverage]) => ({
  slug: `floors-at-work-${handle}`,
  name,
  category: 'Vinyl',
  supplier: 'Floors at Work',
  description: `Floors at Work lists ${name} as ${collection}, with ${thickness} construction and supplier-stated plank dimensions of ${plankSize}.`,
  imageUrl: `https://cdn.shopify.com/s/files/1/0694/1396/1799/files/${image}`,
  imageAlt: `Supplier product image for Floors at Work ${name}`,
  sourceUrl: `https://floorsatwork.com/products/${handle}`,
  specifications: {
    Collection: collection,
    Construction: name === '10mm AquaWood' ? 'WPC Vinyl' : 'Rigid Core SPC Vinyl',
    Thickness: thickness,
    'Plank size': plankSize,
    'Coverage per box': coverage
  },
  ...publishedImport
}));

export const supplierProductImports: Product[] = [
  ...vidarProducts,
  ...toucanSpc86Products,
  ...toucanLuxcoreProducts,
  ...leeVinylProducts,
  ...wickhamHardwoodProducts,
  ...leeLaminateProducts,
  ...floorsAtWorkVinylProducts
];
