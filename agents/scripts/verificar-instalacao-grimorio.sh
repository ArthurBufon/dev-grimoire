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

hash_instrucao_publicada() {
  local arquivo="$1"

  if head -n 1 "$arquivo" | grep -q '^<!-- Dev Grimoire: origem '; then
    tail -n +2 "$arquivo" | hash_stream
    return
  fi

  hash_file "$arquivo"
}

referencia_origem() {
  git -C "$repo_root" rev-parse --short HEAD 2>/dev/null || printf 'local'
}

verificar_destino() {
  local runtime="$1"
  local destino="$2"
  local hash_origem="$3"
  local selo_esperado="$4"
  local hash_destino

  if [[ ! -f "$destino" ]]; then
    printf '%-8s %s\n' "$runtime" 'ausente'
    return
  fi

  hash_destino="$(hash_instrucao_publicada "$destino")"

  if [[ "$hash_destino" == "$hash_origem" ]]; then
    if [[ "$(head -n 1 "$destino")" == "$selo_esperado" ]]; then
      printf '%-8s %s\n' "$runtime" 'sincronizado'
      return
    fi

    printf '%-8s %s\n' "$runtime" 'sem selo de origem'
    problemas=1
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
selo_esperado="<!-- Dev Grimoire: origem $(referencia_origem) | sha256 ${hash_origem} -->"

printf 'fonte: docs/rules/global.md (%s)\n' "$hash_origem"
printf '%-8s %s\n' 'runtime' 'status'

if [[ -s "${codex_home}/AGENTS.override.md" ]]; then
  printf '%-8s %s\n' 'codex' 'bloqueado por AGENTS.override.md'
  problemas=1
else
  verificar_destino 'codex' "${codex_home}/AGENTS.md" "$hash_origem" "$selo_esperado"
fi

verificar_destino 'claude' "${HOME}/.claude/CLAUDE.md" "$hash_origem" "$selo_esperado"
printf '%-8s %s\n' 'cursor' 'manual — confira o hash acima em Settings → Rules → User'

exit "$problemas"
