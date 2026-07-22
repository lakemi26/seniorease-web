'use client'

import { cn } from '@/shared/utils/cn'

interface HelpHeaderProps {
  className?: string
}

export function HelpHeader({ className }: HelpHeaderProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <h1 className="text-2xl font-bold text-text">Como podemos ajudar?</h1>
      <p className="text-base text-text-secondary">
        Encontre orientações para usar os recursos do SeniorEase.
      </p>
    </div>
  )
}
