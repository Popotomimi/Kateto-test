# Banco de Dados

## Tecnologia

MongoDB Atlas

ODM

Mongoose

---

# Collections

## users

Responsável pelos usuários autenticados.

Campos

- name
- email
- password
- createdAt
- updatedAt

A senha será armazenada utilizando bcrypt.

---

## leads

Responsável pelos leads enviados pela Landing Page.

Campos

- name
- desiredItem
- phone
- seller
- status
- createdAt
- updatedAt

---

## settings

Responsável por armazenar configurações globais da aplicação.

Inicialmente possuirá apenas um documento contendo:

currentSellerIndex

Esse índice será utilizado pela regra de distribuição Round Robin.

---

# Relacionamentos

Não existem relacionamentos complexos.

Cada Lead possui apenas o nome do vendedor responsável.

---

# Índices

Serão criados índices quando necessário para melhorar consultas.

---

# Objetivo

Priorizar simplicidade, performance e facilidade de manutenção.
