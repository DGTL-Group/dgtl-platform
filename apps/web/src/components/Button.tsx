import { type ComponentProps } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'default' | 'sm' | 'lg'

type ButtonProps = ComponentProps<'a'> & {
  variant?: Variant
  size?: Size
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gold text-black border-gold hover:bg-[#e0bf40] hover:border-[#e0bf40] ' +
    'focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
    'shadow-[var(--shadow-glow-sm)]',
  secondary:
    'bg-transparent text-white border-white/80 hover:bg-faint hover:border-white ' +
    'focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  ghost:
    'bg-transparent text-muted border-transparent hover:text-white ' +
    'focus-visible:ring-2 focus-visible:ring-white/20',
}

const sizeStyles: Record<Size, string> = {
  sm:      'px-4 py-2 text-[14px] rounded-[var(--radius-sm)]',
  default: 'px-6 py-[15px] text-[16px] rounded-[var(--radius)]',
  lg:      'px-8 py-[18px] text-[18px] rounded-[var(--radius)]',
}

/**
 * DGTL Button — the two variants match the hero CTA pair on the live site.
 *
 * Renders as `<a>` by default (most CTAs are links). For form submit buttons,
 * swap the underlying element when we build the form components.
 */
export function Button({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={[
        'inline-flex items-center justify-center gap-2',
        'border font-bold tracking-normal whitespace-nowrap',
        'transition-all duration-200 ease-out',
        'select-none cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </a>
  )
}
