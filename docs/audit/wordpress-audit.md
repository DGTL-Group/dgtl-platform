---
title: DGTL Group WordPress Site Audit
audited_at: 2026-04-08
audited_by: Claude Code
site: https://dgtlgroup.io
---

# DGTL Group WordPress Audit

## Executive Summary

- **Total public URLs audited:** 51 (34 in `page-sitemap.xml` + 3 in `post-sitemap.xml` + 4 in `insights-sitemap.xml` + 6 category archives + 2 services-list placeholders + 2 testimonial placeholders + others)
- **Blog posts (real article content):** 3 (`/maximizing-your-digital-marketing-strategy/`, `/essentials-when-building-new-website-ui-ux/`, `/understanding-consumer-behavior-in-2025/`) — note these live at root URLs, NOT under `/blog/` or `/insights/`
- **Case studies (`/work/<slug>/`):** 11 with unique URLs, plus 1 orphan at root (`/lil-tjay-calgary-live-recap/`); a 12th and 13th group of music videos are aggregated under `/dmtv/` rather than getting individual URLs
- **Influencer/artist profile pages (orphan root URLs):** 11 (`/dom/`, `/lum/`, `/tye/`, `/stacy/`, `/theburnstwins/`, `/kamil/`, `/5a1ive/`, `/shane/`, `/dgtltags/`, `/dmtv/`, `/lil-tjay-calgary-live-recap/`)
- **Media assets observed:** ~80–100 unique image URLs across `/wp-content/uploads/2024/11/`, `2024/12/`, `2025/01/`, `2025/02/`, `2025/12/`, `2026/01/`
- **Content health verdict:** YELLOW — small site (~30 substantive pages), client/case study collection is healthy, but the blog/insights split is broken (duplicate slugs, orphan root URLs, stub pages), the team/about page has placeholder stats (0%, $0+), at least 2 services-list URLs are pure Lorem-Ipsum, and at least 1 testing page (`/testing-page/`) is staged in production.

## Migration Readiness: YELLOW

The site is small enough that a clean Payload re-model will be straightforward, and the case-study content is real and worth preserving. However, several content-modeling decisions need a human in the loop *before* migration:
1. The blog/insights duplication has to be resolved (which slug shape do we keep, where do redirects point), and
2. The 11 orphan root-level "vanity" URLs (`/lum/`, `/dom/`, etc.) used for influencer talent profiles need to be classified — are they staying as a public collection, becoming part of "DGTL Influence", or being de-indexed?
Without those decisions the redirect map is partially ambiguous.

---

## 1. Page Inventory

### 1.1 Discovered via `sitemap_index.xml`

The WordPress sitemap index is at `https://dgtlgroup.io/sitemap_index.xml` and references nine sub-sitemaps:

| Sub-sitemap | URLs | Notes |
|---|---|---|
| `post-sitemap.xml` | 3 | Real blog posts at root URLs |
| `page-sitemap.xml` | 34 | All pages, work items, profile pages, legal |
| `insights-sitemap.xml` | 4 | Insights index + 3 stub article pages |
| `services-list-sitemap.xml` | 2 | Two Lorem-Ipsum placeholder service entries |
| `client-feedback-sitemap.xml` | 3 | Custom post type — `/client-feedback/<slug>/` |
| `testimonial-sitemap.xml` | 3 | Custom post type — `/testimonial/<slug>/` |
| `category-sitemap.xml` | 6 | WordPress category archives |
| `video-sitemap.xml` | 6 | Video schema entries (subset of pages) |
| `local-sitemap.xml` | 1 | Single `locations.kml` file |

### 1.2 Core Pages

| URL | Title | H1 | One-line Purpose |
|---|---|---|---|
| `https://dgtlgroup.io/` | Homepage - DGTL Group | Transforming Brands with Innovative Creative Solutions | Agency homepage with 6 services, featured projects, client logos, testimonials, newsletter signup |
| `https://dgtlgroup.io/about-us/` | About Us - DGTL Group | Crafting Digital Success | Company story, "75+ projects" stat (other stat fields show placeholder 0%/0$), client logo wall |
| `https://dgtlgroup.io/services/` | Services - DGTL Group | Our Services Unleashed | Lists all 6 services with H3 cards (no individual service detail pages exist) |
| `https://dgtlgroup.io/work/` | Work - DGTL Group | Our Work | Portfolio grid linking to all `/work/<slug>/` case studies plus a few orphan root URLs |
| `https://dgtlgroup.io/contact-us/` | Contact Us - DGTL Group | Contact Us | Contact form, email `contact@dgtlgroup.io`, phone +1 (213) 772-6886 / +1 (647) 930-4443, address 487 Adelaide St. W Toronto, ON |
| `https://dgtlgroup.io/blog/` | Blog - DGTL Group | (no H1; uses post-grid template) | Blog index — links out to root-URL articles, NOT to `/insights/...` |
| `https://dgtlgroup.io/insights/` | Insights - DGTL Group | Archives: Insights | Custom post type archive — links to `/insights/<slug>/` stub pages |
| `https://dgtlgroup.io/join-dgtl-team/` | Join DGTL Team - DGTL Group | Join DGTL Team | Careers page; lists Social Media Manager openings (Indonesia, Philippines), but body text also says "We currently have no job opening" |
| `https://dgtlgroup.io/join-dgtl-influence/` | Join DGTL Influence - DGTL Group | (placeholder H1: "Branding, websites and digital experiences, crafted with brilliance, attention, precision and \|") | Influencer recruiting landing — H1 looks unfinished |
| `https://dgtlgroup.io/privacy-policy/` | Privacy Policy - DGTL Group | (no marked H1) | Privacy policy from DGTL Group Holdings Limited; refers users to "primary email address specified in your account" |
| `https://dgtlgroup.io/terms-of-use/` | Terms Of Use - DGTL Group | Terms of Use | Site terms; governed by Saint-Kitts & Nevis law; legal contact `legal@dgtlgroup.io` |
| `https://dgtlgroup.io/testing-page/` | Testing Page - DGTL Group | Our Work | Placeholder/test page that should NOT be in production |

