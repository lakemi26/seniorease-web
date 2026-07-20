import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type CardVariant = 'default' | 'elevated' | 'outlined'
type CardPadding = 'normal' | 'compact' | 'none'

interface CardProps {
  variant?: CardVariant
  padding?: CardPadding
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'section'
  ariaLabel?: string
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-surface shadow-card',
  elevated: 'bg-surface shadow-elevated',
  outlined: 'bg-surface border border-border',
}

const paddingStyles: Record<CardPadding, string> = {
  normal: 'p-6',
  compact: 'p-4',
  none: 'p-0',
}

export function Card({
  variant = 'default',
  padding = 'normal',
  children,
  className,
  as: Component = 'div',
  ariaLabel,
}: CardProps) {
  return (
    <Component
      className={cn(
        'rounded-lg',
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  )
}
