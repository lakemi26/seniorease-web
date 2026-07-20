'use client'

import { useAuth } from '@/presentation/hooks/useAuth'
import { AuthGuard } from '@/modules/authentication/presentation/components/AuthGuard'
import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'
import { Logo } from '@/presentation/components/layout/Logo'
import { LogOut, Settings, Bell } from 'lucide-react'
import Link from 'next/link'

function DashboardInner() {
  const { profile, signOut } = useAuth()

  async function handleSignOut() {
    await signOut()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <LiveRegion message="Dashboard carregado" />

      <header className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/dashboard"
              aria-label="Ir para o dashboard"
              className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
            >
              <Logo />
            </Link>

            <nav className="flex items-center gap-4" aria-label="Navegação do dashboard">
              <button
                type="button"
                aria-label="Notificações"
                className="p-2 rounded-md text-text-muted hover:text-text hover:bg-primary-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <Bell className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Configurações"
                className="p-2 rounded-md text-text-muted hover:text-text hover:bg-primary-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <Settings className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                aria-label="Sair"
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-text-muted hover:text-danger hover:bg-danger-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                <LogOut className="w-5 h-5" aria-hidden="true" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main
        id="main-content"
        className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-text">
              Olá, {profile?.name || 'usuário'}!
            </h1>
            <p className="text-text-secondary mt-1">
              {profile?.email}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-surface rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-text mb-2">
                Suas atividades
              </h2>
              <p className="text-text-muted text-sm">
                Você ainda não possui atividades cadastradas. Em breve você poderá gerenciar suas tarefas por aqui.
              </p>
            </div>

            <div className="bg-surface rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-text mb-2">
                Próximos compromissos
              </h2>
              <p className="text-text-muted text-sm">
                Nenhum compromisso agendado. As funcionalidades completas estarão disponíveis em breve.
              </p>
            </div>

            <div className="bg-surface rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-text mb-2">
                Preferências
              </h2>
              <p className="text-text-muted text-sm">
                Suas configurações de acessibilidade e experiência estão salvas. Você poderá ajustá-las a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} SeniorEase. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

export function DashboardContent() {
  return (
    <AuthGuard>
      <DashboardInner />
    </AuthGuard>
  )
}
