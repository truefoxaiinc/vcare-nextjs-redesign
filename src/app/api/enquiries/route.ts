import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const maxBodyBytes = 16 * 1024;
const turnstileAction = 'vcare_enquiry';
const projectTypes = new Set([
  'Flooring supply',
  'Supply and installation',
  'Installation support',
  "I'm still exploring"
]);
const timelines = new Set([
  'As soon as possible',
  'Within 1–3 months',
  'Later this year',
  'Just planning ahead'
]);

type Enquiry = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  rooms: string;
  area: string;
  product: string;
  timeline: string;
  details: string;
  turnstileToken: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readText(value: unknown, maxLength: number, required = false, multiline = false): string | null {
  if (typeof value !== 'string') return required ? null : '';
  const cleaned = value.normalize('NFC').replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '');
  const normalized = (multiline ? cleaned : cleaned.replace(/\s+/g, ' ')).trim();
  if (normalized.length > maxLength || (required && !normalized)) return null;
  return normalized;
}

function parseEnquiry(value: unknown): { enquiry: Enquiry; error?: never } | { enquiry?: never; error: string } {
  if (!isRecord(value)) return { error: 'Please check the form and try again.' };
  if (typeof value.website === 'string' && value.website.trim()) {
    return { error: 'We could not verify this request. Please try again.' };
  }

  const name = readText(value.name, 100, true);
  const email = readText(value.email, 254, true)?.toLowerCase() ?? null;
  const phone = readText(value.phone, 40);
  const projectType = readText(value.projectType, 60);
  const rooms = readText(value.rooms, 200);
  const product = readText(value.product, 120);
  const timeline = readText(value.timeline, 40);
  const details = readText(value.details, 3000, false, true);
  const areaValue = value.area;
  let area = '';

  if (
    name === null ||
    email === null ||
    phone === null ||
    projectType === null ||
    rooms === null ||
    product === null ||
    timeline === null ||
    details === null
  ) {
    return { error: 'Please check the form fields and keep each answer within its allowed length.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Enter a valid email address.' };
  }
  if (projectType && !projectTypes.has(projectType)) {
    return { error: 'Choose a valid project type.' };
  }
  if (timeline && !timelines.has(timeline)) {
    return { error: 'Choose a valid timeline.' };
  }

  if (areaValue !== '' && areaValue !== null && areaValue !== undefined) {
    if (typeof areaValue !== 'number' && typeof areaValue !== 'string') {
      return { error: 'Enter a valid approximate area.' };
    }
    const parsedArea = typeof areaValue === 'number' ? areaValue : Number(areaValue);
    if (!Number.isFinite(parsedArea) || parsedArea < 0 || parsedArea > 100000) {
      return { error: 'Enter an approximate area between 0 and 100,000 square feet.' };
    }
    area = String(parsedArea);
  }

  const turnstileToken = readText(value.turnstileToken, 2048, true);
  if (turnstileToken === null) {
    return { error: 'Complete the spam check and submit again.' };
  }

  return {
    enquiry: { name, email, phone, projectType, rooms, area, product, timeline, details, turnstileToken }
  };
}

async function verifyTurnstile(
  token: string,
  secret: string,
  hostname: string
): Promise<'verified' | 'rejected' | 'unavailable'> {
  let response: Response;
  try {
    response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
      cache: 'no-store',
      signal: AbortSignal.timeout(5000)
    });
  } catch {
    return 'unavailable';
  }

  if (!response.ok) return 'unavailable';

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    return 'unavailable';
  }

  if (
    isRecord(result) &&
    result.success === true &&
    result.action === turnstileAction &&
    result.hostname === hostname
  ) {
    return 'verified';
  }
  return 'rejected';
}

function responseError(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

async function readJsonBody(
  request: NextRequest
): Promise<{ body: unknown; status?: never } | { body?: never; status: 400 | 413 }> {
  const reader = request.body?.getReader();
  if (!reader) return { status: 400 };

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      totalBytes += chunk.value.byteLength;
      if (totalBytes > maxBodyBytes) {
        await reader.cancel();
        return { status: 413 };
      }
      chunks.push(chunk.value);
    }
  } catch {
    return { status: 400 };
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return { body: JSON.parse(new TextDecoder().decode(bytes)) as unknown };
  } catch {
    return { status: 400 };
  }
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > maxBodyBytes) {
    return responseError(413, 'The form submission is too large.');
  }
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return responseError(415, 'Unsupported form submission.');
  }

  const { body, status } = await readJsonBody(request);
  if (status === 413) return responseError(413, 'The form submission is too large.');
  if (status === 400 || body === undefined) return responseError(400, 'Please check the form and try again.');

  const parsed = parseEnquiry(body);
  if (!parsed.enquiry) return responseError(400, parsed.error);

  const { RESEND_API_KEY, RESEND_FROM_EMAIL, QUOTE_TO_EMAIL, TURNSTILE_SECRET_KEY } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !QUOTE_TO_EMAIL || !TURNSTILE_SECRET_KEY) {
    return responseError(
      503,
      'Online enquiry submission is temporarily unavailable. Please contact Vcare directly.'
    );
  }

  const verification = await verifyTurnstile(
    parsed.enquiry.turnstileToken,
    TURNSTILE_SECRET_KEY,
    new URL(request.url).hostname
  );
  if (verification === 'unavailable') {
    return responseError(503, 'The spam check is temporarily unavailable. Please try again shortly.');
  }
  if (verification === 'rejected') {
    return responseError(400, 'The spam check could not verify your request. Please try again.');
  }

  const enquiry = parsed.enquiry;
  const lines = [
    'A new flooring enquiry was submitted through the Vcare website.',
    '',
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || 'Not provided'}`,
    `Project type: ${enquiry.projectType || 'Not provided'}`,
    `Room(s): ${enquiry.rooms || 'Not provided'}`,
    `Approximate area (sq. ft.): ${enquiry.area || 'Not provided'}`,
    `Preferred floor: ${enquiry.product || 'Not provided'}`,
    `Timeline: ${enquiry.timeline || 'Not provided'}`,
    '',
    'Project details:',
    enquiry.details || 'Not provided'
  ];

  let emailResponse: Response;
  try {
    emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL,
        to: [QUOTE_TO_EMAIL],
        reply_to: enquiry.email,
        subject: 'New Vcare website flooring enquiry',
        text: lines.join('\n')
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10000)
    });
  } catch (error) {
    console.error(
      error instanceof Error && error.name === 'TimeoutError'
        ? 'Resend enquiry request timed out.'
        : 'Resend enquiry request failed due to a network error.'
    );
    return responseError(502, 'We could not submit your request. Please try again or contact Vcare directly.');
  }

  if (!emailResponse.ok) {
    console.error(`Resend rejected the enquiry request with status ${emailResponse.status}.`);
    return responseError(502, 'We could not submit your request. Please try again or contact Vcare directly.');
  }

  return NextResponse.json({
    ok: true,
    message: 'Your enquiry was accepted for processing. This does not confirm email delivery.'
  });
}
