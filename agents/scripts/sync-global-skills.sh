#!/usr/bin/env bash
# Sincroniza skills globais e instruções always-on com o Dev Grimoire (fonte de verdade).
#
# Skills (só sincroniza se o diretório raiz de skills existir):
#   - Cursor:  ~/.cursor/skills/
#   - Codex:   $CODEX_HOME/skills/  (default ~/.codex/skills/)
#   - Claude:  ~/.claude/skills/
#
# Instruções globais (docs/rules/global.md):
#   - Codex:   $CODEX_HOME/AGENTS.md
#   - Claude:  ~/.claude/CLAUDE.md
#
# A skill dev-grimoire é gerada de docs/rules/global.md (não está em agents/skills/).
# Cursor continua usando Settings → Rules → User (sem destino em arquivo no script).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
AGENTS_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
REPO_ROOT="$(cd "${AGENTS_DIR}/.." && pwd)"
SKILLS_SRC="${AGENTS_DIR}/skills"
GLOBAL_MD="${REPO_ROOT}/docs/rules/global.md"
VALIDAR_GRIMORIO="${AGENTS_DIR}/scripts/validar-grimorio.sh"

CODEX_HOME="${CODEX_HOME:-${HOME}/.codex}"

declare -A TARGETS=(
  [cursor]="${HOME}/.cursor/skills"
  [codex]="${CODEX_HOME}/skills"
  [claude]="${HOME}/.claude/skills"
)

declare -A GLOBAL_INSTRUCTION_TARGETS=(
  [codex]="${CODEX_HOME}/AGENTS.md"
  [claude]="${HOME}/.claude/CLAUDE.md"
)

log() { printf '%s\n' "$*"; }
skip() { log "skip: $*"; }

# Garante diretório real no destino (substitui symlink por dir próprio).
ensure_real_dir() {
  local dir="$1"
  if [[ -L "$dir" ]]; then
    rm -rf "$dir"
  fi
  mkdir -p "$dir"
}

# Copia arquivo forçando substituição mesmo se o destino for symlink.
force_copy() {
  local src="$1"
  local dest="$2"
  if [[ -L "$dest" ]]; then
    rm -f "$dest"
  fi
  cp --remove-destination "$src" "$dest"
}

build_dev_grimoire_skill() {
  local out="$1"
  if [[ -L "$out" ]]; then
    rm -f "$out"
  fi
  {
    cat <<'HEADER'
---
name: dev-grimoire
description: >-
  Resolve e aplica convenções do Dev Grimoire (rules e moldes) a partir do clone
  irmão ../dev-grimoire/. Use antes de planejar, revisar, gerar código ou modificar
  arquivos em qualquer projeto. Lê rules e moldes via Read/Grep no filesystem.
---

# Dev Grimoire

HEADER
    tail -n +2 "$GLOBAL_MD"
  } >"$out"
}

sync_repo_skill() {
  local name="$1"
  local src="$2"
  local root="$3"
  local label="$4"

  local dest_dir="${root}/${name}"
  ensure_real_dir "$dest_dir"
  force_copy "$src" "${dest_dir}/SKILL.md"
  log "synced: ${name} → ${label} (${dest_dir})"
}

sync_dev_grimoire_skill() {
  local root="$1"
  local label="$2"

  local dest_dir="${root}/dev-grimoire"
  ensure_real_dir "$dest_dir"
  build_dev_grimoire_skill "${dest_dir}/SKILL.md"
  log "synced: dev-grimoire → ${label} (from docs/rules/global.md)"
}

sync_global_instructions() {
  local label="$1"
  local dest="$2"
  local parent_dir

  parent_dir="$(dirname "$dest")"

  if [[ "$label" == "codex" && -s "${CODEX_HOME}/AGENTS.override.md" ]]; then
    skip "codex: AGENTS.override.md present — not updating AGENTS.md"
    return 1
  fi

  if [[ ! -e "$parent_dir" ]]; then
    skip "${label}: home directory does not exist (${parent_dir})"
    return 1
  fi

  mkdir -p "$parent_dir"
  force_copy "$GLOBAL_MD" "$dest"
  log "synced: global.md → ${label} (${dest})"

  return 0
}

if [[ ! -d "$SKILLS_SRC" ]]; then
  log "error: skills source not found: ${SKILLS_SRC}"
  exit 1
fi

if [[ ! -f "$GLOBAL_MD" ]]; then
  log "error: global.md not found: ${GLOBAL_MD}"
  exit 1
fi

if [[ ! -f "$VALIDAR_GRIMORIO" ]]; then
  log "error: Grimório validator not found: ${VALIDAR_GRIMORIO}"
  exit 1
fi

log "validating source..."
bash "$VALIDAR_GRIMORIO"

skill_files=("${SKILLS_SRC}"/*.md)
if [[ ! -e "${skill_files[0]}" ]]; then
  log "error: no skill files in ${SKILLS_SRC}"
  exit 1
fi

log "source: ${SKILLS_SRC}"
log "---"

synced_instructions=0
skipped_instructions=0

log "global instructions: ${GLOBAL_MD}"
log "---"

for label in codex claude; do
  if sync_global_instructions "$label" "${GLOBAL_INSTRUCTION_TARGETS[$label]}"; then
    synced_instructions=$((synced_instructions + 1))
  else
    skipped_instructions=$((skipped_instructions + 1))
  fi
done

log ""
log "---"
log "skills"
log "---"

synced_targets=0
skipped_targets=0

for label in cursor codex claude; do
  root="${TARGETS[$label]}"

  # Aceita dir real ou symlink para dir; só pula se o path não existir.
  if [[ ! -e "$root" ]]; then
    skip "${label}: directory does not exist (${root})"
    skipped_targets=$((skipped_targets + 1))
    continue
  fi

  if [[ ! -d "$root" ]]; then
    skip "${label}: path exists but is not a directory (${root})"
    skipped_targets=$((skipped_targets + 1))
    continue
  fi

  log "target: ${label} (${root})"

  for f in "${SKILLS_SRC}"/*.md; do
    sync_repo_skill "$(basename "$f" .md)" "$f" "$root" "$label"
  done

  sync_dev_grimoire_skill "$root" "$label"
  synced_targets=$((synced_targets + 1))
  log ""
done

log "---"
log "done: ${synced_instructions} global instruction(s) synced, ${skipped_instructions} skipped"
log "done: ${synced_targets} skill target(s) synced, ${skipped_targets} skipped"

if [[ "$synced_targets" -eq 0 && "$synced_instructions" -eq 0 ]]; then
  log "warning: no global runtime directory found — install Cursor, Codex or Claude first"
  exit 0
fi
