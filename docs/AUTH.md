# Autenticação

## Estratégia

Foi escolhida autenticação baseada em JWT.

O objetivo foi manter uma solução simples, segura e suficiente para o escopo do teste técnico.

---

# Login

O usuário informa:

- email
- senha

O backend valida as credenciais.

Caso estejam corretas:

- gera um JWT
- envia um Cookie HttpOnly

---

# Logout

Remove o cookie de autenticação.

---

# Proteção de Rotas

Todas as rotas da área administrativa serão protegidas via Proxy (antigo Middleware no Next.js 15).

Caso o JWT seja inválido:

- redirecionar para login

---

# Segurança

Senha criptografada com bcrypt.

JWT armazenado em Cookie HttpOnly.

Nunca armazenar senha em texto puro.

---

# Objetivo

Implementar uma autenticação simples, segura e fácil de manter.
