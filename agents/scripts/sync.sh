#!/usr/bin/env bash
# Atualiza o clone do Dev Grimoire e sincroniza skills globais.
#
# Uso:
#   ./agents/scripts/sync-git.sh
#   ./agents/scripts/sync-git.sh origin main
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
SKILLS_SYNC="${SCRIPT_DIR}/sync-global-skills.sh"

REMOTE="${1:-origin}"
BRANCH="${2:-main}"

log() { printf '%s\n' "$*"; }

if [[ ! -f "$SKILLS_SYNC" ]]; then
  log "error: skills sync script not found: ${SKILLS_SYNC}"
  exit 1
fi

log "repo: ${REPO_ROOT}"
log "pull: ${REMOTE}/${BRANCH}"
log "---"

git -C "$REPO_ROOT" pull "$REMOTE" "$BRANCH"

log "---"
log "syncing global skills..."
bash "$SKILLS_SYNC"
