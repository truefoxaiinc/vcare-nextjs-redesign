import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return <>
    <div className="topbar"><div className="container topbar-inner"><span>Thoughtful floors. Local care.</span><div><a href="tel:+16473914283">Call us <strong>647 391 4283</strong></a><span className="topbar-sep">·</span><span>240 Barrie Street, Thornton, ON</span></div></div></div>
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="Vcare Hardwood Floors home"><Image src="/brand/vcare-logo.png" alt="Vcare Flooring Solutions — solid and engineered hardwood, laminate and vinyl" width={1000} height={283} priority /></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/products">Shop floors</Link>
          <div className="nav-dropdown"><Link href="/products">Collections <span aria-hidden="true">⌄</span></Link><div className="mega-menu"><div className="mega-intro"><small>FIND YOUR FLOOR</small><strong>Made for the way you live.</strong><p>Explore quality flooring, thoughtfully selected for your home.</p><Link className="text-link" href="/products">View all products ↗</Link></div><div className="mega-links"><Link href="/products/hardwood">Solid hardwood</Link><Link href="/products/engineered-hardwood">Engineered hardwood</Link><Link href="/products/laminate">Laminate</Link><Link href="/products/vinyl">Vinyl & SPC</Link></div><div className="mega-feature"><span>Current favourites</span><Link href="/offers">Shop this week’s offers <b>→</b></Link></div></div></div>
          <Link href="/installation-services">Installation</Link><Link href="/offers">Offers</Link><Link href="/about">Our story</Link>
        </nav>
        <div className="header-actions"><a className="header-phone" href="tel:+16473914283" aria-label="Call Vcare">↗</a><Link className="button button-primary button-small" href="/get-a-quote">Get a quote <span>↗</span></Link></div>
        <details className="mobile-menu"><summary aria-label="Open navigation menu"><i></i><i></i></summary><nav aria-label="Mobile navigation"><Link href="/products">Shop floors</Link><Link href="/products/hardwood">Hardwood</Link><Link href="/products/engineered-hardwood">Engineered hardwood</Link><Link href="/products/laminate">Laminate</Link><Link href="/products/vinyl">Vinyl</Link><Link href="/installation-services">Installation</Link><Link href="/offers">Offers</Link><Link href="/about">Our story</Link><Link href="/contact-us">Contact</Link><Link className="button button-primary" href="/get-a-quote">Get a free quote ↗</Link></nav></details>
      </div>
    </header>
  </>;
}

export function Footer() {
  return <footer className="footer">
    <div className="container footer-main"><div className="footer-brand"><Image src="/brand/vcare-logo.png" alt="Vcare Flooring Solutions" width={1000} height={283}/><p>Floors that bring warmth home. Visit our Thornton showroom and find a floor that feels like yours.</p><a href="tel:+16473914283" className="footer-phone">647 391 4283 <span>↗</span></a></div>
      <div className="footer-col"><small>EXPLORE</small><Link href="/products">All flooring</Link><Link href="/products/hardwood">Hardwood</Link><Link href="/products/engineered-hardwood">Engineered</Link><Link href="/products/laminate">Laminate</Link><Link href="/products/vinyl">Vinyl</Link><Link href="/offers">Offers</Link></div>
      <div className="footer-col"><small>HERE TO HELP</small><Link href="/installation-services">Installation</Link><Link href="/get-a-quote">Get a quote</Link><Link href="/faq">FAQs</Link><Link href="/contact-us">Contact us</Link><Link href="/blog">Flooring journal</Link><Link href="/gallery">Our work</Link></div>
      <div className="footer-contact"><small>COME SAY HELLO</small><p>240 Barrie Street<br/>Thornton, Ontario<br/>Canada</p><a href="mailto:sales@vcarehardwoodfloors.ca">sales@vcarehardwoodfloors.ca</a><a target="_blank" rel="noreferrer" href="https://maps.google.com/?q=240+Barrie+Street+Thornton+ON">Get directions ↗</a><p className="hours">Mon–Sat · Call for showroom hours</p></div>
    </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Vcare Hardwood Floors. All rights reserved.</span><div><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link></div><span>Made for good living.</span></div>
  </footer>;
}

export function PageIntro({eyebrow,title,description}:{eyebrow:string;title:string;description?:string}) {
 return <section className="page-intro"><div className="container"><div className="eyebrow"><span></span>{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div></section>;
}

export function Breadcrumbs({items}:{items:{label:string;href?:string}[]}) {
 return <nav className="breadcrumbs container" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map((item,i)=><span key={item.label+i}> / {item.href?<Link href={item.href}>{item.label}</Link>:<span aria-current="page">{item.label}</span>}</span>)}</nav>;
}
