'use client'

import { HelpCategoryCard } from './HelpCategoryCard'
import type { HelpCategory } from '../../data/help-content'
import { cn } from '@/shared/utils/cn'

interface HelpCategoryGridProps {
  categories: HelpCategory[]
  articleCountMap: Record<string, number>
  onCategoryClick: (categoryId: string) => void
  className?: string
}

export function HelpCategoryGrid({
  categories,
  articleCountMap,
  onCategoryClick,
  className,
}: HelpCategoryGridProps) {
  if (categories.length === 0) return null

  return (
    <div className={cn('flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8', className)} role="list" aria-label="Categorias de ajuda">
      {categories.map((category) => (
        <div key={category.id} role="listitem" className="h-full">
          <HelpCategoryCard
            category={category}
            articleCount={articleCountMap[category.id] || 0}
            onClick={() => onCategoryClick(category.id)}
          />
        </div>
      ))}
    </div>
  )
}
