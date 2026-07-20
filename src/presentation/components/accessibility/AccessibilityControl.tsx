'use client'

import { useState } from 'react'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { Button } from '@/presentation/components/ui/Button'
import { LiveRegion } from './LiveRegion'
import type { FontSize, ContrastMode, SpacingMode, InterfaceMode, MotionMode } from '@/shared/types'
import { cn } from '@/shared/utils/cn'

interface ControlGroupProps {
  label: string
  children: React.ReactNode
}

function ControlGroup({ label, children }: ControlGroupProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-text mb-1">{label}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  )
}

interface OptionButtonProps {
  selected: boolean
  onClick: () => void
  label: string
}

function OptionButton({ selected, onClick, label }: OptionButtonProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 text-sm rounded-md border transition-colors duration-normal cursor-pointer min-h-[2.5rem] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        selected
          ? 'bg-primary text-white border-primary'
          : 'bg-surface text-text-secondary border-border hover:border-primary hover:text-primary'
      )}
    >
      {label}
    </button>
  )
}

export function AccessibilityControl() {
  const {
    fontSize,
    setFontSize,
    contrast,
    setContrast,
    spacing,
    setSpacing,
    interface: interfaceMode,
    setInterface: setInterfaceMode,
    motion,
    setMotion,
    resetPreferences,
  } = useAccessibility()

  const [announcement, setAnnouncement] = useState('')

  const handleReset = () => {
    resetPreferences()
    setAnnouncement('Configurações restauradas para o padrão.')
  }

  const handleChange = (label: string) => {
    setAnnouncement(`Configuração alterada: ${label}`)
  }

  return (
    <div className="flex flex-col gap-6 p-6 bg-surface rounded-lg border border-border">
      <ControlGroup label="Tamanho do texto">
        {(['normal', 'large', 'x-large'] as FontSize[]).map(option => (
          <OptionButton
            key={option}
            selected={fontSize === option}
            onClick={() => {
              setFontSize(option)
              handleChange(`Tamanho do texto: ${option === 'normal' ? 'Normal' : option === 'large' ? 'Grande' : 'Muito grande'}`)
            }}
            label={option === 'normal' ? 'Normal' : option === 'large' ? 'Grande' : 'Muito grande'}
          />
        ))}
      </ControlGroup>

      <ControlGroup label="Contraste">
        {(['normal', 'high', 'dark'] as ContrastMode[]).map(option => (
          <OptionButton
            key={option}
            selected={contrast === option}
            onClick={() => {
              setContrast(option)
              handleChange(`Contraste: ${option === 'normal' ? 'Padrão' : option === 'high' ? 'Alto contraste' : 'Escuro'}`)
            }}
            label={option === 'normal' ? 'Padrão' : option === 'high' ? 'Alto contraste' : 'Escuro'}
          />
        ))}
      </ControlGroup>

      <ControlGroup label="Espaçamento">
        {(['normal', 'wide'] as SpacingMode[]).map(option => (
          <OptionButton
            key={option}
            selected={spacing === option}
            onClick={() => {
              setSpacing(option)
              handleChange(`Espaçamento: ${option === 'normal' ? 'Normal' : 'Ampliado'}`)
            }}
            label={option === 'normal' ? 'Normal' : 'Ampliado'}
          />
        ))}
      </ControlGroup>

      <ControlGroup label="Interface">
        {(['basic', 'complete'] as InterfaceMode[]).map(option => (
          <OptionButton
            key={option}
            selected={interfaceMode === option}
            onClick={() => {
              setInterfaceMode(option)
              handleChange(`Interface: ${option === 'basic' ? 'Modo básico' : 'Modo completo'}`)
            }}
            label={option === 'basic' ? 'Modo básico' : 'Modo completo'}
          />
        ))}
      </ControlGroup>

      <ControlGroup label="Movimento">
        {(['normal', 'reduced'] as MotionMode[]).map(option => (
          <OptionButton
            key={option}
            selected={motion === option}
            onClick={() => {
              setMotion(option)
              handleChange(`Movimento: ${option === 'normal' ? 'Animações ativadas' : 'Reduzir animações'}`)
            }}
            label={option === 'normal' ? 'Animações ativadas' : 'Reduzir animações'}
          />
        ))}
      </ControlGroup>

      <div className="pt-2">
        <Button variant="outline" size="normal" onClick={handleReset}>
          Restaurar configurações
        </Button>
      </div>

      <LiveRegion message={announcement} />
    </div>
  )
}
