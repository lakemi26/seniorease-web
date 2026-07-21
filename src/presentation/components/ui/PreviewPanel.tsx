'use client'

import { useAccessibility } from '@/presentation/hooks/useAccessibility'
import { cn } from '@/shared/utils/cn'

interface PreviewPanelProps {
  className?: string
}

export function PreviewPanel({ className }: PreviewPanelProps) {
  const { fontSize, contrast, spacing, interface: interfaceMode } = useAccessibility()

  const fontSizeClass = fontSize === 'large' ? 'text-xl' : fontSize === 'x-large' ? 'text-2xl' : 'text-base'
  const bgClass = contrast === 'dark' ? 'bg-[#161B22] text-[#E6EDF3]' : contrast === 'high' ? 'bg-white text-black' : 'bg-primary-lighter text-text'
  const spacingClass = spacing === 'wide' ? 'leading-relaxed' : 'leading-normal'

  return (
    <div
      className={cn(
        'rounded-lg border border-border p-6 space-y-3 transition-all duration-normal',
        bgClass,
        spacingClass,
        className
      )}
      aria-label="Pré-visualização das configurações"
    >
      <p className={cn('font-bold', fontSizeClass)}>
        {interfaceMode === 'basic' ? 'Suas atividades' : 'Suas atividades e compromissos'}
      </p>
      <p className={cn('opacity-80', fontSizeClass)}>
        {interfaceMode === 'basic'
          ? 'Acompanhe suas tarefas principais.'
          : 'Acompanhe suas tarefas, compromissos, lembretes e metas diárias.'}
      </p>
      <div className={cn(
        'flex gap-2',
        interfaceMode === 'basic' ? '' : 'flex-wrap'
      )}>
        <span className={cn(
          'px-2 py-1 rounded text-xs font-medium',
          contrast === 'dark' ? 'bg-[#0D2D4A] text-[#58A6FF]' : 'bg-primary-light text-primary-dark'
        )}>
          {interfaceMode === 'basic' ? 'Tarefas' : 'Tarefas · Eventos · Metas'}
        </span>
      </div>
      <button
        type="button"
        className={cn(
          'px-4 py-2 rounded-md text-sm font-medium transition-colors',
          contrast === 'dark'
            ? 'bg-[#58A6FF] text-white'
            : 'bg-primary text-white'
        )}
        disabled
        aria-hidden="true"
      >
        {interfaceMode === 'basic' ? 'Ver tarefas' : 'Gerenciar atividades'}
      </button>
    </div>
  )
}
