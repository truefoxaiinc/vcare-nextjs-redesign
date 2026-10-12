import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Footer, Header } from '@/components/site-shell';
import { businessJsonLd, jsonLd, siteUrl } from '@/lib/seo';
import { CookieConsent } from '@/components/cookie-consent';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Vcare Hardwood Floors | Flooring Store & Installation in Barrie', template: '%s | Vcare Hardwood Floors' },
  description: 'Discover hardwood, engineered hardwood, laminate and vinyl flooring at Vcare in Thornton, Ontario. Explore our collections and request a free project quote.',
  applicationName: 'Vcare Hardwood Floors',
  openGraph: { type:'website',locale:'en_CA',siteName:'Vcare Hardwood Floors',title:'Vcare Hardwood Floors',description:'Beautiful floors and thoughtful installation in Thornton and the Barrie area.',images:[{url:'/brand/vcare-logo.png',width:1000,height:283,alt:'Vcare Flooring Solutions'}] },
  twitter: { card:'summary_large_image',title:'Vcare Hardwood Floors',description:'Explore flooring for your home in Thornton, Ontario.' },
  robots: { index:true,follow:true }
};
export const viewport: Viewport = { themeColor:'#f7f3ec',width:'device-width',initialScale:1 };
export default function RootLayout({children}:{children:ReactNode}) {
 return <html lang="en-CA"><body><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/><CookieConsent/><script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(businessJsonLd)}/></body></html>;
}
