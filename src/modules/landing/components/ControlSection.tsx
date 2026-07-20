'use client'

import { CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react'
import { Container } from '@/presentation/components/layout/Container'
import { Section } from '@/presentation/components/layout/Section'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { Card } from '@/presentation/components/ui/Card'
import { Button } from '@/presentation/components/ui/Button'
import { Badge } from '@/presentation/components/ui/Badge'

const feedbackExamples = [
  {
    icon: <CheckCircle className="w-5 h-5 text-success" aria-hidden="true" />,
    text: 'Atividade salva com sucesso.',
    badge: <Badge variant="success">Sucesso</Badge>,
  },
  {
    icon: <ArrowRight className="w-5 h-5 text-primary" aria-hidden="true" />,
    text: 'Etapa concluída.',
    badge: <Badge variant="info">Info</Badge>,
  },
]

function ConfirmationDialog() {
  return (
    <Card
      variant="outlined"
      padding="normal"
      className="border-2 border-danger/20"
      aria-label="Confirmação de exclusão"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-danger shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium text-text">Deseja realmente excluir esta atividade?</p>
            <p className="text-sm text-text-secondary mt-1">Esta ação não poderá ser desfeita.</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" size="normal">
            Voltar
          </Button>
          <Button
            variant="primary"
            size="normal"
            className="hover:bg-red-700 focus-visible:bg-red-700"
          >
            Sim, excluir
          </Button>
        </div>
      </div>
    </Card>
  )
}

export function ControlSection() {
  return (
    <Section id="controle" bgColor="primary-light" ariaLabel="Você está no controle">
      <Container maxWidth="xl">
        <SectionHeader
          title="Use a tecnologia com mais confiança."
          subtitle="O SeniorEase apresenta mensagens claras após cada ação, orienta você durante as atividades e solicita confirmação antes de alterações importantes."
          align="left"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {feedbackExamples.map((example, index) => (
            <Card key={index} variant="default" padding="normal">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  {example.icon}
                  {example.badge}
                </div>
                <p className="text-base text-text">{example.text}</p>
              </div>
            </Card>
          ))}
          <ConfirmationDialog />
        </div>
      </Container>
    </Section>
  )
}
