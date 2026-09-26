#!/usr/bin/env bash
# Valida invariantes objetivos de skills, regras e moldes antes de distribuí-los.
set -euo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
repo_root="$(cd "${script_dir}/../.." && pwd)"

falhar() {
  printf 'grimório inválido: %s\n' "$1" >&2
  exit 1
}

exigir_arquivo() {
  local path="$1"
  [[ -f "${repo_root}/${path}" ]] || falhar "arquivo obrigatório ausente: ${path}"
}

for path in \
  'AGENTS.md' \
  'CLAUDE.md' \
  'docs/rules/global.md' \
  'docs/rules/geral.md' \
  'docs/rules/php.md' \
  'docs/rules/javascript.md' \
  'agents/fragments/gate-anti-slop.md' \
  'agents/fragments/gate-convencoes-codigo.md' \
  'agents/scripts/validar-convencoes-diff.sh' \
  'agents/scripts/inicializar-contexto-agentes.sh' \
  'agents/skills/check-slop.md' \
  'agents/skills/executar-plano.md' \
  'agents/scripts/validar-handoff.sh' \
  'agents/scripts/fixtures/handoff-valido.md' \
  'moldes/contratos/carro.md' \
  'moldes/contratos/fabricante.md' \
  'moldes/agents/AGENTS.md' \
  'moldes/agents/CLAUDE.md' \
  'moldes/laravel/app/Models/Fabricante.php' \
  'moldes/laravel/app/Models/Carro.php' \
  'moldes/laravel/app/Queries/Carro/Queries.php' \
  'moldes/laravel/app/Services/Carro/Service.php' \
  'moldes/laravel/app/helpers.php' \
  'moldes/laravel/app/Helpers/Paginacao.php' \
  'moldes/laravel/app/Http/Controllers/Web/Admin/Carro/CarroController.php' \
  'moldes/laravel/app/Http/Controllers/Web/Admin/Carro/Referencia/CarroReferenciaController.php' \
  'moldes/laravel/resources/js/Queries/Carro/Referencia/Queries.js' \
  'moldes/react/Pages/Carro/Index.tsx' \
  'moldes/react/Pages/Carro/Create.tsx' \
  'moldes/react/Pages/Carro/Edit.tsx' \
  'moldes/react/Components/Forms/Carro/Form.tsx' \
  'moldes/react/Queries/Queries.tsx' \
  'moldes/react/Queries/Carro/Referencia/Queries.tsx' \
  'moldes/react/Services/Service.tsx' \
  'moldes/react/types/carro.ts' \
  'moldes/react/types/fabricante.ts' \
  'moldes/react/types/paginacao.ts' \
  'moldes/react/types/retorno.ts'; do
  exigir_arquivo "$path"
done

for claude_file in 'CLAUDE.md' 'moldes/agents/CLAUDE.md'; do
  grep -Fq '@AGENTS.md' "${repo_root}/${claude_file}" || falhar "${claude_file} não importa AGENTS.md"
done

for agent_file in 'AGENTS.md' 'CLAUDE.md' 'moldes/agents/AGENTS.md' 'moldes/agents/CLAUDE.md'; do
  linhas="$(wc -l <"${repo_root}/${agent_file}")"
  (( linhas <= 50 )) || falhar "${agent_file} excede o limite de 50 linhas (${linhas})"
done

grep -Fq '{GRIMOIRE}/agents/fragments/gate-anti-slop.md' "${repo_root}/agents/skills/check-slop.md" \
  || falhar 'check-slop não referencia o gate anti-slop'

linhas_check_slop="$(wc -l <"${repo_root}/agents/skills/check-slop.md")"
(( linhas_check_slop <= 20 )) || falhar "check-slop excede o limite de 20 linhas (${linhas_check_slop})"
[[ ! -f "${repo_root}/agents/skills/check-overengineering.md" ]] \
  || falhar 'check-overengineering deve permanecer unificada em check-slop'

grep -Fq 'fabricante_id' "${repo_root}/moldes/laravel/app/Models/Carro.php" \
  || falhar 'model Carro sem relacionamento fabricante_id'
grep -Fq 'belongsTo(Fabricante::class)' "${repo_root}/moldes/laravel/app/Models/Carro.php" \
  || falhar 'model Carro sem belongsTo Fabricante'

for campo in fabricante_id modelo ano cor placa km valor data_lancamento; do
  grep -Fq "${campo}" "${repo_root}/moldes/react/types/carro.ts" || falhar "tipo React sem campo: ${campo}"
  grep -Fq "\`${campo}\`" "${repo_root}/moldes/contratos/carro.md" || falhar "contrato Carro sem campo: ${campo}"
done

if grep -REn "from ['\"]@/types['\"]" "${repo_root}/moldes/react" >/dev/null; then
  falhar 'molde React importa @/types em vez de um arquivo de tipo direto'
fi

[[ ! -f "${repo_root}/moldes/react/types/index.ts" ]] || falhar 'barrel de tipos não é permitido nos moldes React'

bash "${repo_root}/agents/scripts/validar-handoff.sh" \
  "${repo_root}/agents/scripts/fixtures/handoff-valido.md" >/dev/null

convencoes="${repo_root}/agents/scripts/validar-convencoes-diff.sh"
fixtures="${repo_root}/agents/scripts/fixtures"

bash "$convencoes" --files \
  "${fixtures}/convencoes-php-valido.php" \
  "${fixtures}/convencoes-js-valido.js" \
  >/dev/null \
  || falhar 'validar-convencoes-diff.sh rejeitou fixture válido'

if bash "$convencoes" --files "${fixtures}/ConvencoesPhpInvalidoController.php" >/dev/null 2>&1; then
  falhar 'validar-convencoes-diff.sh deveria rejeitar ConvencoesPhpInvalidoController.php'
fi

if bash "$convencoes" --files "${fixtures}/Queries/Entidade/Queries-inline-fetch.js" >/dev/null 2>&1; then
  falhar 'validar-convencoes-diff.sh deveria rejeitar Queries-inline-fetch.js'
fi

if bash "$convencoes" --files "${fixtures}/Queries/Entidade/Queries.js" >/dev/null 2>&1; then
  falhar 'validar-convencoes-diff.sh deveria rejeitar Queries principal com gerarReferencia'
fi

grep -Fq 'gate-convencoes-codigo.md' "${repo_root}/agents/skills/executar-plano.md" \
  || falhar 'executar-plano não referencia gate-convencoes-codigo.md'

grep -Fq 'gate-convencoes-codigo.md' "${repo_root}/agents/skills/check-slop.md" \
  || falhar 'check-slop não referencia gate-convencoes-codigo.md'

grep -Fq 'validar-convencoes-diff.sh' "${repo_root}/agents/skills/sync-origin.md" \
  || falhar 'sync-origin não referencia validar-convencoes-diff.sh'

quick_fix="${repo_root}/agents/skills/quick-fix.md"
[[ -f "$quick_fix" ]] || falhar 'quick-fix.md ausente'
for contrato in 'gate-anti-slop.md' 'gate-convencoes-codigo.md' 'validar-convencoes-diff.sh'; do
  grep -Fq "$contrato" "$quick_fix" || falhar "quick-fix.md não referencia ${contrato}"
done

printf 'grimório válido\n'
