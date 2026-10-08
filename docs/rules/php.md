# PHP / Laravel

## Retorno padronizado
Services de negócio e Queries retornam o envelope abaixo. Controllers JSON o enviam com `response()->json()`, conforme a seção seguinte. Controllers Inertia retornam a resposta da tela ou redirect; View Services retornam os dados da tela.
```php
return ['sucesso' => true, 'dados' => ['model' => $model], 'erros' => []];
```

## Controllers JSON (bloqueante)

Em qualquer arquivo `*Controller.php` que responda JSON, **proibido** `return response()->json([...])` inline.

Montar o envelope em `$retorno` e só então retornar:

```php
$retorno = [
    'sucesso' => true,
    'dados'   => ['referencia' => $valor],
    'erros'   => [],
];

return response()->json($retorno, 200);
```

Molde: `moldes/laravel/app/Http/Controllers/Web/Admin/Carro/Referencia/CarroReferenciaController.php`.

## Tratamento de erros em Services
Nos Services de negócio, métodos que executam operações usam `try/catch` com `LogHelper::logarErro` e `formatarMensagemErro`. Quando uma mutação recebe um envelope de falha da Query, o Service também a registra antes do retorno. Queries somente montam o envelope técnico de erro; métodos de simples repasse, como `index` e `show` nos moldes, devolvem diretamente o envelope da Query:

```php
public function store(array $dados): array
{
    try {
        $dadosDatabase = $this->formatarDatabase($dados);
        $retorno = $this->queries->store($dadosDatabase);

        if (!$retorno['sucesso']) {
            $mensagemErro = $retorno['erros'][0] ?? 'Erro ao salvar registro.';
            LogHelper::logarErro([], 'Erro ao processar registro', $mensagemErro);
        }

        return $retorno;
    } catch (\Throwable $th) {
        LogHelper::logarErro([], 'Erro ao processar registro', formatarMensagemErro($th));
        return ['sucesso' => false, 'dados' => [], 'erros' => [formatarMensagemErro($th)]];
    }
}
```
- `update` retorna `$model->fresh()`
- `formatarMensagemErro(\Throwable $th)` — helper global em `app/helpers.php`
- `LogHelper::logarErro(array $dados, string $mensagemAmigavel, string $mensagemErro)` — helper estático em `app/Helpers/LogHelper.php`
- Em `LogHelper`, enviar apenas o contexto mínimo necessário, como o identificador do registro quando disponível; não repassar o payload inteiro. Seguir `docs/rules/geral.md` § Segurança.

Nas operações com transação, verificar `sucesso` no envelope retornado pela Query antes do commit. Se for `false`, executar rollback e propagar a falha, mesmo sem exceção; manter também o rollback no caminho de exceção. Referência: `store` e `update` em `moldes/laravel/app/Services/Carro/Service.php`.

## Estrutura
*Módulos possíveis: Web ou Api
- Controllers: `app/Http/Controllers/[Modulo]/[Entidade]/[Entidade]Controller.php` (molde: `moldes/laravel/app/Http/Controllers/Web/Admin/Carro/CarroController.php`)
- Queries: `app/Queries/[Entidade]/Queries.php`
- Services web/catálogo: `app/Services/[Entidade]/Service.php` (molde: `moldes/laravel/app/Services/Carro/Service.php`)
- Services API: `app/Services/Api/[Entidade]/Service.php` (molde: `moldes/laravel/app/Services/Api/Carro/Service.php`)
- Logs de falha: `app/Helpers/LogHelper.php` (molde: `moldes/laravel/app/Helpers/LogHelper.php`)
- Form Requests: `app/Http/Requests/[Modulo]/[Entidade]/[Acao]Request.php`. EX: StoreRequest.php + UpdateRequest.php (moldes: `moldes/laravel/app/Http/Requests/Web/Admin/Carro/`)
- URLs: sempre rotas nomeadas com `route()`
- Controllers chamam Services e View Services; validação HTTP fica nos Form Requests; resposta Inertia/redirect no Controller
- Nas mutações com Form Request, passar `$request->validated()` ao Service, conforme `store` e `update` do molde; não encaminhar o payload completo com `$request->all()`.

