'use client'

import { useRouter } from 'next/navigation'
import { Plus, ListTodo, HelpCircle, Calendar, History } from 'lucide-react'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'

interface ActionItem {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

const baseActions: ActionItem[] = [
  { icon: <Plus className="w-6 h-6" aria-hidden="true" />, title: 'Nova atividade', description: 'Criar uma nova atividade', href: '/atividades?modal=nova' },
  { icon: <ListTodo className="w-6 h-6" aria-hidden="true" />, title: 'Minhas atividades', description: 'Ver todas as atividades', href: '/atividades' },
  { icon: <HelpCircle className="w-6 h-6" aria-hidden="true" />, title: 'Abrir ajuda', description: 'Tirar dúvidas', href: '/ajuda' },
]

const completeActions: ActionItem[] = [
  ...baseActions.slice(0, 2),
  { icon: <Calendar className="w-6 h-6" aria-hidden="true" />, title: 'Calendário', description: 'Ver cronograma mensal', href: '/calendario' },
  { icon: <History className="w-6 h-6" aria-hidden="true" />, title: 'Histórico', description: 'Atividades concluídas', href: '/historico' },
  { icon: <HelpCircle className="w-6 h-6" aria-hidden="true" />, title: 'Ajustar experiência', description: 'Preferências de acesso', href: '/configuracoes' },
]

interface QuickActionsProps {
  onAddActivity?: () => void
}

export function QuickActions({ onAddActivity }: QuickActionsProps) {
  const router = useRouter()
  const { interface: interfaceMode } = useAccessibility()

  const actions = interfaceMode === 'complete' ? completeActions : baseActions

  return (
    <section aria-labelledby="quick-actions-heading">
      <SectionHeader
        title="Ações rápidas"
        align="left"
        className="mb-3"
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => {
          const isNewActivity = action.href === '/atividades?modal=nova'
          return (
            <button
              key={action.href}
              type="button"
              onClick={() => {
                if (isNewActivity && onAddActivity) {
                  onAddActivity()
                } else {
                  router.push(action.href)
                }
              }}
              className="flex items-start gap-4 p-4 rounded-lg border border-border bg-surface hover:bg-primary-lighter hover:border-primary/30 transition-all duration-normal text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center flex-shrink-0 text-primary">
                {action.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text">{action.title}</p>
                <p className="text-xs text-text-muted mt-0.5">{action.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
