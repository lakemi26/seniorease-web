'use client'

import { useState, useCallback, useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/presentation/hooks/useAuth'
import { createFirebaseActivityRepository } from '@/modules/activities/infrastructure/repositories/firebase-activity.repository'
import { createActivityUseCases } from '@/modules/activities/application/use-cases'
import { activityFormSchema, type ActivityFormData } from '../schemas/activity.schema'
import type { ActivityCategory, ActivityPriority, Activity } from '../../domain/entities'

const repository = createFirebaseActivityRepository()
const activityUseCases = createActivityUseCases(repository)

const REMINDER_OFFSET_MAP: Record<number, 'atTime' | '15min' | '30min' | '1hour' | '1day'> = {
  0: 'atTime',
  15: '15min',
  30: '30min',
  60: '1hour',
  1440: '1day',
}

function getReminderFormValues(activity: Activity): {
  reminderOption: 'none' | 'atTime' | '15min' | '30min' | '1hour' | '1day' | 'custom'
  reminderDate: string
  reminderTime: string
} {
  if (!activity.reminder.enabled || !activity.reminder.remindAt) {
    return { reminderOption: 'none', reminderDate: '', reminderTime: '' }
  }

  const diffMin = Math.round(
    (activity.scheduledAt.getTime() - activity.reminder.remindAt.getTime()) / 60000,
  )

  if (diffMin >= 0) {
    const matched = REMINDER_OFFSET_MAP[diffMin]
    if (matched) {
      return { reminderOption: matched, reminderDate: '', reminderTime: '' }
    }
  }

  const year = activity.reminder.remindAt.getFullYear()
  const month = String(activity.reminder.remindAt.getMonth() + 1).padStart(2, '0')
  const day = String(activity.reminder.remindAt.getDate()).padStart(2, '0')
  const hours = String(activity.reminder.remindAt.getHours()).padStart(2, '0')
  const minutes = String(activity.reminder.remindAt.getMinutes()).padStart(2, '0')

  return {
    reminderOption: 'custom',
    reminderDate: `${year}-${month}-${day}`,
    reminderTime: `${hours}:${minutes}`,
  }
}

function activityToFormValues(activity: Activity): ActivityFormData {
  const year = activity.scheduledAt.getFullYear()
  const month = String(activity.scheduledAt.getMonth() + 1).padStart(2, '0')
  const day = String(activity.scheduledAt.getDate()).padStart(2, '0')
  const hours = String(activity.scheduledAt.getHours()).padStart(2, '0')
  const minutes = String(activity.scheduledAt.getMinutes()).padStart(2, '0')

  return {
    title: activity.title,
    description: activity.description ?? '',
    category: activity.category,
    date: `${year}-${month}-${day}`,
    hasTime: activity.hasTime,
    time: activity.hasTime ? `${hours}:${minutes}` : '',
    priority: activity.priority,
    steps: activity.steps.map((s) => ({
      _key: s.id,
      title: s.title,
    })),
    ...getReminderFormValues(activity),
    confirmPastDate: false,
  }
}

export interface UseActivityFormOptions {
  mode: 'create' | 'edit'
  initialValues?: Activity
  onSuccess?: () => void
}

export function useActivityForm({ mode, initialValues, onSuccess }: UseActivityFormOptions) {
  const { user } = useAuth()
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const defaultValues: ActivityFormData = mode === 'edit' && initialValues
    ? activityToFormValues(initialValues)
    : {
        title: '',
        description: '',
        category: undefined as unknown as ActivityCategory,
        date: '',
        hasTime: true,
        time: '',
        priority: 'medium' as ActivityPriority,
        steps: [],
        reminderOption: 'none' as const,
        reminderDate: '',
        reminderTime: '',
        confirmPastDate: false,
      }

  const form = useForm<ActivityFormData>({
    resolver: zodResolver(activityFormSchema),
    defaultValues,
  })

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors, isDirty },
  } = form

  const stepsArray = useFieldArray({
    control,
    name: 'steps',
  })

  const hasTime = watch('hasTime') ?? true
  const reminderOption = watch('reminderOption') ?? 'none'
  const dateValue = watch('date') ?? ''
  const timeValue = watch('time') ?? ''
  const descriptionValue = watch('description') ?? ''

  useEffect(() => {
    if (mode === 'edit' && initialValues) {
      reset(activityToFormValues(initialValues))
    }
  }, [mode, initialValues, reset])

  const addStep = useCallback(() => {
    const key = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
    stepsArray.append({ _key: key, title: '' })
  }, [stepsArray])

  const removeStep = useCallback(
    (index: number) => {
      stepsArray.remove(index)
    },
    [stepsArray]
  )

  const moveStepUp = useCallback(
    (index: number) => {
      if (index <= 0) return
      stepsArray.move(index, index - 1)
    },
    [stepsArray]
  )

  const moveStepDown = useCallback(
    (index: number) => {
      if (index >= stepsArray.fields.length - 1) return
      stepsArray.move(index, index + 1)
    },
    [stepsArray]
  )

  const onSubmit = useCallback(
    async (data: ActivityFormData) => {
      if (!user) {
        setApiError('Sua sessão terminou. Entre novamente para continuar.')
        return
      }

      setIsSubmitting(true)
      setApiError('')

      try {
        const scheduledDate = new Date(
          data.date + (data.hasTime && data.time ? `T${data.time}:00` : 'T00:00:00')
        )

        let remindAt: Date | null = null
        if (data.reminderOption !== 'none') {
          if (data.reminderOption === 'custom' && data.reminderDate && data.reminderTime) {
            remindAt = new Date(`${data.reminderDate}T${data.reminderTime}:00`)
          } else {
            const offsetMinutes: Record<string, number> = {
              atTime: 0,
              '15min': 15,
              '30min': 30,
              '1hour': 60,
              '1day': 1440,
            }
            const option = data.reminderOption ?? 'none'
            const offset = offsetMinutes[option] ?? 0
            remindAt = new Date(scheduledDate.getTime() - offset * 60 * 1000)
          }
        }

        const activityData = {
          userId: user.uid,
          title: data.title,
          description: data.description || null,
          category: data.category,
          scheduledAt: scheduledDate,
          hasTime: data.hasTime ?? true,
          priority: data.priority,
          steps: (data.steps || []).map((s, i) => ({
            id: s._key,
            title: s.title,
            order: i + 1,
          })),
          reminder: {
            enabled: data.reminderOption !== 'none',
            remindAt: remindAt,
            dismissedAt: null,
          },
        }

        if (mode === 'edit' && initialValues) {
          await activityUseCases.updateActivity(initialValues.id, activityData)
        } else {
          await activityUseCases.createActivity(activityData)
        }

        setIsSuccess(true)
        onSuccess?.()
      } catch (error) {
        const err = error as Error
        if (err.name === 'FirebaseError') {
          const code = (err as { code?: string }).code
          if (code === 'permission-denied') {
            setApiError('Não foi possível salvar esta atividade.')
          } else if (code === 'unavailable' || code === 'network-error') {
            setApiError('Não foi possível salvar a atividade. Verifique sua conexão e tente novamente.')
          } else {
            setApiError('Não foi possível salvar a atividade agora. Tente novamente em alguns instantes.')
          }
        } else {
          setApiError(err.message || 'Não foi possível salvar a atividade agora. Tente novamente em alguns instantes.')
        }
      } finally {
        setIsSubmitting(false)
      }
    },
    [user, mode, initialValues, onSuccess]
  )

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    control,
    errors,
    apiError,
    isSubmitting,
    isSuccess,
    isDirty,
    setApiError,
    setValue,
    watch,
    trigger,
    hasTime,
    reminderOption,
    dateValue,
    timeValue,
    descriptionValue,
    stepsArray,
    addStep,
    removeStep,
    moveStepUp,
    moveStepDown,
    form,
  }
}
