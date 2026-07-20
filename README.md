# SeniorEase

Plataforma Web e Mobile criada para facilitar a organização de atividades acadêmicas, profissionais e pessoais de pessoas idosas. O objetivo é oferecer uma experiência digital simples, acessível, previsível e segura, promovendo autonomia, confiança e inclusão digital.

## Problema

Muitas pessoas idosas enfrentam dificuldades com aplicativos que possuem interfaces complexas, letras pequenas, navegação confusa e falta de suporte a acessibilidade. O SeniorEase resolve isso oferecendo uma plataforma com design adaptável, navegação simplificada e feedback claro em cada ação.

## Landing Page

Esta primeira etapa implementa a landing page pública da versão Web, contendo:
- Cabeçalho com navegação e menu mobile acessível
- Seção Hero com chamada principal
- Recursos e benefícios
- Como funciona (passo a passo)
- Demonstração interativa de personalização (fonte, contraste, espaçamento)
- Exemplos de feedback e confirmação
- Recursos de acessibilidade
- Perguntas frequentes (accordion)
- Chamada final para ação
- Rodapé com links e ano dinâmico

## Tecnologias

- [Next.js](https://nextjs.org/) 16 — App Router, React 19
- [TypeScript](https://www.typescriptlang.org/) — tipagem completa
- [Tailwind CSS](https://tailwindcss.com/) v4 — estilização com tokens
- [Lucide React](https://lucide.dev/) — ícones
- [Storybook](https://storybook.js.org/) — documentação de componentes
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/) — testes
- [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — qualidade de código

## Arquitetura do projeto

```
src/
├── app/                    # Next.js App Router
├── modules/
│   └── landing/            # Landing page (seções, dados, tipos)
├── presentation/
│   ├── components/
│   │   ├── ui/             # Design System (Button, Card, Accordion...)
│   │   ├── layout/         # Navbar, Footer, Container...
│   │   └── accessibility/  # SkipLink, LiveRegion, AccessibilityControl
│   ├── hooks/              # useAccessibility
│   └── providers/          # AccessibilityProvider
├── shared/
│   ├── constants/          # Tokens, navegação
│   ├── types/              # Tipos globais
│   └── utils/              # cn (classnames)
└── stories/                # Storybook stories
```

### Princípios de componentização

- Componentes pequenos e com responsabilidade única
- Dados estáticos separados da renderização
- Lógica de estado separada da apresentação
- Tipagem TypeScript completa (sem `any`)
- Props extensíveis via `className`

### Design System

| Componente | Variantes |
|---|---|
| Button | primary, secondary, outline, ghost; normal, large |
| Card | default, elevated, outlined |
| FeatureCard | ícone + título + descrição |
| StepCard | número + título + descrição |
| Badge | success, info, warning, neutral |
| Accordion | suporte a múltiplos abertos |
| Container | sm, md, lg, xl |
| Section | default, primary-light, accent-light, dark |

### Decisões de acessibilidade

- HTML semântico com landmarks (`header`, `nav`, `main`, `section`, `footer`)
- Hierarquia correta de headings (único `h1`)
- Link "Pular para o conteúdo principal" como primeiro elemento focalizável
- Navegação completa por teclado (Tab, Enter, Escape)
- `aria-expanded` e `aria-controls` no menu mobile e accordion
- `aria-live` para feedback de alterações de preferência
- `prefers-reduced-motion` respeitado
- Foco visível com `focus-visible`
- Áreas clicáveis com tamanho mínimo de 44px
- Contraste ajustável em 3 níveis
- Nenhuma informação comunicada apenas por cor
- Suporte a zoom de 200% sem quebra de layout

## Instalação

```bash
pnpm install
```

## Execução

```bash
# Desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Iniciar servidor de produção
pnpm start
```

## Testes

```bash
pnpm test        # Executa uma vez
pnpm test:watch  # Modo watch
```

## Storybook

```bash
pnpm storybook
```

Acesse em http://localhost:6006

## Lint e formatação

```bash
pnpm lint       # ESLint
pnpm format     # Prettier
```

## Próximos passos

- [ ] Autenticação (login/cadastro) com Supabase
- [ ] Dashboard do usuário
- [ ] CRUD de atividades
- [ ] Perfil e configurações
- [ ] Histórico de atividades
- [ ] Aplicativo mobile React Native
