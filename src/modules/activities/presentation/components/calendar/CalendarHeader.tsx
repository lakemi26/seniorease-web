'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/presentation/components/ui/Button'

interface CalendarHeaderProps {
  monthLabel: string
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
}

export function CalendarHeader({ monthLabel, onPrevious, onNext, onToday }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="normal" onClick={onPrevious} aria-label="Mês anterior">
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </Button>
        <h2 className="text-lg font-semibold text-text min-w-[180px] text-center">{monthLabel}</h2>
        <Button variant="ghost" size="normal" onClick={onNext} aria-label="Próximo mês">
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </Button>
      </div>
      <Button variant="outline" size="normal" onClick={onToday}>
        Hoje
      </Button>
    </div>
  )
}
