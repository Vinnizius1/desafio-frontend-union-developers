# 🚀 Desafio Técnico Frontend — Union Developers

> Aplicação web moderna desenvolvida para listagem, busca instantânea e navegação paginada de usuários consumindo a API `randomuser.me`. Construída com foco em **Clean Code**, **Mobile-First**, **Acessibilidade (a11y)**, **TanStack Query** e suíte completa de testes unitários orientados a **TDD**.

---

## 📸 Preview da Aplicação

![Preview do Projeto](./src/assets/prints/preview_demo.png)

🌐 **[Clique aqui para ver a Aplicação em Produção (Live Demo)](#)** *(Link de deploy em produção)*

---

## 💡 O que este projeto resolve?

* 🔍 **Busca & Filtragem Inteligente:** Filtre usuários por primeiro nome, sobrenome e idade com **Debounce de digitação**, reduzindo requisições desnecessárias.
* 🔗 **Sincronização de Estado na URL:** A página atual e os parâmetros de busca são refletidos na URL (`/?page=2&name=john`), permitindo compartilhar a busca exata ou atualizar a página sem perder o estado.
* ⚡ **Cache & Estado de Servidor:** Gerenciamento com **TanStack Query v5**, garantindo refetch automático, cache em memória e tratamento elegante de estados de *Loading*, *Error* e *Empty*.
* 🎨 **Design System Fidelizado:** Estilização desenvolvida em **SCSS Modules (BEM)** com **Design Tokens** extraídos diretamente do Figma via MCP.

---

## 🛠️ Tech Stack & Ferramentas

* **Core:** React 19 + TypeScript + Vite
* **Estilização:** Sass (SCSS Modules) com arquitetura Mobile-First & Design Tokens
* **Gerenciamento de Estado de Servidor:** TanStack Query (React Query v5+)
* **Roteamento:** React Router DOM v7
* **Animações:** Motion (Framer Motion v12+)
* **Documentação de Componentes:** Storybook v10+
* **Testes Automatizados:** Jest + React Testing Library (RTL) + `@testing-library/user-event`
* **API Externa:** RandomUser API (`randomuser.me`)

---

## 🏗️ Estrutura do Projeto

```text
src/
├── assets/          # SVGs, ícones e prints de demonstração
├── components/      # Componentes isolados com SCSS Modules, Storybook e Testes RTL
│   ├── Button/
│   ├── Input/
│   ├── UserCard/
│   ├── Pagination/
│   └── Header/
├── hooks/           # Custom Hooks (useUsers, useDebounce, useUserFilter)
├── pages/           # Páginas principais (Home/UserList, UserDetails)
├── routes/          # Configuração de rotas do React Router
├── services/        # Cliente HTTP e integração com TanStack Query
├── styles/          # Tokens SCSS (_variables.scss, _mixins.scss, _reset.scss)
├── types/           # Tipagens estritas em TypeScript (User, Filters, API Responses)
└── utils/           # Funções puras testadas via TDD (filterUsers, calculatePagination)
```

---

## 🧪 Estratégia de Testes & TDD

O desenvolvimento do projeto segue rigorosamente o ciclo de **TDD (*Red -> Green -> Refactor*)**:

1. 🔴 **Red:** Escrita antecipada de testes unitários para utilitários (`src/utils`) e custom hooks (`src/hooks`).
2. 🟢 **Green:** Implementação do código estritamente necessário para aprovar a suíte de testes.
3. 🔵 **Refactor:** Otimização de performance e legibilidade mantendo 100% de passagem nos testes.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js (versão 20+ ou superior)
* npm, pnpm ou yarn

### Passo a Passo

```bash
# 1. Clonar o repositório
git clone https://github.com/Vinnizius1/desafio-frontend-union-developers.git

# 2. Entrar na pasta do projeto
cd desafio-frontend-union-developers

# 3. Instalar as dependências
npm install

# 4. Executar o servidor de desenvolvimento
npm run dev

# 5. Executar a suíte de testes automatizados
npm test

# 6. Abrir a documentação visual do Storybook
npm run storybook
```

---

## ✒️ Autor

Desenvolvido com 💜 por **Vinicius (Vinnizius)**  
🔗 [GitHub](https://github.com/Vinnizius1) | 💼 [LinkedIn](#)
