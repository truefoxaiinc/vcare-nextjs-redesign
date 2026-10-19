import type { Metadata } from 'next';
import { ProductExplorer } from '@/components/catalog-ui';
import { Breadcrumbs, PageIntro } from '@/components/site-shell';
import { publishedProducts } from '@/data/catalog';

export const metadata:Metadata={title:'Flooring Products | Hardwood, Laminate & Vinyl in Barrie',description:'Browse flooring products by supplier and floor type at Vcare Hardwood Floors. Request a quote to confirm current product options and availability.',alternates:{canonical:'/products'}};
export default function ProductsPage(){return <><PageIntro eyebrow="FIND A FLOOR YOU LOVE" title="A good place to begin." description="Browse verified products by floor type and supplier, then request a quote to confirm current options and availability."/><Breadcrumbs items={[{label:'Shop floors'}]}/><div className="container"><ProductExplorer products={publishedProducts}/></div></>}