Quando a normalização influencia a validação HTTP, aplicá-la em `prepareForValidation()` antes das regras, mantendo a preparação existente no Service antes de persistir. Exemplo dos moldes `StoreRequest` e `UpdateRequest` de Carro: normalizar a placa antes de verificar sua unicidade, usando o mesmo formato na persistência.

## Queries (`app/Queries/`)

Os métodos públicos de operação das Queries ficam limitados à lista abaixo. Auxiliares privados, como `aplicarFiltros`, `aplicarOrdenacao` e `carregarRelacionamentos`, são permitidos conforme o molde:

* `index`
* `show`
* `store`
* `update`
* `destroy`

Convenção obrigatória por entidade (molde: `moldes/laravel/app/Queries/Carro/Queries.php`):

```php
public function index(array $filtros): array
public function show(array $filtros): array
public function store(array $dados): array
public function update(int $id, array $dados): array
public function destroy(string|int $id): array
```

`$filtros` só em `index` e `show`. `update` e `destroy` **não** recebem `$filtros`.

No molde, `show` sem registro retorna `sucesso: true`, `dados.model: null` e `erros: []`. Falha na consulta retorna `sucesso: false`; cabe ao consumidor tratar a ausência conforme o fluxo da feature.

Caso alguma query específica seja necessária, use uma subpasta de contexto em `app/Queries/[Entidade]/[Contexto]/Queries.php` e mantenha um método REST correspondente. Regras de negócio permanecem no `Service`.

**Query principal** (`app/Queries/{Entidade}/Queries.php` — um nível; não confundir com subpastas de contexto):

- Apenas SQL/Eloquent: montar `Builder`, `get`/`first`/`create`/`update`/`delete`, envelope de retorno.
- **Proibido** injetar `App\Queries\*`, `App\Services\*` ou outro orquestrador no construtor.
- **Proibido** enriquecer models após a consulta (`setRelation`, segunda query em outra tabela para “montar” tela/API, batch por servidor, etc.). Isso fica no `App\Services\{Entidade}\Service` (ex.: `anexarVendedores` após `$this->queries->index()`).
- Métodos `private` limitados a filtros/ordenação/eager load da **mesma** query (`aplicarFiltros`, `aplicarOrdenacao`, `carregarRelacionamentos`, `aplicarFiltro*`, `aplicarSelect`, `aplicarLimite`, `filtrar*`, …). Molde: `moldes/laravel/app/Queries/Carro/Queries.php`.

**Leitura (`index` / `show`) — quem chama:**

| Camada | Regra |
|---|---|
| `App\Services\{Entidade}\Service` | Chama a Query, aplica regra de negócio/enriquecimento, devolve envelope. |
| `App\Http\Controllers\Painel\Json\{Entidade}\*Controller` | **Não** chamar `$this->queries->index()` / `show()`; delegar a `App\Services\{Entidade}\Service`. Subpastas (`Referencia`, `ProdutoVinculado`, …) podem usar Query própria do contexto. |
| `App\Services\{Entidade}\View\Service` | Montagem de listagem/detalhe da entidade via `App\Services\{Entidade}\Service`, não via Query principal. Queries auxiliares (grupo, filtro, …) continuam permitidas. |

Mutations (`store`/`update`/`destroy`) nos JSON controllers seguem chamando o Service de domínio (já padrão nos moldes).

- Sem lógica de negócio — apenas SQL/Eloquent
- Services chamam Queries; Controllers chamam Services
- Listagens paginadas: `Paginacao::aplicarPaginacao($query, $filtros)` (molde: `moldes/laravel/app/Helpers/Paginacao.php`); **não** duplicar paginação na Query nem usar função global

## Paginação (`App\Helpers\Paginacao`)

Classe estática em `app/Helpers/Paginacao.php` (PSR-4). Molde: `moldes/laravel/app/Helpers/Paginacao.php`.

