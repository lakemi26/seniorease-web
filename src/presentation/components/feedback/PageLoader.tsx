'use client'

import { LiveRegion } from '@/presentation/components/accessibility/LiveRegion'

interface PageLoaderProps {
  message?: string
}

export function PageLoader({ message = 'Carregando suas informações.' }: PageLoaderProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4"
      role="status"
      aria-live="polite"
    >
      <div
        className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"
        aria-hidden="true"
      />
      <p className="text-base text-text-secondary text-center">
        {message}
      </p>
      <LiveRegion message={message} />
    </div>
  )
}
