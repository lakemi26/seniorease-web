'use client'

import { PlusCircle, PlayCircle, Type, KeyRound, type LucideIcon } from 'lucide-react'
import { Card } from '@/presentation/components/ui/Card'
import { SectionHeader } from '@/presentation/components/layout/SectionHeader'
import { cn } from '@/shared/utils/cn'
import type { HelpQuickLink } from '../../data/help-content'

const iconMap: Record<string, LucideIcon> = {
  PlusCircle,
  PlayCircle,
  Type,
  KeyRound,
}

interface HelpQuickLinksProps {
  links: HelpQuickLink[]
  onLinkClick: (articleSlug: string) => void
  className?: string
}

export function HelpQuickLinks({ links, onLinkClick, className }: HelpQuickLinksProps) {
  if (links.length === 0) return null

  return (
    <section aria-labelledby="quick-links-heading" className={className}>
      <SectionHeader
        title="Atalhos principais"
        subtitle="Orientações mais procuradas"
        align="left"
        className="mb-4"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8" role="list" aria-label="Atalhos de ajuda">
        {links.map((link) => {
          const Icon = iconMap[link.icon] || PlusCircle
          return (
            <div key={link.articleSlug} role="listitem" className="h-full">
              <button
                type="button"
                onClick={() => onLinkClick(link.articleSlug)}
                className={cn(
                  'w-full h-full text-left cursor-pointer',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus rounded-lg',
                )}
                aria-label={`Ver orientação: ${link.title}`}
              >
                <Card variant="outlined" padding="normal" className="h-full hover:bg-primary-light transition-colors duration-normal lg:p-8">
                  <div className="flex items-start gap-4 lg:gap-5">
                    <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-primary-lighter flex items-center justify-center flex-shrink-0" aria-hidden="true">
                      <Icon className="w-5 h-5 lg:w-7 lg:h-7 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base lg:text-lg font-semibold text-text">{link.title}</h3>
                      <p className="text-sm lg:text-base text-text-secondary leading-relaxed mt-1">{link.description}</p>
                    </div>
                  </div>
                </Card>
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
