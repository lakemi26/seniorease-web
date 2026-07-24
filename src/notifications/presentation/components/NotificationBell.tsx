'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useNotifications } from '../hooks/useNotifications'
import { IconButton } from '@/presentation/components/ui/IconButton'
import { NotificationsPopover } from './NotificationsPopover'

export function NotificationBell() {
  const { unreadCount } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const label = unreadCount > 0
    ? `Notificações, ${unreadCount > 99 ? '99+' : unreadCount} não lidas`
    : 'Notificações'

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleViewAll = useCallback(() => {
    close()
    router.push('/notificacoes')
  }, [close, router])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, close])

  return (
    <div ref={containerRef} className="relative">
      <IconButton
        icon={
          <span className="relative">
            <Bell className="w-5 h-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-white text-[10px] font-bold leading-none"
                aria-hidden="true"
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </span>
        }
        ariaLabel={label}
        aria-expanded={isOpen}
        aria-controls="notifications-popover"
        size="normal"
        className="text-text-muted hover:text-text hover:bg-primary-light"
        onClick={toggle}
      />

      {isOpen && (
        <NotificationsPopover
          onClose={close}
          onViewAll={handleViewAll}
        />
      )}
    </div>
  )
}
