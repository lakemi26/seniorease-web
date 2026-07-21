'use client'

import { cn } from '@/shared/utils/cn'
import type { UserPreferences } from '@/modules/authentication/domain/entities'
import { CheckCircle } from 'lucide-react'

interface PreferencesPreviewProps {
  draft: UserPreferences
  className?: string
}

export function PreferencesPreview({ draft, className }: PreferencesPreviewProps) {
  const isBasic = draft.interfaceMode === 'basic'
  const isHighContrast = draft.contrast === 'high'
  const isDark = draft.contrast === 'dark'

  const bgClass = isDark
    ? 'bg-[#161B22] text-[#E6EDF3]'
    : isHighContrast
      ? 'bg-white text-black'
      : 'bg-surface text-text'

  const cardBg = isDark
    ? 'bg-[#0D1117]'
    : isHighContrast
      ? 'bg-white border-2 border-black'
      : 'bg-primary-lighter'

  const borderClass = isHighContrast ? 'border-2 border-black' : 'border border-border'
  const statusClass = isHighContrast ? 'bg-green-700 text-white' : 'bg-secondary-light text-success'

  return (
    <section>
      <h2 className="text-lg font-semibold text-text mb-3">Veja como ficará</h2>
      <div
        className={cn(
          'rounded-lg p-6 space-y-4 transition-all duration-normal',
          bgClass,
          borderClass,
          draft.spacing === 'expanded' ? 'space-y-6' : 'space-y-4',
          className,
        )}
        aria-label="Pré-visualização"
      >
        <div className="space-y-1">
          <p className="font-bold text-base">Consulta médica</p>
          <p className="text-sm opacity-80">Hoje, às 15h</p>
        </div>

        <div
          className={cn(
            'rounded-lg p-4 space-y-3',
            cardBg,
          )}
        >
          <div className="flex items-center gap-2">
            <span className={cn('px-2 py-0.5 rounded text-xs font-medium', statusClass)}>
              A fazer
            </span>
            {!isBasic && (
              <span className="text-xs text-text-muted">Prioridade: Alta</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <span className="text-sm">
              {isBasic ? 'Preparar exames' : 'Preparar exames e documentação necessária'}
            </span>
          </div>

          {!isBasic && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm">Confirmar horário</span>
            </div>
          )}
        </div>

        <button
          type="button"
          disabled
          aria-hidden="true"
          className={cn(
            'px-4 py-2.5 rounded-md text-sm font-medium w-full sm:w-auto',
            isDark
              ? 'bg-[#58A6FF] text-white'
              : isHighContrast
                ? 'bg-[#005A5C] text-white'
                : 'bg-primary text-white',
          )}
        >
          Ver atividade
        </button>

        <div
          className={cn(
            'flex items-center gap-2 p-3 rounded-md text-sm',
            isDark
              ? 'bg-[#1A2E24] text-[#4CAF7C]'
              : isHighContrast
                ? 'bg-green-100 text-green-900 border border-green-700'
                : 'bg-secondary-light text-success',
          )}
        >
          <CheckCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Atividade salva com sucesso.</span>
        </div>
      </div>
    </section>
  )
}
