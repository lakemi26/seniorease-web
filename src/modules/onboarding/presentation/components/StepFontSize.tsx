'use client'

import { useEffect, useRef } from 'react'
import { PreferenceOptionCard } from '@/presentation/components/ui/PreferenceOptionCard'

type FontSizeOption = 'normal' | 'large' | 'extraLarge'

interface StepFontSizeProps {
  value: FontSizeOption
  onChange: (value: FontSizeOption) => void
}

const fontSizeOptions: { value: FontSizeOption; label: string; sample: string; sampleClass: string }[] = [
  { value: 'normal', label: 'Normal', sample: 'Acompanhe suas atividades.', sampleClass: 'text-sm' },
  { value: 'large', label: 'Grande', sample: 'Acompanhe suas atividades.', sampleClass: 'text-lg' },
  { value: 'extraLarge', label: 'Muito grande', sample: 'Acompanhe suas atividades.', sampleClass: 'text-xl' },
]

export function StepFontSize({ value, onChange }: StepFontSizeProps) {
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
        Qual tamanho de texto fica mais confortável?
      </h2>

      <fieldset className="space-y-3">
        <legend className="sr-only">Opções de tamanho de texto</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {fontSizeOptions.map((option) => (
            <PreferenceOptionCard
              key={option.value}
              label={option.label}
              selected={value === option.value}
              onClick={() => onChange(option.value)}
              sampleText={option.sample}
              sampleClassName={option.sampleClass}
            />
          ))}
        </div>
      </fieldset>
    </div>
  )
}