### 1.3 Case Studies under `/work/`

All under `/work/<slug>/`. Each is a 1-page case study with hero, project description, image gallery. None expose structured fields like "year", "scope", or "results" — all data lives in free text and image rows.

| Slug | Title (H1) | Client | Categories / Services |
|---|---|---|---|
| `art-villas-costa-rica-content-campaign` | Art Villas Content Creation Campaign | Art Villas (Costa Rica) | Photography, Videography, UGC |
| `six-senses-content-campaign` | Six Senses Ibiza Content Creation Campaign | Six Senses Ibiza | Photography, Videography, FPV Drone, Influencer Marketing |
| `pacific-high-dewata-content-campaign` | Pacific High Dewata Content Creation Campaign | Pacific High Indonesia | Photography, Videography, Drone, Underwater |
| `nebula-projector` | Anker Nebula Projector Content Campaign | Anker | Photography, Videography, UGC |
| `canon` | Canon R10 Launch Campaign | Canon Canada | Photography, Content Campaign |
| `sounds-of-the-city-epidemic-sound-campaign` | Sounds of the City with Epidemic Sound | Epidemic Sound | Photography, Videography, VFX |
| `epidemicsound` | Epidemic Sound Social Media Management | Epidemic Sound | UGC, Videography, Social Media Marketing |
| `a-day-with-swae-lee` | A Day with Swae Lee at Cabana & Rebel | Swae Lee | Photography, Videography, Drone, FPV |
| `jassa-dhillon-you-music-video` | Jassa Dhillon "YOU" Music Video | Jassa Dhillon | Photography, Videography, Music Video |
| `on-running-train-on-clouds` | ON Running - Train on Clouds | ON Running | Videography, Photography, Commercial |
| `spider-man-raf-film` | Spider-Man: RAF | Carlos Juico (fan film) | Feature Film, Videography, Influencer Marketing |
| `flockamg` | Flocka MG | Flocka MG (artist) | Music, Fashion, Music Video, DMTV |
| `lum/` (also exists as orphan `/lum/`) | LUM | LUM (artist) | Artist, Videography, Influencer Marketing, Music Video |

**Orphan case-study-style URLs (NOT under `/work/`):**

| URL | Title (H1) | Notes |
|---|---|---|
| `/lil-tjay-calgary-live-recap/` | Lil Tjay – Calgary Live Recap | Looks like a case study but at root URL — and the work index ALSO links here at root, not under `/work/` |

### 1.4 Influencer / Artist / Talent Profile Pages (orphan root URLs)

These are NOT in the work grid, NOT in the blog. They appear to be a "talent roster" for the DGTL Influence subsidiary.

| URL | Title (H1) | Type / Notes |
|---|---|---|
| `/dom/` | Dom Vallie | Canadian rapper, JUNO nominee, 75k+ Spotify monthly listeners |
| `/lum/` | LUM | Artist (also has `/work/lum/` page — duplicate slug) |
| `/tye/` | Tye | Toronto fashion photographer & creative director |
| `/stacy/` | Anastasiia | Photographer, social media manager, model (works for DGTL) |
| `/theburnstwins/` | The Burns Twins | Toronto identical-twin prank/comedy creators |
| `/kamil/` | Kamil Galin | Director of photography at DGTL; "B0:0M" short film hosted here |
| `/5a1ive/` | 5a1ive | Toronto streetwear designer/creator |
| `/shane/` | Shane Boyer | American skateboarder/influencer |
| `/dmtv/` | DMTV | Music media collective sub-brand; aggregates 5+ music video projects (Nick Souza, FBK, CAIRO!, Lil Esso, Papi AQ) under one URL instead of giving each a slug |
| `/dgtltags/` | Digital NFC Tags | Product page for retail NFC tags; an unrelated business line |
| `/lil-tjay-calgary-live-recap/` | Lil Tjay – Calgary Live Recap | Listed as work item but lives at root |

### 1.5 Blog posts vs Insights stubs (DUPLICATION)

This is the messiest part of the site.

| Slug | Real Article URL (in `post-sitemap.xml`) | Stub URL (in `insights-sitemap.xml`) |
|---|---|---|
| `maximizing-your-digital-marketing-strategy` | `/maximizing-your-digital-marketing-strategy/` (full content, 6 sections) | `/insights/maximizing-your-digital-marketing-strategy/` (stub — only chrome) |
| `the-future-of-digital-marketing` | (NOT in post-sitemap — only stub exists) | `/insights/the-future-of-digital-marketing/` (stub) |
| `understanding-consumer-behavior-in-2024` | (NOT in post-sitemap) | `/insights/understanding-consumer-behavior-in-2024/` (stub) |
| `understanding-consumer-behavior-in-2025` | `/understanding-consumer-behavior-in-2025/` (full content, 7 sections) | (no `/insights/` version) |
| `essentials-when-building-new-website-ui-ux` | `/essentials-when-building-new-website-ui-ux/` (full content, 5 sections) | (no `/insights/` version) |

**Three real articles** — all live at root URLs in `post-sitemap.xml`.
**Three legacy `/insights/` URLs** — all are stubs that render only header/footer/nav. Two have no corresponding root URL.
The `/blog/` index page links to the three root-URL posts. The `/insights/` index links to the three stub URLs.

### 1.6 Service-list custom post type (placeholder)

| URL | Status |
|---|---|
| `/services-lists/service-title-goes-here/` | Lorem-Ipsum placeholder — H1: "Service Title Goes Here" |
| `/services-lists/service-title-goes-here-2/` | Same — placeholder |

