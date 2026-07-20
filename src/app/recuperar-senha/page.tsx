import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/presentation/components/layout/Logo'
import { AuthCard } from '@/presentation/components/ui/AuthCard'
import { PasswordRecoveryForm } from './password-recovery-form'

export const metadata: Metadata = {
  title: 'Recuperar senha | SeniorEase',
  description: 'Recupere sua senha do SeniorEase.',
}

export default function PasswordRecoveryPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6">
        <Link
          href="/"
          aria-label="Voltar para a página inicial"
          className="inline-flex focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
        >
          <Logo />
        </Link>
      </header>

      <main
        id="main-content"
        className="flex-1 flex items-center justify-center px-4 py-8"
      >
        <AuthCard maxWidth="sm">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-text">
                Recupere sua senha
              </h1>
              <p className="text-text-secondary text-sm">
                Informe o e-mail usado no SeniorEase. Enviaremos as orientações para criar uma nova senha.
              </p>
            </div>

            <PasswordRecoveryForm />

            <p className="text-sm text-center text-text-muted">
              <Link
                href="/login"
                className="text-primary hover:text-primary-dark underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
              >
                Voltar para o login
              </Link>
            </p>
          </div>
        </AuthCard>
      </main>
    </div>
  )
}
