type Bg = 'default' | 'surface' | 'surface-2'
type Spacing = 'sm' | 'default' | 'lg'

type SectionProps = {
  bg?: Bg
  spacing?: Spacing
  id?: string
  className?: string
  children: React.ReactNode
}

const bgStyles: Record<Bg, string> = {
  'default':   'bg-background',
  'surface':   'bg-surface',
  'surface-2': 'bg-surface-2',
}

const spacingStyles: Record<Spacing, string> = {
  sm:      'py-12 sm:py-16',
  default: 'py-16 sm:py-20 lg:py-24',
  lg:      'py-20 sm:py-28 lg:py-32',
}

export function Section({
  bg = 'default',
  spacing = 'default',
  id,
  className = '',
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={[
        bgStyles[bg],
        spacingStyles[spacing],
        className,
      ].join(' ')}
    >
      {children}
    </section>
  )
}