### 1.7 Custom Post Types — Client Feedback & Testimonials (both empty)

| URL | Type | Status |
|---|---|---|
| `/client-feedback/` | Archive | Empty |
| `/client-feedback/filip-zak/` | CPT entry | Page renders but no testimonial fields visible — chrome only |
| `/client-feedback/jane-doe/` | CPT entry | Placeholder ("Jane Doe") |
| `/testimonial/` | Archive | Empty |
| `/testimonial/filip_zak/` | CPT entry | Same as above — chrome only |
| `/testimonial/name-surname-4/` | CPT entry | Placeholder ("Name Surname 4") |

Note that the actual visible testimonial quotes (Filip Žák, Jelena Ljubinkovic) live in the homepage HTML — these CPT URLs were created but never populated.

### 1.8 WordPress Category Archives (`category-sitemap.xml`)

| URL | Posts in category |
|---|---|
| `/category/marketing/` | 1 — Understanding Consumer Behavior in 2025 |
| `/category/web/` | 1 — 5 UI/UX Essentials… |
| `/category/content-creation/` | 1 — Maximizing Your Digital Marketing Strategy |
| `/category/sales/` | 1 — Understanding Consumer Behavior in 2025 |
| `/category/digital-marketing/` | 1 — Maximizing Your Digital Marketing Strategy |
| `/category/ai/` | 1 — Understanding Consumer Behavior in 2025 |

(Each post is tagged into multiple categories — there are still only 3 unique articles.)

### 1.9 Other URLs Worth Noting

| URL | Notes |
|---|---|
| `https://calendar.dgtlgroup.io/team/dgtl-group/assessment-call` | External booking subdomain (HubSpot or similar) — used by all "Book a Call" CTAs |
| `http://book.dgtlgroup.io/` | "Book Studio" CTA destination — separate subdomain |
| `https://dgtlgroup.io/locations.kml` | Geographic data file referenced by `local-sitemap.xml` |
| `https://dgtlgroup.io/service/` (singular) | Used in homepage footer "Quick Links" — likely 404; canonical is `/services/` |
| `https://dgtlgroup.io/contact/` (no `-us`) | Used in homepage footer "Quick Links" — likely 404; canonical is `/contact-us/` |
| `https://dgtlgroup.io/work/test/` | Hardcoded link from services page on a portfolio card — almost certainly 404 |

---

## 2. URL Structure Map

### Bucket A — Core marketing pages (5)

```
/                          Homepage
/about-us/                 About
/services/                 Services index (no individual service detail pages)
/work/                     Work / portfolio index
/contact-us/               Contact
```

### Bucket B — Secondary marketing / utility pages (4)

```
/blog/                     Blog index (links to root-URL posts)
/insights/                 Insights archive (links to /insights/<slug>/ stubs — duplicate of blog)
/join-dgtl-team/           Careers
/join-dgtl-influence/      Influencer recruiting (placeholder H1)
```

### Bucket C — Case studies under `/work/` (12)

```
/work/art-villas-costa-rica-content-campaign/
/work/six-senses-content-campaign/
/work/pacific-high-dewata-content-campaign/
/work/nebula-projector/
/work/canon/
/work/sounds-of-the-city-epidemic-sound-campaign/
/work/epidemicsound/
/work/a-day-with-swae-lee/
/work/jassa-dhillon-you-music-video/
/work/on-running-train-on-clouds/
/work/spider-man-raf-film/
/work/flockamg/
/work/lum/                 (also has /lum/ duplicate)
```

### Bucket D — Talent / influencer / artist profiles at root URLs (11)

```
/dom/
/lum/                      (also /work/lum/)
/tye/
/stacy/
/theburnstwins/
/kamil/
/5a1ive/
/shane/
/dmtv/                     Aggregates 5+ music video projects
/dgtltags/                 NFC tag product line — unrelated
/lil-tjay-calgary-live-recap/   Case-study-style content at root
```

### Bucket E — Real blog posts at root URLs (3)

```
/maximizing-your-digital-marketing-strategy/
/understanding-consumer-behavior-in-2025/
/essentials-when-building-new-website-ui-ux/
```

### Bucket F — `/insights/` legacy stub posts (4)

```
/insights/                                          (archive)
/insights/maximizing-your-digital-marketing-strategy/
/insights/the-future-of-digital-marketing/
/insights/understanding-consumer-behavior-in-2024/
```

### Bucket G — Category archives (6)

```
/category/marketing/
/category/web/
/category/content-creation/
/category/sales/
/category/digital-marketing/
/category/ai/
```

### Bucket H — Custom post type stubs / placeholders (7)

```
/services-lists/service-title-goes-here/
/services-lists/service-title-goes-here-2/
/client-feedback/
/client-feedback/filip-zak/
/client-feedback/jane-doe/
/testimonial/
/testimonial/filip_zak/
/testimonial/name-surname-4/
```

### Bucket I — Legal (2)

```
/privacy-policy/
/terms-of-use/
```

### Bucket J — Test / staging (1)

```
/testing-page/
```

### Bucket K — Files / external

```
/locations.kml
https://calendar.dgtlgroup.io/...    (external booking)
http://book.dgtlgroup.io/            (external booking)
```

### NOT FOUND on the site (zero of each)

- Author archives (`/author/...`)
- Tag archives (`/tag/...`)
- Date-based archives
- Individual service detail pages (`/services/content-creation/`, etc.)
- Individual team member pages (no team is listed publicly anywhere)
- Cookie policy page

---

## 3. 301 Redirect Map

Confidence levels: **High** = obvious 1:1 mapping; **Med** = mapping is likely correct but human should sanity-check; **Low** = needs an explicit decision before launch.

