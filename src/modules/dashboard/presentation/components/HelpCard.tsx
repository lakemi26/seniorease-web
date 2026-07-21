'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/presentation/components/ui/Card'
import { Button } from '@/presentation/components/ui/Button'
import { HelpCircle } from 'lucide-react'

interface HelpCardProps {
  hasActivities?: boolean
}

export function HelpCard({ hasActivities = false }: HelpCardProps) {
  const router = useRouter()

  return (
    <section aria-labelledby="help-heading">
      <Card variant="outlined" padding="normal" className="bg-primary-lighter">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 id="help-heading" className="text-base font-semibold text-text">
              Precisa de ajuda?
            </h3>
            <p className="text-sm text-text-secondary mt-1 mb-4">
              {hasActivities
                ? 'Veja orientações para criar, acompanhar ou concluir uma atividade.'
                : 'Comece adicionando sua primeira atividade. O SeniorEase vai orientar você em cada etapa.'}
            </p>
            <Button variant="primary" size="normal" onClick={() => router.push('/ajuda')}>
              Abrir ajuda
            </Button>
          </div>
        </div>
      </Card>
    </section>
  )
}
