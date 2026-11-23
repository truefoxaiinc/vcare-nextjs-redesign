import type { Product } from '@/data/catalog';
import {
  clientReportedAuthorization,
  grandeurLaminateDisplayAuthorization,
  grandeurProductDisplayAuthorization,
  grandeurSolidHardwoodDisplayAuthorization,
  grandeurVinylDisplayAuthorization,
  northernestCoastalImageDisplayAuthorization,
  pangolinOriginSpcDisplayAuthorization,
  simba2024LaminateDisplayAuthorization,
  simba2052LaminateDisplayAuthorization,
  simba20360LaminateDisplayAuthorization,
  simba20860LaminateDisplayAuthorization,
  simba2055LaminateDisplayAuthorization,
  simbaLaminateDisplayAuthorization,
  simbaProductDisplayAuthorization,
  vidarProductDisplayAuthorization
} from '@/data/catalog-authorization';

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



// Additional records below are taken from the approved suppliers' public catalogues.
// Where a supplier does not expose a stable product image URL, the product is listed
// with the intentional "Image unavailable" fallback rather than a guessed or reused image.
const slugPart = (value: string) => value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function supplierListingProduct(
  supplier: string,
  category: Product['category'],
  name: string,
  sourceUrl: string,
  specifications?: Record<string, string>,
  imageUrl?: string
): Product {
  return {
    slug: slugPart(supplier) + '-' + slugPart(name),
    name,
    category,
    supplier,
    description: name + ' is listed in ' + supplier + "'s official " + category.toLowerCase() + ' catalogue. Confirm current colour options, specifications and availability with the supplier.',
    imageUrl,
    imageAlt: imageUrl ? 'Supplier product image for ' + supplier + ' ' + name : 'No product image supplied for ' + supplier + ' ' + name,
    sourceUrl,
    specifications,
    ...publishedImport
  };
}

const vidarLaminateProducts = [
  ['DB25', '222/9/Laminate_Flooring_Collection-DB25_1_original.jpg', 'laminate-flooring-collection-db25'],
  ['HZ', '258/9/Laminate_Flooring_Collection-HZ_1_original.jpg', 'laminate-flooring-collection-hz'],
  ['LP', '259/9/Laminate_Flooring_Collection-LP_1_original.jpg', 'laminate-flooring-collection-lp'],
  ['NK25', '219/9/Laminate_Flooring_Collection-NK25_1_original.jpg', 'laminate-flooring-collection-nk25'],
  ['SD25', '220/9/Laminate_Flooring_Collection-SD25_1_original.jpg', 'laminate-flooring-collection-sd25'],
  ['TF25', '221/9/Laminate_Flooring_Collection-TF25_1_original.jpg', 'laminate-flooring-collection-tf25']
] as const;

const vidarLaminateImports: Product[] = vidarLaminateProducts.map(([code, imagePath, sourcePath]) => {
  const name = `Laminate Flooring Collection-${code}`;
  const product = supplierListingProduct(
    'Vidar',
    'Laminate',
    name,
    `https://vidarflooring.com/en/component/content/article/${sourcePath}?catid=18`,
    {
      Collection: 'Laminate',
      Thickness: '1/2 inch',
      Width: '7 1/2 inch',
      'Surface texture': 'Wirebrushed'
    },
    `https://vidarflooring.com/media/acfgallery/content/${imagePath}`
  );
  return {
    ...product,
    description: `Vidar lists this laminate collection with 1/2-inch thickness, 7 1/2-inch width and a wirebrushed surface. Confirm current colour options and availability when requesting a quote.`,
    imageAlt: `Vidar ${code} laminate flooring collection`,
    ...vidarProductDisplayAuthorization
  };
});

const grandeurPacificProductImages: Partial<Record<string, string>> = {
  Canterbury: 'https://grandeurflooring.ca/images/products/thumb/canterbury-491550.jpg',
  'Golden Bay': 'https://grandeurflooring.ca/images/products/thumb/golden-bay.jpg',
  Queenstown: 'https://grandeurflooring.ca/images/products/thumb/queenstown.jpg',
  '88006-2': 'https://grandeurflooring.ca/images/products/thumb/88006-2-103521.jpg'
};

const grandeurPacific = [
  'Canterbury', 'Golden Bay', 'Queenstown', 'Wellington', '88006-2'
].map(name => {
  const imageUrl = grandeurPacificProductImages[name];
  const product = supplierListingProduct(
    'Grandeur',
    'Vinyl',
    name,
    imageUrl
      ? `https://grandeurflooring.ca/${slugPart(name)}.html`
      : 'https://grandeurflooring.ca/commercial/commercial-products/pacific.html',
    { Collection: 'Pacific', Construction: 'SPC vinyl' },
    imageUrl
  );
  return imageUrl ? { ...product, ...grandeurVinylDisplayAuthorization } : product;
});

