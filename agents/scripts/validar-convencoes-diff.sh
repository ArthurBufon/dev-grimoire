#!/usr/bin/env bash
# Valida convenções bloqueantes de PHP/JS no diff atual (staged + unstaged + untracked).
# Uso: validar-convencoes-diff.sh [repo_root]
# Teste do Grimório: validar-convencoes-diff.sh --files path1 path2 ...
set -euo pipefail

falhar() {
  printf 'convencoes: %s\n' "$1" >&2
  exit 1
}

eh_queries_principal() {
  local file="$1"
  [[ "$file" =~ /Queries/[^/]+/Queries\.(js|ts|tsx)$ ]] || return 1
  [[ "$file" =~ /Queries/[^/]+/[^/]+/Queries\.(js|ts|tsx)$ ]] && return 1
  return 0
}

exige_imports_por_secao() {
  local file="$1"

  [[ "$file" == *Referencia* ]] && return 0
  git diff --name-only --diff-filter=A HEAD -- "$file" 2>/dev/null | grep -qxF "$file" && return 0
  git diff --name-only --diff-filter=A --cached HEAD -- "$file" 2>/dev/null | grep -qxF "$file" && return 0
  [[ ! -f "$file" ]] && git ls-files --others --exclude-standard "$file" 2>/dev/null | grep -qxF "$file" && return 0
  return 1
}

validar_arquivo() {
  local file="$1"

  [[ -f "$file" ]] || return 0

  if [[ "$file" == *.php ]]; then
    if [[ "$file" == *Controller.php ]] && grep -q 'return response()->json(\[' "$file"; then
      falhar "${file}: declare \$retorno antes de response()->json() (docs/rules/php.md)"
    fi

    local use_count
    use_count="$(grep -c '^use ' "$file" || true)"
    if (( use_count >= 3 )) && ! grep -qE '^// [A-Z]' "$file"; then
      if exige_imports_por_secao "$file"; then
        falhar "${file}: imports sem seções // CATEGORIA (≥3 use)"
      fi
    fi
  fi

  if [[ "$file" =~ \.(js|ts|tsx)$ ]] && [[ "$file" == *Queries/* ]]; then
    if grep -qE 'fetch\([^,)]+,\s*\{' "$file"; then
      falhar "${file}: use const options antes de fetch() (docs/rules/javascript.md)"
    fi

    if grep -qE '(await[[:space:]]+)?fetch\(' "$file" && ! grep -q 'const url' "$file"; then
      falhar "${file}: use const url antes de fetch() (docs/rules/javascript.md)"
    fi

    if eh_queries_principal "$file"; then
      local metodo
      while IFS= read -r metodo; do
        [[ -z "$metodo" ]] && continue
        case "$metodo" in
          index|show|store|update|destroy) ;;
          *) falhar "${file}: Queries principal só index/show/store/update/destroy; use subpasta (ex.: Referencia/Queries.js) para '${metodo}'" ;;
        esac
      done < <(grep -oE '^\s{4}[a-zA-Z_][a-zA-Z0-9_]*:\s*async function' "$file" 2>/dev/null | sed -E 's/^\s+([a-zA-Z_][a-zA-Z0-9_]*):.*/\1/' || true)
    fi
  fi
}

arquivos=()

if [[ "${1:-}" == "--files" ]]; then
  shift
  while [[ $# -gt 0 ]]; do
    arquivos+=("$1")
    shift
  done
else
  repo_root="${1:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
  cd "$repo_root"

  while IFS= read -r linha; do
    [[ -z "$linha" ]] && continue
    arquivos+=("$linha")
  done < <(
    {
      git diff --name-only HEAD 2>/dev/null || true
      git diff --name-only --cached 2>/dev/null || true
      git ls-files --others --exclude-standard 2>/dev/null || true
    } | sort -u | grep -E '\.(php|js|ts|tsx)$' || true
  )
fi

if ((${#arquivos[@]} == 0)); then
  printf 'convencoes: nenhum arquivo PHP/JS/TS alterado\n'
  exit 0
fi

for file in "${arquivos[@]}"; do
  validar_arquivo "$file"
done

printf 'convencoes: ok (%s arquivo(s) verificados)\n' "${#arquivos[@]}"
