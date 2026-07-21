'use client'

import type { ChangeEvent, FocusEvent, Ref } from 'react'
import { IconButton } from '@/presentation/components/ui/IconButton'
import { FormField } from '@/presentation/components/forms/FormField'

interface ActivityStepFieldProps {
  index: number
  total: number
  registration: {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onBlur: (event: FocusEvent<HTMLInputElement>) => void
    ref: Ref<HTMLInputElement>
    name: string
  }
  onRemove: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

export function ActivityStepField({
  index,
  total,
  registration,
  onRemove,
  onMoveUp,
  onMoveDown,
}: ActivityStepFieldProps) {
  const number = index + 1

  return (
    <div className="flex items-start gap-2">
      <span className="text-sm font-medium text-text-muted pt-2.5 min-w-[4.5rem]">
        Etapa {number}
      </span>

      <div className="flex-1">
        <FormField label="" error={undefined}>
          <input
            type="text"
            {...registration}
            placeholder={`Passo ${number}`}
            aria-label={`Etapa ${number}`}
            className="w-full px-3 py-2 rounded-md border bg-surface text-text text-sm border-border hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          />
        </FormField>
      </div>

      <div className="flex gap-1 pt-1">
        <IconButton
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          ariaLabel={`Mover etapa ${number} para cima`}
          disabled={index === 0}
          onClick={onMoveUp}
          size="normal"
        />
        <IconButton
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          ariaLabel={`Mover etapa ${number} para baixo`}
          disabled={index === total - 1}
          onClick={onMoveDown}
          size="normal"
        />
        <IconButton
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
          ariaLabel={`Remover etapa ${number}`}
          onClick={onRemove}
          size="normal"
        />
      </div>
    </div>
  )
}