const grandeur12Collection = [
  ['Arles Natural', 'arles-natural', 'arles-natural-347519.jpg'],
  ['Fado Gavia', 'fado-gavia', 'fado-gavia-963161.jpg'],
  ['Fado Sotavento', 'fado-sotavento', 'fado-sotavento-541593.jpg'],
  ['Kalas Albar', 'kalas-albar', 'kalas-albar-008841.jpg'],
  ['Kalmar Gris', 'kalmar-gris', 'kalmar-gris-517179.jpg'],
  ['Kalas Noz', 'kalas-noz', 'kalas-noz-323524.jpg'],
  ['Roble Twilight', 'roble-twilight', 'roble-twilight-274332.jpg'],
  ['Viena Dorado', 'viena-dorado', 'viena-dorado-747254.jpg'],
  ['Wexford Tostado', 'wexford-tostado', 'wexford-tostado-021187.jpg']
] as const;

const grandeurLaminateProducts: Product[] = grandeur12Collection.map(([name, slug, image]) => ({
  ...supplierListingProduct(
    'Grandeur',
    'Laminate',
    name,
    `https://grandeurflooring.ca/${slug}.html`,
    { Collection: '12 Collection', Dimensions: '53 in × 8 in × 1/2 in', 'Abrasion rating': 'AC6' },
    `https://grandeurflooring.ca/images/products/thumb/${image}`
  ),
  description: `Grandeur lists ${name} in its 12 Collection laminate range with 53-inch by 8-inch planks and an AC6 abrasion rating.`,
  imageAlt: `Grandeur ${name} laminate flooring`,
  ...grandeurLaminateDisplayAuthorization
}));

const grandeurEngineeredHardwood = [
  ['Scandinavia', 'White Oak', '6-1/2 in × 3/4 in × random length', 'scandinavia.jpg'],
  ['Paradise', 'White Oak', '6 in × 3/4 in', 'paradise.png'],
  ['Artisan', 'Hickory', '6-1/2 in × 3/4 in', 'artisan-177450.jpg'],
  ['Ultra', 'White Oak', '7-1/2 in × 3/4 in', 'ultra.jpg'],
  ['Sunshine', 'White Oak', '6 in × 3/4 in', 'sunshine.jpg'],
  ['Metropolitan', 'White Oak', '7-1/2 in × 3/4 in', 'metropolitan.jpg'],
  ['Elevation', 'Hickory', '7-1/2 in × 3/4 in', 'elevation.jpg'],
  ['Divine', 'Maple', '7-1/2 in × 3/4 in', 'divine-237531.jpg'],
  ['Enterprise', 'White Oak', '7-1/2 in × 3/4 in', 'enterprise.jpg'],
  ['Crown Land', 'White Oak', '7-1/2 in × 3/4 in', 'crown-land.jpg'],
  ['Herringbone', 'White Oak', '5 in × 3/4 in × 24 in; 6 in × 3/4 in × 36 in', 'herringbone.png'],
  ['Elite', 'White Oak', '9-1/2 in × 3/4 in × 86 in', 'elite.jpg'],
  ['Regal', 'White Oak', '7-1/2 in × 3/4 in; 6 in × 3/4 in', 'regal.jpg'],
  ['Regal Plus', 'White Oak', '7-1/2 in × 3/4 in; 6 in × 3/4 in; herringbone', 'regal-plus-583932.jpg'],
  ['Atelier', 'White Oak', '7-1/2 in × 3/4 in', 'atelier-049705.png']
] as const;

const grandeurEngineeredProducts: Product[] = grandeurEngineeredHardwood.map(([name, species, dimensions, image]) => {
  const slug = slugPart(name);
  const product = supplierListingProduct(
    'Grandeur',
    'Engineered Hardwood',
    name,
    `https://grandeurflooring.ca/${slug}.html`,
    { Collection: name, Species: species, Dimensions: dimensions },
    `https://grandeurflooring.ca/images/products-collections/${image}`
  );
  return {
    ...product,
    description: `Grandeur lists ${name} as an engineered hardwood collection in ${species}. Confirm current colour options, specifications and availability with Vcare.`,
    imageAlt: `Grandeur ${name} engineered hardwood collection`,
    ...grandeurProductDisplayAuthorization
  };
});

