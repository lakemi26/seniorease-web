'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, ListTodo, Calendar, History, HelpCircle, Settings, User } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { useAccessibility } from '@/presentation/hooks/useAccessibility'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

const baseNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Início', icon: <Home className="w-5 h-5" aria-hidden="true" /> },
  { href: '/atividades', label: 'Atividades', icon: <ListTodo className="w-5 h-5" aria-hidden="true" /> },
  { href: '/perfil', label: 'Perfil', icon: <User className="w-5 h-5" aria-hidden="true" /> },
  { href: '/ajuda', label: 'Ajuda', icon: <HelpCircle className="w-5 h-5" aria-hidden="true" /> },
]

const completeNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Início', icon: <Home className="w-5 h-5" aria-hidden="true" /> },
  { href: '/atividades', label: 'Atividades', icon: <ListTodo className="w-5 h-5" aria-hidden="true" /> },
  { href: '/calendario', label: 'Calendário', icon: <Calendar className="w-5 h-5" aria-hidden="true" /> },
  { href: '/historico', label: 'Histórico', icon: <History className="w-5 h-5" aria-hidden="true" /> },
  { href: '/perfil', label: 'Perfil', icon: <User className="w-5 h-5" aria-hidden="true" /> },
  { href: '/ajuda', label: 'Ajuda', icon: <HelpCircle className="w-5 h-5" aria-hidden="true" /> },
  { href: '/configuracoes', label: 'Configurações', icon: <Settings className="w-5 h-5" aria-hidden="true" /> },
]

export function Sidebar() {
  const pathname = usePathname()
  const { interface: interfaceMode } = useAccessibility()

  const navItems = interfaceMode === 'complete' ? completeNavItems : baseNavItems

  return (
    <aside
      className="hidden md:flex md:flex-col md:w-60 lg:w-72 bg-surface border-r border-border h-[calc(100vh-4rem)] sticky top-16"
      aria-label="Navegação principal"
    >
      <nav className="flex-1 py-4 px-3 space-y-1" aria-label="Seções do painel">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-normal',
                'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                isActive
                  ? 'bg-primary-lighter text-primary'
                  : 'text-text-secondary hover:bg-primary-light hover:text-primary'
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
