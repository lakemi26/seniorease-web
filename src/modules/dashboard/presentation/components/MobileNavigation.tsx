'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, ListTodo, HelpCircle, Plus, User } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

const mobileNavItems = [
  { href: '/dashboard', label: 'Início', icon: <Home className="w-5 h-5" aria-hidden="true" /> },
  { href: '/atividades', label: 'Atividades', icon: <ListTodo className="w-5 h-5" aria-hidden="true" /> },
  { href: '/atividades?modal=nova', label: 'Nova', icon: <Plus className="w-5 h-5" aria-hidden="true" /> },
  { href: '/ajuda', label: 'Ajuda', icon: <HelpCircle className="w-5 h-5" aria-hidden="true" /> },
  { href: '/perfil', label: 'Perfil', icon: <User className="w-5 h-5" aria-hidden="true" /> },
]

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-40"
      aria-label="Navegação mobile"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <ul className="flex items-center justify-around h-16" role="list">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-normal min-w-[3.5rem] min-h-[3rem]',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
                  isActive
                    ? 'text-primary'
                    : 'text-text-muted hover:text-text'
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
