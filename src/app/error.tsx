'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Bir şeyler yanlış gitti!</h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-walnut-500 text-white rounded-lg hover:bg-walnut-600"
      >
        Tekrar Dene
      </button>
    </div>
  )
}