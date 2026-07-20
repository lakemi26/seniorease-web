import type { Metadata } from 'next'
import { Logo } from '@/presentation/components/layout/Logo'
import Link from 'next/link'
import { OnboardingPageWrapper } from './onboarding-wrapper'

export const metadata: Metadata = {
  title: 'Primeiro acesso | SeniorEase',
  description: 'Configure sua experiência no SeniorEase.',
}

export default function PrimeiroAcessoPage() {
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
        className="flex-1 flex items-start justify-center px-4 py-8"
      >
        <OnboardingPageWrapper />
      </main>
    </div>
  )
}
