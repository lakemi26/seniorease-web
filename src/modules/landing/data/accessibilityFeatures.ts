import type { AccessibilityFeatureItem } from '@/modules/landing/types'

export const accessibilityFeatures: AccessibilityFeatureItem[] = [
  {
    icon: 'Type',
    title: 'Textos maiores',
    description:
      'Aumente o tamanho da fonte para uma leitura mais confortável.',
  },
  {
    icon: 'Contrast',
    title: 'Contraste ajustável',
    description:
      'Escolha entre modos de contraste que facilitam a visualização.',
  },
  {
    icon: 'Maximize',
    title: 'Áreas clicáveis ampliadas',
    description: 'Botões e links com tamanho confortável para o clique.',
  },
  {
    icon: 'Keyboard',
    title: 'Navegação por teclado',
    description:
      'Utilize a plataforma inteira apenas com o teclado, sem precisar do mouse.',
  },
  {
    icon: 'Layout',
    title: 'Modo básico',
    description:
      'Uma versão simplificada da interface com apenas o essencial.',
  },
  {
    icon: 'EyeOff',
    title: 'Redução de animações',
    description:
      'Desative animações e transições para uma experiência mais estável.',
  },
  {
    icon: 'MessageCircle',
    title: 'Mensagens claras',
    description:
      'Instruções e feedbacks escritos de forma simples e objetiva.',
  },
  {
    icon: 'AlertTriangle',
    title: 'Confirmação antes de ações importantes',
    description:
      'A plataforma sempre pergunta antes de salvar, alterar ou excluir.',
  },
]
