---
name: sugerir-melhorias
description: >-
  Analisa o repositório atual e seleciona melhorias pequenas com impacto
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

Produza **até 5** sugestões por padrão. Se o usuário pedir uma quantidade
explícita, trate-a como limite máximo, nunca como meta. Entregar uma lista menor
ou nenhuma sugestão é um resultado válido.

## Objetivo

Selecionar somente melhorias baseadas em problemas atuais do repositório e cujo
impacto justifique o custo de um commit. O tamanho pequeno, isoladamente, não
torna uma alteração útil.

Esta skill somente sugere. Não alterar arquivos, criar commits, fazer push ou
reescrever datas/histórico durante este fluxo.

## Histórico de decisões

As decisões abaixo devem ser preservadas e não podem ser reapresentadas como
melhorias:

- `formatarMensagemErro` pode ser enviado ao frontend e registrado em logs.
  Manter esse comportamento e não sugerir omitir, mascarar ou sanitizar seu
  conteúdo como melhoria.

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

Aplicar um filtro moderado: aceitar o candidato quando pelo menos 3 dos 5 pontos
acima tiverem suporte concreto. O problema atual e a evidência continuam
obrigatórios; impacto, consequência e custo-benefício podem incluir inferência
razoável, desde que ela seja identificada na sugestão.
Descartar somente quando a justificativa depender principalmente de suposição ou
se limitar a "melhorar qualidade", "facilitar manutenção", "aumentar
consistência" ou outro benefício genérico.

Cada sugestão aceita deve:

- preservar o comportamento e a arquitetura existentes, salvo correção local e
  evidente de um bug;
- ter escopo pequeno, preferencialmente em 1 arquivo e normalmente em até 3;
  aceitar até 5 quando a mudança continuar localizada e verificável;
- ser executável independentemente das demais, ainda que trate área relacionada;
- ter benefício verificável ou fortemente sustentado pela evidência, com
  validação proporcional;
- seguir primeiro o padrão do módulo atual e depois o Dev Grimoire;
- não repetir trabalho já concluído nos commits recentes.

Candidatos adequados incluem bug localizado, validação que permite dado
inválido, texto que induz o usuário ao erro, barreira pontual de acessibilidade,
documentação que orienta uso incorreto ou código morto com custo atual
comprovado. Também podem entrar ausência de teste para comportamento relevante,
inconsistência de documentação ou tipo impreciso quando houver risco concreto
demonstrado. Diferença de estilo, nome melhorável ou possibilidade de limpeza,
isoladamente, continuam insuficientes.

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
