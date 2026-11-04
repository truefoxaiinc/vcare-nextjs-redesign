import { supplierProductImports } from '@/data/supplier-product-imports';
import { clientReportedAuthorization } from '@/data/catalog-authorization';

export type Category = 'Engineered Hardwood' | 'Hardwood' | 'Laminate' | 'Vinyl';

export type Product = {
  slug: string;
  name: string;
  category: Category;
  supplier: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  sourceUrl: string;
  publicationStatus: 'draft' | 'published';
  imageAuthorizationStatus: 'pending' | 'approved';
  imageAuthorizedBy?: string;
  imageAuthorizedAt?: string;
  imageAuthorizationReference?: string;
  descriptionAuthorizationStatus: 'pending' | 'approved';
  descriptionAuthorizedBy?: string;
  descriptionAuthorizedAt?: string;
  descriptionAuthorizationReference?: string;
  specifications?: Record<string, string>;
  sourceStatus?: 'verified' | 'unresolved';
};

export type FloorCategory = {
  title: Category;
  slug: string;
  note: string;
  image: string;
  suppliers: string[];
};

export type Supplier = {
  name: string;
  categories: Category[];
};

const photo = (id: string) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=1100&q=82';

export const categories: FloorCategory[] = [
  {
    title: 'Hardwood',
    slug: 'hardwood',
    note: 'Natural character, made to last',
    image: photo('photo-1600210492486-724fe5c67fb0'),
    suppliers: ['Wickham', 'Tosca']
  },
  {
    title: 'Engineered Hardwood',
    slug: 'engineered-hardwood',
    note: 'Real wood, thoughtfully built',
    image: photo('photo-1600607687939-ce8a6c25118c'),
    suppliers: ['Floorsatwork']
  },
  {
    title: 'Laminate',
    slug: 'laminate',
    note: 'Everyday durability, beautifully done',
    image: photo('photo-1600566753086-00f18fb6b3ea'),
    suppliers: ['Toucan', 'Floorsatwork', 'Lee Flooring']
  },
  {
    title: 'Vinyl',
    slug: 'vinyl',
    note: 'Water-ready style for busy homes',
    image: photo('photo-1600573472591-ee6b68d14c68'),
    suppliers: ['Toucan', 'Floorsatwork', 'Pangolin', 'Lee Flooring']
  }
];

/** Client-approved supplier names. Do not infer product ranges for unclassified suppliers. */
export const suppliers: Supplier[] = [
  'Grandeur', 'Tosca', 'Floorsatwork', 'Toucan', 'Simba', 'Wickham',
  'Northernest', 'Sherwood', 'Pangolin', 'Lee Flooring', 'Woden', 'Weiss'
].map(name => ({
  name,
  categories: categories.filter(category => category.suppliers.includes(name)).map(category => category.title)
}));

const approvedSupplierAliases: Record<string, string> = {
  'Floors at Work': 'Floorsatwork',
  'Pangolin Floors': 'Pangolin'
};
const approvedSupplierNames = new Set(suppliers.map(supplier => supplier.name));

