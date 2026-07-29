# JavaScript / React

## Retorno padronizado
```js
{ sucesso: true, dados: {}, erros: [] }
```

## Estrutura de arquivos
- Pages: `[js_pages_path]/NomeModulo/Index.js` / `Form.js` / `Create.js` / `Edit.js`
- Forms: `[js_components_path]/Forms/NomeModulo/Form.tsx` — campos compartilhados entre `Create` e `Edit`
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

### Forms

Páginas `Create` e `Edit` com formulário seguem o padrão de `moldes/react/Pages/Carro/Create.tsx`, `moldes/react/Pages/Carro/Edit.tsx` e `moldes/react/Components/Forms/Carro/Form.tsx`.

#### Obrigatório

* **`useForm` do Inertia** — estado, `setData`, `processing` e submit (`post` / `put`). Proibido `router.post` / `router.put`. O `useForm` permite controle fino pré-submit (validação, transformação de dados) quando necessário.
* **`handleCampoChange`** — helper privado na Page, wrapper tipado de `setData`. Previne erros de tipagem e deixa o código mais idiomático e legível em pt-BR.
* **`handleSubmit`** — helper privado na Page com `evento.preventDefault()`, validação pré-submit e chamada a `post` / `put` do `useForm`.
* **Componente `Form` compartilhado** — campos comuns de `Create` e `Edit` extraídos para `[js_components_path]/Forms/{Entidade}/Form.tsx` (ex.: `resources/js/Components/Forms/Carro/Form.tsx`).

#### Responsabilidades

| Arquivo | Responsabilidade |
|---|---|
| `Create.tsx` / `Edit.tsx` | `useForm`, valores iniciais, `handleCampoChange`, `validarFormulario`, `handleSubmit`, layout da página |
| `Forms/{Entidade}/Form.tsx` | markup dos campos, `InputError`, botões, props controladas (`data`, `onCampoChange`, `onSubmit`, `processing`, `errosCliente`) |

#### Exemplo (Page)

```tsx
const { data, setData, post, processing } = useForm<DadosFormulario>({ /* ... */ });

const handleCampoChange = <K extends keyof DadosFormulario>(
    campo: K,
    valor: DadosFormulario[K],
) => {
    setData((dadosAnteriores) => ({
        ...dadosAnteriores,
        [campo]: valor,
    }));
};

const handleSubmit = (evento: SubmitEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const validacao = validarFormulario();

    if (!validacao.sucesso) {
        setErrosCliente(validacao.erros);
        return;
    }

    setErrosCliente([]);
    post(CarroController.store.url()); // Edit usa put(...)
};
```

#### Exemplo (Form compartilhado)

```tsx
<Form
    data={data}
    onCampoChange={handleCampoChange}
    onSubmit={handleSubmit}
    processing={processing}
    errosCliente={errosCliente}
/>
```

## HTTP (obrigatório)
- **Sempre `fetch`** — proibido `$.ajax`, `jQuery.get/post`, `axios`, `XMLHttpRequest`
- Requests HTTP apenas em Queries, nunca em Pages ou componentes. Exceção quando usamos router.get para navegações com filtros/paginações em listagens
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
// INERTIA
// UI
// TIPOS
// CONTROLLERS
// QUERIES
// SERVICES
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