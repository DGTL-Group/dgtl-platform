---
title: DGTL Platform Pre-Launch Checklist
last_updated: 2026-04-09
owner: Will Garrison
scope: dgtlgroup.io (Next.js 16 + Payload v3 rebuild) and dashboard.dgtlgroup.io (v1)
---

# Pre-Launch Checklist

Living doc. Everything that has to be done BEFORE the DNS cutover from
WordPress to the new Next.js monorepo. Organised by work stream so items can be
parallelised. Check off as we go; surface blockers in the weekly review.

---

## Content

### Blog

- [ ] **Audit the 3 existing blog posts** for 2026 relevance and brand alignment
  - `maximizing-your-digital-marketing-strategy`
  - `understanding-consumer-behavior-in-2025`
  - `ui-ux-essentials-new-website`
  - For each: rewrite, archive, or keep as-is with fresh edit
- [ ] **Draft 10–15 new blog posts** before launch so `/blog` isn't thin on day one
  - Cover service topics (content creation, SMM, influencer, PR, web dev, graphics)
  - 2–3 case-study-style posts pulled from new work (not the ex-partner content)
  - 1–2 AI / industry trend posts
  - 1 "meet the team" post or founder note
- [ ] **Replace AI-generated DALL·E hero images** on the 3 existing posts
  - Current filenames explicitly say `DALL·E-2025-01-24-...` — obvious to readers and crawlers
- [ ] Decide author model: single "DGTL Group" byline, or individual author profiles?

### Case studies (`/work`)

- [ ] **Confirm source files exist** for the 2 kept case studies
  - Art Villas Costa Rica — Photography / Videography / UGC source files
  - Pacific High Dewata — Photography / Videography / Drone / Underwater source files
- [ ] **Write fresh copy** for both case studies with structured fields (brief, scope, deliverables, timeline, results, team)
- [ ] **Add quantified results** where possible. The only quantified case on the old site was Epidemic Sound ("12+ million views") and we dropped that one — new cases need their own numbers
- [ ] **Produce new case study content for the rebuilt portfolio** — Will's ex-business-partner cleanup dropped 10 of 12 case studies, so the portfolio is thin at launch. Target 6–8 fresh case studies before cutover

### Marketing pages

- [ ] `/about` — Rewrite to remove the placeholder `0%` / `$0+` stats the current site has, add real numbers. Add founder/leadership bios
- [ ] `/services` — The current WordPress site has 6 service cards using the same favicon as icon (placeholder). Design proper service cards with distinct icons
- [ ] `/services` — Decide if each service gets its own detail page (`/services/<slug>`) or if the index stays as the only service page. **Recommendation: individual pages for SEO**
- [ ] `/careers` — Clean up the 2 duplicate Social Media Manager listings (Indonesia + Philippines are currently the same description, salary in IDR only). Resolve the "We currently have no job opening" conflict text
- [ ] `/creators` — Currently the `/join-dgtl-influence/` H1 ends mid-sentence with a literal `|` character. Write clean copy. Confirm the value prop (what does DGTL Influence offer creators?)
- [ ] `/contact` — Verify the 2 phone numbers (+1 213 772-6886, +1 647 930-4443) and Toronto address (487 Adelaide St. W) are current
- [ ] Homepage — Resolve testimonial source of truth. Filip Žák and Jelena Ljubinkovic quotes live in HTML on the current site but the `/testimonial/` CPT is empty. Move them into a Payload `testimonials` collection

### Legal — NEEDS SIGN-OFF BEFORE PUBLISHING

- [ ] **Reconcile 3 jurisdictional references** that don't match on the current site
  - Privacy Policy: "DGTL Group Holdings Limited"
  - Terms of Use: "Saint-Kitts & Nevis law"
  - Contact page: Toronto address
- [ ] Decide the canonical legal entity and jurisdiction
- [ ] Rewrite Privacy Policy to match, and to comply with GDPR (EU visitors) + CPRA (California)
- [ ] Rewrite Terms of Use to match
- [ ] Decide on Cookie Policy — the current site has none, and claims international operation. Likely a GDPR/UK gap
- [ ] Decide if a cookie consent banner is required

---

## SEO

- [ ] **Add meta descriptions to every page** (zero exist on the current site across all 51 URLs audited)
- [ ] **Add `Organization` JSON-LD** to the homepage (zero structured data on the current site)
- [ ] **Add `LocalBusiness` JSON-LD** with the Toronto address + 2 phone numbers
- [ ] **Add `Article` JSON-LD** to each blog post
- [ ] **Add `BreadcrumbList` JSON-LD** to all `/work/<slug>` and `/blog/<slug>` pages
- [ ] **Submit new sitemap.xml to Google Search Console** after DNS cutover
- [ ] **Verify every redirect** in `apps/web/src/lib/redirects.ts` fires with the right status code (301 / 308 / 410)
  - Use `curl -sI <url>` or Screaming Frog in spider mode pointed at the temp domain
- [ ] **Confirm `robots.txt` posture** — current WordPress robots.txt declares `ai-train=no` and blocks ClaudeBot / GPTBot / Amazonbot. Keep, drop, or tighten?
- [ ] **OG image** — produce a canonical 1200x630 OG image for the homepage and a fallback for all other pages
- [ ] **Set `canonical` URL on every page** via Next.js metadata

