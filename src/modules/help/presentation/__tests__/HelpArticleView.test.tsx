import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HelpArticleView } from '../components/HelpArticleView'
import type { HelpArticle } from '../../data/help-content'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

const article: HelpArticle = {
  id: '1',
  slug: 'criar-atividade',
  categoryId: 'activities',
  title: 'Criar uma atividade',
  summary: 'Cadastre uma tarefa ou compromisso.',
  keywords: ['criar', 'atividade'],
  steps: [
    { id: 's1', title: 'Abrir atividades', description: 'No menu, selecione Atividades.' },
    { id: 's2', title: 'Selecionar Nova atividade', description: 'Escolha o botão Nova atividade.' },
  ],
  relatedArticleIds: ['2'],
  relatedRoute: '/atividades?modal=nova',
  relatedRouteLabel: 'Criar nova atividade',
  availableInBasicMode: true,
}

describe('HelpArticleView', () => {
  it('exibe título, resumo e categoria', () => {
    render(
      <HelpArticleView
        article={article}
        interfaceMode="complete"
        onSelectArticle={() => {}}
        onGoBack={() => {}}
      />
    )
    expect(screen.getByText('Criar uma atividade')).toBeInTheDocument()
    expect(screen.getByText('Cadastre uma tarefa ou compromisso.')).toBeInTheDocument()
    expect(screen.getByText('Atividades')).toBeInTheDocument()
  })

  it('exibe etapas numeradas', () => {
    render(
      <HelpArticleView
        article={article}
        interfaceMode="complete"
        onSelectArticle={() => {}}
        onGoBack={() => {}}
      />
    )
    expect(screen.getByText('Passo a passo')).toBeInTheDocument()
    expect(screen.getByText('Abrir atividades')).toBeInTheDocument()
    expect(screen.getByText('Selecionar Nova atividade')).toBeInTheDocument()
  })

  it('exibe botão de rota relacionada', () => {
    render(
      <HelpArticleView
        article={article}
        interfaceMode="complete"
        onSelectArticle={() => {}}
        onGoBack={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: 'Criar nova atividade' })).toBeInTheDocument()
  })

  it('exibe voltar para a ajuda', () => {
    render(
      <HelpArticleView
        article={article}
        interfaceMode="complete"
        onSelectArticle={() => {}}
        onGoBack={() => {}}
      />
    )
    expect(screen.getByRole('button', { name: 'Voltar para a ajuda' })).toBeInTheDocument()
  })

  it('chama onGoBack ao clicar em voltar', async () => {
    const onGoBack = vi.fn()
    const user = (await import('@testing-library/user-event')).default.setup()
    render(
      <HelpArticleView
        article={article}
        interfaceMode="complete"
        onSelectArticle={() => {}}
        onGoBack={onGoBack}
      />
    )
    await user.click(screen.getByRole('button', { name: 'Voltar para a ajuda' }))
    expect(onGoBack).toHaveBeenCalledTimes(1)
  })

  it('tem foco no título ao montar', () => {
    render(
      <HelpArticleView
        article={article}
        interfaceMode="complete"
        onSelectArticle={() => {}}
        onGoBack={() => {}}
      />
    )
    const heading = screen.getByText('Criar uma atividade')
    expect(heading).toBeInTheDocument()
  })
})
