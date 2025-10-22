// src/lib/iyzico.ts
import "server-only"

// Use very loose types to avoid compile-time type issues with `iyzipay`
let _client: any | null = null

async function getClient() {
  if (_client) return _client

  const { default: Iyzipay } = await import("iyzipay").catch(() => ({ default: null as any }))
  if (!Iyzipay) {
    throw new Error("iyzipay package is not installed. Run `npm i iyzipay` or disable Iyzico features.")
  }

  const { IYZI_API_KEY, IYZI_SECRET_KEY, IYZI_BASE_URL } = process.env
  if (!IYZI_API_KEY || !IYZI_SECRET_KEY || !IYZI_BASE_URL) {
    throw new Error("Iyzico environment variables are missing. Set IYZI_API_KEY, IYZI_SECRET_KEY, IYZI_BASE_URL")
  }

  _client = new Iyzipay({
    apiKey: IYZI_API_KEY,
    secretKey: IYZI_SECRET_KEY,
    uri: IYZI_BASE_URL, // e.g. https://sandbox-api.iyzipay.com
  })
  return _client
}

function callIyzi<T = any>(fn: (client: any, cb: (err: any, result: T) => void) => void): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await getClient()
      fn(client, (err, result) => (err ? reject(err) : resolve(result)))
    } catch (e) {
      reject(e)
    }
  })
}

export async function createPayment(payload: any) {
  return callIyzi((client, cb) => client.payment.create(payload, cb))
}

export async function initializeCheckoutForm(payload: any) {
  return callIyzi((client, cb) => client.checkoutFormInitialize.create(payload, cb))
}

export async function retrieveCheckoutForm(payload: any) {
  return callIyzi((client, cb) => client.checkoutForm.retrieve(payload, cb))
}
