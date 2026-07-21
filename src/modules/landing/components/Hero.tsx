'use client'

import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { Container } from '@/presentation/components/layout/Container'
import { Button } from '@/presentation/components/ui/Button'

const miniBenefits = [
  'Texto ajustável',
  'Navegação simplificada',
  'Orientação passo a passo',
]

export function Hero() {
  const router = useRouter()

  const handleScrollToHowItWorks = () => {
    const el = document.getElementById('como-funciona')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="py-10 md:py-20 bg-background">
      <Container maxWidth="xl">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex flex-col gap-6 lg:gap-8 flex-1">
            <h1 className="text-[var(--font-size-heading-1)] font-bold text-text leading-tight">
              Organize suas atividades com mais clareza e tranquilidade.
            </h1>
            <p className="text-[var(--font-size-body)] text-text-secondary leading-relaxed max-w-xl lg:max-w-3xl">
              O SeniorEase ajuda você a acompanhar tarefas, compromissos e etapas
              importantes de forma simples, acessível e segura.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button variant="primary" size="large" onClick={() => router.push('/cadastro')}>
                Começar agora
              </Button>
              <Button variant="outline" size="large" onClick={handleScrollToHowItWorks}>
                Conhecer a plataforma
              </Button>
            </div>
            <ul className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-2">
              {miniBenefits.map(benefit => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-text-secondary">
                  <CheckCircle className="w-4 h-4 text-secondary shrink-0" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 w-full max-w-lg hidden lg:block" aria-hidden="true">
            <div className="relative w-full aspect-[4/3] bg-primary-light rounded-lg overflow-hidden shadow-elevated">
              <div className="absolute inset-4 bg-surface rounded-md shadow-card p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <div className="w-3 h-3 rounded-full bg-danger" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <div className="h-2.5 bg-primary/20 rounded w-32" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <div className="h-2.5 bg-secondary/20 rounded w-28" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <div className="h-2.5 bg-accent/20 rounded w-36" />
                </div>
                <div className="mt-auto pt-3 border-t border-border">
                  <div className="h-3 bg-primary rounded w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
