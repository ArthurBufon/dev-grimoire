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

### Contexto local de agentes

Antes de começar o trabalho, verificar se `AGENTS.md` e `CLAUDE.md` existem na
raiz do projeto atual.

Se um deles estiver ausente, o contexto local de agentes **ainda não está ativo**.
Na primeira resposta, informar quais arquivos faltam e oferecer a inicialização:

```text
O contexto local de agentes ainda não está ativo: falta [arquivos]. Posso criar
os arquivos base com o Dev Grimoire e, em seguida, sugerir o conteúdo local que
faz sentido para este projeto?
```

Não bloquear a tarefa pela ausência dos arquivos e não criá-los sem aceite
explícito do usuário.

Se o usuário aceitar:

1. Executar `bash {GRIMOIRE}/agents/scripts/inicializar-contexto-agentes.sh` na raiz do projeto.
2. Inspecionar README, manifests da stack, comandos, docs e módulos relevantes.
3. Sugerir conteúdo mínimo para `AGENTS.md`, limitado a fatos e decisões locais
   encontrados no projeto; não inventar regras nem repetir o Dev Grimoire.
4. Preencher esse conteúdo somente após confirmação explícita do usuário.

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
| `scripts/deploy.sh` (VPS com Node; build no servidor) | `{GRIMOIRE}/moldes/laravel/scripts/deploy.sh` |

#### React (`{GRIMOIRE}/moldes/react/`)

| Criar no projeto | Molde de referência |
|---|---|
| `Pages/{Entidade}/Index.tsx` | `{GRIMOIRE}/moldes/react/Pages/Carro/Index.tsx` |
| `Pages/{Entidade}/Create.tsx` | `{GRIMOIRE}/moldes/react/Pages/Carro/Create.tsx` |
| `Pages/{Entidade}/Edit.tsx` | `{GRIMOIRE}/moldes/react/Pages/Carro/Edit.tsx` |
| `Components/Forms/{Entidade}/Form.tsx` | `{GRIMOIRE}/moldes/react/Components/Forms/Carro/Form.tsx` |
| `Components/Forms/CardErros/Show.tsx` | `{GRIMOIRE}/moldes/react/Components/Forms/CardErros/Show.tsx` |
| `Queries/{Entidade}/Queries.tsx` | `{GRIMOIRE}/moldes/react/Queries/Queries.tsx` |
| `Services/{Entidade}/Service.tsx` | `{GRIMOIRE}/moldes/react/Services/Service.tsx` |
| `Components/Listagem/Card/Index.tsx` | `{GRIMOIRE}/moldes/react/Components/Listagem/Card/Index.tsx` |
| `Components/Listagem/Card/Show.tsx` | `{GRIMOIRE}/moldes/react/Components/Listagem/Card/Show.tsx` |
| `Components/Listagem/Card/Filtro/Show.tsx` | `{GRIMOIRE}/moldes/react/Components/Listagem/Card/Filtro/Show.tsx` |
| `Components/Ui/Switch.tsx` | `{GRIMOIRE}/moldes/react/Components/Ui/Switch.tsx` |
| `Components/Listagem/Tabela/Index.tsx` | `{GRIMOIRE}/moldes/react/Components/Listagem/Tabela/Index.tsx` |
| `Components/Listagem/Tabela/Show.tsx` | `{GRIMOIRE}/moldes/react/Components/Listagem/Tabela/Show.tsx` |
| `types/carro.ts` | `{GRIMOIRE}/moldes/react/types/carro.ts` |
| `types/paginacao.ts` | `{GRIMOIRE}/moldes/react/types/paginacao.ts` |
| `types/retorno.ts` | `{GRIMOIRE}/moldes/react/types/retorno.ts` |
| `Utils/*.ts` | `{GRIMOIRE}/moldes/react/Utils/` |

Se o projeto já tiver arquivos do mesmo tipo, o molde complementa — **padrões do projeto atual têm prioridade** sobre o molde quando já consolidados.

Para referências que atravessam Laravel e React, leia também o contrato neutro
em `{GRIMOIRE}/moldes/contratos/carro.md`. Ele define os dados e retornos que
as duas pilhas devem manter alinhados; regras de implementação continuam nas
rules e moldes específicos de cada stack.

## 3. O que ler no projeto atual (não no Dev Grimoire)

| Local | Quando |
|---|---|
| `AGENTS.md` | Sempre — mapa local do projeto, comandos e limites específicos |
| `CLAUDE.md` | Quando o agente for Claude Code — deve importar `AGENTS.md` e conter somente instruções exclusivas do Claude |
| `docs/features/<feature>/specs.md` | Contexto de negócio e regras da feature |
| Código existente do módulo alterado | Padrões já consolidados no repositório |

Projetos **não** devem ter `docs/rules/`. Specs de feature sim.

### Conteúdo dos arquivos locais

Todo projeto deve versionar `AGENTS.md` na raiz como fonte de verdade do contexto
local: objetivo, stack, arquitetura, comandos de validação e limites específicos.
Ele deve conter **somente** fatos e decisões que fazem sentido naquele projeto:
regras internas, módulos sensíveis, integrações, comandos reais e decisões
arquiteturais locais. Ele complementa o Dev Grimoire; não repete suas rules,
moldes, convenções genéricas de linguagem ou instruções já globais.

Projetos que usam Claude Code devem também versionar `CLAUDE.md` na raiz com
`@AGENTS.md`. Instruções exclusivas do Claude ficam nele; todo contexto comum
permanece em `AGENTS.md`. Ele não recebe regras de projeto compartilhadas.

**Limite anti-slop (obrigatório):** `AGENTS.md` e `CLAUDE.md` podem ter, cada
um, no máximo **50 linhas**, inclusive linhas em branco. Se precisar de mais
detalhes, registre-os na spec, README ou ADR apropriado e deixe somente o link
e o contexto indispensável nesses arquivos.

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
