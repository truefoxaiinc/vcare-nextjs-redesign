import { describe, expect, it, vi } from 'vitest';
import { deliverNotificationEmail } from '@/lib/notification-delivery';

const enquiry = {
  name: 'Alex Chen',
  email: 'alex@example.com',
  phone: null,
  projectType: null,
  rooms: null,
  area: null,
  product: null,
  timeline: null,
  details: 'Test details'
};

describe('deliverNotificationEmail', () => {
  it('sends the enquiry to Resend and records provider acceptance', async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({ id: 'provider-id' }));

    const result = await deliverNotificationEmail(
      enquiry,
      { apiKey: 'test-api-key', from: 'website@example.test', to: 'sales@example.test' },
      fetcher
    );

    expect(result).toEqual({ ok: true, providerMessageId: 'provider-id' });
    const [, init] = fetcher.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(String(init.body));
    expect(body).toMatchObject({
      from: 'website@example.test',
      to: ['sales@example.test'],
      reply_to: 'alex@example.com'
    });
    expect(body.text).toContain('Project details:\nTest details');
  });

  it.each([
    [408, true],
    [429, true],
    [503, true],
    [401, false],
    [422, false]
  ])('classifies HTTP %s as retryable=%s', async (status, retryable) => {
    const fetcher = vi.fn().mockResolvedValue(new Response(null, { status }));
    const result = await deliverNotificationEmail(
      enquiry,
      { apiKey: 'test', from: 'website@example.test', to: 'sales@example.test' },
      fetcher
    );
    expect(result).toMatchObject({ ok: false, retryable, errorCode: `RESEND_HTTP_${status}` });
  });

  it('records network and timeout errors without exposing request data', async () => {
    const networkError = new Error('socket issue with request body containing PII');
    const networkResult = await deliverNotificationEmail(
      enquiry,
      { apiKey: 'test', from: 'website@example.test', to: 'sales@example.test' },
      vi.fn().mockRejectedValue(networkError)
    );
    expect(networkResult).toEqual({ ok: false, retryable: true, errorCode: 'RESEND_NETWORK' });

    const timeout = new Error('timeout');
    timeout.name = 'TimeoutError';
    const timeoutResult = await deliverNotificationEmail(
      enquiry,
      { apiKey: 'test', from: 'website@example.test', to: 'sales@example.test' },
      vi.fn().mockRejectedValue(timeout)
    );
    expect(timeoutResult).toEqual({ ok: false, retryable: true, errorCode: 'RESEND_TIMEOUT' });
  });
});
