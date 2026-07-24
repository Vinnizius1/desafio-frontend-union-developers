# 🚀 Guia Definitivo: Conventional Commits & Commits Atômicos (Padrão Sênior)

Este guia define o padrão profissional de versionamento com Git para repositórios de alta qualidade, garantindo rastreabilidade, clareza no histórico e uma excelente impressão em avaliações de código e testes técnicos.

---

## 🎯 Por que a Mensagem de Commit Importa?

No mercado profissional, o histórico do Git (`git log`) é a **assinatura da engenharia** de um desenvolvedor. 

* ❌ **Padrão Amador:** Commits gigantescos e genéricos (`"projeto pronto"`, `"ajustes no código"`, `"fix bugs"`).
* ✅ **Padrão Sênior:** Commits pequenos (atômicos), frequentes e padronizados que contam a história da evolução do sistema e comprovam a aplicação de **TDD (*Red -> Green -> Refactor*)**.

---

## 📜 1. Padrão de Nomenclatura: Conventional Commits

Todas as mensagens devem seguir a estrutura:

```text
<tipo>(<escopo>): <descrição curta no imperativo>
```

### Tipos de Commit Oficiais:

| Tipo | Descrição | Exemplo Prático |
| :--- | :--- | :--- |
| `chore` | Mudanças em configurações, build, dependências ou ferramentas (sem alterar código da aplicação). | `chore(setup): initialize React 19 + Vite + TypeScript environment` |
| `style` | Alterações em Design Tokens, variáveis SCSS, resets, formatação ou layout visual. | `style(tokens): setup SCSS variables, mixins, and reset from Figma MCP` |
| `test` | **TDD Red:** Adição ou modificação de testes unitários ou de integração. | `test(utils): add failing unit tests for user age calculation` |
| `feat` | **TDD Green:** Adição de uma nova funcionalidade ou componente. | `feat(utils): implement calculateAge utility to pass unit tests` |
| `refactor` | **TDD Refactor:** Alteração de código que melhora performance/estrutura sem mudar comportamento externo. | `refactor(button): optimize accessibility aria-attributes and click handler` |
| `docs` | Alterações exclusivas na documentação (README, manuais, guias). | `docs(readme): add project setup guide and architecture overview` |
| `fix` | Correção de um bug em produção ou em código já integrado. | `fix(pagination): resolve offset calculation edge case on last page` |
| `perf` | Mudança de código focada em melhorar o desempenho da aplicação. | `perf(image): add lazy loading and webp fallback to UserCard avatar` |
| `ci` | Mudanças em scripts ou configurações de integração contínua (GitHub Actions, Vercel). | `ci(github): add workflow for automated Jest tests on pull request` |

---

## 🛡️ 2. A Estratégia do "Commit Atômico" & Ciclo TDD

Um commit é chamado de **atômico** quando aborda apenas **uma única responsabilidade lógica**. Se você alterar o SCSS do botão E a lógica da API ao mesmo tempo, divida em 2 commits separados.

### O Ciclo de Commits em TDD (*Red -> Green -> Refactor*):

Quando for criar qualquer funcionalidade ou utilitário:

1. 🔴 **Passo 1 (Escrever o teste primeiro):**
   ```bash
   git commit -m "test(filter): add unit tests for name filtering"
   ```
2. 🟢 **Passo 2 (Escrever o código para o teste passar):**
   ```bash
   git commit -m "feat(filter): implement filterUsers logic to pass tests"
   ```
3. 🔵 **Passo 3 (Limpar e otimizar o código):**
   ```bash
   git commit -m "refactor(filter): convert loop to Array.prototype.filter"
   ```

---

## 📋 3. Regras de Ouro para Boas Práticas de Commit

1. **Use o modo imperativo em inglês técnico:**
   * ✅ `feat(input): add search debounce support`
   * ❌ `feat(input): added search debounce support` (evite passado)
   * ❌ `feat(input): adicionando debounce` (em equipes globais, inglês técnico é o padrão)
2. **Comece a mensagem em minúsculo:**
   * ✅ `style(header): update brand color token`
   * ❌ `style(header): Update Brand Color Token`
3. **Não coloque ponto final no título:**
   * ✅ `chore(deps): add tanstack react-query v5`
   * ❌ `chore(deps): add tanstack react-query v5.`
4. **Commite frequentemente:** Nunca fique horas desenvolvendo sem fazer commits parciais das etapas validadas.

---

## 🛠️ 4. Cheat Sheet de Comandos Git Úteis

```bash
# Verificar status dos arquivos modificados
git status

# Adicionar arquivos específicos para staging
git add src/styles/_variables.scss

# Fazer commit com mensagem padronizada
git commit -m "style(tokens): add SCSS design tokens from Figma"

# Visualizar histórico de commits formatado de forma limpa (Sênior View)
git log --oneline --graph --decorate
```
