'use client'

import { type FormEvent, useEffect, useId, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

interface HelpSearchProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  className?: string
}

export function HelpSearch({
  value,
  onChange,
  onSubmit,
  placeholder = 'Exemplo: como criar uma atividade',
  className,
}: HelpSearchProps) {
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [localValue, setLocalValue] = useState(value)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleChange = (newValue: string) => {
    setLocalValue(newValue)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onChange(newValue)
    }, 300)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    onChange(localValue)
    onSubmit?.(localValue)
  }

  const handleClear = () => {
    setLocalValue('')
    if (debounceRef.current) clearTimeout(debounceRef.current)
    onChange('')
    inputRef.current?.focus()
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn('relative', className)}
    >
      <label htmlFor={inputId} className="sr-only">
        Buscar uma orientação
      </label>
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            'w-full pl-12 pr-12 py-3.5 text-base rounded-xl border-2 border-border bg-surface text-text',
            'placeholder:text-text-muted',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus focus-visible:border-primary',
            'transition-colors duration-normal',
            'min-h-[3.25rem]',
          )}
        />
        {localValue && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Limpar busca"
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2',
              'p-1.5 rounded-md text-text-muted hover:text-text hover:bg-primary-light',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
              'transition-colors duration-normal',
            )}
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </form>
  )
}