const grandeurSolidHardwoodProducts: Product[] = [{
  ...supplierListingProduct(
    'Grandeur',
    'Hardwood',
    'Contemporary',
    'https://grandeurflooring.ca/contemporary-62.html',
    { Collection: 'Contemporary', Species: 'Red Oak', Dimensions: '4-1/4 in × 3/4 in' },
    'https://grandeurflooring.ca/images/products-collections/contemporary.jpg'
  ),
  description: 'Grandeur lists Contemporary as a solid hardwood collection in Red Oak with 4-1/4-inch by 3/4-inch planks.',
  imageAlt: 'Grandeur Contemporary solid hardwood collection',
  ...grandeurSolidHardwoodDisplayAuthorization
}];

const grandeurVinylCollections = [
  ['Atlantic', 'SPC', 'Drop Lock', '5.0/0.3 mm', '5g-click-spc-flooring.jpg'],
  ['Continental', 'SPC', 'Drop Lock', '6.0/0.3 mm; 7.0/0.5 mm', 'continental.jpg'],
  ['Pacific', 'SPC', 'Drop Lock', '7.0/0.5 mm', 'pacific-36.jpg'],
  ['Anchor 7', 'SPC', 'Drop Lock', '7.0/0.5 mm', 'anchor-7-461848.jpg'],
  ['Wonder 7', 'SPC', 'Drop Lock', '7.0/0.5 mm', 'wonder-7.jpg'],
  ['Inov8', 'SPC', 'Välinge 5G Click', '8.0/0.5 mm', 'inov8.jpg'],
  ['Designer', 'SPC Herringbone', 'Drop Lock', '7.0/0.5 mm', 'designer-240747.png'],
  ['Bliss', 'WPC', 'Välinge 5G Click', '8.5/0.55 mm', 'bliss.jpg'],
  ['BEACON', 'Engineered Vinyl', 'Välinge 5G Click', '9.0/0.55 mm', 'beacon-706786.jpg'],
  ['Supreme X', 'WPC', 'Välinge 5G Click', '10/0.55 mm', 'supreme-x.jpg'],
  ['Essential', 'Dry-Back', 'Glue Down', '3.0/0.5 mm', 'essential.jpg'],
  ['Entrepreneur', 'Dry-Back', 'Glue Down', '4.0/0.5 mm', 'entrepreneur-280224.jpg'],
  ['Timeless', 'Loose-Lay', 'Glue Down', '5.0/0.5 mm', 'timeless.jpg'],
  ['Ultimate', 'Loose-Lay', 'Glue Down', '5.0/0.7 mm', 'ultimate.jpg']
] as const;

const grandeurVinylProducts: Product[] = grandeurVinylCollections.map(([name, construction, installation, productSpec, image]) => {
  const slug = slugPart(name);
  const product = supplierListingProduct(
    'Grandeur',
    'Vinyl',
    name,
    `https://grandeurflooring.ca/${slug}.html`,
    {
      Collection: name,
      Construction: construction,
      Installation: installation,
      'Supplier specification': productSpec
    },
    `https://grandeurflooring.ca/images/products-collections/${image}`
  );
  return {
    ...product,
    description: `Grandeur lists ${name} in its vinyl flooring range as ${construction}, with ${installation} installation and supplier specification ${productSpec}. Confirm current options and availability with Vcare.`,
    imageAlt: `Grandeur ${name} vinyl flooring collection`,
    ...grandeurVinylDisplayAuthorization
  };
});

