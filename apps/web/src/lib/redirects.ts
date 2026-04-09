// ─────────────────────────────────────────────────────────────────────────────
// redirects.ts
//
// The authoritative map of WordPress → Next.js redirects for the dgtlgroup.io
// migration. Consumed by `src/proxy.ts` on every incoming request, BEFORE the
// host-based subdomain rewrite.
//
// Every legacy URL that existed on the WordPress site has one of three fates
// on the new site:
//
//   301 → a new URL   (permanent redirect, value propagates to the destination)
//   410 → Gone        (tells Google the URL is permanently deleted — used for
//                      placeholder / test / lorem-ipsum pages that should never
//                      have been indexed)
//   passthrough       (no entry here — the URL continues to resolve normally)
//
// Decisions were locked by Will on 2026-04-09 via docs/audit/url-decisions.xlsx.
// See docs/audit/wordpress-audit.md §"Decisions Locked" for full rationale.
// ─────────────────────────────────────────────────────────────────────────────

export type RedirectStatus = 301 | 308 | 410

export type Redirect = {
  /** Destination path on the new site. Ignored for 410 responses. */
  to: string
  /** HTTP status code. Defaults to 301 (permanent redirect). */
  status?: RedirectStatus
}

// ─────────────────────────────────────────────────────────────────────────────
// Exact-match redirects
//
// Keys are stored WITHOUT trailing slash. normaliseRedirectKey() strips the
// trailing slash from the incoming pathname before lookup, so both `/about-us`
// and `/about-us/` match the same entry.
// ─────────────────────────────────────────────────────────────────────────────

export const exactRedirects: Record<string, Redirect> = {
  // ── Marketing pages — renamed ──────────────────────────────────────────────
  '/about-us': { to: '/about' },
  '/contact-us': { to: '/contact' },
  '/join-dgtl-team': { to: '/careers' },
  '/join-dgtl-influence': { to: '/creators' },

  // ── Legal — moved to root (dropped /legal/ prefix) ─────────────────────────
  '/privacy-policy': { to: '/privacy' },
  '/terms-of-use': { to: '/terms' },

  // ── Blog — /insights/ collapsed into /blog, slugs trimmed ──────────────────
  '/insights': { to: '/blog' },

  // Real blog posts — trimmed slugs
  '/maximizing-your-digital-marketing-strategy': { to: '/blog/digital-marketing-strategy' },
  '/understanding-consumer-behavior-in-2025': { to: '/blog/consumer-behavior-2025' },
  '/essentials-when-building-new-website-ui-ux': { to: '/blog/ui-ux-essentials' },

  // /insights/ stub posts — collapsed into real blog posts
  '/insights/maximizing-your-digital-marketing-strategy': { to: '/blog/digital-marketing-strategy' },
  '/insights/understanding-consumer-behavior-in-2024': { to: '/blog/consumer-behavior-2025' },
  '/insights/the-future-of-digital-marketing': { to: '/blog' }, // stub with no content

  // ── Case studies — 2 kept with trimmed slugs ───────────────────────────────
  '/work/art-villas-costa-rica-content-campaign': { to: '/work/art-villas-costa-rica' },
  '/work/pacific-high-dewata-content-campaign': { to: '/work/pacific-high-dewata' },

  // ── Case studies — 10 dropped (ex-business-partner work) ───────────────────
  //    All 301 → /work, per Will's decision 2026-04-09
  '/work/six-senses-content-campaign': { to: '/work' },
  '/work/nebula-projector': { to: '/work' },
  '/work/canon': { to: '/work' },
  '/work/sounds-of-the-city-epidemic-sound-campaign': { to: '/work' },
  '/work/epidemicsound': { to: '/work' },
  '/work/a-day-with-swae-lee': { to: '/work' },
  '/work/jassa-dhillon-you-music-video': { to: '/work' },
  '/work/on-running-train-on-clouds': { to: '/work' },
  '/work/spider-man-raf-film': { to: '/work' },
  '/work/flockamg': { to: '/work' },
  '/work/lum': { to: '/work' },

  // ── Orphan root URLs — all 11 dropped (ex-partner / unrelated / sub-brands)
  '/dom': { to: '/' },
  '/lum': { to: '/' },
  '/tye': { to: '/' },
  '/stacy': { to: '/' },
  '/theburnstwins': { to: '/' },
  '/kamil': { to: '/' },
  '/5a1ive': { to: '/' },
  '/shane': { to: '/' },
  '/dmtv': { to: '/' },
  '/dgtltags': { to: '/' },
  '/lil-tjay-calgary-live-recap': { to: '/' },

  // ── Empty CPT entries — 301 to closest sensible page ───────────────────────
  '/client-feedback': { to: '/about' },
  '/client-feedback/filip-zak': { to: '/about' },
  '/testimonial': { to: '/about' },
  '/testimonial/filip_zak': { to: '/about' },

  // ── Placeholder / lorem-ipsum / test — 410 Gone ────────────────────────────
  '/services-lists/service-title-goes-here': { to: '/', status: 410 },
  '/services-lists/service-title-goes-here-2': { to: '/', status: 410 },
  '/client-feedback/jane-doe': { to: '/', status: 410 },
  '/testimonial/name-surname-4': { to: '/', status: 410 },
  '/testing-page': { to: '/', status: 410 },
  '/locations.kml': { to: '/', status: 410 },

  // ── WordPress sitemaps — collapsed to Next.js auto-generated sitemap ───────
  '/sitemap_index.xml': { to: '/sitemap.xml' },
  '/post-sitemap.xml': { to: '/sitemap.xml' },
  '/page-sitemap.xml': { to: '/sitemap.xml' },
  '/insights-sitemap.xml': { to: '/sitemap.xml' },
  '/services-list-sitemap.xml': { to: '/sitemap.xml' },
  '/client-feedback-sitemap.xml': { to: '/sitemap.xml' },
  '/testimonial-sitemap.xml': { to: '/sitemap.xml' },
  '/category-sitemap.xml': { to: '/sitemap.xml' },
  '/video-sitemap.xml': { to: '/sitemap.xml' },
  '/local-sitemap.xml': { to: '/sitemap.xml' },
}

