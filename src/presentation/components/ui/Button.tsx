import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'normal' | 'large'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: ReactNode
  children: ReactNode
  ariaLabel?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark focus-visible:bg-primary-dark disabled:opacity-50',
  secondary:
    'bg-secondary text-white hover:bg-green-600 focus-visible:bg-green-600 disabled:opacity-50',
  outline:
    'border-2 border-primary text-primary hover:bg-primary-light focus-visible:bg-primary-light disabled:opacity-50',
  ghost:
    'text-primary hover:bg-primary-light focus-visible:bg-primary-light disabled:opacity-50',
}

const sizeStyles: Record<ButtonSize, string> = {
  normal: 'px-5 py-2.5 text-sm min-h-[2.75rem]',
  large: 'px-7 py-3.5 text-base min-h-[3.25rem]',
}

export function Button({
  variant = 'primary',
  size = 'normal',
  loading = false,
  disabled = false,
  icon,
  children,
  ariaLabel,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus cursor-pointer disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span
          className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
          aria-hidden="true"
        />
      ) : icon ? (
        <span aria-hidden="true">{icon}</span>
      ) : null}
      {children}
    </button>
  )
}
