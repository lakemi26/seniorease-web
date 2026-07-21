'use client'

import type { UserProfile } from '@/modules/authentication/domain/entities'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ProfileFormData } from '@/modules/authentication/presentation/schemas/profile.schema'
import { Card } from '@/presentation/components/ui/Card'
import { EditableNameField } from './EditableNameField'

interface PersonalInformationSectionProps {
  profile: UserProfile
  isEditing: boolean
  isSaving: boolean
  nameError: string | null
  nameSuccess: string | null
  currentName: string
  onStartEditing: () => void
  onCancelEditing: () => void
  register: UseFormRegister<ProfileFormData>
  errors: FieldErrors<ProfileFormData>
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function PersonalInformationSection({
  profile,
  isEditing,
  isSaving,
  nameError,
  nameSuccess,
  currentName,
  onStartEditing,
  onCancelEditing,
  register,
  errors,
  onSubmit,
}: PersonalInformationSectionProps) {
  return (
    <Card as="section" aria-label="Informações pessoais">
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-text">Informações pessoais</h2>

        <EditableNameField
          isEditing={isEditing}
          isSaving={isSaving}
          nameError={nameError}
          nameSuccess={nameSuccess}
          currentName={currentName}
          onStartEditing={onStartEditing}
          onCancel={onCancelEditing}
          register={register}
          errors={errors}
          onSubmit={onSubmit}
        />

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text">E-mail da conta</span>
          <span className="text-base text-text">{profile.email}</span>
          <p className="text-xs text-text-muted">O e-mail não pode ser alterado nesta versão.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-text">Conta criada em</span>
          <span className="text-base text-text">
            {formatDate(profile.createdAt)}
          </span>
        </div>
      </div>
    </Card>
  )
}
