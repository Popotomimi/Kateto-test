# Distribuição Round Robin

## Objetivo

Distribuir automaticamente os Leads entre os vendedores de forma justa.

---

# Ordem

Marcelo

↓

Rafael

↓

Renato

↓

Pedro

↓

Leonardo

↓

Marcelo

...

---

# Funcionamento

Sempre que um Lead é criado:

1. Ler currentSellerIndex
2. Selecionar vendedor
3. Criar Lead
4. Incrementar índice
5. Salvar novo índice

---

# Persistência

O índice será armazenado na collection settings.

Dessa forma:

- Não reinicia ao atualizar a aplicação.
- Não reinicia após deploy.
- Mantém a sequência corretamente.

---

# Objetivo

Garantir distribuição contínua entre os vendedores.
