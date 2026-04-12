'use client'

import { Button, ButtonArrow, SectionHeading, Container, Section } from '@/components'
import { motion } from 'framer-motion'

export default function SiteHome() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Section spacing="lg" bg="default" className="!bg-transparent relative flex flex-col items-center justify-center min-h-screen md:h-screen text-center overflow-hidden">
        <Container className="relative z-10">
          <h1 className="text-title font-semibold tracking-[-0.023em] text-white max-w-3xl mx-auto sm:text-display sm:tracking-[-0.02em]">
            Transforming Brands with Innovative Creative Solutions
          </h1>

          <p className="mt-6 text-body-lg text-muted max-w-2xl mx-auto">
            As a full-service digital marketing agency, we empower brands to
            thrive in a competitive landscape. Our expertise in strategy,
            technology, creative design, and data ensures your brand makes a
            positive impact.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="https://calendar.dgtlgroup.io/team/dgtl-group/assessment-call">
              Book a Call <ButtonArrow />
            </Button>
            <Button variant="secondary" href="/about">
              Learn More
            </Button>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex flex-col items-center gap-2">
            <div className="scroll-mouse">
              <div className="scroll-wheel" />
            </div>
            <div className="relative w-5 h-4">
              {/* White chevron — fades out as it bounces down */}
              <motion.svg
                data-framer=""
                className="absolute inset-0"
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  y: [0, 4, 0],
                  opacity: [1, 0, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <polyline points="2 2 10 8 18 2" />
                <polyline points="2 8 10 14 18 8" />
              </motion.svg>
              {/* Gold chevron — fades in as it bounces down */}
              <motion.svg
                data-framer=""
                className="absolute inset-0"
                width="20"
                height="16"
                viewBox="0 0 20 16"
                fill="none"
                stroke="#F0CF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  y: [0, 4, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <polyline points="2 2 10 8 18 2" />
                <polyline points="2 8 10 14 18 8" />
              </motion.svg>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Trusted By ────────────────────────────────────────────────────── */}
      <Section spacing="sm" bg="surface">
        <Container>
          <p className="text-center text-body-sm text-muted uppercase tracking-[0.15em]">
            Trusted by industry leaders and innovators worldwide
          </p>
          {/* Client logos will go here — Payload CMS Phase 03 */}
          <div className="mt-8 flex items-center justify-center gap-12 opacity-40">
            {['Client 1', 'Client 2', 'Client 3', 'Client 4', 'Client 5'].map((name) => (
              <div key={name} className="h-8 w-24 rounded bg-surface-3" />
            ))}
          </div>
        </Container>
      </Section>

      {/* ── CTA — Unlock Potential ─────────────────────────────────────────── */}
      <Section>
        <Container size="narrow" className="text-center">
          <h2 className="text-heading-1 font-bold text-white tracking-[-0.02em]">
            Unlock Your Brand&apos;s Potential with Comprehensive Digital
            Marketing Solutions
          </h2>
        </Container>
      </Section>

      {/* ── Portfolio ─────────────────────────────────────────────────────── */}
      <Section id="work" bg="surface">
        <Container>
          <SectionHeading
            eyebrow="Portfolio"
            subtitle="Explore our innovative solutions and impactful results."
            center
          >
            Our Featured Projects
          </SectionHeading>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Art Villas Costa Rica',
                slug: 'art-villas-costa-rica',
                desc: 'Content creation campaign — photography, videography, and user generated content.',
                tags: ['Photography', 'Videography', 'UGC'],
              },
              {
                title: 'Six Senses Ibiza',
                slug: 'six-senses-ibiza',
                desc: 'Captivating digital presence reflecting luxury, wellness, and Mediterranean setting.',
                tags: ['Photography', 'Videography', 'FPV Drone', 'Influencer'],
              },
              {
                title: 'Pacific High Indonesia',
                slug: 'pacific-high-dewata',
                desc: 'Launch content campaign — aerial, land, and underwater in Raja Ampat.',
                tags: ['Photography', 'Videography', 'Drone', 'Underwater'],
              },
            ].map(({ title, slug, desc, tags }) => (
              <a
                key={slug}
                href={`/work/${slug}`}
                className="group block overflow-hidden rounded-[var(--radius-md)] border border-line bg-surface-2 transition-all hover:border-gold-border hover:shadow-[var(--shadow-card)]"
              >
                <div className="aspect-[16/10] bg-surface-3" />
                <div className="p-5">
                  <h3 className="text-card-title font-bold text-white tracking-[-0.02em] group-hover:text-gold">
                    {title}
                  </h3>
                  <p className="mt-2 text-body-sm text-stone">
                    {desc}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-micro text-gold bg-gold-pale px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── About / Empowering Brands ─────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-heading-1 font-bold text-white tracking-[-0.02em]">
                Empowering brands through innovative strategies and a
                passionate, dedicated team.
              </h2>
              <p className="mt-6 text-body-lg text-muted">
                At DGTL, we truly believe in creating meaningful connections
                between brands and their audiences. Our dynamic team is
                committed to delivering exceptional results through creativity,
                technology, and data-driven insights.
              </p>
              <div className="mt-8">
                <Button href="/about">
                  Learn More <ButtonArrow />
                </Button>
              </div>
            </div>
            {/* Image placeholder */}
            <div className="aspect-[4/3] rounded-[var(--radius-lg)] bg-surface-2 border border-line" />
          </div>
        </Container>
      </Section>

      {/* ── Services ──────────────────────────────────────────────────────── */}
      <Section id="services" bg="surface">
        <Container>
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
                  <span className="text-gold text-lg">&#9889;</span>
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
        </Container>
      </Section>

      {/* ── Join the Team ─────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <div className="text-center">
            <h2 className="text-heading-1 font-bold text-white tracking-[-0.02em]">
              Join DGTL Team &#9889;
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/careers">
                Join The DGTL Team <ButtonArrow />
              </Button>
              <Button variant="secondary" href="/creators">
                Join DGTL Influence
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <Section bg="surface">
        <Container>
          <SectionHeading
            eyebrow="Testimonials"
            subtitle="Here's what our clients and partners have to say about our services!"
            center
          >
            Customer Testimonials
          </SectionHeading>

          {/* Testimonial cards — Payload CMS Phase 03 */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-[var(--radius-md)] border border-line bg-surface-2 p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-gold">&#9733;</span>
                  ))}
                </div>
                <p className="text-body-sm text-stone italic">
                  &ldquo;Testimonial placeholder — will be populated from Payload CMS.&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-surface-3" />
                  <div>
                    <p className="text-body-sm font-bold text-white">Client Name</p>
                    <p className="text-caption text-muted">Company</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Brand Statement ───────────────────────────────────────────────── */}
      <Section>
        <Container size="narrow" className="text-center">
          <h2 className="text-heading-1 font-bold text-white tracking-[-0.02em]">
            Branding, websites and digital experiences, crafted with
            brilliance, attention, precision and&hellip;
          </h2>
        </Container>
      </Section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <Section bg="surface">
        <Container size="narrow" className="text-center">
          <h2 className="text-heading-2 font-bold text-white tracking-[-0.02em]">
            Join Our Thriving Community
          </h2>
          <p className="mt-4 text-body-lg text-muted">
            Stay updated with the latest insights and trends in digital
            marketing. Subscribe to our newsletter!
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-[var(--radius)] border border-line bg-surface-2 px-4 py-3 text-body text-white placeholder:text-muted outline-none focus:border-gold"
            />
            <Button href="#">
              Get Started
            </Button>
          </div>
        </Container>
      </Section>

      {/* ── Contact CTA ───────────────────────────────────────────────────── */}
      <Section className="text-center">
        <Container size="narrow">
          <h2 className="text-heading-1 font-bold text-white tracking-[-0.02em]">
            Get in Touch
          </h2>
          <p className="mt-4 text-body-lg text-muted">
            Ready to elevate your brand? We&apos;re here to help! Whether you
            have questions or want to discuss your next project, our marketing
            experts are just a message away.
          </p>
          <div className="mt-8">
            <Button href="/contact">
              Contact Us <ButtonArrow />
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
