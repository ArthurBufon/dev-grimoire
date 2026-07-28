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
- Controllers: `app/Http/Controllers/[Modulo]/[Entidade]/[Entidade]Controller.php`
- Queries: `app/Queries/[Entidade]/Queries.php`
- Services: `app/Services/[Modulo]/[Entidade]/Service.php`
- Form Requests: `app/Http/Requests/[Modulo]/[Entidade]/[Acao]Request.php`. EX: StoreRequest.php + UpdateRequest.php
- URLs: sempre rotas nomeadas com `route()`

## Queries (`app/Queries/`)

Queries nunca devem conter métodos além de:

* `index`
* `show`
* `store`
* `update`
* `destroy`

Convenção obrigatória por entidade:
```php
public function index(): array        // listar
public function show(int $id): array  // buscar por ID
public function store(array $dados)   // inserir
public function update(array $dados)  // atualizar
public function destroy(int $id)      // deletar
```

Caso alguma query muito específica seja necessária, o `Service` deve lidar com essa lógica, mantendo o método com nome 100% em português, simples e objetivo.

- Sem lógica de negócio — apenas SQL/Eloquent
- Services chamam Queries; Controllers chamam Services

## PHP (estilo)
- Chaves em todos os control structures
- Constructor property promotion (PHP 8)
- Return types e type hints explícitos em todos os métodos
- Enum keys em TitleCase
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

```php
// HTTP
// CONTROLLERS
// FACADES
// INERTIA
// FORM REQUESTS
// QUERIES
// SERVICES
// REPOSITORIES
// UTILS
// MODELS
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
