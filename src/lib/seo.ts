export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vcarehardwoodfloors.ca';
export const businessJsonLd = {
  '@context':'https://schema.org','@type':'FlooringStore',name:'Vcare Hardwood Floors',
  url:siteUrl,telephone:'+1-647-391-4283',email:'sales@vcarehardwoodfloors.ca',
  image:siteUrl+'/brand/vcare-logo.png',priceRange:'$$',
  address:{'@type':'PostalAddress',streetAddress:'240 Barrie Street',addressLocality:'Thornton',addressRegion:'ON',addressCountry:'CA'},
  areaServed:['Thornton','Barrie'],
  sameAs:['https://www.facebook.com/VcareFloors','https://www.instagram.com/vcarefloorscanada']
};
export function jsonLd(data:unknown) { return {__html:JSON.stringify(data).replace(/</g,'\\u003c')}; }
