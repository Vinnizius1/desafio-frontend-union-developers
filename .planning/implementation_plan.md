# Plano de Implementação - Desafio Técnico Frontend (Union Developers)

Aplicação web desenvolvida em **React 19 + TypeScript + Vite** para listagem, busca e visualização de detalhes de usuários consumindo a API `randomuser.me`.

---

## 🎯 Requisitos Principais & Decisões do Grill-Me

1. **Estilização**: SCSS Modules (`.module.scss`) + Tokens Globais (`_variables.scss` & `_mixins.scss`) em abordagem **Mobile-First**.
2. **Estado & URL**: TanStack Query (`useQuery`) integrado com `URLSearchParams` (sincronização de página e filtros na URL `/?page=1&name=john`).
3. **Estratégia de Testes**: **TDD** (*Red -> Green -> Refactor*) para utilitários e custom hooks, com **Vitest + React Testing Library** focado em comportamento do usuário (`screen.getByRole` + `@testing-library/user-event`).
4. **Storybook 10+**: Histórias abrangentes cobrindo todos os estados (*Default, Loading, Error, Empty*) envelopadas por Decorators Globais no `.storybook/preview.tsx`.
5. **Animações**: Motion (Framer Motion) para microinterações e transições de cards e telas.

---

## 🏗️ Arquitetura do Projeto

```
src/
├── assets/          # Ícones e logos
├── components/      # Componentes reutilizáveis isolados com SCSS Modules e Storybook
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.module.scss
│   │   ├── Button.stories.tsx
│   │   └── Button.test.tsx
│   ├── Input/
│   ├── UserCard/
│   ├── Pagination/
│   └── Header/
├── hooks/           # Custom Hooks (useUsers, useDebounce, useUserFilter)
├── pages/           # Páginas principais (Home/UserList, UserDetails)
├── routes/          # Configuração do React Router v7
├── services/        # Cliente API randomuser.me + TanStack Query
├── styles/          # Tokens SCSS (_variables.scss, _mixins.scss, _reset.scss)
├── types/           # Tipagens TypeScript (User, RandomUserResponse, FilterState)
└── utils/           # Funções utilitárias (filterUsers, formatAge, calculatePagination)
```

---

## 🧪 Plano de TDD & Cobertura de Testes

1. **Ciclo TDD em Utilitários (`src/utils/`)**:
   - `filterUsers.test.ts` -> Escrever testes de filtragem por primeiro nome, sobrenome e idade -> Implementar `filterUsers.ts`.
   - `pagination.test.ts` -> Escrever testes do cálculo de fatiamento (10 itens por página) -> Implementar `pagination.ts`.
2. **Ciclo TDD em Custom Hooks (`src/hooks/`)**:
   - `useDebounce.test.ts` -> Testar atraso de digitação na busca -> Implementar `useDebounce.ts`.
3. **Testes de Componentes no RTL (`src/components/`)**:
   - Testar acessibilidade (`getByRole('button')`, `getByRole('searchbox')`).
   - Simular cliques e digitação com `@testing-library/user-event`.
