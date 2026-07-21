'use client'

import { cn } from '@/shared/utils/cn'

interface SwitchFieldProps {
  id: string
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export function SwitchField({
  id,
  label,
  description,
  checked,
  onChange,
  disabled = false,
}: SwitchFieldProps) {
  return (
    <div className="flex items-start gap-4 py-3">
      <div className="flex items-center h-6">
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={cn(
            'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-normal',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
            'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50',
            checked ? 'bg-primary' : 'bg-border',
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transform ring-0 transition duration-normal',
              checked ? 'translate-x-5' : 'translate-x-0',
            )}
          />
        </button>
      </div>
      <div className="flex flex-col gap-0.5">
        <label
          htmlFor={id}
          className={cn(
            'text-sm font-medium text-text cursor-pointer',
            disabled && 'cursor-not-allowed opacity-50',
          )}
        >
          {label}
        </label>
        {description && (
          <span className="text-xs text-text-muted">{description}</span>
        )}
      </div>
    </div>
  )
}
