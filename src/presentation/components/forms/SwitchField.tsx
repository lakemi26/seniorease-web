'use client'

import { useId } from 'react'
import { cn } from '@/shared/utils/cn'

interface SwitchFieldProps {
  label: string
  description?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  name?: string
  disabled?: boolean
  className?: string
}

export function SwitchField({
  label,
  description,
  checked = false,
  onChange,
  disabled = false,
  className,
}: SwitchFieldProps) {
  const switchId = useId()
  const descriptionId = useId()

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={description ? descriptionId : undefined}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full',
          'transition-colors duration-normal cursor-pointer',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          checked ? 'bg-primary' : 'bg-border'
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 rounded-full bg-white shadow-sm',
            'transition-transform duration-normal',
            checked ? 'translate-x-[1.375rem]' : 'translate-x-0.5'
          )}
        />
      </button>
      <div>
        <label
          htmlFor={switchId}
          className={cn(
            'text-sm font-medium text-text cursor-pointer select-none',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="text-xs text-text-muted mt-0.5">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
