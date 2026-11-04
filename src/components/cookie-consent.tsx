'use client';

import Script from 'next/script';
import { useState, useSyncExternalStore } from 'react';

const storageKey = 'vcare-consent';
const updateEvent = 'vcare-consent-update';

function subscribe(listener: () => void) {
  window.addEventListener(updateEvent, listener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(updateEvent, listener);
    window.removeEventListener('storage', listener);
  };
}
function getSnapshot() {
  try {
    const value = localStorage.getItem(storageKey);
    return value === 'all' || value === 'essential' ? value : 'unset';
  } catch {
    return 'unset';
  }
}
function getServerSnapshot() { return 'hydrating'; }

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [editing, setEditing] = useState(false);
  const accepted = consent === 'all';
  const visible = consent === 'unset' || editing;
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;

  function choose(value: 'all' | 'essential') {
    const wasAccepted = consent === 'all';
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      // Storage may be unavailable; optional scripts remain disabled on the next load.
    }
    window.dispatchEvent(new Event(updateEvent));
    setEditing(false);
    // Once analytics JavaScript has executed, removing its Script element does
    // not stop it. Reload to avoid continuing analytics after withdrawal.
    if (wasAccepted && value === 'essential') window.location.reload();
  }

  const gtmInit = gtm
    ? "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','" + gtm + "');"
    : '';
  const gaInit = ga4
    ? "window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};gtag('js',new Date());gtag('config','" + ga4 + "');"
    : '';

  return <>
    {accepted && gtm && <Script id="vcare-gtm-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtmInit }} />}
    {accepted && !gtm && ga4 && <>
      <Script src={'https://www.googletagmanager.com/gtag/js?id=' + ga4} strategy="afterInteractive" />
      <Script id="vcare-ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gaInit }} />
    </>}
    {consent !== 'hydrating' && <button
      type="button"
      className="cookie-preferences-trigger"
      onClick={() => setEditing(true)}
      aria-label="Open cookie preferences"
      aria-expanded={visible}
    >Cookie preferences</button>}
    {visible && <aside className="cookie-card" aria-label="Cookie preferences" role="region">
      <div>
        <b>Your privacy choices</b>
        <p>Choose whether to allow optional analytics. Essential site functions work either way. You can change this choice at any time.</p>
      </div>
      <div className="cookie-actions">
        <button type="button" onClick={() => choose('essential')}>Essential only</button>
        <button type="button" className="button button-primary" onClick={() => choose('all')}>Allow analytics</button>
        {consent !== 'unset' && <button type="button" onClick={() => setEditing(false)}>Close</button>}
      </div>
    </aside>}
  </>;
}
