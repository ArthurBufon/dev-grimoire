#!/usr/bin/env bash
# Sincroniza skills globais locais com agents/skills/ do Dev Grimoire (fonte de verdade).
#
# Destinos (só sincroniza se o diretório raiz de skills existir):
#   - Cursor:  ~/.cursor/skills/
#   - Codex:   $CODEX_HOME/skills/  (default ~/.codex/skills/)
#   - Claude:  ~/.claude/skills/
#
# A skill dev-grimoire é gerada de docs/rules/global.md (não está em agents/skills/).
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
AGENTS_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
REPO_ROOT="$(cd "${AGENTS_DIR}/.." && pwd)"
SKILLS_SRC="${AGENTS_DIR}/skills"
GLOBAL_MD="${REPO_ROOT}/docs/rules/global.md"

CODEX_HOME="${CODEX_HOME:-${HOME}/.codex}"

declare -A TARGETS=(
  [cursor]="${HOME}/.cursor/skills"
  [codex]="${CODEX_HOME}/skills"
  [claude]="${HOME}/.claude/skills"
)

log() { printf '%s\n' "$*"; }
skip() { log "skip: $*"; }

realpath_safe() {
  local path="$1"
  if [[ -d "$path" ]]; then
    realpath "$path"
  fi
}

# Evita sync duplicado quando paths são o mesmo dir (ex.: ~/.agents/skills → ~/.cursor/skills)
declare -A SEEN_REALPATHS=()

build_dev_grimoire_skill() {
  local out="$1"
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
  mkdir -p "$dest_dir"
  cp "$src" "${dest_dir}/SKILL.md"
  log "synced: ${name} → ${label} (${dest_dir})"
}

sync_dev_grimoire_skill() {
  local root="$1"
  local label="$2"

  local dest_dir="${root}/dev-grimoire"
  mkdir -p "$dest_dir"
  build_dev_grimoire_skill "${dest_dir}/SKILL.md"
  log "synced: dev-grimoire → ${label} (from docs/rules/global.md)"
}

if [[ ! -d "$SKILLS_SRC" ]]; then
  log "error: skills source not found: ${SKILLS_SRC}"
  exit 1
fi

if [[ ! -f "$GLOBAL_MD" ]]; then
  log "error: global.md not found: ${GLOBAL_MD}"
  exit 1
fi

skill_files=("${SKILLS_SRC}"/*.md)
if [[ ! -e "${skill_files[0]}" ]]; then
  log "error: no skill files in ${SKILLS_SRC}"
  exit 1
fi

log "source: ${SKILLS_SRC}"
log "---"

synced_targets=0
skipped_targets=0

for label in cursor codex claude; do
  root="${TARGETS[$label]}"

  if [[ ! -d "$root" ]]; then
    skip "${label}: directory does not exist (${root})"
    skipped_targets=$((skipped_targets + 1))
    continue
  fi

  resolved="$(realpath_safe "$root")"
  if [[ -n "$resolved" && -n "${SEEN_REALPATHS[$resolved]:-}" ]]; then
    skip "${label}: same path as ${SEEN_REALPATHS[$resolved]} (${root})"
    skipped_targets=$((skipped_targets + 1))
    continue
  fi

  if [[ -n "$resolved" ]]; then
    SEEN_REALPATHS[$resolved]="$label"
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
log "done: ${synced_targets} target(s) synced, ${skipped_targets} skipped"

if [[ "$synced_targets" -eq 0 ]]; then
  log "warning: no global skills directory found — install skills in at least one runtime first"
  exit 0
fi
