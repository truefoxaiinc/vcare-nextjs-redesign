import type { Metadata } from 'next';
import { Breadcrumbs, PageIntro } from '@/components/site-shell';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vcare Hardwood Floors',
  description: 'How Vcare Hardwood Floors collects, stores and uses flooring enquiries, spam-prevention data and optional website analytics.',
  alternates: { canonical: '/privacy-policy' }
};

export default function PrivacyPage() {
  return <>
    <PageIntro eyebrow="YOUR INFORMATION" title="Privacy matters." description="How information submitted through the Vcare website is handled." />
    <Breadcrumbs items={[{ label: 'Privacy policy' }]} />
    <article className="prose">
      <h2>Information you provide</h2>
      <p>When you request a quote or contact us through a website form, we collect the details you submit, which may include your name, email address, phone number, flooring preferences, room measurements, project timeline and message. This information is stored in the website’s PostgreSQL database so Vcare can process your enquiry and follow up. Please avoid including sensitive personal information in the message field.</p>
      <h2>Why we use this information</h2>
      <p>We use enquiry information to respond to your request, discuss flooring products and installation services, and prepare estimates. Submitting an enquiry does not place an order. We do not sell the personal information you submit through these forms.</p>
      <h2>Service providers and security</h2>
      <p>Cloudflare Turnstile helps us check form submissions for automated abuse and processes technical information as part of that check. A successful submission creates a notification job; Resend is used to send the enquiry details to Vcare by email. An accepted website submission does not guarantee that the notification email has reached an inbox. These providers process information under their own applicable terms and privacy notices.</p>
      <h2>Retention and deletion</h2>
      <p>The website is designed to remove stored enquiries older than 90 days when its authorized background worker runs, provided the associated notification is completed or has reached a terminal failure state. Pending or processing notifications can delay deletion, and notification delivery metadata may remain after an enquiry is deleted. This is a description of the application&apos;s configured retention process, not a guarantee of deletion on a particular date. Information already delivered by email may be retained separately in Vcare&apos;s business email systems under its applicable retention practices.</p>
      <h2>Cookies and optional analytics</h2>
      <p>We use essential website functions and may use Google Analytics or Google Tag Manager to understand website usage. Optional analytics scripts are configured to load only after you choose to allow analytics. You can use the cookie choices shown on the website; contact us if you need help with your privacy preferences.</p>
      <h2>Your questions and requests</h2>
      <p>To ask about information you submitted, request access or correction, or ask for deletion where applicable, email <a href="mailto:sales@vcarehardwoodfloors.ca">sales@vcarehardwoodfloors.ca</a> or call <a href="tel:+16473914283">647 391 4283</a>. We may need to verify your request before taking action.</p>
      <p>This notice describes the current website implementation and should be reviewed by Vcare before production publication, including any additional business systems, third-party tools and legal requirements that apply.</p>
    </article>
  </>;
}
