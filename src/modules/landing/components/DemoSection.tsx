'use client'

import { Container } from '@/presentation/components/layout/Container'
import { Section } from '@/presentation/components/layout/Section'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { AccessibilityControl } from '@/presentation/components/accessibility/AccessibilityControl'
import { Card } from '@/presentation/components/ui/Card'
import { Button } from '@/presentation/components/ui/Button'
import { DemoAccessibilityProvider } from '@/presentation/providers/DemoAccessibilityProvider'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { cn } from '@/shared/utils/cn'

function DemoPreviewCard() {
  const { fontSize, contrast, spacing, interface: interfaceMode } = useAccessibility()

  const sizeMap: Record<string, { title: string; body: string; detail: string }> = {
    normal: { title: 'text-xl', body: 'text-base', detail: 'text-sm' },
    large: { title: 'text-2xl', body: 'text-lg', detail: 'text-base' },
    'x-large': { title: 'text-3xl', body: 'text-xl', detail: 'text-lg' },
  }

  const sizes = sizeMap[fontSize] ?? sizeMap.normal

  const cardBg = contrast === 'dark' ? 'bg-[#161B22]' : contrast === 'high' ? 'bg-white' : 'bg-surface'
  const cardText = contrast === 'dark' ? 'text-[#E6EDF3]' : contrast === 'high' ? 'text-black' : 'text-text'
  const cardBorder = contrast === 'dark' ? 'border-[#30363D]' : contrast === 'high' ? 'border-black' : 'border-border'
  const secondaryText = contrast === 'dark' ? 'text-[#B0B8C4]' : contrast === 'high' ? 'text-[#1A1A1A]' : 'text-text-secondary'
  const mutedText = contrast === 'dark' ? 'text-[#8B949E]' : contrast === 'high' ? 'text-[#2D2D2D]' : 'text-text-muted'
  const successClass = contrast === 'dark' ? 'bg-[#1A2E24] text-[#4CAF7C]' : contrast === 'high' ? 'bg-[#E8F5EF] text-[#005A00]' : 'bg-secondary-light text-success'
  const buttonPrimary = contrast === 'dark' ? 'bg-[#58A6FF] text-white' : ''
  const buttonGhost = contrast === 'dark' ? 'text-[#B0B8C4] hover:text-[#E6EDF3]' : ''

  const cardGap = spacing === 'wide' ? 'gap-6' : 'gap-4'
  const innerPadding = spacing === 'wide' ? 'p-6' : 'p-4'
  const btnGap = spacing === 'wide' ? 'gap-4' : 'gap-3'

  return (
    <div className="w-full lg:w-1/2" aria-live="polite" aria-atomic="true">
      <Card variant="elevated" padding="normal" className={cn('h-full transition-all duration-normal', cardBg, cardText, cardBorder)}>
        <div className={cn('flex flex-col', cardGap, innerPadding)}>
          <h3 className={cn(sizes.title, 'font-bold')}>
            Consulta médica
          </h3>
          <p className={cn(sizes.body, secondaryText)}>
            Hoje, às 15h
          </p>

          {interfaceMode === 'complete' && (
            <div className={cn('flex items-center gap-2 p-3 rounded-md', successClass)}>
              <span className="w-2 h-2 rounded-full bg-secondary shrink-0" aria-hidden="true" />
              <span className={cn(sizes.detail, 'font-medium')}>
                Compromisso confirmado
              </span>
            </div>
          )}

          <div className={cn('flex', btnGap, 'mt-2')}>
            <Button variant="primary" size="normal" className={buttonPrimary}>
              Ver detalhes
            </Button>
            {interfaceMode === 'complete' && (
              <Button variant="ghost" size="normal" className={buttonGhost}>
                Reagendar
              </Button>
            )}
          </div>

          {interfaceMode === 'basic' && (
            <p className={cn(sizes.detail, mutedText, 'mt-2')}>
              Toque em &ldquo;Ver detalhes&rdquo; para mais informações.
            </p>
          )}
        </div>
      </Card>
    </div>
  )
}

export function DemoSection() {
  return (
    <Section id="demonstracao" bgColor="default" ariaLabel="Demonstração de personalização">
      <Container maxWidth="xl">
        <SectionHeader
          title="Personalize sua experiência"
          subtitle="Veja como as configurações alteram a aparência da plataforma."
        />
        <DemoAccessibilityProvider>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2">
              <AccessibilityControl />
            </div>
            <DemoPreviewCard />
          </div>
        </DemoAccessibilityProvider>
      </Container>
    </Section>
  )
}
