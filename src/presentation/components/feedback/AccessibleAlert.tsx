'use client'

import { cn } from '@/shared/utils/cn'
import { AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react'

type AlertVariant = 'error' | 'success' | 'info' | 'warning'

interface AccessibleAlertProps {
  variant?: AlertVariant
  message: string
  className?: string
  onClose?: () => void
}

const variantStyles: Record<AlertVariant, string> = {
  error: 'bg-danger-light border-danger text-danger',
  success: 'bg-secondary-light border-secondary text-success',
  info: 'bg-primary-lighter border-primary text-primary-dark',
  warning: 'bg-accent-light border-accent text-warning',
}

const icons: Record<AlertVariant, React.ReactNode> = {
  error: <AlertCircle aria-hidden="true" className="w-5 h-5 shrink-0" />,
  success: <CheckCircle aria-hidden="true" className="w-5 h-5 shrink-0" />,
  info: <Info aria-hidden="true" className="w-5 h-5 shrink-0" />,
  warning: <AlertTriangle aria-hidden="true" className="w-5 h-5 shrink-0" />,
}

export function AccessibleAlert({
  variant = 'info',
  message,
  className,
  onClose,
}: AccessibleAlertProps) {
  if (!message) return null

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 p-4 rounded-md border',
        variantStyles[variant],
        className
      )}
    >
      {icons[variant]}
      <p className="text-sm flex-1">{message}</p>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar mensagem"
          className="shrink-0 p-1 rounded-sm hover:opacity-70 focus-visible:outline-2 focus-visible:outline-focus"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      )}
    </div>
  )
}
