'use client'

import { Button } from '@/presentation/components/ui/Button'
import { cn } from '@/shared/utils/cn'
import type { HelpArticle } from '../../data/help-content'

interface HelpRelatedArticlesProps {
  articles: HelpArticle[]
  onSelectArticle: (slug: string) => void
  className?: string
}

export function HelpRelatedArticles({ articles, onSelectArticle, className }: HelpRelatedArticlesProps) {
  if (!articles || articles.length === 0) return null

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-base font-semibold text-text">Orientações relacionadas</h3>
      <ul className="space-y-2" role="list">
        {articles.map((article) => (
          <li key={article.id}>
            <Button
              variant="ghost"
              size="normal"
              onClick={() => onSelectArticle(article.slug)}
              className="text-left"
              aria-label={`Ver orientação relacionada: ${article.title}`}
            >
              {article.title}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
