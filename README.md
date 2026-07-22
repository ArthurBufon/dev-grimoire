# 🔮 Meu Grimório

## O que é isso?

Um grimório é um livro de feitiços e conhecimento acumulado — pessoal, opinativo, construído com o tempo.

Esse repositório segue a mesma lógica: reúne padrões de projeto, configurações de IA, prompts, moldes e convenções que eu uso no dia a dia. 

Nada aqui é neutro ou consensual. É o que funciona **pra mim**, em projetos reais.

Não é um guia de boas práticas genérico. É **meu** jeito de trabalhar.

---

## 📁 Conteúdo

### 📁 `guias/`
Guias práticos com passo a passo para casos de uso reais: backups MySQL, conexões SSH, deploy Laravel, etc.

### 📁 `agents/`
Prompts e skills para fluxos de trabalho com agentes de IA.

| Pasta | Função |
|---|---|
| [`prompts/`](agents/prompts/) | Prompts pontuais (refactor, troubleshoot, MVP) |
| [`skills/`](agents/skills/) | Skills personalizadas (planejamento, quick-fix, mapear specs, grill-me, etc.) |

### 📁 `moldes/`
Código de referência com SRP: modelo, queries, services (web, view e API), helpers, migration e specs. Domínio de exemplo: **Carro**. Stack atual: **Laravel** + **React/Inertia**.

```
moldes/
├── laravel/   → Models, Queries, Services, migration, docs/features/
└── react/     → Pages, Services, Queries, Components, Utils
```

### 📁 `docs/rules/`
Convenções centralizadas, consumidas via clone local irmão dos apps (`../dev-grimoire/`). Não copiar para cada repositório — o agente lê esta pasta no filesystem.

| Arquivo | Função |
|---|---|
| [`global.md`](docs/rules/global.md) | **User Rule global** — clone local + Read/Grep |
| [`geral.md`](docs/rules/geral.md) | Escopo mínimo, princípios, nomenclatura, Git, segurança |
| [`php.md`](docs/rules/php.md) | Convenções PHP / Laravel |
| [`javascript.md`](docs/rules/javascript.md) | Convenções JavaScript / React |

### 📁 `.cursor/`

Setup do Cursor: User Rule global, MCPs e plugin. Ver [`.cursor/README.md`](.cursor/README.md) e o [guia de setup local](guias/cursor/setup-grimoire-local.md).

---

## 🧬 Pilares

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

## 📜 Por que padronizar em 2026?

Com IA gerando e refatorando código o tempo todo, uma base bem definida importa mais do que nunca:

- Prompts produzem resultados consistentes quando a arquitetura é previsível
- User Rules globais no Cursor fixam convenções em todos os projetos automaticamente
- Clone local do **Dev Grimoire** (`../dev-grimoire/`) ancora o agente nas convenções em qualquer repositório via Read/Grep
- Specs em `docs/features/` funcionam como memória de contexto para agentes

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
