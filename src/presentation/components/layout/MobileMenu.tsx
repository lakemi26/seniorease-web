'use client'

import { useEffect, useRef, useCallback } from 'react'
import { X } from 'lucide-react'
import type { NavLink } from '@/shared/types'
import { cn } from '@/shared/utils/cn'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const handleLinkClick = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/70 z-40 transition-opacity duration-normal',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        ref={menuRef}
        inert={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        id="mobile-menu"
        className={cn(
          'fixed inset-0 bg-surface z-50 shadow-elevated transform transition-transform duration-normal',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
          <span className="text-lg font-bold text-primary">SeniorEase</span>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="flex items-center justify-center w-11 h-11 rounded-md text-text hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-focus transition-colors cursor-pointer"
            aria-label="Fechar menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Navegação principal" className="p-4 bg-surface">
          <ul className="flex flex-col gap-1">
            {links.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block px-4 py-3 text-base text-text rounded-md hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-focus transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
