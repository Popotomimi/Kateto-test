# Arquitetura do Projeto

## Visão Geral

Este projeto foi desenvolvido como uma aplicação Full Stack utilizando o Next.js 16 (App Router), permitindo que Frontend e Backend coexistam no mesmo projeto.

O objetivo foi reduzir complexidade, facilitar a manutenção e acelerar o desenvolvimento sem perder organização.

A aplicação possui duas áreas distintas:

- Landing Page (Pública)
- Dashboard (Autenticado)

Toda comunicação entre Frontend e Backend ocorre através de Route Handlers do Next.js.

---

# Stack

Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

Backend

- Next.js Route Handlers
- JWT
- bcryptjs

Banco de Dados

- MongoDB Atlas
- Mongoose

---

# Estrutura

app/

components/

features/

hooks/

lib/

proxy.ts (raiz)

models/

services/

types/

constants/

---

# Organização

O projeto segue o princípio da responsabilidade única.

Cada módulo possui sua própria responsabilidade.

Exemplos:

Landing

- Componentes
- Formulário

Auth

- Login
- JWT
- Middleware

Kanban

- Colunas
- Cards
- Drag and Drop

Leads

- Cadastro
- Persistência
- Distribuição

---

# Fluxo da Aplicação

Landing

↓

Usuário envia formulário

↓

API recebe os dados

↓

Validação

↓

Banco

↓

Round Robin

↓

Lead criado

↓

Dashboard exibe novo card

---

# Responsabilidades

Frontend

Responsável pela experiência do usuário.

Backend

Responsável pela regra de negócio.

Banco

Responsável pela persistência.

---

# Objetivos Arquiteturais

- Código limpo
- Alta legibilidade
- Escalabilidade
- Componentização
- Fácil manutenção
- Separação de responsabilidades
