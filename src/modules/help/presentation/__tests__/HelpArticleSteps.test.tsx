import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HelpArticleSteps } from '../components/HelpArticleSteps'
import type { HelpArticleStep } from '../../data/help-content'

const steps: HelpArticleStep[] = [
  { id: 's1', title: 'Primeiro passo', description: 'Descrição do primeiro passo.' },
  { id: 's2', title: 'Segundo passo', description: 'Descrição do segundo passo.' },
]

describe('HelpArticleSteps', () => {
  it('exibe título da seção', () => {
    render(<HelpArticleSteps steps={steps} />)
    expect(screen.getByText('Passo a passo')).toBeInTheDocument()
  })

  it('exibe etapas com título e descrição', () => {
    render(<HelpArticleSteps steps={steps} />)
    expect(screen.getByText('Primeiro passo')).toBeInTheDocument()
    expect(screen.getByText('Descrição do primeiro passo.')).toBeInTheDocument()
    expect(screen.getByText('Segundo passo')).toBeInTheDocument()
    expect(screen.getByText('Descrição do segundo passo.')).toBeInTheDocument()
  })

  it('usa lista ordenada', () => {
    render(<HelpArticleSteps steps={steps} />)
    const list = screen.getByRole('list')
    expect(list.tagName).toBe('OL')
  })

  it('não renderiza quando vazio', () => {
    const { container } = render(<HelpArticleSteps steps={[]} />)
    expect(container.innerHTML).toBe('')
  })

  it('não renderiza quando undefined', () => {
    const { container } = render(<HelpArticleSteps steps={undefined as unknown as HelpArticleStep[]} />)
    expect(container.innerHTML).toBe('')
  })
})
