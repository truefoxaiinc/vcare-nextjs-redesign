import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Context = { params: Promise<{ path?: string[] }> };
const sessionId = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const noStore = { 'Cache-Control': 'private, no-store, max-age=0', 'X-Robots-Tag': 'noindex' };
const MAX_BODY = 4096;
const MAX_RESPONSE = 64 * 1024;

function error(status: number) {
  return NextResponse.json({ detail: 'Chat service unavailable or invalid request' }, { status, headers: noStore });
}

function configuredUpstream(): string | null {
  if (process.env.VCARE_CHAT_PROXY_ENABLED !== 'true') return null;
  const raw = process.env.VCARE_CHAT_BACKEND_ORIGIN;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    const local = ['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname);
    // A server-only allowlist is mandatory for remote HTTPS upstreams.
    // Merely setting BACKEND_ORIGIN must not authorize an arbitrary host.
    const allowedHosts = (process.env.VCARE_CHAT_BACKEND_ALLOWED_HOSTS ?? '')
      .split(',')
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean);
    const allowedRemote = url.protocol === 'https:' && allowedHosts.includes(url.hostname.toLowerCase());
    if (
      !(local && url.protocol === 'http:') &&
      !allowedRemote
    ) return null;
    if (
      url.username || url.password || url.pathname !== '/' || url.search || url.hash ||
      (url.port && !/^\\d{1,5}$/.test(url.port))
    ) return null;
    return url.origin;
  } catch {
    return null;
  }
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // Non-browser clients are subject to backend bearer auth and throttling.
  try {
    return new URL(origin).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}

function routeFor(parts: string[], method: string): string | null {
  if (parts.length === 0 && method === 'POST') return '/api/v1/chat/sessions';
  if (parts.length === 1 && sessionId.test(parts[0]) && method === 'DELETE') {
    return '/api/v1/chat/sessions/' + parts[0];
  }
  if (parts.length === 2 && sessionId.test(parts[0])) {
    if (parts[1] === 'messages' && method === 'POST') {
      return '/api/v1/chat/sessions/' + parts[0] + '/messages';
    }
    if (parts[1] === 'recommendations' && method === 'GET') {
      return '/api/v1/chat/sessions/' + parts[0] + '/recommendations';
    }
  }
  return null;
}

async function readBody(request: NextRequest): Promise<string | null> {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return null;
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY) return null;
  try {
    const bytes = await request.arrayBuffer();
    if (bytes.byteLength > MAX_BODY) return null;
    const body = JSON.parse(new TextDecoder().decode(bytes)) as unknown;
    if (!body || typeof body !== 'object' || Array.isArray(body)) return null;
    const value = body as Record<string, unknown>;
    if (
      Object.keys(value).length !== 1 ||
      typeof value.message !== 'string' ||
      !value.message.trim() ||
      value.message.length > 2000
    ) return null;
    return JSON.stringify({ message: value.message });
  } catch {
    return null;
  }
}

async function handle(request: NextRequest, context: Context): Promise<NextResponse> {
  const upstream = configuredUpstream();
  if (!upstream) return error(404);
  if (!sameOrigin(request)) return error(403);
  const { path = [] } = await context.params;
  const target = routeFor(path, request.method);
  if (!target) return error(404);
  const isCreate = path.length === 0;
  const authorization = request.headers.get('authorization');
  if (!isCreate && (!authorization || !/^Bearer [A-Za-z0-9_-]{24,256}$/.test(authorization))) {
    return error(401);
  }
  const query = request.nextUrl.searchParams;
  if (request.method === 'GET') {
    if (query.size !== 1 || !query.has('q')) return error(400);
    const q = query.get('q') ?? '';
    if (q.trim().length < 2 || q.length > 120) return error(400);
  } else if (query.size !== 0) return error(400);
  let body: string | undefined;
  if (!isCreate && request.method === 'POST') {
    const parsed = await readBody(request);
    if (parsed === null) return error(400);
    body = parsed;
  }
  const url = upstream + target + (request.method === 'GET' ? '?q=' + encodeURIComponent(query.get('q')!) : '');
  try {
    const response = await fetch(url, {
      method: request.method,
      headers: {
        Accept: 'application/json',
        ...(authorization && !isCreate ? { Authorization: authorization } : {}),
        ...(body ? { 'Content-Type': 'application/json' } : {})
      },
      body,
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(15000)
    });
    if (response.status >= 300 && response.status < 400) return error(502);
    const length = Number(response.headers.get('content-length') ?? 0);
    if (length > MAX_RESPONSE) return error(502);
    if (response.status === 204) {
      await response.body?.cancel();
      return new NextResponse(null, { status: 204, headers: noStore });
    }
    const data = await response.arrayBuffer();
    if (data.byteLength > MAX_RESPONSE) return error(502);
    const status = [200, 201, 400, 401, 403, 404, 422, 429, 503].includes(response.status)
      ? response.status : 502;
    if (status === 502) return error(502);
    if (!response.headers.get('content-type')?.toLowerCase().includes('application/json')) return error(502);
    // Never forward upstream Set-Cookie, Location, CORS or caching headers.
    return new NextResponse(data, {
      status,
      headers: { ...noStore, 'Content-Type': 'application/json; charset=utf-8' }
    });
  } catch {
    return error(503);
  }
}

export async function GET(request: NextRequest, context: Context) { return handle(request, context); }
export async function POST(request: NextRequest, context: Context) { return handle(request, context); }
export async function DELETE(request: NextRequest, context: Context) { return handle(request, context); }
