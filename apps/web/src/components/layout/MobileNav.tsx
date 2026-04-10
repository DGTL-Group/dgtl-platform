'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_LINKS } from '@/lib/navigation'

type MobileNavProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    onOpenChange(false)
  }, [pathname, onOpenChange])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-50 bg-black/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>

            {/* Drawer panel */}
            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-surface p-8"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              >
                {/* Close button */}
                <Dialog.Close className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-[var(--radius)] text-muted transition-colors hover:text-white">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span className="sr-only">Close menu</span>
                </Dialog.Close>

                {/* Title for accessibility (visually hidden) */}
                <Dialog.Title className="sr-only">Navigation</Dialog.Title>

                {/* Nav links */}
                <nav className="mt-16 flex flex-col gap-1">
                  {NAV_LINKS.map(({ label, href }) => {
                    const isActive =
                      href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(href)

                    return (
                      <Link
                        key={href}
                        href={href}
                        className={[
                          'text-heading-3 font-semibold py-3 border-b border-line transition-colors',
                          isActive ? 'text-gold' : 'text-white hover:text-gold',
                        ].join(' ')}
                      >
                        {label}
                      </Link>
                    )
                  })}
                </nav>

              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
