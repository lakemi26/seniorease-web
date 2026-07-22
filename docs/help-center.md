# Central de Ajuda — SeniorEase

## Objetivo

A Central de Ajuda oferece orientações estáticas e versionadas para que o usuário possa
esclarecer dúvidas sobre o uso do SeniorEase de forma autônoma, sem depender de
chatbot, atendimento humano ou conexão com a internet para consultar o conteúdo.

## Estrutura dos conteúdos

Todo o conteúdo da Central de Ajuda está centralizado em:

```
src/modules/help/data/help-content.ts
```

Os artigos são tipados com TypeScript e versionados junto ao projeto. Não há dependência
de Firestore, CMS ou banco de dados externo para o conteúdo de ajuda.

## Categorias

| ID | Nome | Descrição |
|---|---|---|
| `gettingStarted` | Primeiros passos | Orientações para começar a utilizar o SeniorEase |
| `account` | Minha conta | Ajuda para acessar e cuidar da sua conta |
| `activities` | Atividades | Orientações para criar, acompanhar e concluir atividades |
| `reminders` | Lembretes e calendário | Ajuda para acompanhar datas, horários e avisos |
| `personalization` | Personalização | Ajuda para ajustar a forma como o SeniorEase aparece |
| `security` | Segurança e confiança | Explicações sobre confirmações, salvamento e proteção |

## Modelo HelpArticle

```typescript
type HelpArticle = {
  id: string
  slug: string
  categoryId: HelpCategoryId
  title: string
  summary: string
  keywords: string[]
  steps?: HelpArticleStep[]
  content?: string[]
  relatedArticleIds?: string[]
  relatedRoute?: string
  relatedRouteLabel?: string
  availableInBasicMode: boolean
}
```

- `steps`: lista numerada para guias passo a passo
- `content`: parágrafos de texto explicativo
- `relatedArticleIds`: referências a outros artigos pelo ID
- `relatedRoute`: link para a funcionalidade real correspondente
- `availableInBasicMode`: se o artigo é exibido no modo básico

## Busca

A busca é local, não depende de Firestore, e utiliza a função `searchArticles` que:

1. Normaliza o texto (lowercase, remove acentos, remove espaços excedentes)
2. Compara a consulta normalizada contra título, resumo, palavras-chave e nome da categoria
3. Retorna artigos que contenham a string de busca normalizada

## Normalização

```typescript
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')  // remove acentos
    .replace(/\s+/g, ' ')             // remove espaços excedentes
    .trim()
}
```

## Parâmetros da URL

| Parâmetro | Descrição | Exemplo |
|---|---|---|
| `busca` | Consulta de busca | `/ajuda?busca=atividade` |
| `categoria` | Filtro por categoria | `/ajuda?categoria=activities` |
| `artigo` | Slug do artigo | `/ajuda?artigo=criar-atividade` |
| `origem` | Contexto de origem validado | `/ajuda?artigo=criar-atividade&origem=atividades` |

### Validação de origem

O parâmetro `origem` é validado contra a lista interna `ALLOWED_ORIGINS`:

```
dashboard, atividades, calendario, historico, perfil, personalizacao, execucao
```

Valores inválidos são ignorados e o botão de retorno não é exibido.

## Artigos

Os artigos podem conter:
- Categoria (como badge)
- Título (h1)
- Resumo
- Conteúdo textual (parágrafos)
- Etapas numeradas (lista ordenada)
- Botão de ação para a funcionalidade relacionada
- Artigos relacionados
- Botão "Voltar para a ajuda"

## Guias passo a passo

Utilizam `HelpArticleStep[]` com:
- `id`: identificador único
- `title`: título curto da etapa
- `description`: explicação detalhada

São renderizados como lista ordenada (`<ol>`) com números em círculo.

## Perguntas frequentes

Utilizam o componente `Accordion` existente no Design System, que possui:
- `aria-expanded` e `aria-controls`
- Navegação por teclado (setas, Home, End, Escape)
- `prefers-reduced-motion` support

## Ajuda contextual

