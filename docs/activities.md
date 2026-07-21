# Módulo de Atividades

## Entidade Activity

```typescript
type ActivityCategory = 'health' | 'studies' | 'work' | 'appointments' | 'documents' | 'home' | 'shopping' | 'personal' | 'other'
type ActivityStatus = 'pending' | 'inProgress' | 'completed' | 'cancelled'
type ActivityPriority = 'low' | 'medium' | 'high'
```

### Estrutura no Firestore

```
activities/{activityId}
├── userId: string
├── title: string
├── description: string | null
├── category: ActivityCategory
├── scheduledAt: Timestamp
├── hasTime: boolean
├── status: ActivityStatus
├── priority: ActivityPriority
├── steps: [{ id, title, order, completed, completedAt }]
├── reminder: { enabled: boolean, remindAt: Timestamp | null }
├── startedAt: Timestamp | null
├── completedAt: Timestamp | null
├── createdAt: Timestamp (serverTimestamp)
└── updatedAt: Timestamp (serverTimestamp)
```

### Categorias (rótulos em português)

| Código | Rótulo |
|---|---|
| health | Saúde |
| studies | Estudos |
| work | Trabalho |
| appointments | Compromissos |
| documents | Documentos |
| home | Casa |
| shopping | Compras |
| personal | Tarefas pessoais |
| other | Outros |

### Prioridades

| Código | Rótulo na interface |
|---|---|
| low | Baixa |
| medium | Normal |
| high | Alta |

### Status

| Código | Rótulo na interface | Badge |
|---|---|---|
| pending | A fazer | info (azul) |
| inProgress | Em andamento | warning (laranja) |
| completed | Concluída | success (verde) |
| cancelled | Cancelada | neutral (cinza) |

O estado "Atrasada" é calculado no cliente quando `scheduledAt < now` e o status é `pending`. Nunca é salvo no Firestore.

## Criação de atividade

### Fluxo

1. Usuário preenche formulário em `/atividades/nova`
2. Validação com Zod (`activityFormSchema`)
3. Caso de uso `createActivity` valida regras de domínio
4. Mapper `toFirestoreCreateDocument` converte para documento Firestore
5. `addDoc` salva no Firestore
6. Listener do dashboard e da listagem são atualizados automaticamente via `onSnapshot`

### Validações de domínio

- userId obrigatório
- Título: 3–100 caracteres
- Descrição: máximo 500 caracteres
- Data obrigatória
- Se hasTime, horário obrigatório
- Prioridade obrigatória
- Etapas: máximo 20, cada uma com título não vazio
- Lembrete não pode ser depois da atividade
- Data no passado requer confirmação explícita

## Listagem de atividades

### Rota: `/atividades`

- Listagem em tempo real com `onSnapshot`
- Filtros: Todas, Hoje, Próximas, Em andamento, Concluídas + busca por título
- Ordenação por `scheduledAt` crescente
- Atividades sem horário aparecem depois das atividades com horário no mesmo dia
- Limite de 50 documentos

### Filtros

Os filtros são aplicados **no cliente** após carregar as 50 atividades mais próximas:

- **Todas**: sem filtro adicional
- **Hoje**: apenas atividades com `scheduledAt` no dia atual
- **Próximas**: apenas atividades com `scheduledAt >= now`
- **Em andamento**: apenas `status === 'inProgress'`
- **Concluídas**: apenas `status === 'completed'`
- **Busca**: filtra por título (case-insensitive)

### Estados da listagem

| Estado | Descrição |
|---|---|
| Carregando | Skeleton de 5 linhas |
| Erro | Título + descrição + botão "Tentar novamente" |
| Lista vazia | "Você ainda não possui atividades." + CTA "Criar primeira atividade" |
| Filtro sem resultado | "Nenhuma atividade encontrada." + "Limpar filtros" |
| Conteúdo | Lista de `ActivityCard` |

## Lembretes internos

Os lembretes são armazenados como metadados no documento da atividade:

```typescript
reminder = {
  enabled: boolean
  remindAt: Date | null
}
```

