'use client'

import { Compass, User, ListTodo, Calendar, SlidersHorizontal, Shield, type LucideIcon } from 'lucide-react'
import { Card } from '@/presentation/components/ui/Card'
import { Badge } from '@/presentation/components/ui/Badge'
import { cn } from '@/shared/utils/cn'
import type { HelpCategory } from '../../data/help-content'

const iconMap: Record<string, LucideIcon> = {
  Compass,
  User,
  ListTodo,
  Calendar,
  SlidersHorizontal,
  Shield,
}

interface HelpCategoryCardProps {
  category: HelpCategory
  articleCount: number
  onClick: () => void
  className?: string
}

export function HelpCategoryCard({ category, articleCount, onClick, className }: HelpCategoryCardProps) {
  const Icon = iconMap[category.icon] || Compass

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full h-full text-left cursor-pointer',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-lg',
        className,
      )}
      aria-label={`${category.title}: ${articleCount} orientações`}
    >
      <Card variant="outlined" padding="normal" className="h-full hover:bg-primary-light transition-colors duration-normal lg:p-8">
        <div className="flex items-start gap-4 lg:gap-5">
          <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-primary-lighter flex items-center justify-center flex-shrink-0" aria-hidden="true">
            <Icon className="w-5 h-5 lg:w-7 lg:h-7 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 lg:mb-2 flex-wrap">
              <h3 className="text-base lg:text-lg font-semibold text-text">{category.title}</h3>
              <Badge variant="info">{articleCount} orientações</Badge>
            </div>
            <p className="text-sm lg:text-base text-text-secondary leading-relaxed">{category.description}</p>
          </div>
        </div>
      </Card>
    </button>
  )
}
