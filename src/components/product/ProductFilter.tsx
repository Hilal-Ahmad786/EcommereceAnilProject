// src/components/product/ProductFilter.tsx

'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

export interface FilterState {
  categories: string[]
  priceRange: { min: number; max: number }
  sortBy: string
  inStock: boolean
}

interface CategoryOption {
  id: string
  name: string
}

interface FilterProps {
  /** Optional, called when filters change */
  onFilterChange?: (filters: FilterState) => void
  /** Optional initial values coming from URL/search params */
  value?: Partial<FilterState>
  /** Optional categories coming from DB */
  categories?: CategoryOption[]
}

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  priceRange: { min: 0, max: 100000 },
  sortBy: 'newest',
  inStock: false,
}

const FALLBACK_CATEGORIES: CategoryOption[] = [
  { id: 'mutfak-dolabi', name: 'Mutfak Dolabı' },
  { id: 'mutfak-adasi', name: 'Mutfak Adası' },
  { id: 'tezgah', name: 'Tezgah' },
  { id: 'bar-sandalyesi', name: 'Bar Sandalyesi' },
  { id: 'mutfak-masasi', name: 'Mutfak Masası' },
]

export default function ProductFilter({ onFilterChange, value, categories }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const initialFilters = useMemo<FilterState>(
    () => ({
      ...DEFAULT_FILTERS,
      ...value,
      priceRange: {
        ...DEFAULT_FILTERS.priceRange,
        ...(value?.priceRange ?? {}),
      },
    }),
    [value]
  )

  const [filters, setFilters] = useState<FilterState>(initialFilters)

  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  const notify = useCallback(
    (next: FilterState) => {
      try {
        onFilterChange?.(next)
      } catch (e) {
        console.error('ProductFilter onFilterChange error:', e)
      }
    },
    [onFilterChange]
  )

  const categoryOptions = categories && categories.length > 0 ? categories : FALLBACK_CATEGORIES

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((c) => c !== categoryId)
      : [...filters.categories, categoryId]

    const next = { ...filters, categories: newCategories }
    setFilters(next)
    notify(next)
  }

  const handleSortChange = (sortBy: string) => {
    const next = { ...filters, sortBy }
    setFilters(next)
    notify(next)
  }

  const handleStockToggle = () => {
    const next = { ...filters, inStock: !filters.inStock }
    setFilters(next)
    notify(next)
  }

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS)
    notify(DEFAULT_FILTERS)
  }

  const activeFilterCount = filters.categories.length + (filters.inStock ? 1 : 0)

  return (
    <div className="mb-6">
      {/* Mobile Filter Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-white border rounded-lg mb-4"
        aria-expanded={isOpen}
        aria-controls="filters-panel"
      >
        <span className="font-semibold">
          Filtreler {activeFilterCount > 0 && `(${activeFilterCount})`}
        </span>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Filter Panel */}
      <div
        id="filters-panel"
        className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white border rounded-lg p-6 space-y-6`}
      >
        {/* Sort By */}
        <div>
          <h3 className="font-semibold mb-3">Sıralama</h3>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            <option value="newest">En Yeni</option>
            <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="name-asc">İsim: A-Z</option>
            <option value="name-desc">İsim: Z-A</option>
          </select>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">Kategoriler</h3>
          <div className="space-y-2">
            {categoryOptions.map((category) => (
              <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                  className="rounded border-gray-300 text-walnut-500 focus:ring-walnut-500"
                />
                <span className="text-sm">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Stock Filter */}
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={handleStockToggle}
              className="rounded border-gray-300 text-walnut-500 focus:ring-walnut-500"
            />
            <span className="text-sm font-medium">Sadece Stokta Olanlar</span>
          </label>
        </div>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearFilters}
            className="w-full flex items-center justify-center gap-2 p-2 text-sm text-walnut-600 hover:text-walnut-700 font-medium"
          >
            <X className="h-4 w-4" />
            Filtreleri Temizle
          </button>
        )}
      </div>
    </div>
  )
}
