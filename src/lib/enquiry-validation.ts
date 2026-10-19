export type EnquiryInput = {
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

export type ParseEnquiryResult =
  | { enquiry: EnquiryInput; error?: never }
  | { enquiry?: never; error: string };

export function parseEnquiry(value: unknown): ParseEnquiryResult {
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
