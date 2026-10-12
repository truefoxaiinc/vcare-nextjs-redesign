import type { Metadata } from 'next';
import { ProductExplorer } from '@/components/catalog-ui';
import { Breadcrumbs, PageIntro } from '@/components/site-shell';
import { products } from '@/data/catalog';
export const metadata:Metadata={title:'Shop Flooring | Hardwood, Laminate & Vinyl in Barrie',description:'Browse Vcare’s flooring collections: solid and engineered hardwood, laminate and vinyl. Compare styles and prices by square foot, then request a project quote.',alternates:{canonical:'/products'}};
export default function ProductsPage(){return <><PageIntro eyebrow="FIND A FLOOR YOU LOVE" title="A good place to begin." description="Explore the Vcare collection. Browse by floor type, search by style and ask us about anything that catches your eye."/><Breadcrumbs items={[{label:'Shop floors'}]}/><div className="container"><ProductExplorer products={products}/></div></>}
