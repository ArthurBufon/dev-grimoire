# JavaScript / React

## Retorno padronizado
```js
{ sucesso: true, dados: {}, erros: [] }
```

## Estrutura de arquivos
- Pages: `[js_pages_path]/NomeModulo/Index.js` / `Form.js` / `Create.js` / `Edit.js`
- Services: `[js_services_path]/NomeModulo/Service.js`
- Queries: `[js_queries_path]/NomeModulo/Queries.js`
- Hooks: `[js_hooks_path]/useNomeHook.js`
- Componentes: `[js_components_path]/NomeComponente.jsx`

## Queries

Queries devem ser compostas somente por:

* `index`
* `show`
* `store`
* `update`
* `destroy`

Caso alguma query específica seja necessária, deve ser usado um diretório específico para o contexto da query.

Padrão:

```txt
/Queries/Recurso/QueryEspecifica/Queries.ts
```

ou:

```txt
/Queries/Recurso/QueryEspecifica/Queries.tsx
```

### Exemplos

* ❌ `Queries/Carro/Queries.tsx: ligarCarro`
* ✅ `Queries/Carro/Ligar/Queries.tsx: store`

## JavaScript (Vanilla)
- `$(function(){ ... })` como entry point
- Handlers no fim do arquivo
- Função `inicializar()` sempre presente e chamada no fim
- Arrow functions

## React
- COMPONENTES - REGRAS OBRIGATÓRIAS: `PascalCase` SEMPRE + Formato Arrow function (RAFCE) + export exato do nome do arquivo (Create.tsx exporta Create)
- Um componente por arquivo
- Hooks customizados em `use[Nome]` — lógica reutilizável fora dos componentes
- Estado local: `useState`; efeitos: `useEffect`; contexto global: `useContext` ou lib de estado
- Sem lógica de negócio nos componentes — delegar para Services/Hooks
- Sem chamadas HTTP nos componentes — delegar para Queries
- Preferência sempre por TYPESCRIPT/TSX

## HTTP (obrigatório)
- **Sempre `fetch`** — proibido `$.ajax`, `jQuery.get/post`, `axios`, `XMLHttpRequest`
- Requests HTTP apenas em Queries, nunca em Pages ou componentes
- Cada método: `async function` + `try/catch` + headers (`Accept`, `Content-type`, `X-CSRF-Token`)
- Catch retorna `{ sucesso: false, dados: [], erros: ['...'] }`

```js
index: async function (filtros) {
    try {
        const url = route("modulo.index.json", filtros);
        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "X-CSRF-Token": csrfToken,
            },
        };
        const retorno = await fetch(url, options);
        return await retorno.json();
    } catch (error) {
        console.error(error);
        return { sucesso: false, dados: [], erros: ["Erro ao buscar registros!"] };
    }
},
```

## Nomenclatura
- `camelCase` — variáveis e funções
- `PascalCase` — classes e componentes React
- `UPPER_SNAKE_CASE` — constantes
- `kebab-case` — arquivos não-componentes
- `PascalCase` — arquivos de componentes React (`.jsx`)

## Organização de Imports

Todo import deve ser agrupado por categoria lógica, com comentário de seção em maiúsculas. Referência: `moldes/react/Pages/Carro/Index.tsx` e `moldes/react/Pages/Carro/Create.tsx`.

### Ordem padrão (Pages e componentes)

```tsx
// REACT
// UI
// TIPOS
// ROTAS
```

Seções ausentes no arquivo de referência do módulo (ex.: sem `// TIPOS` quando não há types) são aceitáveis — seguir o padrão do arquivo ou módulo alterado.

### Regras

* Nunca misturar categorias
* Sempre manter ordem consistente dentro do arquivo
* Remover imports não utilizados
* Priorizar clareza sobre quantidade de linhas
* `import type` na mesma categoria dos imports de valor correspondentes (ex.: tipos em `// TIPOS`, ou junto de `// REACT` quando for type-only de React)
* Exports sempre devem seguir o nome do arquivo: Create.tsx exporta Create, Index.tsx exporta Index