---

## Infrastructure

### Database

- [ ] **Postgres `postgre-dgtl` provisioned** on the Hostinger VPS Docker network using the prompt at `docs/infra/postgres-provisioning.md`
- [ ] **Real `DATABASE_URI` in `apps/web/.env.local`** (replaces the current placeholder)
- [ ] **`pnpm exec payload migrate`** run against the real database
- [ ] **Initial Owner account created** for Will (the protected role that can't be deleted or demoted)
- [ ] **Daily pg_dump backup cron** verified to be running on the VPS (14-day retention)

### Cloudinary

- [x] Cloudinary account connected (shared with 400 Market, `do2cowmgz`)
- [ ] **Test first upload** via Payload admin to confirm the storage plugin activates
- [ ] **Plan the content migration** — bulk-import the keeper media from `/wp-content/uploads/` to Cloudinary (only the files actually referenced by the 15 pages we're keeping)

### Email (AWS SES)

- [x] SES SMTP credentials added to `.env.local` (eu-west-3, Paris)
- [ ] **Wire SES into Payload auth emails** (password reset, admin invites)
- [ ] **Verify the `noreply@dgtlgroup.io` From address** is approved in SES console (not still sandboxed)
- [ ] **Request production sending limits** in SES if still in sandbox mode
- [ ] **SPF / DKIM / DMARC DNS records** published for `dgtlgroup.io`

### Deployment

- [ ] **Hostinger Node.js app slot** pointed at `github.com/DGTL-Group/dgtl-platform`
- [ ] **Temp domain issued** by Hostinger, first deploy verified green
- [ ] **All env vars** set in the Hostinger panel to match `.env.local`
- [ ] **Build command confirmed** — `pnpm build` from the workspace root (Hostinger runs `npm install --omit=dev` by default, so all deps must be in `dependencies` — already the case)
- [ ] **First deploy of `/admin`** verified — Payload admin loads and Will can sign in
- [ ] **First deploy of `/site` routes** — at least the 5 core marketing pages render
- [ ] **First deploy of `/dashboard`** — empty dashboard placeholder loads at `dashboard.dgtlgroup.io`

### DNS cutover

- [ ] **Cloudflare DNS** — add/update A or CNAME records pointing `dgtlgroup.io` + `www.dgtlgroup.io` + `dashboard.dgtlgroup.io` at the Hostinger app
- [ ] **Cloudflare SSL mode** — Full (strict) if Hostinger supports it, otherwise Full
- [ ] **HTTPS redirect** from HTTP confirmed
- [ ] **HSTS header** with a short max-age first (1 day), then ramp to 1 year after confirming nothing is broken
- [ ] **Archive WordPress site** — keep accessible at a staging URL for 30 days in case of rollback

### External subdomains (unchanged, verify they still work post-cutover)

- [ ] `calendar.dgtlgroup.io` booking CTAs (used by every "Book a Call" button on the current site) — confirm the destination still works, or migrate to a new booking tool
- [ ] `book.dgtlgroup.io` studio booking — currently HTTP, **migrate to HTTPS** before launch
- [ ] `erp.dgtlgroup.io` (Frappe) — decide if this is publicly accessible or VPS-internal only
- [ ] `flow.dgtlgroup.io` (n8n), `git.dgtlgroup.io` (Gitea) — private, no changes needed

---

## Observability

- [ ] **Uptime Kuma monitors** for `dgtlgroup.io`, `www.dgtlgroup.io`, `dashboard.dgtlgroup.io`, `/admin`, `/api/health`
- [ ] **Plausible analytics** embed on `/site` routes (NOT on `/dashboard` — client portal is private)
- [ ] **Error tracking** — Sentry or equivalent for the Node.js app (optional for launch, recommended)
- [ ] **Log drain** from Hostinger → somewhere queryable (optional)

---

## Launch day

- [ ] **DNS cutover window** planned for a low-traffic hour (e.g. Saturday early morning EST)
- [ ] **Pre-flight: full build on the temp domain** passes all QA
- [ ] **Cutover runbook** written in `docs/runbooks/launch.md` (to be drafted in Phase 08)
- [ ] **Rollback plan** — keep WordPress reachable at staging URL, DNS TTL lowered to 300 for 24h pre-launch
- [ ] **Post-launch monitoring window** — 48 hours hands-on, checking Uptime Kuma / Plausible / Hostinger logs every 2 hours
- [ ] **2-week post-launch review** scheduled with the v2 dashboard roadmap kickoff

---

## Open questions (from the audit) still waiting on you

- Hire or decide team page (currently no team members listed publicly anywhere)
- Booking subdomain strategy (keep `calendar.dgtlgroup.io` + `book.dgtlgroup.io` as separate destinations, or consolidate?)
- Frappe ERPNext — `erp.dgtlgroup.io` via Traefik, or VPS-internal only?
- Client file storage — Cloudinary 25 GB free tier enough, or upgrade?
- Dashboard client onboarding — manual via Payload admin, or self-service invite flow?
