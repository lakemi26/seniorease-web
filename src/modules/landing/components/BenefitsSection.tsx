import { CheckSquare, ArrowRightCircle, Sliders, Shield } from 'lucide-react'
import { Container } from '@/presentation/components/layout/Container'
import { Section } from '@/presentation/components/layout/Section'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { FeatureCard } from '@/presentation/components/ui/FeatureCard'
import { benefits } from '@/modules/landing/data/benefits'

const iconMap: Record<string, React.ReactNode> = {
  CheckSquare: <CheckSquare className="w-6 h-6" />,
  ArrowRightCircle: <ArrowRightCircle className="w-6 h-6" />,
  Sliders: <Sliders className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
}

export function BenefitsSection() {
  return (
    <Section id="recursos" bgColor="default" ariaLabel="Recursos">
      <Container maxWidth="xl">
        <SectionHeader
          title="Feito para facilitar"
          subtitle="Funcionalidades pensadas para tornar a organização da sua rotina mais simples e acessível."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map(benefit => (
            <FeatureCard
              key={benefit.title}
              icon={iconMap[benefit.icon]}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
