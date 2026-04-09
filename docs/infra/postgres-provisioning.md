# VPS Postgres Provisioning — `postgre-dgtl`

This document is the copy-pasteable prompt Will sends to a Claude running on
the Hostinger VPS to provision the Postgres instance for the `dgtl-platform`
monorepo.

> **Where to run it:** SSH into the Hostinger VPS, open a Claude Code session
> in the project root where the existing Docker stack lives (the directory
> that already has `docker-compose.yml` with Frappe ERPNext and the other
> self-hosted services), and paste everything inside the code fence below as
> a single message.

---

## Prompt

```
I'm setting up a new Postgres instance on this VPS to back a separate Next.js
+ Payload CMS v3 project called "dgtl-platform" (the rebuild of dgtlgroup.io
and dashboard.dgtlgroup.io). This database must NOT share state with any
existing service on this VPS — specifically, it must be isolated from Frappe
ERPNext's Postgres/MariaDB and from the 400 Market project's database if one
exists here.

# Goal

Provision a dedicated Postgres container named `postgre-dgtl` on the same
Docker network as the other services, with:

- A single database named `dgtl_platform`
- A single role `dgtl_platform` with a strong generated password (owner of
  the database, login allowed, non-superuser, no createdb/createrole)
- A persistent named Docker volume for the data directory
- A healthcheck so docker-compose can wait for it to be ready
- A restart policy of `unless-stopped`
- Exposed ONLY on the internal Docker network — NOT published to the host
  (no `ports:` mapping to 0.0.0.0). Other services on the same Docker network
  will reach it by its container hostname.
- Running the latest stable Postgres 16 image (16-alpine)

# Context you need to gather first (before doing anything)

1. Run `docker network ls` and find the Docker network that Frappe ERPNext
   and the other services use. The new Postgres container must join the
   SAME network so the Next.js app container (deployed later) can reach it
   by container name.

2. Run `docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}'` and
   confirm:
   - There is no existing container named `postgre-dgtl`
   - There is no existing container already using a conflicting hostname
   - Note what other Postgres / database containers already exist (names +
     images), so we know what we're sharing the network with

3. Find the directory where the existing docker-compose.yml stack lives
   (the one that runs Frappe, n8n, Gitea, etc). Read it to understand the
   network name, volume naming conventions, and whether it uses
   `profiles:`, `env_file:`, or other patterns the new service should
   match. Adapt the new Postgres service to those conventions.

4. Check if the existing stack already defines a Postgres service for any
   other project (e.g., the 400 Market site). If yes, note its container
   name — the new one must be `postgre-dgtl` and must not collide.

# What to produce

