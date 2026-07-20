import type { NavLink } from '@/shared/types'

export const SITE_NAME = 'SeniorEase'
export const SITE_TITLE = 'SeniorEase | Organize sua rotina com mais clareza'
export const SITE_DESCRIPTION =
  'Plataforma acessível para organizar atividades, compromissos e tarefas com navegação simplificada, personalização e orientação passo a passo.'

export const NAV_LINKS: NavLink[] = [
  { label: 'Início', href: '#hero' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Acessibilidade', href: '#acessibilidade' },
  { label: 'Ajuda', href: '#ajuda' },
  { label: 'Entrar', href: '/login' },
]

export const FOOTER_LINKS: NavLink[] = [
  { label: 'Início', href: '#hero' },
  { label: 'Recursos', href: '#recursos' },
  { label: 'Acessibilidade', href: '#acessibilidade' },
  { label: 'Ajuda', href: '#ajuda' },
  { label: 'Privacidade', href: '#privacidade' },
]

export const DEMO_PREFERENCES_KEY = 'seniorease-prefs'