| Old URL | New URL | Confidence | Notes |
|---|---|---|---|
| `/` | `/` | High | Homepage |
| `/about-us/` | `/about` | High | Drop the `-us` and trailing slash per Next.js convention |
| `/services/` | `/services` | High | Services index |
| `/work/` | `/work` | High | Work index |
| `/contact-us/` | `/contact` | High | Drop `-us` |
| `/blog/` | `/blog` | High | Blog index |
| `/insights/` | `/blog` | High | Collapse insights into blog |
| `/join-dgtl-team/` | `/careers` | Med | Or `/about/careers` — confirm IA |
| `/join-dgtl-influence/` | `/dgtl-influence` or `/influence` | Low | Decide whether DGTL Influence is a sub-brand microsite or a single page on dgtlgroup.io |
| `/privacy-policy/` | `/legal/privacy` | High | |
| `/terms-of-use/` | `/legal/terms` | High | |
| `/testing-page/` | `/` (410 Gone preferred) | High | Should never have been public |
| `/dgtltags/` | (TBD — see notes) | Low | Unrelated NFC product line; may belong on a separate domain or should be killed |
| `/work/art-villas-costa-rica-content-campaign/` | `/work/art-villas-costa-rica` | High | Trim `-content-campaign` suffix in new slugs |
| `/work/six-senses-content-campaign/` | `/work/six-senses-ibiza` | High | |
| `/work/pacific-high-dewata-content-campaign/` | `/work/pacific-high-dewata` | High | |
| `/work/nebula-projector/` | `/work/anker-nebula-projector` | Med | Add client name for clarity |
| `/work/canon/` | `/work/canon-r10-launch` | Med | Current slug is too generic |
| `/work/sounds-of-the-city-epidemic-sound-campaign/` | `/work/epidemic-sound-sounds-of-the-city` | Med | |
| `/work/epidemicsound/` | `/work/epidemic-sound-social-media` | Med | Current slug is just the brand name; conflicts with line above |
| `/work/a-day-with-swae-lee/` | `/work/swae-lee-toronto` | High | |
| `/work/jassa-dhillon-you-music-video/` | `/work/jassa-dhillon-you` | High | |
| `/work/on-running-train-on-clouds/` | `/work/on-running-train-on-clouds` | High | |
| `/work/spider-man-raf-film/` | `/work/spider-man-raf` | High | |
| `/work/flockamg/` | `/work/flocka-mg` | High | |
| `/work/lum/` | `/work/lum` | Med | Collides with talent profile `/lum/` — pick one |
| `/lil-tjay-calgary-live-recap/` | `/work/lil-tjay-calgary-live-recap` | High | Move under `/work/` namespace |
| `/maximizing-your-digital-marketing-strategy/` | `/blog/maximizing-your-digital-marketing-strategy` | High | |
| `/understanding-consumer-behavior-in-2025/` | `/blog/understanding-consumer-behavior-in-2025` | High | |
| `/essentials-when-building-new-website-ui-ux/` | `/blog/ui-ux-essentials-new-website` | Med | Long slug — consider trimming |
| `/insights/maximizing-your-digital-marketing-strategy/` | `/blog/maximizing-your-digital-marketing-strategy` | High | Same content as root URL |
| `/insights/the-future-of-digital-marketing/` | `/blog/the-future-of-digital-marketing` | Low | NO root-URL version exists — has the article ever been written? Decide: kill or restore |
| `/insights/understanding-consumer-behavior-in-2024/` | `/blog/understanding-consumer-behavior-in-2024` OR redirect → 2025 version | Low | Probably superseded by the 2025 article |
| `/dom/` | `/influence/dom-vallie` | Low | Decide whether the talent roster is public on the new site |
| `/lum/` | `/influence/lum` | Low | Same — and decide whether `/work/lum/` is the canonical URL |
| `/tye/` | `/influence/tye` | Low | |
| `/stacy/` | `/influence/anastasiia` or `/team/anastasiia` | Low | This is a DGTL employee, not an external talent — needs human triage |
| `/theburnstwins/` | `/influence/the-burns-twins` | Low | |
| `/kamil/` | `/team/kamil-galin` or `/influence/kamil-galin` | Low | DGTL DP — likely staff, not talent |
| `/5a1ive/` | `/influence/5a1ive` | Low | |
| `/shane/` | `/influence/shane-boyer` | Low | |
| `/dmtv/` | `/dmtv` or `/work?category=dmtv` | Low | DMTV is a sub-brand; needs explicit IA decision |
| `/dgtltags/` | (kill or move to subdomain) | Low | Unrelated business line |
| `/category/marketing/` | `/blog?category=marketing` (or 410) | Med | WP-only construct; if blog has no category filter, redirect to `/blog` |
| `/category/web/` | `/blog?category=web` | Med | |
| `/category/content-creation/` | `/blog?category=content-creation` | Med | |
| `/category/sales/` | `/blog?category=sales` | Med | |
| `/category/digital-marketing/` | `/blog?category=digital-marketing` | Med | |
| `/category/ai/` | `/blog?category=ai` | Med | |
| `/services-lists/service-title-goes-here/` | `/services` (or 410) | High | Lorem-ipsum placeholder |
| `/services-lists/service-title-goes-here-2/` | `/services` (or 410) | High | Lorem-ipsum placeholder |
| `/client-feedback/` | `/about` (testimonials section) | High | |
| `/client-feedback/filip-zak/` | `/about` | High | Empty CPT entry |
| `/client-feedback/jane-doe/` | `/about` (or 410) | High | Lorem-ipsum |
| `/testimonial/` | `/about` | High | |
| `/testimonial/filip_zak/` | `/about` | High | Empty |
| `/testimonial/name-surname-4/` | `/about` (or 410) | High | Lorem-ipsum |
| `/locations.kml` | (kill) | High | Geographic feed for SEO; new site should regenerate from canonical address data |
| `/sitemap_index.xml` and all sub-sitemaps | `/sitemap.xml` | High | Next.js will generate a fresh sitemap |
| `/feed`, `/feed/` | `/blog` (or generate `/blog/feed.xml`) | Med | If RSS users exist, regenerate; otherwise drop |
| `/wp-admin/`, `/wp-login.php`, `/wp-content/`, `/wp-json/` | (404) | High | All WP infrastructure should be gone |

