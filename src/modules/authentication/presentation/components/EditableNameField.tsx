'use client'

import { useRef, useEffect } from 'react'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ProfileFormData } from '@/modules/authentication/presentation/schemas/profile.schema'
import { FormField } from '@/presentation/components/forms/FormField'
import { Button } from '@/presentation/components/ui/Button'
import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import { Pencil } from 'lucide-react'

interface EditableNameFieldProps {
  isEditing: boolean
  isSaving: boolean
  nameError: string | null
  nameSuccess: string | null
  currentName: string
  onStartEditing: () => void
  onCancel: () => void
  register: UseFormRegister<ProfileFormData>
  errors: FieldErrors<ProfileFormData>
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

export function EditableNameField({
  isEditing,
  isSaving,
  nameError,
  nameSuccess,
  currentName,
  onStartEditing,
  onCancel,
  register,
  errors,
  onSubmit,
}: EditableNameFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { ref, ...registerRest } = register('name')

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  if (isEditing) {
    return (
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
        <FormField
          label="Nome"
          error={errors.name?.message}
          required
          description="Entre 2 e 80 caracteres."
        >
          <input
            type="text"
            {...registerRest}
            ref={(e) => {
              ref(e)
              inputRef.current = e
            }}
            maxLength={80}
            aria-invalid={errors.name ? 'true' : undefined}
            className="w-full px-4 py-2.5 text-sm rounded-md border border-border bg-surface text-text placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50"
            disabled={isSaving}
          />
        </FormField>

        {nameError && (
          <AccessibleAlert variant="error" message={nameError} />
        )}

        {nameSuccess && (
          <>
            <AccessibleAlert variant="success" message={nameSuccess} />
            <LiveRegion message={nameSuccess} />
          </>
        )}

        <div className="flex gap-3">
          <LoadingButton
            type="submit"
            variant="primary"
            size="normal"
            loading={isSaving}
            loadingText="Salvando..."
            disabled={isSaving || !currentName?.trim()}
          >
            Salvar alteração
          </LoadingButton>
          <Button
            type="button"
            variant="ghost"
            size="normal"
            onClick={onCancel}
            disabled={isSaving}
          >
            Cancelar
          </Button>
        </div>
      </form>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-text">Nome</label>
      <div className="flex items-center gap-3">
        <span className="text-base text-text">{currentName}</span>
        <button
          type="button"
          onClick={onStartEditing}
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
          aria-label="Editar nome"
        >
          <Pencil className="w-4 h-4" aria-hidden="true" />
          Editar
        </button>
      </div>
    </div>
  )
}