// ─────────────────────────────────────────────────────────────────────────────
// Prefix redirects
//
// Matched AFTER exactRedirects, in array order. Any request whose normalised
// path equals `from` (without trailing slash) OR starts with `from` is caught
// by the rule.
//
// All `from` values here MUST end in a slash to prevent accidental substring
// matches (e.g. `/category/` must not also catch `/category-archive`).
// ─────────────────────────────────────────────────────────────────────────────

export const prefixRedirects: Array<{
  from: string
  to: string
  status?: RedirectStatus
}> = [
  // WordPress category archives — all collapse to the new /blog
  { from: '/category/', to: '/blog' },

  // WordPress feeds
  { from: '/feed/', to: '/blog' },
  { from: '/comments/feed/', to: '/blog' },

  // WordPress infrastructure — permanently gone
  { from: '/wp-admin/', to: '/', status: 410 },
  { from: '/wp-includes/', to: '/', status: 410 },
  { from: '/wp-json/', to: '/', status: 410 },
  { from: '/wp-content/', to: '/', status: 410 },
]

// ─────────────────────────────────────────────────────────────────────────────
// Lookup
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normalise a pathname for redirect-map lookup. Strips trailing slash (except
 * root), lowercases, and drops any query string / hash (middleware already
 * gives us a path-only URL, but belt-and-braces).
 */
export function normaliseRedirectKey(pathname: string): string {
  if (pathname === '/') return pathname
  let p = pathname.toLowerCase()
  // Strip query / hash if present
  const qIdx = p.indexOf('?')
  if (qIdx !== -1) p = p.slice(0, qIdx)
  const hIdx = p.indexOf('#')
  if (hIdx !== -1) p = p.slice(0, hIdx)
  // Strip trailing slash
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return p
}

/**
 * Look up the redirect for the given pathname. Returns null if no redirect
 * applies — caller should proceed with normal request handling.
 */
export function findRedirect(pathname: string): Redirect | null {
  const key = normaliseRedirectKey(pathname)

  // 1. Exact match
  const exact = exactRedirects[key]
  if (exact) return exact

  // 2. Prefix match (first matching rule wins)
  for (const rule of prefixRedirects) {
    // Treat `from` as a prefix. normaliseRedirectKey already dropped the
    // trailing slash, so we compare against the de-slashed prefix AND allow
    // the `key` to either equal it exactly or descend into it.
    const prefixNoSlash = rule.from.endsWith('/') ? rule.from.slice(0, -1) : rule.from
    if (key === prefixNoSlash || key.startsWith(rule.from)) {
      return { to: rule.to, status: rule.status }
    }
  }

  return null
}