const simbaSpcCodes = [
  '58002-3', '58023-10', '58065-3', '581066-1', '58305-21', '58730-10',
  '58730-2', '58943-01', '58943-03', '58943-06', '58943-15', '58943-16'
];
const simbaSpcImages: Partial<Record<string, string>> = {
  '58002-3': 'https://simbaflooringcorp.com/wp-content/uploads/2024/01/58002-3.jpg',
  '58023-10': 'https://simbaflooringcorp.com/wp-content/uploads/2024/01/58023-10.jpg',
  '58065-3': 'https://simbaflooringcorp.com/wp-content/uploads/2024/01/58065-3.jpg',
  '581066-1': 'https://simbaflooringcorp.com/wp-content/uploads/2022/03/581066-1-scaled.jpg',
  '58305-21': 'https://simbaflooringcorp.com/wp-content/uploads/2024/12/58305-21-scaled.jpg',
  '58730-10': 'https://simbaflooringcorp.com/wp-content/uploads/2024/12/58730-10-scaled.jpg',
  '58730-2': 'https://simbaflooringcorp.com/wp-content/uploads/2024/12/58730-2-scaled.jpg',
  '58943-01': 'https://simbaflooringcorp.com/wp-content/uploads/2022/03/58943-01-scaled.jpg',
  '58943-03': 'https://simbaflooringcorp.com/wp-content/uploads/2022/03/58943-03-scaled.jpg',
  '58943-06': 'https://simbaflooringcorp.com/wp-content/uploads/2022/03/58943-06-scaled.jpg',
  '58943-15': 'https://simbaflooringcorp.com/wp-content/uploads/2022/03/58943-15-scaled.jpg',
  '58943-16': 'https://simbaflooringcorp.com/wp-content/uploads/2022/03/58943-16-scaled.jpg'
};
const simbaSpcProducts = simbaSpcCodes.map(code => {
  const imageUrl = simbaSpcImages[code];
  const product = supplierListingProduct(
    'Simba',
    'Vinyl',
    code,
    'https://simbaflooringcorp.com/product-category/spc-flooring/',
    code === '58002-3'
      ? { Collection: 'Galaxy', Construction: 'SPC', Length: '1540 mm', Width: '230 mm', Thickness: '5 mm', Underlayment: '1.5 mm IXPE', 'Wear layer': '0.5 mm', Grain: 'EIR' }
      : { Collection: 'Galaxy', Construction: 'SPC' },
    imageUrl
  );
  return imageUrl ? { ...product, ...simbaProductDisplayAuthorization } : product;
});

const simbaLaminateImageUrl = 'https://simbaflooringcorp.com/wp-content/uploads/2026/10/PHOTO-2026-10-15-20-51-56.jpg';
const simbaLaminateDescription = 'Simba’s Water Resistant Laminate Collection pairs a 12 mm rigid core with a 2 mm attached underlay for 14 mm total thickness. Its water-resistant construction is designed for everyday residential use and occasional spills; confirm current options and availability with Vcare.';
const simba2024LaminateImageUrl = 'https://simbaflooringcorp.com/wp-content/uploads/2021/03/2024.jpg';
const simba2052LaminateImageUrl = 'https://simbaflooringcorp.com/wp-content/uploads/2021/03/2025.jpg';
const simba20360LaminateImageUrl = 'https://simbaflooringcorp.com/wp-content/uploads/2021/12/20360-scaled.jpg';
const simba20860LaminateImageUrl = 'https://simbaflooringcorp.com/wp-content/uploads/2021/12/20860-scaled.jpg';
const simba2055LaminateImageUrl = 'https://simbaflooringcorp.com/wp-content/uploads/2021/03/2055.jpg';
const simbaWaterproofLaminateDescription = 'Simba’s AC4 waterproof laminate is designed for residential and light commercial spaces. It is described as resisting scratches, dents, and fading, making it suitable for high-traffic and moisture-prone rooms such as kitchens and bathrooms. Easy to install and maintain, it offers a hardwood- or stone-inspired look at an affordable price.';
const simbaWaterproofLaminateSpecifications = {
  'Wear class': 'AC4',
  'Water resistance': 'Waterproof',
  'Recommended use': 'Residential and light commercial',
  'Surface durability': 'Resists scratches, dents, and fading'
};
const simbaLaminateProducts = ['00306', '2024', '20360', '2052', '2055', '20860'].map(code => {
  const sourceUrl = code === '20360' || code === '20860' || code === '2055'
    ? 'https://simbaflooringcorp.com/product-category/waterproof-laminate/'
    : 'https://simbaflooringcorp.com/shop/';
  const product = supplierListingProduct(
    'Simba',
    'Laminate',
    code,
    sourceUrl,
    {
      Collection: 'Water Resistant Laminate Collection',
      Construction: '12 mm rigid core + 2 mm attached underlay',
      'Total thickness': '14 mm',
      'Water resistance': 'Water-resistant'
    },
    simbaLaminateImageUrl
  );

  if (code === '2024') {
    return {
      ...product,
      imageUrl: simba2024LaminateImageUrl,
      imageAlt: 'Simba 2024 AC4 waterproof laminate flooring',
      description: simbaWaterproofLaminateDescription,
      specifications: {
        ...product.specifications,
        ...simbaWaterproofLaminateSpecifications
      },
      ...simba2024LaminateDisplayAuthorization
    };
  }

  if (code === '2052') {
    return {
      ...product,
      imageUrl: simba2052LaminateImageUrl,
      imageAlt: 'Simba 2052 AC4 waterproof laminate flooring',
      description: simbaWaterproofLaminateDescription,
      specifications: {
        ...product.specifications,
        ...simbaWaterproofLaminateSpecifications
      },
      ...simba2052LaminateDisplayAuthorization
    };
  }

  if (code === '20360') {
    return {
      ...product,
      imageUrl: simba20360LaminateImageUrl,
      imageAlt: 'Simba 20360 AC4 waterproof laminate flooring',
      description: simbaWaterproofLaminateDescription,
      specifications: {
        ...product.specifications,
        ...simbaWaterproofLaminateSpecifications
      },
      ...simba20360LaminateDisplayAuthorization
    };
  }

  if (code === '20860') {
    return {
      ...product,
      imageUrl: simba20860LaminateImageUrl,
      imageAlt: 'Simba 20860 AC4 waterproof laminate flooring',
      description: simbaWaterproofLaminateDescription,
      specifications: {
        ...product.specifications,
        ...simbaWaterproofLaminateSpecifications
      },
      ...simba20860LaminateDisplayAuthorization
    };
  }

  if (code === '2055') {
    return {
      ...product,
      imageUrl: simba2055LaminateImageUrl,
      imageAlt: 'Simba 2055 AC4 waterproof laminate flooring',
      description: simbaWaterproofLaminateDescription,
      specifications: {
        ...product.specifications,
        ...simbaWaterproofLaminateSpecifications
      },
      ...simba2055LaminateDisplayAuthorization
    };
  }

  return {
    ...product,
    description: simbaLaminateDescription,
    ...simbaLaminateDisplayAuthorization
  };
});

