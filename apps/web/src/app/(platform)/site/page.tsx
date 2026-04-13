'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button, ButtonArrow, SectionHeading, Container, Section } from '@/components'
import { LogoCarousel } from '@/components/ui/LogoCarousel'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICES = [
  {
    name: 'Content Creation',
    desc: 'Boost your brand with captivating content! DGTL offers tailored content creation services designed to engage, inspire, and drive action. From blogs and social media posts to eye-catching visuals, we craft content that amplifies your voice and impact.',
    icon: '\u{1F4F7}',
    image: '/images/services/content-creation.jpg',
  },
  {
    name: 'Social Media Marketing',
    desc: 'Build a powerful social presence that connects with your audience. We develop data-driven social strategies, manage your channels, and create scroll-stopping content that drives engagement and growth.',
    icon: '\u{1F4F1}',
    image: '/images/services/social-media.jpg',
  },
  {
    name: 'Influencer Marketing',
    desc: 'Leverage the power of authentic voices to amplify your brand. We connect you with the right influencers, manage campaigns end-to-end, and deliver measurable results that build trust and awareness.',
    icon: '\u2B50',
    image: '/images/services/influencer.jpg',
  },
  {
    name: 'Public Relations',
    desc: 'Shape your brand narrative and earn media coverage that matters. From press releases to media outreach, we craft compelling stories that position your brand as an industry leader.',
    icon: '\u{1F4E2}',
    image: '/images/services/public-relations.jpg',
  },
  {
    name: 'Web Design & Development',
    desc: 'Create stunning, high-performance websites that convert. Our team designs and develops custom web experiences that reflect your brand, engage visitors, and drive business results.',
    icon: '\u{1F4BB}',
    image: '/images/services/web-development.jpg',
  },
  {
    name: 'Graphics Design',
    desc: 'From brand identities to marketing collateral, our design team creates visuals that captivate and communicate. Every pixel is crafted to elevate your brand and leave a lasting impression.',
    icon: '\u{1F3A8}',
    image: '/images/services/graphics-design.jpg',
  },
  {
    name: 'Advertising',
    desc: 'Maximize your ROI with strategic paid advertising campaigns. From Google Ads to social media ads, we create targeted campaigns that reach the right audience, drive conversions, and scale your growth.',
    icon: '\u{1F4CA}',
    image: '/images/services/advertising.jpg',
  },
]

const PORTFOLIO_CATEGORIES = ['All', 'Content Creation', 'Social Media', 'Influencer', 'Web Design & Dev', 'Graphics Design', 'Advertising']

const PORTFOLIO_PROJECTS = [
  {
    title: 'Art Villas Costa Rica',
    slug: 'art-villas-costa-rica',
    desc: 'Content creation campaign — photography, videography, and user generated content.',
    tags: ['Photography', 'Videography', 'UGC'],
    categories: ['Content Creation'],
  },
  {
    title: 'Six Senses Ibiza',
    slug: 'six-senses-ibiza',
    desc: 'Captivating digital presence reflecting luxury, wellness, and Mediterranean setting.',
    tags: ['Photography', 'Videography', 'FPV Drone', 'Influencer'],
    categories: ['Content Creation', 'Influencer'],
  },
  {
    title: 'Pacific High Indonesia',
    slug: 'pacific-high-dewata',
    desc: 'Launch content campaign — aerial, land, and underwater in Raja Ampat.',
    tags: ['Photography', 'Videography', 'Drone', 'Underwater'],
    categories: ['Content Creation'],
  },
]

