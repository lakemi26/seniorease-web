'use client'

import { useId } from 'react'
import { cn } from '@/shared/utils/cn'

interface FormFieldProps {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
  description?: string
  required?: boolean
}

export function FormField({
  label,
  error,
  children,
  className,
  description,
  required = false,
}: FormFieldProps) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`
  const descriptionId = `${fieldId}-description`

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={fieldId}
        className="text-sm font-medium text-text"
      >
        {label}
        {required && (
          <span className="ml-1 text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {description && (
        <p id={descriptionId} className="text-xs text-text-muted">
          {description}
        </p>
      )}
      <div id={fieldId}>
        {children}
      </div>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-danger mt-0.5"
        >
          {error}
        </p>
      )}
    </div>
  )
}
