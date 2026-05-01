import { Button, Heading, Text } from '@react-email/components'
import * as React from 'react'
import { EmailLayout } from './components/EmailLayout'

export interface ContactAutoReplyProps {
  firstname?: string
}

const SITE_URL = 'https://dgtlgroup.io'
const CALENDAR_URL = 'https://calendar.dgtlgroup.io/team/dgtl-group/assessment-call'

export default function ContactAutoReply({ firstname = 'there' }: ContactAutoReplyProps) {
  return (
    <EmailLayout preview="Thanks for reaching out — we'll be in touch soon.">
      <Heading
        as="h1"
        className="text-white text-[28px] font-bold leading-[1.2] tracking-[-0.02em] m-0 mb-4"
      >
        Hi {firstname}, thanks for reaching out!
      </Heading>

      <Text className="text-white text-[16px] leading-[1.6] m-0 mb-4">
        We received your message and one of our team members will get back to
        you within <strong>24 hours</strong>.
      </Text>

      <Text className="text-white text-[16px] leading-[1.6] m-0 mb-6">
        In the meantime, if you&apos;d like to skip the back-and-forth, you can
        book a free 30-minute assessment call directly with us.
      </Text>

      <Button
        href={CALENDAR_URL}
        className="bg-gold text-black font-bold rounded-md px-6 py-3 text-[16px] no-underline"
      >
        Book a Call
      </Button>

      <Text className="text-muted text-[14px] leading-[1.6] mt-8 mb-0">
        Excited to learn more about your project,
      </Text>
      <Text className="text-white text-[14px] leading-[1.6] m-0 font-bold">
        The DGTL Team
      </Text>
    </EmailLayout>
  )
}

ContactAutoReply.PreviewProps = {
  firstname: 'Alex',
} satisfies ContactAutoReplyProps
