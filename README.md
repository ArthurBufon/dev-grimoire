# 🔮 dev-grimoire

> Começou como um repositório de design patterns e boilerplate Laravel.
> Evoluiu para algo mais amplo: um grimório pessoal de preferências, convenções e ferramentas para desenvolvimento assistido por IA em 2026.
>
> Não é um guia de boas práticas genérico. É **meu** jeito de trabalhar.

---

## O que é isso?

Um grimório é um livro de feitiços e conhecimento acumulado — pessoal, opinativo, construído com o tempo.

Este repositório segue a mesma lógica: reúne padrões de projeto, configurações de IA, prompts, boilerplates e convenções que uso no dia a dia. Nada aqui é neutro ou consensual. É o que funciona **pra mim**, em projetos reais.

---

## 📁 Conteúdo

### 🏗️ `boilerplates/laravel`
Workflow com SRP: modelo, queries, services (web e API), helpers, migration e specs. Domínio de exemplo: **Carro**.

### ⚙️ `.cursor/`

| Pasta / arquivo | Função |
|---|---|
| [`user-rules/`](.cursor/user-rules/) | Regras globais (PHP, JS, Flutter, geral) — copiar para **Settings → Rules → User** |
| [`user-rules/README.md`](.cursor/user-rules/README.md) | Como ativar as User Rules em qualquer projeto |
| [`tutorial-setup/tutorial.md`](.cursor/tutorial-setup/tutorial.md) | Setup completo: MCPs, Superpowers e User Rules |

Cada boilerplate tem regras adicionais com escopo local (ex.: [`boilerplates/laravel/.cursor/rules`](boilerplates/laravel/.cursor/rules)).

### 🗺 `guias/`
Diretório contendo guias práticos com passo a passo para diversos casos de uso: correção de bugs, refatorações, planejamento de novas features, etc...

---

## 🎯 Pilares

**SRP em tudo** — cada arquivo, função e serviço tem um único motivo de mudar.

**Queries + Services** — separação clara entre acesso a dados e lógica de caso de uso. Nomenclatura REST nos métodos (`index`, `show`, `store`, `update`, `destroy`) replicável em qualquer stack.

**Retorno padronizado** — envelope consistente em todos os fluxos:
```json
{ "sucesso": true,  "dados": {},  "erros": [] }
{ "sucesso": false, "dados": {}, "erros": ["mensagem"] }
```

**Docs como contexto para IA** — specs em `docs/features/<feature>/specs.md` reduzem ambiguidade e tornam o código gerado mais previsível.

**SDD (Specification-Driven Development)** — define regras e fronteiras antes de implementar.

---

## 🤖 Por que padronizar em 2026?

Com IA gerando e refatorando código o tempo todo, uma base bem definida importa mais do que nunca:

- Prompts produzem resultados consistentes quando a arquitetura é previsível
- User Rules globais no Cursor fixam convenções em todos os projetos automaticamente
- Specs em `/docs` funcionam como memória de contexto para agentes

---

## 🚀 Como usar

1. Leia as convenções deste repositório
2. **Cursor (global):** copie `.cursor/user-rules/` para **Settings → Rules → User** (`geral.md` sempre; depois a regra da sua stack)
3. **Cursor (setup):** MCPs e fluxo agêntico em [`tutorial-setup/tutorial.md`](.cursor/tutorial-setup/tutorial.md)
4. **Laravel:** explore [`boilerplates/laravel`](boilerplates/laravel) e o spec em [`docs/features/carro/specs.md`](boilerplates/laravel/docs/features/carro/specs.md)
5. Adapte ao seu gosto — é um grimório, não uma lei

---

## 📚 Referência rápida

### Padrão de nomenclatura REST
 
Services e queries **devem seguir essa nomenclatura ao máximo**. Desvie apenas quando a operação for genuinamente específica e não se encaixar em nenhum dos cinco verbos — e mesmo assim, prefira compor (`indexAtivos`, `showComRelacoes`) antes de inventar um nome novo.
 
| Método | HTTP | Descrição |
|---|---|---|
| `index` | `GET /recursos` | Lista |
| `show` | `GET /recursos/{id}` | Um registro |
| `store` | `POST /recursos` | Cria |
| `update` | `PUT/PATCH /recursos/{id}` | Atualiza |
| `destroy` | `DELETE /recursos/{id}` | Remove |
 
> Se você está criando um método chamado `buscar`, `listar`, `salvar` ou `deletar` — quase certamente é um dos cinco acima com outro nome.

### Princípios que guiam tudo aqui

```
SRP  → um motivo de mudar por unidade
OCP  → aberto para extensão, fechado para modificação
DIP  → dependa de abstrações, não implementações
```
