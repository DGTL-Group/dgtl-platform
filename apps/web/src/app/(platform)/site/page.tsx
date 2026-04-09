import { Button, SectionHeading } from '@/components'

export default function SiteHome() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 py-24 text-center overflow-hidden">
        {/* Radial gold glow — matches the live site's hero background effect */}
        <div
          className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full opacity-40"
          style={{ background: 'radial-gradient(circle, var(--gold-pale) 0%, transparent 70%)' }}
        />

        <p className="text-micro font-semibold uppercase tracking-[0.2em] text-gold mb-6">
          dgtlgroup.io · Phase 02 scaffold
        </p>

        <h1 className="text-title font-semibold tracking-[-0.023em] text-white max-w-3xl sm:text-display sm:tracking-[-0.02em]">
          Transforming Brands with Creative Solutions
        </h1>

        <p className="mt-6 text-body-lg text-muted max-w-xl">
          Next.js 16 + Payload CMS v3 monorepo. Design tokens extracted from the
          live WordPress site and applied via Tailwind v4.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="#services">
            Book a Call <span aria-hidden>→</span>
          </Button>
          <Button variant="secondary" href="#work">
            Get Started
          </Button>
        </div>
      </section>

      {/* ── Services teaser ───────────────────────────────────────────────── */}
      <section id="services" className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Our Services"
            subtitle="Discover how our tailored solutions can elevate your brand and drive measurable results."
            center
          >
            Comprehensive Digital Marketing
          </SectionHeading>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              'Content Creation',
              'Social Media Marketing',
              'Influencer Marketing',
              'Public Relations',
              'Web Design & Development',
              'Graphics Design',
            ].map((name) => (
              <div
                key={name}
                className="rounded-[var(--radius-md)] border border-line bg-surface-2 p-6 transition-colors hover:border-gold-border"
              >
                <div className="mb-3 h-10 w-10 rounded-[var(--radius)] bg-gold-pale flex items-center justify-center">
                  <span className="text-gold text-lg">⚡</span>
                </div>
                <h3 className="text-card-title font-bold text-white tracking-[-0.02em]">
                  {name}
                </h3>
                <p className="mt-2 text-body-sm text-stone leading-relaxed">
                  Placeholder — service descriptions will be populated from
                  Payload CMS in Phase 03.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work teaser ───────────────────────────────────────────────────── */}
      <section id="work" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Our Work"
            subtitle="Explore our innovative solutions and impactful results."
          >
            Featured Projects
          </SectionHeading>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              { title: 'Art Villas Costa Rica', slug: 'art-villas-costa-rica' },
              { title: 'Pacific High Dewata', slug: 'pacific-high-dewata' },
            ].map(({ title, slug }) => (
              <a
                key={slug}
                href={`/work/${slug}`}
                className="group block overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface transition-all hover:border-gold-border hover:shadow-[var(--shadow-card)]"
              >
                <div className="aspect-[16/10] bg-surface-3" />
                <div className="p-5">
                  <h3 className="text-card-title font-bold text-white tracking-[-0.02em] group-hover:text-gold transition-colors">
                    {title}
                  </h3>
                  <p className="mt-1 text-body-sm text-stone">
                    Case study — content coming in Phase 04
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ──────────────────────────────────────────────────────── */}
      <section className="border-t border-line bg-surface px-6 py-16 text-center">
        <h2 className="text-heading-3 font-semibold text-white tracking-[-0.02em]">
          Ready to elevate your brand?
        </h2>
        <p className="mt-3 text-body text-muted">
          Book a call and see how DGTL can help you grow.
        </p>
        <div className="mt-8">
          <Button href="/contact">
            Get in Touch <span aria-hidden>→</span>
          </Button>
        </div>
      </section>
    </>
  )
}
