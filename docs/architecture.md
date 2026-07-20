# Arquitetura do SeniorEase

## Divisão dos módulos

```
src/
├── app/                    # Next.js App Router (páginas, layouts, metadados)
├── modules/                # Módulos de domínio (features)
│   └── landing/            #   Landing page (seções, dados, tipos)
├── presentation/           # Camada de apresentação
│   ├── components/         #   Componentes reutilizáveis
│   │   ├── ui/             #     Design System (Button, Card, etc.)
│   │   ├── layout/         #     Layout (Navbar, Footer, Container)
│   │   └── accessibility/  #     Acessibilidade (SkipLink, LiveRegion)
│   ├── hooks/              #   Hooks React
│   └── providers/          #   Context providers
├── shared/                 # Código compartilhado
│   ├── constants/          #   Constantes do projeto
│   ├── types/              #   Tipos TypeScript globais
│   ├── utils/              #   Utilitários (cn)
│   └── tests/              #   Setup de testes
└── stories/                #   Storybook stories
```

## Responsabilidade de cada camada

### `app/` — Next.js App Router
- Contém layout raiz, página inicial e metadados
- Apenas orquestra, não contém lógica de negócio
- Usa Server Components por padrão

### `modules/` — Módulos de domínio
- Cada módulo representa uma funcionalidade do sistema
- `landing/`: seções, dados estáticos e tipos específicos da landing page
- Futuros módulos: `auth/`, `dashboard/`, `activities/`, `profile/`

### `presentation/` — Componentes de apresentação
- `components/ui/`: Design System independente de domínio
- `components/layout/`: Estrutura da página (Container, Navbar, Footer)
- `components/accessibility/`: Componentes para acessibilidade
- `hooks/`: Hooks como `useAccessibility`
- `providers/`: Context providers como `AccessibilityProvider`

### `shared/` — Código compartilhado
- Constantes, tipos e utilitários usados por toda a aplicação
- Sem dependência de módulos de negócio

## Diferença entre componentes compartilhados e seções específicas

| Compartilhados (presentation/) | Específicos (modules/landing/) |
|---|---|
| Button, Card, Accordion | Hero, BenefitsSection, HowItWorksSection |
| Container, Section, Navbar | ControlSection, FAQSection |
| AccessibilityControl | DemoSection, CTASection |
| Reutilizáveis entre páginas | Únicos da landing page |

## Estratégia de persistência das preferências

As preferências de acessibilidade são:
1. Gerenciadas pelo `AccessibilityProvider` via React Context
2. Persistidas no `localStorage` através da chave `seniorease-prefs`
3. Aplicadas via `data-*` attributes no elemento `<html>`
4. Lidas na inicialização para restaurar o estado anterior

### Preparação para Supabase

O `AccessibilityProvider` já está estruturado para substituir o `localStorage` pelo Supabase:

```typescript
// Futura implementação com Supabase
async function loadPreferencesFromSupabase(userId: string) {
  const { data } = await supabase
    .from('user_preferences')
    .select('*')
    .eq('user_id', userId)
    .single()
  return data
}
```

Apenas as funções `loadPreferences` e `savePreferences` precisariam ser alteradas — o restante do provider permanece igual.

## Preparação para o aplicativo mobile (React Native)

O Design System foi projetado com:
- Tokens de design em variáveis CSS (fácil portabilidade)
- Componentes sem dependência de DOM diretamente
- Tipos compartilhados entre web e mobile
- Lógica de acessibilidade desacoplada da renderização

Para o mobile, os tokens podem ser convertidos para um tema React Native e os componentes UI reimplementados seguindo as mesmas interfaces TypeScript.

## Próximos passos

1. Implementar autenticação (login/cadastro) com Supabase
2. Criar dashboard do usuário
3. Implementar CRUD de atividades
4. Adicionar perfil e configurações
5. Criar visão de histórico
6. Desenvolver aplicativo mobile React Native
