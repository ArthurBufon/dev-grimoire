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
