import { NextRequest, NextResponse } from 'next/server'
import * as React from 'react'
import { sendEmail } from '@/lib/sendEmail'
import ContactAutoReply from '@/emails/contact-auto-reply'
import ContactNotification from '@/emails/contact-notification'

/**
 * Contact form endpoint backed by Mautic.
 *
 * On submit:
 *  1. Adds/updates the contact in Mautic (firstname/lastname/email).
 *  2. Attaches the project inquiry as a note on the contact.
 *  3. Adds the contact to the "Contact Inquiries" segment.
 *  4. Sends a React-rendered auto-reply to the submitter.
 *  5. Sends a React-rendered internal notification to the DGTL team.
 *
 * Steps 4-5 fire-and-forget; they don't block the user response.
 */

const TEAM_NOTIFY_TO = process.env.CONTACT_NOTIFY_EMAIL || 'will@dgtlgroup.io'

interface MauticContact {
  id: number
  fields?: Record<string, unknown>
}

const CONTACT_SEGMENT_ID = '2'

function authHeader() {
  const user = process.env.MAUTIC_API_USERNAME
  const pass = process.env.MAUTIC_API_PASSWORD
  if (!user || !pass) return null
  return 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64')
}

async function mauticFetch(path: string, init: RequestInit = {}) {
  const baseUrl = process.env.MAUTIC_BASE_URL
  if (!baseUrl) throw new Error('MAUTIC_BASE_URL not set')
  const auth = authHeader()
  if (!auth) throw new Error('MAUTIC_API_USERNAME or MAUTIC_API_PASSWORD not set')

  return fetch(`${baseUrl}/api${path}`, {
    ...init,
    headers: {
      Authorization: auth,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })
}

function splitName(name: string) {
  const trimmed = name.trim()
  const parts = trimmed.split(/\s+/)
  if (parts.length === 1) return { firstname: parts[0], lastname: '' }
  return { firstname: parts[0], lastname: parts.slice(1).join(' ') }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 })
    }

    const { firstname, lastname } = splitName(name)

    // 1. Look up existing contact by email
    const searchRes = await mauticFetch(
      `/contacts?search=${encodeURIComponent(`email:${email}`)}&limit=1`,
    )
    if (!searchRes.ok) {
      console.error('Mautic search failed', searchRes.status, await searchRes.text())
      return NextResponse.json(
        { error: 'Could not reach the contact service. Please try again later.' },
        { status: 500 },
      )
    }
    const searchData = (await searchRes.json()) as { contacts?: Record<string, MauticContact> }
    let existing = searchData.contacts ? Object.values(searchData.contacts)[0] : undefined

    // 2. Create or update the contact with name fields
    if (!existing) {
      const createRes = await mauticFetch('/contacts/new', {
        method: 'POST',
        body: JSON.stringify({ email, firstname, lastname }),
      })
      if (!createRes.ok) {
        console.error('Mautic create-contact failed', createRes.status, await createRes.text())
        return NextResponse.json({
          success: false,
          message: 'Could not submit. Please try again later.',
        })
      }
      const createData = (await createRes.json()) as { contact?: MauticContact }
      existing = createData.contact
    } else {
      // Update name fields on the existing contact
      await mauticFetch(`/contacts/${existing.id}/edit`, {
        method: 'PATCH',
        body: JSON.stringify({ firstname, lastname }),
      })
    }

    if (!existing?.id) {
      return NextResponse.json({
        success: false,
        message: 'Could not submit. Please try again later.',
      })
    }

    // 3. Attach the message as a note on the contact
    if (message && typeof message === 'string' && message.trim().length > 0) {
      await mauticFetch('/notes/new', {
        method: 'POST',
        body: JSON.stringify({
          lead: existing.id,
          text: `Contact form submission:\n\n${message.trim()}`,
          type: 'general',
        }),
      })
    }

    // 4. Add to the contact-inquiries segment
    const addRes = await mauticFetch(
      `/segments/${CONTACT_SEGMENT_ID}/contact/${existing.id}/add`,
      { method: 'POST' },
    )
    if (!addRes.ok) {
      console.error('Mautic add-to-segment failed', addRes.status, await addRes.text())
      // Contact was created/updated successfully, just couldn't tag — still report success
    }

    // 5. Fire-and-forget: send auto-reply + team notification.
    // We don't await these so the user gets a fast response.
    const mauticBaseUrl = process.env.MAUTIC_BASE_URL?.replace(/\/$/, '')
    const mauticContactUrl = mauticBaseUrl
      ? `${mauticBaseUrl}/s/contacts/view/${existing.id}`
      : undefined

    sendEmail({
      to: email,
      subject: 'Thanks for reaching out — DGTL Group',
      template: React.createElement(ContactAutoReply, { firstname }),
    }).catch((err) => console.error('Auto-reply send failed:', err))

    sendEmail({
      to: TEAM_NOTIFY_TO,
      subject: `New contact form submission from ${name}`,
      template: React.createElement(ContactNotification, {
        name,
        email,
        message,
        mauticUrl: mauticContactUrl,
      }),
      replyTo: email,
    }).catch((err) => console.error('Team notification send failed:', err))

    return NextResponse.json({
      success: true,
      message: "Thanks for reaching out! We'll be in touch soon.",
    })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    )
  }
}
