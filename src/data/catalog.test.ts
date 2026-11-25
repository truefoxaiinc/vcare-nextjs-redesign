import { describe, expect, it } from 'vitest';
import { categories, isProductPublishable, products, publishedProducts, suppliers } from '@/data/catalog';
import { generateStaticParams } from '@/app/products/[slug]/page';
import { generateStaticParams as generateSupplierStaticParams } from '@/app/suppliers/[slug]/page';
import sitemap from '@/app/sitemap';
import { siteUrl } from '@/lib/seo';

describe('flooring supplier mapping', () => {
  it('lists approved suppliers and the additional supplier brands', () => {
    expect(suppliers.map(supplier => supplier.name)).toEqual([
      'Grandeur', 'Tosca', 'Floorsatwork', 'Toucan', 'Simba', 'Wickham',
      'Northernest', 'Sherwood', 'Pangolin', 'Lee Flooring', 'Woden', 'Weiss',
      'Purelux', 'Vidar'
    ]);
    expect(Object.fromEntries(categories.map(category => [category.title, category.suppliers]))).toEqual({
      'Hardwood': ['Wickham', 'Tosca'],
      'Engineered Hardwood': ['Floorsatwork', 'Vidar'],
      'Laminate': ['Toucan', 'Floorsatwork', 'Lee Flooring', 'Vidar'],
      'Vinyl': ['Toucan', 'Floorsatwork', 'Pangolin', 'Lee Flooring']
    });
    expect(suppliers.find(supplier => supplier.name === 'Grandeur')?.categories).toEqual([]);
    expect(suppliers.find(supplier => supplier.name === 'Vidar')?.categories).toEqual(['Engineered Hardwood', 'Laminate', 'Vinyl']);
    expect(suppliers.find(supplier => supplier.name === 'Vidar')?.productListingHref).toBe('/suppliers/vidar');
  });

  it('maps all fourteen supplied supplier logos and keeps unapproved brands out of product publishing', () => {
    const withLogos = suppliers.filter(supplier => supplier.logoPath);
    expect(withLogos).toHaveLength(14);
    expect(withLogos.every(supplier => supplier.logoPath?.startsWith('/images/suppliers/'))).toBe(true);
    expect(suppliers.find(supplier => supplier.name === 'Pangolin')?.logoPath).toContain('Pangol-logo.webp');
    expect(suppliers.find(supplier => supplier.name === 'Woden')?.logoPath).toContain('woodenflooring-logo.avif');
    expect(suppliers.find(supplier => supplier.name === 'Sherwood')?.logoPath).toContain('sharwood-logo.jpeg');
    expect(suppliers.find(supplier => supplier.name === 'Lee Flooring')?.logoPath).toContain('Lee%20Flooring-logo.webp');
    expect(suppliers.find(supplier => supplier.name === 'Purelux')?.logoPath).toContain('Purelux-footer-logo-.png');
    expect(suppliers.find(supplier => supplier.name === 'Purelux')?.logoBackground).toBe('dark');
    expect(suppliers.find(supplier => supplier.name === 'Purelux')?.productCatalogueEnabled).toBe(false);
    expect(suppliers.find(supplier => supplier.name === 'Vidar')?.logoPath).toContain('vidar-logo.png');
    expect(suppliers.find(supplier => supplier.name === 'Vidar')?.productCatalogueEnabled).toBe(true);
    expect(suppliers.find(supplier => supplier.name === 'Purelux')?.categories).toEqual([]);
    expect(publishedProducts.some(product => product.supplier === 'Vidar')).toBe(true);
    expect(publishedProducts.some(product => product.supplier === 'Purelux')).toBe(false);
  });

  it('links Vidar to its published products and floor categories', () => {
    const vidar = suppliers.find(supplier => supplier.name === 'Vidar');
    expect(vidar?.productListingHref).toBe('/suppliers/vidar');
    expect(vidar?.categories).toEqual(['Engineered Hardwood', 'Laminate', 'Vinyl']);
    expect(categories.find(category => category.title === 'Engineered Hardwood')?.suppliers).toContain('Vidar');
    expect(categories.find(category => category.title === 'Laminate')?.suppliers).toContain('Vidar');
    expect(publishedProducts.filter(product => product.supplier === 'Vidar')).toHaveLength(104);
  });

  it('publishes the supplied Grandeur engineered-hardwood collections with their images', () => {
    const grandeurProducts = publishedProducts.filter(product =>
      product.supplier === 'Grandeur' && product.category === 'Engineered Hardwood'
    );

    expect(grandeurProducts.map(product => product.name)).toEqual([
      'Scandinavia', 'Paradise', 'Artisan', 'Ultra', 'Sunshine',
      'Metropolitan', 'Elevation', 'Divine', 'Enterprise', 'Crown Land',
      'Herringbone', 'Elite', 'Regal', 'Regal Plus', 'Atelier'
    ]);
    expect(grandeurProducts.every(product =>
      product.imageUrl?.startsWith('https://grandeurflooring.ca/images/products-collections/') &&
      product.sourceUrl.startsWith('https://grandeurflooring.ca/') &&
      product.imageAuthorizedAt === '2026-11-23' &&
      product.descriptionAuthorizedAt === '2026-11-23' &&
      isProductPublishable(product)
    )).toBe(true);
  });

  it('publishes Grandeur Contemporary as a solid hardwood collection', () => {
    const product = publishedProducts.find(item =>
      item.supplier === 'Grandeur' && item.category === 'Hardwood' && item.name === 'Contemporary'
    );

    expect(product).toMatchObject({
      sourceUrl: 'https://grandeurflooring.ca/contemporary-62.html',
      imageUrl: 'https://grandeurflooring.ca/images/products-collections/contemporary.jpg',
      imageAuthorizedAt: '2026-11-23',
      descriptionAuthorizedAt: '2026-11-23',
      specifications: {
        Collection: 'Contemporary',
        Species: 'Red Oak',
        Dimensions: '4-1/4 in × 3/4 in'
      }
    });
    expect(product && isProductPublishable(product)).toBe(true);
  });

  it('publishes the supplied Grandeur vinyl collections with their images', () => {
    const grandeurProducts = publishedProducts.filter(product =>
      product.supplier === 'Grandeur' &&
      product.category === 'Vinyl' &&
      product.imageUrl?.includes('/images/products-collections/')
    );

    expect(grandeurProducts.map(product => product.name)).toEqual([
      'Atlantic', 'Continental', 'Pacific', 'Anchor 7', 'Wonder 7', 'Inov8',
      'Designer', 'Bliss', 'BEACON', 'Supreme X', 'Essential', 'Entrepreneur',
      'Timeless', 'Ultimate'
    ]);
    expect(grandeurProducts.every(product =>
      product.imageUrl?.startsWith('https://grandeurflooring.ca/images/products-collections/') &&
      product.sourceUrl.startsWith('https://grandeurflooring.ca/') &&
      product.imageAuthorizedAt === '2026-11-23' &&
      product.descriptionAuthorizedAt === '2026-11-23' &&
      isProductPublishable(product)
    )).toBe(true);
  });

  it('uses the supplied product image for Grandeur Canterbury', () => {
    const product = publishedProducts.find(item =>
      item.supplier === 'Grandeur' && item.slug === 'grandeur-canterbury'
    );

    expect(product).toMatchObject({
      sourceUrl: 'https://grandeurflooring.ca/canterbury.html',
      imageUrl: 'https://grandeurflooring.ca/images/products/thumb/canterbury-491550.jpg',
      imageAuthorizedAt: '2026-11-23',
      descriptionAuthorizedAt: '2026-11-23'
    });
    expect(product && isProductPublishable(product)).toBe(true);
  });

  it('uses the supplied product image for Grandeur Golden Bay', () => {
    const product = publishedProducts.find(item =>
      item.supplier === 'Grandeur' && item.slug === 'grandeur-golden-bay'
    );

    expect(product).toMatchObject({
      sourceUrl: 'https://grandeurflooring.ca/golden-bay.html',
      imageUrl: 'https://grandeurflooring.ca/images/products/thumb/golden-bay.jpg',
      imageAuthorizedAt: '2026-11-23',
      descriptionAuthorizedAt: '2026-11-23'
    });
    expect(product && isProductPublishable(product)).toBe(true);
  });

  it('uses the supplied product image for Grandeur Queenstown', () => {
    const product = publishedProducts.find(item =>
      item.supplier === 'Grandeur' && item.slug === 'grandeur-queenstown'
    );

    expect(product).toMatchObject({
      sourceUrl: 'https://grandeurflooring.ca/queenstown.html',
      imageUrl: 'https://grandeurflooring.ca/images/products/thumb/queenstown.jpg',
      imageAuthorizedAt: '2026-11-23',
      descriptionAuthorizedAt: '2026-11-23'
    });
    expect(product && isProductPublishable(product)).toBe(true);
  });

  it('uses the supplied product image for Grandeur 88006-2', () => {
    const product = publishedProducts.find(item =>
      item.supplier === 'Grandeur' && item.slug === 'grandeur-88006-2'
    );

    expect(product).toMatchObject({
      sourceUrl: 'https://grandeurflooring.ca/88006-2.html',
      imageUrl: 'https://grandeurflooring.ca/images/products/thumb/88006-2-103521.jpg',
      imageAuthorizedAt: '2026-11-23',
      descriptionAuthorizedAt: '2026-11-23'
    });
    expect(product && isProductPublishable(product)).toBe(true);
  });

  it('publishes the supplied images for all Simba SPC products', () => {
    const simbaSpcImages: Record<string, string> = {
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
    const products = publishedProducts.filter(product =>
      product.supplier === 'Simba' && product.category === 'Vinyl' && product.specifications?.Construction === 'SPC'
    );

    expect(Object.fromEntries(products.map(product => [product.name, product.imageUrl]))).toEqual(simbaSpcImages);
    expect(products.every(product =>
      product.imageAuthorizedAt === '2026-11-23' &&
      product.descriptionAuthorizedAt === '2026-11-23' &&
      isProductPublishable(product)
    )).toBe(true);
  });

  it('adds the water-resistant laminate details and image to all six Simba SKUs', () => {
    const products = publishedProducts.filter(product =>
      product.supplier === 'Simba' && product.category === 'Laminate'
    );

    expect(products.map(product => product.name)).toEqual(['00306', '2024', '20360', '2052', '2055', '20860']);
    expect(products.filter(product =>
      product.name !== '2024' && product.name !== '2052' && product.name !== '20360' &&
      product.name !== '20860' && product.name !== '2055'
    ).every(product =>
      product.imageUrl === 'https://simbaflooringcorp.com/wp-content/uploads/2026/10/PHOTO-2026-10-15-20-51-56.jpg' &&
      product.description.includes('14 mm total thickness') &&
      product.specifications?.Collection === 'Water Resistant Laminate Collection' &&
      product.specifications.Construction === '12 mm rigid core + 2 mm attached underlay' &&
      product.specifications['Total thickness'] === '14 mm' &&
      product.specifications['Water resistance'] === 'Water-resistant' &&
      product.imageAuthorizedAt === '2026-11-23' &&
      product.descriptionAuthorizedAt === '2026-11-23' &&
      isProductPublishable(product)
    )).toBe(true);

    const simba2024 = products.find(product => product.name === '2024');
    expect(simba2024?.imageUrl).toBe('https://simbaflooringcorp.com/wp-content/uploads/2021/03/2024.jpg');
    expect(simba2024?.imageAlt).toBe('Simba 2024 AC4 waterproof laminate flooring');
    expect(simba2024?.description).toContain('AC4 waterproof laminate');
    expect(simba2024?.specifications).toMatchObject({
      'Wear class': 'AC4',
      'Water resistance': 'Waterproof',
      'Recommended use': 'Residential and light commercial',
      'Surface durability': 'Resists scratches, dents, and fading'
    });
    expect(simba2024?.imageAuthorizationReference).toContain('Simba 2024');
    expect(simba2024 && isProductPublishable(simba2024)).toBe(true);

    const simba2052 = products.find(product => product.name === '2052');
    expect(simba2052?.imageUrl).toBe('https://simbaflooringcorp.com/wp-content/uploads/2021/03/2025.jpg');
    expect(simba2052?.imageAlt).toBe('Simba 2052 AC4 waterproof laminate flooring');
    expect(simba2052?.description).toContain('AC4 waterproof laminate');
    expect(simba2052?.specifications).toMatchObject({
      'Wear class': 'AC4',
      'Water resistance': 'Waterproof',
      'Recommended use': 'Residential and light commercial',
      'Surface durability': 'Resists scratches, dents, and fading'
    });
    expect(simba2052?.imageAuthorizationReference).toContain('Simba 2052');
    expect(simba2052 && isProductPublishable(simba2052)).toBe(true);

    const simba20360 = products.find(product => product.name === '20360');
    expect(simba20360?.imageUrl).toBe('https://simbaflooringcorp.com/wp-content/uploads/2021/12/20360-scaled.jpg');
    expect(simba20360?.imageAlt).toBe('Simba 20360 AC4 waterproof laminate flooring');
    expect(simba20360?.sourceUrl).toBe('https://simbaflooringcorp.com/product-category/waterproof-laminate/');
    expect(simba20360?.description).toContain('AC4 waterproof laminate');
    expect(simba20360?.specifications).toMatchObject({
      'Wear class': 'AC4',
      'Water resistance': 'Waterproof',
      'Recommended use': 'Residential and light commercial',
      'Surface durability': 'Resists scratches, dents, and fading'
    });
    expect(simba20360?.imageAuthorizationReference).toContain('Simba 20360');
    expect(simba20360 && isProductPublishable(simba20360)).toBe(true);

    const simba20860 = products.find(product => product.name === '20860');
    expect(simba20860?.imageUrl).toBe('https://simbaflooringcorp.com/wp-content/uploads/2021/12/20860-scaled.jpg');
    expect(simba20860?.imageAlt).toBe('Simba 20860 AC4 waterproof laminate flooring');
    expect(simba20860?.sourceUrl).toBe('https://simbaflooringcorp.com/product-category/waterproof-laminate/');
    expect(simba20860?.description).toContain('AC4 waterproof laminate');
    expect(simba20860?.specifications).toMatchObject({
      'Wear class': 'AC4',
      'Water resistance': 'Waterproof',
      'Recommended use': 'Residential and light commercial',
      'Surface durability': 'Resists scratches, dents, and fading'
    });
    expect(simba20860?.imageAuthorizationReference).toContain('Simba 20860');
    expect(simba20860 && isProductPublishable(simba20860)).toBe(true);

    const simba2055 = products.find(product => product.name === '2055');
    expect(simba2055?.imageUrl).toBe('https://simbaflooringcorp.com/wp-content/uploads/2021/03/2055.jpg');
    expect(simba2055?.imageAlt).toBe('Simba 2055 AC4 waterproof laminate flooring');
    expect(simba2055?.sourceUrl).toBe('https://simbaflooringcorp.com/product-category/waterproof-laminate/');
    expect(simba2055?.description).toContain('AC4 waterproof laminate');
    expect(simba2055?.specifications).toMatchObject({
      'Wear class': 'AC4',
      'Water resistance': 'Waterproof',
      'Recommended use': 'Residential and light commercial',
      'Surface durability': 'Resists scratches, dents, and fading'
    });
    expect(simba2055?.imageAuthorizationReference).toContain('Simba 2055');
    expect(simba2055 && isProductPublishable(simba2055)).toBe(true);
  });

  it('uses the supplied images for Northernest Coastal products', () => {
    const images = {
      'Pure Walnut': 'https://northernestflooring.ca/wp-content/uploads/2026/01/PURE-WALNUT-2.jpg',
      Nappa: 'https://northernestflooring.ca/wp-content/uploads/2026/01/NAPPA-3.jpg',
      Monaco: 'https://northernestflooring.ca/wp-content/uploads/2026/01/Monaco-2.jpg',
      Element: 'https://northernestflooring.ca/wp-content/uploads/2025/10/ELEMENT-1.jpg',
      Celeste: 'https://northernestflooring.ca/wp-content/uploads/2025/10/CELESTE-2.jpg',
      Belize: 'https://northernestflooring.ca/wp-content/uploads/2025/10/Belize-1-450x225.jpg'
    };
    const products = publishedProducts.filter(product =>
      product.supplier === 'Northernest' && product.category === 'Engineered Hardwood'
    );

    expect(products).toHaveLength(7);
    for (const [name, imageUrl] of Object.entries(images)) {
      const product = products.find(item => item.name === name);
      expect(product?.imageUrl).toBe(imageUrl);
      expect(product?.imageAuthorizationStatus).toBe('approved');
      expect(product?.imageAuthorizedAt).toBe('2026-11-23');
      expect(product?.imageAuthorizationReference).toContain('Northernest Coastal');
      expect(product && isProductPublishable(product)).toBe(true);
    }

    expect(products.find(product => product.name === 'Warm Beechwood')?.imageUrl).toBe(
      'https://northernestflooring.ca/wp-content/uploads/2026/01/WARM-BEECHWOOD-View-1-2.jpg'
    );
  });

  it('uses the supplied Mist image for the existing Pangolin PS106 SKU', () => {
    const matching = products.filter(product => product.supplier === 'Pangolin' && product.specifications?.SKU === 'PS106');
    expect(matching).toHaveLength(1);
    expect(matching[0]).toMatchObject({
      slug: 'pangolin-origin-collection-spc-ps106',
      name: 'Origin Collection SPC - 7MM PS106 Mist',
      imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS106%E6%8B%BC%E8%A3%85.jpg/:/rs=w:1438,h:2425',
      specifications: { SKU: 'PS106', Colour: 'Mist', Thickness: '7 mm', Underlay: '1.5 mm IXPE' },
      imageAuthorizationStatus: 'approved',
      imageAuthorizedAt: '2026-11-23'
    });
    expect(matching[0] && isProductPublishable(matching[0])).toBe(true);
  });

  it('maps all eight Weiss Premier Laminate images to existing products', () => {
    const images = {
      'Aube': 'https://static.wixstatic.com/media/084e8e_f03d4f57a4034376a3ad07e3baa11535~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/aube%202008-7A%20%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Citadel': 'https://static.wixstatic.com/media/084e8e_66430cd7af8b4a7687f7362e767d2d00~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/citadel%2091225-13%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Eclipse': 'https://static.wixstatic.com/media/084e8e_a3d5d3bb749346d087578f1803000d10~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/eclipse%202183-7B%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Horizon': 'https://static.wixstatic.com/media/084e8e_84966b8f0ad04acb9dda295cd756804c~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/HORIZON%201906-19%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Meridian': 'https://static.wixstatic.com/media/084e8e_3fad53921a8540d18545df5a4fa46be1~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/meridian%2021117-20%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Savage': 'https://static.wixstatic.com/media/084e8e_5aa3e9f3d95945c09d23d23dc729b7fa~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/sauvage%2021118-5%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Titanium': 'https://static.wixstatic.com/media/084e8e_94a2af4a648d49f694e8546428897487~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/titanium%201905-4%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Zenith': 'https://static.wixstatic.com/media/084e8e_5ea1ee889c5d437cab4cd00d28672172~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/zenith%201703-1%E9%93%BA%E8%A3%85%E5%9B%BE.jpg'
    };
    for (const [name, imageUrl] of Object.entries(images)) {
      const matching = products.filter(product => product.supplier === 'Weiss' && product.category === 'Laminate' && product.name === name);
      expect(matching).toHaveLength(1);
      expect(matching[0].slug).toBe(`weiss-${name.toLowerCase().replace(/ /g, '-')}`);
      expect(matching[0].imageUrl).toBe(imageUrl);
      expect(matching[0].imageAlt).toBe(`Supplier product image for Weiss ${name}`);
      expect(matching[0].specifications).toMatchObject({ 'Product line': 'Premier laminate' });
      expect(isProductPublishable(matching[0])).toBe(true);
    }
    const weissLaminate = products.filter(product => product.supplier === 'Weiss' && product.category === 'Laminate' && product.specifications['Product line'] === 'Premier laminate');
    expect(weissLaminate).toHaveLength(8);
    expect(weissLaminate.every(product => Boolean(product.imageUrl))).toBe(true);
  });

  it('maps final eight Weiss SPC vinyl images and completes image coverage', () => {
    const images = {
      'Bora': 'https://static.wixstatic.com/media/084e8e_b88cca64c3fb4c46b759aad11410ea7f~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Bora%20Layout.jpg',
      'Copacabana': 'https://static.wixstatic.com/media/084e8e_0b8cb3f08cc2431f89c51a2d57395235~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Copacabana%20Layout.jpg',
      'Hanalei': 'https://static.wixstatic.com/media/084e8e_db7f3388875c44ed93ce7e94964682a3~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Hanalei%20Layout.jpg',
      'Lanikai': 'https://static.wixstatic.com/media/084e8e_731ea794be1b454c940813f2fdba4439~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Lanikai%20Layout.jpg',
      'Siesta': 'https://static.wixstatic.com/media/084e8e_1ebdb39b72814c899eced11429ce7dbe~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Siesta%20Layout%20(2).jpg',
      'Trunk Bay': 'https://static.wixstatic.com/media/084e8e_afb855f90a4b451fbf0c25aff2f47126~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Trunk%20Bay%20Layout.jpg',
      'Varadero': 'https://static.wixstatic.com/media/084e8e_60a6136bdcb5442784a53e0929e1e8cb~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Varadero%20Layout.jpg',
      'Wasaga': 'https://static.wixstatic.com/media/084e8e_b8eefa2b70714ad6a54f15b746766a4e~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Wasaga%20Layout.jpg'
    };
    for (const [name, imageUrl] of Object.entries(images)) {
      const matching = products.filter(product => product.supplier === 'Weiss' && product.category === 'Vinyl' && product.name === name);
      expect(matching).toHaveLength(1);
      expect(matching[0].slug).toBe(`weiss-${name.toLowerCase().replace(/ /g, '-')}`);
      expect(matching[0].imageUrl).toBe(imageUrl);
      expect(matching[0].imageAlt).toBe(`Supplier product image for Weiss ${name}`);
      expect(matching[0].specifications).toMatchObject({ 'Product line': 'SPC vinyl' });
      expect(isProductPublishable(matching[0])).toBe(true);
    }
    const weissSpc = products.filter(product => product.supplier === 'Weiss' && product.category === 'Vinyl' && product.specifications['Product line'] === 'SPC vinyl');
    expect(weissSpc).toHaveLength(22);
    expect(weissSpc.every(product => Boolean(product.imageUrl))).toBe(true);
  });

  it('maps five more Weiss SPC vinyl images without changing product details', () => {
    const images = {
      'American Walnut': 'https://static.wixstatic.com/media/084e8e_a9bb5cf871e44fedb495e244cd5d6eba~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/American%20Walnut%20%20Layout.jpg',
      'Caviar': 'https://static.wixstatic.com/media/084e8e_d690634d8f98443696daf2ad7aaef6c9~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Caviar%20Layout.jpg',
      'Cinnabar': 'https://static.wixstatic.com/media/084e8e_1962d338dbe544bb9dd6c2011e143f2d~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Cinnabar%20Layout.jpg',
      'Tan': 'https://static.wixstatic.com/media/084e8e_5e5fda1580ad4ee686722dddcaa33cee~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Tan%20Layout.jpg',
      'Vega': 'https://static.wixstatic.com/media/084e8e_2a8a0d0a1119406f9daca11028b5726f~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Vega%20Layout.jpg'
    };
    for (const [name, imageUrl] of Object.entries(images)) {
      const matching = products.filter(product => product.supplier === 'Weiss' && product.category === 'Vinyl' && product.name === name);
      expect(matching).toHaveLength(1);
      expect(matching[0].slug).toBe(`weiss-${name.toLowerCase().replace(/ /g, '-')}`);
      expect(matching[0].imageUrl).toBe(imageUrl);
      expect(matching[0].imageAlt).toBe(`Supplier product image for Weiss ${name}`);
      expect(matching[0].specifications).toMatchObject({ 'Product line': 'SPC vinyl' });
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('maps Weiss Sable Fog Reef and Coral SPC vinyl images', () => {
    const images = {
      'Sable': 'https://static.wixstatic.com/media/084e8e_af46c4cf3c2a4302a8e7db5f85a1eff0~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Sable%20Layout.jpg',
      'Fog': 'https://static.wixstatic.com/media/084e8e_ad201263964445a997d7c795fad66cd0~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Fog%20Layout.jpg',
      'Reef': 'https://static.wixstatic.com/media/084e8e_63731184224048479940dae2ff10d790~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Reef%20Layout.jpg',
      'Coral': 'https://static.wixstatic.com/media/084e8e_d7137610c35c47b896fd43623588b396~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Coral%20Layout.jpg'
    };
    for (const [name, imageUrl] of Object.entries(images)) {
      const matching = products.filter(product => product.supplier === 'Weiss' && product.category === 'Vinyl' && product.name === name);
      expect(matching).toHaveLength(1);
      expect(matching[0].slug).toBe(`weiss-${name.toLowerCase().replace(/ /g, '-')}`);
      expect(matching[0].imageUrl).toBe(imageUrl);
      expect(matching[0].imageAlt).toBe(`Supplier product image for Weiss ${name}`);
      expect(matching[0].specifications).toMatchObject({ 'Product line': 'SPC vinyl' });
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('maps five supplied Weiss SPC vinyl images to existing vinyl products', () => {
    const images = {
      'Venus': 'https://static.wixstatic.com/media/084e8e_0905f994ecd747c583a9733b76bf5da5~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Venus2.jpg',
      'Havenest': 'https://static.wixstatic.com/media/084e8e_5f4f875111fa4dc68c7147f93e43ac08~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Havenest1.jpg',
      'Driftwood': 'https://static.wixstatic.com/media/084e8e_118bfb9b8a664ef996a5b3ec48ad4fa7~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Driftwood2.jpg',
      'Boltique': 'https://static.wixstatic.com/media/084e8e_0cc0cb76dce64648bcf2c1d871a6beee~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Boltique2.jpg',
      'Covehaus': 'https://static.wixstatic.com/media/084e8e_b25b9dfe295c43e0a534245fed05e292~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Covehaus1.jpg'
    };
    for (const [name, imageUrl] of Object.entries(images)) {
      const matching = products.filter(product => product.supplier === 'Weiss' && product.category === 'Vinyl' && product.name === name);
      expect(matching).toHaveLength(1);
      expect(matching[0].slug).toBe(`weiss-${name.toLowerCase().replace(/ /g, '-')}`);
      expect(matching[0].imageUrl).toBe(imageUrl);
      expect(matching[0].imageAlt).toBe(`Supplier product image for Weiss ${name}`);
      expect(matching[0].specifications).toMatchObject({ 'Product line': 'SPC vinyl' });
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('maps final five Weiss engineered hardwood images to existing products', () => {
    const images = {
      'Toffee': 'https://static.wixstatic.com/media/084e8e_73c8ca37dd304ab7b71f85490407f63a~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Toffee%20%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
      'Cream': 'https://static.wixstatic.com/media/084e8e_af08f38613324ea6a6897277b4f607ff~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Cream%20%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Pewter': 'https://static.wixstatic.com/media/084e8e_98f2e03acc8f4f3bbed5987a2ffaabcd~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pewter%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
      'Penny': 'https://static.wixstatic.com/media/084e8e_b327d16309ee4f2683e7234c9c6cb099~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Penny%20%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
      'Coconut': 'https://static.wixstatic.com/media/084e8e_e8f2380d6b8248b09f14707efa6cda58~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Coconut%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg'
    };
    for (const [name, imageUrl] of Object.entries(images)) {
      const matching = products.filter(product => product.supplier === 'Weiss' && product.category === 'Engineered Hardwood' && product.name === name);
      expect(matching).toHaveLength(1);
      expect(matching[0].slug).toBe(`weiss-${name.toLowerCase().replace(/ /g, '-')}`);
      expect(matching[0].imageUrl).toBe(imageUrl);
      expect(matching[0].imageAlt).toBe(`Supplier product image for Weiss ${name}`);
      expect(matching[0].specifications).toMatchObject({ 'Product line': 'Engineered hardwood' });
      expect(isProductPublishable(matching[0])).toBe(true);
    }
    expect(products.filter(product => product.supplier === 'Weiss' && product.category === 'Engineered Hardwood' && !product.imageUrl)).toHaveLength(0);
  });

  it('maps six Weiss hickory maple and ash images to existing engineered products', () => {
    const images = {
      'Hickory Walnut': 'https://static.wixstatic.com/media/084e8e_71c57dbb11e2401eaf507dd5344f0771~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/hickory%20Walnut%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Pure Hickory': 'https://static.wixstatic.com/media/084e8e_bf2fc4e5dc9749ed8ae7edc959b0d294~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/hickory%20Pure%20Hickory%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Cottage Maple': 'https://static.wixstatic.com/media/084e8e_c31444d0f7c64e458cb30ce8c7815c02~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Cottage%20Maple%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Original Maple': 'https://static.wixstatic.com/media/084e8e_0aad406ac7454124a6b1d8047adc9b8b~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/original%20maple%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Ash Toffee': 'https://static.wixstatic.com/media/084e8e_cfd07e838edb45858ad8ed25857aaa2d~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/ash%20Toffee%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Ash Natural': 'https://static.wixstatic.com/media/084e8e_0a9bf53d19a84e9a9da8e25230fa7b30~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/ash%20Natural%E9%93%BA%E8%A3%85%E5%9B%BE.jpg'
    };
    for (const [name, imageUrl] of Object.entries(images)) {
      const matching = products.filter(product => product.supplier === 'Weiss' && product.category === 'Engineered Hardwood' && product.name === name);
      expect(matching).toHaveLength(1);
      expect(matching[0].slug).toBe(`weiss-${name.toLowerCase().replace(/ /g, '-')}`);
      expect(matching[0].imageUrl).toBe(imageUrl);
      expect(matching[0].imageAlt).toBe(`Supplier product image for Weiss ${name}`);
      expect(matching[0].specifications).toMatchObject({ 'Product line': 'Engineered hardwood' });
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('maps six more Weiss engineered hardwood images without duplicate products', () => {
    const images = {
      'Silvery Gray': 'https://static.wixstatic.com/media/084e8e_97339703f0cf42c5a67408ca5a214b3d~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Silver%20Gray%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Saffron': 'https://static.wixstatic.com/media/084e8e_ddf710d642b6476780be7c7a709d1fa9~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Saffron%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
      'Seashell': 'https://static.wixstatic.com/media/084e8e_facc4dd4de824836985b3ade527f9ad7~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Seashell%20%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
      'Sandy Brown': 'https://static.wixstatic.com/media/084e8e_6744958d9635405ba7fbdb5a40195652~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Sandy%20Brown%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Raw': 'https://static.wixstatic.com/media/084e8e_2f4f6b01a0124fb9a0592a8b0a64cf67~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Raw%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Fortino': 'https://static.wixstatic.com/media/084e8e_d82bbd8da3a14e67ab95f6706e4cf029~mv2.jpg/v1/fill/w_211,h_211,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Fortino%E9%93%BA%E8%A3%85%E5%9B%BE.jpg'
    };
    for (const [name, imageUrl] of Object.entries(images)) {
      const matching = products.filter(product => product.supplier === 'Weiss' && product.category === 'Engineered Hardwood' && product.name === name);
      expect(matching).toHaveLength(1);
      expect(matching[0].slug).toBe(`weiss-${name.toLowerCase().replace(/ /g, '-')}`);
      expect(matching[0].imageUrl).toBe(imageUrl);
      expect(matching[0].imageAlt).toBe(`Supplier product image for Weiss ${name}`);
      expect(matching[0].specifications).toMatchObject({ 'Product line': 'Engineered hardwood' });
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('maps eight supplied Weiss engineered hardwood images to existing products', () => {
    const images = {
      'Golden Oak': 'https://static.wixstatic.com/media/084e8e_2f739ae6107c470b96f47cef6986d66e~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/golden%20oak%E9%93%BA%E8%A3%85%E5%9B%BE.jpg',
      'Dijon': 'https://static.wixstatic.com/media/084e8e_72850b973d444498af6ff855467a88e5~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Dijon%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
      'Mocha': 'https://static.wixstatic.com/media/084e8e_f1782e3bc6934c47a2df951bed6af348~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Mocha%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
      'Pebble': 'https://static.wixstatic.com/media/084e8e_13fc62508142418fb8bf0a80fbe4c688~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Pebble%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
      'Caramel': 'https://static.wixstatic.com/media/084e8e_862772a8c6804e1585e12bcf11bc05ce~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Caramel%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
      'Vanilla': 'https://static.wixstatic.com/media/084e8e_53111b50d6fb4324a3edfcd9ff7d884f~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Vanilla%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
      'Sand': 'https://static.wixstatic.com/media/084e8e_24ae04627aa14eaa843341934b907182~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Sand%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg',
      'Amber': 'https://static.wixstatic.com/media/084e8e_164784e3747049d5bf53386aae79b065~mv2.jpg/v1/fill/w_293,h_291,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Amber%E9%93%BA%E8%A3%85%E5%9B%BE_JPG.jpg'
    };
    for (const [name, imageUrl] of Object.entries(images)) {
      const matching = products.filter(product => product.supplier === 'Weiss' && product.category === 'Engineered Hardwood' && product.name === name);
      expect(matching).toHaveLength(1);
      expect(matching[0].slug).toBe(`weiss-${name.toLowerCase().replace(/ /g, '-')}`);
      expect(matching[0].imageUrl).toBe(imageUrl);
      expect(matching[0].imageAlt).toBe(`Supplier product image for Weiss ${name}`);
      expect(matching[0].specifications).toMatchObject({ 'Product line': 'Engineered hardwood' });
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });




  it('maps the supplied PS123 Biscuit and PS124 Mocha images without duplicating SKUs', () => {
    const variants = {
      PS123: { name: 'Origin Collection SPC - 8MM PS123 Biscuit', colour: 'Biscuit', imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS123%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1867' },
      PS124: { name: 'Origin Collection SPC - 8MM PS124 Mocha', colour: 'Mocha', imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS124%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:719,h:1007' }
    };
    for (const [sku, variant] of Object.entries(variants)) {
      const matching = products.filter(product => product.supplier === 'Pangolin' && product.specifications?.SKU === sku);
      expect(matching).toHaveLength(1);
      const product = matching[0];
      expect(product.slug).toBe(`pangolin-origin-collection-spc-${sku.toLowerCase()}`);
      expect(product.name).toBe(variant.name);
      expect(product.imageUrl).toBe(variant.imageUrl);
      expect(product.specifications).toMatchObject({ SKU: sku, Colour: variant.colour, Thickness: '8 mm', Underlay: '2.0 mm EVA' });
      expect(product.imageAuthorizationStatus).toBe('approved');
      expect(product.imageAuthorizedAt).toBe('2026-11-23');
      expect(product.descriptionAuthorizedAt).toBe('2026-11-23');
      expect(isProductPublishable(product)).toBe(true);
    }
  });

  it('maps eight supplied Pangolin variants without changing existing SKU slugs', () => {
    const variants = {
      PS107: { name: 'Origin Collection SPC - 7MM PS107 Oatmeal', colour: 'Oatmeal', thickness: '7 mm', imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS107%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1853' },
      PS109: { name: 'Origin Collection SPC - 7MM PS109 Dove', colour: 'Dove', thickness: '7 mm', imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS109%E5%BD%A9%E8%86%9C%E5%9B%BE.png/:/rs=w:719,h:859' },
      PS110: { name: 'Origin Collection SPC - 8MM PS110 Fawn', colour: 'Fawn', thickness: '8 mm', imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS110%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1854' },
      PS111: { name: 'Origin Collection SPC - 8MM PS111 Flint', colour: 'Flint', thickness: '8 mm', imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS111%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1854' },
      PS112: { name: 'Origin Collection SPC - 8MM PS112 Palomino', colour: 'Palomino', thickness: '8 mm', imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS112%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1855' },
      PS114: { name: 'Origin Collection SPC - 8MM PS114 Chamois', colour: 'Chamois', thickness: '8 mm', imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS114%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1866' },
      PS121: { name: 'Origin Collection SPC - 8MM PS121 Almond', colour: 'Almond', thickness: '8 mm', imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS121%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1866' },
      PS122: { name: 'Origin Collection SPC - 8MM PS122 Tobac', colour: 'Tobac', thickness: '8 mm', imageUrl: 'https://img1.wsimg.com/isteam/ip/55c0572d-d847-4f6a-9d85-8c297ad4e5fb/PS122%E5%BD%A9%E8%86%9C%E5%9B%BE.jpg/:/rs=w:1438,h:1863' }
    };
    for (const [sku, variant] of Object.entries(variants)) {
      const matching = products.filter(product => product.supplier === 'Pangolin' && product.specifications?.SKU === sku);
      expect(matching).toHaveLength(1);
      const product = matching[0];
      expect(product.slug).toBe(`pangolin-origin-collection-spc-${sku.toLowerCase()}`);
      expect(product.name).toBe(variant.name);
      expect(product.imageUrl).toBe(variant.imageUrl);
      expect(product.specifications).toMatchObject({ Colour: variant.colour, Thickness: variant.thickness });
      expect(product.imageAuthorizationStatus).toBe('approved');
      expect(product.imageAuthorizedAt).toBe('2026-11-23');
      expect(product.descriptionAuthorizedAt).toBe('2026-11-23');
      expect(isProductPublishable(product)).toBe(true);
    }
  });

  it('uses the supplied images and variant names for Pangolin Origin SPC PS101-PS105', () => {
    const variants = {
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
    };
    const products = publishedProducts.filter(product =>
      product.supplier === 'Pangolin' && product.category === 'Vinyl'
    );

    expect(products).toHaveLength(16);
    for (const [sku, variant] of Object.entries(variants)) {
      const product = products.find(item => item.specifications?.SKU === sku);
      expect(product?.name).toBe(variant.name);
      expect(product?.slug).toBe(`pangolin-origin-collection-spc-${sku.toLowerCase()}`);
      expect(product?.imageUrl).toBe(variant.imageUrl);
      expect(product?.specifications?.Colour).toBe(variant.colour);
      expect(product?.imageAuthorizedAt).toBe('2026-11-23');
      expect(product?.descriptionAuthorizedAt).toBe('2026-11-23');
      expect(product && isProductPublishable(product)).toBe(true);
    }
  });

  it('updates the Grandeur laminate collection records with the supplied images', () => {
    const grandeurLaminateProducts = publishedProducts.filter(product =>
      product.supplier === 'Grandeur' && product.category === 'Laminate'
    );

    expect(grandeurLaminateProducts.map(product => product.name)).toEqual([
      'Arles Natural', 'Fado Gavia', 'Fado Sotavento', 'Kalas Albar', 'Kalmar Gris',
      'Kalas Noz', 'Roble Twilight', 'Viena Dorado', 'Wexford Tostado'
    ]);
    expect(grandeurLaminateProducts.every(product =>
      product.imageUrl?.includes('grandeurflooring.ca/images/products/thumb/') &&
      product.sourceUrl.startsWith('https://grandeurflooring.ca/') &&
      product.specifications?.Collection === '12 Collection' &&
      product.specifications['Abrasion rating'] === 'AC6' &&
      product.imageAuthorizedAt === '2026-11-23' &&
      product.descriptionAuthorizedAt === '2026-11-23' &&
      isProductPublishable(product)
    )).toBe(true);
  });

  it('creates a product route for every supplier', () => {
    expect(new Set(suppliers.map(supplier => supplier.slug)).size).toBe(suppliers.length);
    expect(suppliers.every(supplier => supplier.productListingHref === '/suppliers/' + supplier.slug)).toBe(true);
    expect(generateSupplierStaticParams()).toEqual(suppliers.map(supplier => ({ slug: supplier.slug })));
  });

  it('imports five unique Lee solid hardwood products', () => {
    const variants = [
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
    }
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
    }
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
    }
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
    }
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
    }
  }
];
    for (const variant of variants) {
      const matching = products.filter(product => product.supplier === 'Lee Flooring' && product.category === 'Hardwood' && product.sourceUrl === variant.sourceUrl);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject(variant);
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('imports twenty-five Lee Premium Engineered, Heritage Hills and Solvara products', () => {
    const variants = [
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  }
];
    for (const variant of variants) {
      const matching = products.filter(product => product.supplier === 'Lee Flooring' && product.category === 'Engineered Hardwood' && product.sourceUrl === variant.sourceUrl);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject(variant);
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('imports sixteen distinct Lee Hybrid Engineered products by product URL rather than repeated SKU', () => {
    const variants = [
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  }
];
    for (const variant of variants) {
      const matching = products.filter(product => product.supplier === 'Lee Flooring' && product.category === 'Engineered Hardwood' && product.sourceUrl === variant.sourceUrl);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject(variant);
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('imports 120 unique Woden products with supplier URLs and specifications', () => {
    const woden = products.filter(product => product.supplier === 'Woden');
    expect(woden).toHaveLength(120);
    expect(new Set(woden.map(product => product.slug)).size).toBe(120);
    expect(new Set(woden.map(product => product.sourceUrl)).size).toBe(120);
    expect(woden.every(product => product.sourceUrl.startsWith('https://www.wodenflooring.com/product-page/') && product.imageUrl?.startsWith('https://static.wixstatic.com/media/') && product.specifications?.Collection)).toBe(true);
    expect(woden.filter(product => product.category === 'Engineered Hardwood')).toHaveLength(49);
    expect(woden.filter(product => product.category === 'Vinyl')).toHaveLength(65);
    expect(woden.filter(product => product.category === 'Laminate')).toHaveLength(6);
  });

  it('imports seven East of Canada Vidar SPC vinyl products', () => {
    const variants = [
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
];
    for (const variant of variants) {
      const matching = products.filter(product => product.supplier === 'Vidar' && product.category === 'Vinyl' && product.name === variant.name);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject(variant);
      expect(isProductPublishable(matching[0])).toBe(true);
    }
    expect(categories.find(category => category.title === 'Vinyl')?.suppliers).toContain('Vidar');
  });

  it('adds Seattle regional information to six existing Vidar products without duplicates', () => {
    const variants = [
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
    for (const variant of variants) {
      const matching = products.filter(product => product.supplier === 'Vidar' && product.category === 'Engineered Hardwood' && product.name === variant.name);
      expect(matching).toHaveLength(1);
      expect(matching[0].specifications?.Region).toContain('Seattle');
      expect(matching[0].specifications?.['Seattle image']).toBe(variant.imageUrl);
      expect(matching[0].specifications?.['Seattle product page']).toBe(variant.sourceUrl);
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('maps all fifteen West of Canada listings without duplicate variants', () => {
    const variants = [
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
    for (const [index, variant] of variants.entries()) {
      const matching = products.filter(product => product.supplier === 'Vidar' && product.category === 'Engineered Hardwood' && product.name === variant.name);
      expect(matching).toHaveLength(1);
      expect(matching[0].specifications?.Region).toContain('West of Canada');
      if ([1, 3, 5, 9, 12, 13].includes(index)) {
        expect(matching[0]).toMatchObject({ ...variant, specifications: { ...variant.specifications, Region: matching[0].specifications?.Region } });
      } else {
        expect(matching[0].specifications?.['West of Canada image']).toBe(variant.imageUrl);
        expect(matching[0].specifications?.['West of Canada product page']).toBe(variant.sourceUrl);
      }
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('imports six Vidar White Ash and Versailles listings', () => {
    const variants = [
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
];
    for (const variant of variants) {
      const matching = products.filter(product => product.supplier === 'Vidar' && product.category === 'Engineered Hardwood' && product.name === variant.name);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject(variant);
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('imports fifteen Vidar European White Ash 6 and 7 listings', () => {
    const variants = [
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
  }
];
    for (const variant of variants) {
      const matching = products.filter(product => product.supplier === 'Vidar' && product.category === 'Engineered Hardwood' && product.name === variant.name);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject(variant);
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('imports fifteen additional Vidar American Oak, Black Walnut and European Oak listings', () => {
    const variants = [
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
  }
];
    for (const variant of variants) {
      const matching = products.filter(product => product.supplier === 'Vidar' && product.category === 'Engineered Hardwood' && product.name === variant.name);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject(variant);
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('imports fifteen additional Vidar Oak 7, Oak 9 and Click 5 listings', () => {
    const variants = [
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
  }
];
    for (const variant of variants) {
      const matching = products.filter(product => product.supplier === 'Vidar' && product.category === 'Engineered Hardwood' && product.name === variant.name);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject(variant);
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('imports fifteen Vidar Oak 6 and 7 listings with exact supplied product and image URLs', () => {
    const variants = [
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
  }
];
    for (const variant of variants) {
      const matching = products.filter(product => product.supplier === 'Vidar' && product.category === 'Engineered Hardwood' && product.name === variant.name);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject(variant);
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('maps supplied Vidar Chevron, Herringbone and Oak 6 images and specifications', () => {
    const variants = [
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
];
    for (const variant of variants) {
      const matching = products.filter(product => product.supplier === 'Vidar' && product.category === 'Engineered Hardwood' && product.name === variant.name);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject(variant);
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('adds three Vidar Black Walnut 6 and 7 collection variants with complete image URLs', () => {
    const variants = [
  [
    "american-black-walnut-6-natural",
    "American Black Walnut 6 Collection – Natural",
    "American Black Walnut",
    "6 Collection",
    "Natural",
    "https://vidarflooring.com/images/American_Black_Walnut_6_Collection-Natural_AB_Select_and_Better.jpg"
  ],
  [
    "american-black-walnut-7-chocolate",
    "American Black Walnut 7 Collection – Chocolate",
    "American Black Walnut",
    "7 Collection",
    "Chocolate",
    "https://vidarflooring.com/images/American_Black_Walnut_7_Collection-Chocolate_ABC_Select.jpg"
  ],
  [
    "american-black-walnut-7-natural",
    "American Black Walnut 7 Collection – Natural",
    "American Black Walnut",
    "7 Collection",
    "Natural",
    "https://vidarflooring.com/images/American_Black_Walnut_7_Collection-Natural_AB_Select_and_Better.jpg"
  ]
];
    for (const [slug, name, species, collection, colour, imageUrl] of variants) {
      const matching = products.filter(product => product.slug === `vidar-${slug}`);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject({ name, supplier: 'Vidar', category: 'Engineered Hardwood', imageUrl, specifications: { Species: species, Collection: collection, Colour: colour } });
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('adds five distinct Vidar engineered hardwood variants using supplied images', () => {
    const variants = [
  [
    "9-inch-american-white-oak-macaroon",
    "9'' Collection American White Oak – Macaroon",
    "American White Oak",
    "9-inch",
    "Macaroon",
    "https://vidarflooring.com/images/Macaroon3.jpg"
  ],
  [
    "9-inch-american-white-oak-naked-oak",
    "9'' Collection American White Oak – Naked Oak",
    "American White Oak",
    "9-inch",
    "Naked Oak",
    "https://vidarflooring.com/images/Flooring%20pictures/9_Collection_-_American_White_Oak-Naked_Oak.jpg"
  ],
  [
    "9-inch-american-white-oak-silver-stone",
    "9'' Collection American White Oak – Silver Stone",
    "American White Oak",
    "9-inch",
    "Silver Stone",
    "https://vidarflooring.com/images/Silverstone-AB.jpg"
  ],
  [
    "9-inch-american-white-oak-wheatberry",
    "9'' Collection American White Oak – Wheatberry",
    "American White Oak",
    "9-inch",
    "Wheatberry",
    "https://vidarflooring.com/images/9_Collection_-_American_White_Oak-Wheatberry.jpg"
  ],
  [
    "american-black-walnut-10-naked-walnut",
    "American Black Walnut 10 Collection – Naked Walnut",
    "American Black Walnut",
    "10 Collection",
    "Naked Walnut",
    "https://vidarflooring.com/images/American_Black_Walnut_10_Collection-Natural_AB_Select_and_Better-1.jpg"
  ]
];
    for (const [slug, name, species, collection, colour, imageUrl] of variants) {
      const matching = products.filter(product => product.slug === `vidar-${slug}`);
      expect(matching).toHaveLength(1);
      expect(matching[0]).toMatchObject({ name, supplier: 'Vidar', category: 'Engineered Hardwood', imageUrl, specifications: { Species: species, Collection: collection, Colour: colour } });
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('publishes Vidar laminate collections with supplier images and verified specifications', () => {
    const vidarLaminateProducts = publishedProducts.filter(product => product.supplier === 'Vidar' && product.category === 'Laminate');
    expect(vidarLaminateProducts.map(product => product.name)).toEqual([
      'Laminate Flooring Collection-DB25',
      'Laminate Flooring Collection-HZ',
      'Laminate Flooring Collection-LP',
      'Laminate Flooring Collection-NK25',
      'Laminate Flooring Collection-SD25',
      'Laminate Flooring Collection-TF25'
    ]);
    expect(vidarLaminateProducts.every(product =>
      product.imageUrl?.includes('vidarflooring.com/media/acfgallery/content/') &&
      product.sourceUrl.includes('vidarflooring.com/en/component/content/article/') &&
      product.specifications?.Thickness === '1/2 inch' &&
      product.specifications.Width === '7 1/2 inch' &&
      product.imageAuthorizedAt === '2026-11-23' &&
      isProductPublishable(product)
    )).toBe(true);
  });

  it('imports supplier products and applies client-reported authorization', () => {
    expect(products).toHaveLength(299);
    expect(products.reduce<Record<string, number>>((counts, product) => {
      counts[product.supplier] = (counts[product.supplier] ?? 0) + 1;
      return counts;
    }, {})).toEqual({
      'Floors at Work': 7,
      Toucan: 15,
      Vidar: 111,
      Tosca: 5,
      'Lee Flooring': 53,
      Wickham: 4
    });

    for (const product of products) {
      const recentAuthorization =
        (product.supplier === 'Vidar' && (product.category === 'Laminate' || product.category === 'Vinyl' || /^https:\/\/vidarflooring\.com\/en\/component\/content\/article\/(?:american-oak-honey-wheat|american-oak-night-owl|naked-oak-daybreak|naked-oak-urban-grey|american-black-walnut-7-collection-provence|american-oak-5-herringbone-collection-naked-oak)\?catid=19$/.test(product.sourceUrl) || (product.sourceUrl.startsWith('https://vidarflooring.com/images/') || /^https:\/\/vidarflooring\.com\/en\/component\/content\/article\/(?:american-oak-(?:[679]|click-5|herringbone)|black-walnut-5-herringbone|european-oak(?:-5-herringbone|-7)?|european-white-ash-[67]|versailles-flooring)-collection(?:-|\?)/.test(product.sourceUrl)))) ||
        (product.supplier === 'Simba' && (
          product.category === 'Laminate' ||
          (product.category === 'Vinyl' && product.specifications?.Construction === 'SPC')
        ));
      const authorizationDate = recentAuthorization ? '2026-11-23' : '2026-10-19';
      // Preserve historical imported records for review, even when the supplier is no longer approved for display.
      expect(product.sourceUrl).toMatch(/^https:\/\//);
      expect(product.imageUrl).toMatch(/^https:\/\//);
      expect(product.description.trim().length).toBeGreaterThan(0);
      expect(product.imageAuthorizationStatus).toBe('approved');
      expect(product.descriptionAuthorizationStatus).toBe('approved');
      expect(product.imageAuthorizedBy).toBe('Vcare client (reported)');
      expect(product.descriptionAuthorizedBy).toBe('Vcare client (reported)');
      expect(product.imageAuthorizedAt).toBe(authorizationDate);
      expect(product.descriptionAuthorizedAt).toBe(authorizationDate);
      expect(product.imageAuthorizationReference).toContain('Client-reported');
      expect(product.descriptionAuthorizationReference).toContain('Client-reported');
      expect(product.publicationStatus).toBe(product.sourceStatus === 'unresolved' ? 'draft' : 'published');
    }
    expect(products.filter(product => product.sourceStatus === 'unresolved')).toHaveLength(7);
    expect(products.filter(product => product.publicationStatus === 'published')).toHaveLength(298);
    expect(publishedProducts.every(product => suppliers.some(supplier => supplier.name === product.supplier))).toBe(true);
    expect(publishedProducts.some(product => product.supplier === 'Vidar')).toBe(true);
    expect(publishedProducts.some(product => product.supplier === 'Floors at Work')).toBe(false);
  });

  it('stages resumable supplier imports without duplicate slugs or source URLs', () => {
    expect(new Set(products.map(product => product.slug)).size).toBe(products.length);
    expect(new Set(products.map(product => product.sourceUrl)).size).toBe(products.length);
    expect(products.filter(product => product.supplier === 'Vidar')).toHaveLength(111);
    expect(products.filter(product => product.supplier === 'Toucan' && product.category === 'Vinyl')).toHaveLength(12);
    expect(products.filter(product => product.supplier === 'Lee Flooring' && product.category === 'Vinyl')).toHaveLength(4);
    expect(products.filter(product => product.supplier === 'Lee Flooring' && product.category === 'Laminate')).toHaveLength(3);
    expect(products.filter(product => product.supplier === 'Floors at Work' && product.category === 'Vinyl')).toHaveLength(5);
    expect(products.filter(product => product.supplier === 'Wickham' && product.category === 'Hardwood')).toHaveLength(4);
    expect(products.filter(product => product.supplier === 'Vidar' || (product.supplier === 'Toucan' && product.category === 'Vinyl')).every(product => product.specifications && Object.keys(product.specifications).length > 0)).toBe(true);
  });

  it('records unresolved supplier source links for admin review', () => {
    expect(products.filter(product => product.sourceStatus === 'unresolved').map(product => product.supplier)).toEqual(Array(7).fill('Vidar'));
    expect(products.filter(product => product.supplier === 'Vidar' && product.sourceStatus === 'verified' && product.category !== 'Vinyl' && !product.sourceUrl.startsWith('https://vidarflooring.com/images/') && !/^https:\/\/vidarflooring\.com\/en\/component\/content\/article\/(?:american-oak-honey-wheat|american-oak-night-owl|naked-oak-daybreak|naked-oak-urban-grey|american-black-walnut-7-collection-provence|american-oak-5-herringbone-collection-naked-oak)\?catid=19$/.test(product.sourceUrl) && !/^https:\/\/vidarflooring\.com\/en\/component\/content\/article\/(?:american-oak-(?:[679]|click-5|herringbone)|black-walnut-5-herringbone|european-oak(?:-5-herringbone|-7)?|european-white-ash-[67]|versailles-flooring)-collection(?:-|\?)/.test(product.sourceUrl)).map(product => product.sourceUrl)).toEqual([
      'https://www.vidarflooring.com/en/component/content/article/american-oak-driftwood?catid=19',
      'https://www.vidarflooring.com/en/component/content/article/7-1-2%E2%80%98%E2%80%99-collection-american-white-oak-moon-light?catid=19',
      'https://www.vidarflooring.com/en/component/content/article/7-1-2-collection-american-white-oak-urban-grey?catid=19',
      'https://vidarflooring.com/en/component/content/article/laminate-flooring-collection-db25?catid=18',
      'https://vidarflooring.com/en/component/content/article/laminate-flooring-collection-hz?catid=18',
      'https://vidarflooring.com/en/component/content/article/laminate-flooring-collection-lp?catid=18',
      'https://vidarflooring.com/en/component/content/article/laminate-flooring-collection-nk25?catid=18',
      'https://vidarflooring.com/en/component/content/article/laminate-flooring-collection-sd25?catid=18',
      'https://vidarflooring.com/en/component/content/article/laminate-flooring-collection-tf25?catid=18'
    ]);
  });

  it('publishes only records explicitly approved for publication and media reuse', () => {
    const product = products[0];
    expect(isProductPublishable({
      ...product,
      publicationStatus: 'published',
      imageAuthorizationStatus: 'approved',
      imageAuthorizedBy: undefined,
      imageAuthorizedAt: undefined,
      imageAuthorizationReference: undefined
    })).toBe(false);

    expect(isProductPublishable({
      ...product,
      publicationStatus: 'published',
      imageAuthorizationStatus: 'approved',
      imageAuthorizedBy: 'Vcare reviewer',
      imageAuthorizedAt: '2026-10-19T00:00:00.000Z',
      imageAuthorizationReference: 'permission-email-123',
      descriptionAuthorizationStatus: 'approved',
      descriptionAuthorizedBy: 'Vcare reviewer',
      descriptionAuthorizedAt: '2026-10-19T00:00:00.000Z',
      descriptionAuthorizationReference: 'permission-email-123',
      sourceStatus: 'verified'
    })).toBe(true);

    expect(isProductPublishable({
      ...product,
      publicationStatus: 'published',
      imageAuthorizationStatus: 'pending',
      imageAuthorizedBy: 'Vcare reviewer',
      imageAuthorizedAt: '2026-10-19T00:00:00.000Z',
      imageAuthorizationReference: 'permission-email-123',
      descriptionAuthorizationStatus: 'approved',
      descriptionAuthorizedBy: 'Vcare reviewer',
      descriptionAuthorizedAt: '2026-10-19T00:00:00.000Z',
      descriptionAuthorizationReference: 'permission-email-123'
    })).toBe(false);

    expect(isProductPublishable({
      ...product,
      publicationStatus: 'published',
      imageAuthorizationStatus: 'approved',
      imageAuthorizedBy: 'Vcare reviewer',
      imageAuthorizedAt: '2026-10-19T00:00:00.000Z',
      imageAuthorizationReference: 'permission-email-123',
      descriptionAuthorizationStatus: 'approved',
      descriptionAuthorizedBy: 'Vcare reviewer',
      descriptionAuthorizedAt: '2026-10-19T00:00:00.000Z',
      descriptionAuthorizationReference: 'permission-email-123',
      sourceStatus: 'unresolved'
    })).toBe(false);
  });

  it('generates public product routes and sitemap entries only for published products', async () => {
    const routeSlugs = generateStaticParams().map(({ slug }) => slug);
    const sitemapUrls = (await sitemap()).map(entry => entry.url);

    for (const product of products.filter(product => product.publicationStatus === 'draft')) {
      expect(routeSlugs).not.toContain(product.slug);
      expect(sitemapUrls).not.toContain(`${siteUrl}/products/${product.slug}`);
    }
    expect(routeSlugs).toEqual([...categories.map(category => category.slug), ...publishedProducts.map(product => product.slug)]);
  });
});
