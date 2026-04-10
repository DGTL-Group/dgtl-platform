type Size = 'narrow' | 'default' | 'wide'

type ContainerProps = {
  size?: Size
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

const sizeStyles: Record<Size, string> = {
  narrow:  'max-w-4xl',
  default: 'max-w-7xl',
  wide:    'max-w-[1400px]',
}

export function Container({
  size = 'default',
  as: Tag = 'div',
  className = '',
  children,
}: ContainerProps) {
  return (
    <Tag
      className={[
        'mx-auto w-full px-6 sm:px-8 lg:px-12',
        sizeStyles[size],
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  )
}
