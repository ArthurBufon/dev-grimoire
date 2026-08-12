---

name: executar-plano
description: Use quando existir um plano de implementação pronto para ser executado em tarefas usando subagents.
---

# Executar Plano

## Regra final

NUNCA desperdiçar tokens — sempre visar economia, mas mantendo qualidade de prompt/resultado.

## Regras obrigatórias

1. **Evitar overengineering:** não adicionar abstrações, camadas, arquivos, refatorações ou verificações além do que a tarefa/plano exige. Implementar o mínimo correto — qualidade alta no código entregue, não em trabalho extra não solicitado.
2. **Iterações rápidas com qualidade:** priorizar loops curtos por tarefa (contexto só do necessário, testes só dos cenários relevantes, sem exploração ou auditoria não pedida). Não compensar velocidade com atalhos que degradem o código dentro do escopo.

## Objetivo

Executar um plano de implementação tarefa por tarefa, delegando o trabalho para subagents e validando cada entrega antes de continuar.

Princípio central:

> Um subagent implementa, outro revisa e o controlador coordena.

## Entrada obrigatória

Leia o plano em:

`docs/modelagem/{feature}/plano/{feature}.md`

Consulte a modelagem no mesmo diretório quando precisar esclarecer requisitos ou decisões técnicas:

* `docs/modelagem/{feature}/modelagem/{feature}.md`

## Política de exclusão

Os arquivos em `docs/modelagem/{feature}/` são **artefatos temporários** de modelagem — não documentação permanente do projeto.

* Não versione conteúdo que deva permanecer no repositório dentro desses paths; transfira o que for necessário para `docs/features/` ou equivalente do projeto.
* Após a feature estar implementada e entregue, **exclua** `docs/modelagem/{feature}/` por completo para evitar lixo acumulado no repositório.

## Regras essenciais

* **Sem overengineering:** escopo mínimo da tarefa; sem abstrações, arquivos ou verificações extras.
* **Iteração rápida:** contexto, implementação e validação só do necessário — sem exploração ou auditoria não solicitada.
* Leia o plano completo antes de começar.
* Respeite as decisões e restrições definidas no plano.
* Execute uma tarefa de implementação por vez.
* Use um subagent novo para cada tarefa.
* Não execute implementações paralelas que possam alterar os mesmos arquivos.
* Não altere o escopo sem necessidade.
* Não crie branches, worktrees ou commits sem permissão explícita do usuário.
* **CHECKPOINT OBRIGATÓRIO:** ao finalizar cada tarefa, pare e solicite revisão do dev antes de iniciar a próxima.
* Não inicie a próxima tarefa sem aprovação explícita do dev.
* Pare também quando estiver bloqueado ou existir uma ambiguidade crítica.
* **Formatação:** proibido executar ferramentas de formatação automática (Pint, Prettier, PHP CS Fixer, `eslint --fix` para estilo, format-on-save, etc.) em arquivos tocados. Seguir as convenções do dev e o estilo já existente no arquivo/módulo; o diff deve mudar só o necessário. PHP: `{GRIMOIRE}/docs/rules/php.md` (seção "Formatação e legibilidade"). JS/TS: mesma política.

## Preparação

Antes da primeira tarefa:

1. Leia o plano completo.
2. Identifique as tarefas e sua ordem.
3. Verifique dependências entre elas.
4. Confira o estado atual do repositório.
5. Execute os testes existentes, quando viável.
6. Registre quais tarefas já estavam concluídas.

Caso o plano contradiga o código ou tenha uma decisão impossível de inferir, pergunte ao usuário antes de implementar.

## Fluxo por tarefa

Para cada tarefa:

1. Reúna **somente** o contexto necessário — não explore o codebase além do que a tarefa exige.
2. Envie a tarefa para um subagent implementador.
3. Analise o resultado e os testes executados.
4. Envie as alterações para um subagent revisor.
5. Corrija problemas importantes encontrados.
6. Execute novamente os testes relevantes.
7. Marque a tarefa como concluída.
8. **CHECKPOINT:** apresente o resumo da tarefa ao dev e solicite revisão/aprovação.
9. Só inicie a próxima tarefa após aprovação explícita do dev.

## Checkpoint obrigatório entre tarefas

Ao concluir cada tarefa (após implementação, revisão por subagent e correções):

1. Apresente ao dev um resumo curto: o que foi feito, arquivos alterados, testes e riscos.
2. Solicite revisão e aprovação explícita para prosseguir.
3. **PARE.** Não dispare o próximo subagent implementador.
4. Aguarde a resposta do dev.
5. Só então inicie a próxima tarefa.

**Proibido:**

* Encadear a próxima tarefa automaticamente após a revisão do subagent.
* Assumir aprovação por silêncio, "parece ok" interno ou ausência de bloqueio técnico.
* Tratar o checkpoint como opcional quando a tarefa for "pequena", "óbvia" ou "já revisada pelo subagent".

A revisão do subagent **não substitui** o checkpoint do dev.

## Dev Grimoire na execução

Implementador e revisor devem seguir `{GRIMOIRE}/docs/rules/global.md` (seção 6): ler rules da stack e molde via Read/Grep antes de criar ou alterar arquivos; na revisão, validar conformidade contra esses artefatos — não reinterpretar convenções.

