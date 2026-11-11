#!/usr/bin/env bash
# Sincroniza a seção Preferências de Código a partir da raiz do projeto consumidor.
set -euo pipefail

if (($#)); then
  printf 'uso: execute %s na raiz do projeto consumidor, sem argumentos\n' "$0" >&2
  exit 1
fi

script_dir="$(cd "$(dirname "$0")" && pwd)"
grimoire="$(cd "${script_dir}/../.." && pwd)"
molde="${grimoire}/moldes/agents/AGENTS.md"
titulo='## Preferências de Código'

secao="$(awk -v titulo="$titulo" '
  $0 == titulo { copiar = 1 }
  copiar { print }
' "$molde")"
if [[ "$secao" != "$titulo"$'\n\n- '* ]] || grep -Eq '^#{1,2} ' <<<"${secao#*$'\n'}"; then
  printf 'erro: mantenha %s como última seção do molde %s\n' "$titulo" "$molde" >&2
  exit 1
fi

sincronizar() (
  local arquivo="$1"
  local temporario
  local original
  if [[ ! -f "$arquivo" || -L "$arquivo" ]]; then
    printf 'erro: execute na raiz do projeto com um AGENTS.md regular\n' >&2
    return 1
  fi
  original="$(cksum < "$arquivo")"
  temporario="$(mktemp "${arquivo}.XXXXXX")"
  trap 'rm -f -- "$temporario"' EXIT
  cp -p -- "$arquivo" "$temporario"

  if ! PREFERENCIAS_CODIGO="$secao" awk -v titulo="$titulo" '
    BEGIN { secao = ENVIRON["PREFERENCIAS_CODIGO"] }
    /^ ? ? ?(```|~~~)/ { cercado = !cercado }
    !cercado && $0 == titulo {
      if (encontrado++) exit 1
      print secao
      substituindo = 1
      next
    }
    substituindo && !cercado && /^##?[[:space:]]/ {
      print ""
      substituindo = 0
    }
    !substituindo { print }
    END {
      if (!encontrado) {
        if (NR && $0 != "") print ""
        print secao
      }
    }
  ' "$arquivo" > "$temporario"; then
    printf 'erro: seção duplicada em %s\n' "$arquivo" >&2
    return 1
  fi

  if ! cmp -s "$arquivo" "$temporario"; then
    if [[ -L "$arquivo" || "$(cksum < "$arquivo")" != "$original" ]]; then
      printf 'erro: %s mudou durante a sincronização\n' "$arquivo" >&2
      return 1
    fi
    mv -- "$temporario" "$arquivo"
    printf 'preferências atualizadas: %s\n' "$arquivo"
  fi
)

sincronizar ./AGENTS.md
