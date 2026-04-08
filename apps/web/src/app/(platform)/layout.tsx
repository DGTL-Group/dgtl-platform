import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'DGTL Group — Digital Agency',
    template: '%s · DGTL Group',
  },
  description:
    'DGTL Group builds modern web, AI automation, content, and growth strategy for ambitious brands.',
  metadataBase: new URL('https://dgtlgroup.io'),
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'DGTL Group',
  },
}

// This is a ROOT layout for the (platform) route group. Because there is no
// src/app/layout.tsx, Next.js treats this as a real <html> root for every
// route under (platform). The (payload) group has its own distinct root
// layout so Payload's admin UI is fully isolated from the platform styling.
export default function PlatformRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
