import { supplierProductImports } from '@/data/supplier-product-imports';
import { toucanLaminateProducts } from '@/data/toucan-laminate-products';
import { clientReportedAuthorization } from '@/data/catalog-authorization';

export type Category = 'Engineered Hardwood' | 'Hardwood' | 'Laminate' | 'Vinyl';

export type Product = {
  slug: string;
  name: string;
  category: Category;
  supplier: string;
  description: string;
  imageUrl?: string;
  additionalImages?: string[];
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
  slug: string;
  categories: Category[];
  /** Approved, locally hosted logo asset. Omit until supplied and licensed. */
  logoPath?: string;
  logoBackground?: 'dark';
  productCatalogueEnabled: boolean;
  productListingHref: string;
};

const photo = (id: string) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=1100&q=82';

export const categories: FloorCategory[] = [
  {
    title: 'Hardwood',
    slug: 'hardwood',
    note: 'Natural character, made to last',
    image: photo('photo-1600210492486-724fe5c67fb0'),
    suppliers: ['Wickham', 'Tosca', 'Grandeur', 'Northernest', 'Sherwood', 'Lee Flooring']
  },
  {
    title: 'Engineered Hardwood',
    slug: 'engineered-hardwood',
    note: 'Real wood, thoughtfully built',
    image: photo('photo-1600607687939-ce8a6c25118c'),
    suppliers: ['Floorsatwork', 'Grandeur', 'Northernest', 'Sherwood', 'Weiss', 'Woden', 'Vidar', 'Lee Flooring', 'Wickham', 'Simba', 'Tosca']
  },
  {
    title: 'Laminate',
    slug: 'laminate',
    note: 'Everyday durability, beautifully done',
    image: photo('photo-1600566753086-00f18fb6b3ea'),
    suppliers: ['Toucan', 'Floorsatwork', 'Lee Flooring', 'Simba', 'Sherwood', 'Woden', 'Weiss', 'Grandeur', 'Vidar', 'Northernest', 'Tosca']
  },
  {
    title: 'Vinyl',
    slug: 'vinyl',
    note: 'Water-ready style for busy homes',
    image: photo('photo-1600573472591-ee6b68d14c68'),
    suppliers: ['Toucan', 'Floorsatwork', 'Pangolin', 'Lee Flooring', 'Grandeur', 'Simba', 'Northernest', 'Sherwood', 'Woden', 'Weiss', 'Vidar', 'Tosca']
  }
];

/** User-provided supplier logo files; brand identity should be reviewed before merging. */
const supplierLogoFiles: Record<string, string> = {
  "Grandeur": "grandeurflooring-logo.png",
  "Tosca": "Tosca-logo.webp",
  "Floorsatwork": "Floorsatwork-logo.avif",
  "Toucan": "Toucan-logo.avif",
  "Simba": "Simba-logo.png",
  "Wickham": "Wickham-logo.svg",
  "Northernest": "Northernest-logo.png",
  "Sherwood": "sharwood-logo.jpeg",
  "Pangolin": "Pangol-logo.webp",
  "Woden": "woodenflooring-logo.avif",
  "Lee Flooring": "Lee Flooring-logo.webp",
  "Weiss": "Weiss-logo.avif",
  "Purelux": "Purelux-footer-logo-.png",
  "Vidar": "vidar-logo.png"
};

const productCatalogueDisabledSuppliers = new Set(['Purelux']);
const supplierSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** Public supplier directory. Do not infer product ranges for unclassified suppliers. */
export const suppliers: Supplier[] = [
  'Grandeur', 'Tosca', 'Floorsatwork', 'Toucan', 'Simba', 'Wickham',
  'Northernest', 'Sherwood', 'Pangolin', 'Lee Flooring', 'Woden', 'Weiss',
  'Purelux', 'Vidar'
].map(name => ({
  name,
  slug: supplierSlug(name),
  logoPath: supplierLogoFiles[name] ? '/images/suppliers/' + encodeURIComponent(supplierLogoFiles[name]) : undefined,
  logoBackground: name === 'Purelux' ? 'dark' : undefined,
  productCatalogueEnabled: !productCatalogueDisabledSuppliers.has(name),
  productListingHref: '/suppliers/' + supplierSlug(name),
  categories: categories.filter(category => category.suppliers.includes(name)).map(category => category.title)
}));

