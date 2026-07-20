import { FOOTER_LINKS, SITE_NAME } from '@/shared/constants'
import { Container } from './Container'
import { Logo } from './Logo'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-dark text-white py-10 md:py-14">
      <Container maxWidth="xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <div className="flex flex-col gap-4">
            <Logo className="text-white" />
            <p className="text-sm text-white/80 max-w-xs">
              Plataforma acessível para organizar atividades, compromissos e tarefas.
            </p>
          </div>

          <nav aria-label="Links do rodapé">
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white rounded-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center md:text-left">
          <p className="text-xs text-white/60">
            &copy; {currentYear} {SITE_NAME}. Projeto desenvolvido para o Hackathon FIAP Inclusive.
          </p>
        </div>
      </Container>
    </footer>
  )
}
