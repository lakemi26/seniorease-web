'use client'

import { Button } from '@/presentation/components/ui/Button'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'

interface ActivityExecutionErrorStateProps {
  message: string
  onRetry?: () => void
  onClose?: () => void
}

export function ActivityExecutionErrorState({ message, onRetry, onClose }: ActivityExecutionErrorStateProps) {
  return (
    <div className="flex flex-col gap-4">
      <AccessibleAlert variant="error" message={message} />
      <div className="flex gap-3 justify-end">
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            Tentar novamente
          </Button>
        )}
        {onClose && (
          <Button variant="primary" onClick={onClose}>
            Fechar
          </Button>
        )}
      </div>
    </div>
  )
}
