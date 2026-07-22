'use client'

import { cn } from '@/shared/utils/cn'
import type { HelpArticleStep } from '../../data/help-content'

interface HelpArticleStepsProps {
  steps: HelpArticleStep[]
  className?: string
}

export function HelpArticleSteps({ steps, className }: HelpArticleStepsProps) {
  if (!steps || steps.length === 0) return null

  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-base font-semibold text-text">Passo a passo</h3>
      <ol className="space-y-4 list-none" role="list">
        {steps.map((step, index) => (
          <li key={step.id} className="flex gap-4">
            <span
              className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mt-0.5"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div className="flex-1 min-w-0 pt-1">
              <p className="text-sm font-semibold text-text">{step.title}</p>
              <p className="text-sm text-text-secondary mt-1 leading-relaxed">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
