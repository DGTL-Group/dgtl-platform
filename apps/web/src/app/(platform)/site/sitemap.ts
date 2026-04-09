import type { MetadataRoute } from 'next'

/**
 * Sitemap for dgtlgroup.io — the 15-page marketing site locked 2026-04-09.
 *
 * Physical path: /site/sitemap.xml (served from inside the (platform) route
 * group). Public URL: dgtlgroup.io/sitemap.xml, rewritten to /site/sitemap.xml
 * by src/proxy.ts on the way in.
 *
 * This is a hand-maintained list for the scaffold phase. Once Payload CMS
 * collections (Pages, CaseStudies, Posts) are live in Phase 03/04 this file
 * will be rewritten to pull its entries directly from Payload so the sitemap
 * stays in sync with the published content automatically.
 */

const BASE = 'https://dgtlgroup.io'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    // ── Core marketing ────────────────────────────────────────────────────
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/work`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },

    // ── Case studies ──────────────────────────────────────────────────────
    { url: `${BASE}/work/art-villas-costa-rica`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${BASE}/work/pacific-high-dewata`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },

    // ── Blog ──────────────────────────────────────────────────────────────
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/blog/digital-marketing-strategy`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog/consumer-behavior-2025`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog/ui-ux-essentials`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },

    // ── Join DGTL ─────────────────────────────────────────────────────────
    { url: `${BASE}/careers`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/creators`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },

    // ── Legal ─────────────────────────────────────────────────────────────
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
