import 'server-only'

const API_KEY = process.env.MAILCHIMP_API_KEY
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX // e.g., 'us1'

function assertEnv() {
  if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
    throw new Error(
      'Mailchimp env missing. Set MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID, MAILCHIMP_SERVER_PREFIX'
    )
  }
}

/** Subscribe an email to your Mailchimp list */
export async function subscribeToNewsletter(email: string, name?: string) {
  assertEnv()

  const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`
  const body = {
    email_address: email,
    status: 'subscribed',
    merge_fields: {
      FNAME: name || '',
    },
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Basic auth: any username + API key as password
      Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString('base64')}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Mailchimp error (${res.status}): ${text}`)
  }

  return res.json()
}