- `Paginacao::aplicarPaginacao(Builder $query, array $filtros, int $porPagina = 10, int $maximoPaginas = 10, int $tetoQuantidade = 100): array` — retorna `['lista' => ..., 'paginacao' => ...]`
- `Paginacao::montarDadosPaginacao(...)` — metadados (`total`, `total_retornado`, `pagina`, `limite`, `total_paginas`)
- Filtros suportados:
  - `aplicar_paginacao` — omitido, `true` ou valor booleano inválido: pagina; `false` (incl. `"false"`, `0`): sem paginação (sem offset nem metadados de página). Se `quantidade` estiver presente e > 0, aplica só `$query->limit(min(quantidade, $tetoQuantidade))`; se ausente ou inválida, retorna a lista inteira
  - `pagina` — página atual (default `1`; teto = `total_paginas`)
  - `quantidade` — com `aplicar_paginacao` omitido/`true`: itens por página (teto default 100 via `$tetoQuantidade`; quem chama pode elevar o teto, ex.: listagens sem paginação que precisam de mais itens). Se ausente ou inválida, usa `$porPagina` do método. Com `aplicar_paginacao: false`: limita o retorno sem paginar
  - `sem_limite_paginas` — omitido ou `false`: teto de páginas = `$maximoPaginas`; `true`: sem esse teto
- `paginacao.total` **sempre** reflete o total real de registros filtrados, independente do corte de `quantidade` — inclusive no modo sem paginação (`aplicar_paginacao: false`)
- Recomendação padrão: repassar os filtros do request/controller e deixar a helper decidir — **não** forçar default de `quantidade` em Service ou View Service. Exceção aceitável: catálogos desenhados para operar sem paginação podem fixar `aplicar_paginacao` e uma `quantidade` sensata na View Service, respeitando o teto padrão de 100. Se precisarem ultrapassá-lo, a Query deve elevar `$tetoQuantidade` explicitamente. Documentar a decisão no código/specs da feature (molde: `moldes/laravel/app/Services/Carro/View/Service.php`)
- Chaves de paginação (`pagina`, `quantidade`, `aplicar_paginacao`, `ordenacao`) **não** entram em `aplicarFiltros` da Query — são consumidas só pela helper
- Queries com `index` paginado delegam à helper; fallback de erro com estrutura completa de `paginacao` (ver molde Carro)

## PHP (estilo)
- Chaves em todos os control structures
- Constructor property promotion (PHP 8)
- Return types e type hints explícitos em todos os métodos, exceto construtores e métodos mágicos que a linguagem não permite tipar
- Enum keys em TitleCase; values em `snake_case` / minúsculas quando o projeto usar enums backed
- Cast no Model com a classe do enum; validação HTTP com `Rule::enum(...)`
- PHPDoc com array shapes; comentários inline só em lógica complexa

## Sail / Artisan
- Comandos sempre via `vendor/bin/sail`
- Criar arquivos: `vendor/bin/sail artisan make:* --no-interaction`
- Testes: `vendor/bin/sail artisan test --compact --filter=NomeTest`

## Nomenclatura
- `PascalCase` para classes, controllers, models, enums
- `camelCase` para métodos e variáveis
- `snake_case` para colunas de banco e arquivos que seguem essa convenção, como migrations
- Arquivos de classes acompanham o nome da classe em `PascalCase`, conforme os moldes: `Service.php`, `Queries.php`, `StoreRequest.php`
- `UPPER_SNAKE_CASE` para constantes

## Migrations

Produção (MySQL) limita identificadores a **64 caracteres** — tabela, coluna, índice, unique e FK. O Laravel nomeia sozinho no formato `{tabela}_{colunas}_unique` / `_index` / `_foreign`; tabela ou colunas longas estouram no deploy (`1059 Identifier name is too long`).

Ao gerar migration, **sempre** calcular o nome automático. Se passar de 64, passar nome explícito ≤ 64 em `unique()`, `index()` e FKs.

```php
$table->unique(['fabricante_id', 'placa'], 'carros_fabricante_placa_unique');
```

## Organização de Imports

### Ordem padrão