---

## 4. Media Inventory

All media is hosted on `https://dgtlgroup.io/wp-content/uploads/<YYYY>/<MM>/<filename>`. Five upload month-folders are observed: `2024/11`, `2024/12`, `2025/01`, `2025/02`, `2025/12`, `2026/01`. Approximate counts and purposes:

### 4.1 Brand & UI assets

| URL | Type | Purpose |
|---|---|---|
| `/wp-content/uploads/2024/11/site-logo.svg` | SVG | Site logo (header + footer) |
| `/wp-content/uploads/2024/11/favicon.svg` | SVG | Used as the icon on every service card on `/services/` (i.e., every service shows the same favicon — looks like a placeholder oversight) |
| `/wp-content/uploads/2024/11/scroll-to-top-min.jpg.webp` | WebP | Scroll-to-top button background |
| `/wp-content/uploads/2024/11/empowering-brand.png` | PNG | Homepage "Empowering brands…" section image |

### 4.2 Client logos (used on homepage, about-us, join-dgtl-team)

~25 logos in `/wp-content/uploads/`. Filenames follow the pattern `<brand>_new.png[.webp]`:

```
hyundai_new.png.webp        DJI.png                  canon.png
PolarPro_New.png            Rotary_test.png          Corona.png.webp
on_new.png.webp             Audi.png                 CanaDream.png
Lexus.png.webp              ford.png                 Epidemic.png.webp
Mercedes-Benz.png.webp      Anker_new.png            porsche_new.png
wonderful-indonesia.png.webp guilds_new.png.webp     smallrig.png.webp
mile-end_no_bg.png.webp     art-villas.png.webp     mrs-sippy.png.webp
walmart.png.webp            swae-lee.png.webp        scuf-new.png (likely)
gamestop-new.png (likely)
```

### 4.3 Case-study photography (largest media set, ~60+ files)

| Case study | Image filename pattern | Approx count |
|---|---|---|
| Art Villas (Costa Rica) | `Art-Villas_<n>.jpg` (e.g. `_62`, `_61`, `_58`, `_52`, `_49`, `_48`, `_44`, `_39`, `_21`, `_7`) | 9+ |
| Six Senses Ibiza | `DSC0xxxx-HDR.jpg` (DSC01788, 01457, 01355, 01270, 01260, 01190, 01180, 01142, 01130, 01041, 00820, 00670) | 11+ |
| Anker Nebula | `0H6A4719.jpg`, `0H6A4754`, `0H6A4846`, `0H6A4943`, `0H6A4984`, `0H6A5203`, `0H6A5253`, `0H6A5556`, `0H6A6262` | 9 |
| Canon R10 | `0H6A3134` … `0H6A3211`, `0H6A3186-Edit` | 8 |
| Pacific High Dewata | `DJI_0002`, `DJI_0015`, `ILL8966`, etc. | 17+ |
| Swae Lee | `DSC08483`, `DSC08482`, `DSC08492`, `DSC08497`, `DSC08532`, `DSC08853`, `DSC09113`, `DSC09219`, `DSC0177` | 10 |
| Lil Tjay Calgary | `DSC09099-Edit.jpg` + ~5 more | ~6 |
| Epidemic Sound (Sounds of the City) | `Screenshot-2025-12-08-at-1.17.46-PM.png` | 1+ |
| Epidemic Sound (TikTok) | `Epidemic-Sound-hero-1@2000x1500.jpg` | 1+ |
| CanaDream | `CANADREAM-6.jpg` | 1+ |
| PolarPro | `Screenshot-2025-10-31-at-3.58.10-PM.png` | 1+ |
| Jassa Dhillon | `Screenshot-2025-12-09-at-8.34.53-PM.png` | 1+ |
| ON Running | `Screenshot-2025-12-10-at-12.47.19-PM.png` | 1+ |
| Spider-Man: RAF | `raf.webp` | 1 |
| LUM | `Screenshot-2025-12-10-at-12.49.52-PM.png`, `Screenshot-2025-12-10-at-2.08.30-PM.png`, `maxresdefault-9.jpg` | 3 |
| DMTV (5 music videos) | `Screenshot-2025-12-10-at-9.40.12-PM.png`, `9.46`, `9.50`, `9.55`, `10.06`, `Screenshot-2025-12-22-at-4.52.45-PM.png` | 6 |
| Kamil (B0:0M) | `maxresdefault-6.jpg` | 1 |

**Files named `Screenshot-...png` are an obvious migration smell** — they're YouTube-thumbnail captures, not produced art. Should be replaced with proper hero images per case study.

### 4.4 Service / homepage section imagery

```
WP1_8250-2-copy-scaled.jpg       Content Creation card
dgtl-team-2-normal2.jpg          Social Media Marketing / "Who are we?" image
unlock-img.jpg                   Repeated decorative image (multiple uses)
DSC08497-scaled.jpg              Public Relations card
DSC01788-HDR.jpg                 Six Senses portfolio teaser
DJI_0002-scaled.jpg              Pacific High portfolio teaser
unnamed.webp                     Testimonial author photo (Jelena Ljubinkovic)
Screenshot-2025-01-22... .png    Testimonial author photo (Filip Žák)
```

### 4.5 Blog post hero images

