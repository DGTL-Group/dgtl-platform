import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LineGlow } from '@/components/ui/LineGlow'
import { CursorGlow } from '@/components/ui/CursorGlow'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <LineGlow />
      <CursorGlow />
      <Navbar />
      <main className="flex-1 pt-[72px]">{children}</main>
      <Footer />
    </>
  )
}
