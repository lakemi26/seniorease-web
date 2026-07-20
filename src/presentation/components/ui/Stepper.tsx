import { cn } from '@/shared/utils/cn'
import { Check } from 'lucide-react'

interface Step {
  id: number
  label: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <nav aria-label="Progresso do primeiro acesso" className={cn('w-full', className)}>
      <ol className="flex items-center gap-1">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id

          return (
            <li key={step.id} className="flex items-center flex-1">
              <div className="flex items-center w-full">
                <div
                  className={cn(
                    'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium shrink-0',
                    'transition-colors duration-normal',
                    isCompleted && 'bg-primary text-white',
                    isCurrent && 'bg-primary text-white ring-2 ring-offset-2 ring-primary',
                    !isCompleted && !isCurrent && 'bg-primary-lighter text-text-muted'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'ml-2 text-xs font-medium hidden sm:inline',
                    isCurrent && 'text-primary',
                    isCompleted && 'text-text',
                    !isCompleted && !isCurrent && 'text-text-muted'
                  )}
                >
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-2',
                      'transition-colors duration-normal',
                      isCompleted ? 'bg-primary' : 'bg-border'
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
