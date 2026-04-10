export const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Services',   href: '/services' },
  { label: 'Work',       href: '/work' },
  { label: 'About Us',   href: '/about' },
  { label: 'Contact Us', href: '/contact' },
] as const

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { label: 'Careers',  href: '/careers' },
  { label: 'Creators', href: '/creators' },
] as const

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/dgtlgroup' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/dgtl-group' },
  { label: 'X',         href: 'https://x.com/dgtlgroup' },
] as const