const existingProductRecords: Product[] = [
  {
    slug: 'floors-at-work-12mm-waterproof-laminate-plus',
    name: '12mm Waterproof Laminate PLUS',
    category: 'Laminate',
    supplier: 'Floors at Work',
    description: 'A 12 mm waterproof laminate collection with 12 × 236 × 1518 mm planks. The supplier lists 19.27 sq. ft. per box.',
    imageUrl: 'https://floorsatwork.com/cdn/shop/files/Astra1_eaf97aec-5ae0-414a-88b5-5b061c9f5977.jpg?v=1787497265',
    imageAlt: 'Supplier product image for 12mm Waterproof Laminate PLUS',
    sourceUrl: 'https://floorsatwork.com/products/12mm-waterproof-laminate-plus',
    publicationStatus: 'draft',
    imageAuthorizationStatus: 'pending',
    descriptionAuthorizationStatus: 'pending'
  },
  {
    slug: 'floors-at-work-12mm-engineered-oak-click',
    name: '12mm Engineered Oak Click',
    category: 'Engineered Hardwood',
    supplier: 'Floors at Work',
    description: 'The NAF 12mm Engineered Click collection has 12 mm planks in random lengths from 400 to 1210 mm. The supplier lists 29.28 sq. ft. per box.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0694/1396/1799/files/cedar.jpg?v=1787557129',
    imageAlt: 'Supplier product image for 12mm Engineered Oak Click',
    sourceUrl: 'https://floorsatwork.com/products/12mm-engineered-oak-click',
    publicationStatus: 'draft',
    imageAuthorizationStatus: 'pending',
    descriptionAuthorizationStatus: 'pending'
  },
  {
    slug: 'toucan-tf1108-f-nature-classic',
    name: 'TF1108-F | Nature Classic',
    category: 'Laminate',
    supplier: 'Toucan',
    description: 'A 36-hour water-resistant laminate with a woodgrain surface, locking installation, and supplier-stated CARB2 and FloorScore certifications.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0910/9726/8503/files/TF1108-F_sideview-detail_9049fdde-2d06-43cc-9776-00933df82497.webp?v=1742509622',
    imageAlt: 'Supplier product image for TF1108-F Nature Classic',
    sourceUrl: 'https://www.toucanflooring.com/products/tf1108-f',
    publicationStatus: 'draft',
    imageAuthorizationStatus: 'pending',
    descriptionAuthorizationStatus: 'pending'
  },
  {
    slug: 'toucan-tf8001-umber',
    name: 'TF8001 | Umber',
    category: 'Laminate',
    supplier: 'Toucan',
    description: 'A waterproof laminate in Toucan’s long-plank collection, with 72-inch planks, a locking system, and supplier-stated CARB2 and FloorScore certifications.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0910/9726/8503/files/TF8001_Sideview_3276dccf-2c40-4ebe-b2a3-de1f125a0322.webp?v=1742509596',
    imageAlt: 'Supplier product image for TF8001 Umber',
    sourceUrl: 'https://www.toucanflooring.com/products/tf8001',
    publicationStatus: 'draft',
    imageAuthorizationStatus: 'pending',
    descriptionAuthorizationStatus: 'pending'
  },
  {
    slug: 'toucan-tf8101-clam',
    name: 'TF8101 | Clam',
    category: 'Laminate',
    supplier: 'Toucan',
    description: 'A waterproof laminate with a pre-attached 2 mm pad, locking installation, and supplier-stated CARB2 and FloorScore certifications.',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0910/9726/8503/files/TF8101_1_ab74bd04-8c35-48de-9c2b-46300030f0a7.webp?v=1742509589',
    imageAlt: 'Supplier product image for TF8101 Clam',
    sourceUrl: 'https://www.toucanflooring.com/products/tf8101',
    publicationStatus: 'draft',
    imageAuthorizationStatus: 'pending',
    descriptionAuthorizationStatus: 'pending'
  },
  {
    slug: 'tosca-crown-saddle-solid-hardwood',
    name: 'Crown Saddle',
    category: 'Hardwood',
    supplier: 'Tosca',
    description: 'Tosca lists Crown Saddle in its Solid Hardwood range and describes the style as having a calm, modern grain profile.',
    imageUrl: 'https://toscaflooring.com/assets/crown%20saddle%20hs1-BunRcvPh.webp',
    imageAlt: 'Supplier product image for Crown Saddle solid hardwood',
    sourceUrl: 'https://toscaflooring.com/products/new-12',
    publicationStatus: 'draft',
    imageAuthorizationStatus: 'pending',
    descriptionAuthorizationStatus: 'pending'
  },
  {
    slug: 'tosca-butterscotch-solid-hardwood',
    name: 'Butterscotch',
    category: 'Hardwood',
    supplier: 'Tosca',
    description: 'Tosca lists Butterscotch in its Solid Hardwood range and describes the style as having a calm, modern grain profile.',
    imageUrl: 'https://toscaflooring.com/assets/butter%20scotch1-CWV-o-7X.webp',
    imageAlt: 'Supplier product image for Butterscotch solid hardwood',
    sourceUrl: 'https://toscaflooring.com/products/new-13',
    publicationStatus: 'draft',
    imageAuthorizationStatus: 'pending',
    descriptionAuthorizationStatus: 'pending'
  },
  {
    slug: 'tosca-cherry-walnut-solid-hardwood',
    name: 'Cherry Walnut',
    category: 'Hardwood',
    supplier: 'Tosca',
    description: 'Tosca lists Cherry Walnut in its Solid Hardwood range and describes the style as having a calm, modern grain profile.',
    imageUrl: 'https://toscaflooring.com/assets/cherry%20walnut1-Dtzk0VbA.webp',
    imageAlt: 'Supplier product image for Cherry Walnut solid hardwood',
    sourceUrl: 'https://toscaflooring.com/products/new-14',
    publicationStatus: 'draft',
    imageAuthorizationStatus: 'pending',
    descriptionAuthorizationStatus: 'pending'
  },
  {
    slug: 'tosca-antwerp-solid-hardwood',
    name: 'Antwerp',
    category: 'Hardwood',
    supplier: 'Tosca',
    description: 'Tosca lists Antwerp in its Solid Hardwood range and describes the style as having a calm, modern grain profile.',
    imageUrl: 'https://toscaflooring.com/assets/aninerp1-R8Co1V-t.webp',
    imageAlt: 'Supplier product image for Antwerp solid hardwood',
    sourceUrl: 'https://toscaflooring.com/products/new-45',
    publicationStatus: 'draft',
    imageAuthorizationStatus: 'pending',
    descriptionAuthorizationStatus: 'pending'
  },
  {
    slug: 'tosca-red-oak-solid-hardwood',
    name: 'Red Oak',
    category: 'Hardwood',
    supplier: 'Tosca',
    description: 'Tosca lists Red Oak in its Solid Hardwood range.',
    imageUrl: 'https://toscaflooring.com/assets/red-oak-main-1759400712491-CI8WKUxq.webp',
    imageAlt: 'Supplier product image for Red Oak solid hardwood',
    sourceUrl: 'https://toscaflooring.com/products/legacy-2',
    publicationStatus: 'draft',
    imageAuthorizationStatus: 'pending',
    descriptionAuthorizationStatus: 'pending'
  }
];

