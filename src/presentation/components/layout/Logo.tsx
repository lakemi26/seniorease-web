import { SITE_NAME } from '@/shared/constants'
import { cn } from '@/shared/utils/cn'

interface LogoProps {
  className?: string
  showIcon?: boolean
}

export function Logo({ className, showIcon = false }: LogoProps) {
  return (
    <span
      className={cn(
        'text-xl font-bold text-primary',
        className
      )}
      aria-label={`${SITE_NAME} - Página inicial`}
    >
      {showIcon && (
        <span className="inline-block mr-2" aria-hidden="true">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect width="24" height="24" rx="6" fill="#0D6B6E" />
            <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">
              S
            </text>
          </svg>
        </span>
      )}
      {SITE_NAME}
    </span>
  )
}
