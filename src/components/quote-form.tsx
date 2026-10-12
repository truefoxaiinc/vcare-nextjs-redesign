'use client';

import Script from 'next/script';
import { FormEvent, useRef, useState } from 'react';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';
class FormSubmissionError extends Error {}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      reset: (widgetId?: string) => void;
    };
  }
}

export function QuoteForm({ prefill = '' }: { prefill?: string }) {
  const [state, setState] = useState<SubmissionState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      projectType: formData.get('projectType'),
      rooms: formData.get('rooms'),
      area: formData.get('area'),
      product: formData.get('product'),
      timeline: formData.get('timeline'),
      details: formData.get('details'),
      website: formData.get('website'),
      turnstileToken: formData.get('cf-turnstile-response')
    };

    submitting.current = true;
    setState('sending');
    setErrorMessage('');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      let result: unknown;
      try {
        result = await response.json();
      } catch {
        throw new FormSubmissionError(
          'We could not read the submission response. Please try again or contact us directly.'
        );
      }
      if (
        !response.ok ||
        typeof result !== 'object' ||
        result === null ||
        !('ok' in result) ||
        result.ok !== true
      ) {
        const message =
          typeof result === 'object' &&
          result !== null &&
          'error' in result &&
          typeof result.error === 'string'
            ? result.error
            : 'We could not submit your request. Please try again or contact us directly.';
        throw new FormSubmissionError(message);
      }

      setState('success');
      form.reset();
    } catch (error) {
      setState('error');
      setErrorMessage(
        error instanceof FormSubmissionError
          ? error.message
          : 'We could not connect to the enquiry service. Please check your connection and try again.'
      );
    } finally {
      submitting.current = false;
      if (window.turnstile) window.turnstile.reset();
    }
  }

  return (
    <form onSubmit={submit} aria-busy={state === 'sending'}>
      {turnstileSiteKey && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div className="field full">
            <div
              className="cf-turnstile"
              data-sitekey={turnstileSiteKey}
              data-action="vcare_enquiry"
            />
          </div>
        </>
      )}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0
        }}
      >
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-fields">
        <label className="field">
          Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="Full name" />
        </label>
        <label className="field">
          Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com" />
        </label>
        <label className="field">
          Phone number<input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="647 000 0000" />
        </label>
        <label className="field">
          What do you need?
          <select name="projectType" defaultValue="">
            <option value="" disabled>Choose one</option>
            <option>Flooring supply</option>
            <option>Supply and installation</option>
            <option>Installation support</option>
            <option>I&apos;m still exploring</option>
          </select>
        </label>
        <label className="field">
          Room(s)<input name="rooms" maxLength={200} placeholder="Living room, kitchen…" />
        </label>
        <label className="field">
          Approximate size<input name="area" type="number" min="0" max="100000" step="0.1" placeholder="Square feet" />
        </label>
        <label className="field">
          Floor you&apos;re interested in<input name="product" defaultValue={prefill} maxLength={120} placeholder="Hardwood, laminate, vinyl…" />
        </label>
        <label className="field">
          When are you hoping to start?
          <select name="timeline" defaultValue="">
            <option value="">Select timing</option>
            <option>As soon as possible</option>
            <option>Within 1–3 months</option>
            <option>Later this year</option>
            <option>Just planning ahead</option>
          </select>
        </label>
        <label className="field full">
          Anything else we should know?<textarea name="details" maxLength={3000} placeholder="Share a little about your project, style or questions…" />
        </label>
        <div className="field full">
          <button
            className="button button-primary"
            type="submit"
            disabled={state === 'sending' || !turnstileSiteKey}
          >
            {state === 'sending' ? 'Sending…' : 'Send enquiry'} <span>↗</span>
          </button>
          <span style={{ fontSize: 10, color: '#77736e' }}>
            Your enquiry is submitted to Vcare for follow-up. Submission acceptance does not guarantee email delivery.
          </span>
          {!turnstileSiteKey && (
            <span style={{ display: 'block', fontSize: 10, color: '#9b3415' }} role="alert">
              Online submission is not configured. Please call 647 391 4283 or email sales@vcarehardwoodfloors.ca.
            </span>
          )}
        </div>
      </div>
      {state === 'success' && (
        <div className="success-message" role="status">
          Your enquiry was accepted for processing. This does not confirm email delivery; Vcare will follow up. For urgent help, call 647 391 4283.
        </div>
      )}
      {state === 'error' && (
        <div className="success-message" role="alert">
          {errorMessage} You can also call <a href="tel:+16473914283">647 391 4283</a> or email{' '}
          <a href="mailto:sales@vcarehardwoodfloors.ca">sales@vcarehardwoodfloors.ca</a>.
        </div>
      )}
    </form>
  );
}
