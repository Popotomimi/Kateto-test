# Code Style

## Objetivo

Garantir consistência em todo o projeto.

Todo código deve seguir estas regras.

---

# Linguagem

TypeScript obrigatório.

Nunca utilizar JavaScript.

---

# Nomeação

Arquivos

kebab-case

Exemplo

create-user.ts

Componentes

PascalCase

Exemplo

ProductCard.tsx

Funções

camelCase

Exemplo

createLead()

Variáveis

camelCase

Constantes

UPPER_SNAKE_CASE

Interfaces

Prefixo I apenas quando necessário.

Preferir nomes descritivos.

---

# Organização

Um componente por arquivo.

Uma responsabilidade por componente.

Evitar arquivos acima de 300 linhas.

Evitar funções acima de 50 linhas.

---

# Imports

Sempre utilizar alias.

Exemplo

@/components

Nunca utilizar caminhos relativos longos.

---

# Estilização

Utilizar Tailwind CSS.

Não utilizar CSS Modules.

Não utilizar Styled Components.

---

# Tratamento de Erros

Sempre utilizar try/catch.

Nunca esconder erros.

Retornar mensagens claras.

---

# Banco

Models separados.

Services separados.

Validações separadas.

---

# Commits

Seguir Conventional Commits.

Exemplos

feat:

fix:

refactor:

docs:

style:

test:

chore:

---

# Qualidade

Todo código deve:

Passar no ESLint

Passar no TypeScript

Build sem erros

Sem warnings críticos

Sem código morto

Sem console.log desnecessário

---

# Regra Final

Sempre priorizar:

Legibilidade

Organização

Escalabilidade

Performance

Manutenção

Segurança

Em caso de dúvida, escolher a solução mais simples e mais legível.
