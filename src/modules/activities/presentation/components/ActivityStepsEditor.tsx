'use client'

import { useCallback } from 'react'
import type { UseFormRegister } from 'react-hook-form'
import { Button } from '@/presentation/components/ui/Button'
import { ActivityStepField } from './ActivityStepField'
import type { ActivityFormData } from '../schemas/activity.schema'

type Field = { id: string; _key: string; title: string }

interface ActivityStepsEditorProps {
  fields: Field[]
  append: (value: { _key: string; title: string }) => void
  remove: (index: number) => void
  move: (from: number, to: number) => void
  register: UseFormRegister<ActivityFormData>
  error?: string
}

export function ActivityStepsEditor({
  fields,
  append,
  remove,
  move,
  register,
  error,
}: ActivityStepsEditorProps) {
  const handleAdd = useCallback(() => {
    const key = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
    append({ _key: key, title: '' })
  }, [append])

  const handleRemove = useCallback(
    (index: number) => {
      remove(index)
    },
    [remove]
  )

  const handleMoveUp = useCallback(
    (index: number) => {
      if (index <= 0) return
      move(index, index - 1)
    },
    [move]
  )

  const handleMoveDown = useCallback(
    (index: number) => {
      if (index >= fields.length - 1) return
      move(index, index + 1)
    },
    [move, fields.length]
  )

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="text-sm font-medium text-text">
        Etapas da atividade
      </legend>

      <p className="text-xs text-text-muted">
        Divida a atividade em passos menores para acompanhar com mais facilidade.
      </p>

      {fields.length === 0 && (
        <p className="text-sm text-text-muted italic">
          Nenhuma etapa adicionada.
        </p>
      )}

      <div className="space-y-2">
        {fields.map((field, index) => (
          <ActivityStepField
            key={field.id}
            index={index}
            total={fields.length}
            registration={register(`steps.${index}.title`)}
            onRemove={() => handleRemove(index)}
            onMoveUp={() => handleMoveUp(index)}
            onMoveDown={() => handleMoveDown(index)}
          />
        ))}
      </div>

      {fields.length < 20 && (
        <Button
          type="button"
          variant="outline"
          size="normal"
          onClick={handleAdd}
          className="self-start"
        >
          + Adicionar etapa
        </Button>
      )}

      {error && (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </fieldset>
  )
}
