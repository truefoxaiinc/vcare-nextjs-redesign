import {
  classifyResendFailure,
  type DeliveryResult,
  type NotificationPayload
} from '@/lib/notification-queue';

export type ResendConfiguration = {
  apiKey: string;
  from: string;
  to: string;
};

function emailText(enquiry: NotificationPayload): string {
  return [
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
  ].join('\n');
}

export async function deliverNotificationEmail(
  enquiry: NotificationPayload,
  configuration: ResendConfiguration,
  fetcher: typeof fetch = fetch
): Promise<DeliveryResult> {
  let response: Response;
  try {
    response = await fetcher('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${configuration.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: configuration.from,
        to: [configuration.to],
        reply_to: enquiry.email,
        subject: 'New Vcare website flooring enquiry',
        text: emailText(enquiry)
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(10_000)
    });
  } catch (error) {
    return {
      ok: false,
      retryable: true,
      errorCode: error instanceof Error && error.name === 'TimeoutError' ? 'RESEND_TIMEOUT' : 'RESEND_NETWORK'
    };
  }

  if (!response.ok) return { ok: false, ...classifyResendFailure(response.status) };

  let providerMessageId: string | null = null;
  try {
    const result: unknown = await response.json();
    if (
      typeof result === 'object' &&
      result !== null &&
      'id' in result &&
      typeof result.id === 'string'
    ) {
      providerMessageId = result.id.slice(0, 255);
    }
  } catch {
    // The provider accepted the email; a malformed optional response ID does not undo that acceptance.
  }
  return { ok: true, providerMessageId };
}
