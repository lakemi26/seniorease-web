import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelpArticleNotFound } from '../components/HelpArticleNotFound'

describe('HelpArticleNotFound', () => {
  it('exibe título e mensagem', () => {
    render(<HelpArticleNotFound onGoBack={() => {}} onSearch={() => {}} />)
    expect(screen.getByText('Orientação não encontrada.')).toBeInTheDocument()
    expect(
      screen.getByText('Esta orientação pode ter sido alterada ou não está disponível.')
    ).toBeInTheDocument()
  })

  it('exibe botões de ação', () => {
    render(<HelpArticleNotFound onGoBack={() => {}} onSearch={() => {}} />)
    expect(screen.getByRole('button', { name: 'Voltar para a ajuda' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Buscar outra orientação' })).toBeInTheDocument()
  })

  it('chama onGoBack ao clicar', async () => {
    const onGoBack = vi.fn()
    const user = userEvent.setup()
    render(<HelpArticleNotFound onGoBack={onGoBack} onSearch={() => {}} />)
    await user.click(screen.getByRole('button', { name: 'Voltar para a ajuda' }))
    expect(onGoBack).toHaveBeenCalledTimes(1)
  })

  it('chama onSearch ao clicar', async () => {
    const onSearch = vi.fn()
    const user = userEvent.setup()
    render(<HelpArticleNotFound onGoBack={() => {}} onSearch={onSearch} />)
    await user.click(screen.getByRole('button', { name: 'Buscar outra orientação' }))
    expect(onSearch).toHaveBeenCalledTimes(1)
  })
})
