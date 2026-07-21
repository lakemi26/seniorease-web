'use client'

import { useId } from 'react'
import { cn } from '@/shared/utils/cn'
import type { ActivityPriority } from '../../domain/entities'

interface PrioritySelectorProps {
  value: ActivityPriority
  onChange: (value: ActivityPriority) => void
  error?: string
}

const options: { value: ActivityPriority; label: string; description: string }[] = [
  { value: 'low', label: 'Baixa', description: 'Sem prazo definido' },
  { value: 'medium', label: 'Normal', description: 'Prazo esta semana' },
  { value: 'high', label: 'Alta', description: 'Prazo urgente' },
]

export function PrioritySelector({ value, onChange, error }: PrioritySelectorProps) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`

  return (
    <fieldset
      className="flex flex-col gap-1.5"
      aria-invalid={!!error || undefined}
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="text-sm font-medium text-text">
        Prioridade <span aria-hidden="true">*</span>
      </legend>

      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const selected = value === option.value
          return (
            <label
              key={option.value}
              className={cn(
                'flex flex-col gap-1 p-3 rounded-md border-2 cursor-pointer transition-all duration-normal',
                'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus',
                selected
                  ? 'border-primary bg-primary-lighter'
                  : 'border-border bg-surface hover:border-primary'
              )}
            >
              <div className="flex items-start gap-2">
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                  checked={selected}
                  onChange={() => onChange(option.value)}
                  className="mt-1 w-4 h-4 text-primary border-border cursor-pointer"
                />
                <div>
                  <span className="text-sm font-medium text-text">{option.label}</span>
                  <p className="text-xs text-text-muted">{option.description}</p>
                </div>
              </div>
            </label>
          )
        })}
      </div>

      {error && (
        <p id={errorId} role="alert" className="text-xs text-danger mt-0.5">
          {error}
        </p>
      )}
    </fieldset>
  )
}