Opções disponíveis no formulário:

| Opção | Comportamento |
|---|---|
| Sem lembrete | `reminder.enabled = false` |
| No horário da atividade | `remindAt = scheduledAt` |
| 15 minutos antes | `remindAt = scheduledAt - 15min` |
| 30 minutos antes | `remindAt = scheduledAt - 30min` |
| 1 hora antes | `remindAt = scheduledAt - 1h` |
| 1 dia antes | `remindAt = scheduledAt - 1d` |
| Personalizado | Usuário escolhe data e horário |

Os lembretes são exibidos no dashboard (seção "Lembretes"). Nesta etapa, não há notificações push ou enviadas para fora da plataforma.

## Mapper

`ActivityFirestoreMapper` (em `infrastructure/mappers/activity.mapper.ts`):
- `mapActivityDocument`: converte `ActivityDocument` (Timestamp) → `Activity` (Date)
- `mapActivityDocuments`: mapeia lista
- `toFirestoreCreateDocument`: converte `CreateActivityInput` → documento Firestore com `serverTimestamp`

## Repositório

`FirebaseActivityRepository` implementa `IActivityRepository`:

| Método | Tipo | Descrição |
|---|---|---|
| `create` | Escrita | Cria documento via `addDoc` |
| `subscribeByUser` | Leitura (tempo real) | `onSnapshot` com `userId` + filtros no cliente |
| `subscribeToNextActivity` | Leitura (tempo real) | Próxima atividade pendente |
| `subscribeToTodayActivities` | Leitura (tempo real) | Atividades do dia |
| `subscribeToInProgressActivities` | Leitura (tempo real) | Atividades em andamento |
| `subscribeToRecentCompletedActivities` | Leitura (tempo real) | Últimas concluídas |
| `getWeeklySummary` | Leitura (uma vez) | Resumo da semana |

## Casos de uso

`ActivityUseCases` (em `application/use-cases.ts`):

| Caso de uso | Descrição | Validações |
|---|---|---|
| `createActivity` | Cria atividade | userId, título, data, etapas, lembrete |
| `subscribeByUser` | Escuta atividades do usuário | Filtra no cliente |

## Consultas Firestore e Índices

### Consultas ativas

| Consulta | Coleção | Filtros | Ordenação | Limite |
|---|---|---|---|---|
| subscribeByUser | activities | `userId == uid` | `scheduledAt asc` | 50 |
| subscribeToNextActivity | activities | `userId == uid`, `status == pending` | `scheduledAt asc` | 1 |
| subscribeToTodayActivities | activities | `userId == uid`, `scheduledAt >= iní­cio`, `scheduledAt <= fim` | `scheduledAt asc` | 50 |
| subscribeToInProgressActivities | activities | `userId == uid`, `status == inProgress` | — | 3 |
| subscribeToRecentCompleted | activities | `userId == uid`, `status == completed` | `completedAt desc` | 5 |
| getWeeklySummary | activities | `userId == uid`, `updatedAt >= inicioSemana`, `updatedAt <= fimSemana` | — | — |

### Índices necessários

```json
[
  { "userId": "ASC", "scheduledAt": "ASC" },
  { "userId": "ASC", "status": "ASC" },
  { "userId": "ASC", "status": "ASC", "scheduledAt": "ASC" },
  { "userId": "ASC", "status": "ASC", "completedAt": "DESC" },
  { "userId": "ASC", "scheduledAt": "DESC" }
]
```

Publicar com:

```bash
firebase deploy --only firestore:indexes
```

## Estratégia de fuso horário

- O formulário captura data no formato `YYYY-MM-DD` (input `type="date"`)
- Se `hasTime`, captura também `HH:mm` (input `type="time"`)
- Ao salvar, constrói `new Date(\`${date}T${time || '00:00'}:00\`)` no fuso local
- O Firestore armazena como `Timestamp` (UTC)
- Ao ler, `Timestamp.toDate()` retorna `Date` no fuso local
- Exibição usa `toLocaleDateString('pt-BR')` que respeita o fuso do usuário

