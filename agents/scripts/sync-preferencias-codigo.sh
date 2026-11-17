#!/usr/bin/env bash
# Sincroniza as preferências de código e trabalho na raiz do projeto consumidor.
set -euo pipefail

if (($#)); then
  printf 'uso: execute %s na raiz do projeto consumidor, sem argumentos\n' "$0" >&2
  exit 1
fi

script_dir="$(cd "$(dirname "$0")" && pwd)"
grimoire="$(cd "${script_dir}/../.." && pwd)"
molde="${grimoire}/moldes/agents/AGENTS.md"
extrair_secao() {
  local titulo="$1"
  local secao
  secao="$(awk -v titulo="$titulo" '
    /^##?[[:space:]]/ { copiar = ($0 == titulo) }
    $0 == titulo { encontrados++ }
    copiar { print }
    END { if (encontrados != 1) exit 1 }
  ' "$molde")" || return 1
  if [[ "$secao" != "$titulo"$'\n\n- '* ]]; then
    printf 'erro: seção ausente ou inválida: %s em %s\n' "$titulo" "$molde" >&2
    return 1
  fi
  printf '%s\n' "$secao"
}

preferencias_codigo="$(extrair_secao '## Preferências de Código')"
preferencias_trabalho="$(extrair_secao '## Preferências de Trabalho')"

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

  if ! PREFERENCIAS_CODIGO="$preferencias_codigo" PREFERENCIAS_TRABALHO="$preferencias_trabalho" awk '
    BEGIN {
      codigo = "## Preferências de Código"
      trabalho = "## Preferências de Trabalho"
      secoes[codigo] = ENVIRON["PREFERENCIAS_CODIGO"]
      secoes[trabalho] = ENVIRON["PREFERENCIAS_TRABALHO"]
    }
    /^ ? ? ?(```|~~~)/ { cercado = !cercado }
    !cercado && ($0 in secoes) {
      if (encontrados[$0]++) { duplicada = 1; exit 1 }
      if (substituindo) print ""
      print secoes[$0]
      substituindo = 1
      next
    }
    substituindo && !cercado && /^##?[[:space:]]/ {
      print ""
      substituindo = 0
    }
    !substituindo { print }
    END {
      if (duplicada) exit 1
      if (!encontrados[codigo]) {
        if (NR && $0 != "") print ""
        print secoes[codigo]
      }
      if (!encontrados[trabalho]) {
        if (NR || !encontrados[codigo]) print ""
        print secoes[trabalho]
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
