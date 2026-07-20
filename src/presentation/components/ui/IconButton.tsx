import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type IconButtonSize = 'normal' | 'large'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode
  ariaLabel: string
  size?: IconButtonSize
}

const sizeStyles: Record<IconButtonSize, string> = {
  normal: 'w-11 h-11',
  large: 'w-14 h-14',
}

export function IconButton({
  icon,
  ariaLabel,
  size = 'normal',
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-text hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus transition-colors duration-normal cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        sizeStyles[size],
        className
      )}
      aria-label={ariaLabel}
      {...props}
    >
      {icon}
    </button>
  )
}
