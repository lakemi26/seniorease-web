'use client'

import { Search } from 'lucide-react'
import { Button } from '@/presentation/components/ui/Button'
import { Card } from '@/presentation/components/ui/Card'
import { Badge } from '@/presentation/components/ui/Badge'
import { getCategoryLabel, type HelpArticle } from '../../data/help-content'
import { cn } from '@/shared/utils/cn'

interface HelpSearchResultsProps {
  query: string
  results: HelpArticle[]
  onSelectArticle: (slug: string) => void
  className?: string
}

export function HelpSearchResults({ query, results, onSelectArticle, className }: HelpSearchResultsProps) {
  if (!query) return null

  const resultCount = results.length

  return (
    <section aria-labelledby="search-results-heading" className={cn('space-y-4', className)}>
      <div role="status" aria-live="polite" className="sr-only">
        {resultCount === 1
          ? '1 orientação encontrada.'
          : `${resultCount} orientações encontradas.`}
      </div>
      <h2 id="search-results-heading" className="text-lg font-semibold text-text">
        Resultados da busca
      </h2>
      <p className="text-sm text-text-muted" aria-hidden="true">
        {resultCount === 1
          ? '1 orientação encontrada.'
          : `${resultCount} orientações encontradas.`}
      </p>
      {resultCount > 0 && (
        <ul className="space-y-3" role="list">
          {results.map((article) => (
            <li key={article.id}>
              <Card variant="outlined" padding="compact">
                <div className="flex items-start gap-3">
                  <Search className="w-5 h-5 text-text-muted shrink-0 mt-1" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-sm font-semibold text-text">{article.title}</h3>
                      <Badge variant="info">{getCategoryLabel(article.categoryId)}</Badge>
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
      )}
    </section>
  )
}
