'use client'

import { cn } from '@/shared/utils/cn'

interface PreferenceOptionCardProps {
  label: string
  selected: boolean
  onClick: () => void
  sampleText?: string
  className?: string
  sampleClassName?: string
}

export function PreferenceOptionCard({
  label,
  selected,
  onClick,
  sampleText,
  sampleClassName,
  className,
}: PreferenceOptionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-3 p-6 rounded-lg border-2 text-center w-full min-h-[7rem]',
        'transition-all duration-normal cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        selected
          ? 'border-primary bg-primary-lighter'
          : 'border-border bg-surface hover:border-primary hover:bg-primary-lighter',
        className
      )}
    >
      <span className="text-sm font-medium text-text">{label}</span>
      {sampleText && (
        <span className={cn('text-text-secondary', sampleClassName)}>
          {sampleText}
        </span>
      )}
    </button>
  )
}
