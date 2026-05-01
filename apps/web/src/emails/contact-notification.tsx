import { Heading, Hr, Section, Text } from '@react-email/components'
import * as React from 'react'
import { EmailLayout } from './components/EmailLayout'

export interface ContactNotificationProps {
  name: string
  email: string
  message?: string
  mauticUrl?: string
}

export default function ContactNotification({
  name,
  email,
  message,
  mauticUrl,
}: ContactNotificationProps) {
  return (
    <EmailLayout preview={`New contact form submission from ${name}`}>
      <Heading
        as="h1"
        className="text-white text-[24px] font-bold leading-[1.2] tracking-[-0.02em] m-0 mb-2"
      >
        New contact form submission
      </Heading>
      <Text className="text-muted text-[14px] m-0 mb-6">
        Someone just submitted the &quot;Get in Touch&quot; form on dgtlgroup.io.
      </Text>

      <Section className="bg-surface-2 border border-line rounded-md p-5 mb-6">
        <Text className="text-muted text-[12px] uppercase tracking-wide m-0 mb-1">Name</Text>
        <Text className="text-white text-[16px] font-bold m-0 mb-4">{name}</Text>

        <Text className="text-muted text-[12px] uppercase tracking-wide m-0 mb-1">Email</Text>
        <Text className="text-white text-[16px] m-0 mb-4">
          <a href={`mailto:${email}`} style={{ color: '#F0CF50', textDecoration: 'none' }}>
            {email}
          </a>
        </Text>

        {message && (
          <>
            <Text className="text-muted text-[12px] uppercase tracking-wide m-0 mb-1">Message</Text>
            <Text className="text-white text-[15px] leading-[1.6] m-0 whitespace-pre-wrap">
              {message}
            </Text>
          </>
        )}
      </Section>

      {mauticUrl && (
        <>
          <Hr className="border-line my-4" />
          <Text className="text-muted text-[13px] m-0">
            View this contact in Mautic:{' '}
            <a href={mauticUrl} style={{ color: '#F0CF50' }}>
              {mauticUrl}
            </a>
          </Text>
        </>
      )}
    </EmailLayout>
  )
}

ContactNotification.PreviewProps = {
  name: 'Alex Smith',
  email: 'alex@example.com',
  message:
    "Hey! I'm looking for help with a brand refresh and a new website. We're a 50-person SaaS company.\n\nWhat's your typical engagement look like?",
  mauticUrl: 'https://mautic.dgtlgroup.io/s/contacts/view/123',
} satisfies ContactNotificationProps
