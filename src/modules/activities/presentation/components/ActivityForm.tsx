'use client'

import { useRef } from 'react'
import { useCreateActivity } from '../hooks/useCreateActivity'
import { FormField } from '@/presentation/components/forms/FormField'
import { LoadingButton } from '@/presentation/components/feedback/LoadingButton'
import { AccessibleAlert } from '@/presentation/components/feedback/AccessibleAlert'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import { CategorySelect } from './CategorySelect'
import { PrioritySelector } from './PrioritySelector'
import { ActivityStepsEditor } from './ActivityStepsEditor'
import { ReminderSettings } from './ReminderSettings'
import { formatCharacterCount } from '../utils/activity.utils'
import Link from 'next/link'
interface ActivityFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export function ActivityForm({ onSuccess, onCancel }: ActivityFormProps) {
  const {
    register,
    handleSubmit,
    errors,
    apiError,
    isSubmitting,
    isSuccess,
    setApiError,
    setValue,
    hasTime,
    reminderOption,
    descriptionValue,
    stepsArray,
    form,
  } = useCreateActivity(onSuccess)

  const formRef = useRef<HTMLFormElement>(null)

  if (isSuccess) {
    return null
  }

  return (
    <>
      <LiveRegion message={apiError || Object.values(errors).map((e) => e.message || '').join('. ')} priority="assertive" />

      {apiError && (
        <AccessibleAlert
          variant="error"
          message={apiError}
          onClose={() => setApiError('')}
          className="mb-6"
        />
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-8"
      >
        <FormField
          label="Título da atividade"
          error={errors.title?.message}
          required
        >
          <input
            {...register('title')}
            type="text"
            id="title"
            placeholder="Exemplo: Consulta médica"
            autoComplete="off"
            disabled={isSubmitting}
            aria-invalid={!!errors.title || undefined}
            aria-describedby={errors.title ? 'title-error' : undefined}
            className="w-full px-4 py-2.5 rounded-md border bg-surface text-text text-base min-h-[2.75rem] transition-colors duration-normal placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50 disabled:cursor-not-allowed border-border hover:border-primary"
          />
        </FormField>

        <FormField
          label="Descrição"
          error={errors.description?.message}
          description="Adicione informações que ajudem você a lembrar dos detalhes."
        >
          <textarea
            {...register('description')}
            id="description"
            rows={3}
            maxLength={500}
            placeholder="Adicione informações que ajudem você a lembrar dos detalhes."
            disabled={isSubmitting}
            aria-invalid={!!errors.description || undefined}
            className="w-full px-4 py-2.5 rounded-md border bg-surface text-text text-base min-h-[5rem] transition-colors duration-normal placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50 disabled:cursor-not-allowed border-border hover:border-primary resize-vertical"
          />
          <p className="text-xs text-text-muted mt-1" aria-live="polite">
            {formatCharacterCount(descriptionValue.length, 500)}
          </p>
        </FormField>

        <CategorySelect
          value={form.watch('category') as import('../../domain/entities').ActivityCategory | undefined}
          onChange={(value) => setValue('category', value, { shouldValidate: true })}
          error={errors.category?.message}
        />

        <fieldset className="flex flex-col gap-1.5">
          <legend className="text-sm font-medium text-text">
            Data e horário <span aria-hidden="true">*</span>
          </legend>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <label htmlFor="date" className="sr-only">Data</label>
              <input
                {...register('date')}
                type="date"
                id="date"
                disabled={isSubmitting}
                aria-invalid={!!errors.date || undefined}
                className="w-full px-4 py-2.5 rounded-md border bg-surface text-text text-base min-h-[2.75rem] transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50 disabled:cursor-not-allowed border-border hover:border-primary"
              />
              {errors.date && (
                <p role="alert" className="text-xs text-danger mt-0.5">{errors.date.message}</p>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label htmlFor="time" className="sr-only">Horário</label>
                  <input
                    {...register('time')}
                    type="time"
                    id="time"
                    disabled={isSubmitting || !hasTime}
                    aria-invalid={!!errors.time || undefined}
                    className="w-full px-4 py-2.5 rounded-md border bg-surface text-text text-base min-h-[2.75rem] transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus disabled:opacity-50 disabled:cursor-not-allowed border-border hover:border-primary"
                  />
                </div>
              </div>
              {errors.time && (
                <p role="alert" className="text-xs text-danger mt-0.5">{errors.time.message}</p>
              )}
            </div>
          </div>

          <label className="flex items-center gap-2 mt-1 cursor-pointer">
            <input
              type="checkbox"
              {...register('hasTime')}
              onChange={(e) => {
                setValue('hasTime', e.target.checked, { shouldValidate: true })
                if (!e.target.checked) {
                  setValue('time', '')
                }
              }}
              className="w-4 h-4 text-primary border-border rounded cursor-pointer"
            />
            <span className="text-sm text-text-muted">Esta atividade não possui horário definido.</span>
          </label>

          {errors.confirmPastDate && (
            <label className="flex items-center gap-2 mt-1 cursor-pointer">
              <input
                type="checkbox"
                {...register('confirmPastDate')}
                className="w-4 h-4 text-primary border-border rounded cursor-pointer"
              />
              <span className="text-sm text-danger">{errors.confirmPastDate.message}</span>
            </label>
          )}
        </fieldset>

        <PrioritySelector
          value={form.watch('priority')}
          onChange={(value) => setValue('priority', value, { shouldValidate: true })}
          error={errors.priority?.message}
        />

        <ActivityStepsEditor
          fields={stepsArray.fields as { id: string; _key: string; title: string }[]}
          append={stepsArray.append}
          remove={(index: number) => stepsArray.remove(index)}
          move={stepsArray.move}
          register={register}
          error={errors.steps?.message}
        />

        <ReminderSettings
          value={reminderOption}
          onChange={(value) => setValue('reminderOption', value as never, { shouldValidate: true })}
          hasTime={hasTime}
          reminderDate={form.watch('reminderDate') ?? ''}
          reminderTime={form.watch('reminderTime') ?? ''}
          onReminderDateChange={(value) => setValue('reminderDate', value, { shouldValidate: true })}
          onReminderTimeChange={(value) => setValue('reminderTime', value, { shouldValidate: true })}
          error={errors.reminderOption?.message}
          dateError={errors.reminderDate?.message}
          timeError={errors.reminderTime?.message}
        />

        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-border">
          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md border-2 border-border text-text hover:bg-primary-light transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus min-h-[2.75rem]"
            >
              Cancelar
            </button>
          ) : (
            <Link
              href="/atividades"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-md border-2 border-border text-text hover:bg-primary-light transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus min-h-[2.75rem]"
            >
              Cancelar
            </Link>
          )}
          <LoadingButton
            type="submit"
            variant="primary"
            size="large"
            loading={isSubmitting}
            loadingText="Salvando..."
          >
            Salvar atividade
          </LoadingButton>
        </div>
      </form>
    </>
  )
}
