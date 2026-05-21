# User Rules — Guia de configuração

As **User Rules** são regras **globais**: valem para **todos os projetos** no Cursor, não só para este repositório. O agente as considera em qualquer workspace, junto com as regras do projeto (`.cursor/rules/`, se existirem).

Os arquivos desta pasta são a **fonte de verdade** das convenções da equipe. Copie o conteúdo de cada um para as User Rules do Cursor — ou mantenha os `.md` sincronizados com o que estiver em **Settings**.

## Como ativar no Cursor

1. Abra **Cursor Settings** (`Ctrl + ,` / `Cmd + ,` ou **File → Preferences → Cursor Settings**).
2. Vá em **Rules, Skills, Subagent** (ou busque por *rules* na barra de configurações).
3. Na aba **User**, adicione ou edite as regras.
4. Cole o conteúdo dos arquivos abaixo (um bloco por arquivo, ou agrupe conforme preferir).

Ordem sugerida: **geral** primeiro; depois a regra da stack do projeto em que você está trabalhando.

```
Cursor Settings
└── Rules, Skills, Subagent
    └── User   ← regras globais (esta pasta)
```

## Arquivos desta pasta

| Arquivo | Quando usar |
|---------|-------------|
| [`geral.md`](./geral.md) | Sempre — princípios, nomenclatura em português, Git, segurança |
| [`php.md`](./php.md) | Projetos PHP / Laravel |
| [`javascript.md`](./javascript.md) | Projetos JavaScript / React (e vanilla) |
| [`flutter.md`](./flutter.md) | Projetos Flutter / Dart |

### [`geral.md`](./geral.md)

Regras transversais: KISS, alterações mínimas, funções e classes em português, estrutura de pastas sem verbos, análise antes de codar, commits em português no imperativo, e boas práticas de segurança (`.env`, sem credenciais no código).

### [`php.md`](./php.md)

Convenções Laravel: retorno `{ sucesso, dados, erros }`, `try/catch` em services com `logarErro`, estrutura Controller → Service → Queries, convenção `index/show/store/update/destroy`, Sail/Artisan e formatação (sem rodar Pint só para reformatar).

### [`javascript.md`](./javascript.md)

Convenções JS/React: mesmo padrão de retorno, estrutura Pages / Services / Queries / Hooks, **sempre `fetch`** (sem axios/jQuery.ajax), handlers e `inicializar()` no vanilla, componentes em TSX quando possível.

### [`flutter.md`](./flutter.md)

Arquitetura **Model → Query → Service → Page**, queries com `index/show/store/update/destroy`, models com `fromMap`/`toMap` (sem DTO), widgets `const`, `ListView.builder` em listas longas.

## Dicas

- **User vs Project**: User Rules são globais; regras em `.cursor/rules/` ou `AGENTS.md` valem só no repositório atual.
- **Stack mista**: mantenha `geral.md` + apenas o `.md` da stack do repo aberto; evita conflito entre PHP, JS e Flutter no mesmo prompt.
- **Atualização**: ao mudar um arquivo aqui, atualize também a aba **User** no Cursor (ou vice-versa) para não divergir.

## Estrutura da pasta

```
.cursor/user-rules/
├── README.md      ← este guia
├── geral.md       ← regras gerais (obrigatório)
├── php.md         ← PHP / Laravel
├── javascript.md  ← JavaScript / React
└── flutter.md     ← Flutter / Dart
```