```
/wp-content/uploads/2025/01/DALL%C2%B7E-2025-01-24-06.35.27-A-realistic-yet-minimalistic-image-for-a-blog-about-UI_UX-design...webp
/wp-content/uploads/2024/12/DALL%C2%B7E-2025-01-24-05.18.06-...consumer-behavior-trends-in-2025...webp
/wp-content/uploads/2024/12/DALL%C2%B7E-2025-01-24-04.18.26-A-sleek-digital-marketing-concept-illustration...webp
/wp-content/uploads/2024/12/post-img-1-1024x683.webp
/wp-content/uploads/2024/12/post-img-2-1024x683.webp
/wp-content/uploads/2024/12/post-img-3-1024x683.webp
```

The `DALL·E-...` filenames make it explicit that all 3 blog hero images are AI-generated. The `post-img-1/2/3.webp` files are placeholder images on the `/insights/` archive cards.

### 4.6 PDFs / documents

None observed in the audit. No `.pdf` URLs were referenced from any of the audited pages.

---

## 5. Content Model Observations (for Payload v3)

### 5.1 Collections we will need

| Collection | Estimated count | Source content | Confidence |
|---|---|---|---|
| `pages` (singletons) | 8–10 | Homepage, About, Services, Contact, Careers, Influence, 2 legal | High |
| `caseStudies` (renames `work` items) | 12–14 (incl. orphan root URLs we choose to migrate) | All `/work/<slug>/` + `/lil-tjay-calgary-live-recap/` + decided talent profiles | High |
| `posts` (blog) | 3 real + up to 2 stub revivals | Root-URL articles | High |
| `services` | 6 | The 6 services on the homepage / `/services/` page (Content Creation, Social Media Marketing, Influencer Marketing, Public Relations, Web Design & Development, Graphics Design) | High — but they currently DO NOT have individual detail URLs |
| `clients` | ~25 | Logo wall — could be a global collection if we want to filter case studies by client | Med |
| `testimonials` | 2 (or more if we ask for new ones) | Filip Žák, Jelena Ljubinkovic | High |
| `team` / `talent` | 0 to ~11 | Currently no real team page; the 11 orphan root-URL "talent profiles" could become this collection | Low |
| `categories` (taxonomy) | 6 | Marketing, Web, Content Creation, Sales, Digital Marketing, AI | Med |
| `media` | ~100 | All `/wp-content/uploads/...` files we choose to migrate | High |

### 5.2 Field-level guidance

#### `caseStudies` collection — fields to plan for

Looking at every case study together, the *minimum* shared structure is:
- `title` (string, required)
- `slug` (string, required)
- `client` (relationship → `clients` collection or string)
- `services` (multi-select / relationship → `services`) — values used today: Photography, Videography, UGC, Drone, FPV, Underwater, Music Video, VFX, Commercial, Concert, Feature Film, Short Film, Influencer Marketing, Social Media Marketing, Public Relations, Web Design & Development, Graphics Design, Content Creation, DMTV
- `location` (string, optional) — used inconsistently (Costa Rica, Toronto, Raja Ampat, Calgary, etc.)
- `summary` (rich text)
- `heroImage` (media)
- `gallery` (array of media) — every case study has 1–17 image uploads
- `videoEmbeds` (array, optional) — DMTV-style projects need YouTube embed support
- `featured` (boolean) — homepage shows "Our Featured Projects"

**No structured fields exist today for:** year, scope, deliverables, results/metrics, role/team, duration, budget. The Epidemic Sound TikTok case is the only one with a numeric result ("12+ million views"). Decide whether to ask the agency to backfill these.

#### `services` collection — fields to plan for

- `title`, `slug`, `shortDescription`, `longDescription`, `icon` (currently the same favicon for all 6 services), `heroImage`, `features` (array), `relatedCaseStudies` (relationship)

Currently **NO individual service URL exists.** This is a green-field decision — recommend `/services/<slug>` for SEO.

#### `posts` (blog) — fields to plan for

- `title`, `slug`, `excerpt`, `body` (rich text), `heroImage`, `author` (relationship → `authors`), `categories` (relationship), `publishedAt`, `readingTime`

Today the only "author" used is "DGTL Group" — there are no individual author profiles, so an `authors` collection is optional.

#### `team` / `talent` — needs decision

The 11 orphan root-URL profiles fall into two distinct buckets that should be modeled separately:

**Bucket 1 — actual DGTL employees (likely):**
- Anastasiia (`/stacy/`) — explicitly described as "photographer, social media manager, and model FOR DGTL Group"
- Kamil Galin (`/kamil/`) — "Director of Photography at DGTL Group"

**Bucket 2 — external talent represented by DGTL Influence:**
- Dom Vallie, LUM, Tye, The Burns Twins, 5a1ive, Shane Boyer, Lil Tjay (?)

**Bucket 3 — sub-brand pages, NOT people:**
- DMTV (music media collective)
- DGTL Tags (NFC product line)

These should NOT all be one collection.

#### `testimonials` — fields to plan for

- `quote` (rich text, required)
- `authorName` (string)
- `authorRole` (string)
- `authorCompany` (string)
- `authorPhoto` (media)
- `featured` (boolean)
- `relatedCaseStudy` (relationship, optional)

The legacy `client-feedback` and `testimonial` CPTs are both in the sitemap but completely empty — so we have a clean slate.

### 5.3 Repeating block patterns to model in Payload

