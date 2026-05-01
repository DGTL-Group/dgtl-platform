/**
 * Layout helpers for the design system page.
 * These live in a private folder (underscore prefix) so Next.js doesn't
 * treat them as routes.
 */

interface DesignSectionProps {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}

export function DesignSection({ id, title, description, children }: DesignSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 mb-20">
      <div className="mb-8 pb-4 border-b border-line">
        <h2 className="text-heading-1 font-bold text-white tracking-[-0.02em]">{title}</h2>
        {description && (
          <p className="mt-3 text-body text-muted">{description}</p>
        )}
      </div>
      <div className="space-y-12">{children}</div>
    </section>
  )
}

interface DesignSubsectionProps {
  id: string
  title: string
  description?: string
  children: React.ReactNode
}

export function DesignSubsection({ id, title, description, children }: DesignSubsectionProps) {
  return (
    <div id={id} className="scroll-mt-20">
      <h3 className="text-heading-3 font-bold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-body-sm text-muted mb-5 max-w-2xl">{description}</p>
      )}
      {children}
    </div>
  )
}

interface DesignExampleProps {
  /** Optional label above the rendered example */
  label?: string
  /** Optional code snippet shown in a small block under the example */
  code?: string
  /** Background variant for the preview area */
  bg?: 'surface' | 'transparent'
  children: React.ReactNode
}

export function DesignExample({ label, code, bg = 'surface', children }: DesignExampleProps) {
  return (
    <div>
      {label && (
        <p className="text-caption text-muted mb-2 uppercase tracking-wider">{label}</p>
      )}
      <div
        className={[
          'rounded-[var(--radius-md)] border border-line p-8',
          bg === 'surface' ? 'bg-surface-2' : 'bg-transparent',
        ].join(' ')}
      >
        {children}
      </div>
      {code && (
        <pre className="mt-2 text-caption text-muted bg-black/30 border border-line rounded-[var(--radius)] p-3 overflow-x-auto">
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
