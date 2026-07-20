'use client'

import { useState, useCallback } from 'react'
import { Menu } from 'lucide-react'
import { NAV_LINKS } from '@/shared/constants'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { Button } from '@/presentation/components/ui/Button'
import { IconButton } from '@/presentation/components/ui/IconButton'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const openMenu = useCallback(() => setIsMobileMenuOpen(true), [])
  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  return (
    <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#hero"
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm"
          >
            <Logo />
          </a>

          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="px-3 py-2 text-base text-text-secondary hover:text-primary hover:bg-primary-light rounded-md transition-colors duration-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="normal" className="hidden md:inline-flex">
              Entrar
            </Button>
            <IconButton
              icon={<Menu className="w-6 h-6" aria-hidden="true" />}
              ariaLabel="Abrir menu"
              size="normal"
              className="md:hidden"
              onClick={openMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            />
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMenu}
        links={NAV_LINKS}
      />
    </header>
  )
}
