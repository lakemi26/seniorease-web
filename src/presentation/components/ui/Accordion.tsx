'use client'

import { useState, useCallback, useId, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

interface AccordionItem {
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  className?: string
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const baseId = useId()
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([])

  const toggleItem = useCallback(
    (index: number) => {
      setOpenItems(prev => {
        const next = new Set(prev)
        if (next.has(index)) {
          next.delete(index)
        } else {
          if (!allowMultiple) {
            next.clear()
          }
          next.add(index)
        }
        return next
      })
    },
    [allowMultiple]
  )

  const openItem = useCallback(
    (index: number) => {
      setOpenItems(prev => {
        if (prev.has(index)) return prev
        const next = new Set(prev)
        if (!allowMultiple) {
          next.clear()
        }
        next.add(index)
        return next
      })
    },
    [allowMultiple]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleItem(index)
        return
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        const nextIndex = e.key === 'ArrowDown'
          ? Math.min(index + 1, items.length - 1)
          : Math.max(index - 1, 0)
        if (nextIndex !== index) {
          buttonRefs.current[nextIndex]?.focus()
          openItem(nextIndex)
        }
        return
      }

      if (e.key === 'Home') {
        e.preventDefault()
        buttonRefs.current[0]?.focus()
        openItem(0)
        return
      }

      if (e.key === 'End') {
        e.preventDefault()
        buttonRefs.current[items.length - 1]?.focus()
        openItem(items.length - 1)
        return
      }

      if (e.key === 'Escape') {
        setOpenItems(new Set())
        return
      }
    },
    [toggleItem, openItem, items.length]
  )

  return (
    <div
      className={cn('flex flex-col gap-2', className)}
      role="region"
      aria-label="Perguntas frequentes"
    >
      {items.map((item, index) => {
        const isOpen = openItems.has(index)
        const headingId = `${baseId}-heading-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <div
            key={index}
            className="border border-border rounded-lg overflow-hidden"
          >
            <h3>
              <button
                ref={el => { buttonRefs.current[index] = el }}
                id={headingId}
                className="flex items-center justify-between w-full px-5 py-4 text-left text-base font-medium text-text hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus transition-colors duration-normal cursor-pointer min-h-[2.75rem]"
                onClick={() => toggleItem(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-text-secondary shrink-0 transition-transform duration-normal',
                    isOpen && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
              className={cn(
                'px-5 pb-4 text-base text-text-secondary leading-relaxed',
                !isOpen && 'hidden'
              )}
            >
              {item.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}