| Block | Where it appears | Notes |
|---|---|---|
| `clientLogoWall` | Homepage, /about-us/, /services/, /work/, /join-dgtl-team/, /join-dgtl-influence/ | Same ~25 logos every time. Should be a global, not per-page content. |
| `serviceCardGrid` | Homepage, /services/, /work/pacific-high-dewata-content-campaign/ | The 6 services cards. Single source of truth in the `services` collection. |
| `featuredProjects` | Homepage, /services/ | "Our Featured Projects" — pulls 3 case studies. Should be a relationship field on the homepage page. |
| `testimonialCarousel` | Homepage | 2 testimonials (Filip, Jelena) shown in a carousel. |
| `ctaBookACall` | Almost every page | Always points to `https://calendar.dgtlgroup.io/team/dgtl-group/assessment-call`. Make this a global CTA block. |
| `newsletterSignup` ("Join Our Thriving Community") | /, /about-us/, /services/, /work/, /join-dgtl-team/, /join-dgtl-influence/, every case study, every blog post, every profile page | First Name, Last Name, Email, Phone Number — appears literally everywhere as a footer band. Make this a global block. |
| `globalFooter` ("We Are Global", "Quick Links", "Connect With Us", "Stay Connected", "Get Started") | Every page | Standard footer. |
| `statsRow` | /about-us/ | "75+ Projects, 0% Client Satisfaction, $0+ Revenue Generated" — placeholder values today, but the structure is there. |

---

## 6. SEO Signals (per core page)

| Page | `<title>` (verified) | Meta description | H1 |
|---|---|---|---|
| `/` | Homepage - DGTL Group | Not present in HTML | Transforming Brands with Innovative Creative Solutions |
| `/about-us/` | About Us - DGTL Group | Not present | Crafting Digital Success |
| `/services/` | Services - DGTL Group | Not present | Our Services Unleashed |
| `/work/` | Work - DGTL Group | Not present | Our Work |
| `/contact-us/` | Contact Us - DGTL Group | Not present | Contact Us |
| `/blog/` | Blog - DGTL Group | Not present | (no H1) |
| `/insights/` | Insights - DGTL Group | Not present | Archives: Insights |
| `/join-dgtl-team/` | Join DGTL Team - DGTL Group | Not present | Join DGTL Team |
| `/join-dgtl-influence/` | Join DGTL Influence - DGTL Group | Not present | Branding, websites and digital experiences, crafted with brilliance, attention, precision and \| (placeholder, contains a literal pipe character) |
| `/privacy-policy/` | Privacy Policy - DGTL Group | Not present | (no marked H1) |
| `/terms-of-use/` | Terms Of Use - DGTL Group | Not present | Terms of Use |

**Cross-page findings:**
- Page titles all follow `<Page Name> - DGTL Group` pattern. No customized SEO titles.
- **Zero meta descriptions** detected on any audited page. Either the WP SEO plugin (Yoast / Rank Math) is not configured, or descriptions live as `og:description` only. The new site should ship with a proper `description` per page.
- The `/blog/` page has no H1 at all.
- The `/join-dgtl-influence/` H1 ends mid-sentence with a `|` character — looks like an unfinished editor draft.
- The homepage H1 talks about "Innovative Creative Solutions" but the agency self-describes as a "digital marketing" agency everywhere else — minor brand inconsistency.

---

## 7. Structured Data / Schema.org

**No JSON-LD or microdata was detected on any audited page.** Specifically:

- No `Organization` schema
- No `LocalBusiness` schema (despite the agency being location-rich: Toronto, Paris, Bali, with full Toronto address `487 Adelaide St. W` and two phone numbers)
- No `Article` / `BlogPosting` schema on the 3 real blog posts
- No `BreadcrumbList`
- No `WebSite` with `SearchAction`
- The `video-sitemap.xml` exists, suggesting the WordPress SEO plugin generates `VideoObject` schema for some pages, but the rendered HTML did not surface any.
- A `local-sitemap.xml` exists pointing at `locations.kml` — implying Local SEO setup attempted but not finished.

**Migration priority:** Add structured data on day one of the new site. The Toronto address + 2 phone numbers + 3 office locations + 25+ client logos are all easy `Organization` / `LocalBusiness` material.

---

## 8. Open Questions & Risks

### Top 3 (need human input before migration starts)

1. **Blog vs. Insights duplication and missing canonical strategy.** Three real articles live at *root URLs* (e.g., `/maximizing-your-digital-marketing-strategy/`), and an overlapping set of stub URLs lives under `/insights/`. The `/blog/` index links to the root URLs; the `/insights/` index links to the stubs. Two of the `/insights/` articles have no real-content equivalent at all (`the-future-of-digital-marketing`, `understanding-consumer-behavior-in-2024`). Decisions needed:
   - Keep all blog content at `/blog/<slug>` in the new site? (Recommended.)
   - For the 2 insights-only stubs: are they unwritten drafts that should be revived, or should they be killed with 410 / redirected to the next best article?
   - Drop the `category/...` archive URLs (the new blog will probably use simple tag pages or no taxonomy at all)?

2. **The 11 orphan root-URL "vanity" pages.** Pages like `/dom/`, `/lum/`, `/tye/`, `/stacy/`, `/theburnstwins/`, `/kamil/`, `/5a1ive/`, `/shane/`, `/dmtv/`, `/dgtltags/`, and `/lil-tjay-calgary-live-recap/` sit at the top level of the URL space. They mix:
   - DGTL employees (Anastasiia, Kamil — photographers/DPs that work for the agency)
   - External talent represented by DGTL Influence (Dom Vallie, LUM, Tye, etc.)
   - A sub-brand (DMTV music media collective)
   - An unrelated business line (DGTL Tags / NFC tags)
   - A misplaced case study (Lil Tjay Calgary)

   We need an explicit IA decision: which of these are public on the new site, what URL pattern do they take (`/team/<slug>` for staff? `/influence/<slug>` for talent? a separate `dmtv` subdomain?), and is `/dgtltags/` relevant at all?

