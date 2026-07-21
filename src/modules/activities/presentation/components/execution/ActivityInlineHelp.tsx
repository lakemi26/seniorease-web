'use client'

import { Lightbulb } from 'lucide-react'

interface ActivityInlineHelpProps {
  message?: string
}

export function ActivityInlineHelp({ message }: ActivityInlineHelpProps) {
  if (!message) return null

  return (
    <div
      role="complementary"
      aria-label="Ajuda"
      className="flex items-start gap-3 p-4 rounded-md bg-accent-light border border-accent/20"
    >
      <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-sm text-text-secondary">{message}</p>
    </div>
  )
}
