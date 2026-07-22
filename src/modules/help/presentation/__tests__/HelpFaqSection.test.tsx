import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HelpFaqSection } from '../components/HelpFaqSection'
import type { HelpFaqItem } from '../../data/help-content'

const items: HelpFaqItem[] = [
  { question: 'Como crio uma atividade?', answer: 'Acesse Atividades.' },
  { question: 'Como aumento o texto?', answer: 'Vá em Configurações.' },
]

describe('HelpFaqSection', () => {
  it('exibe perguntas frequentes', () => {
    render(<HelpFaqSection items={items} />)
    expect(screen.getByText('Perguntas frequentes')).toBeInTheDocument()
    expect(screen.getByText('Como crio uma atividade?')).toBeInTheDocument()
    expect(screen.getByText('Como aumento o texto?')).toBeInTheDocument()
  })

  it('não renderiza quando vazio', () => {
    const { container } = render(<HelpFaqSection items={[]} />)
    expect(container.innerHTML).toBe('')
  })

  it('possui heading acessível', () => {
    render(<HelpFaqSection items={items} />)
    expect(screen.getByRole('heading', { name: 'Perguntas frequentes' })).toBeInTheDocument()
  })

  it('usa role="region" no Accordion', () => {
    render(<HelpFaqSection items={items} />)
    expect(screen.getByRole('region', { name: 'Perguntas frequentes' })).toBeInTheDocument()
  })
})
