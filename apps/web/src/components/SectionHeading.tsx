type SectionHeadingProps = {
  /** The eyebrow / overline text (e.g. "Our Services", "Phase 01") */
  eyebrow?: string
  /** Main heading */
  children: React.ReactNode
  /** Optional subtitle below the heading */
  subtitle?: string
  /** Center-align the block? Default: left-aligned */
  center?: boolean
  /** HTML heading level */
  as?: 'h1' | 'h2' | 'h3'
}

/**
 * DGTL Section heading — eyebrow + heading + optional subtitle.
 * Uses the brand type scale: gold mono eyebrow + white bold heading + muted subtitle.
 */
export function SectionHeading({
  eyebrow,
  children,
  subtitle,
  center = false,
  as: Tag = 'h2',
}: SectionHeadingProps) {
  return (
    <div className={center ? 'text-center' : ''}>
      {eyebrow && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-3">
          {eyebrow}
        </p>
      )}
      <Tag className="text-heading-1 font-bold text-white">
        {children}
      </Tag>
      {subtitle && (
        <p className="mt-4 text-body-lg text-muted max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
