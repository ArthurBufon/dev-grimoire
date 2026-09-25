---
name: sugerir-melhorias
description: >-
  Analisa o repositório atual e seleciona poucas melhorias pequenas com impacto
  concreto e evidência verificável. Use com "sugerir melhorias", "melhorias
  simples" ou "/sugerir-melhorias". Não implementa, não commita e não propõe
  mudanças de arquitetura ou workflow.
---

# Sugerir Melhorias

Anunciar no início:

```text
Usando sugerir-melhorias para procurar ajustes pequenos que realmente justifiquem um commit.
```

## Quantidade

Produza **até 3** sugestões por padrão. Se o usuário pedir uma quantidade
explícita, trate-a como limite máximo, nunca como meta. Entregar uma lista menor
ou nenhuma sugestão é um resultado válido.

## Objetivo

Selecionar somente melhorias baseadas em problemas atuais do repositório e cujo
impacto justifique o custo de um commit. O tamanho pequeno, isoladamente, não
torna uma alteração útil.

Esta skill somente sugere. Não alterar arquivos, criar commits, fazer push ou
reescrever datas/histórico durante este fluxo.

## Contexto obrigatório

Antes de sugerir:

1. Resolver e ler o Dev Grimoire conforme `{GRIMOIRE}/docs/rules/global.md`:
   `{GRIMOIRE}/docs/rules/geral.md` e as rules das stacks detectadas.
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

Antes de aceitar um candidato, identificar:

- qual problema existe hoje;
- qual evidência demonstra o problema e que o caminho afetado é relevante;
- quem ou o que é afetado;
- qual consequência permanece se nada for alterado;
- por que o benefício esperado compensa a mudança.

Descartar o candidato se alguma resposta depender de suposição ou se o benefício
só puder ser descrito como "melhorar qualidade", "facilitar manutenção",
"aumentar consistência" ou outra justificativa genérica.

Cada sugestão aceita deve:

- preservar o comportamento e a arquitetura existentes, salvo correção local e
  evidente de um bug;
- ter escopo pequeno, preferencialmente em 1 arquivo e no máximo em 3;
- ser independente das demais;
- ter benefício verificável e validação proporcional;
- seguir primeiro o padrão do módulo atual e depois o Dev Grimoire;
- evitar repetir trabalho presente nos commits recentes.

Candidatos adequados incluem bug localizado, validação que permite dado
inválido, texto que induz o usuário ao erro, barreira pontual de acessibilidade,
documentação que orienta uso incorreto ou código morto com custo atual
comprovado. Ausência de teste, diferença de estilo, nome melhorável, tipo mais
específico ou possibilidade de limpeza não constituem problema por si só.

Descartar qualquer candidato que envolva:

- nova arquitetura, camada, abstração ou reorganização de diretórios;
- workflow, CI/CD, hooks, branches, deploy ou automação do processo;
- atualização ou inclusão de dependências;
- refatoração ampla, mudança transversal ou migração;
- formatação sem benefício funcional ou documental concreto;
- commit vazio, alteração de data ou qualquer tentativa de fabricar atividade.

## Seleção

Priorizar as opções por esta ordem:

1. maior impacto concreto;
2. evidência mais forte;
3. melhor relação entre benefício e custo;
4. menor risco;
5. menor diff e validação mais simples.

Não buscar variedade sacrificando qualidade. Se não houver sugestão que passe
pelo filtro, informar isso diretamente e encerrar sem produzir uma lista.

## Resposta

Apresentar as sugestões numeradas, da mais recomendada para a menos recomendada:

```markdown
## 1. [título objetivo]

- **Evidência:** `caminho/arquivo:linha` — o que foi observado
- **Impacto atual:** quem ou o que é afetado e qual é a consequência concreta
- **Melhoria:** alteração exata proposta
- **Escopo:** arquivos previstos
- **Validação:** teste ou verificação proporcional
- **Esforço/risco:** baixo | muito baixo — justificativa curta
```

Quando houver sugestões, finalizar pedindo que o usuário escolha uma opção pelo
número. Não iniciar a implementação sem pedido explícito.
