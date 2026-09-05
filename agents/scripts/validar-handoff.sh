#!/usr/bin/env bash
# Valida o handoff temporário produzido por executar-plano.
set -euo pipefail

handoff_path="${1:-}"

falhar() {
  printf 'handoff inválido: %s\n' "$1" >&2
  exit 1
}

exigir_conteudo_secao() {
  local secao="$1"

  awk -v secao="$secao" '
    $0 == secao { encontrouSecao = 1; next }
    encontrouSecao && /^## / { exit 1 }
    encontrouSecao && NF { encontrouConteudo = 1; exit 0 }
    END { exit !encontrouConteudo }
  ' "$handoff_path" || falhar "seção sem conteúdo: ${secao}"
}

[[ -n "$handoff_path" ]] || falhar 'informe o caminho do handoff'
[[ -f "$handoff_path" ]] || falhar "arquivo não encontrado: ${handoff_path}"

grep -Eq '^# Handoff de execução: .+' "$handoff_path" || falhar 'título ausente'

for secao in \
  '## Estado atual' \
  '## Tarefas' \
  '## Alterações verificadas' \
  '## Validações' \
  '## Decisões e bloqueios' \
  '## Próxima ação'; do
  grep -Fqx "$secao" "$handoff_path" >/dev/null || falhar "seção ausente: ${secao}"
  exigir_conteudo_secao "$secao"
done

if grep -Eq '(^|[^[:alpha:]])(TODO|TBD)([^[:alpha:]]|$)' "$handoff_path"; then
  falhar 'não use TODO ou TBD'
fi

printf 'handoff válido: %s\n' "$handoff_path"
