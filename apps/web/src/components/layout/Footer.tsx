'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'

const QUICK_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Services',   href: '/services' },
  { label: 'Work',       href: '/work' },
  { label: 'About Us',   href: '/about' },
  { label: 'Contact Us', href: '/contact' },
]

const CONNECT_LINKS = [
  { label: 'Book a call with us', href: 'https://calendar.dgtlgroup.io/team/dgtl-group/assessment-call', external: true },
  { label: 'Blog',               href: '/blog' },
  { label: 'Join our team',      href: '/careers' },
  { label: 'FAQs',               href: '/#' },
]

const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/dgtlgroup.io',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/dgtlgroup.io',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
  {
    label: 'X',
    href: 'https://x.com/dgtlgroup_io',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/dgtlgroup',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@dgtlgroup',
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
  },
]

const TIMEZONES = [
  { city: 'Toronto', tz: 'America/Toronto' },
  { city: 'Paris',   tz: 'Europe/Paris' },
  { city: 'Bali',    tz: 'Asia/Makassar' },
]

function LiveClocks() {
  const [times, setTimes] = useState<string[]>([])

  useEffect(() => {
    function update() {
      setTimes(
        TIMEZONES.map(({ tz }) =>
          new Date().toLocaleTimeString('en-US', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        )
      )
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {TIMEZONES.map(({ city }, i) => (
        <div key={city} className="flex items-center justify-between gap-8">
          <span className="text-body font-bold text-gold">{city}</span>
          <span className="text-body text-white tabular-nums">
            {times[i] || '--:--:-- --'}
          </span>
        </div>
      ))}
    </div>
  )
}

export function Footer() {
  return (
    <footer>
      <Container>
        {/* Main content row */}
        <div className="flex flex-col gap-12 py-[70px] pb-[80px] lg:flex-row lg:justify-between lg:gap-5">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logos/logo-white-gold.svg"
                alt="DGTL Group"
                width={140}
                height={64}
              />
            </Link>
          </div>

          {/* We Are Global */}
          <div>
            <h5 className="text-heading-3 font-semibold text-white tracking-[-0.02em] mb-6">
              We Are Global
            </h5>
            <LiveClocks />
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-heading-3 font-semibold text-white tracking-[-0.02em] mb-6">
              Quick Links
            </h5>
            <ul className="flex flex-col gap-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-body text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h5 className="text-heading-3 font-semibold text-white tracking-[-0.02em] mb-6">
              Connect With Us
            </h5>
            <ul className="flex flex-col gap-3">
              {CONNECT_LINKS.map(({ label, href, external }) => (
                <li key={href}>
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-body text-white">
                      {label}
                    </a>
                  ) : (
                    <Link href={href} className="text-body text-white">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h5 className="text-heading-3 font-semibold text-white tracking-[-0.02em] mb-6">
              Stay Connected
            </h5>
            <ul className="flex flex-col gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-body text-white">
                    <span className="text-gold">{icon}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 pb-8 sm:flex-row">
          <p className="text-body-lg text-muted">
            &copy; {new Date().getFullYear()} DGTL. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-body text-muted">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-body text-muted">
              Terms of Use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
