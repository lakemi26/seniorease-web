'use client'

import { useEffect, useRef } from 'react'
import { RadioCardGroup } from '@/presentation/components/ui/RadioCardGroup'

type InterfaceOption = 'basic' | 'complete'

interface StepInterfaceModeProps {
  value: InterfaceOption
  onChange: (value: InterfaceOption) => void
}

export function StepInterfaceMode({ value, onChange }: StepInterfaceModeProps) {
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
        Quanto conteúdo você prefere ver?
      </h2>

      <RadioCardGroup
        name="interfaceMode"
        legend="Modo da interface"
        value={value}
        onChange={onChange}
        options={[
          {
            value: 'basic' as InterfaceOption,
            label: 'Modo básico',
            description: 'Mostra somente as informações e ações mais importantes.',
          },
          {
            value: 'complete' as InterfaceOption,
            label: 'Modo completo',
            description: 'Mostra recursos adicionais, filtros e informações detalhadas.',
          },
        ]}
      />
    </div>
  )
}
