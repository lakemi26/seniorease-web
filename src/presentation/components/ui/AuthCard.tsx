import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

interface AuthCardProps {
  children: ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg'
}

const maxWidthStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
}

export function AuthCard({ children, className, maxWidth = 'md' }: AuthCardProps) {
  return (
    <div
      className={cn(
        'w-full bg-surface rounded-lg border border-border shadow-card p-8',
        maxWidthStyles[maxWidth],
        className
      )}
    >
      {children}
    </div>
  )
}
