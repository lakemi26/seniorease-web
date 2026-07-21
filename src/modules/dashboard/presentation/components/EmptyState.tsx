'use client'

import { Button } from '@/presentation/components/ui/Button'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center" role="status">
      <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary" />
          <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2" className="text-primary" />
        </svg>
      </div>
      <p className="text-base font-semibold text-text mb-1">{title}</p>
      <p className="text-sm text-text-muted max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="normal" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
