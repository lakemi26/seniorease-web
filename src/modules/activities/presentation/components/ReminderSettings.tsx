'use client'

import { useId } from 'react'
import { cn } from '@/shared/utils/cn'

const reminderOptions = [
  { value: 'none', label: 'Sem lembrete' },
  { value: 'atTime', label: 'No horário da atividade' },
  { value: '15min', label: '15 minutos antes' },
  { value: '30min', label: '30 minutos antes' },
  { value: '1hour', label: '1 hora antes' },
  { value: '1day', label: '1 dia antes' },
  { value: 'custom', label: 'Escolher data e horário' },
] as const

interface ReminderSettingsProps {
  value: string | undefined
  onChange: (value: string) => void
  hasTime: boolean
  reminderDate: string
  reminderTime: string
  onReminderDateChange: (value: string) => void
  onReminderTimeChange: (value: string) => void
  error?: string
  dateError?: string
  timeError?: string
}

export function ReminderSettings({
  value,
  onChange,
  hasTime,
  reminderDate,
  reminderTime,
  onReminderDateChange,
  onReminderTimeChange,
  error,
  dateError,
  timeError,
}: ReminderSettingsProps) {
  const fieldId = useId()
  const errorId = `${fieldId}-error`

  return (
    <fieldset
      className="flex flex-col gap-3"
      aria-invalid={!!error || undefined}
      aria-describedby={error || dateError || timeError ? errorId : undefined}
    >
      <legend className="text-sm font-medium text-text">Lembrete</legend>

      <p className="text-xs text-text-muted">
        Escolha quando deseja receber um aviso dentro do SeniorEase.
      </p>

      <div className="flex flex-col gap-2">
        {reminderOptions.map((option) => {
          const disabled = !hasTime && option.value !== 'none' && option.value !== 'custom'
          const selected = value === option.value
          return (
            <label
              key={option.value}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md border-2 cursor-pointer transition-all duration-normal',
                'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus',
                disabled && 'opacity-40 cursor-not-allowed',
                selected && !disabled
                  ? 'border-primary bg-primary-lighter'
                  : 'border-border bg-surface hover:border-primary'
              )}
            >
              <input
                type="radio"
                name="reminderOption"
                value={option.value}
                checked={selected}
                disabled={disabled}
                onChange={() => !disabled && onChange(option.value)}
                className="w-4 h-4 text-primary border-border cursor-pointer disabled:cursor-not-allowed"
              />
              <span className="text-sm font-medium text-text">{option.label}</span>
            </label>
          )
        })}
      </div>

      {value === 'custom' && (
        <div className="flex flex-col sm:flex-row gap-3 pl-2 border-l-2 border-primary">
          <div className="flex-1">
            <label htmlFor="reminder-date" className="block text-xs font-medium text-text mb-1">
              Data do lembrete
            </label>
            <input
              id="reminder-date"
              type="date"
              value={reminderDate}
              onChange={(e) => onReminderDateChange(e.target.value)}
              aria-invalid={!!dateError || undefined}
              className="w-full px-3 py-2 rounded-md border bg-surface text-text text-sm border-border hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            />
            {dateError && (
              <p role="alert" className="text-xs text-danger mt-0.5">
                {dateError}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label htmlFor="reminder-time" className="block text-xs font-medium text-text mb-1">
              Horário do lembrete
            </label>
            <input
              id="reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => onReminderTimeChange(e.target.value)}
              aria-invalid={!!timeError || undefined}
              className="w-full px-3 py-2 rounded-md border bg-surface text-text text-sm border-border hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            />
            {timeError && (
              <p role="alert" className="text-xs text-danger mt-0.5">
                {timeError}
              </p>
            )}
          </div>
        </div>
      )}

      {(error || dateError || timeError) && (
        <p id={errorId} role="alert" className="text-xs text-danger">
          {error || dateError || timeError}
        </p>
      )}
    </fieldset>
  )
}
