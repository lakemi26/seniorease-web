'use client'

import { Card } from '@/presentation/components/ui/Card'
import { Button } from '@/presentation/components/ui/Button'
import { getCategoryLabel, type HelpArticle } from '../../data/help-content'
import { cn } from '@/shared/utils/cn'

interface HelpCategoryArticleListProps {
  articles: HelpArticle[]
  onSelectArticle: (slug: string) => void
  className?: string
}

export function HelpCategoryArticleList({ articles, onSelectArticle, className }: HelpCategoryArticleListProps) {
  if (articles.length === 0) return null

  return (
    <section aria-labelledby="category-articles-heading" className={cn('space-y-4', className)}>
      <h2 id="category-articles-heading" className="text-lg font-semibold text-text">
        Orientações disponíveis
      </h2>
      <ul className="space-y-3" role="list">
        {articles.map((article) => (
          <li key={article.id}>
            <Card variant="outlined" padding="compact">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-sm font-semibold text-text">{article.title}</h3>
                    <span className="text-xs text-text-muted bg-primary-lighter px-2 py-0.5 rounded-full">
                      {getCategoryLabel(article.categoryId)}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary mb-2">{article.summary}</p>
                  <Button
                    variant="ghost"
                    size="normal"
                    onClick={() => onSelectArticle(article.slug)}
                    aria-label={`Ver orientação: ${article.title}`}
                  >
                    Ver orientação
                  </Button>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
