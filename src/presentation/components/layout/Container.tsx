import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'main'
  maxWidth?: ContainerMaxWidth
  id?: string
}

const maxWidthStyles: Record<ContainerMaxWidth, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
}

export function Container({
  children,
  className,
  as: Component = 'div',
  maxWidth = 'lg',
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8 w-full',
        maxWidthStyles[maxWidth],
        className
      )}
    >
      {children}
    </Component>
  )
}
