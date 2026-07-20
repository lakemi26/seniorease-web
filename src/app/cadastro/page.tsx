import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/presentation/components/layout/Logo'
import { AuthCard } from '@/presentation/components/ui/AuthCard'
import { CadastroWrapper } from './cadastro-wrapper'

export const metadata: Metadata = {
  title: 'Criar conta | SeniorEase',
  description: 'Crie sua conta no SeniorEase para organizar suas atividades.',
}

export default function CadastroPage() {
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
        <div className="flex w-full max-w-5xl gap-8 items-center">
          <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-primary-lighter rounded-lg flex-1">
            <div className="max-w-sm text-center">
              <div className="mb-6" aria-hidden="true">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  className="mx-auto"
                  aria-hidden="true"
                >
                  <rect width="120" height="120" rx="60" fill="#0D6B6E" opacity="0.1" />
                  <path d="M60 30C43.4 30 30 43.4 30 60s13.4 30 30 30 30-13.4 30-30S76.6 30 60 30zm-4 46l-12-12 2.8-2.8L56 70.4l17.2-17.2L76 56l-20 20z" fill="#0D6B6E" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-3">
                Bem-vindo ao SeniorEase!
              </h2>
              <p className="text-text-secondary text-base leading-relaxed">
                Crie sua conta para organizar suas atividades de um jeito mais claro e confortável.
              </p>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <AuthCard maxWidth="md">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold text-text">
                    Crie sua conta
                  </h1>
                  <p className="text-text-secondary text-sm">
                    Crie sua conta para organizar suas atividades de um jeito mais claro e confortável.
                  </p>
                </div>

                <CadastroWrapper />

                <p className="text-sm text-center text-text-muted">
                  <Link
                    href="/"
                    className="text-primary hover:text-primary-dark underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
                  >
                    Voltar para a página inicial
                  </Link>
                </p>
              </div>
            </AuthCard>
          </div>
        </div>
      </main>
    </div>
  )
}
