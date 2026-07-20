'use client'

import { Container } from '@/presentation/components/layout/Container'
import { Section } from '@/presentation/components/layout/Section'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { AccessibilityControl } from '@/presentation/components/accessibility/AccessibilityControl'
import { Card } from '@/presentation/components/ui/Card'
import { Button } from '@/presentation/components/ui/Button'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'

export function DemoSection() {
  const { interface: interfaceMode } = useAccessibility()

  return (
    <Section id="demonstracao" bgColor="default" ariaLabel="Demonstração de personalização">
      <Container maxWidth="xl">
        <SectionHeader
          title="Personalize sua experiência"
          subtitle="Veja como as configurações alteram a aparência da plataforma."
        />
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <AccessibilityControl />
          </div>
          <div className="w-full lg:w-1/2" aria-live="polite" aria-atomic="true">
            <Card variant="elevated" padding="normal" className="h-full">
              <div className="flex flex-col gap-4">
                <h3 className="text-[var(--font-size-heading-3)] font-bold text-text">
                  Consulta médica
                </h3>
                <p className="text-[var(--font-size-body)] text-text-secondary">
                  Hoje, às 15h
                </p>

                {interfaceMode === 'complete' && (
                  <div className="flex items-center gap-2 p-3 bg-secondary-light rounded-md">
                    <span className="w-2 h-2 rounded-full bg-secondary shrink-0" aria-hidden="true" />
                    <span className="text-sm text-success font-medium">
                      Compromisso confirmado
                    </span>
                  </div>
                )}

                <div className="flex gap-3 mt-2">
                  <Button variant="primary" size="normal">
                    Ver detalhes
                  </Button>
                  {interfaceMode === 'complete' && (
                    <Button variant="ghost" size="normal">
                      Reagendar
                    </Button>
                  )}
                </div>

                {interfaceMode === 'basic' && (
                  <p className="text-sm text-text-muted mt-2">
                    Toque em &ldquo;Ver detalhes&rdquo; para mais informações.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}
