# Módulo de Perfil

## Objetivo da página

A página `/perfil` permite que o usuário consulte e atualize as informações da sua conta no SeniorEase.

## Dados apresentados

| Campo | Origem | Editável |
|---|---|---|
| Nome | `users/{uid}.name` | Sim |
| E-mail | `users/{uid}.email` | Não (leitura) |
| Data de criação | `users/{uid}.createdAt` | Não (leitura) |

### Ausência de verificação de e-mail

A aplicação não utiliza verificação de e-mail. O campo `emailVerified` foi removido da entidade `UserProfile` e do documento Firestore. Nenhum status de verificação é exibido na página de perfil.

## Edição do nome

### Fluxo

1. Usuário clica em "Editar" ao lado do nome
2. Campo torna-se editável com o valor atual preenchido
3. Foco move para o input
4. Validação via Zod (`profile.schema.ts`):
   - `trim()` remove espaços das bordas
   - `min(2)`: "Use pelo menos 2 caracteres."
   - `max(80)`: "O nome deve ter no máximo 80 caracteres."
   - `transform()` reduz espaços internos repetidos
5. Ao salvar:
   - Botão desabilitado, texto "Salvando..."
   - Se nome igual ao atual: não executa gravação, encerra edição
   - Se válido: atualiza `users/{uid}` no Firestore
   - Se Firestore OK: atualiza `displayName` no Firebase Authentication
   - Se Auth OK: atualiza estado do `AuthProvider` via `updateProfileState`
   - Se Auth falha: mantém Firestore, loga erro em dev, interface reflete Firestore
6. Sucesso: alerta "Nome atualizado com sucesso."
7. Erro: alerta "Não foi possível atualizar seu nome..."

### Sincronização Firestore e Firebase Authentication

O nome existe em duas fontes:

- **Firestore**: `users/{uid}.name` (fonte principal para exibição)
- **Firebase Auth**: `user.displayName`

**Estratégia**:

1. Firestore é atualizado primeiro
2. Firebase Authentication `updateProfile` é atualizado em seguida
3. Se Auth falha após Firestore OK: o valor no Firestore é mantido, o erro é registrado em console.warn durante desenvolvimento, e a interface reflete o valor do Firestore
4. No próximo carregamento/carregamento de página, `getUserProfile` lê do Firestore e sincroniza naturalmente
5. Não há tentativa de transação entre os dois serviços (são independentes)

### Proteção de alterações não salvas

Se o usuário tentar navegar, recarregar ou fechar a aba enquanto o formulário estiver alterado:

- `beforeunload` exibe confirmação do navegador
- Ao cancelar a edição, confirma via Modal "Sair sem salvar?" com opções "Continuar editando" e "Sair sem salvar"

## Redefinição de senha

1. Botão "Redefinir minha senha" na seção "Segurança da conta"
2. Modal de confirmação: "Enviar link de redefinição?" com o e-mail do usuário
3. Ao confirmar: `sendPasswordResetEmail(auth, email)`
4. Botão desabilitado durante envio, texto "Enviando..."
5. Sucesso: "Enviamos as orientações para redefinir sua senha."
6. Erro classificado em três categorias:
   - Sem conexão: "Não foi possível enviar o link. Verifique sua conexão e tente novamente."
   - Muitas tentativas: "Foram realizadas muitas tentativas..."
   - Desconhecido: "Não foi possível enviar o link agora..."

## Logout

1. Botão "Sair da conta" na seção "Sessão"
2. Modal de confirmação: "Sair da conta?" com descrição
3. Ao confirmar: `signOut()` + limpeza de estado + redirecionamento para `/login`
4. Dados no Firestore (perfil, atividades, preferências) não são removidos

## Regras do Firestore

```javascript
match /users/{userId} {
  allow read: if request.auth != null && request.auth.uid == userId;
  allow create: if request.auth != null && request.auth.uid == userId;
  allow delete: if false;
  allow update: if request.auth != null
                && request.auth.uid == userId
                && (
                  request.resource.data.diff(resource.data).affectedKeys()
                    .hasOnly(["name", "updatedAt"])
                  ||
                  request.resource.data.diff(resource.data).affectedKeys()
                    .hasAny(["onboardingStep"])
                );
}
```

- Usuário não autenticado não pode ler perfis
- Cada usuário só pode ler/atualizar o próprio documento (`userId == request.auth.uid`)
- Atualizações de perfil (não onboarding) permitem apenas `name` e `updatedAt`
- O fluxo de onboarding pode alterar `onboardingStep` e `firstAccessCompleted`

## Acessibilidade

- Único `<h1>`: "Meu perfil"
- `<main id="main-content">` do `DashboardLayout`
- `aria-label` em cada `section` de cartão
- `aria-invalid` + `aria-describedby` no campo de nome via `FormField`
- `LiveRegion` para anunciar sucesso/erro de operações
- Modal de confirmação com foco preso e `aria-modal="true"`
- Foco retorna ao elemento de ativação ao fechar modal
- Navegação completa por teclado
- `prefers-reduced-motion` respeitado via tokens CSS
- Contraste ajustável em 3 níveis via `data-contrast`
- Nenhuma informação comunicada apenas por cor

## Responsividade

- **320px–767px**: Uma coluna, ações empilhadas, botões largura total
- **768px–1024px**: Largura limitada `max-w-2xl`, cards com padding confortável
- **1024px+**: Mesma largura de leitura, sem esticar
- Sem rolagem horizontal em qualquer tamanho
- Funciona com zoom de 200%
- Funciona com fonte muito grande (modo acessibilidade)
- Funciona em orientação retrato e paisagem
- Funciona com teclado virtual aberto

## Testes

| Arquivo | O que cobre |
|---|---|
| `profile.schema.test.ts` | Validação do nome (obrigatório, mínimo, máximo, espaços, transform) |
| `profile.test.tsx` | Página (loading, erro, not-found, conteúdo), edição, redefinição, logout, acessibilidade |

Os testes utilizam `vitest` com `@testing-library/react` e mocks do Firebase, sem conexão real.

## Limitações atuais

- Alteração de e-mail não implementada
- Exclusão de conta não implementada
- Foto de perfil não implementada
- Autenticação social não implementada
- Preferências visuais completas serão implementadas em bloco separado
- Notificações no perfil não implementadas
