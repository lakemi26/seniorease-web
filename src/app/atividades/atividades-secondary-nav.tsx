'use client'

import Link from 'next/link'
import { Calendar, History } from 'lucide-react'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'

export function AtividadesSecondaryNav() {
  const { interface: interfaceMode } = useAccessibility()

  if (interfaceMode === 'complete') {
    return null
  }

  return (
    <nav className="flex items-center gap-4 mb-6 pb-4 border-b border-border" aria-label="Navegação secundária">
      <Link
        href="/calendario"
        className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
      >
        <Calendar className="w-4 h-4" aria-hidden="true" />
        Calendário
      </Link>
      <Link
        href="/historico"
        className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
      >
        <History className="w-4 h-4" aria-hidden="true" />
        Histórico
      </Link>
    </nav>
  )
}