Incluir no prompt do subagent o path do molde quando a tarefa cria arquivo novo (mapa em `global.md`).

## Subagent implementador

O implementador deve receber:

* descrição completa da tarefa;
* arquivos provavelmente envolvidos;
* restrições relevantes do plano;
* decisões tomadas em tarefas anteriores;
* comandos de teste recomendados;
* proibição de commit ou criação de branch sem permissão.

Exemplo de instrução:

```text
Implemente a tarefa abaixo seguindo o plano.

Tarefa:
[descrição da tarefa]

Contexto relevante:
[arquivos, interfaces e decisões anteriores]

Regras:
- mantenha o escopo restrito à tarefa — sem overengineering;
- iteração rápida: implemente e valide só o pedido; sem exploração, auditoria ou verificações extras;
- convenções: {GRIMOIRE}/docs/rules/global.md (ler rules e molde antes de codar);
- siga os padrões existentes do projeto;
- NÃO use ferramentas de formatação automática (Pint, Prettier, PHP CS Fixer, eslint --fix para estilo, format-on-save); preserve o estilo do arquivo — diff mínimo;
- escreva testes para os cenários importantes;
- execute os testes relevantes;
- não crie branch ou commit;
- informe arquivos alterados, testes executados e possíveis preocupações.
```

O implementador deve retornar:

* status: concluído, bloqueado ou precisa de contexto;
* resumo da implementação;
* arquivos alterados;
* testes executados e resultados;
* riscos ou dúvidas encontrados.

## Testes

Use TDD quando fizer sentido, principalmente para:

* regras de negócio;
* correções de bugs;
* comportamentos com entradas e saídas claras;
* mudanças com risco de regressão.

Não abuse de testes unitários.

Escreva testes suficientes para cobrir os cenários mais importantes da feature. Não teste detalhes internos sem valor ou comportamento já garantido pelo framework.

## Revisão da tarefa

Após a implementação, envie a tarefa e o diff para outro subagent.

O revisor deve verificar:

* atendimento ao plano;
* funcionamento da regra de negócio;
* bugs e regressões;
* integração com o código existente;
* complexidade desnecessária;
* qualidade dos testes;
* alterações fora do escopo.

Exemplo de instrução:

```text
Revise a implementação desta tarefa.

Requisitos:
[descrição da tarefa]

Alterações:
[diff ou arquivos alterados]

Verifique:
- conformidade com os requisitos;
- conformidade com {GRIMOIRE}/docs/rules/global.md (rules + molde do arquivo);
- ausência de reformatação desnecessária (sem Pint, Prettier, CS Fixer, eslint --fix de estilo);
- bugs ou regressões;
- integração com o restante do projeto;
- complexidade desnecessária ou overengineering;
- testes insuficientes ou frágeis.

Não exija melhorias, refatorações ou verificações fora do escopo da tarefa.

Classifique os problemas como:
- crítico;
- importante;
- menor.

Não sugira mudanças apenas por preferência pessoal.
```

## Correções

Problemas críticos ou importantes devem ser enviados de volta ao implementador.

Forneça:

* descrição exata do problema;
* arquivo ou trecho afetado;
* comportamento esperado;
* testes que precisam passar.

Depois da correção:

1. execute os testes relevantes;
2. peça uma nova revisão focada nos problemas encontrados;
3. quando os problemas críticos e importantes estiverem resolvidos, execute o checkpoint obrigatório com o dev antes da próxima tarefa.

Problemas menores podem ser registrados para a revisão final quando não afetarem o comportamento ou a manutenção imediata.

Evite ciclos infinitos. Após duas tentativas malsucedidas de corrigir o mesmo problema, reavalie a abordagem ou reporte o bloqueio ao usuário.

## Bloqueios

Considere uma tarefa bloqueada quando:

* faltarem requisitos essenciais;
* o plano contradizer o código;
* uma dependência necessária não existir;
* os testes revelarem um problema estrutural fora do escopo;
* a correção exigir uma decisão de produto ou arquitetura.

Ao reportar um bloqueio, informe:

* tarefa afetada;
* problema encontrado;
* tentativas realizadas;
* decisão necessária.

## Revisão final

Depois de todas as tarefas:

1. revise o diff completo da implementação;
2. confirme que todas as tarefas do plano foram atendidas;
3. execute a suíte de testes aplicável;
4. verifique integração, regressões e mudanças fora do escopo;
5. corrija problemas críticos ou importantes;
6. exclua `docs/modelagem/{feature}/` por completo;
7. apresente o resultado ao usuário.

A revisão final deve considerar o conjunto completo, não apenas cada tarefa isoladamente.

## Relatório final

Informe:

* tarefas concluídas;
* principais arquivos alterados;
* testes executados e resultados;
* decisões importantes;
* problemas menores pendentes;
* bloqueios ou limitações;
* estado atual da implementação;
* confirmação de que `docs/modelagem/{feature}/` foi excluído.

Não afirme que o trabalho está concluído sem verificar os testes, o diff final e a exclusão dos artefatos temporários.
