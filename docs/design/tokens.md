---
title: DGTL Design Tokens — extracted from dgtlgroup.io (WordPress)
extracted_at: 2026-04-09
source: dgtlgroup.io (live WordPress site, computed styles via Chrome DevTools)
applied_to: apps/web/src/app/(platform)/globals.css via Tailwind v4 @theme
---

# Design Tokens

Extracted from the live WordPress site at `dgtlgroup.io` on 2026-04-09 using
Chrome MCP's `javascript_tool` to read `getComputedStyle()` on every element
across the homepage, `/services`, and `/work` pages (1,459 DOM elements
scanned on the homepage alone).

These tokens define the DGTL brand's visual identity and are the source of
truth for the Next.js rebuild. They are applied via Tailwind v4's `@theme
inline` directive in `apps/web/src/app/(platform)/globals.css`.

---

## 1. Color palette

### Brand accent — gold

The single accent colour used across the entire site. Every interactive
element, active state, hover, CTA, and decorative glow derives from this
one value.

| Token | Hex / RGBA | Usage |
|---|---|---|
| `--gold` | `#F0CF50` | Primary accent: CTA buttons, active nav, icon fills, section highlights |
| `--gold-dim` | `rgba(240, 207, 80, 0.55)` | Dimmed gold for secondary emphasis |
| `--gold-pale` | `rgba(240, 207, 80, 0.08)` | Faint gold tint for subtle badge/tag backgrounds |
| `--gold-border` | `rgba(240, 207, 80, 0.16)` | Gold border on hover/focus states |
| `--gold-glow` | `rgba(240, 207, 80, 0.2)` | Box-shadow glow around CTAs and gold elements |
| `--gold-glow-lg` | `rgba(240, 207, 80, 0.1)` | Large radial glow behind hero sections |

Source: `rgb(240, 207, 80)` appeared 650 times as `color`, 5 times as
`background-color`, 5 times as `border-color` on the homepage. The project
overview document (docs/project-overview.html) also defines `--gold: #F0CF50`
as the primary token.

### Neutrals — dark-first palette

The site is 100% dark mode. No light-mode variant exists on the WordPress
site and none is planned for the rebuild (per the project brief's "dark,
professional, clean" dashboard instruction).

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#000000` | Page/body background |
| `--surface` | `#111111` | Elevated cards, panels, nav background |
| `--surface-2` | `#1a1a1a` | Secondary elevated surfaces |
| `--surface-3` | `#222222` | Tertiary surfaces, input fields |
| `--line` | `#2a2a2a` | Borders, dividers, separators (from computed `rgb(42,42,42)`) |
| `--white` | `#ffffff` | Headings, primary text |
| `--off-white` | `#f0f0f0` | Slightly softened white |
| `--muted` | `#d0d0d0` | Body paragraph text (from computed `rgb(208,208,208)` on `<p>`) |
| `--stone` | `#c3c4c7` | Captions, secondary labels (from computed `rgb(195,196,199)`) |
| `--faint` | `rgba(255, 255, 255, 0.1)` | Subtle white overlay for card hover states |

### Semantic colours (inferred, not visually prominent on the live site)

| Token | Hex | Usage |
|---|---|---|
| `--success` | `#11AC84` | Success toast (seen once at `rgb(17, 172, 132)`) |
| `--error` | `#EF877F` | Error states (seen at `rgb(239, 135, 127)`) |

---

## 2. Typography

### Font family

**Manrope** — the single font used across the entire site (969 out of 1,459
elements). Geometric sans-serif with a modern, open feel. No serif or
monospace secondary font.

```
font-family: 'Manrope', sans-serif;
```

Google Fonts URL: `https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap`

Next.js implementation: `next/font/google` with `Manrope({ subsets: ['latin'],
variable: '--font-manrope' })`.

### Type scale

Distilled from computed `fontSize`, `fontWeight`, `lineHeight`, and
`letterSpacing` on heading and body elements across all three audited pages.

| Name | Size | Weight | Line-height | Letter-spacing | Where used |
|---|---|---|---|---|---|
| `display` | 70px | 600 | 1.1 | -0.02em | Page-level hero title ("/work" H1) |
| `title` | 60px | 600 | 1.08 | -0.023em | Homepage H1 hero |
| `heading-1` | 45px | 700 | 1.11 | -0.022em | Section headings (H2) |
| `heading-2` | 35px | 700 | 1.14 | -0.023em | Sub-section headings |
| `heading-3` | 24px | 600 | 1.17 | -0.02em | Card group titles (H5) |
| `heading-4` | 20px | 700 | 1.4 | normal | Small headings |
| `card-title` | 18px | 700 | 1.17 | -0.02em | Portfolio / service card titles (H6) |
| `body-lg` | 18px | 400 | 1.5 | normal | Hero subtitle, intro paragraphs |
| `body` | 16px | 400 | 1.5 | normal | Default body text |
| `body-sm` | 14px | 400 | 1.5 | normal | Secondary body text |
| `caption` | 13px | 400 | 1.38 | normal | Captions, meta labels |
| `micro` | 11px | 400 | 1.45 | normal | Tiny labels, tags |

**Notable pattern:** all display/heading sizes use **negative letter-spacing**
at approximately `-0.02em`. This is a consistent brand choice that gives the
type a tighter, more confident feel. Body text uses `normal` (0) letter-spacing.

**Weight distribution:** 700 (bold) is the site's default body weight (803
out of 1,459 elements inherit it). This is aggressive — the rebuild should
reset the body default to 400 and apply 700 only where headings/emphasis call
for it.

