'use client'

import { HelpCircle } from 'lucide-react'
import { Button } from '@/presentation/components/ui/Button'
import { cn } from '@/shared/utils/cn'
import type { AllowedOrigin } from '../../data/help-content'

interface ContextualHelpLinkProps {
  articleSlug?: string
  origin?: AllowedOrigin
  label?: string
  className?: string
}

export function ContextualHelpLink({
  articleSlug,
  origin,
  label = 'Preciso de ajuda',
  className,
}: ContextualHelpLinkProps) {
  const params = new URLSearchParams()
  if (articleSlug) params.set('artigo', articleSlug)
  if (origin) params.set('origem', origin)

  const href = `/ajuda${params.toString() ? `?${params.toString()}` : ''}`

  return (
    <Button
      variant="ghost"
      size="normal"
      icon={<HelpCircle className="w-4 h-4" aria-hidden="true" />}
      className={cn('text-text-muted hover:text-text', className)}
      aria-label={label}
      onClick={() => {
        window.location.href = href
      }}
    >
      {label}
    </Button>
  )
}
