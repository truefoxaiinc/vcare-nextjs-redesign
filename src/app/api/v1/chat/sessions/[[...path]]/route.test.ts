import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

import { DELETE, GET, POST } from './route';

const id = '123e4567-e89b-12d3-a456-426614174000';
const token = 'a'.repeat(40);
const previousFlag = process.env.VCARE_CHAT_PROXY_ENABLED;
const previousOrigin = process.env.VCARE_CHAT_BACKEND_ORIGIN;

afterEach(() => {
  vi.unstubAllGlobals();
  if (previousFlag === undefined) delete process.env.VCARE_CHAT_PROXY_ENABLED;
  else process.env.VCARE_CHAT_PROXY_ENABLED = previousFlag;
  if (previousOrigin === undefined) delete process.env.VCARE_CHAT_BACKEND_ORIGIN;
  else process.env.VCARE_CHAT_BACKEND_ORIGIN = previousOrigin;
});

function enable(origin = 'http://127.0.0.1:18690') {
  process.env.VCARE_CHAT_PROXY_ENABLED = 'true';
  process.env.VCARE_CHAT_BACKEND_ORIGIN = origin;
}

function context(...path: string[]) {
  return { params: Promise.resolve({ path }) };
}

describe('disabled-by-default chatbot proxy', () => {
  it('returns 404 and does not fetch without an explicit enable flag', async () => {
    delete process.env.VCARE_CHAT_PROXY_ENABLED;
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const result = await POST(new NextRequest('https://vcarehardwoodfloors.ca/api/v1/chat/sessions', {
      method: 'POST'
    }), context());
    expect(result.status).toBe(404);
    expect(result.headers.get('cache-control')).toContain('no-store');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each(['https://evil.example', 'http://evil.example', 'http://user:pass@127.0.0.1:18690'])(
    'rejects unapproved upstream %s', async (origin) => {
      enable(origin);
      const fetchMock = vi.fn();
      vi.stubGlobal('fetch', fetchMock);
      expect((await POST(new NextRequest('https://vcarehardwoodfloors.ca/api/v1/chat/sessions', {
        method: 'POST'
      }), context())).status).toBe(404);
      expect(fetchMock).not.toHaveBeenCalled();
    }
  );

  it('rejects cross-origin browser requests and unsupported paths', async () => {
    enable();
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    expect((await POST(new NextRequest('https://vcarehardwoodfloors.ca/api/v1/chat/sessions', {
      method: 'POST', headers: { Origin: 'https://evil.example' }
    }), context())).status).toBe(403);
    expect((await GET(new NextRequest('https://vcarehardwoodfloors.ca/api/v1/chat/sessions/' + id + '/history'), context(id, 'history'))).status).toBe(404);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('requires bearer auth and validates message body', async () => {
    enable();
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const url = 'https://vcarehardwoodfloors.ca/api/v1/chat/sessions/' + id + '/messages';
    expect((await POST(new NextRequest(url, {
      method: 'POST', body: JSON.stringify({ message: 'Hi' }),
      headers: { 'Content-Type': 'application/json' }
    }), context(id, 'messages'))).status).toBe(401);
    expect((await POST(new NextRequest(url, {
      method: 'POST', body: JSON.stringify({ message: 'Hi', extra: 'unexpected' }),
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }
    }), context(id, 'messages'))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('forwards only approved requests and strips unsafe upstream headers', async () => {
    enable();
    const fetchMock = vi.fn().mockResolvedValue(new Response(
      JSON.stringify({ products: [], source_commit: null, evidence_status: 'unavailable' }),
      { status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': 'secret=1', Location: 'https://evil.example' } }
    ));
    vi.stubGlobal('fetch', fetchMock);
    const result = await GET(new NextRequest(
      'https://vcarehardwoodfloors.ca/api/v1/chat/sessions/' + id + '/recommendations?q=vinyl',
      { headers: { Authorization: 'Bearer ' + token } }
    ), context(id, 'recommendations'));
    expect(result.status).toBe(200);
    expect(result.headers.get('set-cookie')).toBeNull();
    expect(result.headers.get('location')).toBeNull();
    expect(fetchMock).toHaveBeenCalledWith(
      'http://127.0.0.1:18690/api/v1/chat/sessions/' + id + '/recommendations?q=vinyl',
      expect.objectContaining({
        method: 'GET', redirect: 'manual', cache: 'no-store',
        headers: expect.objectContaining({ Authorization: 'Bearer ' + token })
      })
    );
  });

  it('blocks upstream redirects and permits session deletion', async () => {
    enable();
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response(null, {
      status: 302, headers: { Location: 'https://evil.example' }
    })).mockResolvedValueOnce(new Response(null, { status: 204 }));
    vi.stubGlobal('fetch', fetchMock);
    const url = 'https://vcarehardwoodfloors.ca/api/v1/chat/sessions/' + id;
    const req = () => new NextRequest(url, {
      method: 'DELETE', headers: { Authorization: 'Bearer ' + token }
    });
    expect((await DELETE(req(), context(id))).status).toBe(502);
    expect((await DELETE(req(), context(id))).status).toBe(204);
  });
});
