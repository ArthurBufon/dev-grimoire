# Instalação do Dev Grimoire

Este guia usa um único clone local para compartilhar regras, moldes e skills entre projetos no Cursor, Codex e Claude Code. Tenha Git e o runtime que pretende usar instalados.

## 1. Clonar o repositório

Escolha uma pasta que contenha seus projetos ou seja irmã da pasta que os contém. Por exemplo, para apps em `~/projects/`:

```bash
mkdir -p "$HOME/projects"
cd "$HOME/projects"
git clone https://github.com/ArthurBufon/dev-grimoire.git dev-grimoire
```

O nome `dev-grimoire` é necessário para que os agentes encontrem o clone. Ele pode ficar ao lado dos apps (`projects/dev-grimoire` e `projects/meu-app`), no ancestral deles (`projects/dev-grimoire` e `projects/laravel/meu-app`) ou numa pasta irmã do ancestral (`projects/dev-grimoire` e `projects-flutter/meu-app`). Não clone uma cópia para cada app.

## 2. Criar o alias `grimoire-sync`

Abra o arquivo de configuração do seu shell: `~/.bashrc` para Bash ou `~/.zshrc` para Zsh. Adicione esta linha, ajustando o caminho caso tenha clonado em outro lugar:

```bash
alias grimoire-sync="$HOME/projects/dev-grimoire/agents/scripts/sync.sh"
```

Recarregue o arquivo que editou:

```bash
source ~/.bashrc  # ou: source ~/.zshrc
```

O alias pode ser executado de qualquer diretório. Ele faz `git pull origin main` no clone e depois executa `sync-global-skills.sh`, que valida o Grimório e publica as instruções e skills globais. Se preferir sincronizar sem atualizar o Git, rode `bash "$HOME/projects/dev-grimoire/agents/scripts/sync-global-skills.sh"`.

## 3. Configurar o runtime

O script só instala skills em diretórios `skills/` que já existam. Execute os passos dos runtimes que usa e rode `grimoire-sync` depois de preparar esses diretórios. Cada execução sincroniza todos os destinos disponíveis.

### Cursor

1. Crie o diretório de skills: `mkdir -p "$HOME/.cursor/skills"`.
2. Rode `grimoire-sync`.
3. Copie todo o conteúdo de [`docs/rules/global.md`](docs/rules/global.md) para **Settings → Rules → User** no Cursor. O script não configura essa User Rule pela interface.
4. Abra um app no Cursor e peça ao agente para localizar `{GRIMOIRE}` e ler `{GRIMOIRE}/README.md`. A leitura deve funcionar pelo filesystem.

Para detalhes de layout e solução de problemas, consulte o [guia do Cursor](guias/cursor/setup-grimoire-local.md).

### Codex

1. Crie o diretório de skills: `mkdir -p "${CODEX_HOME:-$HOME/.codex}/skills"`.
2. Rode `grimoire-sync`.
3. Confira se `${CODEX_HOME:-$HOME/.codex}/AGENTS.md` foi criado e contém a User Rule. O script também publica as skills em `${CODEX_HOME:-$HOME/.codex}/skills/`.
4. Inicie uma nova sessão do Codex na raiz de um app e peça para identificar as instruções carregadas e localizar `{GRIMOIRE}`.

Se existir `AGENTS.override.md` no diretório do Codex, ele tem prioridade sobre `AGENTS.md` e o script pula a atualização deste arquivo. Veja também o [guia do Codex](guias/codex/setup-grimoire-local.md).

### Claude Code

1. Crie o diretório de skills: `mkdir -p "$HOME/.claude/skills"`.
2. Rode `grimoire-sync`.
3. Confira se `~/.claude/CLAUDE.md` foi criado e contém a User Rule. O script publica as skills em `~/.claude/skills/`.
4. Inicie uma nova sessão do Claude Code na raiz de um app e peça para localizar `{GRIMOIRE}` e ler `{GRIMOIRE}/README.md`.

Veja também o [guia do Claude Code](guias/claude/setup-grimoire-local.md).

## 4. Preparar o contexto local de cada app

Na raiz de cada app, mantenha um `AGENTS.md` com apenas o contexto daquele projeto. Para usar Claude Code, mantenha também um `CLAUDE.md` local que importe `@AGENTS.md`. Se os arquivos ainda não existirem, execute o inicializador a partir da raiz do app:

```bash
bash "$HOME/projects/dev-grimoire/agents/scripts/inicializar-contexto-agentes.sh"
```

Ajuste o caminho ao local do clone. O inicializador não sobrescreve arquivos existentes; revise e preencha o contexto local criado antes de usar o agente no app.

## Atualizações

Execute `grimoire-sync` depois de mudanças no repositório para atualizar o clone, as instruções globais do Codex e Claude Code e as skills dos runtimes disponíveis. Se `docs/rules/global.md` mudar, copie novamente seu conteúdo para **Settings → Rules → User** no Cursor.
