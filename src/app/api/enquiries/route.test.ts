import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const prismaMocks = vi.hoisted(() => ({
  create: vi.fn(),
  findUnique: vi.fn()
}));

vi.mock('@/lib/prisma', () => ({
  getPrisma: () => ({
    enquiry: {
      create: prismaMocks.create,
      findUnique: prismaMocks.findUnique
    }
  })
}));

import { POST } from '@/app/api/enquiries/route';

const validInput = {
  name: 'Alex Chen',
  email: 'alex@example.com',
  phone: '',
  projectType: 'Flooring supply',
  rooms: 'Living room',
  area: '620.5',
  product: 'Oak',
  timeline: 'Within 1–3 months',
  details: 'Project details',
  website: '',
  turnstileToken: 'test-turnstile-token'
};

function request(
  body: string,
  options: { contentType?: string; submissionKey?: string; contentLength?: string } = {}
) {
  const headers = new Headers({
    'Content-Type': options.contentType ?? 'application/json',
    'Idempotency-Key': options.submissionKey ?? 'b6d9a1d6-8818-4d56-a282-363321771147'
  });
  if (options.contentLength) headers.set('Content-Length', options.contentLength);
  return new NextRequest('https://example.test/api/enquiries', {
    method: 'POST',
    headers,
    body
  });
}

function verifiedTurnstile() {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
    Response.json({ success: true, action: 'vcare_enquiry', hostname: 'example.test' })
  ));
}

describe('POST /api/enquiries', () => {
  beforeEach(() => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', 'test-secret');
    prismaMocks.create.mockReset().mockResolvedValue({ id: 'enquiry-1' });
    prismaMocks.findUnique.mockReset().mockResolvedValue(null);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('rejects unsupported content types, malformed JSON, oversized requests, and missing idempotency keys', async () => {
    expect((await POST(request('{}', { contentType: 'text/plain' }))).status).toBe(415);
    expect((await POST(request('{'))).status).toBe(400);
    expect((await POST(request('{}', { contentLength: '16385' }))).status).toBe(413);
    expect((await POST(request(JSON.stringify({
      ...validInput,
      details: 'x'.repeat(16 * 1024)
    })))).status).toBe(413);
    expect((await POST(request('{}', { submissionKey: '' }))).status).toBe(400);
    expect(prismaMocks.create).not.toHaveBeenCalled();
  });

  it('rejects honeypot and invalid fields before Turnstile or persistence', async () => {
    const fetcher = vi.fn();
    vi.stubGlobal('fetch', fetcher);
    expect((await POST(request(JSON.stringify({ ...validInput, website: 'bot' })))).status).toBe(400);
    expect((await POST(request(JSON.stringify({ ...validInput, email: 'bad' })))).status).toBe(400);
    expect(prismaMocks.create).not.toHaveBeenCalled();
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('fails closed when Turnstile configuration is missing or verification is rejected', async () => {
    vi.stubEnv('TURNSTILE_SECRET_KEY', '');
    expect((await POST(request(JSON.stringify(validInput)))).status).toBe(503);

    vi.stubEnv('TURNSTILE_SECRET_KEY', 'test-secret');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
      Response.json({ success: false, action: 'vcare_enquiry', hostname: 'example.test' })
    ));
    expect((await POST(request(JSON.stringify(validInput)))).status).toBe(400);

    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
    expect((await POST(request(JSON.stringify(validInput)))).status).toBe(503);
    expect(prismaMocks.create).not.toHaveBeenCalled();
  });

  it('atomically creates the enquiry and pending notification job after Turnstile succeeds', async () => {
    verifiedTurnstile();
    const response = await POST(request(JSON.stringify(validInput)));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(prismaMocks.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        submissionKey: 'b6d9a1d6-8818-4d56-a282-363321771147',
        email: 'alex@example.com',
        area: expect.anything(),
        notificationJob: { create: { provider: 'resend' } }
      }),
      select: { id: true }
    }));
    const savedData = prismaMocks.create.mock.calls[0][0].data;
    expect(savedData.turnstileToken).toBeUndefined();
    expect(savedData.notificationJob.create).toBeDefined();
  });

  it('returns success for a duplicate idempotency key without making another job', async () => {
    verifiedTurnstile();
    prismaMocks.create.mockRejectedValue({ code: 'P2002' });
    prismaMocks.findUnique.mockResolvedValue({ id: 'existing-enquiry' });

    const response = await POST(request(JSON.stringify(validInput)));

    expect(response.status).toBe(200);
    expect(prismaMocks.create).toHaveBeenCalledTimes(1);
    expect(prismaMocks.findUnique).toHaveBeenCalledWith({
      where: { submissionKey: 'b6d9a1d6-8818-4d56-a282-363321771147' },
      select: { id: true }
    });
  });

  it('does not return success when database persistence fails', async () => {
    verifiedTurnstile();
    prismaMocks.create.mockRejectedValue(new Error('database unavailable'));
    const log = vi.spyOn(console, 'error').mockImplementation(() => {});

    const response = await POST(request(JSON.stringify(validInput)));

    expect(response.status).toBe(503);
    expect((await response.json()).ok).toBe(false);
    expect(log).toHaveBeenCalledWith('Failed to persist an enquiry and its notification job.');
  });
});
