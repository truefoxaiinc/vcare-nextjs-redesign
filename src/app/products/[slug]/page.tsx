import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductExplorer } from '@/components/catalog-ui';
import { ProductDetail } from '@/components/product-detail';
import { Breadcrumbs, PageIntro } from '@/components/site-shell';
import { categories, publishedProducts } from '@/data/catalog';
import { jsonLd } from '@/lib/seo';

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...categories.map(category => ({ slug: category.slug })),
    ...publishedProducts.map(product => ({ slug: product.slug }))
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = publishedProducts.find(item => item.slug === slug);
  if (product) {
    return {
      title: product.name + ' | ' + product.category + ' Flooring',
      description: product.description,
      alternates: { canonical: '/products/' + product.slug },
      openGraph: { url: '/products/' + product.slug, images: [{ url: product.imageUrl, alt: product.imageAlt }] }
    };
  }

  const category = categories.find(item => item.slug === slug);
  if (!category) return {};
  return {
    title: category.title + ' Flooring in Barrie & Thornton',
    description: 'Explore ' + category.title.toLowerCase() + ' products and suppliers at Vcare Hardwood Floors in Thornton, Ontario. Request a quote to confirm current availability.',
    alternates: { canonical: '/products/' + category.slug }
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const category = categories.find(item => item.slug === slug);
  if (category) {
    return (
      <>
        <PageIntro
          eyebrow="THE VCARE COLLECTION"
          title={category.title + ' flooring.'}
          description={category.note + '. Browse verified products and suppliers for this floor type, then request a quote to confirm current options.'}
        />
        <Breadcrumbs items={[{ label: 'Shop floors', href: '/products' }, { label: category.title }]} />
        <div className="container">
          <ProductExplorer products={publishedProducts} initialCategory={category.title} />
        </div>
      </>
    );
  }

  const product = publishedProducts.find(item => item.slug === slug);
  if (!product) notFound();
  const related = publishedProducts.filter(item => item.category === product.category && item.slug !== product.slug).slice(0, 4);
  const categorySlug = categories.find(item => item.title === product.category)?.slug ?? 'products';
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: product.category,
    brand: { '@type': 'Brand', name: product.supplier },
    image: product.imageUrl
  };

  return (
    <>
      <ProductDetail product={product} related={related} categoryHref={'/products/' + categorySlug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productSchema)} />
    </>
  );
}
