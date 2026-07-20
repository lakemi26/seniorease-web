import type { ReactNode } from 'react'
import { Card } from './Card'
import { cn } from '@/shared/utils/cn'

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <Card
      as="article"
      variant="default"
      padding="normal"
      className={cn('flex flex-col gap-4', className)}
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-light text-primary shrink-0"
        aria-hidden="true"
      >
        {icon}
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
