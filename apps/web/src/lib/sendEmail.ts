import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import * as React from 'react'

let transporterCache: nodemailer.Transporter | null = null

function getTransporter() {
  if (transporterCache) return transporterCache

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    throw new Error('SMTP env vars not configured (SMTP_HOST, SMTP_USER, SMTP_PASS).')
  }

  transporterCache = nodemailer.createTransport({
    host,
    port,
    secure: false, // STARTTLS on 587
    auth: { user, pass },
  })
  return transporterCache
}

interface SendEmailOptions {
  to: string | string[]
  subject: string
  /** A React element rendered via @react-email/render to HTML. */
  template: React.ReactElement
  /** Optional plain-text fallback. If omitted, react-email derives one. */
  text?: string
  /** Override default From; defaults to SMTP_FROM env var. */
  from?: string
  /** Reply-To header (e.g. for contact forms — set to submitter's email). */
  replyTo?: string
}

/**
 * Send a transactional email using a React Email template, via AWS SES SMTP.
 * The template is rendered to HTML at send time.
 */
export async function sendEmail({
  to,
  subject,
  template,
  text,
  from,
  replyTo,
}: SendEmailOptions) {
  const html = await render(template)
  const plain = text ?? (await render(template, { plainText: true }))

  const transporter = getTransporter()
  const fromAddress = from || process.env.SMTP_FROM || 'noreply@dgtlgroup.io'

  const info = await transporter.sendMail({
    from: fromAddress,
    to: Array.isArray(to) ? to.join(', ') : to,
    subject,
    html,
    text: plain,
    ...(replyTo ? { replyTo } : {}),
  })

  return info
}
