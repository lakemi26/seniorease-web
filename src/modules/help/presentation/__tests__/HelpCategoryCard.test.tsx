import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelpCategoryCard } from '../components/HelpCategoryCard'
import type { HelpCategory } from '../../data/help-content'

const category: HelpCategory = {
  id: 'activities',
  title: 'Atividades',
  description: 'Orientações para criar, acompanhar e concluir atividades.',
  icon: 'ListTodo',
  priority: 1,
}

describe('HelpCategoryCard', () => {
  it('exibe título, descrição e quantidade', () => {
    render(<HelpCategoryCard category={category} articleCount={5} onClick={() => {}} />)
    expect(screen.getByText('Atividades')).toBeInTheDocument()
    expect(screen.getByText('5 orientações')).toBeInTheDocument()
    expect(
      screen.getByText('Orientações para criar, acompanhar e concluir atividades.')
    ).toBeInTheDocument()
  })

  it('chama onClick ao clicar', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<HelpCategoryCard category={category} articleCount={3} onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('possui label acessível', () => {
    render(<HelpCategoryCard category={category} articleCount={3} onClick={() => {}} />)
    expect(screen.getByRole('button', { name: 'Atividades: 3 orientações' })).toBeInTheDocument()
  })
})
