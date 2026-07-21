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

## Firebase

O SeniorEase usa Firebase (Firestore Database + Authentication) como backend.

### 1. Criar o projeto

1. Acesse https://console.firebase.google.com e clique em **Criar projeto**
2. Siga o assistente (pode desabilitar o Google Analytics se preferir)

### 2. Ativar Firestore Database

1. No console do Firebase, vá em **Firestore Database > Criar banco de dados**
2. Escolha **Modo de teste** (as regras de segurança serão atualizadas depois)
3. Selecione a região mais próxima (ex: `southamerica-east1`)

### 3. Registrar o app Web

1. No console, clique no ícone **Web** (`</>`) para adicionar um app
2. Dê um nome (ex: "seniorease-web") e registre
3. Copie os valores de configuração exibidos

### 4. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha com os valores do seu projeto:

```bash
cp .env.example .env
```

```env
NEXT_PUBLIC_FIREBASE_API_KEY=seu-valor
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu-valor
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu-valor
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu-valor
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu-valor
NEXT_PUBLIC_FIREBASE_APP_ID=seu-valor
```

### 5. Regras do Firestore

As regras de segurança estão em `firestore.rules`. Para publicá-las:

```bash
npx firebase-tools deploy --only firestore:rules
```

### 6. Índices compostos

O arquivo `firestore.indexes.json` contém os índices necessários para as consultas do dashboard e da listagem de atividades. Para publicá-los:

```bash
npx firebase-tools init firestore     # apenas na primeira vez (responda "não" para sobrescrever firestore.rules)
npx firebase-tools deploy --only firestore:indexes
```

Os índices levam alguns minutos para ficarem ativos (status verde no console).

### 7. Autenticação

Para ativar login por email/senha:

1. No console, vá em **Authentication > Sign-in method**
2. Ative o provedor **Email/Senha**

### 8. Perfil do usuário

A página `/perfil` está implementada e exibe:

- Nome (editável)
- E-mail (somente leitura)
- Data de criação da conta
- Redefinição de senha (envio de link por e-mail)
- Atalho para personalização da experiência (`/configuracoes`)
- Logout com confirmação

A edição do nome mantém sincronia entre Firestore e Firebase Authentication.

A aplicação não utiliza verificação de e-mail.

## Arquitetura do projeto

```
src/
├── app/                    # Next.js App Router
├── modules/
│   ├── landing/            # Landing page (seções, dados, tipos)
│   ├── authentication/     # Autenticação, perfil, repositório Firebase
│   ├── onboarding/         # Primeiro acesso (preferências)
│   ├── dashboard/          # Dashboard, navegação autenticada
│   └── activities/         # CRUD de atividades
├── presentation/
│   ├── components/
│   │   ├── ui/             # Design System (Button, Card, Accordion...)
│   │   ├── layout/         # Navbar, Footer, Container...
│   │   └── accessibility/  # SkipLink, LiveRegion, AccessibilityControl
│   ├── hooks/              # useAccessibility, useAuth
│   └── providers/          # AccessibilityProvider, AuthProvider
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

- [ ] Exclusão de atividades
- [ ] Execução guiada (conclusão de etapas individuais)
- [ ] Notificações push
- [ ] Histórico detalhado de atividades
- [ ] Upload de arquivos em atividades
- [ ] Alteração de foto de perfil
- [ ] Autenticação social
- [ ] Aplicativo mobile React Native

### Limitações conhecidas

- Alteração de e-mail não implementada
- Exclusão de conta não implementada
- Foto de perfil não implementada
- Autenticação social não implementada