const northernestCoastalImages: Record<string, string> = {
  'Warm Beechwood': 'https://northernestflooring.ca/wp-content/uploads/2026/01/WARM-BEECHWOOD-View-1-2.jpg',
  'Pure Walnut': 'https://northernestflooring.ca/wp-content/uploads/2026/01/PURE-WALNUT-2.jpg',
  Nappa: 'https://northernestflooring.ca/wp-content/uploads/2026/01/NAPPA-3.jpg',
  Monaco: 'https://northernestflooring.ca/wp-content/uploads/2026/01/Monaco-2.jpg',
  Element: 'https://northernestflooring.ca/wp-content/uploads/2025/10/ELEMENT-1.jpg',
  Celeste: 'https://northernestflooring.ca/wp-content/uploads/2025/10/CELESTE-2.jpg',
  Belize: 'https://northernestflooring.ca/wp-content/uploads/2025/10/Belize-1-450x225.jpg'
};
const northernestCoastal = [
  'Warm Beechwood', 'Pure Walnut', 'Monaco', 'Nappa', 'Element', 'Celeste', 'Belize'
].map(name => {
  const product = supplierListingProduct(
    'Northernest',
    'Engineered Hardwood',
    name,
    'https://northernestflooring.ca/product-category/engineered/coastal/',
    name === 'Warm Beechwood' || name === 'Pure Walnut' || name === 'Monaco' || name === 'Nappa'
      ? { Collection: 'Coastal', Species: 'European White Oak', Construction: 'Multi-layer engineered', Dimensions: '7-1/2 in × 3/4 in × random length', 'Wear layer': '1.5 mm', Profile: 'Tongue and groove', Finish: 'UV-lacquered matte' }
      : { Collection: 'Coastal', Species: 'European White Oak' },
    northernestCoastalImages[name]
  );

  return name === 'Warm Beechwood'
    ? product
    : { ...product, ...northernestCoastalImageDisplayAuthorization };
});

