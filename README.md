# DGTL Platform

Monorepo for the DGTL Group Holdings platform rebuild.

- **`dgtlgroup.io`** — public marketing site, migrated from WordPress to Next.js 15 + Payload CMS v3
- **`dashboard.dgtlgroup.io`** — private client portal with role-gated modules (files, invoices, tasks, announcements, work requests)

Both apps live in a single co-located monorepo and ship together to Hostinger.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, RSC, Server Actions) |
| CMS | Payload CMS v3 (co-located, headless) |
| Database | PostgreSQL — self-hosted on Hostinger VPS (Docker) |
| Styling | Tailwind CSS v4 |
| Media | Cloudinary (image CDN, file storage) |
| Auth | Payload built-in JWT (4 roles: Owner / Admin / Team / Client) |
| ERP | Frappe ERPNext (self-hosted, REST API) |
| Automation | n8n at flow.dgtlgroup.io |
| Email | AWS SES |
| Hosting | Hostinger Business (single Node.js app slot for the monorepo) |
| SCM | Gitea (primary) + GitHub (mirror, triggers Hostinger autodeploy) |

## Repo layout

```
.
├── apps/
│   ├── site/              # dgtlgroup.io — Next.js 15 app
│   └── dashboard/         # dashboard.dgtlgroup.io — Next.js 15 app
├── packages/
│   ├── cms/               # Payload CMS config + collections
│   ├── ui/                # Shared component library
│   └── lib/               # Shared utilities (Frappe API client, auth helpers)
├── docs/
│   └── project-overview.html   # Internal project brief, phases, timeline, costs
└── README.md
```

> **Note:** `apps/`, `packages/` etc. are scaffolded in Phase 01. This README will be updated as the structure lands.

## Phases

The project is broken into 8 phases — see [`docs/project-overview.html`](docs/project-overview.html) for the full breakdown, Gantt, costs, and open questions.

| # | Phase | Stream | Weeks |
|---|---|---|---|
| 01 | Project Setup & Monorepo Scaffold | Both | 1–2 |
| 02 | Design System & Visual Refresh | Site | 2–5 |
| 03 | Site Development — dgtlgroup.io | Site | 4–10 |
| 04 | Content Migration | Site | 5–11 |
| 05 | Dashboard v1 — Core Build | Dashboard | 6–14 |
| 06 | ERPNext Integration & API Layer | Both | 8–15 |
| 07 | QA, Performance & Security | Both | 16–19 |
| 08 | Launch & Handover | Both | 20 |

## Remotes

This repo pushes to **both Gitea and GitHub** simultaneously on every `git push origin main`.

- **Gitea (primary):** https://git.dgtlgroup.io/DGTL-Group/dgtl-platform
- **GitHub (mirror):** https://github.com/DGTL-Group/dgtl-platform

GitHub mirror is what Hostinger watches for autodeploy.

## Backup

A read-only mirror clone lives at `\\Truenas\raid\Storage\DGTL Group\DGTL Development\DGTL\Website Rebuild` and is auto-synced on every push to `main`.
