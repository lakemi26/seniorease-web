'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '@/presentation/hooks/useAuth'

export function ProfileMenu() {
  const { user, profile, signOut } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuId = 'profile-menu'

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
    buttonRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        closeMenu()
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') closeMenu()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeMenu])

  const handleSelect = useCallback((action: () => void) => {
    closeMenu()
    action()
  }, [closeMenu])

  const displayName = profile?.name || user?.displayName
  const firstLetter = displayName?.charAt(0)?.toUpperCase() || 'U'

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-haspopup="true"
        aria-label="Menu do perfil"
        className="flex items-center gap-2 p-1.5 rounded-md hover:bg-primary-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      >
        <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold" aria-hidden="true">
          {firstLetter}
        </span>
        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-normal ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          aria-label="Menu do perfil"
          className="absolute right-0 top-full mt-2 w-64 bg-surface border border-border rounded-lg shadow-elevated z-50 py-2"
        >
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm font-semibold text-text truncate">{displayName || 'Usuário'}</p>
            <p className="text-xs text-text-muted truncate">{profile?.email || ''}</p>
          </div>

          <button
            type="button"
            role="menuitem"
            aria-current={pathname === '/perfil' ? 'page' : undefined}
            onClick={() => handleSelect(() => router.push('/perfil'))}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-primary-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <User className="w-4 h-4 text-text-muted" aria-hidden="true" />
            Perfil
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => handleSelect(() => router.push('/configuracoes'))}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-text hover:bg-primary-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          >
            <Settings className="w-4 h-4 text-text-muted" aria-hidden="true" />
            Configurações
          </button>

          <div className="border-t border-border mt-1 pt-1">
            <button
              type="button"
              role="menuitem"
              onClick={() => handleSelect(() => signOut())}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-danger hover:bg-danger-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
