import { Card } from './Card'
import { cn } from '@/shared/utils/cn'

interface StepCardProps {
  stepNumber: number
  title: string
  description: string
  className?: string
}

export function StepCard({ stepNumber, title, description, className }: StepCardProps) {
  return (
    <Card
      as="article"
      variant="default"
      padding="normal"
      className={cn('flex flex-col gap-4', className)}
    >
      <div
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg shrink-0"
        aria-hidden="true"
      >
        {stepNumber}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        <p className="text-base text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  )
}
