# Deploy Script (build local) - [projeto]

Variante para **hospedagem compartilhada** sem Node.js no servidor.

O build dos assets roda na máquina do desenvolvedor; o servidor só sincroniza o código (incluindo `public/build`) e executa o deploy PHP.

Para servidores com Node disponível, use o [tutorial padrão](./tutorial.md).

---

# 1. Pré-requisitos

- Docker + Laravel Sail (Node roda no container)
- `public/build` versionado no Git (remover de `.gitignore` se necessário)
- Acesso de push à branch de deploy (`main`, `dev`, etc.)

---

# 2. Script local — build e push dos assets

Criar o arquivo:

```bash
/scripts/deploy-build-local.sh
```

Conteúdo:

```bash
#!/bin/bash

set -e

SCRIPT_PATH="$(realpath "$0")"
trap 'chmod +x "$SCRIPT_PATH"' EXIT

echo "🚀 Build local de assets iniciado..."

BRANCH_ATUAL=$(git rev-parse --abbrev-ref HEAD)
echo "🌿 Branch atual: $BRANCH_ATUAL"

echo "📥 Sincronizando com origin..."
git fetch origin "$BRANCH_ATUAL"
git reset --hard "origin/$BRANCH_ATUAL"
git clean -fd

echo "📦 Instalando dependências PHP..."
composer install --no-interaction --ignore-platform-reqs

echo "📦 Instalando dependências Node..."
./vendor/bin/sail pnpm install --frozen-lockfile

echo "⚙️ Gerando assets..."
rm -f public/hot
./vendor/bin/sail pnpm build

echo "📤 Commitando e enviando assets..."
git add public/build

if git diff --staged --quiet; then
  echo "ℹ️ Nenhuma alteração em public/build. Push não necessário."
else
  git commit -m "BUILD ASSETS DEPLOY"
  git push origin "$BRANCH_ATUAL"
fi

echo "✅ Build local finalizado!"
```

Dar permissão de execução:

```bash
chmod +x scripts/deploy-build-local.sh
```

---

# 3. Script no servidor — deploy sem Node

Criar o arquivo:

```bash
/scripts/deploy.sh
```

Conteúdo (sem `./vendor/bin/sail pnpm`):

```bash
#!/bin/bash

set -e

SCRIPT_PATH="$(realpath "$0")"
trap 'chmod +x "$SCRIPT_PATH"' EXIT

echo "🚀 Deploy iniciado..."

BRANCH_ATUAL=$(git rev-parse --abbrev-ref HEAD)
echo "🌿 Branch atual: $BRANCH_ATUAL"

read -s -p "🔒 Senha para migrations: " MIGRATION_PWD
echo ""

COMMIT_ANTERIOR=$(git rev-parse HEAD)

echo "📥 Atualizando código..."
git fetch origin "$BRANCH_ATUAL"

echo "🧹 Limpando repositório (reset + clean)..."
git reset --hard "origin/$BRANCH_ATUAL"
git clean -fd

echo "🧹 Limpando caches..."
php artisan optimize:clear

echo "📦 Instalando dependências PHP..."
composer install --optimize-autoloader --no-interaction --ignore-platform-reqs

# Sem Node no servidor — assets em public/build vêm via Git (deploy-build-local.sh)

echo "🗃️ Executando migrations..."
echo "$MIGRATION_PWD" | php artisan migrate --force

echo "⚡ Reconstruindo caches de produção..."
php artisan optimize

echo "✅ Deploy finalizado!"
```

Dar permissão de execução no servidor:

```bash
chmod +x /var/www/html/[projeto]/scripts/deploy.sh
```

---

# 4. Aliases

## Máquina local (ZSH / Bash)

```bash
# Aliases [projeto] — build local
alias [projeto]-build-deploy='bash ~/projects/[projeto]/scripts/deploy-build-local.sh'
```

## Servidor (ZSH / Bash)

```bash
# Aliases [projeto] — deploy servidor
alias [projeto]-deploy='bash /var/www/html/[projeto]/scripts/deploy.sh'
```

Recarregar o shell após editar `~/.zshrc` ou `~/.bashrc`:

```bash
source ~/.zshrc
# ou
source ~/.bashrc
```

---

# 5. Fluxo de deploy

```text
1. Commit + push do código (sem assets, se ainda não buildou)
2. Na máquina local → [projeto]-build-deploy
3. SSH no servidor → [projeto]-deploy
```

## Passo a passo

**Local** — sincroniza com origin, builda e envia assets:

```bash
cd ~/projects/[projeto]
git checkout main   # ou dev

[projeto]-build-deploy
```

**Servidor** — puxa o commit com assets e roda deploy PHP:

```bash
ssh usuario@servidor

cd /var/www/html/[projeto]
git checkout main   # ou dev

[projeto]-deploy
```

O script local sempre commita com a mensagem fixa:

```text
BUILD ASSETS DEPLOY
```

---

# 6. O que cada script faz

## `deploy-build-local.sh` (local)

- Detecta a branch atual
- Sincroniza com `origin/<branch-atual>`
- `composer install` + `./vendor/bin/sail pnpm install --frozen-lockfile` + `./vendor/bin/sail pnpm build`
- Commit de `public/build` (somente se houver diff)
- Push para `origin/<branch-atual>`

## `deploy.sh` (servidor)

- Detecta a branch atual
- Sincroniza com `origin/<branch-atual>`
- Limpeza de cache Laravel
- `composer install`
- Migrations
- `php artisan optimize`

---

# 7. Observações importantes

## `public/build` precisa estar no Git

Se a pasta estiver no `.gitignore`, remova a entrada ou force o add:

```bash
git add -f public/build
```

Sem isso, o servidor nunca receberá os assets compilados.

---

## O build local também faz `reset --hard`

Assim como o deploy no servidor, o script local descarta alterações locais não commitadas antes de buildar. Commit ou stash antes de rodar.

---

## Commits de build no histórico

Cada deploy de assets gera um commit `BUILD ASSETS DEPLOY`. Isso é esperado neste fluxo — o servidor depende desse commit para receber os arquivos compilados.

---

## Branch atual define o ambiente

- Checkout em `main` → build e deploy sincronizam com `origin/main`
- Checkout em `dev` → build e deploy sincronizam com `origin/dev`

Confirme com `git branch --show-current` antes de rodar qualquer script.
