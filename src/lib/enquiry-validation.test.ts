import { describe, expect, it } from 'vitest';
import { parseEnquiry } from '@/lib/enquiry-validation';

const validInput = {
  name: '  Alex   Chen ',
  email: ' ALEX@example.com ',
  phone: '',
  projectType: 'Flooring supply',
  rooms: 'Living room',
  area: '620.5',
  product: 'Oak',
  timeline: 'Within 1–3 months',
  details: 'Project details',
  turnstileToken: 'not-persisted'
};

describe('parseEnquiry', () => {
  it('normalizes accepted fields and retains the verification token only for verification', () => {
    expect(parseEnquiry(validInput)).toEqual({
      enquiry: {
        name: 'Alex Chen',
        email: 'alex@example.com',
        phone: '',
        projectType: 'Flooring supply',
        rooms: 'Living room',
        area: '620.5',
        product: 'Oak',
        timeline: 'Within 1–3 months',
        details: 'Project details',
        turnstileToken: 'not-persisted'
      }
    });
  });

  it.each([
    [null, 'Please check the form and try again.'],
    [{ ...validInput, name: ' ' }, 'Please check the form fields and keep each answer within its allowed length.'],
    [{ ...validInput, email: 'invalid' }, 'Enter a valid email address.'],
    [{ ...validInput, projectType: 'Other' }, 'Choose a valid project type.'],
    [{ ...validInput, timeline: 'Tomorrow' }, 'Choose a valid timeline.'],
    [{ ...validInput, area: '100001' }, 'Enter an approximate area between 0 and 100,000 square feet.'],
    [{ ...validInput, turnstileToken: '' }, 'Complete the spam check and submit again.'],
    [{ ...validInput, website: 'bot' }, 'We could not verify this request. Please try again.']
  ])('rejects invalid input', (value, error) => {
    expect(parseEnquiry(value)).toEqual({ error });
  });
});
