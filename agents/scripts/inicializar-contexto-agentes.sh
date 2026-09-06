#!/usr/bin/env bash
# Cria AGENTS.md e CLAUDE.md a partir dos moldes do Dev Grimoire, sem sobrescrever arquivos existentes.
set -euo pipefail

script_dir="$(cd "$(dirname "$0")" && pwd)"
repo_root="$(cd "${script_dir}/../.." && pwd)"
templates_dir="${repo_root}/moldes/agents"
target_dir="${1:-$(pwd)}"

if [[ ! -d "$target_dir" ]]; then
  printf 'erro: diretório do projeto não existe: %s\n' "$target_dir" >&2
  exit 1
fi

target_dir="$(cd "$target_dir" && pwd)"
project_name="$(basename "$target_dir")"
max_lines=50

validar_limite_linhas() {
  local file="$1"
  local lines
  lines="$(wc -l <"$file")"

  if (( lines > max_lines )); then
    printf 'erro: %s tem %s linhas; o máximo é %s\n' "$file" "$lines" "$max_lines" >&2
    exit 1
  fi
}

for file in AGENTS.md CLAUDE.md; do
  target="${target_dir}/${file}"

  if [[ -e "$target" ]]; then
    printf 'skip: já existe: %s\n' "$target"
    continue
  fi

  sed "s/{NOME_PROJETO}/${project_name}/g" "${templates_dir}/${file}" >"$target"
  printf 'criado: %s\n' "$target"
done

for file in AGENTS.md CLAUDE.md; do
  validar_limite_linhas "${target_dir}/${file}"
done
