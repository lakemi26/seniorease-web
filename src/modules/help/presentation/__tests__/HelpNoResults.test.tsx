import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelpNoResults } from '../components/HelpNoResults'

describe('HelpNoResults', () => {
  it('exibe título e mensagem', () => {
    render(
      <HelpNoResults query="xyz" onClearSearch={() => {}} onViewCategories={() => {}} />
    )
    expect(screen.getByText('Não encontramos essa orientação.')).toBeInTheDocument()
    expect(
      screen.getByText('Tente usar palavras mais simples ou consulte as categorias abaixo.')
    ).toBeInTheDocument()
  })

  it('exibe botões de ação', () => {
    render(
      <HelpNoResults query="xyz" onClearSearch={() => {}} onViewCategories={() => {}} />
    )
    expect(screen.getByRole('button', { name: 'Limpar busca' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ver todas as categorias' })).toBeInTheDocument()
  })

  it('chama onClearSearch ao clicar', async () => {
    const onClearSearch = vi.fn()
    const user = userEvent.setup()
    render(
      <HelpNoResults query="xyz" onClearSearch={onClearSearch} onViewCategories={() => {}} />
    )
    await user.click(screen.getByRole('button', { name: 'Limpar busca' }))
    expect(onClearSearch).toHaveBeenCalledTimes(1)
  })

  it('chama onViewCategories ao clicar', async () => {
    const onViewCategories = vi.fn()
    const user = userEvent.setup()
    render(
      <HelpNoResults query="xyz" onClearSearch={() => {}} onViewCategories={onViewCategories} />
    )
    await user.click(screen.getByRole('button', { name: 'Ver todas as categorias' }))
    expect(onViewCategories).toHaveBeenCalledTimes(1)
  })
})
