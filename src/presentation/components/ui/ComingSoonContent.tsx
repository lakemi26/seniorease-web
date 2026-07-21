'use client'

import type { ReactNode } from 'react'

interface ComingSoonContentProps {
  icon: ReactNode
  title: string
  description?: string
}

export function ComingSoonContent({ icon, title, description }: ComingSoonContentProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4 text-primary">
        {icon}
      </div>
      <h1 className="text-2xl font-bold text-text mb-2">{title}</h1>
      {description && (
        <p className="text-sm text-text-muted max-w-md leading-relaxed">{description}</p>
      )}
    </div>
  )
}
