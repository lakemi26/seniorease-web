'use client'

import { useId } from 'react'
import { cn } from '@/shared/utils/cn'
import { CATEGORY_OPTIONS } from '../utils/activity.utils'
import type { ActivityCategory } from '../../domain/entities'

interface CategorySelectProps {
  value: ActivityCategory | undefined
  onChange: (value: ActivityCategory) => void
  error?: string
}

export function CategorySelect({ value, onChange, error }: CategorySelectProps) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`

  return (
    <fieldset
      className="flex flex-col gap-1.5"
      aria-invalid={!!error || undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="text-sm font-medium text-text">
        Categoria <span aria-hidden="true">*</span>
      </legend>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {CATEGORY_OPTIONS.map((option) => {
          const selected = value === option.value
          return (
            <label
              key={option.value}
              className={cn(
                'flex items-center gap-2 px-3 py-2.5 rounded-md border-2 cursor-pointer transition-all duration-normal text-sm',
                'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus',
                selected
                  ? 'border-primary bg-primary-lighter text-text'
                  : 'border-border bg-surface text-text-secondary hover:border-primary'
              )}
            >
              <input
                type="radio"
                name="category"
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span className="text-sm font-medium">{option.label}</span>
            </label>
          )
        })}
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-danger mt-0.5">
          {error}
        </p>
      )}
    </fieldset>
  )
}
