'use client'

import { Badge } from '@/presentation/components/ui/Badge'
import type { ActivityStatus } from '../../domain/entities'

const statusConfig: Record<ActivityStatus, { label: string; variant: 'success' | 'info' | 'warning' | 'neutral' }> = {
  pending: { label: 'A fazer', variant: 'info' },
  inProgress: { label: 'Em andamento', variant: 'warning' },
  completed: { label: 'Concluída', variant: 'success' },
  cancelled: { label: 'Cancelada', variant: 'neutral' },
}

export function ActivityStatusBadge({ status, isDelayed }: { status: ActivityStatus; isDelayed?: boolean }) {
  if (isDelayed && status === 'pending') {
    return <Badge variant="warning">Atrasada</Badge>
  }

  const config = statusConfig[status]
  return <Badge variant={config.variant}>{config.label}</Badge>
}
