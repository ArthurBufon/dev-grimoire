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

eh_queries_principal_php() {
  local file="$1"
  [[ "$file" =~ app/Queries/[^/]+/Queries\.php$ ]] || return 1
  return 0
}

eh_json_entidade_controller() {
  local file="$1"
  [[ "$file" =~ app/Http/Controllers/Painel/Json/[^/]+/[^/]+Controller\.php$ ]] || return 1
  [[ "$file" =~ /Referencia/ ]] && return 1
  [[ "$file" =~ /ProdutoVinculado/ ]] && return 1
  return 0
}

eh_view_entidade_service() {
  local file="$1"
  [[ "$file" =~ app/Services/[^/]+/View/Service\.php$ ]] || return 1
  return 0
}

metodo_privado_queries_permitido() {
  local metodo="$1"
  [[ "$metodo" =~ ^(aplicar|carregar|filtrar|extrair) ]] && return 0
  return 1
}

metodo_publico_queries_permitido() {
  local metodo="$1"

  case "$metodo" in
    index|show|store|update|destroy) return 0 ;;
    *) return 1 ;;
  esac
}

validar_queries_principal_php() {
  local file="$1"

  eh_queries_principal_php "$file" || return 0

  if grep -qE 'use App\\Queries\\' "$file"; then
    falhar "${file}: Query principal não importa App\\Queries\\* (docs/rules/php.md § Queries)"
  fi

  if grep -qE 'use App\\Services\\' "$file"; then
    falhar "${file}: Query principal não importa App\\Services\\* (docs/rules/php.md § Queries)"
  fi

  if grep -q 'setRelation' "$file"; then
    falhar "${file}: enriquecimento pós-consulta (setRelation) pertence ao Service (docs/rules/php.md § Queries)"
  fi

  if grep -qE 'function __construct\s*\(' "$file"; then
    falhar "${file}: Query principal sem construtor com dependências; use subpasta de contexto se precisar (docs/rules/php.md § Queries)"
  fi

  local metodo
  while IFS= read -r metodo; do
    [[ -z "$metodo" ]] && continue
    if ! metodo_publico_queries_permitido "$metodo"; then
      falhar "${file}: método público '${metodo}' não permitido na Query principal; use subpasta de contexto (docs/rules/php.md § Queries)"
    fi
  done < <(grep -oE 'public function [a-zA-Z0-9_]+' "$file" 2>/dev/null | sed -E 's/public function //' || true)

  while IFS= read -r metodo; do
    [[ -z "$metodo" ]] && continue
    if ! metodo_privado_queries_permitido "$metodo"; then
      falhar "${file}: método privado '${metodo}' não permitido na Query principal (docs/rules/php.md § Queries)"
    fi
  done < <(grep -oE 'private function [a-zA-Z0-9_]+' "$file" 2>/dev/null | sed -E 's/private function //' || true)
}

extrair_metodos_queries_js() {
  local file="$1"

  sed -n -E \
    -e 's/^[[:space:]]*([a-zA-Z_][a-zA-Z0-9_]*)[[:space:]]*:[[:space:]]*async[[:space:]]+function.*/\1/p' \
    -e 's/^[[:space:]]*([a-zA-Z_][a-zA-Z0-9_]*)[[:space:]]*:[[:space:]]*async[[:space:]]*(\([^)]*\)|[a-zA-Z_][a-zA-Z0-9_]*)[[:space:]]*=>.*/\1/p' \
    -e "s/^[[:space:]]*['\"]([a-zA-Z_][a-zA-Z0-9_]*)['\"][[:space:]]*:[[:space:]]*async[[:space:]]+function.*/\\1/p" \
    -e "s/^[[:space:]]*['\"]([a-zA-Z_][a-zA-Z0-9_]*)['\"][[:space:]]*:[[:space:]]*async[[:space:]]*(\([^)]*\)|[a-zA-Z_][a-zA-Z0-9_]*)[[:space:]]*=>.*/\\1/p" \
    -e 's/^[[:space:]]*(public[[:space:]]+)?async[[:space:]]+([a-zA-Z_][a-zA-Z0-9_]*)[[:space:]]*\(.*/\2/p' \
    "$file"
}

validar_leitura_via_service() {
  local file="$1"

  if ! eh_json_entidade_controller "$file" && ! eh_view_entidade_service "$file"; then
    return 0
  fi

  if grep -qE '\$this->queries->(index|show)\(' "$file"; then
    falhar "${file}: index/show delegam a App\\Services\\{Entidade}\\Service, não a Queries (docs/rules/php.md § Queries)"
  fi
}

validar_http_fora_queries() {
  local file="$1"

  [[ "$file" == *Queries/* ]] && return 0

  if grep -qE '(^|[^[:alnum:]_])(fetch|XMLHttpRequest)[[:space:]]*\(' "$file" \
    || grep -qE '(axios\.|\$\.ajax|jQuery\.(get|post))' "$file"; then
    falhar "${file}: chamadas HTTP brutas pertencem a Queries (docs/rules/javascript.md § HTTP)"
  fi
}

exige_imports_por_secao() {
  local file="$1"

  (( modo_teste )) && return 0
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

    validar_queries_principal_php "$file"
    validar_leitura_via_service "$file"
  fi

  if [[ "$file" =~ \.(js|ts|tsx)$ ]]; then
    local import_count
    import_count="$(grep -cE '^[[:space:]]*import ' "$file" || true)"
    if (( import_count >= 3 )) && ! grep -qE '^[[:space:]]*// [A-Z]' "$file"; then
      if exige_imports_por_secao "$file"; then
        falhar "${file}: imports sem seções // CATEGORIA (≥3 import)"
      fi
    fi

    validar_http_fora_queries "$file"
  fi

  if [[ "$file" =~ \.(js|ts|tsx)$ ]] && [[ "$file" == *Queries/* ]]; then
    if grep -qE 'fetch\([^,)]+,\s*\{' "$file"; then
      falhar "${file}: use const options antes de fetch() (docs/rules/javascript.md)"
    fi

    if grep -qE '(await[[:space:]]+)?fetch\(' "$file" && ! grep -q 'const url' "$file"; then
      falhar "${file}: use const url antes de fetch() (docs/rules/javascript.md)"
    fi

    if grep -qE '(await[[:space:]]+)?fetch\(' "$file" \
      && ! grep -qE 'const (retorno|resposta)[[:space:]]*=[[:space:]]*await[[:space:]]+fetch\([[:space:]]*url[[:space:]]*,[[:space:]]*options[[:space:]]*\)' "$file"; then
      falhar "${file}: use const retorno/resposta = await fetch(url, options) (docs/rules/javascript.md)"
    fi

    if eh_queries_principal "$file"; then
      local metodo
      while IFS= read -r metodo; do
        [[ -z "$metodo" ]] && continue
        case "$metodo" in
          index|show|store|update|destroy) ;;
          *) falhar "${file}: Queries principal só index/show/store/update/destroy; use subpasta (ex.: Referencia/Queries.js) para '${metodo}'" ;;
        esac
      done < <(extrair_metodos_queries_js "$file")
    fi
  fi
}

arquivos=()
modo_teste=0

if [[ "${1:-}" == "--files" ]]; then
  modo_teste=1
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