const sherwoodProducts = [
  supplierListingProduct('Sherwood', 'Vinyl', '12 x 24 Vinyl Tile Click', 'https://sherwoodforestproducts.com/product/12-x-24-vinyl-tile-click/', { Thickness: '6 mm with underpad', 'Coverage per box': '20.02 sq. ft.', Colours: 'Calcutta, Stone Argento, Stone Grey, Venato' }),
  supplierListingProduct('Sherwood', 'Vinyl', '2mm LVT Glue Down Vinyl', 'https://sherwoodforestproducts.com/shop/', { Construction: 'Glue-down LVT', Thickness: '2 mm' }),
  supplierListingProduct('Sherwood', 'Vinyl', '4.5 MM Vinyl Click', 'https://sherwoodforestproducts.com/shop/', { Construction: 'Vinyl click', Thickness: '4.5 mm' }),
  supplierListingProduct('Sherwood', 'Vinyl', '6 MM Vinyl Click', 'https://sherwoodforestproducts.com/shop/', { Construction: 'Vinyl click', Thickness: '6 mm' }),
  supplierListingProduct('Sherwood', 'Vinyl', '7 MM Vinyl Click', 'https://sherwoodforestproducts.com/shop/', { Construction: 'Vinyl click', Thickness: '7 mm' }),
  supplierListingProduct('Sherwood', 'Engineered Hardwood', '6 ½ Hickory Engineered', 'https://sherwoodforestproducts.com/shop/', { Collection: 'Engineered hardwood', Species: 'Hickory' }),
  supplierListingProduct('Sherwood', 'Engineered Hardwood', '6 ½ Maple Engineered', 'https://sherwoodforestproducts.com/shop/', { Collection: 'Engineered hardwood', Species: 'Maple' }),
  supplierListingProduct('Sherwood', 'Hardwood', 'Kensington Maple 4 ¼”', 'https://sherwoodforestproducts.com/product/kensington-maple/', { Construction: 'Canadian solid hardwood', Species: 'Maple', Grade: 'Select & Better', 'Coverage per box': '19 sq. ft.', Thickness: '3/4 in', Width: '4 1/4 in', Colours: 'Caraway, Cinnamon, Clove, Cocoa, Pearl, Sierra' }),
  supplierListingProduct('Sherwood', 'Hardwood', 'Providence Ash 3 ¼”', 'https://sherwoodforestproducts.com/product-category/hardwood-flooring/', { Construction: 'Canadian solid hardwood', Species: 'Ash', Width: '3 1/4 in' }),
  supplierListingProduct('Sherwood', 'Hardwood', 'SUMMIT II Red Oak', 'https://sherwoodforestproducts.com/product-category/hardwood-flooring/', { Construction: 'Canadian solid hardwood', Species: 'Red Oak', Widths: '3 1/4 in and 4 1/4 in' }),
  supplierListingProduct('Sherwood', 'Hardwood', 'Uptown Maple 3 ¼”', 'https://sherwoodforestproducts.com/product/uptown-maple/', { Construction: 'Canadian solid hardwood', Species: 'Maple', Width: '3 1/4 in' })
];

const pangolinCodes = [
  ['PS101', '7 mm', '1.5 mm IXPE'], ['PS102', '7 mm', '1.5 mm IXPE'],
  ['PS103', '7 mm', '1.5 mm IXPE'], ['PS104', '7 mm', '1.5 mm IXPE'],
  ['PS105', '7 mm', '1.5 mm IXPE'], ['PS106', '7 mm', '1.5 mm IXPE'],
  ['PS107', '7 mm', '1.5 mm IXPE'], ['PS109', '7 mm', '1.5 mm IXPE'],
  ['PS110', '8 mm', '2.0 mm EVA'], ['PS111', '8 mm', '2.0 mm EVA'],
  ['PS112', '8 mm', '2.0 mm EVA'], ['PS114', '8 mm', '2.0 mm EVA'],
  ['PS121', '8 mm', '2.0 mm EVA'], ['PS122', '8 mm', '2.0 mm EVA'],
  ['PS123', '8 mm', '2.0 mm EVA'], ['PS124', '8 mm', '2.0 mm EVA']
] as const;
type PangolinSku = typeof pangolinCodes[number][0];
const pangolinOriginSpcVariants: Partial<Record<PangolinSku, { name: string; colour: string; imageUrl: string }>> = {
  PS101: {
    name: 'Origin Collection SPC - 7MM PS101 Syrup',
    colour: 'Syrup',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS101%E6%8B%BC%E8%A3%85%E5%9B%BE.jpg/:/rs=w:1438,h:1865'
  },
  PS102: {
    name: 'Origin Collection SPC - 7MM PS102 Toffee',
    colour: 'Toffee',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS102%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:719,h:950'
  },
  PS103: {
    name: 'Origin Collection SPC - 7MM PS103 Charcoal',
    colour: 'Charcoal',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS103%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1865'
  },
  PS104: {
    name: 'Origin Collection SPC - 7MM PS104 Slate',
    colour: 'Slate',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS104%E6%8B%BC%E8%A3%85%E5%9B%BE.jpg/:/rs=w:1438,h:1868'
  },
  PS105: {
    name: 'Origin Collection SPC - 7MM PS105 Cream',
    colour: 'Cream',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS105%E6%8B%BC%E8%A3%85%E5%9B%BE.jpg/:/rs=w:1438,h:1856'
  },
  PS106: {
    name: 'Origin Collection SPC - 7MM PS106 Mist',
    colour: 'Mist',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS106%E6%8B%BC%E8%A3%85.jpg/:/rs=w:1438,h:2425'
  },
  PS107: {
    name: 'Origin Collection SPC - 7MM PS107 Oatmeal',
    colour: 'Oatmeal',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS107%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1853'
  },
  PS109: {
    name: 'Origin Collection SPC - 7MM PS109 Dove',
    colour: 'Dove',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS109%E5%BD%A9%E8%86%9C%E5%9B%BE.png/:/rs=w:719,h:859'
  },
  PS110: {
    name: 'Origin Collection SPC - 8MM PS110 Fawn',
    colour: 'Fawn',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS110%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1854'
  },
  PS111: {
    name: 'Origin Collection SPC - 8MM PS111 Flint',
    colour: 'Flint',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS111%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1854'
  },
  PS112: {
    name: 'Origin Collection SPC - 8MM PS112 Palomino',
    colour: 'Palomino',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS112%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1855'
  },
  PS114: {
    name: 'Origin Collection SPC - 8MM PS114 Chamois',
    colour: 'Chamois',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS114%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1866'
  },
  PS121: {
    name: 'Origin Collection SPC - 8MM PS121 Almond',
    colour: 'Almond',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS121%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1866'
  },
  PS122: {
    name: 'Origin Collection SPC - 8MM PS122 Tobac',
    colour: 'Tobac',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS122%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1863'
  },
  PS123: {
    name: 'Origin Collection SPC - 8MM PS123 Biscuit',
    colour: 'Biscuit',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS123%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1867'
  },
  PS124: {
    name: 'Origin Collection SPC - 8MM PS124 Mocha',
    colour: 'Mocha',
    imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS124%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:719,h:1007'
  }
};
const pangolinProducts = pangolinCodes.map(([sku, thickness, underlay]) => {
  const product = supplierListingProduct(
    'Pangolin',
    'Vinyl',
    'Origin Collection SPC ' + sku,
    'https://pangolflooring.com/products',
    { Collection: 'Origin Collection SPC', SKU: sku, Thickness: thickness, Underlay: underlay, Dimensions: '7 in × 48 in', 'Wear layer': '20 mil' }
  );
  const variant = pangolinOriginSpcVariants[sku];

  if (!variant) return product;

  return {
    ...product,
    name: variant.name,
    description: variant.name + ' is listed in Pangolin’s Origin Collection SPC. Confirm current colour options, specifications and availability with the supplier.',
    imageUrl: variant.imageUrl,
    imageAlt: 'Pangolin ' + variant.name + ' flooring',
    specifications: {
      ...product.specifications,
      Colour: variant.colour
    },
    ...pangolinOriginSpcDisplayAuthorization
  };
});

