'use client'

import { useState, forwardRef, useId } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

interface PasswordFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  name?: string
  placeholder?: string
  disabled?: boolean
  hasError?: boolean
  errorId?: string
  autoComplete?: string
  className?: string
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField(
    {
      value,
      onChange,
      onBlur,
      name,
      placeholder,
      disabled = false,
      hasError = false,
      errorId,
      autoComplete = 'current-password',
      className,
    },
    ref
  ) {
    const [visible, setVisible] = useState(false)
    const buttonId = useId()

    return (
      <div className="relative">
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={cn(
            'w-full px-4 py-2.5 pr-12 rounded-md border bg-surface text-text text-base min-h-[2.75rem]',
            'transition-colors duration-normal',
            'placeholder:text-text-muted',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            hasError
              ? 'border-danger focus-visible:outline-danger'
              : 'border-border hover:border-primary',
            className
          )}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
        />
        <button
          id={buttonId}
          type="button"
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          aria-pressed={visible}
          onClick={() => setVisible(!visible)}
          className={cn(
            'absolute right-1 top-1/2 -translate-y-1/2',
            'flex items-center justify-center w-11 h-11 rounded-md',
            'text-text-muted hover:text-text hover:bg-primary-light',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
            'transition-colors duration-normal cursor-pointer',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          disabled={disabled}
          tabIndex={-1}
        >
          {visible ? (
            <EyeOff aria-hidden="true" className="w-5 h-5" />
          ) : (
            <Eye aria-hidden="true" className="w-5 h-5" />
          )}
        </button>
      </div>
    )
  }
)
