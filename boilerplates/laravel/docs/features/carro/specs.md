# Especificação: recurso **Carro**

Documento de contexto para humanos e para assistentes de IA ao trabalhar em prompts relacionados a **carros** neste boilerplate Laravel.

---

## 1. Propósito

O recurso **Carro** exemplifica o padrão do projeto:

- **Queries** (`App\Queries\Carro\Queries`): acesso a dados e consultas reutilizáveis.
- **Services** (`App\Services\Carro` e `App\Services\Api\Carro`): regras de orquestração, transações e formatação antes de persistir.

A API REST dos controllers Laravel inspira os nomes dos métodos em queries e services: **index**, **show**, **store**, **update**, **destroy**.

---

## 2. Domínio e modelo de dados

### 2.1 Model

- Classe: `App\Models\Carro`
- Tabela: `carros`
- Atributos em mass assignment (`$fillable`): `marca`, `modelo`, `ano`, `cor`, `placa`, `km`
- Casts: `ano` e `km` como inteiros

### 2.2 Banco (migration)

Tabela `carros` (resumo):

| Coluna   | Observação                          |
|----------|-------------------------------------|
| `id`     | Chave primária                      |
| `marca`  | String (até 80 caracteres)          |
| `modelo` | String (até 120 caracteres)         |
| `ano`    | Ano numérico                        |
| `cor`    | Opcional                            |
| `placa`  | Única no banco                      |
| `km`     | Padrão 0                            |
| `created_at` / `updated_at` | Timestamps Laravel |

Regras de negócio adicionais (unicidade de placa, obrigatoriedade de campos na criação, etc.) podem ser reforçadas em **Form Requests** ou validação na camada HTTP; este boilerplate concentra persistência e consulta em Queries + Services.

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
- Campos mapeados: `marca`, `modelo`, `ano`, `cor`, `placa`, `km` (com cast numérico onde aplicável).
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

Garantir que `helpers.php` esteja carregado pelo autoload do Composer do aplicativo final.

---

## 7. Arquivos de referência

| Caminho |
|-----------|
| `app/Models/Carro.php` |
| `app/Queries/Carro/Queries.php` |
| `app/Services/Carro/Service.php` |
| `app/Services/Api/Carro/Service.php` |
| `app/helpers.php` |
| `database/migrations/2026_05_08_000000_create_carros_table.php` |

---

## 8. Extensões comuns (fora do escopo mínimo do boilerplate)

- Rotas e controllers HTTP que chamem os services.
- Policies, autorização e escopo por usuário.
- Form Requests e regras de validação alinhadas à migration.
- Testes automatizados (Feature/Unit) sobre `store`/`update` e conflito de placa duplicada.

Ao alterar comportamento, **atualize este `specs.md`** para manter o contexto para a próxima sessão de desenvolvimento ou de IA.
