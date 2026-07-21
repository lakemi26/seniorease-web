'use client'

import { Card } from '@/presentation/components/ui/Card'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { ActivityStatusBadge } from '@/modules/activities/presentation/components/ActivityStatusBadge'
import type { Activity } from '@/modules/activities/domain/entities'

interface ContinueActivitySectionProps {
  activities: Activity[]
  maxItems?: number
  onContinue?: (id: string) => void
}

function nextStepTitle(steps: Activity['steps']): string {
  const next = steps.find((s) => !s.completed)
  return next?.title || ''
}

export function ContinueActivitySection({ activities, onContinue }: ContinueActivitySectionProps) {
  if (activities.length === 0) return null

  return (
    <section aria-labelledby="continue-heading">
      <SectionHeader
        title="Continue de onde parou"
        align="left"
        className="mb-3"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        {activities.map((activity) => {
          const totalSteps = activity.steps.length
          const doneSteps = activity.steps.filter((s) => s.completed).length
          const next = nextStepTitle(activity.steps)

          return (
            <Card key={activity.id} variant="outlined" padding="normal" className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-text">{activity.title}</p>
                <ActivityStatusBadge status={activity.status} />
              </div>

              {totalSteps > 0 && (
                <p className="text-xs text-text-muted">
                  Etapa {doneSteps + 1} de {totalSteps}
                </p>
              )}

              {next && (
                <p className="text-sm text-text-secondary">
                  Próxima etapa: {next}
                </p>
              )}

              <div
                role="progressbar"
                aria-valuenow={doneSteps}
                aria-valuemin={0}
                aria-valuemax={totalSteps}
                aria-label={`${doneSteps} de ${totalSteps} etapas concluídas`}
                className="w-full h-1.5 bg-border rounded-full overflow-hidden"
              >
                <div
                  className="h-full bg-primary rounded-full transition-all duration-normal"
                  style={{ width: totalSteps > 0 ? `${(doneSteps / totalSteps) * 100}%` : '0%' }}
                />
              </div>

              <button
                type="button"
                onClick={() => onContinue?.(activity.id)}
                className="self-start mt-1 text-sm font-medium text-primary hover:text-primary-dark underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
              >
                Continuar
              </button>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
