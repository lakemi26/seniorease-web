'use client'

import { useEffect, useState } from 'react'

interface LiveRegionProps {
  message: string
  priority?: 'polite' | 'assertive'
}

export function LiveRegion({ message, priority = 'polite' }: LiveRegionProps) {
  const [announce, setAnnounce] = useState('')

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setAnnounce(message), 50)
      return () => clearTimeout(timeout)
    }
  }, [message])

  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {announce}
    </div>
  )
}
