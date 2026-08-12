# Deploy Script (HostGator shared hosting) - [projeto]

Variante **não ideal** para hospedagem compartilhada HostGator em que os comandos `php` e `composer` no shell **não resolvem corretamente** (alias quebrado, binário errado ou `composer` não encontrado).

Use caminhos absolutos no script de deploy em vez de confiar nos aliases do terminal.

Para o fluxo padrão (VPS, servidor com aliases funcionando), use o [tutorial padrão](./tutorial.md).  
Para shared hosting **sem Node** (build local dos assets), combine este guia com o [build local](./tutorial-build-local.md).

---

# 1. O problema

Em alguns planos shared da HostGator (cPanel + EasyApache), o ambiente SSH pode se comportar assim:

- `php` no PATH aponta para uma versão diferente da selecionada no cPanel para o domínio
- `composer` não está no PATH ou o alias aponta para um wrapper que falha
- Aliases em `~/.bashrc` / `~/.zshrc` não afetam scripts não interativos ou sessões com perfil mínimo

O deploy falha com erros do tipo *command not found*, versão PHP incompatível com o projeto, ou `composer install` quebrando por extensões/versão errada.

**Solução:** chamar explicitamente o binário PHP do EasyApache e o `composer` instalado em `~/bin`.

---

# 2. Descobrir o caminho do PHP

No cPanel, anote a versão PHP do domínio (ex.: 8.5). No SSH:

```bash
ls /opt/cpanel/ea-php*/
```

O binário costuma ficar em:

```text
/opt/cpanel/ea-php85/root/usr/bin/php
```

Ajuste `85` para a sua versão (`81`, `82`, `83`, `84`, etc.). Confirme:

```bash
/opt/cpanel/ea-php85/root/usr/bin/php -v
/opt/cpanel/ea-php85/root/usr/bin/php -m | grep -E 'pdo|mbstring|openssl|tokenizer|xml|ctype|json|bcmath'
```

Use a mesma versão configurada no cPanel para o site.

---

# 3. Composer em `~/bin`

Se `composer` não funcionar no SSH, instale ou copie o phar para o home:

```bash
mkdir -p ~/bin
curl -sS https://getcomposer.org/installer | /opt/cpanel/ea-php85/root/usr/bin/php
mv composer.phar ~/bin/composer
chmod +x ~/bin/composer
```

Teste:

```bash
/opt/cpanel/ea-php85/root/usr/bin/php ~/bin/composer --version
```

> **Importante:** invoque o Composer **sempre** via `"$PHP_BIN" "$COMPOSER_BIN"` — não use só `composer` no script.

---

# 4. Script no servidor — deploy com caminhos absolutos

Baseado no [deploy sem Node](./tutorial-build-local.md#3-script-no-servidor--deploy-sem-node), com `PHP_BIN` e `COMPOSER_BIN` fixos.

Criar o arquivo:

```bash
/scripts/deploy.sh
```

Conteúdo:

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

PHP_BIN="/opt/cpanel/ea-php85/root/usr/bin/php"
COMPOSER_BIN="$HOME/bin/composer"

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
$PHP_BIN artisan optimize:clear

echo "📦 Instalando dependências PHP..."
"$PHP_BIN" "$COMPOSER_BIN" install \
  --optimize-autoloader \
  --no-interaction \
  --ignore-platform-reqs

# Sem Node no servidor — assets em public/build vêm via Git (deploy-build-local.sh)

echo "🗃️ Executando migrations..."
echo "$MIGRATION_PWD" | $PHP_BIN artisan migrate --force

echo "⚡ Reconstruindo caches de produção..."
$PHP_BIN artisan optimize

echo "✅ Deploy finalizado!"
```

Dar permissão de execução:

```bash
chmod +x ~/public_html/[projeto]/scripts/deploy.sh
```

Ajuste o path conforme a estrutura da conta (HostGator costuma usar `~/public_html/` em vez de `/var/www/html/`).

---

# 5. Alias de deploy

Mesmo com caminhos absolutos **dentro** do script, o alias para disparar o deploy continua útil:

```bash
# Aliases [projeto] — deploy HostGator
alias [projeto]-deploy='bash ~/public_html/[projeto]/scripts/deploy.sh'
```

Recarregar o shell:

```bash
source ~/.bashrc
# ou
source ~/.zshrc
```

---

# 6. Fluxo completo (shared hosting + build local)

```text
1. Commit + push do código (local)
2. Na máquina local → [projeto]-build-deploy   (ver tutorial-build-local.md)
3. SSH na HostGator → [projeto]-deploy
```

O script deste guia **não** builda assets — assume `public/build` versionado no Git, como no [build local](./tutorial-build-local.md).

---

# 7. Diferenças em relação ao tutorial padrão

| Tutorial padrão / build local | HostGator (este guia) |
|---|---|
| `php artisan ...` | `$PHP_BIN artisan ...` |
| `composer install ...` | `"$PHP_BIN" "$COMPOSER_BIN" install ...` |
| `/var/www/html/[projeto]` | `~/public_html/[projeto]` (típico na HostGator) |
| Aliases de `php`/`composer` no shell | Caminhos absolutos no script |

---

# 8. Observações

## Ajustar versão do PHP

Sempre que mudar a versão PHP no cPanel, atualize `PHP_BIN` no `deploy.sh` e revalide extensões com `php -m`.

## `--ignore-platform-reqs`

Mantido de propósito: em shared hosting algumas extensões reportadas pelo Composer podem divergir do runtime real. Prefira corrigir extensões no cPanel; use o flag só se o deploy já foi validado manualmente.

## Não é o fluxo feliz

Esta variante existe para contornar limitações do ambiente compartilhado. Em VPS ou servidor próprio com PHP/Composer corretos no PATH, use o [tutorial padrão](./tutorial.md) — menos manutenção e menos risco de versão errada.

## Rollback

O script guarda `COMMIT_ANTERIOR` antes do `git fetch`. Para rollback manual:

```bash
git reset --hard "$COMMIT_ANTERIOR"
$PHP_BIN artisan optimize:clear
$PHP_BIN artisan optimize
```
