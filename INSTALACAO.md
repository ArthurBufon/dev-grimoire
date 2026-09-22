# Instalação do Dev Grimoire

Você precisa clonar o Dev Grimoire uma só vez para usar suas regras, moldes e skills em vários projetos. Antes de começar, instale o Git e as ferramentas que pretende usar: Cursor, Codex ou Claude Code.

## 1. Clonar o repositório

Escolha uma pasta perto dos seus projetos. Se eles ficam em `~/projects/`, rode:

```bash
mkdir -p "$HOME/projects"
cd "$HOME/projects"
git clone https://github.com/ArthurBufon/dev-grimoire.git dev-grimoire
```

A pasta do clone deve se chamar `dev-grimoire`; é por esse nome que os agentes a encontram. Um único clone funciona nestes casos:

- Ao lado do app: `projects/dev-grimoire` e `projects/meu-app`.
- Acima da pasta do app: `projects/dev-grimoire` e `projects/laravel/meu-app`.
- Em uma pasta irmã: `projects/dev-grimoire` e `projects-flutter/meu-app`.

## 2. Criar o alias `grimoire-sync`

Abra `~/.bashrc` se usa Bash ou `~/.zshrc` se usa Zsh. Adicione a linha abaixo. Se clonou em outro lugar, ajuste o caminho:

```bash
alias grimoire-sync="$HOME/projects/dev-grimoire/agents/scripts/sync.sh"
```

Para ativar o alias no terminal atual, recarregue o arquivo que editou:

```bash
source ~/.bashrc  # ou: source ~/.zshrc
```

Agora você pode rodar `grimoire-sync` de qualquer pasta. Ele atualiza o clone com `git pull origin main`, valida o Grimório e copia as instruções e skills globais para as ferramentas disponíveis. Para copiar sem atualizar o clone, rode `bash "$HOME/projects/dev-grimoire/agents/scripts/sync-global-skills.sh"`.

## 3. Configurar Cursor, Codex e Claude Code

Siga apenas as seções das ferramentas que você usa. O script só copia skills para pastas `skills/` que já existem. Por isso, crie a pasta indicada antes de rodar `grimoire-sync`. Uma execução atualiza todas as ferramentas cujas pastas já estiverem prontas.

### Cursor

1. Crie o diretório de skills: `mkdir -p "$HOME/.cursor/skills"`.
2. Rode `grimoire-sync`.
3. No Cursor, abra **Settings → Rules → User** e cole todo o conteúdo de [`docs/rules/global.md`](docs/rules/global.md). O script não preenche essa tela.
4. Abra um app no Cursor e peça ao agente para encontrar `{GRIMOIRE}` e ler `{GRIMOIRE}/README.md`. Ele deve conseguir ler o arquivo local.

Para detalhes de layout e solução de problemas, consulte o [guia do Cursor](guias/cursor/setup-grimoire-local.md).

### Codex

1. Crie o diretório de skills: `mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"`.
2. Rode `grimoire-sync`.
3. Confira se `${CODEX_HOME:-$HOME/.codex}/AGENTS.md` foi criado com as instruções globais. As skills devem estar em `${CODEX_HOME:-$HOME/.codex}/skills/`.
4. Abra uma nova sessão do Codex na raiz de um app. Peça ao agente para dizer quais instruções carregou e onde encontrou `{GRIMOIRE}`.

Se houver um `AGENTS.override.md` no diretório do Codex, o Codex usa esse arquivo no lugar de `AGENTS.md`, e o script não atualiza `AGENTS.md`. Veja também o [guia do Codex](guias/codex/setup-grimoire-local.md).

### Claude Code

1. Crie o diretório de skills: `mkdir -p "$HOME/.claude/skills"`.
2. Rode `grimoire-sync`.
3. Confira se `~/.claude/CLAUDE.md` foi criado com as instruções globais. As skills devem estar em `~/.claude/skills/`.
4. Abra uma nova sessão do Claude Code na raiz de um app. Peça ao agente para encontrar `{GRIMOIRE}` e ler `{GRIMOIRE}/README.md`.

Veja também o [guia do Claude Code](guias/claude/setup-grimoire-local.md).

## 4. Preparar o contexto local de cada app

As instruções globais e as skills servem a todos os projetos. Os arquivos na raiz de cada app explicam aquele repositório:

| Onde fica | Para que serve |
|---|---|
| Configuração global do Cursor, Codex ou Claude Code | Carrega a User Rule e as skills compartilhadas pelo Grimório. |
| `AGENTS.md` na raiz do app | Registra objetivo, stack, arquitetura, comandos e limites próprios do app. |
| `CLAUDE.md` na raiz do app | Faz o Claude Code ler `AGENTS.md` com `@AGENTS.md` e guarda apenas instruções exclusivas dele. |

`grimoire-sync` atualiza a configuração global. Ele não cria nem preenche os arquivos locais dos apps.

Se algum desses arquivos ainda não existe, rode este comando na raiz do app:

```bash
bash "$HOME/projects/dev-grimoire/agents/scripts/inicializar-contexto-agentes.sh"
```

Se clonou o Grimório em outro lugar, ajuste o caminho. O inicializador cria os dois arquivos a partir dos moldes e preserva os que já existem. Ele deixa campos para você preencher; não descobre o contexto do app sozinho.

Depois de rodar o comando:

1. Leia o README, os arquivos que identificam as tecnologias usadas (como `composer.json` ou `package.json`), a documentação e os módulos principais do app.
2. Preencha `AGENTS.md` com o que encontrou: objetivo, tecnologias, organização do código, comandos reais de validação e limites próprios do projeto. Não copie regras globais nem invente comandos. Se um agente sugerir o conteúdo, revise e aprove antes de ele editar o arquivo.
3. Confira se `CLAUDE.md` mantém `@AGENTS.md`. Acrescente algo nele apenas se for uma instrução exclusiva do Claude Code.
4. Versione os arquivos na raiz do app. Cada um deve ter no máximo 50 linhas; detalhes maiores podem ficar no README, em uma spec ou em um ADR.

## Atualizações

Rode `grimoire-sync` para trazer as mudanças do repositório e atualizar as instruções globais do Codex e Claude Code e as skills das ferramentas disponíveis. Se [`docs/rules/global.md`](docs/rules/global.md) mudar, copie o conteúdo atualizado para **Settings → Rules → User** no Cursor.
