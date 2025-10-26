'use client'

import { Suspense, type PropsWithChildren } from 'react'

export default function ClientBoundary({ children }: PropsWithChildren) {
  // If you want a UI here, replace null with a small spinner/skeleton
  return <Suspense fallback={null}>{children}</Suspense>
}

