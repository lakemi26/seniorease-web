'use client'

import { Button } from '@/presentation/components/ui/Button'
import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'

interface ActivityDeleteConfirmationProps {
  activityTitle: string
  onConfirm: () => void
  onBack: () => void
  isDeleting: boolean
}

export function ActivityDeleteConfirmation({ activityTitle, onConfirm, onBack, isDeleting }: ActivityDeleteConfirmationProps) {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <div className="w-16 h-16 rounded-full bg-danger-light flex items-center justify-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-danger"
          aria-hidden="true"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-text">Excluir atividade?</h2>
        <p className="text-sm text-text-muted">
          A atividade &quot;{activityTitle}&quot; será removida. Esta ação não poderá ser desfeita.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Button variant="outline" onClick={onBack} autoFocus>
          Voltar aos detalhes
        </Button>
        <LoadingButton
          variant="primary"
          onClick={onConfirm}
          disabled={isDeleting}
          loading={isDeleting}
          loadingText="Excluindo..."
          className="bg-danger text-white hover:bg-red-700 focus-visible:bg-red-700 disabled:opacity-50"
        >
          Sim, excluir
        </LoadingButton>
      </div>
    </div>
  )
}
