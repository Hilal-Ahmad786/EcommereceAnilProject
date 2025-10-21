import 'server-only'
import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const DEFAULT_FROM = process.env.RESEND_FROM_EMAIL || 'Mutfak Mobilya <noreply@example.com>'

if (!RESEND_API_KEY) {
  // Don't throw at import time to avoid build crashes; throw when used.
  // eslint-disable-next-line no-console
  console.warn('RESEND_API_KEY is not set. Emails will fail until you add it.')
}

export const resend = new Resend(RESEND_API_KEY || '')

type SendEmailParams = {
  to: string | string[]
  subject: string
  react?: React.ReactElement
  html?: string
  text?: string
  from?: string
}

/** Send an email via Resend (supports React Email or raw HTML/text) */
export async function sendEmail(params: SendEmailParams) {
  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY missing. Set it in .env.local')
  }
  const { to, subject, react, html, text, from } = params
  const res = await resend.emails.send({
    from: from || DEFAULT_FROM,
    to,
    subject,
    react,
    html,
    text,
  })
  return res
}
