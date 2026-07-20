import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/presentation/components/layout/Logo'
import { VerifyEmailWrapper } from './verify-email-wrapper'

export const metadata: Metadata = {
  title: 'Confirme seu e-mail | SeniorEase',
  description: 'Confirme seu endereço de e-mail para ativar sua conta SeniorEase.',
}

export default function VerificarEmailPage() {
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
        <VerifyEmailWrapper />
      </main>
    </div>
  )
}
