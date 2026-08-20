# Especificação: recurso **Carro**

Documento de contexto para humanos e para assistentes de IA ao trabalhar em prompts relacionados a **carros** neste boilerplate Laravel.

---

## 1. Propósito

O recurso **Carro** exemplifica o padrão do projeto:

- **Controller** (`App\Http\Controllers\Web\Admin\Carro\CarroController`): HTTP Inertia — chama View Service nas telas e Service nas mutações.
- **Form Requests** (`StoreRequest` / `UpdateRequest`): validação e normalização de entrada (ex.: placa).
- **Queries** (`App\Queries\Carro\Queries`): acesso a dados e consultas reutilizáveis.
- **Services** (`App\Services\Carro` e `App\Services\Api\Carro`): regras de orquestração, transações e formatação antes de persistir.

A API REST dos controllers Laravel inspira os nomes dos métodos em queries e services: **index**, **show**, **store**, **update**, **destroy**.

---

## 2. Domínio e modelo de dados

### 2.1 Model

- Classe: `App\Models\Carro`
- Tabela: `carros`
- Atributos em mass assignment (`$fillable`): `marca`, `modelo`, `ano`, `cor`, `placa`, `km`, `valor`, `data_lancamento`
- Casts: `marca` → `App\Enums\Marca`; `ano` e `km` como inteiros; `valor` como decimal com duas casas; `data_lancamento` como `date`

### 2.2 Enum `Marca`

- Classe: `App\Enums\Marca` (backed `string`)
- Cases em TitleCase; values em minúsculas (`toyota`, `honda`, `volkswagen`, `fiat`, `chevrolet`)
- Validação HTTP com `Rule::enum(Marca::class)` nos Form Requests

### 2.3 Banco (migration)

Tabela `carros` (resumo):

| Coluna   | Observação                          |
|----------|-------------------------------------|
| `id`     | Chave primária                      |
| `marca`  | String (value do enum `Marca`)      |
| `modelo` | String (até 120 caracteres)         |
| `ano`    | Ano numérico                        |
| `cor`    | Opcional                            |
| `placa`  | Única no banco                      |
| `km`     | Padrão 0                            |
| `valor`  | Decimal (10,2), padrão 0            |
| `data_lancamento` | Date, opcional               |
| `created_at` / `updated_at` | Timestamps Laravel |

Validação HTTP (unicidade de placa, obrigatoriedade de campos, etc.) fica nos **Form Requests**; persistência e consulta ficam em Queries + Services.

---

## 3. Queries (`App\Queries\Carro\Queries`)

Responsabilidade: montar o `Builder`, aplicar filtros/ordenação e executar CRUD, retornando sempre um **array de resultado** no formato abaixo.

### 3.1 Formato de retorno

Em geral:

- `sucesso` (bool)
- `dados` (array; chaves como `lista`, `model`, `id`, conforme o método)
- `erros` (array de strings; em falhas usar `formatarMensagemErro` definido em `app/helpers.php`)

### 3.2 `index(array $filtros)`

- Retorno em sucesso: `dados.lista` com coleção de modelos `Carro`.
- Filtros suportados em `aplicarFiltros` (valores vazios ou `null` são ignorados):
  - `id`: igualdade
  - `marca`, `modelo`: `LIKE` com `%valor%`
  - `ano`: igualdade
  - `placa`: igualdade (já deve refletir o formato normalizado se a escrita passou pelo service)
  - `data_lancamento_inicio` / `data_lancamento_fim`: `whereDate('data_lancamento', '>=' | '<=', $valor)` — filtro de intervalo, mesmo padrão usado para campos de data em outras listagens do projeto (ex.: `data_emissao` de Título)
- `ordenacao`: opcional, estrutura `['coluna' => string, 'ordem' => 'asc'|'desc']` (ambos obrigatórios para aplicar `orderBy`).

### 3.3 `show(array $filtros)`

- Mesmos filtros que em `index`, porém o resultado é um único registro: `dados.model` (`Carro` ou `null` se não houver linha).

### 3.4 `store(array $dados)`

- `Carro::create($dados)` com os campos já preparados pelo service.
- Sucesso: `dados.model`, `dados.id`.

### 3.5 `update(int $id, array $dados)`

- `findOrFail`, `fill`, `save`.
- Sucesso: `dados.model` atualizado.

### 3.6 `destroy(string|int $id)`

