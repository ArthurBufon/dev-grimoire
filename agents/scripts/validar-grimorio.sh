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
  'docs/rules/global.md' \
  'docs/rules/geral.md' \
  'docs/rules/php.md' \
  'docs/rules/javascript.md' \
  'agents/fragments/gate-anti-slop.md' \
  'agents/skills/executar-plano.md' \
  'agents/scripts/validar-handoff.sh' \
  'agents/scripts/fixtures/handoff-valido.md' \
  'moldes/contratos/carro.md' \
  'moldes/laravel/app/Enums/Marca.php' \
  'moldes/laravel/app/Models/Carro.php' \
  'moldes/laravel/app/Queries/Carro/Queries.php' \
  'moldes/laravel/app/Services/Carro/Service.php' \
  'moldes/laravel/app/Http/Controllers/Web/Admin/Carro/CarroController.php' \
  'moldes/react/Pages/Carro/Index.tsx' \
  'moldes/react/Pages/Carro/Create.tsx' \
  'moldes/react/Pages/Carro/Edit.tsx' \
  'moldes/react/Components/Forms/Carro/Form.tsx' \
  'moldes/react/Queries/Queries.tsx' \
  'moldes/react/Services/Service.tsx' \
  'moldes/react/types/carro.ts' \
  'moldes/react/types/paginacao.ts' \
  'moldes/react/types/retorno.ts'; do
  exigir_arquivo "$path"
done

for marca in toyota honda volkswagen fiat chevrolet; do
  grep -Fq "'${marca}'" "${repo_root}/moldes/laravel/app/Enums/Marca.php" || falhar "enum Marca sem valor: ${marca}"
  grep -Fq "\`${marca}\`" "${repo_root}/moldes/contratos/carro.md" || falhar "contrato Carro sem valor de marca: ${marca}"
done

for campo in marca modelo ano cor placa km valor data_lancamento; do
  grep -Fq "${campo}" "${repo_root}/moldes/react/types/carro.ts" || falhar "tipo React sem campo: ${campo}"
  grep -Fq "\`${campo}\`" "${repo_root}/moldes/contratos/carro.md" || falhar "contrato Carro sem campo: ${campo}"
done

if grep -REn "from ['\"]@/types['\"]" "${repo_root}/moldes/react" >/dev/null; then
  falhar 'molde React importa @/types em vez de um arquivo de tipo direto'
fi

[[ ! -f "${repo_root}/moldes/react/types/index.ts" ]] || falhar 'barrel de tipos não é permitido nos moldes React'

bash "${repo_root}/agents/scripts/validar-handoff.sh" \
  "${repo_root}/agents/scripts/fixtures/handoff-valido.md" >/dev/null

printf 'grimório válido\n'
