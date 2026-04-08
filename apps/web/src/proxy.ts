import { NextResponse, type NextRequest } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────────
// proxy.ts — Next.js 16 renamed `middleware.ts` to `proxy.ts` and the exported
// function from `middleware` to `proxy`. The old names are deprecated but still
// work; this project uses the new names.
//
// Subdomain → URL-prefix routing:
//   - `dgtlgroup.io/*`            → internally rewritten to `/site/*`
//   - `dashboard.dgtlgroup.io/*`  → internally rewritten to `/dashboard/*`
//
// Payload admin (`/admin/*`) and Payload API (`/api/*`) are passthrough —
// they resolve directly from the (payload) route group regardless of host.
//
// Rewrites are INTERNAL — the user's browser still sees the original URL, so
// `dgtlgroup.io/about` renders `src/app/(platform)/site/about/page.tsx` while
// the visible URL stays `dgtlgroup.io/about`.
// ─────────────────────────────────────────────────────────────────────────────

const DASHBOARD_HOSTS = new Set([
  'dashboard.dgtlgroup.io',
  'dashboard.localhost',
  'dashboard.localhost:3000',
])

const SITE_HOSTS = new Set([
  'dgtlgroup.io',
  'www.dgtlgroup.io',
  'localhost',
  'localhost:3000',
  '127.0.0.1',
  '127.0.0.1:3000',
])

export function proxy(request: NextRequest) {
  const url = request.nextUrl
  const host = request.headers.get('host')?.toLowerCase() ?? ''

  // Payload routes always passthrough, regardless of host.
  if (
    url.pathname === '/admin' ||
    url.pathname.startsWith('/admin/') ||
    url.pathname === '/api' ||
    url.pathname.startsWith('/api/')
  ) {
    return NextResponse.next()
  }

  // If the URL already carries a prefix we would rewrite to, don't double-wrap.
  if (
    url.pathname === '/site' ||
    url.pathname.startsWith('/site/') ||
    url.pathname === '/dashboard' ||
    url.pathname.startsWith('/dashboard/')
  ) {
    return NextResponse.next()
  }

  const rewrite = url.clone()

  if (DASHBOARD_HOSTS.has(host)) {
    rewrite.pathname = `/dashboard${url.pathname === '/' ? '' : url.pathname}` || '/dashboard'
    return NextResponse.rewrite(rewrite)
  }

  // Default: treat the request as a site request.
  if (SITE_HOSTS.has(host) || host.endsWith('.hostingersite.com')) {
    rewrite.pathname = `/site${url.pathname === '/' ? '' : url.pathname}` || '/site'
    return NextResponse.rewrite(rewrite)
  }

  // Unknown host — default to the marketing site rather than 404ing.
  rewrite.pathname = `/site${url.pathname === '/' ? '' : url.pathname}` || '/site'
  return NextResponse.rewrite(rewrite)
}

export const config = {
  // Run on every request except Next.js internals and static assets.
  // The negative lookahead excludes: _next (framework assets), static files
  // with common extensions, and favicon/robots/sitemap top-level files.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|woff2?|ttf|map)$).*)',
  ],
}
