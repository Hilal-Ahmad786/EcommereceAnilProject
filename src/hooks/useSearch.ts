
// ============================================
// src/hooks/useSearch.ts
// ============================================
'use client'

import { useState, useCallback, useEffect } from 'react'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  
  const debouncedQuery = useDebounce(query, 300)

  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      searchProducts(debouncedQuery)
    } else {
      setResults([])
    }
  }, [debouncedQuery])

  const searchProducts = async (searchQuery: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/products?search=${searchQuery}&limit=5`)
      
      if (!response.ok) throw new Error('Search failed')
      
      const data = await response.json()
      setResults(data.data || [])
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = useCallback(() => {
    setQuery('')
    setResults([])
  }, [])

  return {
    query,
    setQuery,
    results,
    loading,
    clearSearch,
  }
}

// Helper hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