A Central de Ajuda é integrada às seguintes telas:

| Tela | Link | Parâmetros |
|---|---|---|
| Dashboard (HelpCard) | Abrir ajuda | `?origem=dashboard` |
| Dashboard (QuickActions) | Abrir ajuda | `?origem=dashboard` |
| Atividades (vazia) | Como criar uma atividade | `?artigo=criar-atividade&origem=atividades` |
| Atividades (filtro vazio) | Como criar uma atividade | `?artigo=criar-atividade&origem=atividades` |
| Calendário vazio | Como usar o calendário | `?artigo=ver-atividades-calendario&origem=calendario` |
| Histórico vazio | Como usar o histórico | `?artigo=consultar-historico&origem=historico` |
| Perfil | Precisa de ajuda com sua conta? | `?artigo=entrar-conta&origem=perfil` |
| Personalização | Precisa de ajuda com a personalização? | `?artigo=aumentar-texto&origem=personalizacao` |
| Execução guiada | Preciso de ajuda | `?artigo=executar-atividade&origem=execucao` (abre em nova aba) |
| ProfileMenu | Ajuda | `?origem=dashboard` |
| Sidebar | Ajuda | (navegação padrão) |
| MobileNavigation | Ajuda | (navegação padrão) |

## Modo básico vs completo

| Aspecto | Modo básico | Modo completo |
|---|---|---|
| Atalhos principais | Sim (4) | Sim (4) |
| Categorias | 4 (primeiros passos, atividades, personalização, conta) | 6 categorias |
| Artigos relacionados | Máximo 2 | Todos |
| Conteúdo recomendado | Não exibido | Exibido |
| Filtro por categoria | Apenas as 4 prioritárias | Todas |

## Acessibilidade

- HTML semântico com landmarks (`<nav>`, `<main>`, `<article>`, `<section>`)
- Apenas um `h1` por tela ("Como podemos ajudar?")
- Campo de busca com `label` visível via `sr-only`
- Hierarquia de headings correta (h1 → h2 → h3)
- Listas ordenadas (`<ol>`) em guias passo a passo
- Links com textos compreensíveis
- `aria-current` na navegação ativa
- `aria-expanded` e `aria-controls` no Accordion
- `aria-live` para quantidade de resultados da busca
- Foco movido para o título do artigo ao abrir
- Navegação completa por teclado
- `prefers-reduced-motion` respeitado
- `data-*` attributes do AccessibilityProvider mantidos

## Responsividade

- Mobile first com uma coluna
- 320px mínimo suportado
- Zoom de 200% sem quebra
- Grid de categorias: 1 coluna (mobile) → 2 (tablet) → 3 (desktop)
- Largura máxima de leitura do artigo: `max-w-4xl`
- Sem rolagem horizontal
- Botões com `min-h` para touch targets adequados
- `env(safe-area-inset-bottom)` respeitado

## Testes

Os testes estão em `src/modules/help/presentation/__tests__/` e cobrem:

- HelpContent: integridade dos dados, busca, normalização
- HelpSearch: exibição, interação, limpeza
- HelpCategoryCard: exibição, clique, acessibilidade
- HelpFaqSection: exibição, seções vazias
- HelpArticleView: exibição, etapas, navegação
- HelpArticleSteps: exibição, lista ordenada
- HelpNoResults: exibição, ações
- HelpArticleNotFound: exibição, ações
- HelpContextReturn: validação de origem
- HelpRecommendedContent: exibição, seleção
- ContextualHelpLink: exibição, label

## Limitações atuais

- Sem chatbot ou respostas geradas automaticamente
- Sem atendimento humano ou sistema de chamados
- Sem vídeos ou conteúdo multimídia
- Sem CMS — conteúdo atualizado manualmente no código
- Sem armazenamento no Firestore para conteúdo de ajuda
- Sem avaliação ou comentários nos artigos
- Sem formulário de contato
- Busca local sem fuzzy matching ou stemming avançado
- Artigos relacionados definidos estaticamente (sem recomendação por ML)
