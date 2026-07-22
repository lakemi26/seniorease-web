'use client'

import { Card } from '@/presentation/components/ui/Card'
import { Badge } from '@/presentation/components/ui/Badge'
import { Button } from '@/presentation/components/ui/Button'
import { getCategoryLabel, type HelpArticle } from '../../data/help-content'
import { cn } from '@/shared/utils/cn'

interface HelpRecommendedContentProps {
  articles: HelpArticle[]
  onSelectArticle: (slug: string) => void
  className?: string
}

export function HelpRecommendedContent({ articles, onSelectArticle, className }: HelpRecommendedContentProps) {
  if (articles.length === 0) return null

  return (
    <section aria-labelledby="recommended-heading" className={className}>
      <h2 id="recommended-heading" className="text-lg font-semibold text-text mb-4">
        Orientações recomendadas
      </h2>
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 lg:gap-6">
        {articles.map((article) => (
          <Card key={article.id} variant="outlined" padding="compact">
            <div className="flex flex-col h-full">
              <div className="mb-2">
                <Badge variant="info">{getCategoryLabel(article.categoryId)}</Badge>
              </div>
              <h3 className="text-sm font-semibold text-text mb-1">{article.title}</h3>
              <p className="text-sm text-text-secondary mb-3 flex-1">{article.summary}</p>
              <div className="mt-auto">
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
        ))}
      </div>
    </section>
  )
}
