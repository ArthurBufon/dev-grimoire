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
- Atributos em mass assignment (`$fillable`): `fabricante_id`, `modelo`, `ano`, `cor`, `placa`, `km`, `valor`, `data_lancamento`
- Casts: `fabricante_id`, `ano` e `km` como inteiros; `valor` como decimal com duas casas; `data_lancamento` como `date`
- Relação: `belongsTo(Fabricante::class)`

### 2.2 Banco (migration)

Tabela `carros` (resumo):

| Coluna   | Observação                          |
|----------|-------------------------------------|
| `id`     | Chave primária                      |
| `fabricante_id` | FK para `fabricantes`; `restrictOnDelete` |
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
  - `fabricante_id`: igualdade
  - `modelo`: `LIKE` com `%valor%`
  - `ano`: igualdade
  - `placa`: igualdade (já deve refletir o formato normalizado se a escrita passou pelo service)
  - `busca_geral`: `modelo`, `ano`, `placa` e nome do fabricante relacionado
  - `data_lancamento_inicio` / `data_lancamento_fim`: `whereDate('data_lancamento', '>=' | '<=', $valor)`
- `carregarRelacionamentos`: array de relações para `with()` (ex.: `['fabricante']`)
- `ordenacao`: opcional, estrutura `['coluna' => string, 'ordem' => 'asc'|'desc']`

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
- **`store` / `update`**: transação DB; monta payload com **`formatarDatabase`**: só inclui chaves **presentes** no array de entrada.
- Campos mapeados: `fabricante_id`, `modelo`, `ano`, `cor`, `placa`, `km`, `valor`, `data_lancamento`.
- **`normalizarPlaca`**: trim, remove espaços internos, converte para maiúsculas.
- **`destroy(Carro $carro)`**: transação; flash de sucesso/erro na sessão.

---

## 5. View Service (`App\Services\Carro\View\Service`)

- **`index`**: repassa filtros à query com `carregarRelacionamentos: ['fabricante']`.
- **`create` / `edit`**: inclui `fabricantes` (catálogo ativo) para o select do formulário.
- **`edit`**: carrega `carro` com relação `fabricante`.

---

## 6. Service API (`App\Services\Api\Carro\Service`)

- Mesma injeção de `Queries` e o mesmo contrato de métodos **index / show / store / update / destroy**.
- Diferença em relação ao web: **sem** `session()->flash` no fluxo de exclusão.

---

## 7. Camada HTTP

### 7.1 Form Requests

- `fabricante_id`: obrigatório; `exists:fabricantes,id`
- Demais rules alinhadas à migration; `placa` unique (no update, `Rule::unique(...)->ignore($carro)`).

---

## 8. Arquivos de referência

| Caminho |
|-----------|
| `app/Http/Controllers/Web/Admin/Carro/CarroController.php` |
| `app/Http/Requests/Web/Admin/Carro/StoreRequest.php` |
| `app/Http/Requests/Web/Admin/Carro/UpdateRequest.php` |
| `app/Models/Carro.php` |
| `app/Models/Fabricante.php` |
| `app/Queries/Carro/Queries.php` |
| `app/Services/Carro/Service.php` |
| `app/Services/Api/Carro/Service.php` |
| `app/Services/Carro/View/Service.php` |
| `database/migrations/2026_05_08_000001_create_carros_table.php` |
| `tests/Feature/CarroTest.php` |
| `moldes/contratos/carro.md` |

---

## 9. Extensões comuns (fora do escopo mínimo do boilerplate)

- Policies, autorização e escopo por usuário.
- Factory para seeds/testes.
- CRUD web completo de Fabricante.

Ao alterar comportamento, **atualize este `specs.md`** para manter o contexto para a próxima sessão de desenvolvimento ou de IA.
