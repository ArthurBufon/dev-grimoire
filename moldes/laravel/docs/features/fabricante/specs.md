# Especificação: recurso **Fabricante**

Catálogo de fabricantes usado no vínculo `belongsTo` de Carro.

---

## 1. Propósito

O recurso **Fabricante** exemplifica um catálogo pai simples:

- **Queries** (`App\Queries\Fabricante\Queries`): acesso a dados e filtros.
- **Services** (`App\Services\Fabricante\Service`): orquestração e transações.

Métodos REST: **index**, **show**, **store**, **update**, **destroy**.

---

## 2. Domínio e modelo de dados

### 2.1 Model

- Classe: `App\Models\Fabricante`
- Tabela: `fabricantes`
- Atributos em mass assignment: `nome`, `descricao`, `ativo`
- Casts: `ativo` como boolean
- Relação: `hasMany(Carro::class)`

### 2.2 Banco (migration)

| Coluna | Observação |
|---|---|
| `id` | Chave primária |
| `nome` | String única, até 120 caracteres |
| `descricao` | Opcional, até 255 caracteres |
| `ativo` | Boolean, padrão `true` |
| `created_at` / `updated_at` | Timestamps Laravel |

---

## 3. Queries (`App\Queries\Fabricante\Queries`)

### 3.1 `index(array $filtros)`

Filtros suportados:

- `id`: igualdade
- `nome` / `busca_geral`: `LIKE` em `nome`
- `ativo`: igualdade booleana
- `ordenacao`: opcional (`coluna`, `ordem`); padrão `ativo desc`, `nome asc`

### 3.2 Demais métodos

Seguem o contrato padrão `{ sucesso, dados, erros }` do grimório.

---

## 4. Service (`App\Services\Fabricante\Service`)

- `store` / `update`: transação DB; `formatarDatabase` só inclui chaves presentes.
- `destroy`: transação; flash de sucesso/erro na sessão web.

---

## 5. Arquivos de referência

| Caminho |
|---|
| `app/Models/Fabricante.php` |
| `app/Queries/Fabricante/Queries.php` |
| `app/Services/Fabricante/Service.php` |
| `database/migrations/2026_05_08_000000_create_fabricantes_table.php` |
| `tests/Feature/FabricanteTest.php` |
| `moldes/contratos/fabricante.md` |
