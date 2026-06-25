---
name: plan-finished-review
description: "Revisão crítica pós-implementação para validar se uma task/plano foi executado corretamente, sem alterar código."
disable-model-invocation: true
---

# Revisão pós-implementação do plano

Use esta skill para revisar uma implementação já concluída.

O objetivo é validar se o plano foi executado corretamente antes de considerar a task finalizada.

O usuário pode fornecer:

* plano original;
* resumo da implementação;
* arquivos alterados;
* diff;
* critérios de aceite;
* observações do agente executor.

Se essas informações não forem fornecidas, inspecione o contexto disponível do projeto e o diff atual quando possível.

Não implemente correções.
Não altere arquivos.
Não execute refactors.
Não modifique documentação.
Não aumente o escopo.
Apenas revise, critique e recomende próximos passos.

---

## Objetivo da análise

Faça uma revisão crítica, fina e objetiva da implementação concluída.

A análise deve validar:

* se o plano original foi cumprido;
* se o escopo foi respeitado;
* se a solução está coerente com o projeto;
* se há bugs prováveis;
* se há riscos de regressão;
* se os critérios de aceite foram atendidos;
* se existem pendências antes de finalizar.

Use um estilo crítico semelhante ao grill-me:

* pressione inconsistências;
* questione decisões frágeis;
* procure lacunas;
* identifique riscos escondidos;
* diferencie problema real de melhoria opcional;
* proponha correções objetivas quando necessário.

---

## 1. Entenda o que deveria ter sido entregue

Explique com suas palavras qual era o objetivo da task/plano.

Identifique:

* entrega esperada;
* escopo essencial;
* fora de escopo;
* critérios de aceite originais;
* riscos conhecidos;
* decisões assumidas no plano.

Se o plano original não estiver disponível, deixe claro que a revisão será baseada apenas no contexto atual, diff e implementação observável.

---

## 2. Compare plano vs implementação

Verifique se a implementação corresponde ao que foi planejado.

Avalie:

* todos os itens do checklist foram cumpridos;
* algo essencial ficou de fora;
* algo foi implementado de forma diferente do plano;
* algo foi adicionado sem necessidade;
* alguma etapa foi pulada;
* alguma decisão foi alterada sem justificativa;
* alguma regra de negócio foi interpretada de forma diferente.

Classifique cada divergência como:

* crítica;
* importante;
* aceitável;
* melhoria futura.

Para cada divergência, explique:

* o que foi planejado;
* o que foi implementado;
* impacto prático;
* recomendação objetiva.

---

## 3. Revise o escopo

Verifique se a implementação respeitou o escopo original.

Procure sinais de:

* overengineering;
* refactor fora do escopo;
* mudanças amplas demais;
* abstração prematura;
* alteração de comportamento não solicitada;
* mudança de API não planejada;
* mudança visual não solicitada;
* alteração em regras de negócio sem necessidade;
* arquivos alterados sem relação clara com a task.

Diferencie:

* mudança necessária;
* mudança aceitável;
* mudança suspeita;
* mudança que deveria ser revertida ou separada.

---

## 4. Revise a qualidade técnica

Analise se a implementação está simples, segura e sustentável.

Avalie:

* clareza do código;
* legibilidade;
* coesão;
* acoplamento;
* duplicação aceitável vs abstração desnecessária;
* nomes de variáveis, funções, classes, componentes e arquivos;
* tratamento de erros;
* validações;
* estados vazios;
* edge cases;
* performance;
* segurança;
* permissões;
* consistência com padrões existentes do projeto.

Aponte problemas concretos, não preferências subjetivas.

Quando sugerir melhoria, explique o motivo e o impacto.

---

## 5. Revise integração e impactos colaterais

Verifique se a implementação pode quebrar partes relacionadas do sistema.

Avalie possíveis impactos em:

* backend;
* frontend;
* banco de dados;
* migrations;
* seeders;
* APIs;
* autenticação;
* autorização;
* permissões;
* jobs;
* eventos;
* comandos;
* testes;
* rotas;
* componentes compartilhados;
* layout;
* estados de carregamento;
* tratamento de erro;
* responsividade;
* compatibilidade com dados existentes.

Indique pontos que merecem teste manual ou automatizado.

---

## 6. Valide critérios de aceite

Verifique se existem critérios objetivos para dizer que a task está concluída.

Para cada critério:

* marque como atendido, parcialmente atendido, não atendido ou não verificável;
* explique rapidamente a evidência;
* indique o que falta, se aplicável.

Quando os critérios de aceite forem insuficientes, proponha critérios objetivos adicionais.

---

## 7. Revise testes e verificações

Analise se a implementação possui validação suficiente.

Verifique:

* testes automatizados criados ou atualizados;
* testes existentes impactados;
* necessidade de testes manuais;
* cenários principais;
* cenários de erro;
* permissões;
* estados vazios;
* validação de dados;
* regressões prováveis.

Se não houver testes, diga se isso é aceitável para a task ou se representa risco real.

Sugira comandos ou verificações que deveriam ser executados, quando aplicável.

Não execute comandos sem autorização explícita.

---

## 8. Identifique bugs prováveis e pendências

Liste problemas que podem impedir a task de ser considerada finalizada.

Classifique como:

* bloqueante;
* importante antes de merge;
* pode virar follow-up;
* observação menor.

Para cada item, indique:

* problema;
* impacto;
* recomendação;
* prioridade.

Evite listar melhorias genéricas sem impacto real.

---

## 9. Classifique o resultado final

Classifique a implementação como uma das opções:

* Aprovada
* Aprovada com observações
* Precisa de ajustes antes de finalizar
* Reprovada / incompleta
* Não verificável com o contexto atual

Justifique de forma objetiva.

Explique o principal motivo da classificação.

---

## 10. Gere relatório final pós-implementação

Entregue a revisão no seguinte formato:

## Resumo

Explique em poucas linhas o que foi revisado e qual é o veredito.

## Plano vs implementação

Liste o que foi cumprido, parcialmente cumprido ou não cumprido.

## Problemas encontrados

Liste apenas problemas relevantes, com prioridade e impacto.

## Riscos restantes

Liste riscos que ainda merecem atenção.

## Testes/verificações recomendadas

Liste verificações objetivas antes de finalizar.

## Ajustes necessários

Separe em:

* obrigatórios antes de finalizar;
* recomendados;
* follow-up opcional.

## Veredito

Use uma das classificações:

* Aprovada
* Aprovada com observações
* Precisa de ajustes antes de finalizar
* Reprovada / incompleta
* Não verificável com o contexto atual

## Próximo passo recomendado

Diga objetivamente o que deve acontecer agora:

* finalizar;
* rodar testes;
* corrigir pontos específicos;
* revisar novamente após ajustes;
* separar follow-up;
* reabrir planejamento.

---

## Regras importantes

* Não implemente código.
* Não altere arquivos.
* Não execute comandos sem autorização explícita.
* Não faça refactor.
* Não aumente o escopo.
* Não transforme melhorias opcionais em bloqueantes.
* Seja crítico, mas prático.
* Priorize problemas reais.
* Diferencie bug, risco, dívida técnica e preferência pessoal.
* Quando algo não puder ser verificado, diga claramente.
* Quando encontrar problema crítico, destaque no início da resposta.
* Ao final, entregue um veredito objetivo e o próximo passo recomendado.
