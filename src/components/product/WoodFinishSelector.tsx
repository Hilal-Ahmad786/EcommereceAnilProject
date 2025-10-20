'use client'

import { Check } from 'lucide-react'

interface WoodFinish {
  id: string
  name: string
  hexColor: string
  priceModifier?: number
}

interface WoodFinishSelectorProps {
  finishes: WoodFinish[]
  selectedFinish: string
  onSelect: (finishId: string) => void
}

export default function WoodFinishSelector({
  finishes,
  selectedFinish,
  onSelect,
}: WoodFinishSelectorProps) {
  const formatPriceModifier = (modifier?: number) => {
    if (!modifier) return ''
    if (modifier > 0) return `+${modifier.toLocaleString('tr-TR')} ₺`
    return `${modifier.toLocaleString('tr-TR')} ₺`
  }

  return (
    <div>
      <label className="block text-sm font-semibold mb-3">
        Ahşap Rengi Seçin
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {finishes.map((finish) => {
          const isSelected = selectedFinish === finish.id

          return (
            <button
              key={finish.id}
              onClick={() => onSelect(finish.id)}
              className={`relative flex flex-col items-center p-4 border-2 rounded-lg transition-all hover:border-walnut-400 ${
                isSelected
                  ? 'border-walnut-500 bg-walnut-50'
                  : 'border-gray-200'
              }`}
            >
              {/* Color Circle */}
              <div
                className={`w-16 h-16 rounded-full mb-2 relative ${
                  isSelected ? 'ring-2 ring-walnut-500 ring-offset-2' : ''
                }`}
                style={{ backgroundColor: finish.hexColor }}
              >
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-full">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>

              {/* Name */}
              <span className="text-sm font-medium text-center">
                {finish.name}
              </span>

              {/* Price Modifier */}
              {finish.priceModifier && finish.priceModifier !== 0 && (
                <span className="text-xs text-muted-foreground mt-1">
                  {formatPriceModifier(finish.priceModifier)}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}