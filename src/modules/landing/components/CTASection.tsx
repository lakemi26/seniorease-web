import { Container } from '@/presentation/components/layout/Container'
import { Section } from '@/presentation/components/layout/Section'
import { Button } from '@/presentation/components/ui/Button'

export function CTASection() {
  return (
    <Section bgColor="default" ariaLabel="Chamada final">
      <Container maxWidth="xl">
        <div className="flex flex-col items-center text-center gap-6 py-6">
          <h2 className="text-[var(--font-size-heading-2)] font-bold text-text leading-tight max-w-2xl">
            Mais clareza para organizar sua rotina.
          </h2>
          <p className="text-[var(--font-size-body)] text-text-secondary max-w-xl leading-relaxed">
            Crie sua conta e configure o SeniorEase de acordo com as suas necessidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2">
            <Button variant="primary" size="large">
              Criar minha conta
            </Button>
            <Button variant="outline" size="large">
              Já tenho uma conta
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
