import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Design System',
  description: 'Internal DGTL design system — foundations, components, patterns, emails.',
  robots: {
    index: false,
    follow: false,
  },
}

const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'foundations', label: 'Foundations', subsections: [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'radius', label: 'Border radius' },
    { id: 'shadows', label: 'Shadows' },
    { id: 'logos', label: 'Logos' },
  ] },
  { id: 'components', label: 'Components', subsections: [
    { id: 'buttons', label: 'Button' },
    { id: 'section-heading', label: 'SectionHeading' },
    { id: 'forms', label: 'Forms' },
    { id: 'logo-carousel', label: 'LogoCarousel' },
    { id: 'background-effects', label: 'Background effects' },
  ] },
  { id: 'patterns', label: 'Patterns', subsections: [
    { id: 'pattern-hero', label: 'Hero' },
    { id: 'pattern-service-selector', label: 'Service selector' },
    { id: 'pattern-filter-grid', label: 'Filter pills + grid' },
    { id: 'pattern-testimonials', label: 'Testimonials' },
    { id: 'pattern-cta-cards', label: 'Two-card CTA' },
  ] },
  { id: 'emails', label: 'Emails' },
]

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-50 h-14 border-b border-line bg-background/90 backdrop-blur-md flex items-center px-6">
        <div className="flex items-center gap-3">
          <span className="text-gold text-lg">⚡</span>
          <span className="font-bold text-white">DGTL Design System</span>
          <span className="text-muted text-body-sm ml-3">Internal — not indexed</span>
        </div>
        <div className="ml-auto text-body-sm text-muted">
          <a href="/" className="hover:text-white transition-colors">← Back to site</a>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="hidden lg:block sticky top-14 self-start w-64 h-[calc(100vh-3.5rem)] border-r border-line p-6 overflow-y-auto">
          <ul className="space-y-1">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="block py-1.5 text-body-sm font-bold text-white hover:text-gold transition-colors"
                >
                  {section.label}
                </a>
                {section.subsections && (
                  <ul className="mt-1 ml-3 border-l border-line space-y-0.5">
                    {section.subsections.map((sub) => (
                      <li key={sub.id}>
                        <a
                          href={`#${sub.id}`}
                          className="block py-1 pl-3 text-body-sm text-muted hover:text-white transition-colors"
                        >
                          {sub.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <main className="flex-1 min-w-0 max-w-5xl mx-auto px-6 lg:px-12 py-12">
          {children}
        </main>
      </div>
    </div>
  )
}
