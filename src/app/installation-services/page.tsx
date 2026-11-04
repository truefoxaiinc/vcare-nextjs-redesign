import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/site-shell';
import { jsonLd, siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Flooring Installation in Thornton & Barrie | Free Estimate',
  description: 'Explore hardwood, engineered hardwood, laminate, vinyl and staircase installation with Vcare Hardwood Floors in Thornton near Barrie. Call 647 391 4283 for a free estimate.',
  alternates: { canonical: '/installation-services' },
  openGraph: {
    title: 'Flooring Installation Services | Vcare Hardwood Floors',
    description: 'See flooring and staircase project photographs and request a free flooring installation estimate.',
    url: '/installation-services',
    images: [{ url: '/images/installation/open-plan-natural-wood-flooring.jpeg', alt: 'Open-plan interior with natural-tone plank flooring' }]
  }
};

const photos = [
  {
    "src": "/images/installation/living-room-warm-wood-flooring.jpeg",
    "alt": "Living room with warm brown wood flooring and seating"
  },
  {
    "src": "/images/installation/kitchen-grey-plank-flooring.jpeg",
    "alt": "Kitchen with grey wood-look plank flooring"
  },
  {
    "src": "/images/installation/curved-wood-staircase-flooring.jpeg",
    "alt": "Curved wooden staircase with matching floor"
  },
  {
    "src": "/images/installation/bedroom-light-natural-wood-flooring.jpeg",
    "alt": "Bedroom with light natural wood-look plank flooring"
  },
  {
    "src": "/images/installation/open-plan-natural-wood-flooring.jpeg",
    "alt": "Open-plan living space with natural-tone plank flooring"
  },
  {
    "src": "/images/installation/living-room-light-wood-flooring.jpeg",
    "alt": "Bright living room with light wood-look flooring"
  },
  {
    "src": "/images/installation/staircase-grey-treads-metal-balustrade.jpeg",
    "alt": "Staircase with grey treads and dark metal balustrade"
  },
  {
    "src": "/images/installation/basement-multitone-wood-flooring.jpeg",
    "alt": "Basement room with multitone wood flooring"
  },
  {
    "src": "/images/installation/staircase-wood-treads-white-risers.jpeg",
    "alt": "Staircase with wood treads and white risers"
  },
  {
    "src": "/images/installation/staircase-natural-wood-treads.jpeg",
    "alt": "Wooden staircase with natural-tone treads and dark railing"
  },
  {
    "src": "/images/installation/bedroom-honey-tone-wood-flooring.jpeg",
    "alt": "Bedroom with honey-tone wood plank flooring"
  },
  {
    "src": "/images/installation/room-grey-wood-look-plank-flooring.jpeg",
    "alt": "Room with grey wood-look plank flooring"
  },
  {
    "src": "/images/installation/living-room-oak-tone-wide-plank-flooring.jpeg",
    "alt": "Living room with oak-tone wide plank flooring"
  },
  {
    "src": "/images/installation/room-rich-brown-wood-flooring.jpeg",
    "alt": "Room with rich brown wood flooring"
  },
  {
    "src": "/images/installation/staircase-dark-wood-glass-railing.jpeg",
    "alt": "Staircase with dark wood steps and glass railing"
  },
  {
    "src": "/images/installation/fireplace-room-light-grey-plank-flooring.jpeg",
    "alt": "Fireplace room with light grey plank flooring"
  }
] as const;

const services = [
  { title: 'Hardwood flooring installation', description: 'Natural wood flooring brings distinctive grain and warmth to living rooms, bedrooms and other spaces. Discuss the product, subfloor and finish with our team before installation.' },
  { title: 'Engineered hardwood installation', description: 'Engineered hardwood offers a real-wood surface with layered construction. We can help review product-specific installation methods and room conditions.' },
  { title: 'Laminate flooring installation', description: 'Laminate is a practical wood-look option for many interior rooms. Product requirements, moisture conditions and subfloor preparation should be checked before installation.' },
  { title: 'Vinyl flooring installation', description: 'Vinyl and rigid-core plank flooring offer versatile finishes for a range of residential and commercial spaces. We can discuss suitability and the preparation needed for your project.' },
  { title: 'Staircase installation', description: 'Coordinate stair treads, risers, transitions and finishing details with the surrounding floors. Share your staircase layout when requesting an estimate.' }
];

const faqs = [
  ['What types of flooring does Vcare install?', 'Vcare offers installation services for hardwood, engineered hardwood, laminate and vinyl flooring, along with staircase work. Contact us to confirm the requirements for your specific property and product.'],
  ['Can I request a free flooring installation estimate?', 'Yes. Call 647 391 4283 or send your room dimensions, preferred flooring and project details through our quote form to request a free estimate.'],
  ['Do you work on residential and commercial flooring?', 'The Vcare installation service covers residential and commercial projects. Contact the team to discuss the location, scope and scheduling.'],
  ['Can you help with staircase flooring?', 'Yes. Vcare lists staircase installation among its services. Share photographs and measurements so the team can discuss treads, risers and transitions.']
];

