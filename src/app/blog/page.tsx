import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs, PageIntro } from '@/components/site-shell';
import { posts } from '@/data/catalog';
export const metadata:Metadata={title:'Flooring Journal | Vcare Hardwood Floors',description:'Helpful flooring guides from Vcare: compare materials, plan installation and find the right hardwood, laminate or vinyl flooring for your home.',alternates:{canonical:'/blog'}};
export default function BlogPage(){return <><PageIntro eyebrow="THE FLOORING JOURNAL" title="A little know-how goes a long way." description="Ideas and practical guides to help you feel good about your next flooring decision."/><Breadcrumbs items={[{label:'Journal'}]}/><section className="section"><div className="container"><div className="journal-grid">{posts.map(p=><article className="journal-card" key={p.slug}><Link className="journal-image" href={'/blog/'+p.slug}><Image src={p.image} alt={p.title} fill sizes="(max-width: 700px) 50vw, 25vw" unoptimized/></Link><div className="journal-copy"><small>{p.category} · {p.date}</small><h3><Link href={'/blog/'+p.slug}>{p.title}</Link></h3><p>{p.excerpt}</p><Link href={'/blog/'+p.slug}>Read article ↗</Link></div></article>)}</div></div></section></>}
