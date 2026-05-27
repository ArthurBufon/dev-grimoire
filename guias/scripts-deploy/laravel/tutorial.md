# Deploy Script - [projeto]

Este documento explica como configurar e utilizar o script de deploy do projeto Laravel.

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

echo "🚀 Deploy iniciado..."

read -s -p "🔒 Senha para migrations: " MIGRATION_PWD
echo ""

# Salvar commit anterior para rollback
COMMIT_ANTERIOR=$(git rev-parse HEAD)

echo "📥 Atualizando código..."
git fetch origin master

echo "🧹 Limpando repositório (reset + clean)..."
git reset --hard origin/master
git clean -fd

echo "🧹 Limpando caches..."
php artisan optimize:clear

echo "📦 Instalando dependências PHP..."
composer install --optimize-autoloader --no-interaction --ignore-platform-reqs

echo "📦 Instalando dependências Node..."
npm ci

echo "⚙️ Gerando assets..."
rm -f public/hot
npm run build

echo "🗃️ Executando migrations..."
echo "$MIGRATION_PWD" | php artisan migrate --force

echo "⚡ Reconstruindo caches de produção..."
php artisan optimize

echo "✅ Deploy finalizado!"
```

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

Deploy produção:

```bash
[projeto]-deploy
```

Deploy ambiente de teste/dev:

```bash
[projeto]-deploy-dev
```

---

# 6. O que o script faz

O script executa automaticamente:

- Atualização do código via Git
- Reset completo do repositório
- Limpeza de arquivos temporários
- Limpeza de cache Laravel
- Instalação de dependências Composer
- Instalação de dependências NPM
- Build dos assets
- Execução das migrations
- Rebuild dos caches de produção

---

# 7. Observações importantes

## O script executa:

```bash
git reset --hard origin/master
```

Isso remove alterações locais não commitadas.

---

## Também executa:

```bash
git clean -fd
```

Isso remove arquivos não rastreados pelo Git.

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

cd /var/www/html/[projeto]

[projeto]-deploy
```
