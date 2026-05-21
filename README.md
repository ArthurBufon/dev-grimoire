# 📚 Design Patterns

Repositório de **padrões de projeto**, exemplos práticos e estruturas de referência para desenvolvimento. O conteúdo reflete preferências usadas **profissionalmente (por mim)** em projetos corporativos e freelance, com foco em organização, SRP e contratos previsíveis.  
  
Esse repositório não é mais um "guia de boas práticas para stack X", e sim um agregado de preferências **pessoais** que visam melhor organização estrutural

---

## 📁 Conteúdo

### 🏗️ `boilerplates/laravel`
Workflow típico com **SRP**: modelo, queries, services (web e API), helpers, migration e specs. Exemplo de domínio: **Carro**.

### ⚙️ `.cursor/`
Configuração e contexto para o Cursor neste repositório:

| Pasta / arquivo | Função |
|-----------------|--------|
| [`user-rules/`](.cursor/user-rules/) | Regras **globais** (PHP, JS, Flutter, geral) — copiar para **Settings → Rules, Skills, Subagent → User** |
| [`user-rules/README.md`](.cursor/user-rules/README.md) | Guia de como ativar as User Rules em qualquer projeto |
| [`tutorial-setup/tutorial.md`](.cursor/tutorial-setup/tutorial.md) | Setup completo: MCPs, Superpowers e User Rules |

Em cada boilerplate há regras adicionais (ex.: [`boilerplates/laravel/.cursor/rules`](boilerplates/laravel/.cursor/rules)) — escopo **só daquele projeto**.

O padrão **queries + services** e a nomenclatura REST dos métodos podem ser replicados em outras stacks; a referência atual é **PHP/Laravel**.

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
- **📜 User Rules globais** — convenções fixas no Cursor (retorno `sucesso`/`dados`/`erros`, nomenclatura, arquitetura por stack) em **todos os projetos**
- **🎯 Usar SDD (Specification-Driven Development)** — definir regras e limites antes de implementar, alinhado a `docs/features/`

Uma base bem documentada e padronizada permite que **você e a IA trabalhem juntos de forma mais eficiente e previsível**.

**Recomendado no Cursor:** configurar as [User Rules globais](.cursor/user-rules/README.md) a partir dos arquivos em `.cursor/user-rules/` e, para MCPs e fluxo agentico, seguir o [tutorial de setup](.cursor/tutorial-setup/tutorial.md).

---

## 📚 Conceitos principais

### 🔍 **Queries**

Camada de **acesso a dados** e consultas **simples, reutilizáveis** entre services (evolução prática do *Repository*, com foco em queries por recurso).

- 📁 Um módulo ou namespace por recurso  
- 💡 Exemplo: `app/Queries/Carro/` no boilerplate Laravel

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

1. Leia as regras e convenções deste repositório.
2. **Cursor (global):** copie o conteúdo de [`.cursor/user-rules/`](.cursor/user-rules/) para **Settings → Rules, Skills, Subagent → aba User** (`geral.md` sempre; depois `php.md`, `javascript.md` ou `flutter.md` conforme a stack). Detalhes em [`user-rules/README.md`](.cursor/user-rules/README.md).
3. **Cursor (setup opcional):** MCPs, plugin Superpowers e visão geral em [`tutorial-setup/tutorial.md`](.cursor/tutorial-setup/tutorial.md).
4. **Projeto Laravel:** explore [`boilerplates/laravel`](boilerplates/laravel) e o spec em [`docs/features/carro/specs.md`](boilerplates/laravel/docs/features/carro/specs.md).
5. Adapte/crie/refatore pastas e convenções de acordo com seus gostos pessoais ;)

---

## 🤖 Documentação em `/docs` (contexto para IA)

Para prompts sobre uma **feature** ou recurso concreto, a IA (e qualquer dev) deve **consultar primeiro o spec**: domínio, arquivos tocados, formato de retorno e extensões previstas.

- Estrutura sugerida: `docs/features/<nome-da-feature>/specs.md` (ou `spec.md`, conforme o projeto).
- **Exemplo (carro — Laravel):** [`boilerplates/laravel/docs/features/carro/specs.md`](boilerplates/laravel/docs/features/carro/specs.md)

Isso reduz ambiguidade e mantém implementações alinhadas ao que o repositório já definiu.
