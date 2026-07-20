import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Hero } from '@/modules/landing/components/Hero'
import { Accordion } from '@/presentation/components/ui/Accordion'
import { Footer } from '@/presentation/components/layout/Footer'
import { Navbar } from '@/presentation/components/layout/Navbar'
import { SkipLink } from '@/presentation/components/accessibility/SkipLink'
import { AccessibilityProvider } from '@/presentation/providers/AccessibilityProvider'

function renderWithProvider(ui: React.ReactElement) {
  return render(<AccessibilityProvider>{ui}</AccessibilityProvider>)
}

describe('Hero', () => {
  it('renderiza título e subtítulo', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Organize suas atividades/
    )
    expect(screen.getByText(/O SeniorEase ajuda você/)).toBeInTheDocument()
  })
})

describe('Mobile Menu', () => {
  it('abre e fecha o menu mobile', async () => {
    const user = userEvent.setup()
    renderWithProvider(<Navbar />)

    const openButton = screen.getByLabelText('Abrir menu')
    await user.click(openButton)
    expect(openButton).toHaveAttribute('aria-expanded', 'true')

    const closeButton = screen.getByLabelText('Fechar menu')
    await user.click(closeButton)
    expect(openButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('fecha o menu com a tecla Escape', async () => {
    const user = userEvent.setup()
    renderWithProvider(<Navbar />)

    const openButton = screen.getByLabelText('Abrir menu')
    await user.click(openButton)
    expect(openButton).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    expect(openButton).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('Accordion', () => {
  const items = [
    { title: 'Pergunta 1', content: 'Resposta 1' },
    { title: 'Pergunta 2', content: 'Resposta 2' },
  ]

  it('painel fica visível ao clicar no botão', async () => {
    const user = userEvent.setup()
    render(<Accordion items={[{ title: 'Q', content: 'A' }]} />)

    const button = screen.getByRole('button', { name: 'Q' })
    expect(screen.queryByText('A')).not.toBeVisible()

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('A')).toBeVisible()

    await user.click(button)
    expect(screen.queryByText('A')).not.toBeVisible()
  })

  it('abre e fecha item com Enter', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const button = screen.getByRole('button', { name: 'Pergunta 1' })
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('alterna aria-expanded ao clicar', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const button = screen.getByRole('button', { name: 'Pergunta 1' })
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('Tab não abre itens, apenas navega o foco', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const button1 = screen.getByRole('button', { name: 'Pergunta 1' })
    const button2 = screen.getByRole('button', { name: 'Pergunta 2' })

    button1.focus()

    await user.tab()

    expect(button1).toHaveAttribute('aria-expanded', 'false')
    expect(document.activeElement).toBe(button2)
  })

  it('fecha com Escape', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const button = screen.getByRole('button', { name: 'Pergunta 1' })
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')

    await user.keyboard('{Escape}')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('navega com seta para baixo', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const button1 = screen.getByRole('button', { name: 'Pergunta 1' })
    const button2 = screen.getByRole('button', { name: 'Pergunta 2' })

    button1.focus()
    await user.keyboard('{ArrowDown}')

    expect(document.activeElement).toBe(button2)
    expect(button2).toHaveAttribute('aria-expanded', 'true')
  })

  it('navega com seta para cima', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const button1 = screen.getByRole('button', { name: 'Pergunta 1' })
    const button2 = screen.getByRole('button', { name: 'Pergunta 2' })

    button2.focus()
    await user.keyboard('{ArrowUp}')

    expect(document.activeElement).toBe(button1)
    expect(button1).toHaveAttribute('aria-expanded', 'true')
  })

  it('vai para o primeiro item com Home', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const button2 = screen.getByRole('button', { name: 'Pergunta 2' })
    button2.focus()

    await user.keyboard('{Home}')

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Pergunta 1' }))
  })

  it('vai para o último item com End', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)

    const button1 = screen.getByRole('button', { name: 'Pergunta 1' })
    button1.focus()

    await user.keyboard('{End}')

    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Pergunta 2' }))
  })
})

describe('Footer', () => {
  it('exibe o ano dinâmico', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(String(currentYear)))).toBeInTheDocument()
  })
})

describe('SkipLink', () => {
  it('possui link para pular ao conteúdo principal', () => {
    render(<SkipLink />)
    const link = screen.getByText('Pular para o conteúdo principal')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#main-content')
  })
})
