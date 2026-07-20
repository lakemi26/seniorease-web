'use client'

import { useId } from 'react'
import { cn } from '@/shared/utils/cn'

interface CheckboxFieldProps {
  label: string
  description?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  name?: string
  disabled?: boolean
  className?: string
}

export function CheckboxField({
  label,
  description,
  checked = false,
  onChange,
  name,
  disabled = false,
  className,
}: CheckboxFieldProps) {
  const checkboxId = useId()
  const descriptionId = useId()

  return (
    <div className={cn('flex items-start gap-3', className)}>
      <input
        id={checkboxId}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        className={cn(
          'w-5 h-5 rounded border-border bg-surface text-primary',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'cursor-pointer shrink-0'
        )}
        aria-describedby={description ? descriptionId : undefined}
      />
      <div>
        <label
          htmlFor={checkboxId}
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
