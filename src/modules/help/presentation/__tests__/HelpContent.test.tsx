import { describe, it, expect } from 'vitest'
import {
  articles,
  categories,
  faqItems,
  quickLinks,
  getArticleBySlug,
  getArticlesByCategory,
  getRelatedArticles,
  getBasicModeCategories,
  searchArticles,
  normalizeText,
  getRecommendedArticles,
  ALLOWED_ORIGINS,
} from '../../data/help-content'

describe('Help Content - Data', () => {
  it('possui artigos', () => {
    expect(articles.length).toBeGreaterThan(0)
  })

  it('cada artigo possui id único', () => {
    const ids = articles.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('cada artigo possui slug único', () => {
    const slugs = articles.map((a) => a.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('cada artigo referencia categoria existente', () => {
    const categoryIds = categories.map((c) => c.id)
    for (const article of articles) {
      expect(categoryIds).toContain(article.categoryId)
    }
  })

  it('artigos relacionados referenciam artigos existentes', () => {
    const articleIds = new Set(articles.map((a) => a.id))
    for (const article of articles) {
      if (article.relatedArticleIds) {
        for (const relId of article.relatedArticleIds) {
          expect(articleIds.has(relId)).toBe(true)
        }
      }
    }
  })

  it('possui categorias', () => {
    expect(categories.length).toBeGreaterThan(0)
  })

  it('possui perguntas frequentes', () => {
    expect(faqItems.length).toBeGreaterThan(0)
  })

  it('possui atalhos principais', () => {
    expect(quickLinks.length).toBe(4)
  })

  it('possui origens permitidas', () => {
    expect(ALLOWED_ORIGINS.length).toBeGreaterThan(0)
  })
})

describe('Help Content - Functions', () => {
  it('getArticleBySlug retorna artigo', () => {
    const article = getArticleBySlug('criar-atividade')
    expect(article).toBeDefined()
    expect(article?.title).toBe('Criar uma atividade')
  })

  it('getArticleBySlug retorna undefined para slug inválido', () => {
    expect(getArticleBySlug('slug-invalido')).toBeUndefined()
  })

  it('getArticlesByCategory retorna artigos da categoria', () => {
    const activitiesArticles = getArticlesByCategory('activities')
    expect(activitiesArticles.length).toBeGreaterThan(0)
    for (const article of activitiesArticles) {
      expect(article.categoryId).toBe('activities')
    }
  })

  it('getArticlesByCategory retorna vazio para categoria sem artigos', () => {
    const result = getArticlesByCategory('security')
    expect(result.length).toBeGreaterThan(0)
  })

  it('getRelatedArticles retorna artigos relacionados', () => {
    const article = getArticleBySlug('criar-atividade')
    expect(article).toBeDefined()
    if (article) {
      const related = getRelatedArticles(article)
      expect(related.length).toBeGreaterThan(0)
    }
  })

  it('getBasicModeCategories retorna 4 categorias', () => {
    const basicCategories = getBasicModeCategories()
    expect(basicCategories.length).toBe(4)
    const ids = basicCategories.map((c) => c.id)
    expect(ids).toContain('gettingStarted')
    expect(ids).toContain('activities')
    expect(ids).toContain('personalization')
    expect(ids).toContain('account')
  })

  it('getRecommendedArticles retorna artigos', () => {
    const recommended = getRecommendedArticles(false, 'basic')
    expect(recommended.length).toBeGreaterThan(0)
  })
})

describe('Help Content - Search', () => {
  it('busca por título', () => {
    const results = searchArticles('Criar uma atividade')
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].title).toContain('Criar')
  })

  it('busca por resumo', () => {
    const results = searchArticles('Cadastre uma tarefa')
    expect(results.length).toBeGreaterThan(0)
  })

  it('busca por palavra-chave', () => {
    const results = searchArticles('dashboard')
    expect(results.length).toBeGreaterThan(0)
  })

  it('busca sem acento', () => {
    const results = searchArticles('calendario')
    expect(results.length).toBeGreaterThan(0)
  })

  it('busca com acento também funciona', () => {
    const resultsAcento = searchArticles('calendário')
    const resultsSemAcento = searchArticles('calendario')
    expect(resultsAcento.length).toBe(resultsSemAcento.length)
  })

  it('ignora maiúsculas e minúsculas', () => {
    const resultsUpper = searchArticles('ATIVIDADE')
    const resultsLower = searchArticles('atividade')
    expect(resultsUpper.length).toBeGreaterThan(0)
    expect(resultsUpper.length).toBe(resultsLower.length)
  })

  it('remove espaços excedentes', () => {
    const resultsNormal = searchArticles('criar atividade')
    const resultsSpaces = searchArticles('  criar   atividade  ')
    expect(resultsNormal.length).toBe(resultsSpaces.length)
  })

  it('retorna vazio para busca vazia', () => {
    const results = searchArticles('')
    expect(results.length).toBe(0)
  })

  it('retorna vazio para busca sem resultado', () => {
    const results = searchArticles('zzzzzzzzzinvalido')
    expect(results.length).toBe(0)
  })
})

describe('Help Content - normalizeText', () => {
  it('remove acentos', () => {
    expect(normalizeText('ação')).toBe('acao')
    expect(normalizeText('senha')).toBe('senha')
  })

  it('converte para minúsculas', () => {
    expect(normalizeText('ATIVIDADE')).toBe('atividade')
  })

  it('remove espaços excedentes', () => {
    expect(normalizeText('  criar  atividade  ')).toBe('criar atividade')
  })
})
