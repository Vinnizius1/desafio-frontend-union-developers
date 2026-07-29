# 🚀 Desafio Técnico Frontend — Union Developers

> Aplicação web moderna desenvolvida para listagem, busca instantânea e navegação paginada de usuários consumindo a API `randomuser.me`. Construída com foco em **Clean Code**, **Mobile-First**, **Acessibilidade (a11y)**, **TanStack Query v5**, **Dual View Mode (Cards & Data Table)** e suíte de 57 testes automatizados com **Vitest + RTL (TDD)**.

---

## 🔗 Links de Demonstração em Produção

* 🌐 **[Aplicação em Produção (Live App)](https://desafio-frontend-vinnizius.netlify.app/)**
* 📚 **[Design System & Documentação Viva (Storybook)](https://storybook-union-vinnizius.netlify.app/)**

---

## 💡 O que este projeto resolve?

* 🔍 **Busca & Filtragem Instantânea:** Filtre usuários por primeiro nome, sobrenome, gênero e idade com **Debounce de digitação**, reduzindo requisições desnecessárias.
* 🔗 **Sincronização Total de Estado na URL:** A página atual, filtros de busca/gênero, modo de visualização (`?view=table`) e o **Modal de Usuário (`?user=email`)** são refletidos na URL com suporte a *Deep Linking* e navegação pelo histórico (*Browser Back Button*).
* 📊 **Alternância de Visualização (Dual View Mode):** Escolha entre a visualização moderna em **Grid de Cards** com animações a 60fps via Framer Motion ou a **Tabela de Dados (Data Table)** semântica padrão WAI-ARIA (`<th scope="col">`).
* ⚡ **Cache & Estado de Servidor:** Gerenciamento com **TanStack Query v5**, garantindo refetch automático, cache em memória e tratamento elegante de estados de *Loading*, *Error* e *Empty*.
* 🎨 **Design System Fidelizado:** Estilização desenvolvida em **SCSS Modules (BEM)** com **Design Tokens** extraídos diretamente do Figma via MCP.

---

## ⚡ Pontuação de Auditoria — Google Lighthouse (Produção)

| Desempenho | Acessibilidade | Práticas Recomendadas | SEO |
| :---: | :---: | :---: | :---: |
| 🟢 **95** | 🟢 **95** | 🟢 **100** | 🟢 **92** |

---

## 🛠️ Tech Stack & Ferramentas

* **Core:** React 19 + TypeScript + Vite
* **Estilização:** Sass (SCSS Modules) com arquitetura Mobile-First & Design Tokens
* **Gerenciamento de Estado de Servidor:** TanStack Query (React Query v5+)
* **Roteamento:** React Router DOM v7
* **Animações:** Motion (Framer Motion v12+)
* **Documentação de Componentes:** Storybook v10+
* **Testes Automatizados:** Vitest + React Testing Library (RTL) (57 testes 100% aprovados)
* **API Externa:** RandomUser API (`randomuser.me`)

---

## 🏗️ Estrutura do Projeto

```text
src/
├── assets/          # SVGs, ícones e arquivos estáticos
├── components/      # Componentes isolados com SCSS Modules, Storybook e Testes RTL
│   ├── Button/
│   ├── Input/
│   ├── UserCard/
│   ├── UserTable/
│   ├── UserTabs/
│   ├── ViewToggle/
│   ├── UserModal/
│   ├── Pagination/
│   └── Header/
├── hooks/           # Custom Hooks (useUsersQuery, useUserParams, useDebounce)
├── pages/           # Páginas principais (Home, UserDetails)
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

Desenvolvido com 💜 por **Vinicius**  
🔗 [GitHub](https://github.com/Vinnizius1) | 💼 [LinkedIn](https://www.linkedin.com/in/vinmm/)