const wodenImageUrls: Partial<Record<string, string>> = {
  '1001 Sandy Cove': 'https://static.wixstatic.com/media/d8ccde_183ab2eb5f3644f88ddfe40d925d8d70~mv2.jpg/v1/fill/w_1960,h_1180,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_183ab2eb5f3644f88ddfe40d925d8d70~mv2.jpg',
  '1002 Beach Bluff': 'https://static.wixstatic.com/media/d8ccde_3615f2eb4ca244d8a8c3500762f52c37~mv2.jpg/v1/fill/w_1225,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_3615f2eb4ca244d8a8c3500762f52c37~mv2.jpg',
  '1003 Golden Shoal': 'https://static.wixstatic.com/media/d8ccde_e498bb6fafc142d6a72fcbed13b10b22~mv2.jpg/v1/fill/w_1225,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_e498bb6fafc142d6a72fcbed13b10b22~mv2.jpg',
  '1004 River Clay': 'https://static.wixstatic.com/media/d8ccde_c8168225fcca498c80aaccb7acdf877d~mv2.jpg/v1/fill/w_1280,h_771,al_c,q_85,enc_avif,quality_auto/d8ccde_c8168225fcca498c80aaccb7acdf877d~mv2.jpg',
  '1005 Smoky Walnut': 'https://static.wixstatic.com/media/d8ccde_e4f4095a307d4ca5a630d5402abdc3ac~mv2.jpg/v1/fill/w_1225,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_e4f4095a307d4ca5a630d5402abdc3ac~mv2.jpg',
  '1006 Sunlit Wave': 'https://static.wixstatic.com/media/d8ccde_fcb31b9dc277474e9e01b50b7939a6cd~mv2.jpg/v1/fill/w_1960,h_1180,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_fcb31b9dc277474e9e01b50b7939a6cd~mv2.jpg',
  '1007 Cocoa Timber': 'https://static.wixstatic.com/media/d8ccde_b2d0d4f95cc24122926e256cabdbc5dc~mv2.jpg/v1/fill/w_1225,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_b2d0d4f95cc24122926e256cabdbc5dc~mv2.jpg',
  '1008 Vintage Trail': 'https://static.wixstatic.com/media/d8ccde_6c16fcacd1e241a387463fed3b203153~mv2.jpg/v1/fill/w_1960,h_1180,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_6c16fcacd1e241a387463fed3b203153~mv2.jpg',
  'Como AB': 'https://static.wixstatic.com/media/d8ccde_f02b25e4dd394c59b7bdd658485c9afe~mv2.jpg/v1/fill/w_1225,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_f02b25e4dd394c59b7bdd658485c9afe~mv2.jpg',
  'Alba AB': 'https://static.wixstatic.com/media/d8ccde_e1ff29730f34461c87ffbff408459544~mv2.jpg/v1/fill/w_1225,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_e1ff29730f34461c87ffbff408459544~mv2.jpg'
};