After gathering the context above, create ONE of these two things (whichever
matches the existing stack's pattern — do NOT do both):

## Option A — Add a service to the existing docker-compose.yml

If the existing stack is ONE big docker-compose.yml that defines all
services together, add a new `postgre-dgtl` service block to it. Show me the
diff before applying it. The block should look roughly like this, adapted to
the existing network/volume naming convention you found in step 3:

    postgre-dgtl:
      image: postgres:16-alpine
      container_name: postgre-dgtl
      restart: unless-stopped
      environment:
        POSTGRES_DB: dgtl_platform
        POSTGRES_USER: dgtl_platform
        POSTGRES_PASSWORD: ${POSTGRE_DGTL_PASSWORD}
      volumes:
        - postgre-dgtl-data:/var/lib/postgresql/data
      networks:
        - <existing-shared-network-name>
      healthcheck:
        test: ["CMD-SHELL", "pg_isready -U dgtl_platform -d dgtl_platform"]
        interval: 10s
        timeout: 5s
        retries: 5
        start_period: 30s

    volumes:
      postgre-dgtl-data:
        driver: local

## Option B — Dedicated stack directory

If the existing stack uses ONE compose file per service (separate dirs for
Frappe, n8n, etc — each with its own docker-compose.yml), create a new
directory at the same level:

    <same-parent-as-other-service-dirs>/postgre-dgtl/
      docker-compose.yml
      .env                    <- contains POSTGRE_DGTL_PASSWORD only
      README.md               <- brief: how to start/stop/backup

The compose file should use `networks: <external shared network>:
external: true` to join the existing network rather than creating its own.

# Password handling

- Generate a strong password using:
  `openssl rand -base64 32 | tr -d '=+/' | head -c 40`
- Put it in an `.env` file next to the compose file, NOT inline in the yaml.
- The `.env` file must be gitignored / never committed.
- Print the generated connection string ONCE at the end of the session so I
  can copy it into the app's `.env.local`:

    postgres://dgtl_platform:<password>@postgre-dgtl:5432/dgtl_platform

  (hostname is `postgre-dgtl` because the app container will join the same
  Docker network; it does NOT use localhost)

# After starting the container

1. Run `docker compose up -d postgre-dgtl` (or the equivalent for Option B)
2. Wait until `docker compose ps` shows it as `healthy`
3. Verify connectivity from inside the container:
   `docker exec -it postgre-dgtl psql -U dgtl_platform -d dgtl_platform -c "SELECT version();"`
4. Verify from another container on the same network (e.g., exec into the
   Frappe container or any sidecar) using:
   `pg_isready -h postgre-dgtl -U dgtl_platform`
5. Print the logs: `docker compose logs postgre-dgtl | tail -30`
6. Confirm the volume exists: `docker volume ls | grep postgre-dgtl`

# Backup (do this before we put real data in)

Create a simple backup script at `/root/backups/postgre-dgtl/backup.sh` (or
wherever backups for other services already live on this VPS — check first
and match the convention). The script should:

- pg_dump the database to a timestamped .sql.gz file
- Keep the last 14 daily dumps, delete older ones
- Be runnable from cron

Add a cron entry to run it daily at 03:15. Do not overwrite any existing
cron jobs — add to the existing crontab.

# What to report back to me

At the end, print a single summary block that contains:

1. The Docker network name the container joined
2. The container name (should be `postgre-dgtl`)
3. The database name (should be `dgtl_platform`)
4. The role name (should be `dgtl_platform`)
5. The CONNECTION STRING for the app to use (single line, with real password)
6. The path to the compose file that was modified or created
7. The path to the backup script
8. A 3-line health check summary: container status, pg_isready result,
   SELECT version() output

I will copy the connection string from there into the local app's
`.env.local` as `DATABASE_URI`.

# Safety rules

- Do NOT modify any existing Postgres / MariaDB container. Do NOT restart
  Frappe or any other running service unless you're sure it won't lose
  state.
- Do NOT expose port 5432 to the host or to the public internet.
- Do NOT commit the password anywhere. If you need to show it, show it
  only in the final summary.
- If the existing docker-compose.yml already defines a service named
  `postgre-dgtl` or uses the name `dgtl_platform` for a database/user, STOP
  and tell me — don't try to "fix" it.
- If the `.env` pattern on this VPS is different (for example, it uses
  Docker secrets, or a Vault instance), match that pattern instead of
  writing the password to a plaintext `.env`.

Start by running the discovery commands in "Context you need to gather
first", report what you found, and then propose the exact changes you
want to make. Wait for my approval before applying them.
```

---

## After the VPS side is done

Once the other Claude reports back with a connection string, the workflow on
this machine is:

1. Open `apps/web/.env.local` (gitignored — never committed)
2. Replace the placeholder `DATABASE_URI=postgres://placeholder:...` line
   with the real connection string from the VPS
3. Run `pnpm exec payload migrate` from `apps/web/` to initialize the
   Payload schema (`users`, `media`, and Payload internals)
4. Run `pnpm exec payload` and create the first Owner user (Will), or let
   the first-run flow in `/admin` handle it
5. Verify the dev server comes up: `pnpm dev` → visit
   http://localhost:3000/admin

**Important:** the connection string the VPS Claude generates will use
`postgre-dgtl` as the hostname because it assumes the *app container* is on
the same Docker network. For *local* development from `G:\Dev\dgtl-website`,
we need a different hostname. Options:

- **Preferred:** ask the VPS Claude to also expose Postgres on the VPS's
  Tailscale/WireGuard interface (if one exists) and publish the port only on
  that interface, giving us a private `DATABASE_URI` for local dev.
- **Alternative:** run a local Postgres 16 container for dev (`docker run
  --name postgre-dgtl-local -e POSTGRES_PASSWORD=... -p 5432:5432 -d
  postgres:16-alpine`) and keep the VPS instance exclusively for production.
  This is usually cleaner and avoids coupling local dev to VPS uptime.

Decide which we want when the VPS side comes back.
