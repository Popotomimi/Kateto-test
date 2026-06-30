# 🛹 SkateMarket — Full-Stack Lead Management Platform

**SkateMarket** is a full‑stack monolith built with Next.js 16 that combines a landing page with lead capture, JWT authentication, Round‑Robin lead distribution, and a Kanban dashboard for sales pipeline management. Designed as a real‑world product case for custom skateboard sales.

---

## 📸 Demonstração

> Deploy: https://kateto-test.vercel.app/

---

## 📋 Visão Geral

### Problema

Uma loja de skates personalizados recebia leads de forma desorganizada via WhatsApp e redes sociais. Não havia registro centralizado, distribuição justa entre vendedores ou acompanhamento visual do funil de vendas.

### Solução

Um sistema completo que unifica captura de leads, distribuição automática por Round Robin entre 5 vendedores e gestão visual via Kanban com drag‑and‑drop, tudo em uma única aplicação.

### Fluxo do Usuário

1. **Visitante** acessa a landing page e preenche o formulário de interesse
2. **Lead** é criado no MongoDB com vendedor atribuído automaticamente
3. **Administrador** faz login e acessa o dashboard Kanban
4. **Lead** aparece na coluna "Sem Contato" e pode ser arrastado entre colunas
5. **Status** é atualizado em tempo real conforme o lead avança no funil
6. **Polling automático** mantém o dashboard sincronizado com novos leads

---

## 🚀 Funcionalidades

### Landing Page (Captura de Leads)

- Hero section com CTA, grid de produtos, seção de benefícios e formulário de contato
- Formulário com validação Zod + react-hook-form
- Feedback visual com toast system (sucesso/erro)
- Responsivo e mobile‑first com Tailwind CSS v4

### Sistema de Leads

- API REST para CRUD de leads (`POST /api/leads`, `PATCH /api/leads/[id]`, `GET /api/leads`)
- Validação de dados com Zod v4 no backend e frontend
- Persistência em MongoDB Atlas via Mongoose ODM

### Dashboard Kanban

- 4 colunas representando o funil: **Sem Contato → Em Contato → Perdido → Finalizado**
- Drag‑and‑drop com `@dnd-kit/core` para movimentação entre colunas
- Atualização otimista com reversão automática em caso de falha
- Skeleton loading durante carregamento inicial
- Polling a cada 15 segundos para sincronização automática (pausado durante drag)
- Contador de leads por coluna

### Autenticação

- Login com JWT armazenado em cookie HttpOnly
- Proxy (Next.js 16) para proteção de rotas do dashboard
- Logout com cookie invalidation
- Seed de administrador via API (`POST /api/auth/seed`)
- Senhas hasheadas com bcryptjs (salt rounds: 12)

### Round Robin de Vendedores

- Distribuição automática e cíclica entre 5 vendedores: **Marcelo → Rafael → Renato → Pedro → Leonardo**
- Atribuição atômica usando `findOneAndUpdate` + `$inc` — sem race conditions em concorrência
- Persistência do índice atual em collection `settings` no MongoDB
- Novo lead criado → vendedor já atribuído antes do retorno

### UX com Feedback Visual

- Toast notifications (react-toastify) para todas as ações do usuário
- Loading states em formulários e botões
- Skeleton screens no carregamento do dashboard
- Prevenção de duplo clique em ações críticas

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js 16 App Router                 │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Frontend (Server + Client Components)              │ │
│  │  ┌─────────┐ ┌──────────┐ ┌──────────────────────┐ │ │
│  │  │ Landing │ │  Login   │ │  Dashboard / Kanban   │ │ │
│  │  │  Page   │ │  Page    │ │  (Drag & Drop)        │ │ │
│  │  └────┬────┘ └────┬─────┘ └──────────┬───────────┘ │ │
│  │       │           │                   │              │ │
│  │  ┌────▼───────────▼───────────────────▼───────────┐ │ │
│  │  │          lib/api (Camada Centralizada)          │ │ │
│  │  │       leads.ts  ·  auth.ts                      │ │ │
│  │  └────────────────────┬───────────────────────────┘ │ │
│  └───────────────────────┼─────────────────────────────┘ │
│                          │                                │
│  ┌───────────────────────▼─────────────────────────────┐ │
│  │              API Routes (Backend)                    │ │
│  │  /api/leads  ·  /api/auth/login  ·  /api/auth/me    │ │
│  │  /api/auth/logout  ·  /api/auth/seed                │ │
│  └───────────────────────┬─────────────────────────────┘ │
│                          │                                │
│  ┌───────────────────────▼─────────────────────────────┐ │
│  │         Services Layer (Regras de Negócio)           │ │
│  │  lead.service  ·  user.service  ·  settings.service │ │
│  │  round-robin.service                                 │ │
│  └───────────────────────┬─────────────────────────────┘ │
│                          │                                │
│  ┌───────────────────────▼─────────────────────────────┐ │
│  │   Mongoose Models · MongoDB Atlas                    │ │
│  │   User · Lead · Settings                             │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Stack

