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

## JavaScript (Vanilla)
- `$(function(){ ... })` como entry point
- Handlers no fim do arquivo
- Função `inicializar()` sempre presente e chamada no fim
- Arrow functions

## React
- Componentes em `PascalCase` como `function` ou arrow function
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
