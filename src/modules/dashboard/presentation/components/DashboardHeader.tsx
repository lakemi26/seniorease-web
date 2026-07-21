'use client'

import { Bell, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { Logo } from '@/presentation/components/layout/Logo'
import { IconButton } from '@/presentation/components/ui/IconButton'
import { ProfileMenu } from './ProfileMenu'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Bom dia'
  if (hour < 18) return 'Boa tarde'
  return 'Boa noite'
}

function formatDate(): string {
  return new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

export function DashboardHeader() {
  const { interface: interfaceMode } = useAccessibility()

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          aria-label="Ir para o dashboard"
          className="flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
        >
          <Logo />
        </Link>

        <nav className="flex items-center gap-2" aria-label="Ações do dashboard">
          <p className="hidden md:block text-xs text-text-muted mr-2">
            {formatDate()}
          </p>

          {interfaceMode === 'complete' && (
            <IconButton
              icon={<Bell className="w-5 h-5" aria-hidden="true" />}
              ariaLabel="Notificações"
              size="normal"
              className="text-text-muted hover:text-text hover:bg-primary-light"
            />
          )}

          <IconButton
            icon={<SlidersHorizontal className="w-5 h-5" aria-hidden="true" />}
            ariaLabel="Ajustar visual"
            size="normal"
            className="text-text-muted hover:text-text hover:bg-primary-light"
          />

          <ProfileMenu />
        </nav>
      </div>
    </header>
  )
}

export { getGreeting, formatDate }
