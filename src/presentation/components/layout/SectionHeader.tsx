import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type SectionHeaderAlign = 'center' | 'left'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: SectionHeaderAlign
  className?: string
  children?: ReactNode
}

export function SectionHeader({
  title,
  subtitle,
  align = 'center',
  className,
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 mb-10 md:mb-14',
        align === 'center' && 'items-center text-center',
        align === 'left' && 'items-start text-left',
        className
      )}
    >
      <h2 className="text-[var(--font-size-heading-2)] font-bold text-text leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--font-size-body)] text-text-secondary max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  )
}