export default function InstallationPage() {
  return <>
    <section className="service-hero">
      <div className="container">
        <div className="eyebrow"><span/>FLOORING INSTALLATION · THORNTON & BARRIE AREA</div>
        <h1>Flooring installation for homes and businesses.</h1>
        <p>Vcare Hardwood Floors sells and installs hardwood, engineered hardwood, laminate and vinyl flooring, as well as staircases. Explore flooring project photographs and talk with our team about your space.</p>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <Link className="button button-primary" href="/get-a-quote">Get a free installation estimate ↗</Link>
          <a className="button button-outline" href="tel:+16473914283">Call 647 391 4283</a>
        </div>
      </div>
    </section>
    <Breadcrumbs items={[{label:'Installation services'}]}/>
    <section className="section">
      <div className="container">
        <div className="section-top">
          <div><div className="eyebrow"><span/>INSTALLATION SERVICES</div><h2>Choose the right floor for your project.</h2></div>
          <p>From one room to larger residential and commercial projects, the best result starts with the right material, room preparation and installation plan.</p>
        </div>
        <div className="service-cards">
          {services.map((service,index)=><article className="service-card" key={service.title}>
            <span>{String(index+1).padStart(2,'0')}</span>
            <h3>{service.title}</h3><p>{service.description}</p>
          </article>)}
        </div>
      </div>
    </section>
    <section className="section section-cream" aria-labelledby="installation-gallery-heading">
      <div className="container">
        <div className="section-top">
          <div><div className="eyebrow"><span/>FLOORING & STAIRCASE PHOTOGRAPHS</div><h2 id="installation-gallery-heading">Explore flooring finishes in real spaces.</h2></div>
          <p>Browse room and staircase photographs supplied for this page. Materials, products and project locations have not been independently verified; ask our team about the floor that suits your space.</p>
        </div>
        <div className="gallery-grid">
          {photos.map((photo)=><figure className="gallery-tile" key={photo.src} style={{margin:0}}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) calc((100vw - 44px) / 2), (max-width: 1050px) calc((100vw - 72px) / 3), (max-width: 1240px) calc((100vw - 92px) / 3), 400px" loading="lazy" />
            <figcaption><span>{photo.alt}</span></figcaption>
          </figure>)}
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="section-top"><div><div className="eyebrow"><span/>HOW TO GET STARTED</div><h2>Plan your installation estimate.</h2></div></div>
        <div className="service-cards">
          <article className="service-card"><span>01</span><h3>Tell us about the space</h3><p>Share whether your project is residential or commercial, the rooms involved and your approximate measurements.</p></article>
          <article className="service-card"><span>02</span><h3>Discuss flooring options</h3><p>Let us know if you prefer hardwood, engineered hardwood, laminate, vinyl or staircase work. We can discuss suitable options and project details.</p></article>
          <article className="service-card"><span>03</span><h3>Request your free estimate</h3><p>Call 647 391 4283 or complete the quote request form. The team will follow up about the next steps.</p></article>
        </div>
      </div>
    </section>
    <section className="section section-cream">
      <div className="container">
        <div className="section-top"><div><div className="eyebrow"><span/>FREQUENTLY ASKED QUESTIONS</div><h2>Flooring installation questions, answered.</h2></div></div>
        <div className="faq-list">{faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </div>
    </section>
    <section className="quote-cta">
      <div className="container quote-cta-inner">
        <div><div className="eyebrow"><span/>FREE FLOORING INSTALLATION ESTIMATE</div><h2>Ready to update your floor?</h2><p>Call 647 391 4283 or tell us about your project to get started.</p></div>
        <Link className="button button-primary" href="/get-a-quote">Request a free estimate ↗</Link>
      </div>
    </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({
      '@context':'https://schema.org','@type':'Service',
      name:'Flooring and staircase installation',
      serviceType:'Flooring installation',
      url:siteUrl+'/installation-services',
      provider:{'@type':'FlooringStore',name:'Vcare Hardwood Floors',url:siteUrl,telephone:'+1-647-391-4283'},
      areaServed:[{'@type':'Place',name:'Thornton, Ontario'},{'@type':'Place',name:'Barrie, Ontario'}],
      hasOfferCatalog:{'@type':'OfferCatalog',name:'Flooring installation services',itemListElement:services.map(s=>({'@type':'OfferCatalog',name:s.title}))}
    })}/>
    <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({
      '@context':'https://schema.org','@type':'FAQPage',
      mainEntity:faqs.map(([question,answer])=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))
    })}/>
  </>;
}
