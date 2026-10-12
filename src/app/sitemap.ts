import type { MetadataRoute } from 'next';
import { categories, posts, products } from '@/data/catalog';
import { siteUrl } from '@/lib/seo';
export default function sitemap():MetadataRoute.Sitemap {
 const staticPaths=['','/products','/offers','/installation-services','/get-a-quote','/about','/contact-us','/gallery','/faq','/blog','/service-areas','/service-areas/thornton','/service-areas/barrie','/privacy-policy','/terms'];
 return [
  ...staticPaths.map(path=>({url:siteUrl+path,changeFrequency:path===''?'weekly' as const:'monthly' as const,priority:path===''?1:path==='/products'||path==='/get-a-quote'?0.9:0.6})),
  ...categories.map(c=>({url:siteUrl+'/products/'+c.slug,changeFrequency:'weekly' as const,priority:0.8})),
  ...products.map(p=>({url:siteUrl+'/products/'+p.slug,changeFrequency:'weekly' as const,priority:0.7})),
  ...posts.map(p=>({url:siteUrl+'/blog/'+p.slug,changeFrequency:'yearly' as const,priority:0.5}))
 ];
}
