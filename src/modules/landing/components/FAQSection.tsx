import { Container } from '@/presentation/components/layout/Container'
import { Section } from '@/presentation/components/layout/Section'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { Accordion } from '@/presentation/components/ui/Accordion'
import { faqQuestions } from '@/modules/landing/data/faq'

export function FAQSection() {
  return (
    <Section id="ajuda" bgColor="primary-light" ariaLabel="Perguntas frequentes">
      <Container maxWidth="md">
        <SectionHeader
          title="Perguntas frequentes"
          subtitle="Dúvidas comuns sobre o SeniorEase."
        />
        <Accordion
          items={faqQuestions.map(q => ({ title: q.question, content: q.answer }))}
        />
      </Container>
    </Section>
  )
}
