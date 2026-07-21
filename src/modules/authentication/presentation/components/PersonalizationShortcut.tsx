'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/presentation/components/ui/Card'
import { Button } from '@/presentation/components/ui/Button'
import { SlidersHorizontal } from 'lucide-react'

export function PersonalizationShortcut() {
  const router = useRouter()

  return (
    <Card as="section" aria-label="Minha experiência">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-text">Minha experiência</h2>
        <p className="text-sm text-text-muted">
          Ajuste o tamanho dos textos, o contraste e a forma como as informações são apresentadas.
        </p>
        <div>
          <Button
            variant="secondary"
            size="normal"
            icon={<SlidersHorizontal className="w-5 h-5" aria-hidden="true" />}
            onClick={() => router.push('/configuracoes')}
          >
            Personalizar minha experiência
          </Button>
        </div>
      </div>
    </Card>
  )
}
