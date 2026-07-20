import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

interface AccessibleLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  external?: boolean
  children: ReactNode
  ariaLabel?: string
}

export function AccessibleLink({
  href,
  external = false,
  children,
  ariaLabel,
  className,
  ...props
}: AccessibleLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'text-primary hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-sm transition-colors duration-normal underline underline-offset-2',
        className
      )}
      aria-label={ariaLabel}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  )
}
