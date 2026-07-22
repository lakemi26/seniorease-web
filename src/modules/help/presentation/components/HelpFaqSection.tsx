'use client'

import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { Accordion } from '@/presentation/components/ui/Accordion'
import type { HelpFaqItem } from '../../data/help-content'

interface HelpFaqSectionProps {
  items: HelpFaqItem[]
}

export function HelpFaqSection({ items }: HelpFaqSectionProps) {
  if (items.length === 0) return null

  const accordionItems = items.map((item) => ({
    title: item.question,
    content: item.answer,
  }))

  return (
    <section aria-labelledby="faq-heading">
      <SectionHeader
        title="Perguntas frequentes"
        subtitle="Respostas rápidas para as dúvidas mais comuns."
        align="left"
        className="mb-4"
      />
      <Accordion items={accordionItems} allowMultiple />
    </section>
  )
}
