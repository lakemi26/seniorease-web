import { Container } from '@/presentation/components/layout/Container'
import { Section } from '@/presentation/components/layout/Section'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { StepCard } from '@/presentation/components/ui/StepCard'
import { howItWorksSteps } from '@/modules/landing/data/howItWorks'

export function HowItWorksSection() {
  return (
    <Section id="como-funciona" bgColor="primary-light" ariaLabel="Como funciona">
      <Container maxWidth="xl">
        <SectionHeader
          title="Como funciona"
          subtitle="Em três etapas simples, você organiza sua rotina do seu jeito."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {howItWorksSteps.map(step => (
            <StepCard
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
