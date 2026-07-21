import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmptyState } from '../components/EmptyState'

describe('EmptyState', () => {
  it('exibe título e descrição', () => {
    render(
      <EmptyState
        title="Nenhuma atividade encontrada"
        description="Adicione uma nova atividade."
      />
    )

    expect(screen.getByText('Nenhuma atividade encontrada')).toBeInTheDocument()
    expect(screen.getByText('Adicione uma nova atividade.')).toBeInTheDocument()
  })

  it('exibe botão de ação quando actionLabel e onAction são fornecidos', () => {
    const onAction = vi.fn()
    render(
      <EmptyState
        title="Vazio"
        description="Sem dados."
        actionLabel="Adicionar"
        onAction={onAction}
      />
    )

    const button = screen.getByRole('button', { name: 'Adicionar' })
    expect(button).toBeInTheDocument()
  })

  it('chama onAction ao clicar no botão', async () => {
    const onAction = vi.fn()
    const user = userEvent.setup()

    render(
      <EmptyState
        title="Vazio"
        description="Sem dados."
        actionLabel="Adicionar"
        onAction={onAction}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Adicionar' }))
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it('não renderiza botão quando actionLabel não é fornecido', () => {
    render(
      <EmptyState
        title="Vazio"
        description="Sem dados."
      />
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
