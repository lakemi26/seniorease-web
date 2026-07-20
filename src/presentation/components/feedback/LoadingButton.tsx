'use client'

import { Button } from '@/presentation/components/ui/Button'
import type { ButtonProps } from '@/presentation/components/ui/Button'

interface LoadingButtonProps extends ButtonProps {
  loadingText?: string
}

export function LoadingButton({
  loading = false,
  loadingText,
  disabled,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      loading={loading}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && loadingText ? loadingText : children}
    </Button>
  )
}
