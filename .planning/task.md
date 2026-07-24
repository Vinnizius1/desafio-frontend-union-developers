# Checklist de Tarefas (Task List) - Desafio Frontend Union Developers

## 🚀 Fase 1: Setup & Infraestrutura Inicial
- [ ] Inicializar projeto com React 19 + Vite + TypeScript
- [ ] Configurar Sass (SCSS) + Tokens Globais (`_variables.scss` e `_mixins.scss`)
- [ ] Configurar React Router DOM v7
- [ ] Configurar TanStack Query (React Query v5)
- [ ] Configurar Motion (Framer Motion)
- [ ] Configurar Storybook 10+ (`npx storybook@latest init`) com Decorators Globais
- [ ] Configurar Jest + React Testing Library + user-event

## 🧪 Fase 2: TDD & Utilitários Base
- [ ] Escrever testes (Red) e implementar (Green) funções de filtro (Nome, Sobrenome, Idade)
- [ ] Escrever testes (Red) e implementar (Green) funções de cálculo de paginação (10 por página)
- [ ] Escrever testes (Red) e implementar (Green) custom hook `useDebounce`

## 🎨 Fase 3: Componentização & Storybook (SCSS Modules + RTL)
- [ ] Componente `Button` (Código + `.module.scss` + Storybook + Testes RTL)
- [ ] Componente `Input / SearchBar` (Código + `.module.scss` + Storybook + Testes RTL)
- [ ] Componente `UserCard` (Código + `.module.scss` + Storybook + Testes RTL)
- [ ] Componente `Pagination` (Código + `.module.scss` + Storybook + Testes RTL)
- [ ] Componente `Header / Navbar` (Código + `.module.scss` + Storybook + Testes RTL)

## ⚡ Fase 4: Integração de API & Páginas Sincronizadas
- [ ] Criar tipos TypeScript da API `randomuser.me`
- [ ] Criar serviço de busca de usuários e integração com TanStack Query
- [ ] Conectar filtros e paginação com a URL (`URLSearchParams`)
- [ ] Construir página principal de listagem
- [ ] Construir página/modal de detalhes do usuário
- [ ] Adicionar transições suaves com Motion

## 🔍 Fase 5: Validação Final & Entrega
- [ ] Executar suíte completa de testes (`npm test`) e verificar 100% de passagem
- [ ] Executar build do Storybook (`npm run build-storybook`)
- [ ] Testar responsividade Mobile-First
- [ ] Limpeza de código e revisão final
