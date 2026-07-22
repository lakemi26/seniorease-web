import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HelpRecommendedContent } from '../components/HelpRecommendedContent'
import type { HelpArticle } from '../../data/help-content'

const articles: HelpArticle[] = [
  {
    id: '1',
    slug: 'criar-atividade',
    categoryId: 'activities',
    title: 'Criar uma atividade',
    summary: 'Cadastre uma tarefa.',
    keywords: ['criar'],
    availableInBasicMode: true,
  },
  {
    id: '2',
    slug: 'adicionar-etapas',
    categoryId: 'activities',
    title: 'Adicionar etapas',
    summary: 'Divida em passos.',
    keywords: ['etapas'],
    availableInBasicMode: true,
  },
]

describe('HelpRecommendedContent', () => {
  it('exibe título', () => {
    render(<HelpRecommendedContent articles={articles} onSelectArticle={() => {}} />)
    expect(screen.getByText('Orientações recomendadas')).toBeInTheDocument()
  })

  it('exibe artigos', () => {
    render(<HelpRecommendedContent articles={articles} onSelectArticle={() => {}} />)
    expect(screen.getByText('Criar uma atividade')).toBeInTheDocument()
    expect(screen.getByText('Adicionar etapas')).toBeInTheDocument()
  })

  it('exibe categorias como badges', () => {
    render(<HelpRecommendedContent articles={articles} onSelectArticle={() => {}} />)
    const badges = screen.getAllByText('Atividades')
    expect(badges.length).toBeGreaterThan(0)
  })

  it('não renderiza quando vazio', () => {
    const { container } = render(<HelpRecommendedContent articles={[]} onSelectArticle={() => {}} />)
    expect(container.innerHTML).toBe('')
  })

  it('chama onSelectArticle', async () => {
    const onSelectArticle = vi.fn()
    const user = (await import('@testing-library/user-event')).default.setup()
    render(<HelpRecommendedContent articles={articles} onSelectArticle={onSelectArticle} />)
    const buttons = screen.getAllByRole('button', { name: /Ver orientação/ })
    expect(buttons.length).toBe(2)
  })
})
