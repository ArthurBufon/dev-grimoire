---
name: validar-abordagem
description: >-
  Verifica se uma abordagem descrita em modelagem, plano, spec ou outro artefato
  acessível é padrão do ecossistema ou adotada na prática. Use para validar uma
  decisão técnica documentada antes de implementá-la.
---

# Validar Abordagem

## Objetivo

Verificar se decisões de arquitetura, modelagem ou implementação têm respaldo no ecossistema e em uso real. A análise informa; não altera artefatos nem substitui a decisão do desenvolvedor.

## Pré-condição bloqueante

A invocação deve referenciar arquivo acessível de modelagem, plano, spec ou artefato que descreva a abordagem. Sem arquivo, ou se um indicado não puder ser lido, não faça análise nem pesquisa parcial. Responda:

```text
Análise bloqueada: informe um arquivo acessível de modelagem, plano, spec ou outro artefato que descreva a abordagem.
```

## Análise

1. Leia integralmente os arquivos referenciados e apenas o contexto local necessário para entender as decisões.
2. Extraia somente abordagens materiais: arquitetura, módulos, dados, integração, estado, persistência, segurança ou idiomática de framework.
3. Pesquise obrigatoriamente cada abordagem material na internet. Priorize documentação e exemplos oficiais, depois fontes técnicas primárias ou mantidas por praticantes reconhecidos. Use exemplos públicos reais quando forem necessários para comprovar adoção prática.
4. Classifique cada conclusão como:
   - **Padrão do ecossistema:** recomendado ou documentado pelo framework;
   - **Prática adotada:** há uso real, sem convenção oficial;
   - **Decisão específica:** válida no contexto, mas não é padrão comprovado;
   - **Sem evidência suficiente:** não foi possível confirmar a alegação.
5. Compare evidência, requisitos e restrições do artefato. Casos externos dificilmente são idênticos: avalie a equivalência de contexto, escala, restrições e trade-offs, sem exigir correspondência literal. Popularidade não prova adequação ao caso; aponte riscos ou alternativas só se mudarem a decisão arquitetural.

Não invente consenso, adoção ou recomendação. Sem fonte acessível ou pesquisa
viável, registre a limitação e não afirme que é padrão. Não implemente, edite
arquivos nem transforme a análise em code review detalhado sem pedido explícito.

## Resposta

Responda em português, com links diretos e esta estrutura (omita o vazio):

```markdown
## Veredito

## Abordagens verificadas

| Abordagem do artefato | Classificação | Evidência | Impacto no plano |
| --- | --- | --- | --- |

## Pontos que exigem decisão

## Limitações da pesquisa
```

Em **Evidência**, explique em uma frase o que cada fonte demonstra, além do
link. No **Veredito**, diga objetivamente se a abordagem está alinhada ao
ecossistema, é decisão consciente fora do padrão, ou precisa ser revista.
