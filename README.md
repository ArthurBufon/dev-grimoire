# 📚 Design Patterns

Repositório de **padrões de projeto**, exemplos práticos e estruturas de referência para desenvolvimento. O conteúdo reflete preferências usadas **profissionalmente (por mim)** em projetos corporativos e freelance, com foco em organização, SRP e contratos previsíveis.  
  
Esse repositório não é mais um "guia de boas práticas para stack X", e sim um agregado de preferências **pessoais** que visam melhor organização estrutural

---

## 📁 Conteúdo

### 🏗️ `/boilerplate-laravel`
Workflow típico com **SRP**: modelo, queries, services (web e API), helpers, migration e specs. Exemplo de domínio: **Carro**.

### ⚙️ `.cursor/`
Regras de contexto para o Cursor (raiz do repositório e, em cada boilerplate, regras adicionais).

O padrão **queries + services** e a nomenclatura REST dos métodos podem ser replicados em outras stacks; aqui estão **duas implementações de referência** (PHP/Laravel e Python).

---

## 🎯 Para quê serve?

Este repositório é uma **coleção de referências** para:

- ✅ Entender padrões de projeto na prática
- ✅ Consultar estruturas recomendadas
- ✅ Seguir boas práticas de arquitetura
- ✅ Manter código mais organizado e escalável
- ✅ Gerar boilerplate seguindo padrões estruturados e validados

---

## 🤖 Por que documentar e padronizar?

Com o **avanço da IA** no desenvolvimento, ficou ainda mais importante:

- **📋 Documentar processos** — menos ambiguidade nas respostas
- **🏛️ Padronizar estruturas** — prompts e código gerado mais consistentes
- **🎯 Usar SDD (Specification-Driven Development)** — definir regras e limites antes de implementar, alinhado a `docs/features/`

Uma base bem documentada e padronizada permite que **você e a IA trabalhem juntos de forma mais eficiente e previsível**.

---

## 📚 Conceitos principais

### 🔍 **Queries**

Camada de **acesso a dados** e consultas **simples, reutilizáveis** entre services (evolução prática do *Repository*, com foco em queries por recurso).

- 📁 Um módulo ou namespace por recurso  
- 💡 Exemplos: `Queries/Carro/` (Laravel) · `app/queries/carro/` (Python)

**Vantagem:** consultas centralizadas e fáceis de manter.

---

### ⚙️ **Services**

Camada de **orquestração e regras** do recurso: transações, formatação antes de persistir, integração com filas/logs, etc. Métodos comuns espelham o CRUD REST: `index`, `show`, `store`, `update`, `destroy`.

**Vantagem:** separação clara entre dados (queries) e lógica de caso de uso (services **orquestram** o fluxo).

---

## 🎬 Padrão REST nos nomes dos métodos

Nomenclatura alinhada aos **resource controllers** do Laravel, reutilizada nos boilerplates em **outras linguagens** para manter o mesmo vocabulário.

| Método | Operação HTTP típica | Descrição |
|--------|----------------------|-----------|
| **INDEX** | `GET /recursos` | Lista recursos |
| **SHOW** | `GET /recursos/{id}` | Um recurso |
| **STORE** | `POST /recursos` | Cria |
| **UPDATE** | `PUT` / `PATCH /recursos/{id}` | Atualiza |
| **DESTROY** | `DELETE /recursos/{id}` | Remove |

**OBS:** no endpoint, o recurso costuma ir no **plural** (ex.: `/carros/{id}`). Esses nomes também aparecem em **queries** e **services**.

**Vantagem:** padrão fácil de manter e de transferir entre projetos e linguagens.

---

## 🎬 Retorno padronizado (`sucesso` / `dados` / `erros`)

Além dos dados, os fluxos retornam um **envelope** com estado da operação e mensagens — útil na camada HTTP, em jobs e em testes.

Exemplos (JSON ilustrativo):

```json
{"sucesso": true, "dados": {"lista": []}, "erros": []}
```

```json
{"sucesso": true, "dados": {"quantidade_registros": 2}, "erros": []}
```

```json
{"sucesso": false, "dados": {}, "erros": ["Erro ao realizar consulta"]}
```

**Vantagem:** o chamador sabe explicitamente se houve falha e quais mensagens reportar, sem depender só de exceções ou de “dado vazio”.

---

## 🚀 Como usar?

1. Leia as regras e convenções.
2. Adapte/crie/refatore novas pastas e convenções de acordo com seus gostos pessoais ;)

---

## 🤖 Documentação em `/docs` (contexto para IA)

Para prompts sobre uma **feature** ou recurso concreto, a IA (e qualquer dev) deve **consultar primeiro o spec**: domínio, arquivos tocados, formato de retorno e extensões previstas.

- Estrutura sugerida: `docs/features/<nome-da-feature>/specs.md` (ou `spec.md`, conforme o projeto).
- **Exemplo (carro — Laravel):** `boilerplate-laravel/docs/features/carro/specs.md`

Isso reduz ambiguidade e mantém implementações alinhadas ao que o repositório já definiu.
