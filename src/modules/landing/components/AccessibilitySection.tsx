import { Type, ContrastIcon, Maximize, Keyboard, Layout, EyeOff, MessageCircle, AlertTriangle } from 'lucide-react'
import { Container } from '@/presentation/components/layout/Container'
import { Section } from '@/presentation/components/layout/Section'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { Card } from '@/presentation/components/ui/Card'
import { accessibilityFeatures } from '@/modules/landing/data/accessibilityFeatures'

function DynamicIcon({ icon }: { icon: string }) {
  const iconSize = 'w-6 h-6'
  switch (icon) {
    case 'Type':
      return <Type className={iconSize} aria-hidden="true" />
    case 'Contrast':
      return <ContrastIcon className={iconSize} aria-hidden="true" />
    case 'Maximize':
      return <Maximize className={iconSize} aria-hidden="true" />
    case 'Keyboard':
      return <Keyboard className={iconSize} aria-hidden="true" />
    case 'Layout':
      return <Layout className={iconSize} aria-hidden="true" />
    case 'EyeOff':
      return <EyeOff className={iconSize} aria-hidden="true" />
    case 'MessageCircle':
      return <MessageCircle className={iconSize} aria-hidden="true" />
    case 'AlertTriangle':
      return <AlertTriangle className={iconSize} aria-hidden="true" />
    default:
      return null
  }
}

export function AccessibilitySectionComponent() {
  return (
    <Section id="acessibilidade" bgColor="default" ariaLabel="Recursos de acessibilidade">
      <Container maxWidth="xl">
        <SectionHeader
          title="Uma experiência que se adapta a você."
          subtitle="Recursos pensados para tornar o uso da plataforma mais confortável e acessível para todos."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessibilityFeatures.map(feature => (
            <Card key={feature.title} as="article" variant="default" padding="normal">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-light text-primary shrink-0" aria-hidden="true">
                  <DynamicIcon icon={feature.icon} />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-text">{feature.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
