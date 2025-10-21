
// ============================================
// src/components/common/Section.tsx
// ============================================
import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  background?: 'white' | 'natural' | 'transparent'
}

export default function Section({ 
  children, 
  className,
  background = 'transparent' 
}: SectionProps) {
  return (
    <section
      className={cn(
        'py-12 md:py-16',
        {
          'bg-white': background === 'white',
          'bg-natural-100': background === 'natural',
        },
        className
      )}
    >
      {children}
    </section>
  )
}