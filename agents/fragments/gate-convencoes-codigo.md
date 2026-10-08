# Gate Convenções de Código

## O que é

Checklist **bloqueante** para PHP e JavaScript/TypeScript gerados ou alterados. Complementa `gate-anti-slop.md` (escopo/complexidade); aqui vale conformidade estrutural.

Validação automática: `bash {GRIMOIRE}/agents/scripts/validar-convencoes-diff.sh` no repositório do app (agente executa; dev não roda manualmente).

## Checklist (bloqueante)

- [ ] **Referência estrutural:** ao criar arquivo ou alterar método público, dependência injetada, contrato de retorno ou responsabilidade de `Service`, `Queries`, Controller, Request, Page ou Form, ler o molde mapeado e o análogo do módulo; divergência só com padrão consolidado ou instrução explícita do dev.

### PHP — todo arquivo `.php` alterado

- [ ] **Imports:** com 3+ linhas `use`, agrupar com comentários `// CATEGORIA` (ver `docs/rules/php.md`).
- [ ] **Controller JSON:** proibido `return response()->json([...])` inline. Montar `$retorno = [...]` e só então `return response()->json($retorno, $status)`.
- [ ] **Query principal** (`app/Queries/{Entidade}/Queries.php`): somente `index`, `show`, `store`, `update`, `destroy`; `index`/`show` recebem apenas `$filtros`, enquanto `update` recebe `int $id, array $dados` e `destroy` recebe apenas `$id`; sem `App\Queries\*` / `App\Services\*` injetados; sem `setRelation` ou enriquecimento pós-consulta (→ `Service`).
- [ ] **JSON controller** (`Painel/Json/{Entidade}/…`) e **View Service** (`Services/{Entidade}/View/Service.php`): `index`/`show` da entidade via `App\Services\{Entidade}\Service`, não `$this->queries->index|show`.

### JavaScript/TypeScript — todo arquivo `.js`, `.ts` ou `.tsx` alterado

- [ ] **Imports:** com 3+ linhas `import`, agrupar com comentários `// CATEGORIA` (ver `docs/rules/javascript.md`).
- [ ] **HTTP:** chamadas HTTP brutas (`fetch`, `axios`, `XMLHttpRequest`, jQuery) ficam apenas em `Queries/**`; `router.get` e `useForm` Inertia continuam exceções documentadas.

### JavaScript/TypeScript — arquivos em `Queries/**`

- [ ] **Queries principal** (`Queries/{Entidade}/Queries.*`): somente `index`, `show`, `store`, `update`, `destroy`, em objeto, arrow function ou classe TypeScript.
- [ ] **Ação específica:** em subpasta (`Queries/{Entidade}/Referencia/Queries.*`, etc.) com método REST (`store` para gerar referência).
- [ ] **HTTP:** `const url`, `const options`, `const retorno = await fetch(url, options)` — proibido `fetch` inline.

## Ritual de saída (obrigatório)

Antes de checkpoint, encerramento de plano, quick-fix ou commit via sync-origin:

```text
Gate convenções:
- Executei validar-convencoes-diff.sh: [ok | falhou — arquivo/regra]
- Violação encontrada → corrigir antes de avançar
```

Falha do script **bloqueia** entrega. Não substituir por revisão manual “de cabeça”.

## Moldes de referência

| Caso | Molde |
|---|---|
| Controller referência PHP | `moldes/laravel/app/Http/Controllers/Web/Admin/Carro/Referencia/CarroReferenciaController.php` |
| Queries referência JS (Laravel+Blade) | `moldes/laravel/resources/js/Queries/Carro/Referencia/Queries.js` |
| Queries referência TS (React) | `moldes/react/Queries/Carro/Referencia/Queries.tsx` |

Regras completas: `docs/rules/geral.md` § Convenções absolutas + `php.md` / `javascript.md`.