const approvedSupplierAliases: Record<string, string> = {
  'Floors at Work': 'Floorsatwork',
  'Pangolin Floors': 'Pangolin'
};
const approvedSupplierNames = new Set(suppliers.filter(supplier => supplier.productCatalogueEnabled).map(supplier => supplier.name));

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
  },
  {"slug":"tosca-gold-coast-new-11","name":"Gold Coast","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Gold Coast in its Aura Collection range.","imageUrl":"https://toscaflooring.com/assets/gold%20chest1-CNdmrX53.webp","imageAlt":"Supplier product image for Tosca Gold Coast","sourceUrl":"https://toscaflooring.com/products/new-11","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Aura Collection"}},
  {"slug":"tosca-buttercup-shine-new-41","name":"Buttercup Shine","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Buttercup Shine in its Aura Collection range.","imageUrl":"https://toscaflooring.com/assets/butier%20cup%20shine1-QSRXfrs2.webp","imageAlt":"Supplier product image for Tosca Buttercup Shine","sourceUrl":"https://toscaflooring.com/products/new-41","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Aura Collection"}},
  {"slug":"tosca-misty-slate-new-42","name":"Misty Slate","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Misty Slate in its Aura Collection range.","imageUrl":"https://toscaflooring.com/assets/misty%20slate1-CI2sWxQs.webp","imageAlt":"Supplier product image for Tosca Misty Slate","sourceUrl":"https://toscaflooring.com/products/new-42","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Aura Collection"}},
  {"slug":"tosca-frosted-ivory-new-43","name":"Frosted Ivory","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Frosted Ivory in its Aura Collection range.","imageUrl":"https://toscaflooring.com/assets/froest%20ivory1-Bw3GzHQ7.webp","imageAlt":"Supplier product image for Tosca Frosted Ivory","sourceUrl":"https://toscaflooring.com/products/new-43","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Aura Collection"}},
  {"slug":"tosca-pearlescent-dawn-new-44","name":"Pearlescent Dawn","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Pearlescent Dawn in its Aura Collection range.","imageUrl":"https://toscaflooring.com/assets/pearles%20cent%20dawn1-DTbTTUD1.webp","imageAlt":"Supplier product image for Tosca Pearlescent Dawn","sourceUrl":"https://toscaflooring.com/products/new-44","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Aura Collection"}},
  {"slug":"tosca-after-light-new-15","name":"After Light","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists After Light in its Superior Collection range.","imageUrl":"https://toscaflooring.com/assets/after%20light1-DCfI7dM2.webp","imageAlt":"Supplier product image for Tosca After Light","sourceUrl":"https://toscaflooring.com/products/new-15","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Superior Collection"}},
  {"slug":"tosca-beach-sand-new-21","name":"Beach Sand","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Beach Sand in its Superior Collection range.","imageUrl":"https://toscaflooring.com/assets/beach%20sand1-BOe_0jLQ.webp","imageAlt":"Supplier product image for Tosca Beach Sand","sourceUrl":"https://toscaflooring.com/products/new-21","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Superior Collection"}},
  {"slug":"tosca-cappadocia-new-22","name":"Cappadocia","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Cappadocia in its Superior Collection range.","imageUrl":"https://toscaflooring.com/assets/cappadocia1-BIV9QiOj.webp","imageAlt":"Supplier product image for Tosca Cappadocia","sourceUrl":"https://toscaflooring.com/products/new-22","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Superior Collection"}},
  {"slug":"tosca-butter-new-16","name":"Butter","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Butter in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/butter1-D7HCThOF.webp","imageAlt":"Supplier product image for Tosca Butter","sourceUrl":"https://toscaflooring.com/products/new-16","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-latte-new-17","name":"Latte","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Latte in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/latte1-pMUs5MRe.webp","imageAlt":"Supplier product image for Tosca Latte","sourceUrl":"https://toscaflooring.com/products/new-17","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-snowstorm-new-18","name":"Snowstorm","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Snowstorm in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/snow%20storm1-dtu1g8PN.webp","imageAlt":"Supplier product image for Tosca Snowstorm","sourceUrl":"https://toscaflooring.com/products/new-18","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-yale-new-19","name":"Yale","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Yale in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/yale1-Dv2hwPfu.webp","imageAlt":"Supplier product image for Tosca Yale","sourceUrl":"https://toscaflooring.com/products/new-19","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-jasmine-new-20","name":"Jasmine","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Jasmine in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/jasmiwc1-CHvzkj8W.webp","imageAlt":"Supplier product image for Tosca Jasmine","sourceUrl":"https://toscaflooring.com/products/new-20","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-whipping-cream-new-24","name":"Whipping Cream","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Whipping Cream in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/whipping%20cream1-BpTe_tH9.webp","imageAlt":"Supplier product image for Tosca Whipping Cream","sourceUrl":"https://toscaflooring.com/products/new-24","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-ivory-new-28","name":"Ivory","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Ivory in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/iuory1-DRgyyGrE.webp","imageAlt":"Supplier product image for Tosca Ivory","sourceUrl":"https://toscaflooring.com/products/new-28","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-invisible-oak-new-30","name":"Invisible Oak","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Invisible Oak in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/invisible%20oak1-ChMCYgJf.webp","imageAlt":"Supplier product image for Tosca Invisible Oak","sourceUrl":"https://toscaflooring.com/products/new-30","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-buckingham-palace-new-32","name":"Buckingham Palace","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Buckingham Palace in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/buckinghum%20palace1-BQAVVzXL.webp","imageAlt":"Supplier product image for Tosca Buckingham Palace","sourceUrl":"https://toscaflooring.com/products/new-32","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-wheat-new-34","name":"Wheat","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Wheat in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/wheat1-4W-H_9Bs.webp","imageAlt":"Supplier product image for Tosca Wheat","sourceUrl":"https://toscaflooring.com/products/new-34","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-lite-latte-new-35","name":"Lite Latte","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Lite Latte in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/lite%20catte1-DQ1Z6NU0.webp","imageAlt":"Supplier product image for Tosca Lite Latte","sourceUrl":"https://toscaflooring.com/products/new-35","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-smoked-oak-new-36","name":"Smoked Oak","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Smoked Oak in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/smoked%20oak1-C4RkDDWO.webp","imageAlt":"Supplier product image for Tosca Smoked Oak","sourceUrl":"https://toscaflooring.com/products/new-36","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-oak-charm-new-40","name":"Oak Charm","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Oak Charm in its Deluxe Collection range.","imageUrl":"https://toscaflooring.com/assets/oak%20charm1-Cga-qqXb.webp","imageAlt":"Supplier product image for Tosca Oak Charm","sourceUrl":"https://toscaflooring.com/products/new-40","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection"}},
  {"slug":"tosca-sydney-new-25","name":"Sydney","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Sydney in its Deluxe Collection Bespoke Series range.","imageUrl":"https://toscaflooring.com/assets/sydney1-BSyNwHKb.webp","imageAlt":"Supplier product image for Tosca Sydney","sourceUrl":"https://toscaflooring.com/products/new-25","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection Bespoke Series"}},
  {"slug":"tosca-london-new-26","name":"London","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists London in its Deluxe Collection Bespoke Series range.","imageUrl":"https://toscaflooring.com/assets/london1-BEVivpWF.webp","imageAlt":"Supplier product image for Tosca London","sourceUrl":"https://toscaflooring.com/products/new-26","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection Bespoke Series"}},
  {"slug":"tosca-tokyo-new-27","name":"Tokyo","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Tokyo in its Deluxe Collection Bespoke Series range.","imageUrl":"https://toscaflooring.com/assets/tokyo5-C0wZ2tso.webp","imageAlt":"Supplier product image for Tosca Tokyo","sourceUrl":"https://toscaflooring.com/products/new-27","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection Bespoke Series"}},
  {"slug":"tosca-new-york-new-37","name":"New York","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists New York in its Deluxe Collection Bespoke Series range.","imageUrl":"https://toscaflooring.com/assets/new%20york1-CngBwspU.webp","imageAlt":"Supplier product image for Tosca New York","sourceUrl":"https://toscaflooring.com/products/new-37","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection Bespoke Series"}},
  {"slug":"tosca-san-francisco-new-38","name":"San Francisco","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists San Francisco in its Deluxe Collection Bespoke Series range.","imageUrl":"https://toscaflooring.com/assets/san%20francisco1-D67_KfHh.webp","imageAlt":"Supplier product image for Tosca San Francisco","sourceUrl":"https://toscaflooring.com/products/new-38","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection Bespoke Series"}},
  {"slug":"tosca-cognac-new-39","name":"Cognac","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Cognac in its Deluxe Collection Bespoke Series range.","imageUrl":"https://toscaflooring.com/assets/cognac1-CEW5itsD.webp","imageAlt":"Supplier product image for Tosca Cognac","sourceUrl":"https://toscaflooring.com/products/new-39","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Deluxe Collection Bespoke Series"}},
  {"slug":"tosca-dawn-new-23","name":"Dawn","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Dawn in its Renaissance Collection range.","imageUrl":"https://toscaflooring.com/assets/dhain1-Dw1rZNlX.webp","imageAlt":"Supplier product image for Tosca Dawn","sourceUrl":"https://toscaflooring.com/products/new-23","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Renaissance Collection"}},
  {"slug":"tosca-florence-new-29","name":"Florence","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Florence in its Renaissance Collection range.","imageUrl":"https://toscaflooring.com/assets/florence1-S8dPmIGa.webp","imageAlt":"Supplier product image for Tosca Florence","sourceUrl":"https://toscaflooring.com/products/new-29","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Renaissance Collection"}},
  {"slug":"tosca-moonstone-new-31","name":"Moonstone","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Moonstone in its Renaissance Collection range.","imageUrl":"https://toscaflooring.com/assets/moon%20stone1-Bxvqrsir.webp","imageAlt":"Supplier product image for Tosca Moonstone","sourceUrl":"https://toscaflooring.com/products/new-31","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Renaissance Collection"}},
  {"slug":"tosca-roma-new-33","name":"Roma","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists Roma in its Renaissance Collection range.","imageUrl":"https://toscaflooring.com/assets/roma1-N7_0tCkc.webp","imageAlt":"Supplier product image for Tosca Roma","sourceUrl":"https://toscaflooring.com/products/new-33","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending","specifications":{"Collection":"Renaissance Collection"}},
  {"slug":"tosca-prestige-legacy-3","name":"PRESTIGE","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists PRESTIGE in its Engineered Hardwood range.","imageUrl":"https://toscaflooring.com/assets/prestige-main-1759400715076-B8cbAgxB.webp","imageAlt":"Supplier product image for Tosca PRESTIGE","sourceUrl":"https://toscaflooring.com/products/legacy-3","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending"},
  {"slug":"tosca-glory-legacy-4","name":"GLORY","category":"Engineered Hardwood","supplier":"Tosca","description":"Tosca lists GLORY in its Engineered Hardwood range.","imageUrl":"https://toscaflooring.com/assets/glory-main-1759400717190-CiXLFwjn.webp","imageAlt":"Supplier product image for Tosca GLORY","sourceUrl":"https://toscaflooring.com/products/legacy-4","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending"},
  {"slug":"tosca-18000-legacy-5","name":"18000","category":"Vinyl","supplier":"Tosca","description":"Tosca lists 18000 in its Vinyl range.","imageUrl":"https://toscaflooring.com/assets/spc-floor-1759398780818-Ch5e0nAN.webp","imageAlt":"Supplier product image for Tosca 18000","sourceUrl":"https://toscaflooring.com/products/legacy-5","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending"},
  {"slug":"tosca-3300-legacy-6","name":"3300","category":"Vinyl","supplier":"Tosca","description":"Tosca lists 3300 in its Vinyl range.","imageUrl":"https://toscaflooring.com/assets/3300-main-1759400719924-Uy97Ro4k.webp","imageAlt":"Supplier product image for Tosca 3300","sourceUrl":"https://toscaflooring.com/products/legacy-6","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending"},
  {"slug":"tosca-5600-legacy-7","name":"5600","category":"Vinyl","supplier":"Tosca","description":"Tosca lists 5600 in its Vinyl range.","imageUrl":"https://toscaflooring.com/assets/5600-main-1759400721284-D64RWHNC.webp","imageAlt":"Supplier product image for Tosca 5600","sourceUrl":"https://toscaflooring.com/products/legacy-7","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending"},
  {"slug":"tosca-2600-legacy-8","name":"2600","category":"Vinyl","supplier":"Tosca","description":"Tosca lists 2600 in its Vinyl range.","imageUrl":"https://toscaflooring.com/assets/2600-main-1759400722601-wfvpfYj3.webp","imageAlt":"Supplier product image for Tosca 2600","sourceUrl":"https://toscaflooring.com/products/legacy-8","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending"},
  {"slug":"tosca-17000-legacy-9","name":"17000","category":"Laminate","supplier":"Tosca","description":"Tosca lists 17000 in its Laminate range.","imageUrl":"https://toscaflooring.com/assets/17000-main-1759400724841-DQt2DFLA.webp","imageAlt":"Supplier product image for Tosca 17000","sourceUrl":"https://toscaflooring.com/products/legacy-9","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending"},
  {"slug":"tosca-9900-legacy-10","name":"9900","category":"Laminate","supplier":"Tosca","description":"Tosca lists 9900 in its Laminate range.","imageUrl":"https://toscaflooring.com/assets/9900-main-1759400726264-CossRfTU.webp","imageAlt":"Supplier product image for Tosca 9900","sourceUrl":"https://toscaflooring.com/products/legacy-10","publicationStatus":"draft","imageAuthorizationStatus":"pending","descriptionAuthorizationStatus":"pending"}
];

