import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type SectionBgColor = 'default' | 'primary-light' | 'accent-light' | 'dark'

interface SectionProps {
  id?: string
  children: ReactNode
  className?: string
  bgColor?: SectionBgColor
  ariaLabel?: string
  as?: 'section' | 'div' | 'article'
}

const bgStyles: Record<SectionBgColor, string> = {
  default: 'bg-background',
  'primary-light': 'bg-primary-lighter',
  'accent-light': 'bg-accent-light',
  dark: 'bg-primary-dark text-white',
}

export function Section({
  id,
  children,
  className,
  bgColor = 'default',
  ariaLabel,
  as: Component = 'section',
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        'py-[var(--spacing-section-mobile)] md:py-[var(--spacing-section)]',
        bgStyles[bgColor],
        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  )
}
