'use client'

import React, { Suspense, type ReactNode } from 'react'

export default function ClientSuspense({
  children,
  fallback = null,
}: {
  children: ReactNode
  fallback?: React.ReactNode
}) {
  return <Suspense fallback={fallback}>{children}</Suspense>
}
