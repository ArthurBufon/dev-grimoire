# Deploy Script - [projeto]

Este documento explica como configurar e utilizar o script de deploy do projeto Laravel (servidor **com Node.js**).

**Hospedagem compartilhada sem Node?** Use a variante [build local](./tutorial-build-local.md): assets compilados na máquina do dev e enviados via Git.

**HostGator shared com `php`/`composer` quebrados no SSH?** Use a variante [HostGator](./tutorial-hostgator.md): caminhos absolutos para o PHP do EasyApache e o Composer em `~/bin`.

---

# 1. Adicionar o script de deploy (dentro do proprio app)

Criar o arquivo:

```bash
/scripts/deploy.sh
```

Conteúdo do arquivo:

```bash
#!/bin/bash

set -e

SCRIPT_PATH="$(realpath "$0")"
trap 'chmod +x "$SCRIPT_PATH"' EXIT

REPO_ROOT="$(cd "$(dirname "$SCRIPT_PATH")/.." && pwd)"
cd "$REPO_ROOT"

echo "🚀 Deploy iniciado..."

BRANCH_ATUAL=$(git rev-parse --abbrev-ref HEAD)
echo "🌿 Branch atual: $BRANCH_ATUAL"

read -s -p "🔒 Senha para migrations: " MIGRATION_PWD
echo ""

# Salvar commit anterior para rollback
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

# --- INÍCIO: remover se o servidor não tiver Node (ver tutorial-build-local.md) ---
echo "📦 Instalando dependências Node..."
npm ci

echo "⚙️ Gerando assets..."
rm -f public/hot
npm run build
# --- FIM: remover se o servidor não tiver Node ---

echo "🗃️ Executando migrations..."
echo "$MIGRATION_PWD" | php artisan migrate --force

echo "⚡ Reconstruindo caches de produção..."
php artisan optimize

echo "✅ Deploy finalizado!"
```

## Servidor sem Node.js

Se o servidor **não permite Node** (hospedagem compartilhada, por exemplo), **remova** do `deploy.sh` o bloco entre os comentários `INÍCIO` e `FIM` (dependências Node + build).

Nesse caso, os assets precisam estar em `public/build` no Git — buildados localmente antes do deploy. Fluxo completo: [build local](./tutorial-build-local.md).

---

# 2. Dar permissão de execução

Executar:

```bash
chmod +x /var/www/html/[projeto]/scripts/deploy.sh
```

---

# 3. Configurar aliases no Ubuntu

Adicionar os aliases no:

## ZSH

Arquivo:

```bash
~/.zshrc
```

ou

## Bash

Arquivo:

```bash
~/.bashrc
```

Adicionar:

```bash
# Aliases [projeto]
alias [projeto]-deploy='bash /var/www/html/[projeto]/scripts/deploy.sh'
```

---

# 4. Recarregar configuração do terminal

Após salvar o `.zshrc` ou `.bashrc`, executar:

## ZSH

```bash
source ~/.zshrc
```

## Bash

```bash
source ~/.bashrc
```

---

# 5. Como executar deploy

O script sincroniza com a **branch atual** do repositório no servidor:

- Na `main` → `git fetch` + `reset --hard origin/main`
- Na `dev` → `git fetch` + `reset --hard origin/dev`

```bash
[projeto]-deploy
```

O script entra automaticamente na raiz do repositório (`scripts/..`), então o alias pode ser executado de qualquer diretório no SSH.

Antes de rodar, confirme a branch com `git branch --show-current` (dentro do repo) ou `git -C /var/www/html/[projeto] branch --show-current`.

---

# 6. O que o script faz

O script executa automaticamente:

- Detecção da branch atual (`git rev-parse --abbrev-ref HEAD`)
- Atualização do código via Git (`origin/<branch-atual>`)
- Reset completo do repositório
- Limpeza de arquivos temporários
- Limpeza de cache Laravel
- Instalação de dependências Composer
- Instalação de dependências NPM e build dos assets *(somente se o servidor tiver Node; caso contrário, ver [build local](./tutorial-build-local.md))*
- Execução das migrations
- Rebuild dos caches de produção

---

# 7. Observações importantes

## O script executa:

```bash
git reset --hard origin/<branch-atual>
```

Isso remove alterações locais não commitadas e alinha o servidor com a branch em que você está (ex.: `main` ou `dev`).

---

## Também executa:

```bash
git clean -fd
```

Isso remove arquivos não rastreados pelo Git.

---

## Servidor sem Node.js

Não inclua o bloco entre `# --- INÍCIO` e `# --- FIM` (`npm ci` + `npm run build`) se o ambiente não tiver Node instalado. O script do servidor fica só com Git + Composer + migrations + `php artisan optimize`. Os assets compilados (`public/build`) devem chegar via commit feito pelo [script de build local](./tutorial-build-local.md).

---

## Recomendado utilizar apenas em servidores

Ideal para:

- Produção
- Homologação
- Ambiente interno

Evitar uso em ambiente local de desenvolvimento.

---

# 8. Fluxo recomendado

Fluxo ideal:

```text
Commit -> Push -> SSH no servidor -> Executar alias de deploy
```

Exemplo:

```bash
ssh usuario@servidor

[projeto]-deploy
```

Não é necessário `cd` no repositório antes do alias — o script resolve o diretório a partir do próprio caminho em `scripts/deploy.sh`.
