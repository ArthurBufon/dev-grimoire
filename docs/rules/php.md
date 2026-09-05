# PHP / Laravel

## Retorno padronizado
Todo método de service e controller retorna:
```php
return ['sucesso' => true, 'dados' => ['model' => $model], 'erros' => []];
```

## Tratamento de erros em Services
Todo método público usa `try/catch` com `logarErro` e `formatarMensagemErro`:

```php
public function store(array $dados): array
{
    try {
        $model = Model::create($dados);
        return ['sucesso' => true, 'dados' => ['model' => $model], 'erros' => []];
    } catch (\Throwable $th) {
        $this->logarErro($dados, 'criar', formatarMensagemErro($th));
        return ['sucesso' => false, 'dados' => [], 'erros' => [formatarMensagemErro($th)]];
    }
}

private function logarErro(array $dados, string $acao, string $mensagemErro): void
{
    $mensagem = "Erro ao {$acao} {entidade}!";
    Log::error($mensagem, ['sucesso' => false, 'dados' => $dados, 'erros' => ["{$mensagem}: {$mensagemErro}"]]);
}
```
- `update` retorna `$model->fresh()`
- `formatarMensagemErro(\Throwable $th)` — helper global em `app/helpers.php`

## Estrutura
*Módulos possíveis: Web ou Api
- Controllers: `app/Http/Controllers/[Modulo]/[Entidade]/[Entidade]Controller.php` (molde: `moldes/laravel/app/Http/Controllers/Web/Admin/Carro/CarroController.php`)
- Queries: `app/Queries/[Entidade]/Queries.php`
- Services: `app/Services/[Modulo]/[Entidade]/Service.php`
- Form Requests: `app/Http/Requests/[Modulo]/[Entidade]/[Acao]Request.php`. EX: StoreRequest.php + UpdateRequest.php (moldes: `moldes/laravel/app/Http/Requests/Web/Admin/Carro/`)
- URLs: sempre rotas nomeadas com `route()`
- Controllers chamam Services e View Services; validação HTTP fica nos Form Requests; resposta Inertia/redirect no Controller

## Queries (`app/Queries/`)

Queries nunca devem conter métodos além de:

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

Caso alguma query específica seja necessária, use uma subpasta de contexto em `app/Queries/[Entidade]/[Contexto]/Queries.php` e mantenha um método REST correspondente. Regras de negócio permanecem no `Service`.

- Sem lógica de negócio — apenas SQL/Eloquent
- Services chamam Queries; Controllers chamam Services
- Listagens paginadas: `Paginacao::aplicarPaginacao($query, $filtros)` (molde: `moldes/laravel/app/Helpers/Paginacao.php`); **não** duplicar paginação na Query nem usar função global

## Paginação (`App\Helpers\Paginacao`)

Classe estática em `app/Helpers/Paginacao.php` (PSR-4). Molde: `moldes/laravel/app/Helpers/Paginacao.php`.

- `Paginacao::aplicarPaginacao(Builder $query, array $filtros, int $porPagina = 10, int $maximoPaginas = 10, int $tetoQuantidade = 100): array` — retorna `['lista' => ..., 'paginacao' => ...]`
- `Paginacao::montarDadosPaginacao(...)` — metadados (`total`, `total_retornado`, `pagina`, `limite`, `total_paginas`)
- Filtros suportados:
  - `aplicar_paginacao` — omitido ou `true`: pagina; `false` (incl. `"false"`, `0`): sem paginação (sem offset nem metadados de página). Se `quantidade` estiver presente e > 0, aplica só `$query->limit(min(quantidade, $tetoQuantidade))`; se ausente ou inválida, retorna a lista inteira
  - `pagina` — página atual (default `1`; teto = `total_paginas`)
  - `quantidade` — com `aplicar_paginacao` omitido/`true`: itens por página (teto default 100 via `$tetoQuantidade`; quem chama pode elevar o teto, ex.: listagens sem paginação que precisam de mais itens). Se ausente ou inválida, usa `$porPagina` do método. Com `aplicar_paginacao: false`: limita o retorno sem paginar
  - `sem_limite_paginas` — omitido ou `false`: teto de páginas = `$maximoPaginas`; `true`: sem esse teto
- `paginacao.total` **sempre** reflete o total real de registros filtrados, independente do corte de `quantidade` — inclusive no modo sem paginação (`aplicar_paginacao: false`)
- Recomendação padrão: repassar os filtros do request/controller e deixar a helper decidir — **não** forçar default de `quantidade` em Service ou View Service. Exceção aceitável: listagens desenhadas para **sempre** operar sem paginação com limite alto e sensato (não o comportamento default de 10/página) podem fixar `aplicar_paginacao` e um default de `quantidade` na View Service, elevando o teto via `$tetoQuantidade` — documentar no código/specs da feature (referência: listagem de Título)
- Chaves de paginação (`pagina`, `quantidade`, `aplicar_paginacao`, `ordenacao`) **não** entram em `aplicarFiltros` da Query — são consumidas só pela helper
- Queries com `index` paginado delegam à helper; fallback de erro com estrutura completa de `paginacao` (ver molde Carro)

## PHP (estilo)
- Chaves em todos os control structures
- Constructor property promotion (PHP 8)
- Return types e type hints explícitos em todos os métodos
- Enum keys em TitleCase; values em `snake_case` / minúsculas (molde: `moldes/laravel/app/Enums/Marca.php`)
- Cast no Model com a classe do enum; validação HTTP com `Rule::enum(...)`
- PHPDoc com array shapes; comentários inline só em lógica complexa

## Sail / Artisan
- Comandos sempre via `vendor/bin/sail`
- Criar arquivos: `vendor/bin/sail artisan make:* --no-interaction`
- Testes: `vendor/bin/sail artisan test --compact --filter=NomeTest`

## Nomenclatura
- `PascalCase` para classes, controllers, models, enums
- `camelCase` para métodos e variáveis
- `snake_case` para colunas de banco e arquivos
- `UPPER_SNAKE_CASE` para constantes

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