const wodenProducts = ([
  ['1001 Sandy Cove', '10 Collection'], ['1002 Beach Bluff', '10 Collection'],
  ['1003 Golden Shoal', '10 Collection'], ['1004 River Clay', '10 Collection'],
  ['1005 Smoky Walnut', '10 Collection'], ['1006 Sunlit Wave', '10 Collection'],
  ['1007 Cocoa Timber', '10 Collection'], ['1008 Vintage Trail', '10 Collection']
] as const).map(([name, collection]) => supplierListingProduct(
  'Woden',
  'Vinyl',
  name,
  'https://www.wodenflooring.com/category/all-products',
  { Collection: collection, Structure: '8 mm SPC + 2 mm cork pad', 'Coverage per box': '15 sq. ft.', Installation: 'On, above or below grade' },
  wodenImageUrls[name]
));

const wodenAdditionalProducts = (['Como AB', 'Alba AB'] as const).map(name => supplierListingProduct(
  'Woden', 'Vinyl', name,
  'https://www.wodenflooring.com/category/all-products',
  undefined,
  wodenImageUrls[name]
));

const weissEngineeredNames = [
  'Golden Oak', 'Dijon', 'Mocha', 'Pebble', 'Caramel', 'Vanilla', 'Sand', 'Amber',
  'Silvery Gray', 'Saffron', 'Seashell', 'Sandy Brown', 'Raw', 'Fortino',
  'Hickory Walnut', 'Pure Hickory', 'Cottage Maple', 'Original Maple', 'Ash Toffee', 'Ash Natural',
  'Toffee', 'Cream', 'Pewter', 'Penny', 'Coconut'
];
const weissEngineeredProducts = weissEngineeredNames.map(name => supplierListingProduct(
  'Weiss',
  'Engineered Hardwood',
  name,
  'https://www.weissflooring.ca/engineeredhardwood',
  { 'Product line': 'Engineered hardwood' }
));

const weissSpcNames = [
  'Venus', 'Havenest', 'Driftwood', 'Boltique', 'Covehaus', 'Sable', 'Fog', 'Reef',
  'Coral', 'Vega', 'Tan', 'Cinnabar', 'Caviar', 'American Walnut', 'Wasaga',
  'Varadero', 'Trunk Bay', 'Siesta', 'Lanikai', 'Hanalei', 'Copacabana', 'Bora'
];
const weissSpcProducts = weissSpcNames.map(name => supplierListingProduct(
  'Weiss',
  'Vinyl',
  name,
  'https://www.weissflooring.ca/spcvinyl',
  { 'Product line': 'SPC vinyl' }
));

const weissLaminateNames = ['Zenith', 'Titanium', 'Savage', 'Meridian', 'Horizon', 'Eclipse', 'Citadel', 'Aube'];
const weissLaminateProducts = weissLaminateNames.map(name => supplierListingProduct(
  'Weiss',
  'Laminate',
  name,
  'https://www.weissflooring.ca/premierlaminate',
  { 'Product line': 'Premier laminate' }
));


export const supplierProductImports: Product[] = [
  ...vidarProducts,
  ...vidarLaminateImports,
  ...toucanSpc86Products,
  ...toucanLuxcoreProducts,
  ...leeVinylProducts,
  ...wickhamHardwoodProducts,
  ...leeLaminateProducts,
  ...floorsAtWorkVinylProducts,
  ...grandeurPacific,
  ...grandeurLaminateProducts,
  ...grandeurEngineeredProducts,
  ...grandeurSolidHardwoodProducts,
  ...grandeurVinylProducts,
  ...simbaSpcProducts,
  ...simbaLaminateProducts,
  ...northernestCoastal,
  ...sherwoodProducts,
  ...pangolinProducts,
  ...wodenProducts,
  ...wodenAdditionalProducts,
  ...weissEngineeredProducts,
  ...weissSpcProducts,
  ...weissLaminateProducts
];
