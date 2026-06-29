const PUBLIC = /^\/(login\.html|icon\.svg)$/;

function getCookie(request, name) {
  const header = request.headers.get('cookie') || '';
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export default function middleware(request) {
  const { pathname } = new URL(request.url);

  if (PUBLIC.test(pathname) || pathname.startsWith('/api/')) return;

  const token = getCookie(request, 'tabaco_auth');
  const adminToken = process.env.AUTH_TOKEN;
  const readonlyToken = process.env.READONLY_TOKEN;

  if (token && (token === adminToken || (readonlyToken && token === readonlyToken))) return;

  return Response.redirect(new URL('/login.html', request.url));
}

export const config = {
  matcher: ['/((?!_vercel).*)'],
};
