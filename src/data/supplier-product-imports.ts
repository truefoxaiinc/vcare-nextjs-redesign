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

const leeVinylCatalogue = [
  {
    "name": "Ancient",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/08/Ancient-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/hearthstone/ancient/",
    "specifications": {
      "Product": "Ancient",
      "SKU": "906",
      "Collection": "Hearthstone",
      "Dimensions": "7 1/4\" x 48\" x 7+2mm EVA",
      "Sq feet per box": "15.31",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "20",
      "Weight / Skid": "1100",
      "Core thickness (mm)": "7",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "9",
      "Underlay": "EVA",
      "Coverage per box": "15.31",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "20",
      "Weight per skid": "1100"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Anubis",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/08/Anubis-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/hearthstone/anubis/",
    "specifications": {
      "Product": "Anubis",
      "SKU": "904",
      "Collection": "Hearthstone",
      "Dimensions": "7 1/4\" x 48\" x 7+2mm EVA",
      "Sq feet per box": "15.31",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "20",
      "Weight / Skid": "1100",
      "Core thickness (mm)": "7",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "9",
      "Underlay": "EVA",
      "Coverage per box": "15.31",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "20",
      "Weight per skid": "1100"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Cache",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/08/Cache-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/hearthstone/cache/",
    "specifications": {
      "Product": "Cache",
      "SKU": "901",
      "Collection": "Hearthstone",
      "Dimensions": "7 1/4\" x 48\" x 7+2mm EVA",
      "Sq feet per box": "15.31",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "20",
      "Weight / Skid": "1100",
      "Core thickness (mm)": "7",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "9",
      "Underlay": "EVA",
      "Coverage per box": "15.31",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "20",
      "Weight per skid": "1100"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Canal",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/08/Canal-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/hearthstone/canal/",
    "specifications": {
      "Product": "Canal",
      "SKU": "908",
      "Collection": "Hearthstone",
      "Dimensions": "7 1/4\" x 48\" x 7+2mm EVA",
      "Sq feet per box": "15.31",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "20",
      "Weight / Skid": "1100",
      "Core thickness (mm)": "7",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "9",
      "Underlay": "EVA",
      "Coverage per box": "15.31",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "20",
      "Weight per skid": "1100"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Coastal Driftwood",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/10/Coastal-Driftwood-installation-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/luxury-vinyl/coastal-driftwood/",
    "specifications": {
      "Product": "Coastal Driftwood",
      "SKU": "705",
      "Collection": "SPC",
      "Dimensions": "7 1/4” x 48” x 5+2mm EVA",
      "Color": "Coastal Driftwood",
      "Sq feet per box": "19.23",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "19.25",
      "Weight / Skid": "1058.75",
      "Colour": "Coastal Driftwood",
      "Core thickness (mm)": "5",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "7",
      "Underlay": "EVA",
      "Coverage per box": "19.23",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "19.25",
      "Weight per skid": "1058.75"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Cobble",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/08/Cobble-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/hearthstone/cobble/",
    "specifications": {
      "Product": "Cobble",
      "SKU": "907",
      "Collection": "Hearthstone",
      "Dimensions": "7 1/4\" x 48\" x 7+2mm EVA",
      "Sq feet per box": "15.31",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "20",
      "Weight / Skid": "1100",
      "Core thickness (mm)": "7",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "9",
      "Underlay": "EVA",
      "Coverage per box": "15.31",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "20",
      "Weight per skid": "1100"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Countryside Elm",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/11/Countryside-Elm-installation-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/luxury-vinyl/countryside-elm/",
    "specifications": {
      "Product": "Countryside Elm",
      "SKU": "706",
      "Collection": "SPC",
      "Dimensions": "7 1/4” x 48” x 5+2mm EVA",
      "Color": "Countryside Elm",
      "Sq feet per box": "19.23",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "19.25",
      "Weight / Skid": "1058.75",
      "Colour": "Countryside Elm",
      "Core thickness (mm)": "5",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "7",
      "Underlay": "EVA",
      "Coverage per box": "19.23",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "19.25",
      "Weight per skid": "1058.75"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Distant Shore",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/11/Distant-Shore-installation-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/luxury-vinyl/distant-shore/",
    "specifications": {
      "Product": "Distant Shore",
      "SKU": "709",
      "Collection": "SPC",
      "Dimensions": "7 1/4” x 48” x 5+2mm EVA",
      "Color": "Distant Shore",
      "Sq feet per box": "19.23",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "19.25",
      "Weight / Skid": "1058.75",
      "Colour": "Distant Shore",
      "Core thickness (mm)": "5",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "7",
      "Underlay": "EVA",
      "Coverage per box": "19.23",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "19.25",
      "Weight per skid": "1058.75"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Dust",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/08/Dust-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/hearthstone/dust/",
    "specifications": {
      "Product": "Dust",
      "SKU": "903",
      "Collection": "Hearthstone",
      "Dimensions": "7 1/4\" x 48\" x 7+2mm EVA",
      "Sq feet per box": "15.31",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "20",
      "Weight / Skid": "1100",
      "Core thickness (mm)": "7",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "9",
      "Underlay": "EVA",
      "Coverage per box": "15.31",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "20",
      "Weight per skid": "1100"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Estate",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/08/Estate-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/hearthstone/estate/",
    "specifications": {
      "Product": "Estate",
      "SKU": "905",
      "Collection": "Hearthstone",
      "Dimensions": "7 1/4\" x 48\" x 7+2mm EVA",
      "Sq feet per box": "15.31",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "20",
      "Weight / Skid": "1100",
      "Core thickness (mm)": "7",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "9",
      "Underlay": "EVA",
      "Coverage per box": "15.31",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "20",
      "Weight per skid": "1100"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Golden Hearth",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/11/Golden-Hearth-installation-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/luxury-vinyl/golden-hearth/",
    "specifications": {
      "Product": "Golden Hearth",
      "SKU": "708",
      "Collection": "SPC",
      "Dimensions": "7 1/4” x 48” x 5+2mm EVA",
      "Color": "Golden Hearth",
      "Sq feet per box": "19.23",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "19.25",
      "Weight / Skid": "1058.75",
      "Colour": "Golden Hearth",
      "Core thickness (mm)": "5",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "7",
      "Underlay": "EVA",
      "Coverage per box": "19.23",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "19.25",
      "Weight per skid": "1058.75"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Mirage",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/08/Mirage-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/hearthstone/mirage/",
    "specifications": {
      "Product": "Mirage",
      "SKU": "902",
      "Collection": "Hearthstone",
      "Dimensions": "7 1/4\" x 48\" x 7+2mm EVA",
      "Sq feet per box": "15.31",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "20",
      "Weight / Skid": "1100",
      "Core thickness (mm)": "7",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "9",
      "Underlay": "EVA",
      "Coverage per box": "15.31",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "20",
      "Weight per skid": "1100"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Mistry Birch",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/11/Mistry-Birch-installation-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/luxury-vinyl/mistry-birch/",
    "specifications": {
      "Product": "Mistry Birch",
      "SKU": "702",
      "Collection": "SPC",
      "Dimensions": "7 1/4” x 48” x 5+2mm EVA",
      "Color": "Mistry Birch",
      "Sq feet per box": "19.23",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "19.25",
      "Weight / Skid": "1058.75",
      "Colour": "Mistry Birch",
      "Core thickness (mm)": "5",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "7",
      "Underlay": "EVA",
      "Coverage per box": "19.23",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "19.25",
      "Weight per skid": "1058.75"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Nordic Ash",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/06/Nordic-Ash_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/luxury-vinyl/nordic-ash/",
    "specifications": {
      "Product": "Nordic Ash",
      "SKU": "703",
      "Collection": "SPC",
      "Dimensions": "7 1/4” x 48” x 5+2mm EVA",
      "Color": "Nordic Ash",
      "Sq feet per box": "19.23",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "19.25",
      "Weight / Skid": "1058.75",
      "Colour": "Nordic Ash",
      "Core thickness (mm)": "5",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "7",
      "Underlay": "EVA",
      "Coverage per box": "19.23",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "19.25",
      "Weight per skid": "1058.75"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Rustic Oak",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/11/Rustic-Oak-installation-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/luxury-vinyl/rustic-oak/",
    "specifications": {
      "Product": "Rustic Oak",
      "SKU": "707",
      "Collection": "SPC",
      "Dimensions": "7 1/4” x 48” x 5+2mm EVA",
      "Color": "Rustic Oak",
      "Sq feet per box": "19.23",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "19.25",
      "Weight / Skid": "1058.75",
      "Colour": "Rustic Oak",
      "Core thickness (mm)": "5",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "7",
      "Underlay": "EVA",
      "Coverage per box": "19.23",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "19.25",
      "Weight per skid": "1058.75"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Sandbar",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/11/Sandbar-installation-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/luxury-vinyl/sandbar/",
    "specifications": {
      "Product": "Sandbar",
      "SKU": "701",
      "Collection": "SPC",
      "Dimensions": "7 1/4” x 48” x 5+2mm EVA",
      "Color": "Sandbar",
      "Sq feet per box": "19.23",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "19.25",
      "Weight / Skid": "1058.75",
      "Colour": "Sandbar",
      "Core thickness (mm)": "5",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "7",
      "Underlay": "EVA",
      "Coverage per box": "19.23",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "19.25",
      "Weight per skid": "1058.75"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Signature American Walnut",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/06/Signature-American-Walnut_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/luxury-vinyl/signature-american-walnut/",
    "specifications": {
      "Product": "Signature American Walnut",
      "SKU": "710",
      "Collection": "SPC",
      "Dimensions": "7 1/4” x 48” x 5+2mm EVA",
      "Color": "Signature American Walnut",
      "Sq feet per box": "19.23",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "19.25",
      "Weight / Skid": "1058.75",
      "Colour": "Signature American Walnut",
      "Core thickness (mm)": "5",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "7",
      "Underlay": "EVA",
      "Coverage per box": "19.23",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "19.25",
      "Weight per skid": "1058.75"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  },
  {
    "name": "Weathered Barnwood",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/11/Weathered-Barnwoo-installation-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/vinyl/luxury-vinyl/weathered-barnwood/",
    "specifications": {
      "Product": "Weathered Barnwoo",
      "SKU": "704",
      "Collection": "SPC",
      "Dimensions": "7 1/4” x 48” x 5+2mm EVA",
      "Color": "Weathered Barnwoo",
      "Sq feet per box": "19.23",
      "Installation options": "Drop click",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "25 year residential",
      "Box / Skid": "55",
      "Weight / Box": "19.25",
      "Weight / Skid": "1058.75",
      "Colour": "Weathered Barnwoo",
      "Core thickness (mm)": "5",
      "Underlay thickness (mm)": "2",
      "Total thickness (mm)": "7",
      "Underlay": "EVA",
      "Coverage per box": "19.23",
      "Installation": "Drop click",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "25 year residential",
      "Boxes per skid": "55",
      "Weight per box": "19.25",
      "Weight per skid": "1058.75"
    },
    "description": "Timeless and versatile. Our Lee Vinyl Flooring Collection combines the authentic look of natural wood with the practical benefits of modern technology. Each plank features realistic grain patterns, rich tones, and a durable surface that stands up to everyday wear. Designed for easy installation and effortless maintenance, this collection brings warmth and elegance to any space—without the upkeep of traditional hardwood. Coordinating trims and moldings are available to ensure a seamless finish. Please place accessory orders at least one week in advance and note that all"
  }
] satisfies Array<{ name: string; imageUrl: string; sourceUrl: string; specifications: Record<string, string>; description?: string }>;
const leeVinylProducts: Product[] = leeVinylCatalogue.map(({ name, imageUrl, sourceUrl, specifications, description }) => ({
  ...supplierListingProduct('Lee Flooring', 'Vinyl', name, sourceUrl, specifications, imageUrl),
  slug: 'lee-flooring-' + slugPart(specifications.Collection) + '-' + slugPart(name),
  ...(description ? { description } : {})
}));

const wickhamDomesticCatalogue: Array<{ name: string; sourceUrl: string; imageUrl: string; category: Product['category']; specifications: Record<string, string>; review: boolean }> = [
  {
    "name": "Ash, Almond",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-almond/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-ash-frene-almond-amande-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Almond",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Antique",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-antique/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-antique.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Antique",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Barewood",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-barewood-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-barewood.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Barewood",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Beach",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-beach/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-ash-frene-beach.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Beach",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Bronze",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-bronze-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-ash-frene-bronze.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Bronze",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Cappuccino",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-cappuccino/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-ash-frene-cappuccino-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Cappuccino",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Cedar",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-cedar/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-ash-frene-cedar.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Cedar",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Charcoal",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-charcoal-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-charcoal.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Charcoal",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Cherry",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-cherry/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-cherry.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Cherry",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Cinnamon",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-cinnamon-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-cinnamon.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Cinnamon",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Classic",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-classic/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-classic.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Classic",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Coffee",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-coffee/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-coffee.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Coffee",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Copper",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-copper-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-copper.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Copper",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Cream",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-cream/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-cream.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Cream",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Edison",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-edison-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-edison.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Edison",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Elegance",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-elegance/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-elegance.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Elegance",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Forest Hill",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-forest-hill/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-forest-hill.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Forest Hill",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Frost",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-frost-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-Ash-frene-frost-gel-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Frost",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Glacier",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-glacier/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-ash-frene-glacier-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Glacier",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Graphite",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-graphite-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-graphite.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Graphite",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Haze",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-haze-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-haze.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Haze",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Honey Gold",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-honey-gold-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-honey-gold.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Honey Gold",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Jasper",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-jasper-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-ash-frene-jasper.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Jasper",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Kelya",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-kelya-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-ash-frene-kelya.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Kelya",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Lyon",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-lyon-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-ash-frene-lyon.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Lyon",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Manchester",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-manchester/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-ash-frene-manchester.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Manchester",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Moka",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-moka-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-moka.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Moka",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Montebello",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-montebello-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-montebello.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Montebello",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Naked",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-naked-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-ash-frene-naked.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Naked",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Natural",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-natural/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-naturel.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Natural",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Nevada",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-nevada/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-nevada.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Nevada",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Pearl",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-pearl-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-pearl.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Pearl",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Playa",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-playa/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2026/03/Ash-Playa.png",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Playa",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Prairie",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-prairie-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-ash-frene-Prairie.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Prairie",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Pyramid",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-pyramid/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-pyramid.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Pyramid",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Rome",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-rome/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-ash-frene-rome.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Rome",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Sahara",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-sahara/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-ash-frene-sahara-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Sahara",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Sandbank",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-sandbank/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-sanbank.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Sandbank",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Savana",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-savana-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-savana.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Savana",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Sierra",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-sierra-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-sierra.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Sierra",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Snow",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-snow/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-ash-frene-white-wash.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Snow",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Taupe",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-taupe/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-taupe.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Taupe",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Urban Grey",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-urban-grey-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-urban-grey.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Urban Grey",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Vine",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-vine/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-vine.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Vine",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Walnut",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-walnut/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-walnut.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Walnut",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Western",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-western-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-western.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Western",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Ash, Wheat",
    "sourceUrl": "https://wickhamhardwood.com/product/ash-wheat-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-frene-ash-wheat.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Ash",
      "Collection": "Domestic",
      "Colour": "Wheat",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Almond",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-almond/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-birch-merisier-almond-amande-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Almond",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Antique",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-antique/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-antique.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Antique",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Barewood",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-barewood/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-brich-barewood.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Barewood",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Beach",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-beach-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-beach.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Beach",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Bronze",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-bronze/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-bronze.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Bronze",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Cappuccino",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-cappuccino/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-birch-merisier-cappuccino-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Cappuccino",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Cedar",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-cedar/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-cedar.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Cedar",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Charcoal",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-charcoal/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-charcoal.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Charcoal",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Cherry",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-cherry/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-cherry.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Cherry",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Cinnamon",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-cinnamon/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-cinnamon.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Cinnamon",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Classic",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-classic/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-classic.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Classic",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Coffee",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-coffee/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-coffee.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Coffee",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Copper",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-copper/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-copper.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Copper",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Cream",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-cream/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-cream.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Cream",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Edison",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-edison/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-edison.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Edison",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Elegance",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-elegance/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-elegance.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Elegance",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Forest Hill",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-forest-hill/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-forest-hill.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Forest Hill",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Frost",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-frost/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-birch-merisier-frost-gel-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Frost",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Glacier",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-glacier/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-birch-merisier-glacier-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Glacier",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Graphite",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-graphite/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-graphite.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Graphite",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Haze",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-haze/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-haze.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Haze",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Honey Gold",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-honey-gold/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-honey-gold.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Honey Gold",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Jasper",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-jasper/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-jasper.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Jasper",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Kelya",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-kelya/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-kelya.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Kelya",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Lyon",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-lyon/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-lyon.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Lyon",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Manchester",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-manchester/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-manchester.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Manchester",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Moka",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-moka/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-moka.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Moka",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Montebello",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-montebello/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-montebello.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Montebello",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Naked",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-naked/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-naked.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Naked",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Extra matte 5°, Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Natural",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-natural/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-naturel.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Natural",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Nevada",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-nevada/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-nevada.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Nevada",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Pearl",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-pearl/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-pearl.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Pearl",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Playa",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-playa/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2026/03/Birch-Playa-1.png",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Playa",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Prairie",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-prairie/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-prairie.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Prairie",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Pyramid",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-pyramid/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-pyramid.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Pyramid",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Rome",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-rome/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-rome.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Rome",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Sahara",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-sahara/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-birch-merisier-sahara-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Sahara",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Sandbank",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-sandbank/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-sanbank.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Sandbank",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Savana",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-savana/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-savana.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Savana",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Sierra",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-sierra/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-sierra.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Sierra",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Snow",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-snow/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-white-wash.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Snow",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Taupe",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-taupe/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-taupe.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Taupe",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Urban Grey",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-urban-grey/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-urban-grey.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Urban Grey",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Vine",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-vine/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-vine.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Vine",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Walnut",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-walnut/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-walnut.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Walnut",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Western",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-western/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-western.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Western",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Birch, Wheat",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-wheat/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-merisier-birch-wheat.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Birch",
      "Collection": "Domestic",
      "Colour": "Wheat",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Hickory, Cinnamon",
    "sourceUrl": "https://wickhamhardwood.com/product/hickory-cinnamon/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-hickory-cinnamon.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Hickory",
      "Collection": "Domestic",
      "Colour": "Cinnamon",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Hickory, Copper",
    "sourceUrl": "https://wickhamhardwood.com/product/hickory-copper/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-hickory-copper.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Hickory",
      "Collection": "Domestic",
      "Colour": "Copper",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Hickory, Haze",
    "sourceUrl": "https://wickhamhardwood.com/product/hickory-haze/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-hickory-haze.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Hickory",
      "Collection": "Domestic",
      "Colour": "Haze",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Hickory, Natural",
    "sourceUrl": "https://wickhamhardwood.com/product/hickory-natural/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-hickory-naturel.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Hickory",
      "Collection": "Domestic",
      "Colour": "Natural",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Hickory, Walnut",
    "sourceUrl": "https://wickhamhardwood.com/product/hickory-walnut/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-hickory-walnut.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Hickory",
      "Collection": "Domestic",
      "Colour": "Walnut",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Hickory, Wheat",
    "sourceUrl": "https://wickhamhardwood.com/product/hickory-wheat/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-hickory-wheat.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Hickory",
      "Collection": "Domestic",
      "Colour": "Wheat",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Almond",
    "sourceUrl": "https://wickhamhardwood.com/product/hard-maple-almond/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-hard-maple-erable-almond-mande-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Almond",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Antique",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-antique-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-antique.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Antique",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Barewood",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-barewood-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-barewood.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Barewood",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Beach",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-beach-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-beach.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Beach",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Bronze",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-bronze-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-bronze.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Bronze",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Cappuccino",
    "sourceUrl": "https://wickhamhardwood.com/product/hard-maple-cappuccino/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-hard-maple-erable-cappuccino-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Cappuccino",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Cedar",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-cedar-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-cedar.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Cedar",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Charcoal",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-charcoal/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-charcoal.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Charcoal",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Cherry",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-cherry/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-cherry.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Cherry",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Cinnamon",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-cinnamon-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-cinnamon.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Cinnamon",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Classic",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-classic-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-classic.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Classic",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Coffee",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-coffee-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-coffee.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Coffee",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Copper",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-copper-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-copper.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Copper",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Cream",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-cream/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-cream.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Cream",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Edison",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-edison/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-edison.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Edison",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Elegance",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-elegance/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-elegance.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Elegance",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Forest Hill",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-forest-hill-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-forest-hill.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Forest Hill",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Frost",
    "sourceUrl": "https://wickhamhardwood.com/product/hard-maple-frost-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-hard-maple-erable-frost-gel-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Frost",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Glacier",
    "sourceUrl": "https://wickhamhardwood.com/product/hard-maple-glacier/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-hard-maple-erable-glacier-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Glacier",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Graphite",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-graphite/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-graphite.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Graphite",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Haze",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-haze-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-haze.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Haze",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Honey Gold",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-honey-gold/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-honey-gold.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Honey Gold",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Jasper",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-jasper/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-jasper.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Jasper",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Kelya",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-kelya/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-kelya.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Kelya",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Lyon",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-lyon-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-lyon.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Lyon",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Manchester",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-manchester-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-manchester.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Manchester",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Moka",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-moka-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-moka.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Moka",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Montebello",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-montebello-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-montebello.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Montebello",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Naked",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-naked-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/Domestic_Maple_Canadian-Plus_Naked-1.jpeg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Naked",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Natural",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-natural-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-naturel.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Natural",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Nevada",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-nevada-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-nevada.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Nevada",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Pearl",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-pearl-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-pearl.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Pearl",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Playa",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-playa/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2026/03/Maple-Playa-2-1.png",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Playa",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Prairie",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-prairie-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-prairie.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Prairie",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Pyramid",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-pyramid-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-pyramide.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Pyramid",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Rome",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-rome-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-rome.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Rome",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Sahara",
    "sourceUrl": "https://wickhamhardwood.com/product/hard-maple-sahara/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-hard-maple-erable-sahara-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Sahara",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Sandbank",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-sandbank-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-sandbank.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Sandbank",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Savana",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-savana/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-savana.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Savana",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Sierra",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-sierra-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-sierra.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Sierra",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Snow",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-snow-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-white-wash.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Snow",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Taupe",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-taupe-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-taupe.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Taupe",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Urban Grey",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-urban-grey/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-urban-grey.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Urban Grey",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Vine",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-vine-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-vine.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Vine",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Walnut",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-walnut-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-walnut.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Walnut",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Western",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-western-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-western.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Western",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Maple, Wheat",
    "sourceUrl": "https://wickhamhardwood.com/product/maple-wheat-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-erable-hard-maple-wheat.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Maple",
      "Collection": "Domestic",
      "Colour": "Wheat",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Almond",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-almond/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-red-oak-chene-rouge-almond-amande-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Almond",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Antique",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-antique-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-antique.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Antique",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Extra matte 5°, Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Extra matte 5°, Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Extra matte 5°, Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Barewood",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-barewood-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-barewood.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Barewood",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Beach",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-beach/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-beach.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Beach",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Bronze",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-bronze/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-bronze.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Bronze",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Cappuccino",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-cappuccino/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-red-oak-chene-rouge-cappuccino-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Cappuccino",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Cedar",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-cedar/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-cedar.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Cedar",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Charcoal",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-charcoal-5/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-charcoal.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Charcoal",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Cherry",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-cherry/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-cherry.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Cherry",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Cinnamon",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-cinnamon-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-cinnamon.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Cinnamon",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Classic",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-classic-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-classic.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Classic",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Coffee",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-coffee/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-coffee.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Coffee",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Copper",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-copper-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-copper.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Copper",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Cream",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-cream/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-cream.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Cream",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Edison",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-edison-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-edison.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Edison",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Elegance",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-elegance/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-elegance.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Elegance",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Forest Hill",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-forest-hill-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/Domestic_Red-Oak_Forest-Hills.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Forest Hill",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Frost",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-frost/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-red-oak-chene-rouge-frost-gel-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Frost",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Glacier",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-glacier/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-red-oak-chene-rouge-glacier-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Glacier",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Graphite",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-graphite-6/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-graphite.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Graphite",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Haze",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-haze-4-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-haze.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Haze",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Honey Gold",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-honey-gold-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-honey-gold.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Honey Gold",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Jasper",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-jasper/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-Jasper.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Jasper",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Kelya",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-kelya-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-Kelya.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Kelya",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Lyon",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-lyon-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-Lyon.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Lyon",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Manchester",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-manchester/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-manchester.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Manchester",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Moka",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-moka-6/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-moka.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Moka",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Montebello",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-montebello/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-montebello.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Montebello",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Naked",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-naked/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-naked.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Naked",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Natural",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-natural-5/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-naturel.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Natural",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Nevada",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-nevada-6/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-nevada.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Nevada",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Pearl",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-pearl/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-pearl.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Pearl",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Playa",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-playa-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2026/03/Red-Oak-Playa.png",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Playa",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Extra matte 5°, Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Extra matte 5°, Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Extra matte 5°, Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Prairie",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-prairie/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-prairie.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Prairie",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Pyramid",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-pyramid-6/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-pyramide.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Pyramid",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Rome",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-rome/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-rome.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Rome",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Sahara",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-sahara/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-red-oak-chene-rouge-sahara-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Sahara",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Sandbank",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-sandbank/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-sandbank.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Sandbank",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Savana",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-savana-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-savana.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Savana",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Sierra",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-sierra/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-aok-sierra.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Sierra",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Snow",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-snow-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-white-wash.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Snow",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Taupe",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-taupe/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-taupe.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Taupe",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Urban Grey",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-urban-grey-5/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-gris-urbain.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Urban Grey",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Vine",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-vine/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-vine.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Vine",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Walnut",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-walnut/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-walnut.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Walnut",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Western",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-western-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-western.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Western",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "Red Oak, Wheat",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-wheat/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-rouge-red-oak-wheat.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "Red Oak",
      "Collection": "Domestic",
      "Colour": "Wheat",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm), 7 in (178 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Almond",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-almond/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-white-oak-chene-blanc-amande-almonde-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Almond",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Antique",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-antique/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-antique.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Antique",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Barewood",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-barewood-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-barewood.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Barewood",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Beach",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-beach-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-beach.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Beach",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Bronze",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-bronze-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-bronze.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Bronze",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Cappuccino",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-cappuccino/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-white-oak-chene-blanc-cappuccino-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Cappuccino",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Cedar",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-cedar/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-cedar.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Cedar",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Charcoal",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-charcoal-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-charcoal.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Charcoal",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Cherry",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-cherry-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-cherry.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Cherry",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Cinnamon",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-cinnamon/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-cinnamon.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Cinnamon",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Classic",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-classic-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-classic.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Classic",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Coffee",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-coffee-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-coffee.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Coffee",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Copper",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-copper-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-copper.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Copper",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Cream",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-cream-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-cream.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Cream",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Edison",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-edison-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-edison.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Edison",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Elegance",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-elegance/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-elegance.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Elegance",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Forest Hill",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-forest-hill-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-forest-hill.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Forest Hill",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Frost",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-frost/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-white-oak-chene-blanc-frost-gel-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Frost",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Glacier",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-glacier/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-white-oak-chene-blanc-glacier-hardwood.floor_.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Glacier",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Graphite",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-graphite-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-graphite.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Graphite",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Haze",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-haze/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-haze.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Haze",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Honey Gold",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-honey-gold-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-honey-gold.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Honey Gold",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Jasper",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-jasper-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-jasper.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Jasper",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Kelya",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-kelya/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-kelya.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Kelya",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Lyon",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-lyon-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-lyon.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Lyon",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Manchester",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-manchester-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-manchester.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Manchester",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Moka",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-moka-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-moka.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Moka",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Montebello",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-montebello/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-montebello.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Montebello",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Naked",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-naked/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-naked.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Naked",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Natural",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-natural/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-naturel.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Natural",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Nevada",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-nevada/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-nevada.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Nevada",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Pearl",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-pearl/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-pearl.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Pearl",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Playa",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-playa-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2026/03/Chene-Blanc-Playa.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Playa",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°Engineered 3/4Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Prairie",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-prairie/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-prairie.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Prairie",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Pyramid",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-pyramide/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-pyramide.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Pyramid",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Rome",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-rome-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-rome.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Rome",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Sahara",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-sahara/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/01/Domestic-plancher-bois-franc-white-oak-chene-blanc-sahara-hardwood-floor.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Sahara",
      "Solid": "Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Sandbank",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-sandbank/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-sandbank.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Sandbank",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Savana",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-savana/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-savana.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Savana",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Sierra",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-sierra/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-sierra.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Sierra",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Snow",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-snow-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-white-wash.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Snow",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Taupe",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-taupe-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-taupe.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Taupe",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Urban Grey",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-urban-grey-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-gris-urbain-urban-grey.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Urban Grey",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Vine",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-vine-2/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-vine.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Vine",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Walnut",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-walnut/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-walnut.jpg.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Walnut",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Western",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-western-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-western.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Western",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  },
  {
    "name": "White Oak, Wheat",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-wheat-3/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2023/01/hardwood-flooring-plancher-bois-domestic-chene-blanc-white-oak-wheat.jpg",
    "category": "Hardwood",
    "specifications": {
      "Species": "White Oak",
      "Collection": "Domestic",
      "Colour": "Wheat",
      "Solid": "Solid 3/4 in. (19 mm)Widths:  2 1/4 in (57 mm), 3 1/4 in (83 mm), 4 1/4 in (108 mm), 5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 1/2 (Elite)": "Engineered Elite 1/2 in. (13 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°",
      "Engineered 3/4 (Elite Plus)": "Engineered Elite Plus 3/4 in. (19 mm)Widths:  5 in (127 mm); Finish:  Matte 10°, Satin 35°, Semi-gloss 55°"
    },
    "review": false
  }
];

const wickhamHardwoodProducts: Product[] = wickhamDomesticCatalogue.map(({ name, sourceUrl, imageUrl, category, specifications, review }) => ({
  ...supplierListingProduct('Wickham', category, name, sourceUrl, specifications, imageUrl),
  slug: 'wickham-domestic-' + slugPart(name),
  ...(review ? { publicationStatus: 'draft' as const, sourceStatus: 'unresolved' as const } : {})
}));

const leeSignatureLaminate = [
  [
    "R01",
    "3311",
    "Soft Beige Oak",
    "R01A-300x300.webp"
  ],
  [
    "R02",
    "3312",
    "Desert Oak",
    "R02A-300x300.webp"
  ],
  [
    "R03",
    "9977",
    "Classic Golden Oak",
    "R03A-300x300.webp"
  ],
  [
    "R04",
    "8764",
    "Light Honey Oak",
    "R04A-300x300.webp"
  ],
  [
    "R05",
    "3422",
    "Amber Oak",
    "R05A-300x300.webp"
  ],
  [
    "R06",
    "2234",
    "Glacier Grey Oak",
    "R06A-300x300.webp"
  ],
  [
    "R07",
    "8892",
    "Fog Grey Oak",
    "R07A-300x300.webp"
  ],
  [
    "R08",
    "9877",
    "Hazelnut Brown Oak",
    "R08A-300x300.webp"
  ],
  [
    "R09",
    "1123",
    "Deep Chestnut",
    "R09A-300x300.webp"
  ],
  [
    "R11",
    "9899",
    "Ebony Oak",
    "R11A-300x300.webp"
  ],
  [
    "T01",
    "9437",
    "Light Golden Oak",
    "T01-300x300.webp"
  ],
  [
    "T02",
    "5011",
    "Honey Oak",
    "T02-300x300.webp"
  ],
  [
    "T03",
    "2097",
    "Grey Oak",
    "T03-300x300.webp"
  ],
  [
    "T04",
    "1312",
    "Dune Oak",
    "T04-300x300.webp"
  ],
  [
    "T05",
    "3343",
    "Hazelnut Oak",
    "T05-300x300.webp"
  ],
  [
    "T06",
    "4456",
    "Cream Oak",
    "T06-300x300.webp"
  ],
  [
    "T07",
    "4321",
    "Charcoal Grey Oak",
    "T7B-300x300.webp"
  ],
  [
    "T08",
    "2222",
    "Rose Beige Oak",
    "T8B-300x300.webp"
  ],
  [
    "T09",
    "3345",
    "Foggy Grey Oak",
    "T9B-300x300.webp"
  ],
  [
    "T10",
    "3099",
    "Chestnut Oak",
    "T10B-300x300.webp"
  ],
  [
    "98001",
    "8876",
    "Honey Oak",
    "98001-300x300.webp"
  ],
  [
    "98002",
    "6788",
    "Light Maple",
    "98002-300x300.webp"
  ],
  [
    "98003",
    "5677",
    "Vintage Smoked Oak",
    "98003-300x300.webp"
  ],
  [
    "98004",
    "2233",
    "Pale Grey Oak",
    "98004-300x300.webp"
  ],
  [
    "98005",
    "6678",
    "Glacier Grey Oak",
    "98005-300x300.webp"
  ],
  [
    "98006",
    "8888",
    "Steel Grey Oak",
    "98006-300x300.webp"
  ],
  [
    "98007",
    "7789",
    "Weathered Oak",
    "98007-300x300.webp"
  ],
  [
    "98008",
    "5699",
    "Dark Walnut",
    "98008-300x300.webp"
  ],
  [
    "98009",
    "8899",
    "Reddish Brown Oak",
    "98009-300x300.webp"
  ],
  [
    "98011",
    "2222",
    "Charcoal Black Oak",
    "98011-300x300.webp"
  ],
  [
    "98012",
    "6577",
    "White Maple",
    "98012-300x300.webp"
  ],
  [
    "98013",
    "4456",
    "Light Walnut Oak",
    "98013-300x300.webp"
  ]
] as const;

const leeLaminateProducts: Product[] = leeSignatureLaminate.map(([name, sku, colour, image]) => {
  const soho = name.startsWith('98');
  const collection = soho ? 'Soho' : name.startsWith('R') ? '24Hr Water-Resistant' : '72Hr Water-Resistant';
  const handle = name.startsWith('R') ? 'r' + Number(name.slice(1)) : name.toLowerCase();
  const sourceUrl = 'https://leeflooring.ca/products/laminate/' + (soho ? 'soho/' + name + '/' + name : 'water-resistant/signature/' + handle) + '/';
  return {
    ...supplierListingProduct('Lee Flooring', 'Laminate', name, sourceUrl, {
      SKU: sku, Collection: collection, Colour: colour,
      Dimensions: soho ? '7"x1/2"x48"' : '7 1/2"x1/2"x48"',
      'AC rating': 'AC4', 'Coverage per box': soho ? '18.46' : '20.8',
      Installation: 'Floating', 'Radiant heat': 'Suitable for use with hydronic systems',
      Warranty: '35 year residential', 'Box / Skid': soho ? '50' : '45',
      'Weight / Box': soho ? '37 lbs' : '20 lbs', 'Weight / Skid': soho ? '1850 lbs' : '900 lbs'
    }, 'https://leeflooring.ca/wp-content/uploads/2025/03/' + image),
    slug: 'lee-flooring-' + (soho ? 'soho-' : 'signature-') + handle
  };
});

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
function slugPart(value: string) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

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

const vidarAdditionalEngineeredProducts: Product[] = [
  ["9-inch-american-white-oak-macaroon","9'' Collection American White Oak – Macaroon","American White Oak","9-inch","Macaroon","https://vidarflooring.com/images/Macaroon3.jpg"],
  ["9-inch-american-white-oak-naked-oak","9'' Collection American White Oak – Naked Oak","American White Oak","9-inch","Naked Oak","https://vidarflooring.com/images/Flooring%20pictures/9_Collection_-_American_White_Oak-Naked_Oak.jpg"],
  ["9-inch-american-white-oak-silver-stone","9'' Collection American White Oak – Silver Stone","American White Oak","9-inch","Silver Stone","https://vidarflooring.com/images/Silverstone-AB.jpg"],
  ["9-inch-american-white-oak-wheatberry","9'' Collection American White Oak – Wheatberry","American White Oak","9-inch","Wheatberry","https://vidarflooring.com/images/9_Collection_-_American_White_Oak-Wheatberry.jpg"],
  ["american-black-walnut-10-naked-walnut","American Black Walnut 10 Collection – Naked Walnut","American Black Walnut","10 Collection","Naked Walnut","https://vidarflooring.com/images/American_Black_Walnut_10_Collection-Natural_AB_Select_and_Better-1.jpg"],
  ["american-black-walnut-6-natural","American Black Walnut 6 Collection – Natural","American Black Walnut","6 Collection","Natural","https://vidarflooring.com/images/American_Black_Walnut_6_Collection-Natural_AB_Select_and_Better.jpg"],
  ["american-black-walnut-7-chocolate","American Black Walnut 7 Collection – Chocolate","American Black Walnut","7 Collection","Chocolate","https://vidarflooring.com/images/American_Black_Walnut_7_Collection-Chocolate_ABC_Select.jpg"],
  ["american-black-walnut-7-natural","American Black Walnut 7 Collection – Natural","American Black Walnut","7 Collection","Natural","https://vidarflooring.com/images/American_Black_Walnut_7_Collection-Natural_AB_Select_and_Better.jpg"]
].map(([slug, name, species, collection, colour, imageUrl]) => ({
  ...supplierListingProduct('Vidar', 'Engineered Hardwood', name, imageUrl, {
    Species: species,
    Collection: collection,
    Colour: colour
  }, imageUrl),
  slug: `vidar-${slug}`,
  ...vidarProductDisplayAuthorization
}));

const vidarPatternedOakProducts: Product[] = [
  {
    "name": "American Oak 5 Chevron Collection – Macaroon",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_5_Chevron_Collection-Macaroon_AB_Select_and_Better.jpg",
    "specifications": {
      "Species": "American White Oak",
      "Thickness": "3/4 inch",
      "Grade": "Select & Better",
      "Width": "5 inch",
      "Surface texture": "Wirebrushed",
      "Veneer thickness": "3 mm",
      "Collection": "American Oak Herringbone/Chevron",
      "Colour": "Macaroon"
    }
  },
  {
    "name": "American Oak 5 Chevron Collection – Naked Oak",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_5_Chevron_Collection-Naked_Oak_ABSelect_and_Better.jpg",
    "specifications": {
      "Species": "American White Oak",
      "Thickness": "3/4 inch",
      "Grade": "Select & Better",
      "Width": "5 inch",
      "Surface texture": "Wirebrushed",
      "Veneer thickness": "3 mm",
      "Collection": "American Oak Herringbone/Chevron",
      "Colour": "Naked Oak"
    }
  },
  {
    "name": "American Oak 5 Herringbone Collection – Camel",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_5_Herringbone_Collection-Camel_ABCD_Character.jpg",
    "specifications": {
      "Species": "American White Oak",
      "Thickness": "3/4 inch",
      "Grade": "Character",
      "Width": "5 inch",
      "Surface texture": "Wirebrushed",
      "Veneer thickness": "3 mm",
      "Collection": "American Oak Herringbone/Chevron",
      "Colour": "Camel"
    }
  },
  {
    "name": "American Oak 5 Herringbone Collection – Pearl",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_5_Herringbone_Collection-Pearl_ABC_Select.jpg",
    "specifications": {
      "Species": "American White Oak",
      "Thickness": "3/4 inch, 9/16 inch",
      "Grade": "Character, Select",
      "Width": "5 inch",
      "Surface texture": "Wirebrushed",
      "Veneer thickness": "3 mm",
      "Collection": "American Oak Herringbone/Chevron",
      "Colour": "Pearl"
    }
  },
  {
    "name": "American Oak 5 Herringbone Collection – Silver Stone",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_5_Herringbone_Collection-Silver_Stone_ABC_Select.jpg",
    "specifications": {
      "Species": "American White Oak",
      "Thickness": "3/4 inch, 9/16 inch",
      "Grade": "Select",
      "Width": "5 inch",
      "Surface texture": "Wirebrushed",
      "Veneer thickness": "3 mm",
      "Collection": "American Oak Herringbone/Chevron",
      "Colour": "Silver Stone"
    }
  },
  {
    "name": "American Oak 5 Herringbone Collection – Sky",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_5_Herringbone_Collection-Sky_ABCD_Character.jpg",
    "specifications": {
      "Species": "American White Oak",
      "Thickness": "3/4 inch",
      "Grade": "Character",
      "Width": "5 inch",
      "Surface texture": "Wirebrushed",
      "Veneer thickness": "3 mm",
      "Collection": "American Oak Herringbone/Chevron",
      "Colour": "Sky"
    }
  },
  {
    "name": "American Oak 6 Collection – Black Brown",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_6_Collection-Black_Brown.jpg",
    "specifications": {
      "Species": "American White Oak",
      "Thickness": "3/4 inch",
      "Grade": "Character",
      "Width": "6 inch",
      "Surface texture": "Wirebrushed",
      "Veneer thickness": "2 mm",
      "Collection": "American Oak 6",
      "Colour": "Black Brown"
    }
  },
  {
    "name": "American Oak 6 Collection – Camel",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_6_Collection-Camel.jpg",
    "specifications": {
      "Species": "American White Oak",
      "Thickness": "3/4 inch",
      "Grade": "Character",
      "Width": "6 inch",
      "Surface texture": "Wirebrushed",
      "Veneer thickness": "2 mm",
      "Collection": "American Oak 6",
      "Colour": "Camel"
    }
  }
].map(({ name, imageUrl, specifications }) => ({
  ...supplierListingProduct('Vidar', 'Engineered Hardwood', name, imageUrl, specifications, imageUrl),
  ...vidarProductDisplayAuthorization
}));

const vidarOakListingProducts: Product[] = [
  {
    "name": "American Oak 6 Collection-Coffee",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_6_Collection-Coffee.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-6-collection-coffee?catid=19",
    "specifications": {
      "Collection": "American Oak 6",
      "Colour": "Coffee"
    }
  },
  {
    "name": "American Oak 6 Collection-Fortino",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_6_Collection-Fortino_ABSelect_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-6-collection-fortino?catid=19",
    "specifications": {
      "Collection": "American Oak 6",
      "Colour": "Fortino"
    }
  },
  {
    "name": "American Oak 6 Collection-Honey Wheat",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_6_Collection-Honey_Wheat_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-6-collection-honey-wheat?catid=19",
    "specifications": {
      "Collection": "American Oak 6",
      "Colour": "Honey Wheat"
    }
  },
  {
    "name": "American Oak 6 Collection-Macaroon",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_6_Collection-Macaroon_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-6-collection-macaroon?catid=19",
    "specifications": {
      "Collection": "American Oak 6",
      "Colour": "Macaroon"
    }
  },
  {
    "name": "American Oak 6 Collection-Moon Light",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_6_Collection-Moon_Light_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-6-collection-moon-light?catid=19",
    "specifications": {
      "Collection": "American Oak 6",
      "Colour": "Moon Light"
    }
  },
  {
    "name": "American Oak 6 Collection-Naked Oak",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_6_Collection-Naked_Oak_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-6-collection-naked-oak?catid=19",
    "specifications": {
      "Collection": "American Oak 6",
      "Colour": "Naked Oak"
    }
  },
  {
    "name": "American Oak 6 Collection-Silver Stone",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_6_Collection-Silver_Stone_ABC_Select.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-6-collection-silver-stone?catid=19",
    "specifications": {
      "Collection": "American Oak 6",
      "Colour": "Silver Stone"
    }
  },
  {
    "name": "American Oak 6 Collection-Sky",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_6_Collection-Sky_ABCD_Character.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-6-collection-sky?catid=19",
    "specifications": {
      "Collection": "American Oak 6",
      "Colour": "Sky"
    }
  },
  {
    "name": "American Oak 6 Collection-Smoke Grey",
    "imageUrl": "https://vidarflooring.com/images/2American_Oak_6_Collection-Smoke_Grey_ABCD_Character.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-6-collection-smoke-grey?catid=19",
    "specifications": {
      "Collection": "American Oak 6",
      "Colour": "Smoke Grey"
    }
  },
  {
    "name": "American Oak 6 Collection-Toffee Crunch",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_6_Collection-Toffee_Crunch_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-6-collection-toffee-crunch?catid=19",
    "specifications": {
      "Collection": "American Oak 6",
      "Colour": "Toffee Crunch"
    }
  },
  {
    "name": "American Oak 6 Collection-Wheat Berry",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_6_Collection-Wheat_Berry_ABC_Select.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-6-collection-wheat-berry?catid=19",
    "specifications": {
      "Collection": "American Oak 6",
      "Colour": "Wheat Berry"
    }
  },
  {
    "name": "American Oak 7 Collection-Charcoal",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Charcoal_ABCD_Character.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-charcoal?catid=19",
    "specifications": {
      "Collection": "American Oak 7",
      "Colour": "Charcoal"
    }
  },
  {
    "name": "American Oak 7 Collection-Coyote",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Coyote_ABCD_Character.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-coyote?catid=19",
    "specifications": {
      "Collection": "American Oak 7",
      "Colour": "Coyote"
    }
  },
  {
    "name": "American Oak 7 Collection-Macaroon",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Macaroon_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-macaroon?catid=19",
    "specifications": {
      "Collection": "American Oak 7",
      "Colour": "Macaroon"
    }
  },
  {
    "name": "American Oak 7 Collection-Naked Oak",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Naked_Oak_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-naked-oak?catid=19",
    "specifications": {
      "Collection": "American Oak 7",
      "Colour": "Naked Oak"
    }
  },
  {
    "name": "American Oak 7 Collection-Pearl",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Pearl_ABCD_Character.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-pearl?catid=19",
    "specifications": {
      "Collection": "American Oak 7",
      "Colour": "Pearl"
    }
  },
  {
    "name": "American Oak 7 Collection-Silver Stone",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Silver_Stone_ABCD_Character.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-silver-stone?catid=19",
    "specifications": {
      "Collection": "American Oak 7",
      "Colour": "Silver Stone"
    }
  },
  {
    "name": "American Oak 7 Collection-Sky",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Sky_ABCD_Character.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-sky?catid=19",
    "specifications": {
      "Collection": "American Oak 7",
      "Colour": "Sky"
    }
  },
  {
    "name": "American Oak 7 Collection-Snow White",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Snow_White_ABC_Select.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-snow-white?catid=19",
    "specifications": {
      "Collection": "American Oak 7",
      "Colour": "Snow White"
    }
  },
  {
    "name": "American Oak 7 Collection-Wheat Berry",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Wheat_Berry_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-wheat-berry?catid=19",
    "specifications": {
      "Collection": "American Oak 7",
      "Colour": "Wheat Berry"
    }
  },
  {
    "name": "American Oak 9 Collection-Daisy",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_9_Collection-Daisy_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-9-collection-daisy?catid=19",
    "specifications": {
      "Collection": "American Oak 9",
      "Colour": "Daisy"
    }
  },
  {
    "name": "American Oak 9 Collection-Sandy Grey",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_9_Collection-Sandy_Grey_ABCD_Character.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-9-collection-sandy-grey?catid=19",
    "specifications": {
      "Collection": "American Oak 9",
      "Colour": "Sandy Grey"
    }
  },
  {
    "name": "American Oak Click 5 Collection-Camel",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_Click_5_Collection-Camel_ABCD_Character_1.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-click-5-collection-camel?catid=19",
    "specifications": {
      "Collection": "American Oak Click 5",
      "Colour": "Camel"
    }
  },
  {
    "name": "American Oak Click 5 Collection-Coffee",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_Click_5_Collection-Coffee_ABCD_Character_1.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-click-5-collection-coffee?catid=19",
    "specifications": {
      "Collection": "American Oak Click 5",
      "Colour": "Coffee"
    }
  },
  {
    "name": "American Oak Click 5 Collection-Fortino",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_Click_5_Collection-Fortino_AB_Select_and_Better_1.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-click-5-collection-fortino?catid=19",
    "specifications": {
      "Collection": "American Oak Click 5",
      "Colour": "Fortino"
    }
  },
  {
    "name": "American Oak Click 5 Collection-Honey Wheat",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_Click_5_Collection-Honey_Wheat_AB_Select_and_Better_1_16.14.35.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-click-5-collection-honey-wheat?catid=19",
    "specifications": {
      "Collection": "American Oak Click 5",
      "Colour": "Honey Wheat"
    }
  },
  {
    "name": "American Oak Click 5 Collection-Macaroon",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_Click_5_Collection-Macaroon_AB_Select_and_Better_1_16.15.11.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-click-5-collection-macaroon?catid=19",
    "specifications": {
      "Collection": "American Oak Click 5",
      "Colour": "Macaroon"
    }
  },
  {
    "name": "American Oak Click 5 Collection-Moon Light",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_Click_5_Collection-Moon_Light_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-click-5-collection-moon-light?catid=19",
    "specifications": {
      "Collection": "American Oak Click 5",
      "Colour": "Moon Light"
    }
  },
  {
    "name": "American Oak Click 5 Collection-Naked Oak",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_Click_5_Collection-Naked_Oak_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-click-5-collection-naked-oak?catid=19",
    "specifications": {
      "Collection": "American Oak Click 5",
      "Colour": "Naked Oak"
    }
  },
  {
    "name": "American Oak Click 5 Collection-Sky",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_Click_5_Collection-Sky_ABCD_Character.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-click-5-collection-sky?catid=19",
    "specifications": {
      "Collection": "American Oak Click 5",
      "Colour": "Sky"
    }
  },
  {
    "name": "American Oak Click 5 Collection-Smoke Grey",
    "imageUrl": "https://vidarflooring.com/images/SMOKE_GREY-CLICK_-_%E5%B7%B2%E7%BC%96%E8%BE%91.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-click-5-collection-smoke-grey?catid=19",
    "specifications": {
      "Collection": "American Oak Click 5",
      "Colour": "Smoke Grey"
    }
  },
  {
    "name": "American Oak Herringbone Collection-Toffee Crunch",
    "imageUrl": "https://vidarflooring.com/images/Toffee_Crunch2.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-herringbone-collection-toffee-crunch?catid=19",
    "specifications": {
      "Collection": "American Oak Herringbone",
      "Colour": "Toffee Crunch"
    }
  },
  {
    "name": "Black Walnut 5 Herringbone Collection-Chocolate",
    "imageUrl": "https://vidarflooring.com/images/Black_Walnut_5_Herringbone_Collection-Chocolate_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/black-walnut-5-herringbone-collection-chocolate?catid=19",
    "specifications": {
      "Collection": "Black Walnut 5 Herringbone",
      "Colour": "Chocolate"
    }
  },
  {
    "name": "Black Walnut 5 Herringbone Collection-Natural",
    "imageUrl": "https://vidarflooring.com/images/Black_Walnut_5_Herringbone_Collection-Natural_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/black-walnut-5-herringbone-collection-natural?catid=19",
    "specifications": {
      "Collection": "Black Walnut 5 Herringbone",
      "Colour": "Natural"
    }
  },
  {
    "name": "Black Walnut 5 Herringbone Collection-Provence",
    "imageUrl": "https://vidarflooring.com/images/Black_Walnut_5_Herringbone_Collection-Provence_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/black-walnut-5-herringbone-collection-provence?catid=19",
    "specifications": {
      "Collection": "Black Walnut 5 Herringbone",
      "Colour": "Provence"
    }
  },
  {
    "name": "European Oak 5 Herringbone Collection-Banff",
    "imageUrl": "https://vidarflooring.com/images/European_Oak_5_Herringbone_Collection-Banff_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-oak-5-herringbone-collection-banff?catid=19",
    "specifications": {
      "Collection": "European Oak 5 Herringbone",
      "Colour": "Banff"
    }
  },
  {
    "name": "European Oak 5 Herringbone Collection-Clear",
    "imageUrl": "https://vidarflooring.com/images/European_Oak_5_Herringbone_Collection-Clear_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-oak-5-herringbone-collection-clear?catid=19",
    "specifications": {
      "Collection": "European Oak 5 Herringbone",
      "Colour": "Clear"
    }
  },
  {
    "name": "European Oak 5 Herringbone Collection-Toffee Crunch",
    "imageUrl": "https://vidarflooring.com/images/European_Oak_7_Collection-Toffee_Crunch_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-oak-5-herringbone-collection-toffee-crunch?catid=19",
    "specifications": {
      "Collection": "European Oak 5 Herringbone",
      "Colour": "Toffee Crunch"
    }
  },
  {
    "name": "European Oak 5 Herringbone Collection-Yukon",
    "imageUrl": "https://vidarflooring.com/images/European_Oak_7_Collection-Yukon_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-oak-5-herringbone-collection-yukon?catid=19",
    "specifications": {
      "Collection": "European Oak 5 Herringbone",
      "Colour": "Yukon"
    }
  },
  {
    "name": "European Oak 7 Collection-Banff",
    "imageUrl": "https://vidarflooring.com/images/European_Oak_7_Collection-Banff_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-oak-7-collection-banff?catid=19",
    "specifications": {
      "Collection": "European Oak 7",
      "Colour": "Banff"
    }
  },
  {
    "name": "European Oak 7 Collection-Clear",
    "imageUrl": "https://vidarflooring.com/images/European_Oak_7_Collection-Clear_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-oak-7-collection-clear?catid=19",
    "specifications": {
      "Collection": "European Oak 7",
      "Colour": "Clear"
    }
  },
  {
    "name": "European Oak 7 Collection-Jasper",
    "imageUrl": "https://vidarflooring.com/images/European_Oak_7_Collection-Jasper_EF_Rustic.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-oak-7-collection-jasper?catid=19",
    "specifications": {
      "Collection": "European Oak 7",
      "Colour": "Jasper"
    }
  },
  {
    "name": "European Oak 7 Collection-Toffee Crunch",
    "imageUrl": "https://vidarflooring.com/images/European_Oak_7_Collection-Toffee_Crunch_AB_Select_and_Better_v2.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-oak-7-collection-toffee-crunch?catid=19",
    "specifications": {
      "Collection": "European Oak 7",
      "Colour": "Toffee Crunch"
    }
  },
  {
    "name": "European Oak 7 Collection-Yukon",
    "imageUrl": "https://vidarflooring.com/images/European_Oak_7_Collection-Yukon_AB_Select_and_Better_v2.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-oak-7-collection-yukon?catid=19",
    "specifications": {
      "Collection": "European Oak 7",
      "Colour": "Yukon"
    }
  },
  {
    "name": "European Oak Collection-Joffre Lake",
    "imageUrl": "https://vidarflooring.com/images/European_Oak_7_Collection-Joffre_Lake_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-oak-collection-joffre-lake?catid=19",
    "specifications": {
      "Collection": "European Oak",
      "Colour": "Joffre Lake"
    }
  },
  {
    "name": "European White Ash 6 Collection-Day Break",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_6_Collection-Day_Break_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-6-collection-day-break?catid=19",
    "specifications": {
      "Collection": "European White Ash 6",
      "Colour": "Day Break"
    }
  },
  {
    "name": "European White Ash 6 Collection-Frost White",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_6_Collection-Frost_White_ABCSelect.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-6-collection-frost-white?catid=19",
    "specifications": {
      "Collection": "European White Ash 6",
      "Colour": "Frost White"
    }
  },
  {
    "name": "European White Ash 6 Collection-Landmark",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_6_Collection-Landmark_ABC_Select.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-6-collection-landmark?catid=19",
    "specifications": {
      "Collection": "European White Ash 6",
      "Colour": "Landmark"
    }
  },
  {
    "name": "European White Ash 6 Collection-Macaroon",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_6_Collection-Macaroon_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-6-collection-macaroon?catid=19",
    "specifications": {
      "Collection": "European White Ash 6",
      "Colour": "Macaroon"
    }
  },
  {
    "name": "European White Ash 6 Collection-Natural",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_6_Collection-Natural_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-6-collection-natural?catid=19",
    "specifications": {
      "Collection": "European White Ash 6",
      "Colour": "Natural"
    }
  },
  {
    "name": "European White Ash 6 Collection-Sandy",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_6_Collection-Sandy_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-6-collection-sandy?catid=19",
    "specifications": {
      "Collection": "European White Ash 6",
      "Colour": "Sandy"
    }
  },
  {
    "name": "European White Ash 6 Collection-Toffee Crunch",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_6_Collection-Toffee_Crunch_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-6-collection-toffee-crunch?catid=19",
    "specifications": {
      "Collection": "European White Ash 6",
      "Colour": "Toffee Crunch"
    }
  },
  {
    "name": "European White Ash 6 Collection-Whistler",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_6_Collection-Whistler_ABC_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-6-collection-whistler?catid=19",
    "specifications": {
      "Collection": "European White Ash 6",
      "Colour": "Whistler"
    }
  },
  {
    "name": "European White Ash 7 Collection-Clear",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_7_Collection-Clear_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-7-collection-clear?catid=19",
    "specifications": {
      "Collection": "European White Ash 7",
      "Colour": "Clear"
    }
  },
  {
    "name": "European White Ash 7 Collection-Day Break",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_7_Collection-Day_Break_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-7-collection-day-break?catid=19",
    "specifications": {
      "Collection": "European White Ash 7",
      "Colour": "Day Break"
    }
  },
  {
    "name": "European White Ash 7 Collection-Ebony",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_7_Collection-Ebony_ABC_Select.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-7-collection-ebony?catid=19",
    "specifications": {
      "Collection": "European White Ash 7",
      "Colour": "Ebony"
    }
  },
  {
    "name": "European White Ash 7 Collection-Frost White",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_7_Collection-Frost_White_ABCSelect.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-7-collection-frost-white?catid=19",
    "specifications": {
      "Collection": "European White Ash 7",
      "Colour": "Frost White"
    }
  },
  {
    "name": "European White Ash 7 Collection-Macaroon",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_7_Collection-Macaroon_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-7-collection-macaroon?catid=19",
    "specifications": {
      "Collection": "European White Ash 7",
      "Colour": "Macaroon"
    }
  },
  {
    "name": "European White Ash 7 Collection-Night Owl",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_7_Collection-Night_Owl_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-7-collection-night-owl?catid=19",
    "specifications": {
      "Collection": "European White Ash 7",
      "Colour": "Night Owl"
    }
  },
  {
    "name": "European White Ash 7 Collection-Raw",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_7_Collection-Raw_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-7-collection-raw?catid=19",
    "specifications": {
      "Collection": "European White Ash 7",
      "Colour": "Raw"
    }
  },
  {
    "name": "European White Ash 7 Collection-Sandy",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_7_Collection-Sandy_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-7-collection-sandy?catid=19",
    "specifications": {
      "Collection": "European White Ash 7",
      "Colour": "Sandy"
    }
  },
  {
    "name": "European White Ash 7 Collection-Sunset",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_7_Collection-Sunset_ABC_Select.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-7-collection-sunset?catid=19",
    "specifications": {
      "Collection": "European White Ash 7",
      "Colour": "Sunset"
    }
  },
  {
    "name": "European White Ash 7 Collection-Whistler",
    "imageUrl": "https://vidarflooring.com/images/European_White_Ash_7_Collection-Whistler_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/european-white-ash-7-collection-whistler?catid=19",
    "specifications": {
      "Collection": "European White Ash 7",
      "Colour": "Whistler"
    }
  },
  {
    "name": "Versailles Flooring Collection-Clear",
    "imageUrl": "https://vidarflooring.com/images/Flooring%20pictures/Versailles%20Flooring%20Collection-Clear.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/versailles-flooring-collection?catid=19",
    "specifications": {
      "Collection": "Versailles Flooring",
      "Colour": "Clear"
    }
  },
  {
    "name": "Versailles Flooring Collection-Toffee Crunch",
    "imageUrl": "https://vidarflooring.com/images/Versailles_Flooring_Collection-Toffee_Crunch_1.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/versailles-flooring-collection-toffee-crunch?catid=19",
    "specifications": {
      "Collection": "Versailles Flooring",
      "Colour": "Toffee Crunch"
    }
  },
  {
    "name": "Versailles Flooring Collection-Yukon",
    "imageUrl": "https://vidarflooring.com/images/Versailles_Flooring_Collection-Yukon_1.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/versailles-flooring-collection-yukon?catid=19",
    "specifications": {
      "Collection": "Versailles Flooring",
      "Colour": "Yukon"
    }
  }
].map(({ name, imageUrl, sourceUrl, specifications }) => ({
  ...supplierListingProduct('Vidar', 'Engineered Hardwood', name, sourceUrl, specifications, imageUrl),
  ...vidarProductDisplayAuthorization
}));

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

const northernestCatalogue: Array<{ name: string; sourceUrl: string; imageUrl: string; specifications: Record<string, string>; description: string; needsReview: boolean }> = [
  {
    "name": "Snow Drift",
    "sourceUrl": "https://northernestflooring.ca/product/snow-drift/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/07/SnowDrift.png",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Locking/Profile": "Tongue & Groove",
      "Veneer Thickness": "4MM",
      "Finish": "UV Lacquered",
      "Grade": "AB",
      "Coating": "UV Lacquer",
      "Texture": "Wire, Brushed",
      "Collection": "We the North 4mm"
    },
    "description": "",
    "needsReview": false
  },
  {
    "name": "Montego Bay",
    "sourceUrl": "https://northernestflooring.ca/product/montego-bay/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/07/Montego-Bay.png",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Locking/Profile": "Tongue & Groove",
      "Veneer Thickness": "4MM",
      "Finish": "UV Lacquered",
      "Grade": "AB",
      "Coating": "UV Lacquer",
      "Texture": "Wire, Brushed",
      "Collection": "We the North 4mm"
    },
    "description": "",
    "needsReview": false
  },
  {
    "name": "Madera",
    "sourceUrl": "https://northernestflooring.ca/product/madera/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/07/Madera.png",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Locking/Profile": "Tongue & Groove",
      "Veneer Thickness": "4MM",
      "Finish": "UV Lacquered",
      "Grade": "AB",
      "Coating": "UV Lacquer",
      "Texture": "Wire, Brushed",
      "Collection": "We the North 4mm"
    },
    "description": "",
    "needsReview": false
  },
  {
    "name": "Canyon Oak",
    "sourceUrl": "https://northernestflooring.ca/product/canyon-oak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/07/Canyon-Oak.png",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Locking/Profile": "Tongue & Groove",
      "Veneer Thickness": "4MM",
      "Finish": "UV Lacquered",
      "Grade": "AB",
      "Coating": "UV Lacquer",
      "Texture": "Wire, Brushed",
      "Collection": "We the North 4mm"
    },
    "description": "",
    "needsReview": false
  },
  {
    "name": "Youken White",
    "sourceUrl": "https://northernestflooring.ca/product/youken-white/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Youken-White-01-to-send-1.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layered Engineered",
      "Dimensions": "7-1/2” x ¾” x RL",
      "Locking/Profile": "Tongue and Groove",
      "Veneer Thickness": "2MM",
      "Finish": "UV Lacquered",
      "Grade": "ABCD",
      "Coating": "UV Lacquer",
      "Texture": "Wire Brushed"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Malmo",
    "sourceUrl": "https://northernestflooring.ca/product/malmo/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Malmo-01-to-send-1.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layered Engineered",
      "Dimensions": "7-1/2” x ¾” x RL",
      "Locking/Profile": "Tongue and Groove",
      "Veneer Thickness": "2MM",
      "Finish": "UV Lacquered",
      "Grade": "ABCD",
      "Coating": "UV Lacquer",
      "Texture": "Wire Brushed"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Latte",
    "sourceUrl": "https://northernestflooring.ca/product/latte/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Latte-01-to-send-1.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layered Engineered",
      "Dimensions": "7-1/2” x ¾” x RL",
      "Locking/Profile": "Tongue and Groove",
      "Veneer Thickness": "2MM",
      "Finish": "UV Lacquered",
      "Grade": "ABCD",
      "Coating": "UV Lacquer",
      "Texture": "Wire Brushed"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Gothom Burg",
    "sourceUrl": "https://northernestflooring.ca/product/gothom-burg/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Gothom-Burg-01-to-send-1.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layered Engineered",
      "Dimensions": "7-1/2” x ¾” x RL",
      "Locking/Profile": "Tongue and Groove",
      "Veneer Thickness": "2MM",
      "Finish": "UV Lacquered",
      "Grade": "ABCD",
      "Coating": "UV Lacquer",
      "Texture": "Wire Brushed"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Woodland",
    "sourceUrl": "https://northernestflooring.ca/product/woodland/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Woodland-01-to-send-1.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "190 mm × 1900 mm (7 ½″ × 6′) — ~35% 600–1300 mm shorts",
      "Wear Layer": "3 mm European white oak",
      "Core": "15 mm WBP eucalyptus / mixed poplar",
      "Joint / Edge": "4‑side T&G, 0.5 mm micro‑bevel",
      "Surface / Finish": "Wire‑brushed, 5% matte UV‑cured anti‑scratch (Treffert / Teknos",
      "Moisture Content": "8–12%",
      "Grade": "ABCD Natural",
      "Certifications": "CE, FSC, FloorScore®, CARB II, E1"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Snowdrift",
    "sourceUrl": "https://northernestflooring.ca/product/snowdrift/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Snowdrift-01-to-send-2.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "190 mm × 1900 mm (7 ½″ × 6′) — ~35% 600–1300 mm shorts",
      "Wear Layer": "3 mm European white oak",
      "Core": "15 mm WBP eucalyptus / mixed poplar",
      "Joint / Edge": "4‑side T&G, 0.5 mm micro‑bevel",
      "Surface / Finish": "Wire‑brushed, 5% matte UV‑cured anti‑scratch (Treffert / Teknos",
      "Moisture Content": "8–12%",
      "Grade": "ABCD Natural",
      "Certifications": "CE, FSC, FloorScore®, CARB II, E1"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Black Wallnut",
    "sourceUrl": "https://northernestflooring.ca/product/black-wallnut/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Black-wallnut-01-to-send-1.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "190 mm × 1900 mm (7 ½″ × 6′) — ~35% 600–1300 mm shorts",
      "Wear Layer": "3 mm European white oak",
      "Core": "15 mm WBP eucalyptus / mixed poplar",
      "Joint / Edge": "4‑side T&G, 0.5 mm micro‑bevel",
      "Surface / Finish": "Wire‑brushed, 5% matte UV‑cured anti‑scratch (Treffert / Teknos",
      "Moisture Content": "8–12%",
      "Grade": "ABCD Natural",
      "Certifications": "CE, FSC, FloorScore®, CARB II, E1"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Vince",
    "sourceUrl": "https://northernestflooring.ca/product/vince/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Vince-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Zeus",
    "sourceUrl": "https://northernestflooring.ca/product/zeus/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Zues-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Mitis",
    "sourceUrl": "https://northernestflooring.ca/product/mitis/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Mitis-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Barcelona",
    "sourceUrl": "https://northernestflooring.ca/product/barcelona/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Barcelona-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Canvas",
    "sourceUrl": "https://northernestflooring.ca/product/canvas/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Canvas-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Albatross",
    "sourceUrl": "https://northernestflooring.ca/product/albatross/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Albatross.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Buckingham",
    "sourceUrl": "https://northernestflooring.ca/product/buckingham/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Buckgham-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Versailles",
    "sourceUrl": "https://northernestflooring.ca/product/versailles/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Versilles-01-to-send-1.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Titan",
    "sourceUrl": "https://northernestflooring.ca/product/titan/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Titan-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Pegasus",
    "sourceUrl": "https://northernestflooring.ca/product/pegasus/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Pegasus-01-to-end.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Sand Dune",
    "sourceUrl": "https://northernestflooring.ca/product/sand-dune/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Sanddune-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Magnifique",
    "sourceUrl": "https://northernestflooring.ca/product/magnifique/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Magnifique-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Petrus",
    "sourceUrl": "https://northernestflooring.ca/product/petrus/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Petrus-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Atlantis",
    "sourceUrl": "https://northernestflooring.ca/product/atlantis/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Atlantis-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Black Cedar",
    "sourceUrl": "https://northernestflooring.ca/product/black-cedar/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Black-Cedar-01-to-send.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "6 ½″ × RL (Long Length)",
      "Construction": "Engineered (1.2 mm white-oak veneer / multi-layer core)",
      "Texture & Finish": "Texture & Finish Brushed + UV-lacquer, matte",
      "Coverage": "25.58 sq ft / box",
      "Grade": "ABCD",
      "Install Options": "On/Above/Below grade (T&G)",
      "Warranty": "35-year residential"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Smoky Mountain",
    "sourceUrl": "https://northernestflooring.ca/product/smoky-mountain/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Smokey-Mountain-01-to-send.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "6 ½″ × RL (Long Length)",
      "Construction": "Engineered (1.2 mm white-oak veneer / multi-layer core)",
      "Texture & Finish": "Texture & Finish Brushed + UV-lacquer, matte",
      "Coverage": "25.58 sq ft / box",
      "Grade": "ABCD",
      "Install Options": "On/Above/Below grade (T&G)",
      "Warranty": "35-year residential"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Old Country",
    "sourceUrl": "https://northernestflooring.ca/product/old-country/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Old-Country-01-to-send.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "6 ½″ × RL (Long Length)",
      "Construction": "Engineered (1.2 mm white-oak veneer / multi-layer core)",
      "Texture & Finish": "Texture & Finish Brushed + UV-lacquer, matte",
      "Coverage": "25.58 sq ft / box",
      "Grade": "ABCD",
      "Install Options": "On/Above/Below grade (T&G)",
      "Warranty": "35-year residential"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Falcon Grey",
    "sourceUrl": "https://northernestflooring.ca/product/falcon-grey/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Falcon-Grey-01-to-send.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "6 ½″ × RL (Long Length)",
      "Construction": "Engineered (1.2 mm white-oak veneer / multi-layer core)",
      "Texture & Finish": "Texture & Finish Brushed + UV-lacquer, matte",
      "Coverage": "25.58 sq ft / box",
      "Grade": "ABCD",
      "Install Options": "On/Above/Below grade (T&G)",
      "Warranty": "35-year residential"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Elegant",
    "sourceUrl": "https://northernestflooring.ca/product/elegant/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Elegant-01-to-send-1.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "6-1/2″ x3/4”× RL",
      "Construction": "Engineered hickory (1.2 mm wear layer)",
      "Profile": "Tongue-and-groove",
      "Finish": "UV-lacquered, matte",
      "Texture": "Handscraped / distressed / brushed",
      "Coverage": "19.41 sq ft/box",
      "Warranties": "35-year residential (limited)"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Bristol",
    "sourceUrl": "https://northernestflooring.ca/product/bristol/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Bristol-01-to-send-1.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "6-1/2″ x3/4”× RL",
      "Construction": "Engineered hickory (1.2 mm wear layer)",
      "Profile": "Tongue-and-groove",
      "Finish": "UV-lacquered, matte",
      "Texture": "Handscraped / distressed / brushed",
      "Coverage": "19.41 sq ft/box",
      "Warranties": "35-year residential (limited)"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Cinder",
    "sourceUrl": "https://northernestflooring.ca/product/cinder/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Cinder-01-to-send-1.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "190 mm × 1900 mm (7 ½″ × 6′) — ~35% 600–1300 mm shorts",
      "Wear Layer": "3 mm European white oak",
      "Core": "15 mm WBP eucalyptus / mixed poplar",
      "Joint / Edge": "4‑side T&G, 0.5 mm micro‑bevel",
      "Surface / Finish": "Wire‑brushed, 5% matte UV‑cured anti‑scratch (Treffert / Teknos",
      "Moisture Content": "8–12%",
      "Grade": "ABCD Natural",
      "Certifications": "CE, FSC, FloorScore®, CARB II, E1"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Birol",
    "sourceUrl": "https://northernestflooring.ca/product/birol/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Birol-01-to-send-1.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "190 mm × 1900 mm (7 ½″ × 6′) — ~35% 600–1300 mm shorts",
      "Wear Layer": "3 mm European white oak",
      "Core": "15 mm WBP eucalyptus / mixed poplar",
      "Joint / Edge": "4‑side T&G, 0.5 mm micro‑bevel",
      "Surface / Finish": "Wire‑brushed, 5% matte UV‑cured anti‑scratch (Treffert / Teknos",
      "Moisture Content": "8–12%",
      "Grade": "ABCD Natural",
      "Certifications": "CE, FSC, FloorScore®, CARB II, E1"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Canyon Oak",
    "sourceUrl": "https://northernestflooring.ca/product/canyon-oak-2/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Canyon-Oak-01-to-send-1.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "190 mm × 1900 mm (7 ½″ × 6′) — ~35% 600–1300 mm shorts",
      "Wear Layer": "3 mm European white oak",
      "Core": "15 mm WBP eucalyptus / mixed poplar",
      "Joint / Edge": "4‑side T&G, 0.5 mm micro‑bevel",
      "Surface / Finish": "Wire‑brushed, 5% matte UV‑cured anti‑scratch (Treffert / Teknos",
      "Moisture Content": "8–12%",
      "Grade": "ABCD Natural",
      "Certifications": "CE, FSC, FloorScore®, CARB II, E1"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Sand Oak",
    "sourceUrl": "https://northernestflooring.ca/product/sand-oak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Sand-Oak-01-to-send-1.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "190 mm × 1900 mm (7 ½″ × 6′) — ~35% 600–1300 mm shorts",
      "Wear Layer": "3 mm European white oak",
      "Core": "15 mm WBP eucalyptus / mixed poplar",
      "Joint / Edge": "4‑side T&G, 0.5 mm micro‑bevel",
      "Surface / Finish": "Wire‑brushed, 5% matte UV‑cured anti‑scratch (Treffert / Teknos",
      "Moisture Content": "8–12%",
      "Grade": "ABCD Natural",
      "Certifications": "CE, FSC, FloorScore®, CARB II, E1"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Frozen Oak",
    "sourceUrl": "https://northernestflooring.ca/product/frozen-oak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Frozen-Oak-01-to-send.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "190 mm × 1900 mm (7 ½″ × 6′) — ~35% 600–1300 mm shorts",
      "Wear Layer": "3 mm European white oak",
      "Core": "15 mm WBP eucalyptus / mixed poplar",
      "Joint / Edge": "4‑side T&G, 0.5 mm micro‑bevel",
      "Surface / Finish": "Wire‑brushed, 5% matte UV‑cured anti‑scratch (Treffert / Teknos",
      "Moisture Content": "8–12%",
      "Grade": "ABCD Natural",
      "Certifications": "CE, FSC, FloorScore®, CARB II, E1"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "American Oak",
    "sourceUrl": "https://northernestflooring.ca/product/american-oak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/American-Oak-01-to-send-1.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "190 mm × 1900 mm (7 ½″ × 6′) — ~35% 600–1300 mm shorts",
      "Wear Layer": "3 mm European white oak",
      "Core": "15 mm WBP eucalyptus / mixed poplar",
      "Joint / Edge": "4‑side T&G, 0.5 mm micro‑bevel",
      "Surface / Finish": "Wire‑brushed, 5% matte UV‑cured anti‑scratch (Treffert / Teknos",
      "Moisture Content": "8–12%",
      "Grade": "ABCD Natural",
      "Certifications": "CE, FSC, FloorScore®, CARB II, E1"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Warm Beechwood",
    "sourceUrl": "https://northernestflooring.ca/product/warm-beechwood/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/WARM-BEECHWOOD-View-1-2.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium",
      "Collection": "Coastal"
    },
    "description": "",
    "needsReview": false
  },
  {
    "name": "Pure Walnut",
    "sourceUrl": "https://northernestflooring.ca/product/pure-walnut/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/PURE-WALNUT-2.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Surface Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium",
      "Collection": "Coastal"
    },
    "description": "",
    "needsReview": false
  },
  {
    "name": "Monaco",
    "sourceUrl": "https://northernestflooring.ca/product/monaco/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Monaco-2.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium",
      "Collection": "Coastal"
    },
    "description": "",
    "needsReview": false
  },
  {
    "name": "Nappa",
    "sourceUrl": "https://northernestflooring.ca/product/nappa/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/NAPPA-3.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Surface Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium",
      "Collection": "Coastal"
    },
    "description": "",
    "needsReview": false
  },
  {
    "name": "Nautilus",
    "sourceUrl": "https://northernestflooring.ca/product/nautilus/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Nautlus-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Smokehouse",
    "sourceUrl": "https://northernestflooring.ca/product/smokehouse/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Smokhouse.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Width & Length": "Wide plank, random lengths (up to 6ft)",
      "Profile": "Tongue & Groove, micro-bevel",
      "Surface": "Wire-brushed, matte",
      "Finish": "Low-gloss, UV Lacquered",
      "Grade": "ABCD (natural)",
      "Coverage": "sq ft / box",
      "Certifications": "FloorScore® / CARB II / E1 (as applicable)"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Pacific Coast",
    "sourceUrl": "https://northernestflooring.ca/product/pacific-coast/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Pacific-Coast-1.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Width & Length": "Wide plank, random lengths (up to 6ft)",
      "Profile": "Tongue & Groove, micro-bevel",
      "Surface": "Wire-brushed, matte",
      "Finish": "Low-gloss, UV Lacquered",
      "Grade": "ABCD (natural)",
      "Coverage": "sq ft / box",
      "Certifications": "FloorScore® / CARB II / E1 (as applicable)"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Grey Timber",
    "sourceUrl": "https://northernestflooring.ca/product/grey-timber/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Grey-Timber.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Width & Length": "Wide plank, random lengths (up to 6ft)",
      "Profile": "Tongue & Groove, micro-bevel",
      "Surface": "Wire-brushed, matte",
      "Finish": "Low-gloss, UV Lacquered",
      "Grade": "ABCD (natural)",
      "Coverage": "sq ft / box",
      "Certifications": "FloorScore® / CARB II / E1 (as applicable)"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Damask",
    "sourceUrl": "https://northernestflooring.ca/product/damask/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Damask.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Width & Length": "Wide plank, random lengths (up to 6ft)",
      "Profile": "Tongue & Groove, micro-bevel",
      "Surface": "Wire-brushed, matte",
      "Finish": "Low-gloss, UV Lacquered",
      "Grade": "ABCD (natural)",
      "Coverage": "sq ft / box",
      "Certifications": "FloorScore® / CARB II / E1 (as applicable)"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Borado",
    "sourceUrl": "https://northernestflooring.ca/product/borado/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/10/element--scaled.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Construction": "Multi-layer engineered",
      "Width & Length": "Wide plank, random lengths (up to 6ft)",
      "Profile": "Tongue & Groove, micro-bevel",
      "Surface": "Wire-brushed, matte",
      "Finish": "Low-gloss, UV Lacquered",
      "Grade": "ABCD (natural)",
      "Coverage": "sq ft / box",
      "Certifications": "FloorScore® / CARB II / E1 (as applicable)"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Ash Grey",
    "sourceUrl": "https://northernestflooring.ca/product/colours/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Ash-Grey-01-to-send-Good.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "6 ½″ × RL (Long Length)",
      "Construction": "Engineered (1.2 mm white-oak veneer / multi-layer core)",
      "Texture & Finish": "Texture & Finish Brushed + UV-lacquer, matte",
      "Coverage": "25.58 sq ft / box",
      "Grade": "ABCD",
      "Install Options": "On/Above/Below grade (T&G)",
      "Warranty": "35-year residential"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Manhattan",
    "sourceUrl": "https://northernestflooring.ca/product/manhattan/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Manhaten-01-to-send-1.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "6-1/2″ x3/4”× RL",
      "Construction": "Engineered hickory (1.2 mm wear layer)",
      "Profile": "Tongue-and-groove",
      "Finish": "UV-lacquered, matte",
      "Texture": "Handscraped / distressed / brushed",
      "Coverage": "19.41 sq ft/box",
      "Warranties": "35-year residential (limited)"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Kodiak",
    "sourceUrl": "https://northernestflooring.ca/product/kodiak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Kodiak-02-to-send-1.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "6-1/2″ x3/4”× RL",
      "Construction": "Engineered hickory (1.2 mm wear layer)",
      "Profile": "Tongue-and-groove",
      "Finish": "UV-lacquered, matte",
      "Texture": "Handscraped / distressed / brushed",
      "Coverage": "19.41 sq ft/box",
      "Warranties": "35-year residential (limited)"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "African Hickory",
    "sourceUrl": "https://northernestflooring.ca/product/african-hickory/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/African-Hickroy-02-to-send-1.jpg",
    "specifications": {
      "Thickness": "19 mm (¾″)",
      "Width & Length": "6-1/2″ x3/4”× RL",
      "Construction": "Engineered hickory (1.2 mm wear layer)",
      "Profile": "Tongue-and-groove",
      "Finish": "UV-lacquered, matte",
      "Texture": "Handscraped / distressed / brushed",
      "Coverage": "19.41 sq ft/box",
      "Warranties": "35-year residential (limited)"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Smoke",
    "sourceUrl": "https://northernestflooring.ca/product/smoke/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Smoke-01-to-send.jpg",
    "specifications": {
      "Species": "White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "6″ × ¾″ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Mid Oak",
    "sourceUrl": "https://northernestflooring.ca/product/mid-oak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Mid-Oak-03-to-send-1.jpg",
    "specifications": {
      "Species": "White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "6″ × ¾″ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Light Grey",
    "sourceUrl": "https://northernestflooring.ca/product/light-grey/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Light-Grey-01-to-send-1.jpg",
    "specifications": {
      "Species": "White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "6″ × ¾″ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Kentucky",
    "sourceUrl": "https://northernestflooring.ca/product/kentucky/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Kentucy-02-to-send.jpg",
    "specifications": {
      "Species": "White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "6″ × ¾″ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Hazelnut",
    "sourceUrl": "https://northernestflooring.ca/product/hazelnut/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Hazelnut-01-to-send-1.jpg",
    "specifications": {
      "Species": "White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "6″ × ¾″ × RL",
      "Tongue & Groove": "Wear Layer",
      "1.5 mm": "Surface",
      "UV-lacquered (matte": "Grade",
      "ABCD": "Colour Variation",
      "Low–Medium": "Coverage",
      "23.73 sq ft / box": "Warranty"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Grey Stone",
    "sourceUrl": "https://northernestflooring.ca/product/grey-stone/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Grey-stone-01-to-send-1.jpg",
    "specifications": {
      "Species": "White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "6″ × ¾″ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Wolfsburg",
    "sourceUrl": "https://northernestflooring.ca/product/wolfsburg/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Wolfs-Burg-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layered Engineered",
      "Dimensions": "7-1/2” x ¾” x RL",
      "Locking/Profile": "Tongue and Groove",
      "Veneer Thickness": "3 MM",
      "Finish": "UV Lacquered",
      "Grade": "ABCD",
      "Coating": "UV Lacquer",
      "Texture": "Wire Brushed"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Reverie",
    "sourceUrl": "https://northernestflooring.ca/product/reverie/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Riverie-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layered Engineered",
      "Dimensions": "7-1/2” x ¾” x RL",
      "Locking/Profile": "Tongue and Groove",
      "Veneer Thickness": "3 MM",
      "Finish": "UV Lacquered",
      "Grade": "ABCD",
      "Coating": "UV Lacquer",
      "Texture": "Wire Brushed"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Pala",
    "sourceUrl": "https://northernestflooring.ca/product/pala/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Pala-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layered Engineered",
      "Dimensions": "7-1/2” x ¾” x RL",
      "Locking/Profile": "Tongue and Groove",
      "Veneer Thickness": "3 MM",
      "Finish": "UV Lacquered",
      "Grade": "ABCD",
      "Coating": "UV Lacquer",
      "Texture": "Wire Brushed"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Moxie",
    "sourceUrl": "https://northernestflooring.ca/product/moxie/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Moxie-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layered Engineered",
      "Dimensions": "7-1/2” x ¾” x RL",
      "Locking/Profile": "Tongue and Groove",
      "Veneer Thickness": "3 MM",
      "Finish": "UV Lacquered",
      "Grade": "ABCD",
      "Coating": "UV Lacquer",
      "Texture": "Wire Brushed"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Karsea",
    "sourceUrl": "https://northernestflooring.ca/product/karsia/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Karesa-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layered Engineered",
      "Dimensions": "7-1/2” x ¾” x RL",
      "Locking/Profile": "Tongue and Groove",
      "Veneer Thickness": "3 MM",
      "Finish": "UV Lacquered",
      "Grade": "ABCD",
      "Coating": "UV Lacquer",
      "Texture": "Wire Brushed"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Element",
    "sourceUrl": "https://northernestflooring.ca/product/element/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/10/ELEMENT-1.jpg",
    "specifications": {
      "Element": "White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium",
      "Collection": "Coastal"
    },
    "description": "",
    "needsReview": false
  },
  {
    "name": "Celeste",
    "sourceUrl": "https://northernestflooring.ca/product/celeste/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/10/CELESTE-2.jpg",
    "specifications": {
      "Species": "White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium",
      "Collection": "Coastal"
    },
    "description": "",
    "needsReview": false
  },
  {
    "name": "Belize",
    "sourceUrl": "https://northernestflooring.ca/product/belize/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/10/Belize-2.jpg",
    "specifications": {
      "Species": "White Oak",
      "Construction": "Multi-layer engineered",
      "Dimensions": "7-1/2’’x 3/4’’ × RL",
      "Profile": "Tongue & Groove",
      "Wear Layer": "1.5 mm",
      "Surface": "Brushed, matte",
      "Finish": "UV-lacquered (matte)",
      "Grade": "ABCD",
      "Colour Variation": "Low–Medium",
      "Collection": "Coastal"
    },
    "description": "",
    "needsReview": false
  },
  {
    "name": "Ardor",
    "sourceUrl": "https://northernestflooring.ca/product/nation-series/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/10/Ardor-01-to-send.jpg",
    "specifications": {
      "Species": "European White Oak",
      "Structure": "Multi-layered Engineered",
      "Dimensions": "7-1/2” x ¾” x RL",
      "Locking/Profile": "Tongue and Groove",
      "Veneer Thickness": "3 MM",
      "Finish": "UV Lacquered",
      "Grade": "ABCD",
      "Coating": "UV Lacquer",
      "Texture": "Wire Brushed"
    },
    "description": "",
    "needsReview": true
  },
  {
    "name": "Untitled",
    "sourceUrl": "https://northernestflooring.ca/product/912/",
    "imageUrl": "",
    "specifications": {},
    "description": "",
    "needsReview": true
  }
];
const northernestCoastal: Product[] = northernestCatalogue.map(({ name, sourceUrl, imageUrl, specifications, description, needsReview }) => {
  const product = supplierListingProduct('Northernest', 'Engineered Hardwood', name, sourceUrl, specifications, imageUrl || undefined);
  const handle = new URL(sourceUrl).pathname.split('/').filter(Boolean).pop();
  return {
    ...product,
    ...(name === 'Canyon Oak' && handle === 'canyon-oak-2' ? { slug: 'northernest-canyon-oak-2' } : {}),
    ...(description ? { description } : {}),
    ...(imageUrl && specifications.Collection === 'Coastal' && name !== 'Warm Beechwood' ? northernestCoastalImageDisplayAuthorization : {}),
    ...(needsReview ? { specifications: { ...specifications, 'Supplier data review': 'Pending' } } : {})
  };
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
const pangolinOriginSpcVariants: Record<PangolinSku, { name: string; colour: string; imageUrl: string }> = {
  "PS101": {
    "name": "Origin Collection SPC - 7MM PS101 Syrup",
    "colour": "Syrup",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS101%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/cr=t:0%25,l:0%25,w:99.75%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS102": {
    "name": "Origin Collection SPC - 7MM PS102 Toffee",
    "colour": "Toffee",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS102%E6%95%88%E6%9E%9C%E5%9B%BEjpg-166bb97.jpg/:/cr=t:0%25,l:3.25%25,w:91.59%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS103": {
    "name": "Origin Collection SPC - 7MM PS103 Charcoal",
    "colour": "Charcoal",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS103%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/cr=t:0%25,l:0.12%25,w:99.75%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS104": {
    "name": "Origin Collection SPC - 7MM PS104 Slate",
    "colour": "Slate",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS104%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/cr=t:0%25,l:4.2%25,w:91.59%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS105": {
    "name": "Origin Collection SPC - 7MM PS105 Cream",
    "colour": "Cream",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS105%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/cr=t:0%25,l:0.12%25,w:99.75%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS106": {
    "name": "Origin Collection SPC - 7MM PS106 Mist",
    "colour": "Mist",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS106%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/cr=t:0%25,l:0.12%25,w:99.75%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS107": {
    "name": "Origin Collection SPC - 7MM PS107 Oatmeal",
    "colour": "Oatmeal",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS107%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/cr=t:0%25,l:0.12%25,w:99.75%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS109": {
    "name": "Origin Collection SPC - 7MM PS109 Dove",
    "colour": "Dove",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS109%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/rs=w:776,h:583,cg:true,m/cr=w:776,h:583"
  },
  "PS110": {
    "name": "Origin Collection SPC - 8MM PS110 Fawn",
    "colour": "Fawn",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS110%E6%95%88%E6%9E%9C%E5%9B%BE1.jpg/:/cr=t:0%25,l:0.12%25,w:99.75%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS111": {
    "name": "Origin Collection SPC - 8MM PS111 Flint",
    "colour": "Flint",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS111%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/cr=t:0%25,l:0.12%25,w:99.75%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS112": {
    "name": "Origin Collection SPC - 8MM PS112 Palomino",
    "colour": "Palomino",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS112%E6%95%88%E6%9E%9C%E5%9B%BE-dcb0f06.jpg/:/cr=t:0%25,l:0.12%25,w:99.75%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS114": {
    "name": "Origin Collection SPC - 8MM PS114 Chamois",
    "colour": "Chamois",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS114%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/cr=t:0%25,l:4.15%25,w:91.7%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS121": {
    "name": "Origin Collection SPC - 8MM PS121 Almond",
    "colour": "Almond",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS121%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/cr=t:0%25,l:4.13%25,w:91.75%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS122": {
    "name": "Origin Collection SPC - 8MM PS122 Tobac",
    "colour": "Tobac",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS122%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/cr=t:0%25,l:3.09%25,w:91.75%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS123": {
    "name": "Origin Collection SPC - 8MM PS123 Biscuit",
    "colour": "Biscuit",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS123%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/cr=t:0%25,l:2.07%25,w:91.75%25,h:100%25/rs=w:776,h:583,cg:true"
  },
  "PS124": {
    "name": "Origin Collection SPC - 8MM PS124 Mocha",
    "colour": "Mocha",
    "imageUrl": "https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS124%E6%95%88%E6%9E%9C%E5%9B%BE.jpg/:/cr=t:0%25,l:14.28%25,w:71.44%25,h:100%25/rs=w:776,h:583,cg:true"
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

const wodenCatalogue = [
  {
    "name": "1001 Sandy Cove",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_183ab2eb5f3644f88ddfe40d925d8d70~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1001-sandy-cove",
    "specifications": {
      "Collection": "10 Collection",
      "Product": "10 Collection",
      "Structure": "8mm SPC + 2MM CORK pad",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1002 Beach Bluff",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_3615f2eb4ca244d8a8c3500762f52c37~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1002-beach-bluff",
    "specifications": {
      "Collection": "10 Collection",
      "Product": "10 Collection",
      "Structure": "8mm SPC + 2MM CORK pad",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1003 Golden Shoal",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_e498bb6fafc142d6a72fcbed13b10b22~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1003-golden-shoal",
    "specifications": {
      "Collection": "10 Collection",
      "Product": "10 Collection",
      "Structure": "8mm SPC + 2MM CORK pad",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1004 River Clay",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_c8168225fcca498c80aaccb7acdf877d~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1004-river-clay",
    "specifications": {
      "Collection": "10 Collection",
      "Product": "10 Collection",
      "Structure": "8mm SPC + 2MM CORK pad",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1005 Smoky Walnut",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_e4f4095a307d4ca5a630d5402abdc3ac~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1005-smoky-walnut",
    "specifications": {
      "Collection": "10 Collection",
      "Product": "10 Collection",
      "Structure": "8mm SPC + 2MM CORK pad",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1006 Sunlit Wave",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_fcb31b9dc277474e9e01b50b7939a6cd~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1006-sunlit-wave",
    "specifications": {
      "Collection": "10 Collection",
      "Product": "10 Collection",
      "Structure": "8mm SPC + 2MM CORK pad",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1007 Cocoa Timber",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_b2d0d4f95cc24122926e256cabdbc5dc~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1007-cocoa-timber",
    "specifications": {
      "Collection": "10 Collection",
      "Product": "10 Collection",
      "Structure": "8mm SPC + 2MM CORK pad",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1008 Vintage Trail",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_6c16fcacd1e241a387463fed3b203153~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1008-vintage-trail",
    "specifications": {
      "Collection": "10 Collection",
      "Product": "10 Collection",
      "Structure": "8mm SPC + 2MM CORK pad",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "Como AB",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_f02b25e4dd394c59b7bdd658485c9afe~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/como-ab",
    "specifications": {
      "Collection": "6 ½ Monte Rosa Collection",
      "Product": "6 ½ Monte Rosa Collection",
      "Thickness": "3mm top layer AB/ABC Grade",
      "Size and Structure": "Wirebrushed; 6-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Alba AB",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_e1ff29730f34461c87ffbff408459544~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/alba-ab",
    "specifications": {
      "Collection": "6 ½ Monte Rosa Collection",
      "Product": "6 ½ Monte Rosa Collection",
      "Thickness": "3mm top layer AB/ABC Grade",
      "Size and Structure": "Wirebrushed; 6-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Verona AB",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_2e1efdaef2874a5591a294ffe8830dd4~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/verona-ab",
    "specifications": {
      "Collection": "6 ½ Monte Rosa Collection",
      "Product": "6 ½ Monte Rosa Collection",
      "Thickness": "3mm top layer AB/ABC Grade",
      "Size and Structure": "Wirebrushed; 6-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Pisa AB/ABC",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_7257683065e84b0bae1c1e0d04ffc184~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/pisa-ab-abc",
    "specifications": {
      "Collection": "6 ½ Monte Rosa Collection",
      "Product": "6 ½ Monte Rosa Collection",
      "Thickness": "3mm top layer AB/ABC Grade",
      "Size and Structure": "Wirebrushed; 6-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "505",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_cc0a91cc85e84987be5279a7730022e7~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/505",
    "specifications": {
      "Collection": "GlueDown Collection",
      "Product": "Looselay Collection",
      "Structure": "48.4“ x 7.44\"x 5mm pure vinyl",
      "Sq feet per box": "25 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "504",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_ee1d21a5d93c4ef496f8886f08ccb886~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/504",
    "specifications": {
      "Collection": "GlueDown Collection",
      "Product": "Looselay Collection",
      "Structure": "48.4“ x 7.44\"x 5mm pure vinyl",
      "Sq feet per box": "25 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "503",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_87612e1ee3d1475383bf800468842a42~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/503",
    "specifications": {
      "Collection": "GlueDown Collection",
      "Product": "Looselay Collection",
      "Structure": "48.4“ x 7.44\"x 5mm pure vinyl",
      "Sq feet per box": "25 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "502",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_945a2babc33646abab15cfd8565ab0c4~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/502",
    "specifications": {
      "Collection": "GlueDown Collection",
      "Product": "Looselay Collection",
      "Structure": "48.4“ x 7.44\"x 5mm pure vinyl",
      "Sq feet per box": "25 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "501",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_0402a5d850704a5ea01cf33fc2b3963e~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/501",
    "specifications": {
      "Collection": "GlueDown Collection",
      "Product": "Looselay Collection",
      "Structure": "48.4“ x 7.44\"x 5mm pure vinyl",
      "Sq feet per box": "25 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "304",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_6e59ece7ad2241b1866fb4ecc4696424~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/304",
    "specifications": {
      "Collection": "GlueDown Collection",
      "Product": "Glue Down",
      "Structure": "48\"x 7.25\"x3mm installation glue; pure vinyl",
      "Sq feet per box": "38.80 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "303",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_945a2babc33646abab15cfd8565ab0c4~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/303",
    "specifications": {
      "Collection": "GlueDown Collection",
      "Product": "Glue Down",
      "Structure": "48\"x 7.25\"x3mm installation glue; pure vinyl",
      "Sq feet per box": "38.80 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "302",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_87612e1ee3d1475383bf800468842a42~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/302",
    "specifications": {
      "Collection": "GlueDown Collection",
      "Product": "Glue Down",
      "Structure": "48\"x 7.25\"x3mm installation glue; pure vinyl",
      "Sq feet per box": "38.80 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "301",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_3e425e7bf37d459aaa61a667fcfe1bad~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/301",
    "specifications": {
      "Collection": "GlueDown Collection",
      "Product": "Glue Down",
      "Structure": "48\"x 7.25\"x3mm installation glue; pure vinyl",
      "Sq feet per box": "38.80 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "107 Sicily",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_72e9321d32eb45608b9b86a935fe8b83~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/107-sicily-1",
    "specifications": {
      "Collection": "7 Garnet Collection",
      "Product": "7 Garnet Collection (101-107)",
      "Structure": "5mm+2mm Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 7mm",
      "Sq feet per box": "23.62 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "Cloudbeam",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_a7123ca5ed214b60b84d037213e56aa7~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/cloudbeam",
    "specifications": {
      "Collection": "Lumine Collection",
      "Product": "Lumine Collection",
      "Thickness": "4mm top layer AB Grade",
      "Size and Structure": "Wirebrushed; 6-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Silkstone",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_a7123ca5ed214b60b84d037213e56aa7~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/silkstone",
    "specifications": {
      "Collection": "Lumine Collection",
      "Product": "Lumine Collection",
      "Thickness": "4mm top layer AB Grade",
      "Size and Structure": "Wirebrushed; 6-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Creamwood",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_d26e31e0252f48258cba63462f7687f8~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/creamwood",
    "specifications": {
      "Collection": "Lumine Collection",
      "Product": "Lumine Collection",
      "Thickness": "4mm top layer AB Grade",
      "Size and Structure": "Wirebrushed; 6-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Snowhaze ABC",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_b15f796aae0b49ebbf84b21d6158fc6f~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/snowhaze-abc",
    "specifications": {
      "Collection": "Lumine Collection",
      "Product": "Lumine Collection",
      "Thickness": "4mm top layer AB Grade",
      "Size and Structure": "Wirebrushed; 6-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Oatlight ABC",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_5e8d6c768ebd476c8849d1c2b02d1c47~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/oatlight-abc",
    "specifications": {
      "Collection": "Lumine Collection",
      "Product": "Lumine Collection",
      "Thickness": "4mm top layer AB Grade",
      "Size and Structure": "Wirebrushed; 6-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Snowhaze AB",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_dcde5fb8ceb34d059d135e79710942fc~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/snowhaze-ab",
    "specifications": {
      "Collection": "Lumine Collection",
      "Product": "Lumine Collection",
      "Thickness": "4mm top layer AB Grade",
      "Size and Structure": "Wirebrushed; 6-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Oatlight AB",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_de65e3e179a64805a1189dc847e0fc53~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/oatlight-ab",
    "specifications": {
      "Collection": "Lumine Collection",
      "Product": "Lumine Collection",
      "Thickness": "4mm top layer AB Grade",
      "Size and Structure": "Wirebrushed; 6-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Sanremo",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_162352388a45484d980c1c700cc47fbd~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/sanremo",
    "specifications": {
      "Collection": "Monte Rosa Collection",
      "Product": "Monte Rosa Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "7-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "AB",
      "Top Layer": "3mm"
    }
  },
  {
    "name": "Twilight",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_51a5c86ede944524afd8812f107686fb~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/twilight",
    "specifications": {
      "Collection": "Timbercraft Collection",
      "Product": "Timbercraft Collection",
      "Thickness": "3mm top layer ABC Grade",
      "Size and Structure": "Smoked and Swamark; 7-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Bluff",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_191ff580ff5d4e58b4a0dfa10e298fca~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/bluff",
    "specifications": {
      "Collection": "Timbercraft Collection",
      "Product": "Timbercraft Collection",
      "Thickness": "3mm top layer ABC Grade",
      "Size and Structure": "Smoked and Swamark; 7-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Whisky Barrel",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_7257683065e84b0bae1c1e0d04ffc184~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/whisky-barrel",
    "specifications": {
      "Collection": "Timbercraft Collection",
      "Product": "Timbercraft Collection",
      "Thickness": "3mm top layer ABC Grade",
      "Size and Structure": "Smoked and Wirebrushed; 7-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Aroma",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_5f0260de29e9416389ad944da69f7967~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/aroma",
    "specifications": {
      "Collection": "Timbercraft Collection",
      "Product": "Timbercraft Collection",
      "Thickness": "3mm top layer ABC Grade",
      "Size and Structure": "Smoked and Wirebrushed; 7-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Moonlit",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_1899ac2025eb4d65963331265c3c059b~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/moonlit",
    "specifications": {
      "Collection": "Timbercraft Collection",
      "Product": "Timbercraft Collection",
      "Thickness": "3mm top layer ABC Grade",
      "Size and Structure": "Smoked and Swamark; 7-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "Mysa",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_fe4dfc6630cc4c97b194db1ae2730d68~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/mysa",
    "specifications": {
      "Collection": "Timbercraft Collection",
      "Product": "Timbercraft Collection",
      "Thickness": "3mm top layer ABC Grade",
      "Size and Structure": "Smoked and Wirebrushed; 7-1/2\"x 3/4× RL(16\" to 74\") At least 50% full length"
    }
  },
  {
    "name": "1101 Night Freeze",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_8dbd37d1d05948e6b65108be95342dce~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1101-night-freeze",
    "specifications": {
      "Collection": "11 Collection",
      "Product": "11 Collection (1101-1108)",
      "Thickness": "11 mm",
      "Size": "5 ft*9 inch",
      "Veneer Thickness": "22mil",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1102 Camellia",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_989221e7de354900b001759b8bfe419b~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1102-camellia",
    "specifications": {
      "Collection": "11 Collection",
      "Product": "11 Collection (1101-1108)",
      "Thickness": "11 mm",
      "Size": "5 ft*9 inch",
      "Veneer Thickness": "22mil",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1103 Moon Fly",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_de6571bd3ea04bd6936832729ec9f22f~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1103-moon-fly",
    "specifications": {
      "Collection": "11 Collection",
      "Product": "11 Collection (1101-1108)",
      "Thickness": "11 mm",
      "Size": "5 ft*9 inch",
      "Veneer Thickness": "22mil",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1104 Vintage Cream",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_c01464da5e32445c8c2c51af698ed74c~mv2.png",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1104-vintage-cream",
    "specifications": {
      "Collection": "11 Collection",
      "Product": "11 Collection (1101-1108)",
      "Thickness": "11 mm",
      "Size": "5 ft*9 inch",
      "Veneer Thickness": "22mil",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1105 Silver Mist",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_5f2c385e69844ffab1f864fc0e154bd4~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1105-silver-mist",
    "specifications": {
      "Collection": "11 Collection",
      "Product": "11 Collection (1101-1108)",
      "Thickness": "11 mm",
      "Size": "5 ft*9 inch",
      "Veneer Thickness": "22mil",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1106 Twilight",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_cb2b49379fae4ecf915cedacf74af26f~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1106-twilight",
    "specifications": {
      "Collection": "11 Collection",
      "Product": "11 Collection (1101-1108)",
      "Thickness": "11 mm",
      "Size": "5 ft*9 inch",
      "Veneer Thickness": "22mil",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1107 Wild Truffle",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_237ac4722a3344e98cf13f2ad0ba582a~mv2.png",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1107-wild-truffle",
    "specifications": {
      "Collection": "11 Collection",
      "Product": "11 Collection (1101-1108)",
      "Thickness": "11 mm",
      "Size": "5 ft*9 inch",
      "Veneer Thickness": "22mil",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "1108 Wheatfield",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_15e7c9168943400080dfbd8837957f2b~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1108-wheatfield",
    "specifications": {
      "Collection": "11 Collection",
      "Product": "11 Collection (1101-1108)",
      "Thickness": "11 mm",
      "Size": "5 ft*9 inch",
      "Veneer Thickness": "22mil",
      "Sq feet per box": "15 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "Milan Herringbone",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_ea1652cec357486e8693a718f799a63e~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/milan-herringbone",
    "specifications": {
      "Collection": "Monte Rosa Herringbone Collection",
      "Product": "Monte Rosa Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "7-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "AB",
      "Top Layer": "3mm"
    }
  },
  {
    "name": "Nice Herringbone",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_2cdf27d93c6947d781e7235e4ff2b480~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/nice-herringbone",
    "specifications": {
      "Collection": "Monte Rosa Herringbone Collection",
      "Product": "Monte Rosa Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "7-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "AB",
      "Top Layer": "3mm"
    }
  },
  {
    "name": "Menton Herringbone",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_6991e38e2e404038ae19b1ff289078bf~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/menton-herringbone",
    "specifications": {
      "Collection": "Monte Rosa Herringbone Collection",
      "Product": "Monte Rosa Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "7-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "AB",
      "Top Layer": "3mm"
    }
  },
  {
    "name": "Turin Herringbone",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_cc9d08b4e2c4446d866580cd01f47b71~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/turin-herringbone",
    "specifications": {
      "Collection": "Monte Rosa Herringbone Collection",
      "Product": "Monte Rosa Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "7-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "AB",
      "Top Layer": "3mm"
    }
  },
  {
    "name": "Turin",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_f996903da0e941b09a559aaa856c2145~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/turin",
    "specifications": {
      "Collection": "Monte Rosa Collection",
      "Product": "Monte Rosa Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "7-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "AB",
      "Top Layer": "3mm"
    }
  },
  {
    "name": "Milan",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_408e570abe524c7db1ad11a14a6fed12~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/milan",
    "specifications": {
      "Collection": "Monte Rosa Collection",
      "Product": "Monte Rosa Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "7-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "AB",
      "Top Layer": "3mm"
    }
  },
  {
    "name": "Nice",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_6189508fe5be437cb7c7ff473092bdd3~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/nice",
    "specifications": {
      "Collection": "Monte Rosa Collection",
      "Product": "Monte Rosa Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "7-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "AB",
      "Top Layer": "3mm"
    }
  },
  {
    "name": "1206 Cliff",
    "category": "Laminate",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_0fb681ce9a774fc4b88a2302bca3796d~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1206-pearl",
    "specifications": {
      "Collection": "12 Collection",
      "Product": "Laminate 12 Collection",
      "Structure": "1515*196*12mm 6pcs/box",
      "Sq feet per box": "19.18 SQFT/BOX"
    }
  },
  {
    "name": "1205 Basin",
    "category": "Laminate",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_24a784db1f234216b68af56c356a9e8c~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1205-landmark",
    "specifications": {
      "Collection": "12 Collection",
      "Product": "Laminate 12 Collection",
      "Structure": "1515*196*12mm 6pcs/box",
      "Sq feet per box": "19.18 SQFT/BOX"
    }
  },
  {
    "name": "1204 Glacier",
    "category": "Laminate",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_c2e915aa60064ffd95f544dfde33ee79~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1204-glacier",
    "specifications": {
      "Collection": "12 Collection",
      "Product": "Laminate 12 Collection",
      "Structure": "1515*196*12mm 6pcs/box",
      "Sq feet per box": "19.18 SQFT/BOX"
    }
  },
  {
    "name": "1203 Meteor",
    "category": "Laminate",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_4f463a51c31249cb802c6b7ab7573f2e~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1203-meteor",
    "specifications": {
      "Collection": "12 Collection",
      "Product": "Laminate 12 Collection",
      "Structure": "1515*196*12mm 6pcs/box",
      "Sq feet per box": "19.18 SQFT/BOX"
    }
  },
  {
    "name": "1202 Terra",
    "category": "Laminate",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_1998e6901af442de8182229349a604ec~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1202-terra",
    "specifications": {
      "Collection": "12 Collection",
      "Product": "Laminate 12 Collection",
      "Structure": "1515*196*12mm 6pcs/box",
      "Sq feet per box": "19.18 SQFT/BOX"
    }
  },
  {
    "name": "1201 Plain",
    "category": "Laminate",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_97968f789e744f219cde925217f458b7~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/1201-plain",
    "specifications": {
      "Collection": "12 Collection",
      "Product": "Laminate 12 Collection",
      "Structure": "1515*196*12mm 6pcs/box",
      "Sq feet per box": "19.18 SQFT/BOX"
    }
  },
  {
    "name": "Modern Grey",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_2a451526ebf94d349f4121846638b127~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/modern-grey",
    "specifications": {
      "Collection": "Vermont Collection",
      "Product": "Vermont Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "6-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABC",
      "Sq feet per box": "22.75 SQFT/BOX"
    }
  },
  {
    "name": "Hudson",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_31afff7691ac4319a797bcc245f57a89~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/hudson",
    "specifications": {
      "Collection": "Vermont Collection",
      "Product": "Vermont Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "6-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABC",
      "Sq feet per box": "22.75 SQFT/BOX"
    }
  },
  {
    "name": "Charcoal",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_33cc90844dc84bb788d4f20c4e4cfdf7~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/charcoal",
    "specifications": {
      "Collection": "Vermont Collection",
      "Product": "Vermont Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "6-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABC",
      "Sq feet per box": "22.75 SQFT/BOX"
    }
  },
  {
    "name": "Woodland",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_9342036ed98e45a99cef4ea104488294~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/woodland",
    "specifications": {
      "Collection": "Vermont Collection",
      "Product": "Vermont Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "6-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABC",
      "Sq feet per box": "22.75 SQFT/BOX"
    }
  },
  {
    "name": "Rock Cliffs",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_c835a2ec8d9a46e48fe95edd1a1da7ac~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/rock-cliffs",
    "specifications": {
      "Collection": "Vermont Collection",
      "Product": "Vermont Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "6-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABC",
      "Sq feet per box": "22.75 SQFT/BOX"
    }
  },
  {
    "name": "Cloudy Grey",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_897cbdc3693b43a8ae39256a932d6d46~mv2.png",
    "sourceUrl": "https://www.wodenflooring.com/product-page/cloudy-grey",
    "specifications": {
      "Collection": "Vermont Collection",
      "Product": "Vermont Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "6-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABC",
      "Sq feet per box": "22.75 SQFT/BOX"
    }
  },
  {
    "name": "FOG",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_aaad56db61964a6c80eab07701e4d37e~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/fog",
    "specifications": {
      "Collection": "Vermont Collection",
      "Product": "Vermont Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "6-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABC",
      "Sq feet per box": "22.75 SQFT/BOX"
    }
  },
  {
    "name": "Vivid White",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_5242d10bb9e2425d8114b1c6a4e099a8~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/vivid-white",
    "specifications": {
      "Collection": "Vermont Collection",
      "Product": "Vermont Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "6-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABC",
      "Sq feet per box": "22.75 SQFT/BOX"
    }
  },
  {
    "name": "Blizzard",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_32f47c94c81248978d1df3a93887de78~mv2.png",
    "sourceUrl": "https://www.wodenflooring.com/product-page/blizzard",
    "specifications": {
      "Collection": "Vermont Collection",
      "Product": "Vermont Collection - Engineered Hardwood Flooring",
      "Species": "American Oak",
      "Structure": "6-1/2\"× 3/4\"× RL (16\" to 74\")",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABC",
      "Sq feet per box": "22.75 SQFT/BOX"
    }
  },
  {
    "name": "Raven",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_9b25c95e780b4212a05b020064d24257~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/raven",
    "specifications": {
      "Collection": "Grand Chateau Collection",
      "Product": "Grand Chateau Collection - Engineered Hardwood Flooring",
      "Species": "Oak",
      "Structure": "7-1/2\"x 3/4xRL(16\" to 74\"), At least 50% full-length",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "23.93 SQFT/BOX"
    }
  },
  {
    "name": "Skye",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_b5944912352a4657a891bc925742632b~mv2.png",
    "sourceUrl": "https://www.wodenflooring.com/product-page/skye",
    "specifications": {
      "Collection": "Grand Chateau Collection",
      "Product": "Grand Chateau Collection - Engineered Hardwood Flooring",
      "Species": "Oak",
      "Structure": "7-1/2\"x 3/4xRL(16\" to 74\"), At least 50% full-length",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "23.93 SQFT/BOX"
    }
  },
  {
    "name": "Rocky",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_31943b17315b44e4919c1ac78e0ec1da~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/rocky",
    "specifications": {
      "Collection": "Grand Chateau Collection",
      "Product": "Grand Chateau Collection - Engineered Hardwood Flooring",
      "Species": "Oak",
      "Structure": "7-1/2\"x 3/4xRL(16\" to 74\"), At least 50% full-length",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "23.93 SQFT/BOX"
    }
  },
  {
    "name": "Coyote",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_b463d5d6247d4714a7a39dac18fefd11~mv2.png",
    "sourceUrl": "https://www.wodenflooring.com/product-page/coyote",
    "specifications": {
      "Collection": "Grand Chateau Collection",
      "Product": "Grand Chateau Collection - Engineered Hardwood Flooring",
      "Species": "Oak",
      "Structure": "7-1/2\"x 3/4xRL(16\" to 74\"), At least 50% full-length",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "23.93 SQFT/BOX"
    }
  },
  {
    "name": "Chelsea",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_4a79767af350411782db9760ce8a372c~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/chelsea",
    "specifications": {
      "Collection": "Grand Chateau Collection",
      "Product": "Grand Chateau Collection - Engineered Hardwood Flooring",
      "Species": "Oak",
      "Structure": "7-1/2\"x 3/4xRL(16\" to 74\"), At least 50% full-length",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "23.93 SQFT/BOX"
    }
  },
  {
    "name": "Romance",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_9f31479122864f5982f307aaa35d7db9~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/romance",
    "specifications": {
      "Collection": "Grand Chateau Collection",
      "Product": "Grand Chateau Collection - Engineered Hardwood Flooring",
      "Species": "Oak",
      "Structure": "7-1/2\"x 3/4xRL(16\" to 74\"), At least 50% full-length",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "23.93 SQFT/BOX"
    }
  },
  {
    "name": "Drift Wood",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_ff85499f178b450e9ba2b16e1435933d~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/drift-wood",
    "specifications": {
      "Collection": "Grand Chateau Collection",
      "Product": "Grand Chateau Collection - Engineered Hardwood Flooring",
      "Species": "Oak",
      "Structure": "7-1/2\"x 3/4xRL(16\" to 74\"), At least 50% full-length",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "23.93 SQFT/BOX"
    }
  },
  {
    "name": "Natural",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_42e82607e1a14a07a9accb683a07be11~mv2.png",
    "sourceUrl": "https://www.wodenflooring.com/product-page/natural",
    "specifications": {
      "Collection": "Grand Chateau Collection",
      "Product": "Grand Chateau Collection - Engineered Hardwood Flooring",
      "Species": "Oak",
      "Structure": "7-1/2\"x 3/4xRL(16\" to 74\"), At least 50% full-length",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "23.93 SQFT/BOX"
    }
  },
  {
    "name": "Townsend",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_1e5bc421c0be4adb919365566460f576~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/townsend",
    "specifications": {
      "Collection": "Grand Chateau Collection",
      "Product": "Grand Chateau Collection - Engineered Hardwood Flooring",
      "Species": "Oak",
      "Structure": "7-1/2\"x 3/4xRL(16\" to 74\"), At least 50% full-length",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "23.93 SQFT/BOX"
    }
  },
  {
    "name": "Gold Coast",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_50fb8cf6519f406f922532e8f9b1437d~mv2.png",
    "sourceUrl": "https://www.wodenflooring.com/product-page/gold-coast",
    "specifications": {
      "Collection": "Elite Collection",
      "Product": "Elite Collection - Engineered Hardwood Flooring",
      "Structure": "6-1/2\"x 3/4× RL(16\" to 74\"), At least 50% full length",
      "Veneer Thickness": "2mm",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "20.50 SQFT/BOX"
    }
  },
  {
    "name": "Timberwolf",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_468fc077c88744a49fed2fdc858e9571~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/timberwolf",
    "specifications": {
      "Collection": "Elite Collection",
      "Product": "Elite Collection - Engineered Hardwood Flooring",
      "Structure": "6-1/2\"x 3/4× RL(16\" to 74\"), At least 50% full length",
      "Veneer Thickness": "2mm",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "20.50 SQFT/BOX"
    }
  },
  {
    "name": "Cashmere",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_b011f64d83a147b7bc8a466445fbdec3~mv2.png",
    "sourceUrl": "https://www.wodenflooring.com/product-page/cashmere",
    "specifications": {
      "Collection": "Elite Collection",
      "Product": "Elite Collection - Engineered Hardwood Flooring",
      "Structure": "6-1/2\"x 3/4× RL(16\" to 74\"), At least 50% full length",
      "Veneer Thickness": "2mm",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "20.50 SQFT/BOX"
    }
  },
  {
    "name": "Irish Tea",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_79d51b26a7e0422482e7c80706b4bb0c~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/irish-tea",
    "specifications": {
      "Collection": "Elite Collection",
      "Product": "Elite Collection - Engineered Hardwood Flooring",
      "Structure": "6-1/2\"x 3/4× RL(16\" to 74\"), At least 50% full length",
      "Veneer Thickness": "2mm",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "20.50 SQFT/BOX"
    }
  },
  {
    "name": "Monaco",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_1be6abccb01242018a2536faa740ae37~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/monaco",
    "specifications": {
      "Collection": "Elite Collection",
      "Product": "Elite Collection - Engineered Hardwood Flooring",
      "Structure": "6-1/2\"x 3/4× RL(16\" to 74\"), At least 50% full length",
      "Veneer Thickness": "2mm",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "20.50 SQFT/BOX"
    }
  },
  {
    "name": "Noble",
    "category": "Engineered Hardwood",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_e657e08b2d1f48cdb57f6e423f414042~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/frozen-oak",
    "specifications": {
      "Collection": "Elite Collection",
      "Product": "Elite Collection - Engineered Hardwood Flooring",
      "Structure": "6-1/2\"x 3/4× RL(16\" to 74\"), At least 50% full length",
      "Veneer Thickness": "2mm",
      "Surface Texture": "Wire Brushed",
      "Grade": "ABCD",
      "Sq feet per box": "20.50 SQFT/BOX"
    }
  },
  {
    "name": "H01 Prestige Natural",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_81538dd5e3464a68974f01b0499fc487~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/h01-prestige-natural",
    "specifications": {
      "Collection": "Vinyl Herringbone Collection",
      "Product": "Vinyl Herringbone Collection (H01-H04)",
      "Structure": "5.5mm+1.5mm IXPE Pad 4 Sides Painted Bevel",
      "Dimensions": "128 (5\") x 615 (24\") x 7mm",
      "Sq feet per box": "20.34 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "H02 Seaside Motel",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_7ba7699e928543a498f3c691644a8179~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/h02-seaside-motel",
    "specifications": {
      "Collection": "Vinyl Herringbone Collection",
      "Product": "Vinyl Herringbone Collection (H01-H04)",
      "Structure": "5.5mm+1.5mm IXPE Pad 4 Sides Painted Bevel",
      "Dimensions": "128 (5\") x 615 (24\") x 7mm",
      "Sq feet per box": "20.34 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "H03 Honey Oak",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_8b642eafaa4b4c87948f0ccb91a5b0ad~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/h03-honey-oak",
    "specifications": {
      "Collection": "Vinyl Herringbone Collection",
      "Product": "Vinyl Herringbone Collection (H01-H04)",
      "Structure": "5.5mm+1.5mm IXPE Pad 4 Sides Painted Bevel",
      "Dimensions": "128 (5\") x 615 (24\") x 7mm",
      "Sq feet per box": "20.34 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "H04 Light Champagene",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_1f0e32558f8c420792e04ba9e8d1d4e8~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/h04-light-champagene",
    "specifications": {
      "Collection": "Vinyl Herringbone Collection",
      "Product": "Vinyl Herringbone Collection (H01-H04)",
      "Structure": "5.5mm+1.5mm IXPE Pad 4 Sides Painted Bevel",
      "Dimensions": "128 (5\") x 615 (24\") x 7mm",
      "Sq feet per box": "20.34 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "901 Sea Breeze",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_0147ceb014f64f0bb091471e5ae36a33~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/901sea-breeze",
    "specifications": {
      "Collection": "9 Collection",
      "Product": "9 Collection (901-906)",
      "Structure": "7 mm+ 2mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 9mm",
      "Veneer Thickness": "0.55mm/22mil",
      "Sq feet per box": "14.76 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "902 Foggy Rockies",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_945a2babc33646abab15cfd8565ab0c4~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/902-foggy-rockies",
    "specifications": {
      "Collection": "9 Collection",
      "Product": "9 Collection (901-906)",
      "Structure": "7 mm+ 2mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 9mm",
      "Veneer Thickness": "0.55mm/22mil",
      "Sq feet per box": "14.76 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "903 Eternal Cosmos",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_72e9321d32eb45608b9b86a935fe8b83~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/903-eternal-cosmos",
    "specifications": {
      "Collection": "9 Collection",
      "Product": "9 Collection (901-906)",
      "Structure": "7 mm+ 2mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 9mm",
      "Veneer Thickness": "0.55mm/22mil",
      "Sq feet per box": "14.76 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "904 Vanilla Coconut",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_e3a25e3d16d84dbeb348a0b0ebc9be3c~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/904-vanilla-coconut",
    "specifications": {
      "Collection": "9 Collection",
      "Product": "9 Collection (901-906)",
      "Structure": "7 mm+ 2mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 9mm",
      "Veneer Thickness": "0.55mm/22mil",
      "Sq feet per box": "14.76 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "905 Monarch Coast",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_c5c6ab21fc304fa9a7162fbd39c54a97~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/905-monarch-coast",
    "specifications": {
      "Collection": "9 Collection",
      "Product": "9 Collection (901-906)",
      "Structure": "7 mm+ 2mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 9mm",
      "Veneer Thickness": "0.55mm/22mil",
      "Sq feet per box": "14.76 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "906 Boundless Sand",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_cc0a91cc85e84987be5279a7730022e7~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/906-boundless-sand",
    "specifications": {
      "Collection": "9 Collection",
      "Product": "9 Collection (901-906)",
      "Structure": "7 mm+ 2mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 9mm",
      "Veneer Thickness": "0.55mm/22mil",
      "Sq feet per box": "14.76 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "907 Sandstone",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_87612e1ee3d1475383bf800468842a42~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/907-sandstone",
    "specifications": {
      "Collection": "9 Collection",
      "Product": "9 Collection (901-906)",
      "Structure": "7 mm+ 2mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 9mm",
      "Veneer Thickness": "0.55mm/22mil",
      "Sq feet per box": "14.76 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "908 Charleston",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_e626efdefdf448879858097c691b877c~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/908-charleston",
    "specifications": {
      "Collection": "9 Collection",
      "Product": "9 Collection (901-906)",
      "Structure": "7 mm+ 2mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 9mm",
      "Veneer Thickness": "0.55mm/22mil",
      "Sq feet per box": "14.76 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "106 Beach",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_d5a2270b890d49edbb1d02c49ef58d8e~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/106-beach",
    "specifications": {
      "Collection": "7 Garnet Collection",
      "Product": "7 Garnet Collection (101-107)",
      "Structure": "5mm+2mm Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 7mm",
      "Sq feet per box": "23.62 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "105 Pacific",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_945b8655d8954e2abdd0efc5af89c32f~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/105-pacific",
    "specifications": {
      "Collection": "7 Garnet Collection",
      "Product": "7 Garnet Collection (101-107)",
      "Structure": "5mm+2mm Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 7mm",
      "Sq feet per box": "23.62 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "104 Bedford",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_8833afa3d3c74ccbb0a9bade712fa8ba~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/104-bedford",
    "specifications": {
      "Collection": "7 Garnet Collection",
      "Product": "7 Garnet Collection (101-107)",
      "Structure": "5mm+2mm Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 7mm",
      "Sq feet per box": "23.62 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "103 Jasper",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_1b6b228ed01b4d1e8831e677646739c1~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/103-jasper",
    "specifications": {
      "Collection": "7 Garnet Collection",
      "Product": "7 Garnet Collection (101-107)",
      "Structure": "5mm+2mm Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 7mm",
      "Sq feet per box": "23.62 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "102 Woodcraft",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_44542c82d6a9402bada85ef940be0f7f~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/102-woodcraft",
    "specifications": {
      "Collection": "7 Garnet Collection",
      "Product": "7 Garnet Collection (101-107)",
      "Structure": "5mm+2mm Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 7mm",
      "Sq feet per box": "23.62 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "101 Farmhouse",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_e626efdefdf448879858097c691b877c~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/101",
    "specifications": {
      "Collection": "7 Garnet Collection",
      "Product": "7 Garnet Collection (101-107)",
      "Structure": "5mm+2mm Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 7mm",
      "Sq feet per box": "23. SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "812 Grand Basin",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_67234af1f8f042afa2fff1ab37979518~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/712",
    "specifications": {
      "Collection": "8 Diamond Collection",
      "Product": "8 Diamond Collection",
      "Structure": "6.0mm+2.0mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 8mm",
      "Veneer Thickness": "0.5mm/20mil",
      "Sq feet per box": "17.72 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "811 Mount Harbor",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_31cae97250274a1cbdc709151c8360d6~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/711",
    "specifications": {
      "Collection": "8 Diamond Collection",
      "Product": "8 Diamond Collection",
      "Structure": "6.0mm+2.0mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 8mm",
      "Veneer Thickness": "0.5mm/20mil",
      "Sq feet per box": "17.72 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "810 Capital Reef",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_0402a5d850704a5ea01cf33fc2b3963e~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/710",
    "specifications": {
      "Collection": "8 Diamond Collection",
      "Product": "8 Diamond Collection",
      "Structure": "6.0mm+2.0mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 8mm",
      "Veneer Thickness": "0.5mm/20mil",
      "Sq feet per box": "17.72 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "809 Greek Cabin",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_ccba306c0f924d7fa071184cadb787a2~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/709",
    "specifications": {
      "Collection": "8 Diamond Collection",
      "Product": "8 Diamond Collection",
      "Structure": "6.0mm+2.0mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 8mm",
      "Veneer Thickness": "0.5mm/20mil",
      "Sq feet per box": "17.72 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "808 Late Autumn",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_66260bf1ecc84ad3936dd48eb8690b36~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/708",
    "specifications": {
      "Collection": "8 Diamond Collection",
      "Product": "8 Diamond Collection",
      "Structure": "6.0mm+2.0mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 8mm",
      "Veneer Thickness": "0.5mm/20mil",
      "Sq feet per box": "17.72 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "807 Arcodia",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_599b6ca9af1b43f8b24744f38a934381~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/707",
    "specifications": {
      "Collection": "7 Diamond Collection",
      "Product": "8 Diamond Collection",
      "Structure": "6.0mm+2.0mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 8mm",
      "Veneer Thickness": "0.5mm/20mil",
      "Sq feet per box": "17.72 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "806 Rustic Pier",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_a143fe46567a44fba39126f8b08ce4fb~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/706",
    "specifications": {
      "Collection": "8 Diamond Collection",
      "Product": "8 Diamond Collection",
      "Structure": "6.0mm+2.0mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 8mm",
      "Veneer Thickness": "0.5mm/20mil",
      "Sq feet per box": "17.72 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "805 Misty Island",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_6e59ece7ad2241b1866fb4ecc4696424~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/705",
    "specifications": {
      "Collection": "8 Diamond Collection",
      "Product": "8 Diamond Collection",
      "Structure": "6.0mm+2.0mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 8mm",
      "Veneer Thickness": "0.5mm/20mil",
      "Sq feet per box": "17.72 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "804 Trail Bay",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_362cb04bd6da407598c0c90f29a439f4~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/704",
    "specifications": {
      "Collection": "8 Diamond Collection",
      "Product": "8 Diamond Collection",
      "Structure": "6.0mm+2.0mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 8mm",
      "Veneer Thickness": "0.5mm/20mil",
      "Sq feet per box": "17.72 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "803 Ashy Stone",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_54ee3baea1d443bfaec0a31f552178e6~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/703",
    "specifications": {
      "Collection": "8 Diamond Collection",
      "Product": "8 Diamond Collection",
      "Structure": "6.0mm+2.0mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 8mm",
      "Veneer Thickness": "0.5mm/20mil",
      "Sq feet per box": "17.72 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "802 Sierra Canyon",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_17f0b172fe7f4b2dbc976718b725a81e~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/702",
    "specifications": {
      "Collection": "8 Diamond Collection",
      "Product": "8 Diamond Collection",
      "Structure": "6.0mm+2.0mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 8mm",
      "Veneer Thickness": "0.5mm/20mil",
      "Sq feet per box": "17.72 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "801 Sandy Shell",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_723bfe4eea09469c871b9bdad86737ac~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/701",
    "specifications": {
      "Collection": "8 Diamond Collection",
      "Product": "8 Diamond Collection",
      "Structure": "6.0mm+2.0mm XPE",
      "Dimensions": "180 (7\") x 1524 (60\") x 7mm",
      "Veneer Thickness": "0.5mm/20mil",
      "Sq feet per box": "17.72 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "610",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_af2c25e78231421f98526c6e3c701e55~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/610",
    "specifications": {
      "Collection": "6 Collection",
      "Product": "6 Collection (601-610)",
      "Structure": "4.5mm SPC+1.5mm EVA Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 6mm",
      "Sq feet per box": "20.67 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "609",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_ee1d21a5d93c4ef496f8886f08ccb886~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/609",
    "specifications": {
      "Collection": "6 Collection",
      "Product": "6 Collection (601-610)",
      "Structure": "4.5mm SPC+1.5mm EVA Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 6mm",
      "Sq feet per box": "20.67 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "608",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_665bfc92a99c48f3b45ccf949b4f7f78~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/608",
    "specifications": {
      "Collection": "6 Collection",
      "Product": "6 Collection (601-610)",
      "Structure": "4.5mm SPC+1.5mm EVA Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 6mm",
      "Sq feet per box": "20.67 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "607",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_87612e1ee3d1475383bf800468842a42~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/607",
    "specifications": {
      "Collection": "6 Collection",
      "Product": "6 Collection (601-610)",
      "Structure": "4.5mm SPC+1.5mm EVA Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 6mm",
      "Sq feet per box": "20.67 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "606",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_ecf0b71bb4414620910b4a758bbd63ee~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/606",
    "specifications": {
      "Collection": "6 Collection",
      "Product": "6 Collection (601-610)",
      "Structure": "4.5mm SPC+1.5mm EVA Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 6mm",
      "Sq feet per box": "20.67 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "605",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_c5c6ab21fc304fa9a7162fbd39c54a97~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/605",
    "specifications": {
      "Collection": "6 Collection",
      "Product": "6 Collection (601-610)",
      "Structure": "4.5mm SPC+1.5mm EVA Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 6mm",
      "Sq feet per box": "20.67 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "603",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_0094d333c347467a97f659bc4628b39e~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/603",
    "specifications": {
      "Collection": "6 Collection",
      "Product": "6 Collection (601-610)",
      "Structure": "4.5mm SPC+1.5mm EVA Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 6mm",
      "Sq feet per box": "20.67 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "602",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_3e425e7bf37d459aaa61a667fcfe1bad~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/602",
    "specifications": {
      "Collection": "6 Collection",
      "Product": "6 Collection (601-610)",
      "Structure": "4.5mm SPC+1.5mm EVA Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 6mm",
      "Sq feet per box": "20.67 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  },
  {
    "name": "601",
    "category": "Vinyl",
    "imageUrl": "https://static.wixstatic.com/media/d8ccde_e3a25e3d16d84dbeb348a0b0ebc9be3c~mv2.jpg",
    "sourceUrl": "https://www.wodenflooring.com/product-page/601",
    "specifications": {
      "Collection": "6 Collection",
      "Product": "6 Collection (601-610)",
      "Structure": "4.5mm SPC+1.5mm EVA Pad",
      "Dimensions": "180 (7\") x 1524 (60\") x 6mm",
      "Sq feet per box": "20.67 SQFT/BOX",
      "Installation options": "On, above, or below grade"
    }
  }
] satisfies Array<{ name: string; category: Product['category']; imageUrl: string; sourceUrl: string; specifications: Record<string, string> }>;
const wodenProducts = wodenCatalogue.map(({ name, category, imageUrl, sourceUrl, specifications }) => supplierListingProduct('Woden', category, name, sourceUrl, specifications, imageUrl));

const weissEngineeredImageUrls: Partial<Record<string, string>> = {
  'Golden Oak': 'https://static.wixstatic.com/media/084e8e_2f739ae6107c470b96f47cef6986d66e~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/golden%20oak%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Dijon': 'https://static.wixstatic.com/media/084e8e_72850b973d444498af6ff855467a88e5~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Dijon%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
  'Mocha': 'https://static.wixstatic.com/media/084e8e_f1782e3bc6934c47a2df951bed6af348~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Mocha%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
  'Pebble': 'https://static.wixstatic.com/media/084e8e_13fc62508142418fb8bf0a80fbe4c688~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pebble%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
  'Caramel': 'https://static.wixstatic.com/media/084e8e_862772a8c6804e1585e12bcf11bc05ce~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Caramel%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
  'Vanilla': 'https://static.wixstatic.com/media/084e8e_53111b50d6fb4324a3edfcd9ff7d884f~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Vanilla%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
  'Sand': 'https://static.wixstatic.com/media/084e8e_24ae04627aa14eaa843341934b907182~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Sand%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
  'Amber': 'https://static.wixstatic.com/media/084e8e_164784e3747049d5bf53386aae79b065~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Amber%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
  'Silvery Gray': 'https://static.wixstatic.com/media/084e8e_97339703f0cf42c5a67408ca5a214b3d~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Silver%20Gray%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Saffron': 'https://static.wixstatic.com/media/084e8e_ddf710d642b6476780be7c7a709d1fa9~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Saffron%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
  'Seashell': 'https://static.wixstatic.com/media/084e8e_facc4dd4de824836985b3ade527f9ad7~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Seashell%20%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
  'Sandy Brown': 'https://static.wixstatic.com/media/084e8e_6744958d9635405ba7fbdb5a40195652~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Sandy%20Brown%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Raw': 'https://static.wixstatic.com/media/084e8e_2f4f6b01a0124fb9a0592a8b0a64cf67~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Raw%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Fortino': 'https://static.wixstatic.com/media/084e8e_d82bbd8da3a14e67ab95f6706e4cf029~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Fortino%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Hickory Walnut': 'https://static.wixstatic.com/media/084e8e_71c57dbb11e2401eaf507dd5344f0771~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/hickory%20Walnut%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Pure Hickory': 'https://static.wixstatic.com/media/084e8e_bf2fc4e5dc9749ed8ae7edc959b0d294~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/hickory%20Pure%20Hickory%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Cottage Maple': 'https://static.wixstatic.com/media/084e8e_c31444d0f7c64e458cb30ce8c7815c02~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Cottage%20Maple%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Original Maple': 'https://static.wixstatic.com/media/084e8e_0aad406ac7454124a6b1d8047adc9b8b~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/original%20maple%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Ash Toffee': 'https://static.wixstatic.com/media/084e8e_cfd07e838edb45858ad8ed25857aaa2d~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/ash%20Toffee%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Ash Natural': 'https://static.wixstatic.com/media/084e8e_0a9bf53d19a84e9a9da8e25230fa7b30~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/ash%20Natural%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Toffee': 'https://static.wixstatic.com/media/084e8e_73c8ca37dd304ab7b71f85490407f63a~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Toffee%20%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
  'Cream': 'https://static.wixstatic.com/media/084e8e_af08f38613324ea6a6897277b4f607ff~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Cream%20%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Pewter': 'https://static.wixstatic.com/media/084e8e_98f2e03acc8f4f3bbed5987a2ffaabcd~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pewter%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
  'Penny': 'https://static.wixstatic.com/media/084e8e_b327d16309ee4f2683e7234c9c6cb099~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Penny%20%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
  'Coconut': 'https://static.wixstatic.com/media/084e8e_e8f2380d6b8248b09f14707efa6cda58~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Coconut%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg'
};

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
  { 'Product line': 'Engineered hardwood' },
  weissEngineeredImageUrls[name]
));

const weissSpcImageUrls: Partial<Record<string, string>> = {
  'Venus': 'https://static.wixstatic.com/media/084e8e_0905f994ecd747c583a9733b76bf5da5~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Venus2.jpg',
  'Havenest': 'https://static.wixstatic.com/media/084e8e_5f4f875111fa4dc68c7147f93e43ac08~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Havenest1.jpg',
  'Driftwood': 'https://static.wixstatic.com/media/084e8e_118bfb9b8a664ef996a5b3ec48ad4fa7~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Driftwood2.jpg',
  'Boltique': 'https://static.wixstatic.com/media/084e8e_0cc0cb76dce64648bcf2c1d871a6beee~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Boltique2.jpg',
  'Covehaus': 'https://static.wixstatic.com/media/084e8e_b25b9dfe295c43e0a534245fed05e292~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Covehaus1.jpg',
  'Sable': 'https://static.wixstatic.com/media/084e8e_af46c4cf3c2a4302a8e7db5f85a1eff0~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Sable%20Layout.jpg',
  'Fog': 'https://static.wixstatic.com/media/084e8e_ad201263964445a997d7c795fad66cd0~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Fog%20Layout.jpg',
  'Reef': 'https://static.wixstatic.com/media/084e8e_63731184224048479940dae2ff10d790~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Reef%20Layout.jpg',
  'Coral': 'https://static.wixstatic.com/media/084e8e_d7137610c35c47b896fd43623588b396~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Coral%20Layout.jpg',
  'American Walnut': 'https://static.wixstatic.com/media/084e8e_a9bb5cf871e44fedb495e244cd5d6eba~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/American%20Walnut%20%20Layout.jpg',
  'Caviar': 'https://static.wixstatic.com/media/084e8e_d690634d8f98443696daf2ad7aaef6c9~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Caviar%20Layout.jpg',
  'Cinnabar': 'https://static.wixstatic.com/media/084e8e_1962d338dbe544bb9dd6c2011e143f2d~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Cinnabar%20Layout.jpg',
  'Tan': 'https://static.wixstatic.com/media/084e8e_5e5fda1580ad4ee686722dddcaa33cee~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Tan%20Layout.jpg',
  'Vega': 'https://static.wixstatic.com/media/084e8e_2a8a0d0a1119406f9daca11028b5726f~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Vega%20Layout.jpg',
  'Bora': 'https://static.wixstatic.com/media/084e8e_b88cca64c3fb4c46b759aad11410ea7f~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Bora%20Layout.jpg',
  'Copacabana': 'https://static.wixstatic.com/media/084e8e_0b8cb3f08cc2431f89c51a2d57395235~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Copacabana%20Layout.jpg',
  'Hanalei': 'https://static.wixstatic.com/media/084e8e_db7f3388875c44ed93ce7e94964682a3~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Hanalei%20Layout.jpg',
  'Lanikai': 'https://static.wixstatic.com/media/084e8e_731ea794be1b454c940813f2fdba4439~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Lanikai%20Layout.jpg',
  'Siesta': 'https://static.wixstatic.com/media/084e8e_1ebdb39b72814c899eced11429ce7dbe~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Siesta%20Layout%20(2).jpg',
  'Trunk Bay': 'https://static.wixstatic.com/media/084e8e_afb855f90a4b451fbf0c25aff2f47126~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Trunk%20Bay%20Layout.jpg',
  'Varadero': 'https://static.wixstatic.com/media/084e8e_60a6136bdcb5442784a53e0929e1e8cb~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Varadero%20Layout.jpg',
  'Wasaga': 'https://static.wixstatic.com/media/084e8e_b8eefa2b70714ad6a54f15b746766a4e~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Wasaga%20Layout.jpg'
};

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
  { 'Product line': 'SPC vinyl' },
  weissSpcImageUrls[name]
));

const weissLaminateImageUrls: Partial<Record<string, string>> = {
  'Aube': 'https://static.wixstatic.com/media/084e8e_f03d4f57a4034376a3ad07e3baa11535~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/aube%202008-7A%20%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Citadel': 'https://static.wixstatic.com/media/084e8e_66430cd7af8b4a7687f7362e767d2d00~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/citadel%2091225-13%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Eclipse': 'https://static.wixstatic.com/media/084e8e_a3d5d3bb749346d087578f1803000d10~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/eclipse%202183-7B%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Horizon': 'https://static.wixstatic.com/media/084e8e_84966b8f0ad04acb9dda295cd756804c~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/HORIZON%201906-19%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Meridian': 'https://static.wixstatic.com/media/084e8e_3fad53921a8540d18545df5a4fa46be1~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/meridian%2021117-20%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Savage': 'https://static.wixstatic.com/media/084e8e_5aa3e9f3d95945c09d23d23dc729b7fa~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/sauvage%2021118-5%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Titanium': 'https://static.wixstatic.com/media/084e8e_94a2af4a648d49f694e8546428897487~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/titanium%201905-4%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
  'Zenith': 'https://static.wixstatic.com/media/084e8e_5ea1ee889c5d437cab4cd00d28672172~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/zenith%201703-1%E9%93%BA%E8%A3%85%E5%9B%BE.jpg'
};

const weissLaminateNames = ['Zenith', 'Titanium', 'Savage', 'Meridian', 'Horizon', 'Eclipse', 'Citadel', 'Aube'];
const weissLaminateProducts = weissLaminateNames.map(name => supplierListingProduct(
  'Weiss',
  'Laminate',
  name,
  'https://www.weissflooring.ca/premierlaminate',
  { 'Product line': 'Premier laminate' },
  weissLaminateImageUrls[name]
));


const vidarWestListings = [
  {
    "name": "7 1/2'' Collection American White Oak – Driftwood",
    "imageUrl": "https://vidarflooring.com/images/2_Collection_-_American_White_Oak-Driftwood.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-driftwood?catid=19",
    "specifications": {
      "Collection": "7 1/2'' Collection American White Oak",
      "Colour": "Driftwood",
      "Region": "West of Canada"
    }
  },
  {
    "name": "7 1/2'' Collection American White Oak – Honeywheat",
    "imageUrl": "https://vidarflooring.com/images/Flooring%20pictures/2_Collection_-_American_White_Oak-Honeywheat_-_new.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-honey-wheat?catid=19",
    "specifications": {
      "Collection": "7 1/2'' Collection American White Oak",
      "Colour": "Honeywheat",
      "Region": "West of Canada"
    }
  },
  {
    "name": "7 1/2'' Collection American White Oak – Moonlight",
    "imageUrl": "https://vidarflooring.com/images/Flooring%20pictures/2_Collection_-_American_White_Oak-Moonlight_-_new.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/7-1-2%E2%80%98%E2%80%99-collection-american-white-oak-moon-light?catid=19",
    "specifications": {
      "Collection": "7 1/2'' Collection American White Oak",
      "Colour": "Moonlight",
      "Region": "West of Canada"
    }
  },
  {
    "name": "7 1/2'' Collection American White Oak – Night Owl",
    "imageUrl": "https://vidarflooring.com/images/Flooring%20pictures/2_Collection_-_American_White_Oak-Night_Owl_-_new.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-night-owl?catid=19",
    "specifications": {
      "Collection": "7 1/2'' Collection American White Oak",
      "Colour": "Night Owl",
      "Region": "West of Canada"
    }
  },
  {
    "name": "7 1/2'' Collection American White Oak – Urban Grey",
    "imageUrl": "https://vidarflooring.com/images/2_Collection_-_American_White_Oak-Urban_Grey.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/7-1-2-collection-american-white-oak-urban-grey?catid=19",
    "specifications": {
      "Collection": "7 1/2'' Collection American White Oak",
      "Colour": "Urban Grey",
      "Region": "West of Canada"
    }
  },
  {
    "name": "9'' Collection American White Oak – Daybreak",
    "imageUrl": "https://vidarflooring.com/images/Flooring%20pictures/9_Collection_-_American_White_Oak-Daybreak.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/naked-oak-daybreak?catid=19",
    "specifications": {
      "Collection": "9'' Collection American White Oak",
      "Colour": "Daybreak",
      "Region": "West of Canada"
    }
  },
  {
    "name": "9'' Collection American White Oak – Macaroon",
    "imageUrl": "https://vidarflooring.com/images/Macaroon3.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/9-collection-american-white-oak-macaroon?catid=19",
    "specifications": {
      "Collection": "9'' Collection American White Oak",
      "Colour": "Macaroon",
      "Region": "West of Canada"
    }
  },
  {
    "name": "9'' Collection American White Oak – Naked Oak",
    "imageUrl": "https://vidarflooring.com/images/Flooring%20pictures/9_Collection_-_American_White_Oak-Naked_Oak.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-naked-oak?catid=19",
    "specifications": {
      "Collection": "9'' Collection American White Oak",
      "Colour": "Naked Oak",
      "Region": "West of Canada"
    }
  },
  {
    "name": "9'' Collection American White Oak – Silver Stone",
    "imageUrl": "https://vidarflooring.com/images/Silverstone-AB.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/naked-oak-silver-stone?catid=19",
    "specifications": {
      "Collection": "9'' Collection American White Oak",
      "Colour": "Silver Stone",
      "Region": "West of Canada"
    }
  },
  {
    "name": "9'' Collection American White Oak – Urban Grey",
    "imageUrl": "https://vidarflooring.com/images/Urban_Grey.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/naked-oak-urban-grey?catid=19",
    "specifications": {
      "Collection": "9'' Collection American White Oak",
      "Colour": "Urban Grey",
      "Region": "West of Canada"
    }
  },
  {
    "name": "9'' Collection American White Oak – Wheatberry",
    "imageUrl": "https://vidarflooring.com/images/9_Collection_-_American_White_Oak-Wheatberry.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-wheat-berry?catid=19",
    "specifications": {
      "Collection": "9'' Collection American White Oak",
      "Colour": "Wheatberry",
      "Region": "West of Canada"
    }
  },
  {
    "name": "American Black Walnut 7 Collection – Natural",
    "imageUrl": "https://vidarflooring.com/images/American_Black_Walnut_7_Collection-Natural_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-black-walnut-7-collection-natural?catid=19",
    "specifications": {
      "Collection": "American Black Walnut 7 Collection",
      "Colour": "Natural",
      "Region": "West of Canada"
    }
  },
  {
    "name": "American Black Walnut 7 Collection – Provence",
    "imageUrl": "https://vidarflooring.com/images/American_Black_Walnut_7_Collection-Provence_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-black-walnut-7-collection-provence?catid=19",
    "specifications": {
      "Collection": "American Black Walnut 7 Collection",
      "Colour": "Provence",
      "Region": "West of Canada"
    }
  },
  {
    "name": "American Oak 5 Herringbone Collection – Naked Oak",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_Herringbone_Collection-Naked_Oak_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-5-herringbone-collection-naked-oak?catid=19",
    "specifications": {
      "Collection": "American Oak 5 Herringbone Collection",
      "Colour": "Naked Oak",
      "Region": "West of Canada"
    }
  },
  {
    "name": "American Oak 5 Herringbone Collection – Pearl",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_5_Herringbone_Collection-Pearl_ABC_Select.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-5-herringbone-collection-pearl?catid=19",
    "specifications": {
      "Collection": "American Oak 5 Herringbone Collection",
      "Colour": "Pearl",
      "Region": "West of Canada"
    }
  }
];
const vidarWestNewIndices = [1, 3, 5, 9, 12, 13];
const vidarWestNewProducts = vidarWestNewIndices.map(index => {
  const { name, sourceUrl, imageUrl, specifications } = vidarWestListings[index];
  return { ...supplierListingProduct('Vidar', 'Engineered Hardwood', name, sourceUrl, specifications, imageUrl), ...vidarProductDisplayAuthorization };
});
function withVidarWestListing(product: Product): Product {
  const listing = vidarWestListings.find(item => item.name === product.name);
  if (!listing) return product;
  return { ...product, specifications: { ...product.specifications, Region: 'West of Canada', 'West of Canada image': listing.imageUrl, 'West of Canada product page': listing.sourceUrl } };
}

const vidarSeattleListings = [
  {
    "name": "7 1/2'' Collection American White Oak – Night Owl",
    "imageUrl": "https://vidarflooring.com/images/Flooring%20pictures/2_Collection_-_American_White_Oak-Night_Owl_-_new.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-night-owl?catid=19"
  },
  {
    "name": "American Oak 7 Collection-Macaroon",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Macaroon_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-macaroon?catid=19"
  },
  {
    "name": "American Oak 7 Collection-Naked Oak",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Naked_Oak_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-naked-oak?catid=19"
  },
  {
    "name": "American Oak 7 Collection-Pearl",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Pearl_ABCD_Character.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-pearl?catid=19"
  },
  {
    "name": "American Oak 7 Collection-Sky",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Sky_ABCD_Character.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-sky?catid=19"
  },
  {
    "name": "American Oak 7 Collection-Wheat Berry",
    "imageUrl": "https://vidarflooring.com/images/American_Oak_7_Collection-Wheat_Berry_AB_Select_and_Better.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/american-oak-7-collection-wheat-berry?catid=19"
  }
];
function withVidarSeattleListing(product: Product): Product {
  const listing = vidarSeattleListings.find(item => item.name === product.name);
  if (!listing) return product;
  const region = product.specifications?.Region;
  return { ...product, specifications: { ...product.specifications, Region: region ? region + ', Seattle' : 'Seattle', 'Seattle image': listing.imageUrl, 'Seattle product page': listing.sourceUrl } };
}

const vidarSpcProducts = [
  {
    "name": "VS81(MACAROON)",
    "imageUrl": "https://vidarflooring.com/images/SPC/vs81-macaroon/cover.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/vs81-macaroon?catid=27",
    "specifications": {
      "SKU": "VS81",
      "Colour": "MACAROON",
      "Construction": "SPC",
      "Region": "East of Canada"
    }
  },
  {
    "name": "VS82(YUKON)",
    "imageUrl": "https://vidarflooring.com/images/SPC/vs82-yukon/cover.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/vs82-yukon?catid=27",
    "specifications": {
      "SKU": "VS82",
      "Colour": "YUKON",
      "Construction": "SPC",
      "Region": "East of Canada"
    }
  },
  {
    "name": "VS83(NAKED OAK)",
    "imageUrl": "https://vidarflooring.com/images/SPC/vs83-naked-oak/cover.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/vs83-naked-oak?catid=27",
    "specifications": {
      "SKU": "VS83",
      "Colour": "NAKED OAK",
      "Construction": "SPC",
      "Region": "East of Canada"
    }
  },
  {
    "name": "VS84(TOFFEE CRUNCH)",
    "imageUrl": "https://vidarflooring.com/images/SPC/vs84-toffee-crunch/cover.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/vs84-toffee-crunch?catid=27",
    "specifications": {
      "SKU": "VS84",
      "Colour": "TOFFEE CRUNCH",
      "Construction": "SPC",
      "Region": "East of Canada"
    }
  },
  {
    "name": "VS86(CAMEL)",
    "imageUrl": "https://vidarflooring.com/images/SPC/vs86-camel/cover.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/vs86-camel?catid=27",
    "specifications": {
      "SKU": "VS86",
      "Colour": "CAMEL",
      "Construction": "SPC",
      "Region": "East of Canada"
    }
  },
  {
    "name": "VS87(SUNSET)",
    "imageUrl": "https://vidarflooring.com/images/SPC/vs87-sunset/cover.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/vs87-sunset?catid=27",
    "specifications": {
      "SKU": "VS87",
      "Colour": "SUNSET",
      "Construction": "SPC",
      "Region": "East of Canada"
    }
  },
  {
    "name": "VS88(SKY)",
    "imageUrl": "https://vidarflooring.com/images/SPC/vs88-sky/cover.jpg",
    "sourceUrl": "https://vidarflooring.com/en/component/content/article/vs88-sky?catid=27",
    "specifications": {
      "SKU": "VS88",
      "Colour": "SKY",
      "Construction": "SPC",
      "Region": "East of Canada"
    }
  }
].map(({ name, imageUrl, sourceUrl, specifications }) => ({
  ...supplierListingProduct('Vidar', 'Vinyl', name, sourceUrl, specifications, imageUrl),
  ...vidarProductDisplayAuthorization
}));

const leeHybridProducts = [
  {
    "name": "Havana",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Havana_1.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/havana/",
    "specifications": {
      "Product": "Havana",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "7 3/4\" x 3/4\"",
      "Color": "Warm Oak",
      "Sq feet per box": "20.97",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "50",
      "Weight / Box": "45 lbs",
      "Weight / Skid": "2250 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Toronto",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Toronto_1.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/toronto/",
    "specifications": {
      "Product": "Toronto",
      "SKU": "8387",
      "Collection": "Hybrid Engineered",
      "Dimensions": "7 3/4\" x 3/4\"",
      "Color": "Light Grey",
      "Sq feet per box": "20.97",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "50",
      "Weight / Box": "45 lbs",
      "Weight / Skid": "2250 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Chicago",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/07/Chicago.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/chicago/",
    "specifications": {
      "Product": "Chicago",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "7 3/4\" x 3/4\"",
      "Color": "Golden Oak",
      "Sq feet per box": "23.98",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "40",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2200 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Vancouver",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Vancouver_1.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/vancouver/",
    "specifications": {
      "Product": "Vancouver",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "7 3/4\" x 3/4\"",
      "Color": "Pearl Oak",
      "Sq feet per box": "23.98",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "40",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2200 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "New York",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Newyork_1.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/newyork/",
    "specifications": {
      "Product": "New York",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "7 3/4\" x 3/4\"",
      "Color": "Sand Beige",
      "Sq feet per box": "23.98",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "40",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2200 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Halifax",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Halifax_1.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/halifax/",
    "specifications": {
      "Product": "Halifax",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "7 3/4\" x 3/4\"",
      "Color": "Light Oak",
      "Sq feet per box": "23.98",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "40",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2200 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Atlanta",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Atlanta_1.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/atlanta/",
    "specifications": {
      "Product": "Atlanta",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "7 3/4\" x 3/4\"",
      "Color": "Walnut Brown",
      "Sq feet per box": "23.98",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "40",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2200 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Montreal",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Montreal_1.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/montreal/",
    "specifications": {
      "Product": "Montreal",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "9 1/2\" x 3/4\"",
      "Color": "Grey Oak",
      "Sq feet per box": "26.08",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "48",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2640 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Las Vegas",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Las-vegas_1.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/lasvegas/",
    "specifications": {
      "Product": "Las Vegas",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "9 1/2\" x 3/4\"",
      "Color": "Wheat Gold",
      "Sq feet per box": "26.08",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "48",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2640 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "San Francisco",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Sans_1.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/sanfrancisco/",
    "specifications": {
      "Product": "San Francisco",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "9 1/2\" x 3/4\"",
      "Color": "Linen Oak",
      "Sq feet per box": "26.08",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "48",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2640 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Boston",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/07/Boston.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/boston/",
    "specifications": {
      "Product": "Boston",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "6 1/2\" x 3/4\"",
      "Color": "Dune Oak",
      "Sq feet per box": "19.97",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "48",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2640 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Denver",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/07/Denver.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/denver/",
    "specifications": {
      "Product": "Denver",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "6 1/2\" x 3/4\"",
      "Color": "Silver Mist Oak",
      "Sq feet per box": "19.97",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "48",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2640 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Houston",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/07/Houston.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/houston/",
    "specifications": {
      "Product": "Houston",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "6 1/2\" x 3/4\"",
      "Color": "Smoked Walnut",
      "Sq feet per box": "19.97",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "48",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2640 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Philadelphia",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/07/Philadelphia.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/philadelphia/",
    "specifications": {
      "Product": "Philadelphia",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "6 1/2\" x 3/4\"",
      "Color": "Linen Oak",
      "Sq feet per box": "19.97",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "48",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2640 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "San Diego",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/07/San-Diego.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/san-diego/",
    "specifications": {
      "Product": "San Diego",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "6 1/2\" x 3/4\"",
      "Color": "Golden Wheat Oak",
      "Sq feet per box": "19.97",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "48",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2640 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "New Orleans",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/07/New-Orleans.webp",
    "sourceUrl": "https://leeflooring.ca/products/hybrid/new-orleans/",
    "specifications": {
      "Product": "New Orleans",
      "SKU": "7480",
      "Collection": "Hybrid Engineered",
      "Dimensions": "6 1/2\" x 3/4\"",
      "Color": "Champagne Oak",
      "Sq feet per box": "19.97",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "48",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2640 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  }
].map(({ name, imageUrl, sourceUrl, specifications, description }) => ({
  ...supplierListingProduct('Lee Flooring', 'Engineered Hardwood', name, sourceUrl, specifications, imageUrl),
  slug: 'lee-flooring-hybrid-' + slugPart(name),
  description
}));

const leeAdditionalEngineeredProducts = [
  {
    "name": "Hickory Barnwood",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Hickory-Barnwood_2-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/premium-engineered/hickory-barnwood/",
    "specifications": {
      "Product": "Hickory Barnwood",
      "SKU": "5677",
      "Dimensions": "6-1/2\"X3/4\"",
      "Color": "Rustic Hickory",
      "Sq feet per box": "26.2",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "40",
      "Weight / Box": "50 lbs",
      "Weight / Skid": "2000 lbs",
      "Collection": "Premium Engineered",
      "Colour": "Rustic Hickory",
      "Coverage per box": "26.2",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "40",
      "Weight per box": "50 lbs",
      "Weight per skid": "2000 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Oak Banff",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Oak-Banff-2-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/premium-engineered/oak-banff/",
    "specifications": {
      "Product": "Oak Banff",
      "SKU": "5567",
      "Collection": "Premium Engineered",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Light Natural Oak",
      "Sq feet per box": "28",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "44",
      "Weight / Box": "50 lbs",
      "Weight / Skid": "2200 lbs",
      "Colour": "Light Natural Oak",
      "Coverage per box": "28",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "44",
      "Weight per box": "50 lbs",
      "Weight per skid": "2200 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Hickory Natural",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Hickory-Natural-2-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/premium-engineered/hickory-natural/",
    "specifications": {
      "Product": "Hickory Natural",
      "SKU": "5578",
      "Collection": "Premium Engineered",
      "Dimensions": "7-1/4\"X3/4\"",
      "Color": "Natural Hickory",
      "Sq feet per box": "26.2",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "40",
      "Weight / Box": "50 lbs",
      "Weight / Skid": "2000 lbs",
      "Colour": "Natural Hickory",
      "Coverage per box": "26.2",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "40",
      "Weight per box": "50 lbs",
      "Weight per skid": "2000 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Oak Honey Wheat",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Oak-Honey-Wheat-2-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/premium-engineered/oak-honey-wheat/",
    "specifications": {
      "Product": "Oak Honey Wheat",
      "SKU": "2245",
      "Collection": "Premium Engineered",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Honey Oak",
      "Sq feet per box": "27.5",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Honey Oak",
      "Coverage per box": "27.5",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Naked Oak",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Naked-Oak-2-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/premium-engineered/naked-oak/",
    "specifications": {
      "Product": "Naked Oak",
      "SKU": "3333",
      "Collection": "Premium Engineered",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Raw Oak",
      "Sq feet per box": "27.5",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Raw Oak",
      "Coverage per box": "27.5",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Radiant",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Naked-Oak-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/premium-engineered/radiant/",
    "specifications": {
      "Product": "Radiant",
      "SKU": "2245",
      "Collection": "Premium Engineered",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Warm Beige Oak",
      "Sq feet per box": "27.5",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Warm Beige Oak",
      "Coverage per box": "27.5",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Country oak",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Naked-Oak-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/premium-engineered/country-oak/",
    "specifications": {
      "Product": "Country oak",
      "SKU": "9967",
      "Collection": "Premium Engineered",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Rustic Country Oak",
      "Sq feet per box": "27.5",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Rustic Country Oak",
      "Coverage per box": "27.5",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Aubrae",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Aubrae_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/heritage-hills/aubrae/",
    "specifications": {
      "Product": "Aubrae",
      "SKU": "5567",
      "Collection": "Heritage Hills",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Amber Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Amber Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Brenton",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Brenton_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/heritage-hills/brenton/",
    "specifications": {
      "Product": "Brenton",
      "SKU": "5567",
      "Collection": "Heritage Hills",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Taupe Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Taupe Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Covelle",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Covelle_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/heritage-hills/covelle/",
    "specifications": {
      "Product": "Covelle",
      "SKU": "5567",
      "Collection": "Heritage Hills",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Stone Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Stone Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Ellaston",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Ellaston_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/heritage-hills/ellaston/",
    "specifications": {
      "Product": "Ellaston",
      "SKU": "5567",
      "Collection": "Heritage Hills",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Rustic Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Rustic Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Radnor",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Radnor_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/heritage-hills/radnor/",
    "specifications": {
      "Product": "Radnor",
      "SKU": "5567",
      "Collection": "Heritage Hills",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Mocha Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Mocha Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Redmond",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Redmond_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/heritage-hills/redmond/",
    "specifications": {
      "Product": "Redmond",
      "SKU": "5567",
      "Collection": "Heritage Hills",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Coffee Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Coffee Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Sandale",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Sandale_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/heritage-hills/sandale/",
    "specifications": {
      "Product": "Sandale",
      "SKU": "5567",
      "Collection": "Heritage Hills",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Drift Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Drift Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Terrona",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Terrona_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/heritage-hills/terrona/",
    "specifications": {
      "Product": "Terrona",
      "SKU": "5567",
      "Collection": "Heritage Hills",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Golden Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Golden Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Alura",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Alura_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/solvara/alura/",
    "specifications": {
      "Product": "Alura",
      "SKU": "5567",
      "Collection": "Solvara",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Olive Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Olive Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Brealen",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Brealen_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/solvara/brealen/",
    "specifications": {
      "Product": "Brealen",
      "SKU": "5567",
      "Collection": "Solvara",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Earth Brown",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Earth Brown",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Lumiere",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Lumiere_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/solvara/lumiere/",
    "specifications": {
      "Product": "Lumiere",
      "SKU": "5567",
      "Collection": "Solvara",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Golden Ash",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Golden Ash",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Mirelle",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Mirelle_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/solvara/mirelle/",
    "specifications": {
      "Product": "Mirelle",
      "SKU": "5567",
      "Collection": "Solvara",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Warm Taupe",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Warm Taupe",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Solen",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Solen_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/solvara/solen/",
    "specifications": {
      "Product": "Solen",
      "SKU": "5567",
      "Collection": "Solvara",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Olive Grey",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Olive Grey",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Thalen",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/09/Thalen_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/solvara/thalen/",
    "specifications": {
      "Product": "Thalen",
      "SKU": "5567",
      "Collection": "Solvara",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Chestnut Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Chestnut Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Kensington",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/02/Kensington_1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/heritage-hills/kensington/",
    "specifications": {
      "Product": "Kensington",
      "SKU": "5567",
      "Collection": "Heritage Hills",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Honey Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Honey Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Warm Ember",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/02/Warm-Ember_1-1-300x300.webp",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/heritage-hills/warmember/",
    "specifications": {
      "Product": "Warm Ember",
      "SKU": "5567",
      "Collection": "Heritage Hills",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Dark Walnut Reserve",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Dark Walnut Reserve",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Weston",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/07/Weston-300x300.jpg",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/heritage-hills/weston/",
    "specifications": {
      "Product": "Weston",
      "SKU": "5567",
      "Collection": "Heritage Hills",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Antique Taupe Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Antique Taupe Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  },
  {
    "name": "Hadley",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2026/07/Hadley-300x300.jpg",
    "sourceUrl": "https://leeflooring.ca/products/engineered-hardwood/heritage-hills/hadley/",
    "specifications": {
      "Product": "Hadley",
      "SKU": "5567",
      "Collection": "Heritage Hills",
      "Dimensions": "6\"X1/2\"X3/4\"",
      "Color": "Sunwashed Oak",
      "Sq feet per box": "26.49",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "39",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2145 lbs",
      "Colour": "Sunwashed Oak",
      "Coverage per box": "26.49",
      "Installation": "Nail Down / Glue Down",
      "Radiant heat": "Suitable for use with hydronic systems",
      "Warranty": "35 year residential",
      "Boxes per skid": "39",
      "Weight per box": "55 lbs",
      "Weight per skid": "2145 lbs"
    },
    "description": "Timeless and versatile. Our Lee Engineered Hardwood collection boasts a rich, natural texture and a classic aesthetic, bringing warmth and character to any interior. Each plank is meticulously crafted to highlight the natural beauty of wood while ensuring durability and longevity. Coordinating trims and moldings are available to provide a flawless finish, seamlessly enhancing your hardwood flooring. To ensure availability, please place your accessory orders at least one week in advance and specify any unique preferences. Kindly note that all accessories are made to order and are non-refundable and non-exchangeable."
  }
].map(({ name, imageUrl, sourceUrl, specifications, description }) => ({
  ...supplierListingProduct('Lee Flooring', 'Engineered Hardwood', name, sourceUrl, specifications, imageUrl),
  slug: 'lee-flooring-' + slugPart(specifications.Collection) + '-' + slugPart(name),
  ...(description ? { description } : {})
}));

const leeSolidProducts = [
  {
    "name": "Solid Hickory Rome",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Solid-Hickory-Rome_2.webp",
    "sourceUrl": "https://leeflooring.ca/products/solid-hardwood/premium/solid-hickory-rome/",
    "specifications": {
      "Product": "Solid Hickory Rome",
      "SKU": "7789",
      "Collection": "Premium",
      "Dimensions": "4-1/4\" x 3/4\"",
      "Color": "Rustic Hickory",
      "Sq feet per box": "19.9",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "40",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2200 lbs",
      "Species": "Hickory"
    },
    "description": "Timeless Strength and Natural Beauty. Our Leery Solid Hardwood Flooring collection showcases the pure essence of wood, with rich textures and a classic appeal that brings warmth and sophistication to any space. Each plank is crafted from premium solid hardwood, ensuring unmatched durability and longevity while enhancing the natural character of your floors.\nCoordinating trims and moldings are available to create a seamless, polished finish, perfectly complementing your flooring. To ensure availability, please place accessory orders at least one week in advance and specify any special requirements. Kindly note that all accessories are custom-made and are non-refundable and non-exchangeable."
  },
  {
    "name": "Solid Hickory Natural",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Solid-Hickory-Natural-2.webp",
    "sourceUrl": "https://leeflooring.ca/products/solid-hardwood/premium/solid-hickory-natural/",
    "specifications": {
      "Product": "Solid Hickory Natural",
      "SKU": "7899",
      "Collection": "Premium",
      "Dimensions": "4-3/4\"X3/4\"",
      "Color": "Natural Hickory",
      "Sq feet per box": "19.9",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Installation options": "Nail Down / Glue Down",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "40",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2200 lbs",
      "Species": "Hickory"
    },
    "description": "Timeless Strength and Natural Beauty. Our Leery Solid Hardwood Flooring collection showcases the pure essence of wood, with rich textures and a classic appeal that brings warmth and sophistication to any space. Each plank is crafted from premium solid hardwood, ensuring unmatched durability and longevity while enhancing the natural character of your floors.\nCoordinating trims and moldings are available to create a seamless, polished finish, perfectly complementing your flooring. To ensure availability, please place accessory orders at least one week in advance and specify any special requirements. Kindly note that all accessories are custom-made and are non-refundable and non-exchangeable."
  },
  {
    "name": "Solid White Oak Milan",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Solid-oak-Milan-1.webp",
    "sourceUrl": "https://leeflooring.ca/products/solid-hardwood/premium/solid-white-oak-milan/",
    "specifications": {
      "Product": "Solid Milan",
      "SKU": "7709",
      "Collection": "Premium",
      "Dimensions": "4-3/4\" x 3/4\"",
      "Color": "Deep White Oak",
      "Sq feet per box": "22.1",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "40",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2200 lbs",
      "Species": "White Oak"
    },
    "description": "Timeless Strength and Natural Beauty. Our Leery Solid Hardwood Flooring collection showcases the pure essence of wood, with rich textures and a classic appeal that brings warmth and sophistication to any space. Each plank is crafted from premium solid hardwood, ensuring unmatched durability and longevity while enhancing the natural character of your floors.\nCoordinating trims and moldings are available to create a seamless, polished finish, perfectly complementing your flooring. To ensure availability, please place accessory orders at least one week in advance and specify any special requirements. Kindly note that all accessories are custom-made and are non-refundable and non-exchangeable."
  },
  {
    "name": "Solid White Oak Athens",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Solid-oak-Athens-1.webp",
    "sourceUrl": "https://leeflooring.ca/products/solid-hardwood/premium/solid-white-oak-athens/",
    "specifications": {
      "Product": "Solid Athens",
      "SKU": "8899",
      "Collection": "Premium",
      "Dimensions": "4-3/4\" x 3/4\"",
      "Color": "Deep White Oak",
      "Sq feet per box": "22.1",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "40",
      "Weight / Box": "55 lbs",
      "Weight / Skid": "2200 lbs",
      "Species": "White Oak"
    },
    "description": "Timeless Strength and Natural Beauty. Our Leery Solid Hardwood Flooring collection showcases the pure essence of wood, with rich textures and a classic appeal that brings warmth and sophistication to any space. Each plank is crafted from premium solid hardwood, ensuring unmatched durability and longevity while enhancing the natural character of your floors.\nCoordinating trims and moldings are available to create a seamless, polished finish, perfectly complementing your flooring. To ensure availability, please place accessory orders at least one week in advance and specify any special requirements. Kindly note that all accessories are custom-made and are non-refundable and non-exchangeable."
  },
  {
    "name": "Solid Acacia Natural",
    "imageUrl": "https://leeflooring.ca/wp-content/uploads/2025/03/Acacia_2.webp",
    "sourceUrl": "https://leeflooring.ca/products/solid-hardwood/premium/solid-acacia-natural/",
    "specifications": {
      "Product": "Solid Acacia Natural",
      "SKU": "2234",
      "Collection": "Premium",
      "Dimensions": "4-3/4\" x 3/4\"",
      "Color": "Dark Acacia",
      "Sq feet per box": "22.4",
      "Installation options": "Nail Down / Glue Down",
      "Radiant Heat": "Suitable for use with hydronic systems",
      "Limited Warranty": "35 year residential",
      "Box / Skid": "40",
      "Weight / Box": "60 lbs",
      "Weight / Skid": "2400 lbs",
      "Species": "Acacia"
    },
    "description": "Timeless Strength and Natural Beauty. Our Leery Solid Hardwood Flooring collection showcases the pure essence of wood, with rich textures and a classic appeal that brings warmth and sophistication to any space. Each plank is crafted from premium solid hardwood, ensuring unmatched durability and longevity while enhancing the natural character of your floors.\nCoordinating trims and moldings are available to create a seamless, polished finish, perfectly complementing your flooring. To ensure availability, please place accessory orders at least one week in advance and specify any special requirements. Kindly note that all accessories are custom-made and are non-refundable and non-exchangeable."
  }
].map(({ name, imageUrl, sourceUrl, specifications, description }) => ({ ...supplierListingProduct('Lee Flooring', 'Hardwood', name, sourceUrl, specifications, imageUrl), description }));

const northernestMapleProducts: Product[] = [
  {
    "name": "Fraser",
    "sourceUrl": "https://northernestflooring.ca/product/fraser/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Fraser-1.jpg",
    "description": "Fraser brings a rich, dark maple tone with natural character and a refined matte finish. Its timeless warmth adds depth and elegance to Toronto homes, making it a strong choice for interiors that feel both classic and contemporary.",
    "specifications": {
      "Species": "North American Maple",
      "Construction": "Solid hardwood (¾″ thick)",
      "Width & Length": "Traditional solid widths × RL (site-finish look)",
      "Profile": "Tongue & Groove, 4-sided micro-bevel",
      "Surface": "Wirebrushed / smooth matte (by colour)",
      "Finish": "Factory urethane with aluminum-oxide",
      "Grade": "Select & Better with natural character",
      "Coverage": "21.7 sq ft / box",
      "Install Locations": "On / Above grade over plywood/OSB",
      "Collection": "Maple",
      "Thickness": "¾″"
    }
  },
  {
    "name": "Subruce",
    "sourceUrl": "https://northernestflooring.ca/product/subruce/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Subruce-1.jpg",
    "description": "Contemporary taupe-brown with a subtle grey cast. Subruce tempers strong sunlight and complements black windows, cool stone, and matte-metal accents.",
    "specifications": {
      "Species": "North American Maple",
      "Construction": "Solid hardwood (¾″ thick)",
      "Width & Length": "Traditional solid widths × RL (site-finish look)",
      "Profile": "Tongue & Groove, 4-sided micro-bevel",
      "Surface": "Wirebrushed / smooth matte (by colour)",
      "Finish": "Factory urethane with aluminum-oxide",
      "Grade": "Select & Better with natural character",
      "Coverage": "21.7 sq ft / box",
      "Install Locations": "On / Above grade over plywood/OSB",
      "Collection": "Maple",
      "Thickness": "¾″"
    }
  },
  {
    "name": "Imperial",
    "sourceUrl": "https://northernestflooring.ca/product/imperial/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Imperial-1.jpg",
    "description": "Classic medium brown—timeless, tailored, and easy to pair. Imperial bridges light walls and darker cabinetry for a cohesive, high-end look throughout the home.",
    "specifications": {
      "Species": "North American Maple",
      "Construction": "Solid hardwood (¾″ thick)",
      "Width & Length": "Traditional solid widths × RL (site-finish look)",
      "Profile": "Tongue & Groove, 4-sided micro-bevel",
      "Surface": "Wirebrushed / smooth matte (by colour)",
      "Finish": "Factory urethane with aluminum-oxide",
      "Grade": "Select & Better with natural character",
      "Coverage": "21.7 sq ft / box",
      "Install Locations": "On / Above grade over plywood/OSB",
      "Collection": "Maple",
      "Thickness": "¾″"
    }
  },
  {
    "name": "Hemlock",
    "sourceUrl": "https://northernestflooring.ca/product/hemlock/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/preview-2.jpg",
    "description": "Light natural maple with a whisper of wheat. Hemlock brightens small spaces and keeps sightlines clean—Scandinavian calm with authentic hardwood warmth.",
    "specifications": {
      "Species": "North American Maple",
      "Construction": "Solid hardwood (¾″ thick)",
      "Width & Length": "Traditional solid widths × RL (site-finish look)",
      "Profile": "Tongue & Groove, 4-sided micro-bevel",
      "Surface": "Wirebrushed / smooth matte (by colour)",
      "Finish": "Factory urethane with aluminum-oxide",
      "Grade": "Select & Better with natural character",
      "Coverage": "21.7 sq ft / box",
      "Install Locations": "On / Above grade over plywood/OSB",
      "Collection": "Maple",
      "Thickness": "¾″"
    }
  },
  {
    "name": "Mackenzie",
    "sourceUrl": "https://northernestflooring.ca/product/mackenzie/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Makenzie-1.jpg",
    "description": "Warm mid-brown with toasted undertones. Mackenzie delivers heritage comfort without heaviness—perfect with shaker kitchens, stone fireplaces, and linen upholstery.",
    "specifications": {
      "Species": "North American Maple",
      "Construction": "Solid hardwood (¾″ thick)",
      "Width & Length": "Traditional solid widths × RL (site-finish look)",
      "Profile": "Tongue & Groove, 4-sided micro-bevel",
      "Surface": "Wirebrushed / smooth matte (by colour)",
      "Finish": "Factory urethane with aluminum-oxide",
      "Grade": "Select & Better with natural character",
      "Coverage": "21.7 sq ft / box",
      "Install Locations": "On / Above grade over plywood/OSB",
      "Collection": "Maple",
      "Thickness": "¾″"
    }
  },
  {
    "name": "Dark Mocha",
    "sourceUrl": "https://northernestflooring.ca/product/dark-moka/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/preview-3.jpg",
    "description": "A deep espresso brown that instantly elevates a room. Dark Mocha grounds airy palettes, flatters marble and brass, and hides daily scuffs thanks to its low-gloss finish.",
    "specifications": {
      "Species": "North American Maple",
      "Construction": "Solid hardwood (¾″ thick)",
      "Width & Length": "Traditional solid widths × RL (site-finish look)",
      "Profile": "Tongue & Groove, 4-sided micro-bevel",
      "Surface": "Wirebrushed / smooth matte (by colour)",
      "Finish": "Factory urethane with aluminum-oxide",
      "Grade": "Select & Better with natural character",
      "Coverage": "21.7 sq ft / box",
      "Install Locations": "On / Above grade over plywood/OSB",
      "Collection": "Maple",
      "Thickness": "¾″"
    }
  }
].map(({ name, sourceUrl, imageUrl, description, specifications }) => ({
  ...supplierListingProduct('Northernest', 'Hardwood', name, sourceUrl, specifications, imageUrl),
  slug: 'northernest-maple-' + slugPart(name),
  description
}));

const northernestLaminateCatalogue: Array<{ name: string; sourceUrl: string; imageUrl: string; description: string; specifications: Record<string, string> }> = [
  {
    "name": "Robusto",
    "sourceUrl": "https://northernestflooring.ca/product/robusto/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Robusto-3D-render.png",
    "description": "A bold, mid-brown statement plank with confident grain and substantial presence. Robusto anchors open-concept areas and balances high-contrast palettes. The tactile finish minimizes glare, while its richer color masks traffic patterns between entries and great rooms.",
    "specifications": {
      "Construction": "Laminate on HDF core",
      "Thickness": "12 mm",
      "Surface": "4-sided micro-bevel",
      "Edges": "Click-lock floating",
      "Collection": "Dominion",
      "AC rating": "AC4",
      "Installation": "Floating",
      "Finish": "Textured, low-gloss",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Urban Oak",
    "sourceUrl": "https://northernestflooring.ca/product/urban-oak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/urban-oak-3d-Render.png",
    "description": "Urban Oak is listed in Northernest's Mountain laminate collection. Confirm colour and finish with the supplier.",
    "specifications": {
      "Construction": "12 mm laminate plank, embossed-in-register texture, HDF core",
      "Dimensions": "Wide plank (~6½″) × long (~48″), 4-sided micro-bevel",
      "Surface": "Surface Wire-brush/EIR matte",
      "Wear rating": "AC4 (heavy residential / light commercial)",
      "Edge treatment": "Waxed, moisture-resistant joints",
      "Locking system": "Click-lock (angle/ drop)",
      "Underlayment": "Compatible with attached or separate pad",
      "Subfloors": "Concrete, plywood/OSB, existing resilient/hardwood",
      "Radiant heat": "Hydronic or electric, ≤ 29 °C (85 °F) surface",
      "Collection": "Mountain",
      "Thickness": "12 mm",
      "AC rating": "AC4",
      "Installation": "Floating",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Storm Oak",
    "sourceUrl": "https://northernestflooring.ca/product/storm-oak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/storm-oak-3d-Render.png",
    "description": "Moody charcoal-brown with weather-darkened edges that add drama without heaviness. Storm Oak anchors large, sunlit rooms and frames lighter furniture beautifully. The look is modern lodge: clean silhouettes, stone, and textured textiles underfoot.",
    "specifications": {
      "Construction": "12 mm laminate plank, embossed-in-register texture, HDF core",
      "Dimensions": "Wide plank (~6½″) × long (~48″), 4-sided micro-bevel",
      "Surface": "Surface Wire-brush/EIR matte",
      "Wear rating": "AC4 (heavy residential / light commercial)",
      "Edge treatment": "Waxed, moisture-resistant joints",
      "Locking system": "Click-lock (angle/ drop)",
      "Underlayment": "Compatible with attached or separate pad",
      "Subfloors": "Concrete, plywood/OSB, existing resilient/hardwood",
      "Radiant heat": "Hydronic or electric, ≤ 29 °C (85 °F) surface",
      "Collection": "Mountain",
      "Thickness": "12 mm",
      "AC rating": "AC4",
      "Installation": "Floating",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Silver Oak",
    "sourceUrl": "https://northernestflooring.ca/product/silver-oak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/silver-oak-3d-Render.png",
    "description": "Pearl-grey with a hint of taupe, Silver Oak strikes the rare balance of cool and inviting. It tempers bold paint colors and modernizes dark furniture. Expect that “designer neutral” effect—crisp lines, soft light, and easy styling across seasons.",
    "specifications": {
      "Construction": "12 mm laminate plank, embossed-in-register texture, HDF core",
      "Dimensions": "Wide plank (~6½″) × long (~48″), 4-sided micro-bevel",
      "Surface": "Surface Wire-brush/EIR matte",
      "Wear rating": "AC4 (heavy residential / light commercial)",
      "Edge treatment": "Waxed, moisture-resistant joints",
      "Locking system": "Click-lock (angle/ drop)",
      "Underlayment": "Compatible with attached or separate pad",
      "Subfloors": "Concrete, plywood/OSB, existing resilient/hardwood",
      "Radiant heat": "Hydronic or electric, ≤ 29 °C (85 °F) surface",
      "Collection": "Mountain",
      "Thickness": "12 mm",
      "AC rating": "AC4",
      "Installation": "Floating",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Prestige Oak",
    "sourceUrl": "https://northernestflooring.ca/product/prestige-oak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/Prestige-Oak-3d-Render.png",
    "description": "A tailored mid-brown—neither too red nor too grey—with refined grain movement. Prestige Oak delivers classic good looks for traditional or transitional interiors. Pair it",
    "specifications": {
      "Construction": "12 mm laminate plank, embossed-in-register texture, HDF core",
      "Dimensions": "Wide plank (~6½″) × long (~48″), 4-sided micro-bevel",
      "Surface": "Surface Wire-brush/EIR matte",
      "Wear rating": "AC4 (heavy residential / light commercial)",
      "Edge treatment": "Waxed, moisture-resistant joints",
      "Locking system": "Click-lock (angle/ drop)",
      "Underlayment": "Compatible with attached or separate pad",
      "Subfloors": "Concrete, plywood/OSB, existing resilient/hardwood",
      "Radiant heat": "Hydronic or electric, ≤ 29 °C (85 °F) surface",
      "Collection": "Mountain",
      "Thickness": "12 mm",
      "AC rating": "AC4",
      "Installation": "Floating",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Harbour Oak",
    "sourceUrl": "https://northernestflooring.ca/product/harbour-oak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/harbour-oak-3d-Render.png",
    "description": "Salt-washed beige with driftwood undertones and relaxed cathedrals. Harbour Oak sets a breezy, coastal mood in kitchens and family rooms. It softens dark cabinetry, complements woven textures, and feels right at home with linen, rattan, and brass.",
    "specifications": {
      "Construction": "12 mm laminate plank, embossed-in-register texture, HDF core",
      "Dimensions": "Wide plank (~6½″) × long (~48″), 4-sided micro-bevel",
      "Surface": "Surface Wire-brush/EIR matte",
      "Wear rating": "AC4 (heavy residential / light commercial)",
      "Edge treatment": "Waxed, moisture-resistant joints",
      "Locking system": "Click-lock (angle/ drop)",
      "Underlayment": "Compatible with attached or separate pad",
      "Subfloors": "Concrete, plywood/OSB, existing resilient/hardwood",
      "Radiant heat": "Hydronic or electric, ≤ 29 °C (85 °F) surface",
      "Collection": "Mountain",
      "Thickness": "12 mm",
      "AC rating": "AC4",
      "Installation": "Floating",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Eastern Oak",
    "sourceUrl": "https://northernestflooring.ca/product/eastern-oak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/eastern-oak-3d-Render.png",
    "description": "Warm honey-beige with refined grain movement evokes freshly finished oak. Eastern Oak is versatile enough for traditional trim or modern millwork, bringing welcoming tone to kitchens and family spaces while keeping surfaces forgiving to crumbs and paw prints.",
    "specifications": {
      "Construction": "Laminate on HDF core",
      "Thickness": "12 mm",
      "Surface": "4-sided micro-bevel",
      "Edges": "Click-lock floating",
      "Collection": "Dominion",
      "AC rating": "AC4",
      "Installation": "Floating",
      "Finish": "Textured, low-gloss",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "City Mood",
    "sourceUrl": "https://northernestflooring.ca/product/city-mood/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/city-mood-3d-Render.png",
    "description": "Cool greige with balanced taupe and subtle saw-cut texture—perfect for condos and contemporary spaces. City Mood lightens rooms without feeling stark, harmonizing effortlessly with concrete, black fixtures, and minimalist décor for that polished, urban-loft vibe.",
    "specifications": {
      "Construction": "Laminate on HDF core",
      "Thickness": "12 mm",
      "Surface": "4-sided micro-bevel",
      "Edges": "Click-lock floating",
      "Collection": "Dominion",
      "AC rating": "AC4",
      "Installation": "Floating",
      "Finish": "Textured, low-gloss",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Antique Dark",
    "sourceUrl": "https://northernestflooring.ca/product/antique-dark/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/antique-dark-3D-Render.png",
    "description": "A heritage-inspired brown with charcoal undertones, Antique Dark brings cozy, pub-style character to living rooms and dens. The wire-worn visual and beveled edges add depth, disguising everyday scuffs while giving modern furniture a handsome, storied backdrop.",
    "specifications": {
      "Construction": "Laminate on HDF core",
      "Thickness": "12 mm",
      "Surface": "4-sided micro-bevel",
      "Edges": "Click-lock floating",
      "Collection": "Dominion",
      "AC rating": "AC4",
      "Installation": "Floating",
      "Finish": "Textured, low-gloss",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Everest Oak",
    "sourceUrl": "https://northernestflooring.ca/product/everest-oak/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/everest-oak-3d-Render.png",
    "description": "Cool, high-altitude neutrals with quiet knots and a powder-dry finish. Everest Oak brightens rooms without skewing blue, pairing easily with concrete, black metals, and soft greys. Clean, contemporary, and calm—perfect for airy living rooms and minimalist bedrooms.",
    "specifications": {
      "Construction": "12 mm laminate plank, embossed-in-register texture, HDF core",
      "Dimensions": "Wide plank (~6½″) × long (~48″), 4-sided micro-bevel",
      "Surface": "Surface Wire-brush/EIR matte",
      "Wear rating": "AC4 (heavy residential / light commercial)",
      "Edge treatment": "Waxed, moisture-resistant joints",
      "Locking system": "Click-lock (angle/ drop)",
      "Underlayment": "Compatible with attached or separate pad",
      "Subfloors": "Concrete, plywood/OSB, existing resilient/hardwood",
      "Radiant heat": "Hydronic or electric, ≤ 29 °C (85 °F) surface",
      "Collection": "Mountain",
      "Thickness": "12 mm",
      "AC rating": "AC4",
      "Installation": "Floating",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "American Walnut",
    "sourceUrl": "https://northernestflooring.ca/product/american-walnut/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2025/12/American-Walnut-3d-Render.png",
    "description": "Rich, mocha tones and flowing grain patterning capture the warmth of classic walnut. The deep palette grounds open layouts, while the satin-matte texture softens sheen and footprints. Pair with cream walls and brass accents for a timeless, tailored look.",
    "specifications": {
      "Construction": "Laminate on HDF core",
      "Thickness": "12 mm",
      "Surface": "4-sided micro-bevel",
      "Edges": "Click-lock floating",
      "Collection": "Dominion",
      "AC rating": "AC4",
      "Installation": "Floating",
      "Finish": "Textured, low-gloss",
      "Supplier data review": "Pending"
    }
  }
];
const northernestLaminateProducts: Product[] = northernestLaminateCatalogue.map(({ name, sourceUrl, imageUrl, description, specifications }) => ({
  ...supplierListingProduct('Northernest', 'Laminate', name, sourceUrl, specifications, imageUrl),
  slug: 'northernest-laminate-' + slugPart(name),
  description
}));

const northernestVinylCatalogue: Array<{ name: string; sourceUrl: string; imageUrl: string; description: string; specifications: Record<string, string> }> = [
  {
    "name": "Mabella",
    "sourceUrl": "https://northernestflooring.ca/product/mabella/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/07/Mabella-45-Degree.png",
    "description": "Mabella showcases a warm, elegant oak aesthetic with graceful grain patterns and subtle natural character.…",
    "specifications": {
      "Collection": "300 Series",
      "Construction": "SPC",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Banff",
    "sourceUrl": "https://northernestflooring.ca/product/banff/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/07/Banff-Floor.png",
    "description": "Banff delivers lodge-chic comfort: mid-brown notes warmed by honey highlights and a touch of weathering.…",
    "specifications": {
      "Collection": "300 Series",
      "Construction": "SPC",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Whispering",
    "sourceUrl": "https://northernestflooring.ca/product/whispering/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Whispering-45-Degree.png",
    "description": "Whispering offers a soft, pale vinyl look with gentle wood grain and a light, calming…",
    "specifications": {
      "Collection": "Antique 9mm",
      "Construction": "SPC",
      "Structure": "Rigid Core Vinyl With 1.5 mm IXPE",
      "Thickness": "9 mm / 3/8\"",
      "Length": "1524 mm / 60\"",
      "Width": "183 mm / 7.25\"",
      "Underpad": "1.5 mm IXPE",
      "Impact Sound Reduction": "(IIC) 78",
      "Sound Transmission Class": "(STC) 73",
      "Carton Size": "17.84 sq.ft/box",
      "Carton Weight": "35.42 lbs"
    }
  },
  {
    "name": "Reflections",
    "sourceUrl": "https://northernestflooring.ca/product/reflections/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Reflection-45-Degree.png",
    "description": "Reflections brings a warm natural vinyl look with soft oak grain and subtle tonal variation.…",
    "specifications": {
      "Collection": "Antique 9mm",
      "Construction": "SPC",
      "Structure": "Rigid Core Vinyl With 1.5 mm IXPE",
      "Thickness": "9 mm / 3/8\"",
      "Length": "1524 mm / 60\"",
      "Width": "183 mm / 7.25\"",
      "Underpad": "1.5 mm IXPE",
      "Impact Sound Reduction": "(IIC) 78",
      "Sound Transmission Class": "(STC) 73",
      "Carton Size": "17.84 sq.ft/box",
      "Carton Weight": "35.42 lbs"
    }
  },
  {
    "name": "Laurel",
    "sourceUrl": "https://northernestflooring.ca/product/laurel/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Laurel-45-degree.png",
    "description": "Laurel offers a warm natural vinyl look with soft oak grain and a clean, inviting…",
    "specifications": {
      "Collection": "Antique 9mm",
      "Construction": "SPC",
      "Structure": "Rigid Core Vinyl With 1.5 mm IXPE",
      "Thickness": "9 mm / 3/8\"",
      "Length": "1524 mm / 60\"",
      "Width": "183 mm / 7.25\"",
      "Underpad": "1.5 mm IXPE",
      "Impact Sound Reduction": "(IIC) 78",
      "Sound Transmission Class": "(STC) 73",
      "Carton Size": "17.84 sq.ft/box",
      "Carton Weight": "35.42 lbs"
    }
  },
  {
    "name": "Horizon",
    "sourceUrl": "https://northernestflooring.ca/product/horizon/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Horizon-45-Degree.png",
    "description": "Horizon offers a soft beige vinyl look with gentle oak grain and a calm, natural…",
    "specifications": {
      "Collection": "Antique 9mm",
      "Construction": "SPC",
      "Structure": "Rigid Core Vinyl With 1.5 mm IXPE",
      "Thickness": "9 mm / 3/8\"",
      "Length": "1524 mm / 60\"",
      "Width": "183 mm / 7.25\"",
      "Underpad": "1.5 mm IXPE",
      "Impact Sound Reduction": "(IIC) 78",
      "Sound Transmission Class": "(STC) 73",
      "Carton Size": "17.84 sq.ft/box",
      "Carton Weight": "35.42 lbs"
    }
  },
  {
    "name": "Foggy",
    "sourceUrl": "https://northernestflooring.ca/product/foggy/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Foggy-45-Degree.png",
    "description": "Foggy offers a soft greige vinyl look with gentle oak grain and a muted, calming…",
    "specifications": {
      "Collection": "Antique 9mm",
      "Construction": "SPC",
      "Structure": "Rigid Core Vinyl With 1.5 mm IXPE",
      "Thickness": "9 mm / 3/8\"",
      "Length": "1524 mm / 60\"",
      "Width": "183 mm / 7.25\"",
      "Underpad": "1.5 mm IXPE",
      "Impact Sound Reduction": "(IIC) 78",
      "Sound Transmission Class": "(STC) 73",
      "Carton Size": "17.84 sq.ft/box",
      "Carton Weight": "35.42 lbs"
    }
  },
  {
    "name": "Bluff",
    "sourceUrl": "https://northernestflooring.ca/product/bluff/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Bluff-45-Degree.png",
    "description": "Bluff offers a soft grey-beige vinyl look with gentle oak grain and a light, natural…",
    "specifications": {
      "Collection": "Antique 9mm",
      "Construction": "SPC",
      "Structure": "Rigid Core Vinyl With 1.5 mm IXPE",
      "Thickness": "9 mm / 3/8\"",
      "Length": "1524 mm / 60\"",
      "Width": "183 mm / 7.25\"",
      "Underpad": "1.5 mm IXPE",
      "Impact Sound Reduction": "(IIC) 78",
      "Sound Transmission Class": "(STC) 73",
      "Carton Size": "17.84 sq.ft/box",
      "Carton Weight": "35.42 lbs"
    }
  },
  {
    "name": "Allure",
    "sourceUrl": "https://northernestflooring.ca/product/allure/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Allure-45-Degree.png",
    "description": "Allure brings a warm golden vinyl look with soft oak grain and a welcoming natural…",
    "specifications": {
      "Collection": "Antique 9mm",
      "Construction": "SPC",
      "Structure": "Rigid Core Vinyl With 1.5 mm IXPE",
      "Thickness": "9 mm / 3/8\"",
      "Length": "1524 mm / 60\"",
      "Width": "183 mm / 7.25\"",
      "Underpad": "1.5 mm IXPE",
      "Impact Sound Reduction": "(IIC) 78",
      "Sound Transmission Class": "(STC) 73",
      "Carton Size": "17.84 sq.ft/box",
      "Carton Weight": "35.42 lbs"
    }
  },
  {
    "name": "Bontt",
    "sourceUrl": "https://northernestflooring.ca/product/bontt/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/04/Bontt.jpg",
    "description": "Bontt offers a soft natural vinyl look with gentle oak grain and a muted beige…",
    "specifications": {
      "Collection": "300 Series",
      "Construction": "SPC",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Urban Safari",
    "sourceUrl": "https://northernestflooring.ca/product/urban-safari/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Uraban-Safari-45-Degree.png",
    "description": "Earthy and confident, Urban Safari layers camel, tobacco, and espresso grain. It grounds modern industrial…",
    "specifications": {
      "Collection": "300 Series",
      "Construction": "SPC",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Bianco",
    "sourceUrl": "https://northernestflooring.ca/product/bianco/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/BIANCO-45-Degree.png",
    "description": "Crisp yet warm, Bianco leans natural rather than stark. Cream-blonde boards with delicate grain create…",
    "specifications": {
      "Collection": "300 Series",
      "Construction": "SPC",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Mapple Fog",
    "sourceUrl": "https://northernestflooring.ca/product/maple-fog/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Maple-Fog-45-Degree.png",
    "description": "Maple Fog captures that just-sandblasted look—light maple tones softened with misty grey. It brightens interiors…",
    "specifications": {
      "Collection": "300 Series",
      "Construction": "SPC",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Dusty Diamond",
    "sourceUrl": "https://northernestflooring.ca/product/dusty-diamond/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Dusty-Diamond-45-Degree.png",
    "description": "A modern neutral with depth, Dusty Diamond mixes mushroom beige and gentle smoke. The grain…",
    "specifications": {
      "Collection": "300 Series",
      "Construction": "SPC",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Azure Sky",
    "sourceUrl": "https://northernestflooring.ca/product/azure-sky/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Azure-Sky-45-Degree.png",
    "description": "Despite its name, Azure Sky stays wonderfully versatile: pale natural oak kissed with a whisper…",
    "specifications": {
      "Collection": "300 Series",
      "Construction": "SPC",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Hoover",
    "sourceUrl": "https://northernestflooring.ca/product/hoover/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/05c30499-a419-4488-82e8-acaa0e787732.png",
    "description": "Hoover is a sophisticated mid-grey with soft, silvery grain. It tempers bright daylight and balances…",
    "specifications": {
      "Collection": "300 Series",
      "Construction": "SPC",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Athabasca",
    "sourceUrl": "https://northernestflooring.ca/product/athabasca/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/Athabasca-45-Degree.png",
    "description": "Inspired by alpine rivers, Athabasca blends neutral driftwood browns with faint grey undertones. The effect…",
    "specifications": {
      "Collection": "300 Series",
      "Construction": "SPC",
      "Supplier data review": "Pending"
    }
  },
  {
    "name": "Saffiano",
    "sourceUrl": "https://northernestflooring.ca/product/saffiano/",
    "imageUrl": "https://northernestflooring.ca/wp-content/uploads/2026/01/SAFFIANO-45-degree.png",
    "description": "Tailored and modern, Saffiano channels the look of brushed leather translated into oak—cool taupes with…",
    "specifications": {
      "Collection": "300 Series",
      "Construction": "SPC",
      "Supplier data review": "Pending"
    }
  }
];
const northernestVinylProducts: Product[] = northernestVinylCatalogue.map(({ name, sourceUrl, imageUrl, description, specifications }) => ({
  ...supplierListingProduct('Northernest', 'Vinyl', name, sourceUrl, specifications, imageUrl),
  slug: 'northernest-vinyl-' + slugPart(name),
  description
}));

const wickhamEuroProducts: Product[] = [
  {
    "name": "White Oak, Barewood",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-barewood-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Chene-blanc-euro-BAREWOOD-Web.jpg",
    "description": "Discover the European White Oak, Barewood color, offered in engineered wood. A stable and flawless flooring that suits any space.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Barewood",
      "Collection": "Euro Engineered",
      "Thickness": "3/4 in (19 mm)",
      "Width": "7 1/2 in (190.5 mm)",
      "Finishes": "Matte 10°, Satin 35°, Semi-gloss 55°"
    }
  },
  {
    "name": "White Oak, Beach",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-beach-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Chene-blanc-euro-BEACH-Web.jpg",
    "description": "Discover White Oak Beach color engineered hardwood flooring by Wickham. A stable, elegant and durable European white oak floor that suits any space.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Beach",
      "Collection": "Euro Engineered",
      "Thickness": "3/4 in (19 mm)",
      "Width": "7 1/2 in (190.5 mm)",
      "Finishes": "Matte 10°, Satin 35°, Semi-gloss 55°"
    }
  },
  {
    "name": "White Oak, Cappuccino",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-cappuccino-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Chene-blanc-euro-MAT-CAPPUCINO-Web.jpg",
    "description": "Discover the European White Oak, Cappuccino color, offered in engineered wood. A stable and flawless flooring that suits any space.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Cappuccino",
      "Collection": "Euro Engineered",
      "Thickness": "3/4 in (19 mm)",
      "Width": "7 1/2 in (190.5 mm)",
      "Finishes": "Matte 10°, Satin 35°, Semi-gloss 55°"
    }
  },
  {
    "name": "White Oak, Cedar",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-cedar-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Chene-blanc-euro-Cedar-Web.jpg",
    "description": "Discover the European White Oak, Cedar color, offered in engineered wood. A stable and flawless flooring that suits any space.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Cedar",
      "Collection": "Euro Engineered",
      "Thickness": "3/4 in (19 mm)",
      "Width": "7 1/2 in (190.5 mm)",
      "Finishes": "Matte 10°, Satin 35°, Semi-gloss 55°"
    }
  },
  {
    "name": "White Oak, Forest Hills",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-forest-hills/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Chene-blanc-euro-Forest-Hills-Web.jpg",
    "description": "Discover the European White Oak, Forest Hills color, offered in engineered wood. A stable and flawless flooring that suits any space.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Forest Hills",
      "Collection": "Euro Engineered",
      "Thickness": "3/4 in (19 mm)",
      "Width": "7 1/2 in (190.5 mm)",
      "Finishes": "Matte 10°, Satin 35°, Semi-gloss 55°"
    }
  },
  {
    "name": "White Oak, Haze",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-haze-color/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Chene-blanc-euro-HAZE-Web.jpg",
    "description": "Discover the European White Oak, Haze color, offered in engineered wood. A stable and flawless flooring that suits any space.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Haze",
      "Collection": "Euro Engineered",
      "Thickness": "3/4 in (19 mm)",
      "Width": "7 1/2 in (190.5 mm)",
      "Finishes": "Matte 10°, Satin 35°, Semi-gloss 55°"
    }
  },
  {
    "name": "White Oak, Naked",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-naked-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Chene-blanc-euro-Naked-Web.jpg",
    "description": "Discover the European White Oak, Naked color, offered in engineered wood. A stable and flawless flooring that suits any space.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Naked",
      "Collection": "Euro Engineered",
      "Thickness": "3/4 in (19 mm)",
      "Width": "7 1/2 in (190.5 mm)",
      "Finishes": "Matte 10°, Satin 35°, Semi-gloss 55°"
    }
  },
  {
    "name": "White Oak, Natural",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-natural-5/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Chene-blanc-euro-Natural-Web.jpg",
    "description": "Discover the European White Oak, Natural color, offered in engineered wood. A stable and flawless flooring that suits any space.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Natural",
      "Collection": "Euro Engineered",
      "Thickness": "3/4 in (19 mm)",
      "Width": "7 1/2 in (190.5 mm)",
      "Finishes": "Matte 10°, Satin 35°, Semi-gloss 55°"
    }
  },
  {
    "name": "White Oak, Playa",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-playa-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2026/03/Euro-Engineered-White-Oak-Playa-1.png",
    "description": "Discover the European White Oak Playa color, offered in engineered wood. A stable and flawless flooring that suits any space.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Playa",
      "Collection": "Euro Engineered",
      "Thickness": "3/4 in (19 mm)",
      "Width": "7 1/2 in (190.5 mm)",
      "Finishes": "Matte 10°, Satin 35°, Semi-gloss 55°"
    }
  },
  {
    "name": "White Oak, Rome",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-rome-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Chene-blanc-euro-ROME-Web.jpg",
    "description": "Discover the European White Oak, Rome color, offered in engineered wood. A stable and flawless flooring that suits any space.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Rome",
      "Collection": "Euro Engineered",
      "Thickness": "3/4 in (19 mm)",
      "Width": "7 1/2 in (190.5 mm)",
      "Finishes": "Matte 10°, Satin 35°, Semi-gloss 55°"
    }
  },
  {
    "name": "White Oak, Taupe",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-taupe-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Chene-blanc-euro-Taupe-Web.jpg",
    "description": "Discover the European White Oak, Taupe color, offered in engineered wood. A stable and flawless flooring that suits any space.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Taupe",
      "Collection": "Euro Engineered",
      "Thickness": "3/4 in (19 mm)",
      "Width": "7 1/2 in (190.5 mm)",
      "Finishes": "Matte 10°, Satin 35°, Semi-gloss 55°"
    }
  },
  {
    "name": "White Oak, Walnut",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-walnut-4/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Chene-blanc-euro-WALNUT-Web.jpg",
    "description": "Discover the European White Oak, Walnut color, offered in engineered wood. A stable and flawless flooring that suits any space.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Walnut",
      "Collection": "Euro Engineered",
      "Thickness": "3/4 in (19 mm)",
      "Width": "7 1/2 in (190.5 mm)",
      "Finishes": "Matte 10°, Satin 35°, Semi-gloss 55°"
    }
  }
].map(({name, sourceUrl, imageUrl, description, specifications}) => ({
  ...supplierListingProduct('Wickham', 'Engineered Hardwood', name, sourceUrl, specifications, imageUrl),
  slug: 'wickham-euro-engineered-' + slugPart(name),
  description
}));

const wickhamMountainProducts: Product[] = [
  {
    "name": "Birch, Artic",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-artic/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Mountain-home-Artic-Web.jpg",
    "description": "Discover the artisanal Artic Birch flooring, offered in solid hardwood. A durable surface that stands out for its authentic appearance.",
    "specifications": {
      "Species": "Birch",
      "Colour": "Artic",
      "Collection": "Mountain Home",
      "Construction": "Solid Hardwood",
      "Thickness": "3/4 in (19 mm)",
      "Width": "5 in (127 mm)",
      "Finish": "Matte 10°"
    }
  },
  {
    "name": "Red Oak, Jay Peak",
    "sourceUrl": "https://wickhamhardwood.com/product/red-oak-jay-peak/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Moutain-Home-Jay-peak-Web.jpg",
    "description": "Discover the artisanal Jay Peak Red Oak flooring, offered in solid hardwood. A durable surface that stands out for its authentic appearance.",
    "specifications": {
      "Species": "Red Oak",
      "Colour": "Jay Peak",
      "Collection": "Mountain Home",
      "Construction": "Solid Hardwood",
      "Thickness": "3/4 in (19 mm)",
      "Width": "5 in (127 mm)",
      "Finish": "Matte 10°"
    }
  },
  {
    "name": "White Oak, Ember",
    "sourceUrl": "https://wickhamhardwood.com/product/white-oak-ember/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Mount-7-1-2-ember-Web.jpg",
    "description": "Discover the artisanal Ember White Oak flooring, offered in solid hardwood. A durable surface that stands out for its authentic appearance.",
    "specifications": {
      "Species": "White Oak",
      "Colour": "Ember",
      "Collection": "Mountain Home",
      "Construction": "Solid Hardwood",
      "Thickness": "3/4 in (19 mm)",
      "Width": "5 in (127 mm)",
      "Finish": "Matte 10°"
    }
  },
  {
    "name": "Birch, Retro",
    "sourceUrl": "https://wickhamhardwood.com/product/birch-retro/",
    "imageUrl": "https://wickhamhardwood.com/wp-content/uploads/2025/06/Mountain-home-RETRO-2-Web.jpg",
    "description": "Discover the artisanal Retro Birch flooring, offered in solid hardwood. A durable surface that stands out for its authentic appearance.",
    "specifications": {
      "Species": "Birch",
      "Colour": "Retro",
      "Collection": "Mountain Home",
      "Construction": "Solid Hardwood",
      "Thickness": "3/4 in (19 mm)",
      "Width": "5 in (127 mm)",
      "Finish": "Matte 10°"
    }
  }
].map(({name, sourceUrl, imageUrl, description, specifications}) => ({
  ...supplierListingProduct('Wickham', 'Hardwood', name, sourceUrl, specifications, imageUrl),
  slug: 'wickham-mountain-home-' + slugPart(name),
  description
}));

const simbaLvtProducts: Product[] = [
  {
    "name": "LVT 1550-7",
    "sourceUrl": "https://simbaflooringcorp.com/product/lvt-1550-7/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_15.jpg",
    "description": "For a sleek, modern, and versatile flooring option, our Luxury Vinyl Tile (LVT) Collection combines contemporary aesthetics with durable construction for everyday interiors. Designed to complement a wide variety of décor styles, the collection offers an attractive flooring solution for spaces ranging from clean and minimalist to warm and traditional. Each plank features a durable 20 mil (0.5 mm) wear layer, providing a protective surface designed to help maintain the flooring’s appearance over time. With plank dimensions of 1524 × 228 mm, the generous format creates a clean, streamlined look that works beautifully across both smaller rooms and larger open spaces. Available in a selection of contemporary designs and finishes, the LVT Collection makes it easy to achieve the look and atmosphere that best suits your space. Its combination of durability, versatility, and modern design makes it an excellent choice for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Luxury Vinyl Tile",
      "SKU": "47894",
      "Product code": "1550-7",
      "Plank Dimensions": "1524 × 228 mm",
      "Total Thickness": "3 mm",
      "Wear Layer": "20 mil (0.5 mm)",
      "Product Type": "Luxury Vinyl Tile (LVT)",
      "Design": "Contemporary, versatile plank format"
    }
  },
  {
    "name": "LVT 20105",
    "sourceUrl": "https://simbaflooringcorp.com/product/lvt-20105/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_16.jpg",
    "description": "For a sleek, modern, and versatile flooring option, our Luxury Vinyl Tile (LVT) Collection combines contemporary aesthetics with durable construction for everyday interiors. Designed to complement a wide variety of décor styles, the collection offers an attractive flooring solution for spaces ranging from clean and minimalist to warm and traditional. Each plank features a durable 20 mil (0.5 mm) wear layer, providing a protective surface designed to help maintain the flooring’s appearance over time. With plank dimensions of 1524 × 228 mm, the generous format creates a clean, streamlined look that works beautifully across both smaller rooms and larger open spaces. Available in a selection of contemporary designs and finishes, the LVT Collection makes it easy to achieve the look and atmosphere that best suits your space. Its combination of durability, versatility, and modern design makes it an excellent choice for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Luxury Vinyl Tile",
      "SKU": "47895",
      "Product code": "20105",
      "Plank Dimensions": "1524 × 228 mm",
      "Total Thickness": "3 mm",
      "Wear Layer": "20 mil (0.5 mm)",
      "Product Type": "Luxury Vinyl Tile (LVT)",
      "Design": "Contemporary, versatile plank format"
    }
  },
  {
    "name": "LVT 32301",
    "sourceUrl": "https://simbaflooringcorp.com/product/lvt-32301/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_09.jpg",
    "description": "For a sleek, modern, and versatile flooring option, our Luxury Vinyl Tile (LVT) Collection combines contemporary aesthetics with durable construction for everyday interiors. Designed to complement a wide variety of décor styles, the collection offers an attractive flooring solution for spaces ranging from clean and minimalist to warm and traditional. Each plank features a durable 20 mil (0.5 mm) wear layer, providing a protective surface designed to help maintain the flooring’s appearance over time. With plank dimensions of 1524 × 228 mm, the generous format creates a clean, streamlined look that works beautifully across both smaller rooms and larger open spaces. Available in a selection of contemporary designs and finishes, the LVT Collection makes it easy to achieve the look and atmosphere that best suits your space. Its combination of durability, versatility, and modern design makes it an excellent choice for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Luxury Vinyl Tile",
      "SKU": "47880",
      "Product code": "32301",
      "Plank Dimensions": "1524 × 228 mm",
      "Total Thickness": "3 mm",
      "Wear Layer": "20 mil (0.5 mm)",
      "Product Type": "Luxury Vinyl Tile (LVT)",
      "Design": "Contemporary, versatile plank format"
    }
  },
  {
    "name": "LVT 83741",
    "sourceUrl": "https://simbaflooringcorp.com/product/lvt-83741/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_11.jpeg",
    "description": "For a sleek, modern, and versatile flooring option, our Luxury Vinyl Tile (LVT) Collection combines contemporary aesthetics with durable construction for everyday interiors. Designed to complement a wide variety of décor styles, the collection offers an attractive flooring solution for spaces ranging from clean and minimalist to warm and traditional. Each plank features a durable 20 mil (0.5 mm) wear layer, providing a protective surface designed to help maintain the flooring’s appearance over time. With plank dimensions of 1524 × 228 mm, the generous format creates a clean, streamlined look that works beautifully across both smaller rooms and larger open spaces. Available in a selection of contemporary designs and finishes, the LVT Collection makes it easy to achieve the look and atmosphere that best suits your space. Its combination of durability, versatility, and modern design makes it an excellent choice for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Luxury Vinyl Tile",
      "SKU": "47890",
      "Product code": "83741",
      "Plank Dimensions": "1524 × 228 mm",
      "Total Thickness": "3 mm",
      "Wear Layer": "20 mil (0.5 mm)",
      "Product Type": "Luxury Vinyl Tile (LVT)",
      "Design": "Contemporary, versatile plank format"
    }
  },
  {
    "name": "LVT 88280-4",
    "sourceUrl": "https://simbaflooringcorp.com/product/lvt-88280-4/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_10.jpg",
    "description": "For a sleek, modern, and versatile flooring option, our Luxury Vinyl Tile (LVT) Collection combines contemporary aesthetics with durable construction for everyday interiors. Designed to complement a wide variety of décor styles, the collection offers an attractive flooring solution for spaces ranging from clean and minimalist to warm and traditional. Each plank features a durable 20 mil (0.5 mm) wear layer, providing a protective surface designed to help maintain the flooring’s appearance over time. With plank dimensions of 1524 × 228 mm, the generous format creates a clean, streamlined look that works beautifully across both smaller rooms and larger open spaces. Available in a selection of contemporary designs and finishes, the LVT Collection makes it easy to achieve the look and atmosphere that best suits your space. Its combination of durability, versatility, and modern design makes it an excellent choice for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Luxury Vinyl Tile",
      "SKU": "47889",
      "Product code": "88280-4",
      "Plank Dimensions": "1524 × 228 mm",
      "Total Thickness": "3 mm",
      "Wear Layer": "20 mil (0.5 mm)",
      "Product Type": "Luxury Vinyl Tile (LVT)",
      "Design": "Contemporary, versatile plank format"
    }
  },
  {
    "name": "LVT 88322-1",
    "sourceUrl": "https://simbaflooringcorp.com/product/lvt-88322-1/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_14.jpg",
    "description": "For a sleek, modern, and versatile flooring option, our Luxury Vinyl Tile (LVT) Collection combines contemporary aesthetics with durable construction for everyday interiors. Designed to complement a wide variety of décor styles, the collection offers an attractive flooring solution for spaces ranging from clean and minimalist to warm and traditional. Each plank features a durable 20 mil (0.5 mm) wear layer, providing a protective surface designed to help maintain the flooring’s appearance over time. With plank dimensions of 1524 × 228 mm, the generous format creates a clean, streamlined look that works beautifully across both smaller rooms and larger open spaces. Available in a selection of contemporary designs and finishes, the LVT Collection makes it easy to achieve the look and atmosphere that best suits your space. Its combination of durability, versatility, and modern design makes it an excellent choice for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Luxury Vinyl Tile",
      "SKU": "47893",
      "Product code": "88322-1",
      "Plank Dimensions": "1524 × 228 mm",
      "Total Thickness": "3 mm",
      "Wear Layer": "20 mil (0.5 mm)",
      "Product Type": "Luxury Vinyl Tile (LVT)",
      "Design": "Contemporary, versatile plank format"
    }
  },
  {
    "name": "LVT 88347-6",
    "sourceUrl": "https://simbaflooringcorp.com/product/lvt-88347-6/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_13.jpg",
    "description": "For a sleek, modern, and versatile flooring option, our Luxury Vinyl Tile (LVT) Collection combines contemporary aesthetics with durable construction for everyday interiors. Designed to complement a wide variety of décor styles, the collection offers an attractive flooring solution for spaces ranging from clean and minimalist to warm and traditional. Each plank features a durable 20 mil (0.5 mm) wear layer, providing a protective surface designed to help maintain the flooring’s appearance over time. With plank dimensions of 1524 × 228 mm, the generous format creates a clean, streamlined look that works beautifully across both smaller rooms and larger open spaces. Available in a selection of contemporary designs and finishes, the LVT Collection makes it easy to achieve the look and atmosphere that best suits your space. Its combination of durability, versatility, and modern design makes it an excellent choice for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Luxury Vinyl Tile",
      "SKU": "47892",
      "Product code": "88347-6",
      "Plank Dimensions": "1524 × 228 mm",
      "Total Thickness": "3 mm",
      "Wear Layer": "20 mil (0.5 mm)",
      "Product Type": "Luxury Vinyl Tile (LVT)",
      "Design": "Contemporary, versatile plank format"
    }
  },
  {
    "name": "LVT 88421-4",
    "sourceUrl": "https://simbaflooringcorp.com/product/lvt-88421-4/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_12.jpg",
    "description": "For a sleek, modern, and versatile flooring option, our Luxury Vinyl Tile (LVT) Collection combines contemporary aesthetics with durable construction for everyday interiors. Designed to complement a wide variety of décor styles, the collection offers an attractive flooring solution for spaces ranging from clean and minimalist to warm and traditional. Each plank features a durable 20 mil (0.5 mm) wear layer, providing a protective surface designed to help maintain the flooring’s appearance over time. With plank dimensions of 1524 × 228 mm, the generous format creates a clean, streamlined look that works beautifully across both smaller rooms and larger open spaces. Available in a selection of contemporary designs and finishes, the LVT Collection makes it easy to achieve the look and atmosphere that best suits your space. Its combination of durability, versatility, and modern design makes it an excellent choice for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Luxury Vinyl Tile",
      "SKU": "47891",
      "Product code": "88421-4",
      "Plank Dimensions": "1524 × 228 mm",
      "Total Thickness": "3 mm",
      "Wear Layer": "20 mil (0.5 mm)",
      "Product Type": "Luxury Vinyl Tile (LVT)",
      "Design": "Contemporary, versatile plank format"
    }
  }
].map(({name, sourceUrl, imageUrl, description, specifications}) => ({
  ...supplierListingProduct('Simba', 'Vinyl', name, sourceUrl, specifications, imageUrl),
  description
}));

const simbaEngineeredCatalogue: Array<{name: string; sourceUrl: string; imageUrl: string; specifications: Record<string,string>}> = [
  {
    "name": "Acacia Natural",
    "sourceUrl": "https://simbaflooringcorp.com/product/acacia-natural/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/COMING-SOON.jpg",
    "specifications": {
      "Collection": "Acacia",
      "SKU": "1982",
      "Wood": "Acacia",
      "Colour": "Natural",
      "Construction": "Engineered Hardwood",
      "Length": "1210MM",
      "Width": "127MM",
      "Thickness": "12/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Handscraped",
      "Supplier data review": "Verify veneer interpretation",
      "Image status": "Supplier coming soon placeholder"
    }
  },
  {
    "name": "Birch Natural",
    "sourceUrl": "https://simbaflooringcorp.com/product/birch-natural/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/Birch-Natural.jpg",
    "specifications": {
      "Collection": "Birch",
      "SKU": "47615",
      "Wood": "Birch",
      "Colour": "Natural",
      "Construction": "Engineered Hardwood",
      "Length": "1210MM",
      "Width": "165MM",
      "Thickness": "15/2.0MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    }
  },
  {
    "name": "Hickory American",
    "sourceUrl": "https://simbaflooringcorp.com/product/american/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2017/10/Hickory-American-scaled.jpg",
    "specifications": {
      "Collection": "Hickory",
      "SKU": "1986",
      "Wood": "Hickory",
      "Colour": "American",
      "Construction": "Engineered Hardwood",
      "Length": "1210MM",
      "Width": "165MM",
      "Thickness": "15/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Handscraped",
      "Supplier data review": "Verify veneer interpretation"
    }
  },
  {
    "name": "Hickory Natural",
    "sourceUrl": "https://simbaflooringcorp.com/product/hickory-natural/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/Hickory-Natural.jpg",
    "specifications": {
      "Collection": "Hickory",
      "SKU": "47616",
      "Wood": "Hickory",
      "Colour": "Natural",
      "Construction": "Engineered Hardwood",
      "Length": "1210MM",
      "Width": "165MM",
      "Thickness": "15/2.0MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    }
  }
];
const simbaEngineeredProducts = simbaEngineeredCatalogue.map(({name,sourceUrl,imageUrl,specifications}) => ({
  ...supplierListingProduct('Simba', 'Engineered Hardwood', name, sourceUrl, specifications, imageUrl),
  slug: 'simba-engineered-' + slugPart(name)
}));

const simbaOakCatalogue: Array<{name:string;sourceUrl:string;imageUrl:string;specifications:Record<string,string>;description:string}> = [
  {
    "name": "Autumn Valley",
    "sourceUrl": "https://simbaflooringcorp.com/product/autumn-valley-2/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/Autumn-Valley.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "47604",
      "Wood": "Oak",
      "Colour": "Autumn Valley",
      "Construction": "Engineered Hardwood",
      "Length": "1900MM",
      "Width": "190MM",
      "Thickness": "12/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Beige",
    "sourceUrl": "https://simbaflooringcorp.com/product/beige/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/Beige-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "47597",
      "Wood": "White Oak",
      "Colour": "Beige",
      "Construction": "Engineered Hardwood",
      "Length": "1210MM",
      "Width": "165MM",
      "Thickness": "18/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Chevron Chestnut",
    "sourceUrl": "https://simbaflooringcorp.com/product/chevron-chestnut-2/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/Chevron-Chestnut.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "47598",
      "Wood": "White Oak",
      "Colour": "Chevron Chestnut",
      "Construction": "Engineered Hardwood",
      "Length": "600MM",
      "Width": "127MM",
      "Thickness": "12/2.0MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "French Beige",
    "sourceUrl": "https://simbaflooringcorp.com/product/french-beigh/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2017/10/French-Beige-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "2354",
      "Wood": "Oak",
      "Colour": "French Beige",
      "Construction": "Engineered Hardwood",
      "Length": "1210MM",
      "Width": "165MM",
      "Thickness": "15/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Greyish",
    "sourceUrl": "https://simbaflooringcorp.com/product/greyish-2/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/Greyish-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "47599",
      "Wood": "Oak",
      "Colour": "Greyish",
      "Construction": "Engineered Hardwood",
      "Length": "1210MM",
      "Width": "165MM",
      "Thickness": "15/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Honey",
    "sourceUrl": "https://simbaflooringcorp.com/product/honey/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2017/10/honey-2-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "1766",
      "Wood": "Oak",
      "Colour": "Honey",
      "Construction": "Engineered Hardwood",
      "Length": "1900MM",
      "Width": "190MM",
      "Thickness": "15/3.0MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Lion",
    "sourceUrl": "https://simbaflooringcorp.com/product/lion/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2017/10/Lion-1-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "1890",
      "Wood": "Oak",
      "Colour": "Lion",
      "Construction": "Engineered Hardwood",
      "Length": "1900MM",
      "Width": "190MM",
      "Thickness": "15/3.0MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Lisboa",
    "sourceUrl": "https://simbaflooringcorp.com/product/lisboa/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2017/10/Lisboa-2-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "1911",
      "Wood": "Oak",
      "Colour": "Lisboa",
      "Construction": "Engineered Hardwood",
      "Length": "1900MM",
      "Width": "190MM",
      "Thickness": "15/4.0MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Liverpool",
    "sourceUrl": "https://simbaflooringcorp.com/product/liverpool-2/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/Liverpool-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "47600",
      "Wood": "Oak",
      "Colour": "Liverpool",
      "Construction": "Engineered Hardwood",
      "Length": "1900MM",
      "Width": "190MM",
      "Thickness": "15/3.0MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Marseille",
    "sourceUrl": "https://simbaflooringcorp.com/product/oak-pearl-river-2/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/Marseille-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "47601",
      "Wood": "Oak",
      "Colour": "Marseille",
      "Construction": "Engineered Hardwood",
      "Length": "1900MM",
      "Width": "190MM",
      "Thickness": "12/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Nantes",
    "sourceUrl": "https://simbaflooringcorp.com/product/nantes-2/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/Nantes-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "47603",
      "Wood": "Oak",
      "Colour": "Nantes",
      "Construction": "Engineered Hardwood",
      "Length": "1900MM",
      "Width": "190MM",
      "Thickness": "15/3.0MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Oak Natural",
    "sourceUrl": "https://simbaflooringcorp.com/product/oak-natural/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2017/10/Oak-Natural-2-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "1913",
      "Wood": "Oak",
      "Colour": "Oak Natural",
      "Construction": "Engineered Hardwood",
      "Length": "1900MM",
      "Width": "190MM",
      "Thickness": "15/3.0MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Oak Natural +",
    "sourceUrl": "https://simbaflooringcorp.com/product/oak-natural-3/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2017/10/Oak-Natural-1-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "1916",
      "Wood": "Oak",
      "Colour": "Oak Natural +",
      "Construction": "Engineered Hardwood",
      "Length": "1900MM",
      "Width": "190MM",
      "Thickness": "12/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Pearl River",
    "sourceUrl": "https://simbaflooringcorp.com/product/oak-pearl-river/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2019/03/Pearl-River-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "2679",
      "Wood": "Oak",
      "Colour": "Pearl River",
      "Construction": "Engineered Hardwood",
      "Length": "1210MM",
      "Width": "165MM",
      "Thickness": "15/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Plymouth",
    "sourceUrl": "https://simbaflooringcorp.com/product/plymouth/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2018/01/Plymouth-1-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "2403",
      "Wood": "Oak",
      "Colour": "Plymouth",
      "Construction": "Engineered Hardwood",
      "Length": "1900MM",
      "Width": "190MM",
      "Thickness": "15/3.0MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Sicily",
    "sourceUrl": "https://simbaflooringcorp.com/product/sicily/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2017/10/Oak-Sicily-1-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "1754",
      "Wood": "White Oak",
      "Colour": "Sicily",
      "Construction": "Engineered Hardwood",
      "Length": "1210MM",
      "Width": "165MM",
      "Thickness": "15/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Silver Powder",
    "sourceUrl": "https://simbaflooringcorp.com/product/silver-powder/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2017/10/Silver-powder-1-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "1758",
      "Wood": "Oak",
      "Colour": "Silver Powder",
      "Construction": "Engineered Hardwood",
      "Length": "1210MM",
      "Width": "165MM",
      "Thickness": "15/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Umber",
    "sourceUrl": "https://simbaflooringcorp.com/product/umber/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/Umber-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "47602",
      "Wood": "Oak",
      "Colour": "Umber",
      "Construction": "Engineered Hardwood",
      "Length": "1210MM",
      "Width": "127MM",
      "Thickness": "12/2.0MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Valence",
    "sourceUrl": "https://simbaflooringcorp.com/product/valence-2/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/Valence-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "47611",
      "Wood": "Oak",
      "Colour": "Valence",
      "Construction": "Engineered Hardwood",
      "Length": "1900MM",
      "Width": "190MM",
      "Thickness": "12/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  },
  {
    "name": "Vienna",
    "sourceUrl": "https://simbaflooringcorp.com/product/vienna/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/12/Vienna-scaled.jpg",
    "specifications": {
      "Collection": "Oak",
      "SKU": "47612",
      "Wood": "Oak",
      "Colour": "Vienna",
      "Construction": "Engineered Hardwood",
      "Length": "1210MM",
      "Width": "165MM",
      "Thickness": "15/1.2MM",
      "Finish": "UV Lacquer",
      "Surface": "Wire Brushed",
      "Supplier data review": "Verify veneer interpretation"
    },
    "description": "Engineered hardwood flooring brings warmth and elegance to your home while enhancing its value. Explore our wide selection of finishes, wood species, and plank widths to find the perfect match for your space. Falling in love with this look? Shop at a retailer near you today!"
  }
];
const simbaOakProducts = simbaOakCatalogue.map(({name,sourceUrl,imageUrl,specifications,description}) => ({
  ...supplierListingProduct('Simba','Engineered Hardwood',name,sourceUrl,specifications,imageUrl),
  slug: 'simba-oak-' + specifications.SKU,
  description
}));

const simbaYellowstoneCatalogue: Array<{name:string;sourceUrl:string;imageUrl:string;specifications:Record<string,string>;description:string}> = [
  {
    "name": "68022",
    "sourceUrl": "https://simbaflooringcorp.com/product/68022/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_06.jpg",
    "description": "The Yellowstone SPC Collection combines modern design with exceptional durability and everyday performance. Featuring an 8mm total thickness, each plank is constructed with a 6mm rigid core and 2mm attached underlay, providing a solid and comfortable foundation. Designed for demanding everyday environments, the collection is 100% waterproof, making it a practical flooring choice for areas where moisture and spills are a concern. A durable 20 mil (0.5 mm) wear layer provides added protection for long-lasting performance while helping the flooring maintain its appearance over time. The Yellowstone Collection also delivers impressive acoustic performance, with sound ratings of IIC 78 and STC 76, helping reduce both impact and airborne sound transmission. This combination of waterproof construction, durability, acoustic performance, and contemporary styling makes Yellowstone SPC a versatile flooring solution for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Yellowstone",
      "SKU": "47875",
      "Product code": "68022",
      "Construction": "8mm total thickness — 6mm rigid core + 2mm attached underlay",
      "Length × width": "1524 × 228 mm",
      "Wear layer": "20 mil (0.5 mm)",
      "Performance": "100% waterproof",
      "Sound rating": "IIC = 78 / STC = 76",
      "Supplier data review": "Thickness conflict: dimensions 3mm, construction 8mm; Supplier laminate tag conflicts with SPC product description"
    }
  },
  {
    "name": "68347-7",
    "sourceUrl": "https://simbaflooringcorp.com/product/68347-7/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_03.jpg",
    "description": "The Yellowstone SPC Collection combines modern design with exceptional durability and everyday performance. Featuring an 8mm total thickness, each plank is constructed with a 6mm rigid core and 2mm attached underlay, providing a solid and comfortable foundation. Designed for demanding everyday environments, the collection is 100% waterproof, making it a practical flooring choice for areas where moisture and spills are a concern. A durable 20 mil (0.5 mm) wear layer provides added protection for long-lasting performance while helping the flooring maintain its appearance over time. The Yellowstone Collection also delivers impressive acoustic performance, with sound ratings of IIC 78 and STC 76, helping reduce both impact and airborne sound transmission. This combination of waterproof construction, durability, acoustic performance, and contemporary styling makes Yellowstone SPC a versatile flooring solution for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Yellowstone",
      "SKU": "47872",
      "Product code": "68347-7",
      "Construction": "8mm total thickness — 6mm rigid core + 2mm attached underlay",
      "Length × width": "1524 × 228 mm",
      "Wear layer": "20 mil (0.5 mm)",
      "Performance": "100% waterproof",
      "Sound rating": "IIC = 78 / STC = 76",
      "Supplier data review": "Thickness conflict: dimensions 3mm, construction 8mm; Supplier laminate tag conflicts with SPC product description"
    }
  },
  {
    "name": "68363",
    "sourceUrl": "https://simbaflooringcorp.com/product/68363/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_02.jpg",
    "description": "The Yellowstone SPC Collection combines modern design with exceptional durability and everyday performance. Featuring an 8mm total thickness, each plank is constructed with a 6mm rigid core and 2mm attached underlay, providing a solid and comfortable foundation. Designed for demanding everyday environments, the collection is 100% waterproof, making it a practical flooring choice for areas where moisture and spills are a concern. A durable 20 mil (0.5 mm) wear layer provides added protection for long-lasting performance while helping the flooring maintain its appearance over time. The Yellowstone Collection also delivers impressive acoustic performance, with sound ratings of IIC 78 and STC 76, helping reduce both impact and airborne sound transmission. This combination of waterproof construction, durability, acoustic performance, and contemporary styling makes Yellowstone SPC a versatile flooring solution for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Yellowstone",
      "SKU": "47866",
      "Product code": "68363",
      "Construction": "8mm total thickness — 6mm rigid core + 2mm attached underlay",
      "Length × width": "1524 × 228 mm",
      "Wear layer": "20 mil (0.5 mm)",
      "Performance": "100% waterproof",
      "Sound rating": "IIC = 78 / STC = 76",
      "Supplier data review": "Thickness conflict: dimensions 3mm, construction 8mm; Supplier laminate tag conflicts with SPC product description"
    }
  },
  {
    "name": "68493",
    "sourceUrl": "https://simbaflooringcorp.com/product/68493/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_01.jpg",
    "description": "The Yellowstone SPC Collection combines modern design with exceptional durability and everyday performance. Featuring an 8mm total thickness, each plank is constructed with a 6mm rigid core and 2mm attached underlay, providing a solid and comfortable foundation. Designed for demanding everyday environments, the collection is 100% waterproof, making it a practical flooring choice for areas where moisture and spills are a concern. A durable 20 mil (0.5 mm) wear layer provides added protection for long-lasting performance while helping the flooring maintain its appearance over time. The Yellowstone Collection also delivers impressive acoustic performance, with sound ratings of IIC 78 and STC 76, helping reduce both impact and airborne sound transmission. This combination of waterproof construction, durability, acoustic performance, and contemporary styling makes Yellowstone SPC a versatile flooring solution for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Yellowstone",
      "SKU": "47863",
      "Product code": "68493",
      "Construction": "8mm total thickness — 6mm rigid core + 2mm attached underlay",
      "Length × width": "1524 × 228 mm",
      "Wear layer": "20 mil (0.5 mm)",
      "Performance": "100% waterproof",
      "Sound rating": "IIC = 78 / STC = 76",
      "Supplier data review": "Thickness conflict: dimensions 3mm, construction 8mm; Supplier laminate tag conflicts with SPC product description"
    }
  },
  {
    "name": "68628",
    "sourceUrl": "https://simbaflooringcorp.com/product/68628/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_04.jpg",
    "description": "The Yellowstone SPC Collection combines modern design with exceptional durability and everyday performance. Featuring an 8mm total thickness, each plank is constructed with a 6mm rigid core and 2mm attached underlay, providing a solid and comfortable foundation. Designed for demanding everyday environments, the collection is 100% waterproof, making it a practical flooring choice for areas where moisture and spills are a concern. A durable 20 mil (0.5 mm) wear layer provides added protection for long-lasting performance while helping the flooring maintain its appearance over time. The Yellowstone Collection also delivers impressive acoustic performance, with sound ratings of IIC 78 and STC 76, helping reduce both impact and airborne sound transmission. This combination of waterproof construction, durability, acoustic performance, and contemporary styling makes Yellowstone SPC a versatile flooring solution for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Yellowstone",
      "SKU": "47873",
      "Product code": "68628",
      "Construction": "8mm total thickness — 6mm rigid core + 2mm attached underlay",
      "Length × width": "1524 × 228 mm",
      "Wear layer": "20 mil (0.5 mm)",
      "Performance": "100% waterproof",
      "Sound rating": "IIC = 78 / STC = 76",
      "Supplier data review": "Thickness conflict: dimensions 3mm, construction 8mm; Supplier laminate tag conflicts with SPC product description"
    }
  },
  {
    "name": "68629",
    "sourceUrl": "https://simbaflooringcorp.com/product/68629/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2026/08/image_05.jpg",
    "description": "The Yellowstone SPC Collection combines modern design with exceptional durability and everyday performance. Featuring an 8mm total thickness, each plank is constructed with a 6mm rigid core and 2mm attached underlay, providing a solid and comfortable foundation. Designed for demanding everyday environments, the collection is 100% waterproof, making it a practical flooring choice for areas where moisture and spills are a concern. A durable 20 mil (0.5 mm) wear layer provides added protection for long-lasting performance while helping the flooring maintain its appearance over time. The Yellowstone Collection also delivers impressive acoustic performance, with sound ratings of IIC 78 and STC 76, helping reduce both impact and airborne sound transmission. This combination of waterproof construction, durability, acoustic performance, and contemporary styling makes Yellowstone SPC a versatile flooring solution for a wide range of residential and commercial interiors.",
    "specifications": {
      "Collection": "Yellowstone",
      "SKU": "47874",
      "Product code": "68629",
      "Construction": "8mm total thickness — 6mm rigid core + 2mm attached underlay",
      "Length × width": "1524 × 228 mm",
      "Wear layer": "20 mil (0.5 mm)",
      "Performance": "100% waterproof",
      "Sound rating": "IIC = 78 / STC = 76",
      "Supplier data review": "Thickness conflict: dimensions 3mm, construction 8mm; Supplier laminate tag conflicts with SPC product description"
    }
  }
];
const simbaYellowstoneProducts = simbaYellowstoneCatalogue.map(({name,sourceUrl,imageUrl,specifications,description}) => ({
  ...supplierListingProduct('Simba','Vinyl',name,sourceUrl,specifications,imageUrl),
  slug: 'simba-yellowstone-' + specifications.SKU,
  description
}));

const simbaGalaxyCatalogue: Array<{name:string;sourceUrl:string;imageUrl:string;specifications:Record<string,string>;description:string}> = [
  {
    "name": "58002-3",
    "sourceUrl": "https://simbaflooringcorp.com/product/58002-3/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/01/58002-3.jpg",
    "description": "SPC (Stone Plastic Composite) flooring is highly durable, waterproof, and perfect for both residential and commercial use. Its rigid core resists dents, scratches, and moisture, making it ideal for high-traffic and wet areas. Easy to install and maintain, SPC floors offer a stylish, realistic look of wood or stone with exceptional stability and comfort.",
    "specifications": {
      "Collection": "Galaxy",
      "SKU": "47001",
      "Product code": "58002-3",
      "Construction": "Stone Plastic Composite",
      "Dimensions": "1540 x 230 mm",
      "Thickness": "5MM",
      "Underlay": "1.5mm IXPE",
      "Wear layer": "0.5MM",
      "Surface": "EIR",
      "Waterproof": "Yes",
      "Application": "Residential, Commercial",
      "Supplier data review": "Confirm whether stated thickness includes attached underlay"
    }
  },
  {
    "name": "58023-10",
    "sourceUrl": "https://simbaflooringcorp.com/product/58023-10/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/01/58023-10.jpg",
    "description": "SPC (Stone Plastic Composite) flooring is highly durable, waterproof, and perfect for both residential and commercial use. Its rigid core resists dents, scratches, and moisture, making it ideal for high-traffic and wet areas. Easy to install and maintain, SPC floors offer a stylish, realistic look of wood or stone with exceptional stability and comfort.",
    "specifications": {
      "Collection": "Galaxy",
      "SKU": "46999",
      "Product code": "58023-10",
      "Construction": "Stone Plastic Composite",
      "Dimensions": "1540 x 230 mm",
      "Thickness": "5MM",
      "Underlay": "1.5mm IXPE",
      "Wear layer": "0.5MM",
      "Surface": "EIR",
      "Waterproof": "Yes",
      "Application": "Residential, Commercial",
      "Supplier data review": "Confirm whether stated thickness includes attached underlay"
    }
  },
  {
    "name": "58065-3",
    "sourceUrl": "https://simbaflooringcorp.com/product/58065/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/01/58065-3.jpg",
    "description": "SPC (Stone Plastic Composite) flooring is highly durable, waterproof, and perfect for both residential and commercial use. Its rigid core resists dents, scratches, and moisture, making it ideal for high-traffic and wet areas. Easy to install and maintain, SPC floors offer a stylish, realistic look of wood or stone with exceptional stability and comfort.",
    "specifications": {
      "Collection": "Galaxy",
      "SKU": "46994",
      "Product code": "58065-3",
      "Construction": "Stone Plastic Composite",
      "Dimensions": "1540 x 230 mm",
      "Thickness": "5MM",
      "Underlay": "1.5mm IXPE",
      "Wear layer": "0.5MM",
      "Surface": "EIR",
      "Waterproof": "Yes",
      "Application": "Residential, Commercial",
      "Supplier data review": "Confirm whether stated thickness includes attached underlay"
    }
  },
  {
    "name": "581066-1",
    "sourceUrl": "https://simbaflooringcorp.com/product/581066-1/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2022/03/581066-1-scaled.jpg",
    "description": "SPC (Stone Plastic Composite) flooring is highly durable, waterproof, and perfect for both residential and commercial use. Its rigid core resists dents, scratches, and moisture, making it ideal for high-traffic and wet areas. Easy to install and maintain, SPC floors offer a stylish, realistic look of wood or stone with exceptional stability and comfort.",
    "specifications": {
      "Collection": "Galaxy",
      "SKU": "46720",
      "Product code": "581066-1",
      "Construction": "Stone Plastic Composite",
      "Dimensions": "1540 x 230 mm",
      "Thickness": "5MM",
      "Underlay": "1.5mm IXPE",
      "Wear layer": "0.5MM",
      "Surface": "EIR",
      "Waterproof": "Yes",
      "Application": "Residential, Commercial",
      "Supplier data review": "Confirm whether stated thickness includes attached underlay"
    }
  },
  {
    "name": "58943-01",
    "sourceUrl": "https://simbaflooringcorp.com/product/58943-01/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2022/03/58943-01-scaled.jpg",
    "description": "SPC (Stone Plastic Composite) flooring is highly durable, waterproof, and perfect for both residential and commercial use. Its rigid core resists dents, scratches, and moisture, making it ideal for high-traffic and wet areas. Easy to install and maintain, SPC floors offer a stylish, realistic look of wood or stone with exceptional stability and comfort.",
    "specifications": {
      "Collection": "Galaxy",
      "SKU": "46713",
      "Product code": "58943-01",
      "Construction": "Stone Plastic Composite",
      "Dimensions": "1540 x 230 mm",
      "Thickness": "5MM",
      "Underlay": "1.5mm IXPE",
      "Wear layer": "0.5MM",
      "Surface": "EIR",
      "Waterproof": "Yes",
      "Application": "Residential, Commercial",
      "Supplier data review": "Confirm whether stated thickness includes attached underlay"
    }
  },
  {
    "name": "58943-03",
    "sourceUrl": "https://simbaflooringcorp.com/product/58943-03/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2022/03/58943-03-scaled.jpg",
    "description": "SPC (Stone Plastic Composite) flooring is highly durable, waterproof, and perfect for both residential and commercial use. Its rigid core resists dents, scratches, and moisture, making it ideal for high-traffic and wet areas. Easy to install and maintain, SPC floors offer a stylish, realistic look of wood or stone with exceptional stability and comfort.",
    "specifications": {
      "Collection": "Galaxy",
      "SKU": "46714",
      "Product code": "58943-03",
      "Construction": "Stone Plastic Composite",
      "Dimensions": "1540 x 230 mm",
      "Thickness": "5MM",
      "Underlay": "1.5mm IXPE",
      "Wear layer": "0.5MM",
      "Surface": "EIR",
      "Waterproof": "Yes",
      "Application": "Residential, Commercial",
      "Supplier data review": "Confirm whether stated thickness includes attached underlay"
    }
  },
  {
    "name": "58943-06",
    "sourceUrl": "https://simbaflooringcorp.com/product/58943-06/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2022/03/58943-06-scaled.jpg",
    "description": "SPC (Stone Plastic Composite) flooring is highly durable, waterproof, and perfect for both residential and commercial use. Its rigid core resists dents, scratches, and moisture, making it ideal for high-traffic and wet areas. Easy to install and maintain, SPC floors offer a stylish, realistic look of wood or stone with exceptional stability and comfort.",
    "specifications": {
      "Collection": "Galaxy",
      "SKU": "46715",
      "Product code": "58943-06",
      "Construction": "Stone Plastic Composite",
      "Dimensions": "1540 x 230 mm",
      "Thickness": "5MM",
      "Underlay": "1.5mm IXPE",
      "Wear layer": "0.5MM",
      "Surface": "EIR",
      "Waterproof": "Yes",
      "Application": "Residential, Commercial",
      "Supplier data review": "Confirm whether stated thickness includes attached underlay"
    }
  },
  {
    "name": "58943-15",
    "sourceUrl": "https://simbaflooringcorp.com/product/58943-15/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2022/03/58943-15-scaled.jpg",
    "description": "SPC (Stone Plastic Composite) flooring is highly durable, waterproof, and perfect for both residential and commercial use. Its rigid core resists dents, scratches, and moisture, making it ideal for high-traffic and wet areas. Easy to install and maintain, SPC floors offer a stylish, realistic look of wood or stone with exceptional stability and comfort.",
    "specifications": {
      "Collection": "Galaxy",
      "SKU": "46717",
      "Product code": "58943-15",
      "Construction": "Stone Plastic Composite",
      "Dimensions": "1540 x 230 mm",
      "Thickness": "5MM",
      "Underlay": "1.5mm IXPE",
      "Wear layer": "0.5MM",
      "Surface": "EIR",
      "Waterproof": "Yes",
      "Application": "Residential, Commercial",
      "Supplier data review": "Confirm whether stated thickness includes attached underlay"
    }
  },
  {
    "name": "58943-16",
    "sourceUrl": "https://simbaflooringcorp.com/product/58943-16/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2022/03/58943-16-scaled.jpg",
    "description": "SPC (Stone Plastic Composite) flooring is highly durable, waterproof, and perfect for both residential and commercial use. Its rigid core resists dents, scratches, and moisture, making it ideal for high-traffic and wet areas. Easy to install and maintain, SPC floors offer a stylish, realistic look of wood or stone with exceptional stability and comfort.",
    "specifications": {
      "Collection": "Galaxy",
      "SKU": "46718",
      "Product code": "58943-16",
      "Construction": "Stone Plastic Composite",
      "Dimensions": "1540 x 230 mm",
      "Thickness": "5MM",
      "Underlay": "1.5mm IXPE",
      "Wear layer": "0.5MM",
      "Surface": "EIR",
      "Waterproof": "Yes",
      "Application": "Residential, Commercial",
      "Supplier data review": "Confirm whether stated thickness includes attached underlay"
    }
  },
  {
    "name": "589531-2",
    "sourceUrl": "https://simbaflooringcorp.com/product/589531-2/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2022/03/589531-2-scaled.jpg",
    "description": "SPC (Stone Plastic Composite) flooring is highly durable, waterproof, and perfect for both residential and commercial use. Its rigid core resists dents, scratches, and moisture, making it ideal for high-traffic and wet areas. Easy to install and maintain, SPC floors offer a stylish, realistic look of wood or stone with exceptional stability and comfort.",
    "specifications": {
      "Collection": "Galaxy",
      "SKU": "46719",
      "Product code": "589531-2",
      "Construction": "Stone Plastic Composite",
      "Dimensions": "1540 x 230 mm",
      "Thickness": "5MM",
      "Underlay": "1.5mm IXPE",
      "Wear layer": "0.5MM",
      "Surface": "EIR",
      "Waterproof": "Yes",
      "Application": "Residential, Commercial",
      "Supplier data review": "Confirm whether stated thickness includes attached underlay"
    }
  },
  {
    "name": "589531-5",
    "sourceUrl": "https://simbaflooringcorp.com/product/589531-5/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2024/01/589531-5.jpg",
    "description": "SPC (Stone Plastic Composite) flooring is highly durable, waterproof, and perfect for both residential and commercial use. Its rigid core resists dents, scratches, and moisture, making it ideal for high-traffic and wet areas. Easy to install and maintain, SPC floors offer a stylish, realistic look of wood or stone with exceptional stability and comfort.",
    "specifications": {
      "Collection": "Galaxy",
      "SKU": "46996",
      "Product code": "589531-5",
      "Construction": "Stone Plastic Composite",
      "Dimensions": "1540 x 230 mm",
      "Thickness": "5MM",
      "Underlay": "1.5mm IXPE",
      "Wear layer": "0.5MM",
      "Surface": "EIR",
      "Waterproof": "Yes",
      "Application": "Residential, Commercial",
      "Supplier data review": "Confirm whether stated thickness includes attached underlay"
    }
  },
  {
    "name": "681019-8",
    "sourceUrl": "https://simbaflooringcorp.com/product/681019-8/",
    "imageUrl": "https://simbaflooringcorp.com/wp-content/uploads/2022/03/681019-8-scaled.jpg",
    "description": "SPC (Stone Plastic Composite) flooring is highly durable, waterproof, and perfect for both residential and commercial use. Its rigid core resists dents, scratches, and moisture, making it ideal for high-traffic and wet areas. Easy to install and maintain, SPC floors offer a stylish, realistic look of wood or stone with exceptional stability and comfort.",
    "specifications": {
      "Collection": "Galaxy",
      "SKU": "46722",
      "Product code": "681019-8",
      "Construction": "Stone Plastic Composite",
      "Dimensions": "1540 x 230 mm",
      "Thickness": "5MM",
      "Underlay": "1.5mm IXPE",
      "Wear layer": "0.5MM",
      "Surface": "EIR",
      "Waterproof": "Yes",
      "Application": "Residential, Commercial",
      "Supplier data review": "Confirm whether stated thickness includes attached underlay"
    }
  }
];
const simbaGalaxyProducts = simbaGalaxyCatalogue.map(({name,sourceUrl,imageUrl,specifications,description}) => ({
  ...supplierListingProduct('Simba','Vinyl',name,sourceUrl,specifications,imageUrl),
  slug: 'simba-galaxy-' + specifications.SKU,
  description
}));

export const supplierProductImports: Product[] = [
  ...simbaGalaxyProducts,
  ...simbaYellowstoneProducts,
  ...simbaOakProducts,
  ...simbaEngineeredProducts,
  ...simbaLvtProducts,
  ...vidarProducts.map(withVidarWestListing),
  ...vidarAdditionalEngineeredProducts.map(withVidarWestListing),
  ...vidarPatternedOakProducts.map(withVidarWestListing),
  ...vidarWestNewProducts.map(withVidarSeattleListing),
  ...vidarOakListingProducts.map(withVidarSeattleListing),
  ...vidarLaminateImports,
  ...vidarSpcProducts,
  ...toucanSpc86Products,
  ...toucanLuxcoreProducts,
  ...leeVinylProducts,
  ...wickhamHardwoodProducts,
  ...wickhamEuroProducts,
  ...wickhamMountainProducts,
  ...leeLaminateProducts,
  ...leeHybridProducts,
  ...leeAdditionalEngineeredProducts,
  ...leeSolidProducts,
  ...floorsAtWorkVinylProducts,
  ...grandeurPacific,
  ...grandeurLaminateProducts,
  ...grandeurEngineeredProducts,
  ...grandeurSolidHardwoodProducts,
  ...grandeurVinylProducts,
  ...simbaSpcProducts,
  ...simbaLaminateProducts,
  ...northernestCoastal,
  ...northernestMapleProducts,
  ...northernestLaminateProducts,
  ...northernestVinylProducts,
  ...sherwoodProducts,
  ...pangolinProducts,
  ...wodenProducts,
  ...weissEngineeredProducts,
  ...weissSpcProducts,
  ...weissLaminateProducts
];
