'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { NAV_LINKS } from '@/lib/navigation'
import { Container } from '@/components/ui/Container'
import { MobileNav } from '@/components/layout/MobileNav'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [glowPos, setGlowPos] = useState<{ left: number; width: number } | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  const updateGlow = useCallback(() => {
    if (!navRef.current) return
    const active = navRef.current.querySelector('[data-active="true"]') as HTMLElement | null
    if (active) {
      const navRect = navRef.current.getBoundingClientRect()
      const linkRect = active.getBoundingClientRect()
      setGlowPos({
        left: linkRect.left - navRect.left + linkRect.width / 2,
        width: linkRect.width,
      })
    } else {
      setGlowPos(null)
    }
  }, [])

  useEffect(() => {
    updateGlow()
    window.addEventListener('resize', updateGlow)
    return () => window.removeEventListener('resize', updateGlow)
  }, [pathname, updateGlow])

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 overflow-visible"
      style={{
        background: 'rgba(0, 0, 0, 0.45)',
        backdropFilter: 'blur(8px) saturate(180%)',
        WebkitBackdropFilter: 'blur(8px) saturate(180%)',
        border: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 6px 6px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.15)',
      }}
    >
      <Container size="wide">
        <nav className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logos/logo-white-gold.svg"
              alt="DGTL Group"
              width={120}
              height={55}
              priority
            />
          </Link>

          {/* Desktop links — right-aligned */}
          <NavigationMenu.Root className="hidden lg:block">
            <NavigationMenu.List className="flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => {
                // Strip /site prefix for dev — prod uses clean paths
                const cleanPath = pathname.replace(/^\/site/, '') || '/'
                const isActive =
                  href === '/'
                    ? cleanPath === '/'
                    : cleanPath === href || cleanPath.startsWith(href + '/')

                return (
                  <NavigationMenu.Item key={href}>
                    <NavigationMenu.Link asChild>
                      <Link
                        href={href}
                        data-active={isActive}
                        className={[
                          'relative text-body-sm font-medium',
                          isActive ? 'text-white' : 'text-muted',
                        ].join(' ')}
                      >
                        {label}
                      </Link>
                    </NavigationMenu.Link>
                  </NavigationMenu.Item>
                )
              })}
            </NavigationMenu.List>
          </NavigationMenu.Root>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-[var(--radius)] text-white transition-colors hover:bg-faint lg:hidden"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </nav>
      </Container>

      {/* Active page glow — slides along the navbar's bottom edge */}
      <span
        className="absolute pointer-events-none"
        style={{
          bottom: '-10px',
          left: glowPos ? glowPos.left : 0,
          width: glowPos ? glowPos.width + 80 : 0,
          height: '16px',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(ellipse at center top, rgba(240, 207, 80, 0.3) 0%, transparent 70%)',
          filter: 'blur(8px)',
          opacity: glowPos ? 1 : 0,
          transition: 'left 500ms ease-in-out, width 500ms ease-in-out, opacity 500ms ease-in-out',
        }}
      />

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  )
}