| Camada         | Tecnologia                             |
| -------------- | -------------------------------------- |
| Framework      | Next.js 16.2.9 (App Router, Turbopack) |
| Linguagem      | TypeScript 5 (strict mode)             |
| Frontend       | React 19.2.4, Tailwind CSS v4          |
| Formulários    | react-hook-form + Zod v4               |
| Drag & Drop    | @dnd-kit/core                          |
| Notificações   | react-toastify                         |
| Banco de Dados | MongoDB Atlas                          |
| ODM            | Mongoose 9                             |
| Autenticação   | JWT (jose) + bcryptjs                  |
| Linter         | ESLint 9 (flat config)                 |
| Formatter      | Prettier + prettier-plugin-tailwindcss |

### Separação de Camadas

O monorepo organiza o código em 4 camadas distintas, sem misturar responsabilidades:

- **Features / Components** — UI e interação do usuário (Server Components por padrão, Client Components apenas quando necessário)
- **lib/api/** — Comunicação com a API (centralização de fetch)
- **API Routes** — Endpoints HTTP (apenas validação e orquestração, sem lógica de negócio)
- **Services** — Toda a regra de negócio (CRUD, Round Robin, autenticação)
- **Models** — Schemas Mongoose com tipagem forte

### Proxy (Rota Protegida)

Em vez do `middleware.ts` (deprecado no Next.js 16), o projeto usa `proxy.ts` na raiz exportando uma função `proxy()`. O matcher protege exclusivamente `/dashboard/:path*`, verificando o JWT no cookie HttpOnly antes de liberar a requisição.

---

## 🔄 Fluxo do Sistema

```
Visitante                    Admin
   │                           │
   ├─ Landing Page             │
   │   └─ Preenche formulário  │
   │       │                   │
   │       ▼                   │
   │   POST /api/leads         │
   │       │                   │
   │       ▼                   │
   │   Zod validate            │
   │       │                   │
   │       ▼                   │
   │   Round Robin → Seller    │
   │       │                   │
   │       ▼                   │
   │   MongoDB → Lead created  │
   │                           │
   │          ┌────────────────┤
   │          │                │
   │          ▼                │
   │      Login Page           │
   │      POST /auth/login     │
   │          │                │
   │          ▼                │
   │      JWT → Cookie         │
   │          │                │
   │          ▼                │
   │      Dashboard Kanban     │
   │          │                │
   │          ▼                │
   │   4 Colunas (Drag & Drop) │
   │          │                │
   │          ▼                │
   │   PATCH /api/leads/:id    │
   │          │                │
   │          ▼                │
   │   MongoDB → Status Update │
   │          │                │
   │          ▼                │
   │   Polling 15s (silent)    │
   │   Leads sincronizados     │
```

---

## ⚙️ Decisões Técnicas

### Por que Next.js como Monolito?

Para um MVP de lead management, um monorepo full‑stack (frontend + backend no mesmo deploy) reduz complexidade operacional: uma única aplicação, deploy único (Vercel), sem necessidade de comunicação entre servidores. Caso o produto cresça, a separação é facilitada pela arquitetura modular (services layer independente).

### Por que MongoDB Atlas?

Os leads têm schema flexível e o modelo pode evoluir rapidamente (novos campos, tags, histórico). MongoDB Atlas oferece camada gratuita generosa para MVP, escalabilidade horizontal e baixa latência para operações de documento único (comuns no CRUD de leads).

### Por que JWT + Cookie HttpOnly?

- **HttpOnly**: o JavaScript do cliente não consegue ler o token, mitigando ataques XSS
- **Sem session store**: não é preciso Redis ou banco para gerenciar sessões — o token carrega as informações necessárias
- **Edge‑compatible**: a biblioteca `jose` usa Web Crypto API, funcionando tanto no Edge (proxy.ts) quanto em Node.js (API routes)
- **SameSite Lax**: protege contra ataques CSRF sem necessidade de tokens adicionais

### Por que Services Layer?

Manter a lógica de negócio isolada em `services/` permite:

- Testar regras sem depender do HTTP
- Reutilizar a mesma lógica em diferentes rotas ou tools (ex: seed, scripts)
- Substituir o banco de dados sem alterar controllers
- Separar responsabilidades: API route só valida entrada e chama service

### Por que Camada lib/api Centralizada?

A Sprint 08 consolidou todas as chamadas fetch em `lib/api/leads.ts` e `lib/api/auth.ts`. Benefícios:

- Headers, credentials e tratamento de erro em um único lugar
- Troca de API ou ajuste de headers muda uma vez
- Tipagem forte nas chamadas (TypeScript)
- Componentes não lidam mais com fetch/JSON diretamente

### Por que `@dnd-kit` ao invés de react-beautiful‑dnd?

`react-beautiful-dnd` foi descontinuado pelo Atlassian. `@dnd-kit` é a biblioteca padrão da comunidade React para drag‑and‑drop, com suporte ativo, API flexível e acessibilidade integrada.

---

## 🔮 Melhorias Futuras

| Melhoria                     | Motivação                                                      |
| ---------------------------- | -------------------------------------------------------------- |
| **WebSockets**               | Kanban em tempo real (substituir polling de 15s)               |
| **Roles (admin / sales)**    | Cada vendedor ver apenas seus leads                            |
| **Métricas de Vendas**       | Gráficos de conversão por vendedor, tempo médio por etapa      |
| **Testes Automatizados**     | Vitest + Testing Library para componentes e serviços           |
| **CI/CD Pipeline**           | GitHub Actions para lint + build + deploy automático na Vercel |
| **Responsividade do Kanban** | Versão mobile adaptada para drag em touch                      |
| **Busca e Filtros**          | Busca por nome, telefone, vendedor no dashboard                |

---

## 🚦 Como Rodar o Projeto

### Pré‑requisitos

- Node.js 20+ (LTS)
- NPM
- Conta MongoDB Atlas (gratuita) — [criar conta](https://www.mongodb.com/atlas)

### Passos

```bash
# 1. Clonar
git clone https://github.com/Popotomimi/Kateto-test.git
cd skate-marketplace

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env
```

Edite `.env` com suas credenciais:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/skate-marketplace?retryWrites=true&w=majority
JWT_SECRET=uma-chave-secreta-forte
JWT_EXPIRES_IN=7d
ADMIN_EMAIL=admin@skate.com
ADMIN_PASSWORD=sua-senha
```

```bash
# 4. Iniciar dev server
npm run dev

# 5. (Primeira vez) Seed do administrador
curl -X POST http://localhost:3000/api/auth/seed

# 6. Acessar
# Landing page: http://localhost:3000
# Dashboard:    http://localhost:3000/login (admin@skate.com / sua-senha)
```

### Comandos

| Comando         | Descrição                |
| --------------- | ------------------------ |
| `npm run dev`   | Dev server com Turbopack |
| `npm run build` | Build de produção        |
| `npm run start` | Servir build de produção |
| `npm run lint`  | ESLint (flat config)     |

---

## 📁 Estrutura do Projeto

```
skate-marketplace/
├── app/
│   ├── (dashboard)/        # Dashboard (login + kanban)
│   │   ├── dashboard/      # Kanban page
│   │   └── login/          # Login page
│   ├── (landing)/          # Landing page pública
│   │   ├── page.tsx        # Hero + Produtos + Benefícios + Sobre + CTA
│   ├── api/                # API Routes
│   │   ├── auth/           # login / logout / me / seed
│   │   └── leads/          # CRUD leads
│   ├── layout.tsx          # Root layout (ToastContainer)
│   └── globals.css         # Tailwind CSS v4
├── components/
│   └── layout/             # Navbar, Footer
├── constants/              # SELLERS, LEAD_STATUSES, ROUTES
├── features/
│   ├── kanban/             # KanbanBoard, KanbanColumn, KanbanCard
│   └── landing/            # HeroSection, ProductsSection, BenefitsSection, AboutSection, CtaSection, LeadForm
├── lib/
│   ├── api/                # Camada centralizada (leads.ts, auth.ts)
│   ├── auth.ts             # hashPassword, comparePassword, generateToken, verifyToken
│   └── mongoose.ts         # Conexão singleton com MongoDB
├── models/                 # Mongoose schemas (User, Lead, Settings)
├── services/               # Regras de negócio (lead, user, settings, round-robin)
├── types/                  # Tipos compartilhados (ILead, IUser, LeadStatus, etc.)
├── proxy.ts                # Proteção de rotas (Next.js 16 — substitute do middleware)
├── postcss.config.mjs      # @tailwindcss/postcss
└── eslint.config.mjs       # ESLint flat config
```

---

## 🧠 Diferenciais do Projeto

| Diferencial                 | Descrição                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------- |
| **Arquitetura limpa**       | 4 camadas (UI → API → Services → Models) sem mistura de responsabilidades             |
| **Round Robin atômico**     | `findOneAndUpdate` + `$inc` garante distribuição sem race conditions                  |
| **Edge‑compatible JWT**     | `jose` com Web Crypto API funciona em Edge (proxy) e Node (API)                       |
| **UX profissional**         | Toast system, skeleton loading, drag otimista com rollback, prevenção de duplo clique |
| **Camada API centralizada** | Toda comunicação com backend passa por `lib/api/` — manutenção facilitada             |
| **Next.js 16 + React 19**   | Versões estáveis mais recentes, Server Components por padrão                          |
| **Tailwind CSS v4**         | Utility‑first com @theme e `@import "tailwindcss"`                                    |

---

## 📄 Licença

MIT

### Feito com 💙 por Roberto de Oliveira
