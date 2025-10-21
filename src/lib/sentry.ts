import * as Sentry from '@sentry/nextjs'

let inited = false

export function initSentry() {
  if (inited || !process.env.SENTRY_DSN) return
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.2, // tune later
    replaysSessionSampleRate: 0.0,
    replaysOnErrorSampleRate: 0.1,
  })
  inited = true
}

// Convenience helpers (safe if Sentry is not configured)
export function captureException(err: unknown, ctx?: Record<string, any>) {
  try {
    initSentry()
    Sentry.captureException(err, { extra: ctx })
  } catch (_) {}
}

export function captureMessage(msg: string, level: Sentry.SeverityLevel = 'info') {
  try {
    initSentry()
    Sentry.captureMessage(msg, level)
  } catch (_) {}
}
