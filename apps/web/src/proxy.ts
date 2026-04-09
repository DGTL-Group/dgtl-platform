import { NextResponse, type NextRequest } from 'next/server'
import { findRedirect } from './lib/redirects'

// ─────────────────────────────────────────────────────────────────────────────
// proxy.ts — Next.js 16 renamed `middleware.ts` to `proxy.ts` and the exported
// function from `middleware` to `proxy`. The old names are deprecated but still
// work; this project uses the new names.
//
// Request lifecycle (in order):
//
//   1. Legacy URL redirect check — every path the WordPress site used to serve
//      has an entry in src/lib/redirects.ts. Matched legacy URLs return a 301
//      (most), a 308, or a 410 Gone (placeholder / test / lorem-ipsum pages).
//
//   2. Payload passthrough — /admin/* and /api/* resolve directly from the
//      (payload) route group regardless of host.
//
//   3. Internal-prefix passthrough — if the URL already carries /site/* or
//      /dashboard/* (e.g. the user hit the internal URL directly, or we already
//      rewrote it once), don't double-wrap.
//
//   4. Host-aware rewrite —
//        dgtlgroup.io/foo            → /site/foo
//        dashboard.dgtlgroup.io/foo  → /dashboard/foo
//      Rewrites are INTERNAL: the user's browser still sees the original URL.
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

  // ── 1. Legacy URL redirects (301 / 308 / 410) ──────────────────────────────
  // Check FIRST, before any subdomain rewrite, so that the redirect destination
  // gets a clean follow-up request instead of a rewritten one.
  const redirect = findRedirect(url.pathname)
  if (redirect) {
    if (redirect.status === 410) {
      return new NextResponse(
        '<!doctype html><html><head><meta charset="utf-8"><title>410 Gone</title></head>' +
        '<body><h1>410 Gone</h1><p>This page has been permanently removed.</p></body></html>',
        {
          status: 410,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        },
      )
    }
    const dest = url.clone()
    dest.pathname = redirect.to
    // Drop the query string by default on legacy URL redirects — most legacy
    // WordPress URLs carried tracking params (utm_*, fbclid) that we don't
    // want to propagate to clean new URLs.
    dest.search = ''
    return NextResponse.redirect(dest, redirect.status ?? 301)
  }

  // ── 2. Payload passthrough ─────────────────────────────────────────────────
  if (
    url.pathname === '/admin' ||
    url.pathname.startsWith('/admin/') ||
    url.pathname === '/api' ||
    url.pathname.startsWith('/api/')
  ) {
    return NextResponse.next()
  }

  // ── 3. Internal-prefix passthrough ─────────────────────────────────────────
  if (
    url.pathname === '/site' ||
    url.pathname.startsWith('/site/') ||
    url.pathname === '/dashboard' ||
    url.pathname.startsWith('/dashboard/')
  ) {
    return NextResponse.next()
  }

  // ── 4. Host-aware rewrite ──────────────────────────────────────────────────
  const rewrite = url.clone()

  if (DASHBOARD_HOSTS.has(host)) {
    rewrite.pathname = `/dashboard${url.pathname === '/' ? '' : url.pathname}` || '/dashboard'
    return NextResponse.rewrite(rewrite)
  }

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
  //
  // NOTE: `.xml` is intentionally NOT in the extension exclusion so that
  // /sitemap.xml (and all the legacy WP sitemap files — /sitemap_index.xml,
  // /post-sitemap.xml, etc.) pass through the proxy. This is how the sitemap
  // redirects in lib/redirects.ts fire AND how the new /sitemap.xml gets
  // rewritten to /site/sitemap.xml so Next can find it in the (platform)/site
  // route group.
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|css|js|woff2?|ttf|map)$).*)',
  ],
}
