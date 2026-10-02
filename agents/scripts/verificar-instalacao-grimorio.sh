#!/usr/bin/env bash
# Confere se as instruções globais instaladas correspondem à fonte do Grimório.
set -euo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
repo_root="$(cd "${script_dir}/../.." && pwd)"
global_md="${repo_root}/docs/rules/global.md"
codex_home="${CODEX_HOME:-${HOME}/.codex}"
problemas=0

hash_stream() {
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum | awk '{print $1}'
    return
  fi

  shasum -a 256 | awk '{print $1}'
}

hash_file() {
  hash_stream <"$1"
}

verificar_destino() {
  local runtime="$1"
  local destino="$2"
  local hash_origem="$3"
  local hash_destino

  if [[ ! -f "$destino" ]]; then
    printf '%-8s %s\n' "$runtime" 'ausente'
    return
  fi

  hash_destino="$(hash_file "$destino")"

  if [[ "$hash_destino" == "$hash_origem" ]]; then
    printf '%-8s %s\n' "$runtime" 'sincronizado'
    return
  fi

  printf '%-8s %s\n' "$runtime" 'desatualizado'
  problemas=1
}

[[ -f "$global_md" ]] || {
  printf 'erro: global.md não encontrado: %s\n' "$global_md" >&2
  exit 1
}

hash_origem="$(hash_file "$global_md")"

printf 'fonte: docs/rules/global.md (%s)\n' "$hash_origem"
printf '%-8s %s\n' 'runtime' 'status'

if [[ -s "${codex_home}/AGENTS.override.md" ]]; then
  printf '%-8s %s\n' 'codex' 'bloqueado por AGENTS.override.md'
  problemas=1
else
  verificar_destino 'codex' "${codex_home}/AGENTS.md" "$hash_origem"
fi

verificar_destino 'claude' "${HOME}/.claude/CLAUDE.md" "$hash_origem"
printf '%-8s %s\n' 'cursor' 'manual — confira o hash acima em Settings → Rules → User'

exit "$problemas"
