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
    expect(suppliers.find(supplier => supplier.name === 'Vidar')?.categories).toEqual(['Engineered Hardwood', 'Laminate']);
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
    expect(vidar?.categories).toEqual(['Engineered Hardwood', 'Laminate']);
    expect(categories.find(category => category.title === 'Engineered Hardwood')?.suppliers).toContain('Vidar');
    expect(categories.find(category => category.title === 'Laminate')?.suppliers).toContain('Vidar');
    expect(publishedProducts.filter(product => product.supplier === 'Vidar')).toHaveLength(9);
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

  it('maps Woden 1006–1008 images and adds Como AB and Alba AB', () => {
    const images = {
      '1006 Sunlit Wave': 'https://static.wixstatic.com/media/d8ccde_fcb31b9dc277474e9e01b50b7939a6cd~mv2.jpg/v1/fill/w_1960,h_1180,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_fcb31b9dc277474e9e01b50b7939a6cd~mv2.jpg',
      '1007 Cocoa Timber': 'https://static.wixstatic.com/media/d8ccde_b2d0d4f95cc24122926e256cabdbc5dc~mv2.jpg/v1/fill/w_1225,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_b2d0d4f95cc24122926e256cabdbc5dc~mv2.jpg',
      '1008 Vintage Trail': 'https://static.wixstatic.com/media/d8ccde_6c16fcacd1e241a387463fed3b203153~mv2.jpg/v1/fill/w_1960,h_1180,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_6c16fcacd1e241a387463fed3b203153~mv2.jpg',
      'Como AB': 'https://static.wixstatic.com/media/d8ccde_f02b25e4dd394c59b7bdd658485c9afe~mv2.jpg/v1/fill/w_1225,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_f02b25e4dd394c59b7bdd658485c9afe~mv2.jpg',
      'Alba AB': 'https://static.wixstatic.com/media/d8ccde_e1ff29730f34461c87ffbff408459544~mv2.jpg/v1/fill/w_1225,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_e1ff29730f34461c87ffbff408459544~mv2.jpg'
    };
    for (const [name, imageUrl] of Object.entries(images)) {
      const matching = products.filter(product => product.supplier === 'Woden' && product.name === name);
      expect(matching).toHaveLength(1);
      expect(matching[0].slug).toBe(`woden-${name.toLowerCase().replace(/ /g, '-')}`);
      expect(matching[0].imageUrl).toBe(imageUrl);
      expect(matching[0].imageAlt).toBe(`Supplier product image for Woden ${name}`);
      expect(isProductPublishable(matching[0])).toBe(true);
      if (name.startsWith('100')) {
        expect(matching[0].specifications).toMatchObject({ Collection: '10 Collection', Structure: '8 mm SPC + 2 mm cork pad' });
      } else {
        expect(matching[0].specifications).toBeUndefined();
      }
    }
  });

  it('maps Woden 1003–1005 supplier images to existing products', () => {
    const images = {
      '1003 Golden Shoal': 'https://static.wixstatic.com/media/d8ccde_e498bb6fafc142d6a72fcbed13b10b22~mv2.jpg/v1/fill/w_1225,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_e498bb6fafc142d6a72fcbed13b10b22~mv2.jpg',
      '1004 River Clay': 'https://static.wixstatic.com/media/d8ccde_c8168225fcca498c80aaccb7acdf877d~mv2.jpg/v1/fill/w_1280,h_771,al_c,q_85,enc_avif,quality_auto/d8ccde_c8168225fcca498c80aaccb7acdf877d~mv2.jpg',
      '1005 Smoky Walnut': 'https://static.wixstatic.com/media/d8ccde_e4f4095a307d4ca5a630d5402abdc3ac~mv2.jpg/v1/fill/w_1225,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_e4f4095a307d4ca5a630d5402abdc3ac~mv2.jpg'
    };
    for (const [name, imageUrl] of Object.entries(images)) {
      const matching = products.filter(product => product.supplier === 'Woden' && product.name === name);
      expect(matching).toHaveLength(1);
      expect(matching[0].slug).toBe(`woden-${name.toLowerCase().replace(/ /g, '-')}`);
      expect(matching[0].imageUrl).toBe(imageUrl);
      expect(matching[0].imageAlt).toBe(`Supplier product image for Woden ${name}`);
      expect(matching[0].specifications).toMatchObject({ Collection: '10 Collection', Structure: '8 mm SPC + 2 mm cork pad' });
      expect(isProductPublishable(matching[0])).toBe(true);
    }
  });

  it('uses supplied Woden Sandy Cove and Beach Bluff images on existing products', () => {
    const expected = {
      '1001 Sandy Cove': 'https://static.wixstatic.com/media/d8ccde_183ab2eb5f3644f88ddfe40d925d8d70~mv2.jpg/v1/fill/w_1960,h_1180,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_183ab2eb5f3644f88ddfe40d925d8d70~mv2.jpg',
      '1002 Beach Bluff': 'https://static.wixstatic.com/media/d8ccde_3615f2eb4ca244d8a8c3500762f52c37~mv2.jpg/v1/fill/w_1225,h_738,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/d8ccde_3615f2eb4ca244d8a8c3500762f52c37~mv2.jpg'
    };
    for (const [name, imageUrl] of Object.entries(expected)) {
      const matching = products.filter(product => product.supplier === 'Woden' && product.name === name);
      expect(matching).toHaveLength(1);
      expect(matching[0].slug).toBe(`woden-${name.toLowerCase().replace(/ /g, '-')}`);
      expect(matching[0].imageUrl).toBe(imageUrl);
      expect(matching[0].imageAlt).toBe(`Supplier product image for Woden ${name}`);
      expect(matching[0].specifications).toMatchObject({ Collection: '10 Collection', Structure: '8 mm SPC + 2 mm cork pad' });
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
    expect(products).toHaveLength(48);
    expect(products.reduce<Record<string, number>>((counts, product) => {
      counts[product.supplier] = (counts[product.supplier] ?? 0) + 1;
      return counts;
    }, {})).toEqual({
      'Floors at Work': 7,
      Toucan: 15,
      Vidar: 16,
      Tosca: 5,
      'Lee Flooring': 7,
      Wickham: 4
    });

    for (const product of products) {
      const recentAuthorization =
        (product.supplier === 'Vidar' && product.category === 'Laminate') ||
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
    expect(products.filter(product => product.publicationStatus === 'published')).toHaveLength(47);
    expect(publishedProducts.every(product => suppliers.some(supplier => supplier.name === product.supplier))).toBe(true);
    expect(publishedProducts.some(product => product.supplier === 'Vidar')).toBe(true);
    expect(publishedProducts.some(product => product.supplier === 'Floors at Work')).toBe(false);
  });

  it('stages resumable supplier imports without duplicate slugs or source URLs', () => {
    expect(new Set(products.map(product => product.slug)).size).toBe(products.length);
    expect(new Set(products.map(product => product.sourceUrl)).size).toBe(products.length);
    expect(products.filter(product => product.supplier === 'Vidar')).toHaveLength(16);
    expect(products.filter(product => product.supplier === 'Toucan' && product.category === 'Vinyl')).toHaveLength(12);
    expect(products.filter(product => product.supplier === 'Lee Flooring' && product.category === 'Vinyl')).toHaveLength(4);
    expect(products.filter(product => product.supplier === 'Lee Flooring' && product.category === 'Laminate')).toHaveLength(3);
    expect(products.filter(product => product.supplier === 'Floors at Work' && product.category === 'Vinyl')).toHaveLength(5);
    expect(products.filter(product => product.supplier === 'Wickham' && product.category === 'Hardwood')).toHaveLength(4);
    expect(products.filter(product => product.supplier === 'Vidar' || (product.supplier === 'Toucan' && product.category === 'Vinyl')).every(product => product.specifications && Object.keys(product.specifications).length > 0)).toBe(true);
  });

  it('records unresolved supplier source links for admin review', () => {
    expect(products.filter(product => product.sourceStatus === 'unresolved').map(product => product.supplier)).toEqual(Array(7).fill('Vidar'));
    expect(products.filter(product => product.supplier === 'Vidar' && product.sourceStatus === 'verified').map(product => product.sourceUrl)).toEqual([
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