*Sempre separar por tipo.
*Sempre priorizar o diretorio de nivel mais baixo.

EXEMPLO:
```php
use Illuminate\Database\Eloquent\Builder;
```
Deve gerar uma seção:

```php
// ELOQUENT
use Illuminate\Database\Eloquent\Builder;
```

Abaixo estão alguns exemplos de seções. Nenhuma seção é obrigatória. Só deve existir a seção se existir algum import que de fato se encaixa na categoria:

```php
// HTTP
// CONTROLLERS
// FACADES
// INERTIA
// FORM REQUESTS
// ENUMS
// QUERIES
// SERVICES
// REPOSITORIES
// MODELS
// ELOQUENT
```

Molde com imports por seção: `moldes/laravel/app/Queries/Carro/Queries.php`.

**Escopo do validador automático:** arquivos **novos** ou em pasta `Referencia/` exigem seções; legado tocado incidentalmente não é reformatado só para passar no script.

## SQL puro em PHP (bloqueante)

Vale para heredoc/nowdoc (`<<<'SQL'`), strings multilinha, `DB::raw()`, `whereRaw()`, `orderByRaw()`, `selectRaw()`, `DB::statement()` e SQL dinâmico equivalente.

- **Proibido** interpolar ou concatenar valores externos no SQL; usar bindings parametrizados nas APIs que os aceitam.
- **Proibido** deixar o SQL “colado” na coluna zero ou desalinhado do PHP (ex.: nowdoc abrindo na chain sem parênteses e fechamento `SQL)` na mesma linha do último termo).
- Nowdoc/heredoc multilinha: envolver o argumento em **parênteses** quando estiver em method chain ou chamada.
- **Indentar** cada linha do SQL dentro do nowdoc/heredoc, alinhada ao bloco PHP (mesmo nível relativo do corpo da função/método).
- Delimitador de fechamento (`SQL`) na indentação coerente com o bloco (nowdoc indentável, PHP 7.3+).
- SQL **curto** em uma única linha pode permanecer em string simples: `->orderByRaw('COLUNA ASC')`.

```php
$query->orderByRaw(
    <<<'SQL'
        NIVEL ASC,
        (ORDEM IS NULL OR ORDEM = '') ASC,
        ORDEM ASC,
        DESCRICAO ASC
    SQL
);

$hierarquias = DB::table('HIERARQUIA')
    ->where('COD_EMPRESA', $empresaId)
    ->orderByRaw(
        <<<'SQL'
            NIVEL ASC,
            DESCRICAO ASC
        SQL
    )
    ->get();
```

## Formatação e legibilidade (preservar; não “normalizar”)

Ao editar qualquer arquivo, **o diff deve mudar só o necessário** para a tarefa. É proibido “limpar” ou padronizar estilo de propósito.

**Não remover nem evitar:**

- **Alinhamento com espaços** em atribuições consecutivas (`=` na mesma coluna).
- **Alinhamento** de `=>` em arrays quando o trecho já usa esse padrão.
- **Estrutura de `if` com chaves e quebra de linha** para `continue` / `return` antecipado. Não trocar por `if ($x) continue;` ou `if ($x) return $y;` na mesma linha quando o arquivo usa bloco com chaves.

**Não executar** Pint, Prettier ou format-on-save em arquivos tocados **só** para reformatar, a menos que o usuário peça.

**Exemplo (atribuições alinhadas — manter o “ANTES”, não impor o “DEPOIS”):**

```php
// Manter quando já existir no arquivo:
$tipo1     = 'ruim';
$mensagem1 = "Atenção: você está com {$percentual}%, abaixo da meta…";

// Evitar introduzir por hábito:
$tipo1 = 'ruim';
$mensagem1 = "Atenção: você está com {$percentual}%, abaixo da meta…";
```

## Prioridade absoluta
Antes de gerar qualquer código, identificar os padrões já existentes no arquivo/módulo
em questão e segui-los estritamente. Nunca introduzir padrões novos sem solicitação explícita,
mesmo que sejam "melhores práticas" gerais do Laravel ou PHP.