- `findOrFail`, `delete`.
- Sucesso quando linhas afetadas > 0.

---

## 4. Service web (`App\Services\Carro\Service`)

- Injeta `App\Queries\Carro\Queries`.
- **`index` / `show`**: repasse direto às queries.
- **`store` / `update`**: transação DB; monta payload com **`formatarDatabase`**: só inclui chaves **presentes** no array de entrada (`array_key_exists`), para permitir atualização parcial na camada que chama o service.
- Campos mapeados: `marca`, `modelo`, `ano`, `cor`, `placa`, `km`, `valor`, `data_lancamento` (com cast numérico onde aplicável).
- **`normalizarPlaca`**: trim, remove espaços internos, converte para maiúsculas (regra única de apresentação/persistência da placa no domínio deste exemplo).
- **`destroy(Carro $carro)`**: transação; em sucesso faz `session()->flash` de mensagem amigável; em erro faz flash de erro, `logarErro` e `rollBack`.
- Erros inesperados: `formatarMensagemErro($th)` nos retornos e no log.

---

## 5. Service API (`App\Services\Api\Carro\Service`)

- Mesma injeção de `Queries` e o mesmo contrato de métodos **index / show / store / update / destroy**.
- Diferença em relação ao web: **sem** `session()->flash` no fluxo de exclusão (adequado a API stateless).
- Mensagens de log do `logarErro` são prefixadas de forma a identificar contexto API.

A formatação de entrada para banco replica a ideia do service web (chaves aceitas e `normalizarPlaca`).

---

## 6. Helpers

- `formatarMensagemErro(Throwable $th)` em `app/helpers.php`: usado em queries e services para padronizar mensagens de falha (mensagem, arquivo e linha).
- `App\Helpers\Paginacao` em `app/Helpers/Paginacao.php`: paginação centralizada para listagens. `aplicar_paginacao: false` retorna sem paginar; com `quantidade`, limita o retorno (teto 100) sem metadados de página. Omitido/`true` pagina via `pagina` e `quantidade`.

Garantir que `helpers.php` e classes em `app/Helpers/` estejam disponíveis via autoload PSR-4 do aplicativo final.

---

## 7. Camada HTTP

### 7.1 Controller (`App\Http\Controllers\Web\Admin\Carro\CarroController`)

- Injeta `App\Services\Carro\Service` e `App\Services\Carro\View\Service`.
- **index / create / edit**: monta props via View Service e renderiza Inertia (`Carro/Index`, `Carro/Create`, `Carro/Edit`).
- **store / update / destroy**: chama o Service; em falha `back()->withErrors(['geral' => ...])`; em sucesso toast Inertia + `redirect()->route('admin.carros.index')`.
- Filtros da listagem vêm do `Request` (`busca_geral`, `data_lancamento_inicio`, `data_lancamento_fim`, `quantidade`, `pagina`, `aplicar_paginacao`). Services/View Services repassam sem forçar default de `quantidade`.

### 7.2 Form Requests

- `StoreRequest` / `UpdateRequest` em `App\Http\Requests\Web\Admin\Carro`.
- `prepareForValidation` normaliza `placa` (trim, sem espaços, maiúsculas) antes das rules.
- Rules alinhadas à migration; `placa` unique (no update, `Rule::unique(...)->ignore($carro)`).

---

## 8. Arquivos de referência

| Caminho |
|-----------|
| `app/Http/Controllers/Web/Admin/Carro/CarroController.php` |
| `app/Http/Requests/Web/Admin/Carro/StoreRequest.php` |
| `app/Http/Requests/Web/Admin/Carro/UpdateRequest.php` |
| `app/Enums/Marca.php` |
| `app/Models/Carro.php` |
| `app/Queries/Carro/Queries.php` |
| `app/Services/Carro/Service.php` |
| `app/Services/Api/Carro/Service.php` |
| `app/Services/Carro/View/Service.php` |
| `app/helpers.php` |
| `app/Helpers/Paginacao.php` |
| `database/migrations/2026_05_08_000000_create_carros_table.php` |
| `tests/Feature/CarroTest.php` |

---

## 9. Extensões comuns (fora do escopo mínimo do boilerplate)

- Policies, autorização e escopo por usuário.
- Factory para seeds/testes.
- Relações no Model (hasMany/belongsTo).

Ao alterar comportamento, **atualize este `specs.md`** para manter o contexto para a próxima sessão de desenvolvimento ou de IA.
