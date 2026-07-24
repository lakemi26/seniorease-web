'use client'

import { useRouter } from 'next/navigation'
import { BellOff } from 'lucide-react'
import { Button } from '@/presentation/components/ui/Button'

export function NotificationsDisabledState() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <BellOff className="w-12 h-12 text-text-muted mb-4" aria-hidden="true" />
      <h2 className="text-lg font-semibold text-text mb-1">Os lembretes estão desativados.</h2>
      <p className="text-sm text-text-muted max-w-sm mb-4">
        Você pode ativá-los na personalização da experiência.
      </p>
      <Button variant="primary" size="normal" onClick={() => router.push('/personalizacao')}>
        Abrir personalização
      </Button>
    </div>
  )
}
