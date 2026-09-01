---
name: sugerir-melhorias
description: >-
  Analisa o repositório atual e sugere exatamente 5 melhorias pequenas, reais e
  independentes, adequadas a commits curtos. Use com "sugerir melhorias",
  "melhorias simples", "commit diário" ou "/sugerir-melhorias". Não implementa,
  não commita e não propõe mudanças de arquitetura ou workflow.
---

# Sugerir Melhorias

Anunciar no início:

```text
Usando sugerir-melhorias para analisar o repositório e propor 5 ajustes pequenos.
```

## Objetivo

Encontrar exatamente **5 melhorias legítimas**, baseadas em evidências do
repositório atual. Cada sugestão deve poder virar um commit pequeno e útil, sem
criar trabalho artificial apenas para movimentar o histórico do GitHub.

Esta skill somente sugere. Não alterar arquivos, criar commits, fazer push ou
reescrever datas/histórico durante este fluxo.

## Contexto obrigatório

Antes de sugerir:

1. Resolver e ler o Dev Grimoire conforme o `AGENTS.md` ou User Rules do projeto:
   `../dev-grimoire/docs/rules/geral.md` e as rules das stacks detectadas.
2. Ler e aplicar `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` antes de selecionar e apresentar as sugestões.
3. Ler as instruções locais do projeto e a spec da feature, quando existir.
4. Inspecionar `git status`, commits recentes, estrutura do repositório e os
   arquivos relevantes para cada candidato.
5. Consultar código suficiente para citar evidência concreta. Não sugerir com
   base apenas no nome de um arquivo ou em suposições.
6. Informar resumidamente os arquivos consultados antes de apresentar o resultado.

Se houver mudanças locais do usuário, não sugerir algo que as sobrescreva ou
conflite com elas. Se a sobreposição for relevante, descartá-la e procurar outro
candidato.

## Filtro de escopo

Cada sugestão deve:

- preservar o comportamento e a arquitetura existentes, salvo correção local e
  evidente de um bug;
- ter escopo pequeno, preferencialmente em 1 arquivo e no máximo em 3;
- ser independente das outras quatro;
- ter benefício verificável e validação proporcional;
- seguir primeiro o padrão do módulo atual e depois o Dev Grimoire;
- evitar repetir trabalho presente nos commits recentes.

Candidatos adequados incluem correção localizada de texto, validação ausente,
tipo impreciso, teste focado de comportamento existente, acessibilidade pontual,
documentação desatualizada ou remoção comprovadamente segura de código morto.

Descartar qualquer candidato que envolva:

- nova arquitetura, camada, abstração ou reorganização de diretórios;
- workflow, CI/CD, hooks, branches, deploy ou automação do processo;
- atualização ou inclusão de dependências;
- refatoração ampla, mudança transversal ou migração;
- formatação sem benefício funcional ou documental concreto;
- commit vazio, alteração de data ou qualquer tentativa de fabricar atividade.

## Seleção

Priorizar as opções por esta ordem:

1. baixo risco;
2. benefício claro;
3. menor diff estimado;
4. validação simples;
5. variedade entre as cinco sugestões.

Se não houver cinco melhorias honestas após inspeção suficiente, declarar
quantas foram encontradas e não completar a lista com trabalho artificial.

## Resposta

Apresentar as sugestões numeradas, da mais recomendada para a menos recomendada:

```markdown
## 1. [título objetivo]

- **Evidência:** `caminho/arquivo:linha` — o que foi observado
- **Melhoria:** alteração exata proposta
- **Benefício:** resultado concreto
- **Escopo:** arquivos previstos
- **Validação:** teste ou verificação proporcional
- **Esforço/risco:** baixo | muito baixo — justificativa curta
- **Commit sugerido:** mensagem conforme a regra Git do Dev Grimoire
```

Finalizar pedindo que o usuário escolha uma opção pelo número. Não iniciar a
implementação sem pedido explícito.
