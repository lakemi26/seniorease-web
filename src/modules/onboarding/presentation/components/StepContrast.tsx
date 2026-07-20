'use client'

import { useEffect, useRef } from 'react'
import { RadioCardGroup } from '@/presentation/components/ui/RadioCardGroup'
import { PreviewPanel } from '@/presentation/components/ui/PreviewPanel'

type ContrastOption = 'default' | 'high' | 'dark'
type SpacingOption = 'normal' | 'expanded'

interface StepContrastProps {
  contrast: ContrastOption
  spacing: SpacingOption
  onContrastChange: (value: ContrastOption) => void
  onSpacingChange: (value: SpacingOption) => void
}

export function StepContrast({
  contrast,
  spacing,
  onContrastChange,
  onSpacingChange,
}: StepContrastProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <h2
        ref={headingRef}
        className="text-2xl font-bold text-text focus-visible:outline-none"
        tabIndex={-1}
      >
        Como você prefere visualizar a tela?
      </h2>

      <RadioCardGroup
        name="contrast"
        legend="Opções de contraste"
        value={contrast}
        onChange={onContrastChange}
        options={[
          { value: 'default' as ContrastOption, label: 'Padrão', description: 'Cores suaves e agradáveis' },
          { value: 'high' as ContrastOption, label: 'Alto contraste', description: 'Maior diferença entre texto e fundo' },
          { value: 'dark' as ContrastOption, label: 'Escuro', description: 'Fundo escuro para reduzir o cansaço visual' },
        ]}
      />

      <RadioCardGroup
        name="spacing"
        legend="Opções de espaçamento"
        value={spacing}
        onChange={onSpacingChange}
        options={[
          { value: 'normal' as SpacingOption, label: 'Normal', description: 'Espaçamento padrão entre elementos' },
          { value: 'expanded' as SpacingOption, label: 'Ampliado', description: 'Mais espaço entre linhas e elementos' },
        ]}
      />

      <div className="pt-2">
        <p className="text-sm font-medium text-text mb-3">Pré-visualização:</p>
        <PreviewPanel />
      </div>
    </div>
  )
}
