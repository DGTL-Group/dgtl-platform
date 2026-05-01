import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface EmailLayoutProps {
  preview: string
  children: React.ReactNode
}

const SITE_URL = 'https://dgtlgroup.io'
const LOGO_URL = `${SITE_URL}/logos/logo-white-gold.svg`

/**
 * Shared base layout for all DGTL transactional/marketing emails.
 * Dark background, gold accents, DGTL logo header, footer with unsubscribe
 * placeholder for marketing emails.
 */
export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                gold: '#F0CF50',
                'gold-hover': '#d4b438',
                bg: '#000000',
                surface: '#111111',
                'surface-2': '#1a1a1a',
                muted: '#9a9a9a',
                line: 'rgba(255,255,255,0.08)',
              },
              fontFamily: {
                sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
              },
            },
          },
        }}
      >
        <Body className="bg-bg text-white font-sans m-0 p-0">
          <Container className="max-w-[600px] mx-auto bg-bg">
            {/* Header */}
            <Section className="px-8 py-8 border-b border-line">
              <Img
                src={LOGO_URL}
                alt="DGTL Group"
                width="120"
                height="auto"
                className="my-0"
              />
            </Section>

            {/* Body */}
            <Section className="px-8 py-10">
              {children}
            </Section>

            {/* Footer */}
            <Hr className="border-line my-0" />
            <Section className="px-8 py-6">
              <Text className="text-muted text-[12px] leading-[1.5] m-0">
                DGTL Group &mdash; Digital marketing agency
                <br />
                Building brands with{' '}
                <span style={{ color: '#F0CF50' }}>brilliance, attention, precision</span>.
              </Text>
              <Text className="text-muted text-[12px] leading-[1.5] mt-3 mb-0">
                <a href={SITE_URL} style={{ color: '#F0CF50', textDecoration: 'none' }}>
                  dgtlgroup.io
                </a>
                {'  ·  '}
                <a
                  href="mailto:contact@dgtlgroup.io"
                  style={{ color: '#F0CF50', textDecoration: 'none' }}
                >
                  contact@dgtlgroup.io
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
