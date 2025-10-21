import 'server-only'
import Iyzipay from 'iyzipay'

const apiKey = process.env.IYZICO_API_KEY
const secretKey = process.env.IYZICO_SECRET_KEY
const baseUrl = process.env.IYZICO_BASE_URL || 'https://sandbox-api.iyzipay.com'

let iyzico: Iyzipay | null = null

function getClient() {
  if (!apiKey || !secretKey) {
    throw new Error('IYZICO_API_KEY / IYZICO_SECRET_KEY missing in .env.local')
  }
  if (!iyzico) {
    iyzico = new Iyzipay({ apiKey, secretKey, uri: baseUrl })
  }
  return iyzico
}

// Utility to promisify Iyzipay SDK methods (which use callbacks)
function call<T>(fn: (cb: (err: any, res: T) => void) => void): Promise<T> {
  return new Promise<T>((resolve, reject) =>
    fn((err, res) => (err ? reject(err) : resolve(res)))
  )
}

/**
 * Initialize a non-3D payment (for basic flow / staging).
 * For production, prefer 3DS or CheckoutForm initialize & callback.
 */
export async function createPayment(payload: Iyzipay.CreatePaymentRequest) {
  const client = getClient()
  return call<Iyzipay.Payment>((cb) => client.payment.create(payload, cb))
}

/** Initialize a hosted checkout form (recommended) */
export async function initializeCheckoutForm(
  payload: Iyzipay.CheckoutFormInitializeRequest
) {
  const client = getClient()
  return call<Iyzipay.CheckoutFormInitialize>((cb) =>
    client.checkoutFormInitialize.create(payload, cb)
  )
}

/** Retrieve checkout form result by token (callback step) */
export async function retrieveCheckoutForm(token: string) {
  const client = getClient()
  return call<Iyzipay.CheckoutForm>((cb) =>
    client.checkoutForm.retrieve({ token }, cb)
  )
}
