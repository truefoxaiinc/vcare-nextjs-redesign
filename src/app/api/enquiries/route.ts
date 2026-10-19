import { NextRequest, NextResponse } from 'next/server';
import { parseEnquiry } from '@/lib/enquiry-validation';

export const runtime = 'nodejs';

const maxBodyBytes = 16 * 1024;
const turnstileAction = 'vcare_enquiry';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
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

  const submissionKey = request.headers.get('idempotency-key')?.toLowerCase();
  if (!submissionKey || !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(submissionKey)) {
    return responseError(400, 'Please refresh the form and submit again.');
  }

  const { TURNSTILE_SECRET_KEY } = process.env;
  if (!TURNSTILE_SECRET_KEY) return responseError(503, 'The spam check is not configured.');

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

  try {
    const { getPrisma } = await import('@/lib/prisma');
    const { Prisma } = await import('@/generated/prisma/client');
    const prisma = getPrisma();
    await prisma.enquiry.create({
      data: {
        submissionKey,
        name: parsed.enquiry.name,
        email: parsed.enquiry.email,
        phone: parsed.enquiry.phone || null,
        projectType: parsed.enquiry.projectType || null,
        rooms: parsed.enquiry.rooms || null,
        area: parsed.enquiry.area ? new Prisma.Decimal(parsed.enquiry.area) : null,
        product: parsed.enquiry.product || null,
        timeline: parsed.enquiry.timeline || null,
        details: parsed.enquiry.details || null,
        notificationJob: {
          create: {
            provider: 'resend'
          }
        }
      },
      select: { id: true }
    });
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
      try {
        const { getPrisma } = await import('@/lib/prisma');
        const prisma = getPrisma();
        const existing = await prisma.enquiry.findUnique({
          where: { submissionKey },
          select: { id: true }
        });
        if (existing) {
          return NextResponse.json({
            ok: true,
            message: 'Your enquiry was accepted for processing. This does not confirm email delivery.'
          });
        }
      } catch {
        console.error('Failed to confirm an idempotent enquiry retry.');
        return responseError(503, 'We could not save your enquiry. Please try again or contact Vcare directly.');
      }
    }
    console.error('Failed to persist an enquiry and its notification job.');
    return responseError(503, 'We could not save your enquiry. Please try again or contact Vcare directly.');
  }

  return NextResponse.json({
    ok: true,
    message: 'Your enquiry was accepted for processing. This does not confirm email delivery.'
  });
}
