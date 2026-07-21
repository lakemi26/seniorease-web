'use client'

import { useEffect, useRef, useCallback, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { IconButton } from './IconButton'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<Element | null>(null)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const dialog = dialogRef.current
        if (!dialog) return

        const focusableElements = dialog.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements.length === 0) return

        const first = focusableElements[0]
        const last = focusableElements[focusableElements.length - 1]

        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            event.preventDefault()
            first.focus()
          }
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'

      requestAnimationFrame(() => {
        dialogRef.current?.focus()
      })

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = ''
        if (previousActiveElement.current instanceof HTMLElement) {
          previousActiveElement.current.focus()
        }
      }
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="fixed inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-2xl mx-4 bg-surface rounded-lg shadow-elevated z-10 max-h-[calc(100vh-8rem)] overflow-y-auto focus-visible:outline-none"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 id="modal-title" className="text-lg font-semibold text-text">
            {title}
          </h2>
          <IconButton
            icon={<X className="w-5 h-5" aria-hidden="true" />}
            ariaLabel="Fechar"
            size="normal"
            onClick={onClose}
            className="text-text-muted hover:text-text hover:bg-primary-light"
          />
        </div>

        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  )
}