const existingProducts: Product[] = existingProductRecords.map(product => ({
  ...product,
  publicationStatus: 'published',
  sourceStatus: 'verified',
  ...clientReportedAuthorization
}));

export const products: Product[] = [
  ...existingProducts.filter(product => !toucanLaminateProducts.some(toucan => toucan.sourceUrl === product.sourceUrl)),
  ...supplierProductImports,
  ...toucanLaminateProducts
];

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

export const publishedProducts = products
  .filter(product => isProductPublishable(product) && approvedSupplierNames.has(approvedSupplierAliases[product.supplier] ?? product.supplier))
  .map(product => ({ ...product, supplier: approvedSupplierAliases[product.supplier] ?? product.supplier }));

export const posts = [
  {slug:'is-it-essential-to-hire-a-flooring-installer-for-your-home',title:'Is It Essential to Hire a Flooring Installer for Your Home?',category:'Installation',date:'March 11, 2024',excerpt:'A closer look at when professional installation can protect your investment and help a renovation go smoothly.',image:photo('photo-1600607687939-ce8a6c25118c')},
  {slug:'hardwood-floors-for-ho',title:'How Do Hardwood Floors Impact the Value of Your Home?',category:'Hardwood',date:'March 11, 2024',excerpt:'Explore the long-term appeal of hardwood and the practical choices that matter for your home.',image:photo('photo-1600210492486-724fe5c67fb0')},
  {slug:'vinyl-flooring-basement',title:'Why Do Canadian Homeowners Choose Vinyl Flooring for Basements?',category:'Vinyl',date:'March 11, 2024',excerpt:'Compare water-ready flooring options for below-grade spaces and everyday family use.',image:photo('photo-1600573472591-ee6b68d14c68')},
  {slug:'laminate-vs-vinyl-flooring-choosing-the-ideal-option-for-your-commercial-space',title:'Laminate vs. Vinyl Flooring for Commercial Spaces',category:'Guides',date:'February 27, 2024',excerpt:'Understand durability, maintenance, installation and design differences before you choose.',image:photo('photo-1600566753190-17f0baa2a6c3')}
];