## Regras do Firestore

Arquivo: `firestore.rules`

```javascript
match /activities/{activityId} {
  allow create: if request.auth != null
    && request.auth.uid == request.resource.data.userId;
  allow read:   if request.auth != null
    && request.auth.uid == resource.data.userId;
  allow update: if request.auth != null
    && request.auth.uid == resource.data.userId
    && request.auth.uid == request.resource.data.userId;
  allow delete: if request.auth != null
    && request.auth.uid == resource.data.userId;
}
```

## Integração com dashboard

O dashboard (`/dashboard`) já utiliza o mesmo `ActivityRepository` através do hook `useDashboard`. As seções afetadas:

- **Próxima atividade** (`NextActivityCard`): usa `subscribeToNextActivity`
- **Atividades de hoje** (`TodayActivitiesSection`): usa `subscribeToTodayActivities`
- **Em andamento** (`ContinueActivitySection`): usa `subscribeToInProgressActivities`
- **Lembretes** (`ReminderList`): exibe atividades com `reminder.enabled === true`
- **Concluídas recentes** (`RecentHistory`): usa `subscribeToRecentCompletedActivities`

Após criar uma atividade, todos os listeners são atualizados automaticamente via `onSnapshot` — não é necessário recarregar a página.

## Acessibilidade

- `fieldset` + `legend` para grupos (categoria, prioridade, lembrete)
- `aria-invalid` + `aria-describedby` em cada campo
- Botões de etapa com `aria-label` descritivo
- Foco move para campo novo após adicionar etapa
- Navegação completa por teclado
- `role="alert"` nas mensagens de erro
- `role="progressbar"` com `aria-valuenow/min/max` na barra de progresso
- `prefers-reduced-motion` respeitado
- Contraste de cores segue tokens existentes
- Nenhuma informação comunicada apenas por cor

## Responsividade

- **320px–767px**: Uma coluna, campos empilhados, botões Cancelar e Salvar largura total
- **768px–1024px**: Categoria em grid 2 colunas, data/horário lado a lado
- **1024px+**: Formulário limitado a `max-w-2xl` (~42rem), grid 3 colunas para prioridade
- Sem rolagem horizontal em qualquer tamanho
- Funciona com zoom de 200%
- Funciona com fonte muito grande (modo acessibilidade)
- Funciona em orientação retrato e paisagem

## Testes

| Arquivo | Testes |
|---|---|
| `activity.schema.test.ts` | 18 (validação de campos obrigatórios, tamanhos, datas, enum, lembrete, etapas) |
| `activity.mapper.test.ts` | 6 (conversão Timestamp/Date, mapeamento, CreateActivityDocument) |
| `ActivityStatusBadge.test.tsx` | 6 (cada status + atrasada) |

## Storybook

| Componente | Stories |
|---|---|
| `ActivityStatusBadge` | A fazer, Em andamento, Concluída, Cancelada, Atrasada |
| `ActivityProgress` | Vazio, Parcial, Completo, Etapa única, Muitas etapas |
| `ActivityCard` | Padrão, Sem horário, Sem etapas, Concluída, Atrasada, Muitas etapas, Descrição longa |
| `CategorySelect` | Padrão, Com seleção, Com erro |
| `PrioritySelector` | Baixa, Normal, Alta, Com erro |
| `ActivityStepField` | Primeira, Intermediária, Última |
| `ActivitiesEmptyState` | Lista vazia, Filtro sem resultado |
| `ActivitiesSkeleton` | Padrão |

## Limitações desta etapa

- Edição de atividade não implementada
- Exclusão de atividade não implementada
- Execução guiada (conclusão de etapas individuais) não implementada
- Conclusão da atividade (status `completed`) não implementada
- Reabertura de atividade não implementada
- Notificações push não implementadas
- Histórico detalhado não implementado
- Upload de arquivos não implementado

## Comandos

```bash
# Publicar índices Firestore
firebase deploy --only firestore:indexes
```
