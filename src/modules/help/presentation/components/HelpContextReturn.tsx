'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/presentation/components/ui/Button'
import { ALLOWED_ORIGINS, ORIGIN_LABELS, type AllowedOrigin } from '../../data/help-content'

interface HelpContextReturnProps {
  origin: string | null
}

export function HelpContextReturn({ origin }: HelpContextReturnProps) {
  const router = useRouter()

  if (!origin) return null

  const normalizedOrigin = origin.toLowerCase() as AllowedOrigin
  const isValidOrigin = ALLOWED_ORIGINS.includes(normalizedOrigin)

  if (!isValidOrigin) return null

  const originLabel = ORIGIN_LABELS[normalizedOrigin]
  const originRoutes: Record<AllowedOrigin, string> = {
    dashboard: '/dashboard',
    atividades: '/atividades',
    calendario: '/calendario',
    historico: '/historico',
    perfil: '/perfil',
    personalizacao: '/configuracoes',
    execucao: '/atividades',
  }

  const route = originRoutes[normalizedOrigin]

  return (
    <nav aria-label="Retorno ao contexto anterior">
      <Button
        variant="ghost"
        size="normal"
        onClick={() => router.push(route)}
        icon={<ArrowLeft className="w-4 h-4" aria-hidden="true" />}
        aria-label={`Voltar para ${originLabel}`}
      >
        Voltar para {originLabel}
      </Button>
    </nav>
  )
}
