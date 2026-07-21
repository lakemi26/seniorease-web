'use client'

import { Button } from '@/presentation/components/ui/Button'

interface PreferencesActionsProps {
  hasUnsavedChanges: boolean
  isSaving: boolean
  onSave: () => void
  onCancel: () => void
  onReset: () => void
}

export function PreferencesActions({
  hasUnsavedChanges,
  isSaving,
  onSave,
  onCancel,
  onReset,
}: PreferencesActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2 border-t border-border">
      <div>
        <button
          type="button"
          onClick={onReset}
          className="text-sm text-text-muted hover:text-text underline underline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
        >
          Restaurar configurações padrão
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        {hasUnsavedChanges && (
          <Button variant="outline" size="normal" onClick={onCancel}>
            Cancelar alterações
          </Button>
        )}
        <Button
          variant="primary"
          size="normal"
          loading={isSaving}
          disabled={!hasUnsavedChanges && !isSaving}
          onClick={onSave}
        >
          {isSaving ? 'Salvando...' : 'Salvar preferências'}
        </Button>
      </div>
    </div>
  )
}
