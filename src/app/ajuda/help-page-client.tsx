'use client'

import { useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { useAuth } from '@/presentation/hooks/useAuth'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import { HelpHeader } from '@/modules/help/presentation/components/HelpHeader'
import { HelpSearch } from '@/modules/help/presentation/components/HelpSearch'
import { HelpSearchResults } from '@/modules/help/presentation/components/HelpSearchResults'
import { HelpQuickLinks } from '@/modules/help/presentation/components/HelpQuickLinks'
import { HelpCategoryGrid } from '@/modules/help/presentation/components/HelpCategoryGrid'
import { HelpFaqSection } from '@/modules/help/presentation/components/HelpFaqSection'
import { HelpArticleView } from '@/modules/help/presentation/components/HelpArticleView'
import { HelpContextReturn } from '@/modules/help/presentation/components/HelpContextReturn'
import { HelpNoResults } from '@/modules/help/presentation/components/HelpNoResults'
import { HelpArticleNotFound } from '@/modules/help/presentation/components/HelpArticleNotFound'
import { HelpRecommendedContent } from '@/modules/help/presentation/components/HelpRecommendedContent'
import {
  categories,
  articles,
  faqItems,
  quickLinks,
  getArticleBySlug,
  getArticlesByCategory,
  getBasicModeCategories,
  getRecommendedArticles,
  searchArticles,
  type HelpCategoryId,
} from '@/modules/help/data/help-content'

export function HelpPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { interface: interfaceMode } = useAccessibility()
  useAuth()

  const busca = searchParams.get('busca') || ''
  const categoria = searchParams.get('categoria') || ''
  const artigo = searchParams.get('artigo') || ''
  const origem = searchParams.get('origem') || ''

  const validCategoria = categories.some((c) => c.id === categoria) ? (categoria as HelpCategoryId) : null

  const article = artigo ? getArticleBySlug(artigo) : undefined

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      const newParams = params.toString()
      router.replace(`/ajuda${newParams ? `?${newParams}` : ''}`, { scroll: false })
    },
    [router, searchParams],
  )

  const handleSearch = useCallback(
    (value: string) => {
      if (artigo) {
        const params = new URLSearchParams(searchParams.toString())
        params.delete('artigo')
        params.delete('categoria')
        if (value) {
          params.set('busca', value)
        } else {
          params.delete('busca')
        }
        router.replace(`/ajuda${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false })
      } else {
        updateParam('busca', value)
      }
    },
    [updateParam, artigo, searchParams, router],
  )

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      if (busca) updateParam('busca', '')
      updateParam('categoria', categoryId)
    },
    [updateParam, busca],
  )

  const handleSelectArticle = useCallback(
    (slug: string) => {
      updateParam('artigo', slug)
    },
    [updateParam],
  )

  const handleGoBack = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('artigo')
    const newParams = params.toString()
    router.replace(`/ajuda${newParams ? `?${newParams}` : ''}`, { scroll: false })
  }, [router, searchParams])

  const handleClearSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('busca')
    params.delete('categoria')
    const newParams = params.toString()
    router.replace(`/ajuda${newParams ? `?${newParams}` : ''}`, { scroll: false })
  }, [router, searchParams])

  const handleViewAllCategories = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('busca')
    params.delete('categoria')
    const newParams = params.toString()
    router.replace(`/ajuda${newParams ? `?${newParams}` : ''}`, { scroll: false })
  }, [router, searchParams])

  const isBasic = interfaceMode === 'basic'

  const searchResults = busca ? searchArticles(busca) : []

  const filteredCategories = validCategoria
    ? categories.filter((c) => c.id === validCategoria)
    : isBasic
      ? getBasicModeCategories()
      : categories

  const categoryArticleCount = (categoryId: string) =>
    articles.filter((a) => a.categoryId === categoryId).length

  const currentCategoryArticles = validCategoria
    ? getArticlesByCategory(validCategoria)
    : []

  const recommendedArticles = getRecommendedArticles(false, interfaceMode)
  const showRecommended = !busca && !artigo && !validCategoria
  const showSearchResults = busca && !artigo
  const showCategoryView = validCategoria && !artigo
  const showArticle = !!article
  const showArticleError = !!artigo && !article

  return (
    <>
      <LiveRegion message="Central de ajuda carregada." />
      <div className="flex flex-col gap-8 max-w-4xl mx-auto pb-8">
        <HelpContextReturn origin={origem} />

        {showArticle && article ? (
          <HelpArticleView
            article={article}
            interfaceMode={interfaceMode}
            onSelectArticle={handleSelectArticle}
            onGoBack={handleGoBack}
          />
        ) : showArticleError ? (
          <HelpArticleNotFound
            onGoBack={handleGoBack}
            onSearch={handleViewAllCategories}
          />
        ) : (
          <>
            <HelpHeader />

            <HelpSearch
              value={busca}
              onChange={handleSearch}
            />

            {showSearchResults && searchResults.length > 0 && (
              <HelpSearchResults
                query={busca}
                results={searchResults}
                onSelectArticle={handleSelectArticle}
              />
            )}

            {showSearchResults && searchResults.length === 0 && (
              <>
                <HelpNoResults
                  query={busca}
                  onClearSearch={handleClearSearch}
                  onViewCategories={handleViewAllCategories}
                />
                {!isBasic && (
                  <HelpCategoryGrid
                    categories={filteredCategories}
                    articleCountMap={Object.fromEntries(
                      categories.map((c) => [c.id, categoryArticleCount(c.id)]),
                    )}
                    onCategoryClick={handleCategoryClick}
                  />
                )}
              </>
            )}

            {!busca && showCategoryView && (
              <div className="space-y-6">
                <HelpCategoryGrid
                  categories={filteredCategories}
                  articleCountMap={Object.fromEntries(
                    filteredCategories.map((c) => [c.id, categoryArticleCount(c.id)]),
                  )}
                  onCategoryClick={handleCategoryClick}
                />
                {currentCategoryArticles.length === 0 && (
                  <div className="flex flex-col items-center text-center py-8 px-4">
                    <p className="text-base font-semibold text-text">Nenhuma orientação disponível nesta categoria.</p>
                    <p className="text-sm text-text-muted mt-1">Consulte outra categoria ou utilize a busca.</p>
                  </div>
                )}
              </div>
            )}

            {!busca && !validCategoria && (
              <>
                <HelpQuickLinks
                  links={isBasic ? quickLinks.slice(0, 4) : quickLinks}
                  onLinkClick={handleSelectArticle}
                />

                <HelpCategoryGrid
                  categories={isBasic ? getBasicModeCategories() : categories}
                  articleCountMap={Object.fromEntries(
                    categories.map((c) => [c.id, categoryArticleCount(c.id)]),
                  )}
                  onCategoryClick={handleCategoryClick}
                />

                {!isBasic && showRecommended && recommendedArticles.length > 0 && (
                  <HelpRecommendedContent
                    articles={recommendedArticles}
                    onSelectArticle={handleSelectArticle}
                  />
                )}

                <HelpFaqSection
                  items={faqItems.map((item) => ({
                    ...item,
                    answer: item.articleSlug
                      ? `${item.answer}`
                      : item.answer,
                  }))}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}