export default function SiteHome() {
  const [activeService, setActiveService] = useState(0)
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <Section spacing="lg" className="!bg-transparent relative flex flex-col items-center justify-center min-h-screen md:h-screen text-center overflow-hidden">
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
          <button
            type="button"
            className="btn mt-16 mx-auto flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none"
            onClick={() => {
              const target = document.getElementById('trusted-by')
              if (!target) return
              const start = window.scrollY
              const end = target.getBoundingClientRect().top + window.scrollY - 72
              const distance = end - start
              const duration = 1500
              let startTime: number | null = null

              function easeInOut(t: number) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
              }

              function step(time: number) {
                if (!startTime) startTime = time
                const elapsed = Math.min((time - startTime) / duration, 1)
                window.scrollTo(0, start + distance * easeInOut(elapsed))
                if (elapsed < 1) requestAnimationFrame(step)
              }

              requestAnimationFrame(step)
            }}
          >
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
          </button>
        </Container>
      </Section>

      {/* ── Trusted By ────────────────────────────────────────────────────── */}
      <Section id="trusted-by" className="!bg-transparent !pt-20 !pb-20">
        <p className="text-center text-body-sm text-muted uppercase tracking-[0.15em] mb-24">
          Trusted by industry leaders and innovators worldwide
        </p>
        <LogoCarousel />
      </Section>

      {/* ── Services Selector ─────────────────────────────────────────────── */}
      <Section className="!bg-transparent">
        <Container>
          <h2 className="text-heading-1 font-bold text-white tracking-[-0.02em] text-center mb-16">
            Unlock Your Brand&apos;s Potential with Comprehensive Digital
            Marketing Solutions
          </h2>

          <div className="grid gap-10 lg:grid-cols-[2fr_3fr] lg:items-center">
            {/* Left — Image + detail card */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`img-${activeService}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-[3/4] rounded-[var(--radius-lg)] border border-line overflow-hidden relative"
                >
                  <Image
                    src={SERVICES[activeService].image}
                    alt={SERVICES[activeService].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Overlay card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, y: 'calc(50% + 20px)' }}
                  animate={{ opacity: 1, y: '50%' }}
                  exit={{ opacity: 0, y: 'calc(50% - 20px)' }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute bottom-0 left-0 right-0 sm:left-auto sm:right-4 sm:max-w-sm rounded-[var(--radius-md)] border border-line bg-surface-2/90 backdrop-blur-md p-5"
                >
                  <div className="mb-3 h-10 w-10 rounded-[var(--radius)] bg-gold-pale flex items-center justify-center">
                    <span className="text-gold text-lg">{SERVICES[activeService].icon}</span>
                  </div>
                  <h3 className="text-card-title font-bold text-white tracking-[-0.02em]">
                    {SERVICES[activeService].name}
                  </h3>
                  <p className="mt-2 text-body-sm text-stone leading-relaxed">
                    {SERVICES[activeService].desc}
                  </p>
                  <div className="mt-4">
                    <a href="/services" className="inline-flex items-center gap-2 text-body-sm text-white font-medium transition-colors duration-200 hover:text-gold group/link">
                      Learn More <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1"><ButtonArrow /></span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right — Service menu */}
            <div className="flex flex-col gap-5 lg:justify-center">
              {SERVICES.map((service, i) => (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => setActiveService(i)}
                  className={`text-left text-heading-1 font-bold tracking-[-0.02em] transition-colors duration-200 cursor-pointer bg-transparent border-none py-1 ${
                    i === activeService
                      ? 'text-white'
                      : 'text-white/20 hover:text-white/40'
                  }`}
                >
                  {service.name}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Portfolio ─────────────────────────────────────────────────────── */}
      <Section id="work" className="!bg-transparent">
        <Container>
          <SectionHeading
            eyebrow="Portfolio"
            subtitle="Explore our innovative solutions and impactful results."
            center
          >
            Our Featured Projects
          </SectionHeading>

          {/* Category filter */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-body-sm font-medium transition-colors duration-200 cursor-pointer border ${
                  cat === activeCategory
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-muted border-line hover:border-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {PORTFOLIO_PROJECTS
                .filter((p) => activeCategory === 'All' || p.categories.includes(activeCategory))
                .map(({ title, slug, desc, tags }) => (
                  <motion.a
                    key={slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
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
                  </motion.a>
                ))}
            </AnimatePresence>
          </div>
        </Container>
      </Section>

      {/* ── About / Empowering Brands ─────────────────────────────────────── */}
      <Section className="!bg-transparent">
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
            </div>
            <div className="aspect-[4/3] rounded-[var(--radius-lg)] border border-line overflow-hidden relative">
              <Image
                src="/images/about-team.jpg"
                alt="DGTL team collaborating"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </Section>


      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <Section className="!bg-transparent">
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

      {/* ── Join the Team ─────────────────────────────────────────────────── */}
      <Section className="!bg-transparent">
        <Container>
          <h2 className="text-heading-1 font-bold text-white tracking-[-0.02em] text-center mb-12">
            Join DGTL Team <Image src="/logos/spark.svg" alt="DGTL Spark" width={32} height={32} className="inline-block ml-2 -mt-1" />
          </h2>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Join the Team card */}
            <a
              href="/careers"
              className="group rounded-[var(--radius-md)] border border-line bg-surface-2 p-8 transition-all hover:border-gold-border hover:shadow-[var(--shadow-card)]"
            >
              <h3 className="text-heading-2 font-bold text-white tracking-[-0.02em] group-hover:text-gold">
                Join The DGTL Team
              </h3>
              <p className="mt-4 text-body text-stone leading-relaxed">
                Ready to shape the future of digital marketing? We&apos;re always on the lookout for innovative thinkers, creators, and strategists who thrive on challenges. Explore our available roles and become part of a dynamic team that&apos;s redefining the digital landscape.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-body-sm text-white font-medium group-hover:text-gold transition-colors duration-200">
                Explore Careers <span className="inline-block transition-transform duration-200 group-hover:translate-x-1"><ButtonArrow /></span>
              </div>
            </a>

            {/* Join DGTL Influence card */}
            <a
              href="/creators"
              className="group rounded-[var(--radius-md)] border border-line bg-surface-2 p-8 transition-all hover:border-gold-border hover:shadow-[var(--shadow-card)]"
            >
              <h3 className="text-heading-2 font-bold text-white tracking-[-0.02em] group-hover:text-gold">
                Join DGTL Influence
              </h3>
              <p className="mt-4 text-body text-stone leading-relaxed">
                Are you an influencer ready to grow your personal brand and collaborate with top-tier companies? DGTL Influence is looking for creative, passionate voices to join our network. Apply today and unlock exciting partnership opportunities!
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-body-sm text-white font-medium group-hover:text-gold transition-colors duration-200">
                Apply Now <span className="inline-block transition-transform duration-200 group-hover:translate-x-1"><ButtonArrow /></span>
              </div>
            </a>
          </div>
        </Container>
      </Section>

      {/* ── Brand Statement ───────────────────────────────────────────────── */}
      <Section className="!bg-transparent">
        <Container size="narrow" className="text-center">
          <h2 className="text-heading-1 font-bold text-white tracking-[-0.02em]">
            Branding, websites and digital experiences, crafted with
            brilliance, attention, precision and&hellip;
          </h2>
        </Container>
      </Section>

      {/* ── Newsletter ────────────────────────────────────────────────────── */}
      <Section className="!bg-transparent">
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
      <Section className="!bg-transparent text-center">
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
