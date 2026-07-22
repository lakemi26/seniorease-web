'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/presentation/components/ui/Badge'
import { Button } from '@/presentation/components/ui/Button'
import { HelpArticleSteps } from './HelpArticleSteps'
import { HelpRelatedArticles } from './HelpRelatedArticles'
import { getCategoryLabel, getRelatedArticles, type HelpArticle } from '../../data/help-content'
import { cn } from '@/shared/utils/cn'

interface HelpArticleViewProps {
  article: HelpArticle
  interfaceMode: 'basic' | 'complete'
  onSelectArticle: (slug: string) => void
  onGoBack: () => void
  className?: string
}

export function HelpArticleView({
  article,
  interfaceMode,
  onSelectArticle,
  onGoBack,
  className,
}: HelpArticleViewProps) {
  const router = useRouter()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const relatedArticles = getRelatedArticles(article)
  const maxRelated = interfaceMode === 'basic' ? 2 : relatedArticles.length
  const visibleRelated = relatedArticles.slice(0, maxRelated)

  useEffect(() => {
    headingRef.current?.focus()
  }, [article.id])

  return (
    <article className={cn('space-y-6', className)} aria-labelledby="article-title">
      <nav aria-label="Navegação do artigo">
        <Button
          variant="ghost"
          size="normal"
          onClick={onGoBack}
          icon={<ArrowLeft className="w-4 h-4" aria-hidden="true" />}
        >
          Voltar para a ajuda
        </Button>
      </nav>

      <div className="space-y-1">
        <Badge variant="info">
          {getCategoryLabel(article.categoryId)}
        </Badge>
        <h1
          ref={headingRef}
          id="article-title"
          tabIndex={-1}
          className="text-2xl font-bold text-text outline-none"
        >
          {article.title}
        </h1>
        <p className="text-base text-text-secondary leading-relaxed">{article.summary}</p>
      </div>

      {article.content && article.content.length > 0 && (
        <div className="space-y-3">
          {article.content.map((paragraph, index) => (
            <p key={index} className="text-base text-text leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {article.steps && article.steps.length > 0 && (
        <HelpArticleSteps steps={article.steps} />
      )}

      {article.relatedRoute && (
        <div className="pt-2">
          <Button
            variant="primary"
            size="large"
            onClick={() => router.push(article.relatedRoute!)}
            aria-label={article.relatedRouteLabel || 'Ir para esta funcionalidade'}
          >
            {article.relatedRouteLabel || 'Ir para esta funcionalidade'}
          </Button>
        </div>
      )}

      {visibleRelated.length > 0 && (
        <HelpRelatedArticles
          articles={visibleRelated}
          onSelectArticle={onSelectArticle}
        />
      )}
    </article>
  )
}
