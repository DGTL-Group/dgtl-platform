import { NextRequest, NextResponse } from 'next/server'

/**
 * Newsletter subscription endpoint backed by Mautic.
 *
 * Flow:
 *  1. Look up contact by email.
 *  2. If contact exists and is already in the newsletter segment → "already subscribed".
 *  3. If contact exists but isn't in the segment → add them, "welcome back".
 *  4. If contact doesn't exist → create + add to segment, "welcome".
 */

interface MauticContact {
  id: number
  fields?: Record<string, unknown>
}

interface MauticListEntry {
  id: number
  name?: string
}

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

  const res = await fetch(`${baseUrl}/api${path}`, {
    ...init,
    headers: {
      Authorization: auth,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })

  return res
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required.' }, { status: 400 })
    }

    const segmentId = process.env.MAUTIC_NEWSLETTER_SEGMENT_ID
    if (!segmentId) {
      console.error('Missing MAUTIC_NEWSLETTER_SEGMENT_ID env var')
      return NextResponse.json({ error: 'Newsletter service not configured.' }, { status: 500 })
    }

    // 1. Search for existing contact by email
    const searchRes = await mauticFetch(
      `/contacts?search=${encodeURIComponent(`email:${email}`)}&limit=1`,
    )
    if (!searchRes.ok) {
      console.error('Mautic search failed', searchRes.status, await searchRes.text())
      return NextResponse.json(
        { error: 'Could not reach the newsletter service. Please try again later.' },
        { status: 500 },
      )
    }
    const searchData = (await searchRes.json()) as { contacts?: Record<string, MauticContact> }
    const existing = searchData.contacts ? Object.values(searchData.contacts)[0] : undefined

    if (existing) {
      // 2. Check if they're already in the newsletter segment
      const segRes = await mauticFetch(`/contacts/${existing.id}/segments`)
      if (segRes.ok) {
        const segData = (await segRes.json()) as { lists?: Record<string, MauticListEntry> }
        const inSegment = segData.lists
          ? Object.values(segData.lists).some((l) => String(l.id) === String(segmentId))
          : false

        if (inSegment) {
          return NextResponse.json({
            success: false,
            alreadySubscribed: true,
            message: "You're already subscribed to our newsletter.",
          })
        }
      }

      // 3. Contact exists but isn't in the segment yet — add them
      const addRes = await mauticFetch(
        `/segments/${segmentId}/contact/${existing.id}/add`,
        { method: 'POST' },
      )
      if (!addRes.ok) {
        console.error('Mautic add-to-segment failed', addRes.status, await addRes.text())
        return NextResponse.json({
          success: false,
          message: 'Could not subscribe. Please try again later.',
        })
      }

      return NextResponse.json({
        success: true,
        message: 'Welcome back to the DGTL newsletter!',
      })
    }

    // 4. New contact — create then add to segment
    const createRes = await mauticFetch('/contacts/new', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
    if (!createRes.ok) {
      console.error('Mautic create-contact failed', createRes.status, await createRes.text())
      return NextResponse.json({
        success: false,
        message: 'Could not subscribe. Please try again later.',
      })
    }
    const createData = (await createRes.json()) as { contact?: MauticContact }
    const newId = createData.contact?.id
    if (!newId) {
      return NextResponse.json({
        success: false,
        message: 'Could not subscribe. Please try again later.',
      })
    }

    const addRes = await mauticFetch(`/segments/${segmentId}/contact/${newId}/add`, {
      method: 'POST',
    })
    if (!addRes.ok) {
      console.error('Mautic add-to-segment (new) failed', addRes.status, await addRes.text())
      // Contact was created but we couldn't add to segment — still report partial success
      return NextResponse.json({
        success: false,
        message: 'Subscription is processing. Please try again in a moment.',
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Welcome to the DGTL newsletter!',
    })
  } catch (err) {
    console.error('Newsletter route error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    )
  }
}
