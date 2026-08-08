# User Rule Global

> Cole este arquivo em **Cursor Settings → Rules → User**. Vale para todos os projetos.
> O Dev Grimoire deve estar clonado como repositório **irmão** do app aberto (`../dev-grimoire/`).

Antes de planejar, revisar, gerar código ou modificar qualquer arquivo:

## 1. Onde está o Dev Grimoire

As convenções **não** vivem em `docs/rules/` do projeto atual.

O agente resolve o grimório no filesystem:

1. Verificar se existe `../dev-grimoire/docs/rules/geral.md` (marker).
2. Se existir → prefixo `{GRIMOIRE}` = `../dev-grimoire/`.
3. Se não existir → parar e avisar o dev (clone ausente ou app fora do layout).
4. Todos os paths de rules/moldes usam `{GRIMOIRE}/...`.

**Leitura obrigatória via Read/Grep** — nunca assuma o conteúdo de um arquivo sem lê-lo no filesystem.

## 2. O que ler no Dev Grimoire

### Sempre

| Arquivo | Conteúdo |
|---|---|
| `{GRIMOIRE}/docs/rules/geral.md` | Escopo mínimo, princípios, nomenclatura, Git, segurança |

### Por stack do projeto atual

Identifique a stack pelo repositório aberto (`composer.json` + `artisan` → Laravel; `package.json` com React → JS/React).

| Stack detectada | Arquivo no Dev Grimoire |
|---|---|
| PHP / Laravel | `{GRIMOIRE}/docs/rules/php.md` |
| JavaScript / React | `{GRIMOIRE}/docs/rules/javascript.md` |

Leia a regra de cada stack em uso. Em projetos full stack (ex.: Laravel + React), leia as duas. Não misture convenções de stacks diferentes no mesmo arquivo gerado.

### Ao criar arquivos novos

**Obrigatório:** antes de gerar qualquer arquivo novo, localize e leia o molde correspondente em `{GRIMOIRE}/moldes/`. O código gerado deve seguir estrutura, nomenclatura, imports e padrões do molde — adaptando apenas entidade, namespace e paths do projeto.

#### Laravel (`{GRIMOIRE}/moldes/laravel/`)

| Criar no projeto | Molde de referência |
|---|---|
| `app/Http/Controllers/Web/.../{Entidade}Controller.php` | `{GRIMOIRE}/moldes/laravel/app/Http/Controllers/Web/Admin/Carro/CarroController.php` |
| `app/Http/Requests/.../StoreRequest.php` | `{GRIMOIRE}/moldes/laravel/app/Http/Requests/Web/Admin/Carro/StoreRequest.php` |
| `app/Http/Requests/.../UpdateRequest.php` | `{GRIMOIRE}/moldes/laravel/app/Http/Requests/Web/Admin/Carro/UpdateRequest.php` |
| `app/Enums/{Nome}.php` | `{GRIMOIRE}/moldes/laravel/app/Enums/Marca.php` |
| `app/Models/{Entidade}.php` | `{GRIMOIRE}/moldes/laravel/app/Models/Carro.php` |
| `app/Queries/{Entidade}/Queries.php` | `{GRIMOIRE}/moldes/laravel/app/Queries/Carro/Queries.php` |
| `app/Services/{Entidade}/Service.php` | `{GRIMOIRE}/moldes/laravel/app/Services/Carro/Service.php` |
| `app/Services/Api/{Entidade}/Service.php` | `{GRIMOIRE}/moldes/laravel/app/Services/Api/Carro/Service.php` |
| `app/Services/{Entidade}/View/Service.php` | `{GRIMOIRE}/moldes/laravel/app/Services/Carro/View/Service.php` |
| `database/migrations/*_create_{entidades}_table.php` | `{GRIMOIRE}/moldes/laravel/database/migrations/2026_05_08_000000_create_carros_table.php` |
| `app/helpers.php` (funções globais) | `{GRIMOIRE}/moldes/laravel/app/helpers.php` |
| `app/Helpers/Paginacao.php` | `{GRIMOIRE}/moldes/laravel/app/Helpers/Paginacao.php` |
| `tests/Feature/{Entidade}Test.php` | `{GRIMOIRE}/moldes/laravel/tests/Feature/CarroTest.php` |
| `docs/features/{entidade}/specs.md` | `{GRIMOIRE}/moldes/laravel/docs/features/carro/specs.md` |

#### React (`{GRIMOIRE}/moldes/react/`)

| Criar no projeto | Molde de referência |
|---|---|
| `Pages/{Entidade}/Index.tsx` | `{GRIMOIRE}/moldes/react/Pages/Carro/Index.tsx` |
| `Pages/{Entidade}/Create.tsx` | `{GRIMOIRE}/moldes/react/Pages/Carro/Create.tsx` |
| `Pages/{Entidade}/Edit.tsx` | `{GRIMOIRE}/moldes/react/Pages/Carro/Edit.tsx` |
| `Components/Forms/{Entidade}/Form.tsx` | `{GRIMOIRE}/moldes/react/Components/Forms/Carro/Form.tsx` |
| `Queries/{Entidade}/Queries.tsx` | `{GRIMOIRE}/moldes/react/Queries/Queries.tsx` |
| `Services/{Entidade}/Service.tsx` | `{GRIMOIRE}/moldes/react/Services/Service.tsx` |
| `Components/Listagem/Card/Index.tsx` | `{GRIMOIRE}/moldes/react/Components/Listagem/Card/Index.tsx` |
| `Components/Listagem/Card/Show.tsx` | `{GRIMOIRE}/moldes/react/Components/Listagem/Card/Show.tsx` |
| `Components/Listagem/Card/Filtro/Show.tsx` | `{GRIMOIRE}/moldes/react/Components/Listagem/Card/Filtro/Show.tsx` |
| `types/paginacao.ts` | `{GRIMOIRE}/moldes/react/types/paginacao.ts` |
| `Utils/*.ts` | `{GRIMOIRE}/moldes/react/Utils/` |

Se o projeto já tiver arquivos do mesmo tipo, o molde complementa — **padrões do projeto atual têm prioridade** sobre o molde quando já consolidados.

## 3. O que ler no projeto atual (não no Dev Grimoire)

| Local | Quando |
|---|---|
| `docs/features/<feature>/specs.md` | Contexto de negócio e regras da feature |
| Código existente do módulo alterado | Padrões já consolidados no repositório |

Projetos **não** devem ter `docs/rules/`. Specs de feature sim.

## 4. Conflitos de prioridade

1. Instruções explícitas do usuário
2. Padrões existentes no arquivo ou módulo do projeto atual
3. Regras do Dev Grimoire (`docs/rules/` + `moldes/`)
4. Convenções genéricas da linguagem ou framework

## 5. Antes de executar

Informe resumidamente quais arquivos do **Dev Grimoire** e do **projeto atual** foram consultados.

Nunca invente regras ausentes nem assuma convenções que não estejam no Dev Grimoire ou no código do projeto.

## 6. Referência para skills de agente

Skills de planejamento, execução e revisão devem **apontar a este arquivo** e às rules da stack — não repetir convenções (imports, assinaturas de Queries, etc.) em cada skill.

Implementadores e revisores (incl. subagents) devem ler rules e molde via Read/Grep **antes** de criar ou alterar arquivos. Na revisão, validar conformidade contra o molde mapeado neste arquivo e as rules lidas.

> **Nota:** Index Docs do Cursor não substitui leitura no filesystem — moldes PHP/TSX e rules só ficam acessíveis ao agente via Read/Grep em `../dev-grimoire/`.