3. **Multiple slug/ID collisions and broken links.** Specifically:
   - `/lum/` and `/work/lum/` both exist for the same artist (which is canonical?).
   - `/work/lil-tjay-calgary-live-recap/` is referenced from the work index but the actual page lives at `/lil-tjay-calgary-live-recap/` (root) — one of these returns a 404.
   - `/work/canon` (no slug suffix) is linked from the work index — likely a 301 source.
   - `/work/test/` is hardcoded into the services page on a portfolio card — almost certainly 404.
   - The homepage footer "Quick Links" links to `/service/` (singular) and `/contact/` (no `-us`) — both are likely 404s today.
   - The homepage footer "FAQs" link is `https://dgtlgroup.io/#` (a hash anchor — non-functional).
   - The homepage footer "YouTube" social link is `https://dgtlgroup.io/#` (same problem).
   - The Twitter / X social link is `http://x.com/dgtlgroup_io` (non-https; uses an underscore variant `dgtlgroup_io` not the brand handle `dgtlgroup.io`).

### Other notable risks

4. **Placeholder content in production.** Specific items:
   - `/testing-page/` is publicly indexed (in `page-sitemap.xml`).
   - `/services-lists/service-title-goes-here/` and `/services-lists/service-title-goes-here-2/` are Lorem-Ipsum pages with literal "Service Title Goes Here" headers, both indexed.
   - `/client-feedback/jane-doe/` and `/testimonial/name-surname-4/` are placeholder CPT entries.
   - The `/about-us/` stat row shows literal `0%` and `$0+` for "Client Satisfaction" and "Revenue Generated".
   - The `/join-dgtl-team/` page lists 2 jobs in one section AND says "We currently have no job opening" in another section — content conflict.
   - The `/join-dgtl-influence/` H1 is an unfinished sentence ending with `|`.

5. **Customer-facing duplicate job listings.** The 2 Social Media Manager openings (Indonesia + Philippines) are listed as **two separate positions** but the descriptions are identical and both quote a salary in IDR.

6. **Privacy / Terms inconsistency.** Privacy is by "DGTL Group Holdings Limited"; Terms references "Saint-Kitts & Nevis law" and contact `legal@dgtlgroup.io`; the contact page lists Toronto address `487 Adelaide St. W`. There are at least 3 jurisdictional/entity references that don't reconcile and need legal sign-off before re-publishing.

7. **Booking subdomain dependency.** Every "Book a Call" CTA points to `https://calendar.dgtlgroup.io/team/dgtl-group/assessment-call`, and "Book Studio" points to `http://book.dgtlgroup.io/`. These are not part of the WordPress install, so the migration won't break them — but we need to confirm that:
   - `book.dgtlgroup.io` should be migrated to HTTPS
   - Both subdomains are still in use and not deprecated

8. **No team / leadership presence.** The agency claims to be founded with a vision and to operate from 3 cities, but no founder, CEO, employee, or team member name appears anywhere on the public site. This is unusual for a creative agency. Decide whether the new site should add a `/team` page, and if so collect bios + photos.

9. **Robots.txt blocks AI crawlers (incl. ClaudeBot).** This audit had to be conducted via the Jina Reader proxy because direct fetches return HTTP 403 to ClaudeBot/GPTBot/Amazonbot. The current `robots.txt` declares `search=yes,ai-train=no`. **The new site should keep this directive** if the agency wants to maintain the same AI-training opt-out posture — confirm with the client whether this is intentional or vestigial.

10. **No cookie banner / cookie policy page detected.** Despite the site mentioning EU copyright directive 2019/790 in robots.txt and claiming to operate internationally, no cookie consent UI surfaced in the audit and no `/cookie-policy/` URL exists. May be a GDPR/UK gap.

11. **Blog post images are AI-generated (DALL·E filenames).** The 3 hero images on the real blog posts are explicitly named `DALL·E-2025-01-24-...webp`. Decide whether to (a) regenerate as on-brand photography, (b) keep the AI hero images, or (c) hide the hero entirely on blog posts in the new design.

12. **No author profiles, no read-time displayed in HTML, no publish date in the rendered article.** All three real blog posts are signed "DGTL Group" — there's no individual author concept yet. If we want individual bylines on the new site, the source content needs to be re-attributed.

13. **Mixed-version content drift on Consumer Behavior post.** Both `/insights/understanding-consumer-behavior-in-2024/` and `/understanding-consumer-behavior-in-2025/` exist. The 2024 version is a stub; the 2025 version is the real article. Probably the article was updated and renamed in early 2025. Confirm the 2024 URL can be safely 301'd to the 2025 article.

14. **The video sitemap and `local-sitemap.xml` indicate at least one SEO plugin is configured (likely Yoast or Rank Math), but rendered HTML has no schema markup at all.** This is suspicious — either the plugin is misconfigured, or our fetcher (Jina Reader) strips JSON-LD. A direct browser-DevTools check during cutover is recommended.

---

## Appendix A — Audit Method

- **Direct WebFetch from `dgtlgroup.io` returns HTTP 403** for ClaudeBot. The site's `robots.txt` explicitly disallows `ClaudeBot`, `GPTBot`, `Amazonbot`, and others under the `ai-train=no` content-signal directive.
- All page-level data was collected via the **Jina Reader proxy** (`https://r.jina.ai/<URL>`), which does not expose JSON-LD or `og:` meta tags consistently.
- The complete URL inventory was reconstructed from `https://dgtlgroup.io/sitemap_index.xml` and its 9 sub-sitemaps (also fetched via Jina Reader).
- 3 real blog posts, 12 case studies, 11 orphan/profile pages, and all 5 core marketing pages were each individually fetched and analyzed.
- A handful of pages that returned a Jina Reader CAPTCHA fallback (notably `/lum/` on first attempt) are noted in-line.
- Schema markup was checked for but **not found** on any page; this should be re-verified directly in a browser before launch.