const existingProducts: Product[] = existingProductRecords.map(product => ({
  ...product,
  publicationStatus: 'published',
  sourceStatus: 'verified',
  ...clientReportedAuthorization
}));

export const products: Product[] = [...existingProducts, ...supplierProductImports];

export function isProductPublishable(product: Product): boolean {
  return product.publicationStatus === 'published' &&
    product.imageAuthorizationStatus === 'approved' &&
    Boolean(product.imageAuthorizedBy?.trim()) &&
    Boolean(product.imageAuthorizedAt && !Number.isNaN(Date.parse(product.imageAuthorizedAt))) &&
    Boolean(product.imageAuthorizationReference?.trim()) &&
    product.descriptionAuthorizationStatus === 'approved' &&
    Boolean(product.descriptionAuthorizedBy?.trim()) &&
    Boolean(product.descriptionAuthorizedAt && !Number.isNaN(Date.parse(product.descriptionAuthorizedAt))) &&
    Boolean(product.descriptionAuthorizationReference?.trim()) &&
    product.sourceStatus === 'verified';
}

export const publishedProducts = products.filter(product =>
  isProductPublishable(product) && approvedSupplierNames.has(approvedSupplierAliases[product.supplier] ?? product.supplier)
);

export const posts = [
  {slug:'is-it-essential-to-hire-a-flooring-installer-for-your-home',title:'Is It Essential to Hire a Flooring Installer for Your Home?',category:'Installation',date:'March 11, 2024',excerpt:'A closer look at when professional installation can protect your investment and help a renovation go smoothly.',image:photo('photo-1600607687939-ce8a6c25118c')},
  {slug:'hardwood-floors-for-ho',title:'How Do Hardwood Floors Impact the Value of Your Home?',category:'Hardwood',date:'March 11, 2024',excerpt:'Explore the long-term appeal of hardwood and the practical choices that matter for your home.',image:photo('photo-1600210492486-724fe5c67fb0')},
  {slug:'vinyl-flooring-basement',title:'Why Do Canadian Homeowners Choose Vinyl Flooring for Basements?',category:'Vinyl',date:'March 11, 2024',excerpt:'Compare water-ready flooring options for below-grade spaces and everyday family use.',image:photo('photo-1600573472591-ee6b68d14c68')},
  {slug:'laminate-vs-vinyl-flooring-choosing-the-ideal-option-for-your-commercial-space',title:'Laminate vs. Vinyl Flooring for Commercial Spaces',category:'Guides',date:'February 27, 2024',excerpt:'Understand durability, maintenance, installation and design differences before you choose.',image:photo('photo-1600566753190-17f0baa2a6c3')}
];
