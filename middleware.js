// Vercel Edge Middleware: houdt alles achter het wachtwoord,
// behalve de loginpagina zelf en de stylesheet.

const OPEN_PADEN = new Set(['/login', '/login.html', '/api/login', '/style.css', '/favicon.ico']);

async function sha256(tekst) {
  const data = new TextEncoder().encode(tekst);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function leesCookie(request, naam) {
  const header = request.headers.get('cookie') || '';
  for (const deel of header.split(';')) {
    const [sleutel, ...rest] = deel.trim().split('=');
    if (sleutel === naam) return rest.join('=');
  }
  return null;
}

export default async function middleware(request) {
  const { pathname } = new URL(request.url);
  if (OPEN_PADEN.has(pathname)) return;

  const wachtwoord = process.env.WEDDING_PASSWORD;
  if (wachtwoord) {
    const cookie = leesCookie(request, 'trouw_auth');
    if (cookie && cookie === (await sha256(wachtwoord))) return;
  }

  return Response.redirect(new URL('/login.html', request.url), 302);
}
