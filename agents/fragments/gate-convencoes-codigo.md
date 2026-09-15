# Gate Convenções de Código

## O que é

Checklist **bloqueante** para PHP e JavaScript/TypeScript gerados ou alterados. Complementa `gate-anti-slop.md` (escopo/complexidade); aqui vale conformidade estrutural.

Validação automática: `bash {GRIMOIRE}/agents/scripts/validar-convencoes-diff.sh` no repositório do app (agente executa; dev não roda manualmente).

## Checklist (bloqueante)

### PHP — todo arquivo `.php` alterado

- [ ] **Imports:** com 3+ linhas `use`, agrupar com comentários `// CATEGORIA` (ver `docs/rules/php.md`).
- [ ] **Controller JSON:** proibido `return response()->json([...])` inline. Montar `$retorno = [...]` e só então `return response()->json($retorno, $status)`.

### JavaScript/TypeScript — arquivos em `Queries/**`

- [ ] **Queries principal** (`Queries/{Entidade}/Queries.*`): somente `index`, `show`, `store`, `update`, `destroy`.
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
