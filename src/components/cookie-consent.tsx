'use client';
import Script from 'next/script';
import { useSyncExternalStore } from 'react';

function subscribe(listener:()=>void){window.addEventListener('vcare-consent-update',listener);return ()=>window.removeEventListener('vcare-consent-update',listener)}
function getSnapshot(){return localStorage.getItem('vcare-consent')??'unset'}
function getServerSnapshot(){return 'hydrating'}

export function CookieConsent(){
 const consent=useSyncExternalStore(subscribe,getSnapshot,getServerSnapshot);
 const visible=consent==='unset';
 const accepted=consent==='all';
 const gtm=process.env.NEXT_PUBLIC_GTM_ID;
 const ga4=process.env.NEXT_PUBLIC_GA4_ID;
 function choose(value:'all'|'essential'){localStorage.setItem('vcare-consent',value);window.dispatchEvent(new Event('vcare-consent-update'))}
 const gtmInit=gtm?"(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','"+gtm+"');":'';
 const gaInit=ga4?"window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};gtag('js',new Date());gtag('config','"+ga4+"');":'';
 return <>
  {accepted&&gtm&&<Script id="vcare-gtm-init" strategy="afterInteractive" dangerouslySetInnerHTML={{__html:gtmInit}}/>}
  {accepted&&!gtm&&ga4&&<><Script src={'https://www.googletagmanager.com/gtag/js?id='+ga4} strategy="afterInteractive"/><Script id="vcare-ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{__html:gaInit}}/></>}
  {visible&&<aside className="cookie-card" aria-label="Cookie preferences"><div><b>Your privacy choices</b><p>Choose whether to allow optional analytics. Essential site functions work either way.</p></div><div className="cookie-actions"><button onClick={()=>choose('essential')}>Essential only</button><button className="button button-primary" onClick={()=>choose('all')}>Allow analytics</button></div></aside>}
 </>;
}