---

## 3. Buttons

Two button variants, extracted from the hero CTA pair on the homepage and
confirmed on the `/services` page.

### Primary (gold filled)

```
background:    #F0CF50
color:         #000000
border:        1px solid #F0CF50
border-radius: 7px
padding:       15px 24px
height:        56px (computed, not explicit)
font:          Manrope 16px 700
transition:    all
```

### Secondary (white outline)

```
background:    transparent
color:         #FFFFFF
border:        1px solid #FFFFFF
border-radius: 7px
padding:       15px 24px
height:        56px
font:          Manrope 16px 700
transition:    all
```

Both buttons use `transition: all` — hover effects not captured (would need
live interaction). The rebuild will add explicit hover/focus/active states.

---

## 4. Navigation

Extracted from the header nav on all three pages.

| Property | Inactive link | Active link |
|---|---|---|
| Color | `#FFFFFF` | `#F0CF50` (gold) |
| Font | Manrope 16px 400 | Manrope 16px 400 |
| Text-transform | none | none |
| Letter-spacing | normal | normal |

No underlines, no weight change on active — purely a colour swap. The logo
uses the DGTL mark (gold lightning bolt + white "DGTL" text) at approximately
36px height.

---

## 5. Border radii

| Token | Value | Where used |
|---|---|---|
| `radius-sm` | 5px | Small UI elements |
| `radius` | 7px | Buttons (primary + secondary) |
| `radius-md` | 16px | Card image thumbnails, panels |
| `radius-lg` | 20px | Large cards |
| `radius-full` | 9999px | Pill-shaped tags/badges |

---

## 6. Shadows

| Token | Value | Where used |
|---|---|---|
| `glow-sm` | `0 0 30px rgba(240, 207, 80, 0.2)` | Gold glow around CTAs (2 uses) |
| `glow-lg` | `0 0 100px 20px rgba(240, 207, 80, 0.1)` | Radial hero background glow (1 use) |
| `card` | `0 3px 5px rgba(0, 0, 0, 0.2)` | Card drop shadow (13 uses) |
| `soft` | `0 0 8px rgba(0, 0, 0, 0.1)` | Subtle shadow (1 use) |

---

## 7. Layout / spacing observations

- **Max content width:** not explicitly measured, but the homepage hero + service
  section are center-aligned within what looks like a `max-w-6xl` (~1152px) or
  `max-w-7xl` (~1280px) container
- **Section spacing:** very generous — the hero alone is ~800px tall above the fold,
  with ~100-200px padding between content sections
- **Grid:** portfolio uses a 2-column grid on desktop; service cards appear to use
  a stacked accordion-style layout (not a grid)
- **Button gap:** primary + secondary CTAs have a ~16px horizontal gap between them

---

## 8. What the rebuild SHOULD change (design refresh, not redesign)

Per the brief: "same structure and content architecture as today, with a light
visual refresh — sharper typography, tighter layout, cleaner component library."

Specific improvements over the WordPress site:

1. **Reset body weight to 400** — the WP site defaults to 700 on everything,
   making nothing feel bold because everything already is.
2. **Tighten whitespace** — the WP site has enormous empty black space between
   sections (800px+ hero, huge vertical padding). The rebuild should use more
   purposeful spacing that guides the eye.
3. **Add proper surface elevation** — the WP site is flat black everywhere. The
   project-overview.html defined `--surface`, `--surface-2`, `--surface-3` for a
   reason — cards and panels should float above the black background with a
   subtle tonal shift.
4. **Consistent component sizing** — the WP site's Elementor build has
   inconsistent padding, margin, and font sizing across sections (some sections
   use 16px body, others 18px, some headings are 45px on the homepage but 70px
   on /work). The rebuild normalises these into the type scale above.
5. **Replace favicon-as-icon** — every service card on /services uses the same
   favicon SVG as its icon (a placeholder oversight). Design proper icons.
6. **Portfolio card polish** — the /work cards have lazy-loaded images that
   render as gray rectangles. The rebuild should use Cloudinary transformations
   for instant-load placeholder blurs.
