# Revisão crítica de plano com `/grill-me`

Use a skill `/grill-me` para revisar esta task/plano antes da execução.

Task ou plano a ser analisado:

[COLE A TASK OU PLANO AQUI]

## Objetivo da análise

Faça uma revisão crítica, fina e objetiva antes de qualquer execução ou implementação.

A análise deve validar se o plano está claro, completo, seguro, coerente com o contexto do projeto e pronto para ser executado.

Use o estilo do `/grill-me`: questione decisões, pressione ambiguidades, identifique riscos escondidos e force clareza antes da execução.

Não use `/grill-with-docs`.
Não crie, altere ou reorganize arquivos de documentação.
Não proponha mudanças na estrutura atual de docs.
O foco é apenas revisar e fortalecer o plano antes da execução.

## Modo de revisão

Faça um “grilling” do plano, mas evite transformar a análise em uma entrevista longa.

Pergunte ao usuário apenas quando existir dúvida realmente bloqueante.

Quando uma decisão puder ser tomada com bom senso, proponha uma decisão padrão recomendada e siga a análise com base nela.

Quando algo puder ser inferido pelo próprio plano, contexto fornecido ou padrões comuns do projeto, não pergunte: inferir, justificar e apontar a suposição.

---

## 1. Entenda o objetivo real

Explique com suas palavras o que esta task/plano pretende entregar.

Identifique:

* resultado esperado;
* problema real que está sendo resolvido;
* escopo essencial;
* itens opcionais ou melhoria futura;
* fora de escopo;
* pré-condições;
* dependências importantes.

Verifique se o plano está tentando resolver mais de um problema ao mesmo tempo.

Aponte qualquer sinal de escopo aberto, objetivo vago ou entrega difícil de validar.

---

## 2. Faça o grilling das decisões principais

Questione criticamente as decisões do plano.

Valide:

* por que esta abordagem foi escolhida;
* quais alternativas simples existiam;
* se existe overengineering;
* se existe abstração prematura;
* se a solução está simples o suficiente;
* se alguma decisão parece irreversível ou difícil de desfazer;
* se alguma escolha depende de uma regra ainda não confirmada;
* se há decisões implícitas que deveriam estar explícitas.

Para cada decisão frágil, indique:

* o problema;
* o risco;
* uma decisão padrão recomendada;
* quando seria necessário perguntar ao usuário.

---

## 3. Levante dúvidas finais

Liste apenas dúvidas que podem impactar execução, arquitetura, regra de negócio, dados, segurança ou testes.

Classifique cada dúvida como:

* bloqueante;
* importante, mas não bloqueante;
* não bloqueante / melhoria futura.

Evite perguntas irrelevantes ou excessivamente detalhadas.

Quando possível, sugira uma resposta padrão recomendada.

Diferencie claramente o que precisa ser respondido antes da execução e o que pode ser assumido com segurança.

---

## 4. Revise o plano técnico/operacional

Verifique se os passos propostos fazem sentido.

Avalie:

* ordem correta de execução;
* granularidade das etapas;
* dependências entre tarefas;
* lacunas técnicas;
* inconsistências;
* riscos de alteração colateral;
* impacto em dados existentes;
* impacto em APIs;
* impacto em frontend;
* impacto em permissões/autenticação;
* migrações;
* seeders;
* validações;
* testes;
* rollback;
* compatibilidade com padrões atuais do projeto.

Aponte qualquer passo vago demais para execução por agente.

Indique se alguma etapa deveria ser dividida, removida, simplificada ou reordenada.

---

## 5. Valide regras, contexto e restrições

Confirme se o plano respeita o contexto do projeto.

Verifique se existem:

* regras de negócio relevantes;
* padrões técnicos existentes;
* arquitetura já assumida;
* limitações do projeto;
* decisões anteriores que precisam ser respeitadas;
* conflitos com implementação existente;
* riscos de inconsistência futura.

Aponte possíveis conflitos com decisões já assumidas.

Sugira ajustes mínimos para manter coerência, simplicidade e manutenção futura.

---

## 6. Avalie riscos e qualidade

Liste os principais riscos da execução.

Para cada risco, indique:

* impacto provável;
* chance de acontecer;
* mitigação simples;
* como validar que o risco foi evitado.

Inclua atenção especial para:

* regressões;
* dados inconsistentes;
* comportamento inesperado de UI;
* permissões incorretas;
* falhas silenciosas;
* mudanças fora do escopo;
* testes insuficientes;
* dependências não consideradas.

---

## 7. Defina critérios objetivos de conclusão

Verifique se existem testes, validações ou critérios objetivos para confirmar que a task foi concluída corretamente.

Inclua, quando aplicável:

* testes automatizados;
* testes manuais;
* comandos de verificação;
* cenários principais;
* cenários de erro;
* validações de UI;
* validações de banco;
* validações de permissão;
* validação de não regressão.

Os critérios devem permitir dizer claramente: “a task está concluída”.

---

## 8. Classifique o nível de prontidão

Classifique a task/plano como uma das opções abaixo:

* Pronto para execução
* Pronto com pequenos ajustes
* Precisa de refinamento
* Bloqueado por dúvidas importantes

Justifique a classificação de forma objetiva.

Explique o principal motivo da classificação.

---

## 9. Gere uma versão refinada

Caso existam melhorias, reescreva a task/plano em formato claro para execução, contendo:

* Objetivo
* Escopo
* Fora de escopo
* Decisões assumidas
* Dúvidas bloqueantes, se existirem
* Checklist de execução
* Regras e restrições relevantes
* Critérios de aceite
* Testes/verificações
* Riscos/atenções
* Observações finais

A versão refinada deve ser simples, direta e pronta para ser usada antes da implementação.

---

## 10. Recomende o próximo passo

Ao final, entregue uma recomendação objetiva:

* executar como está;
* ajustar pequenos pontos antes;
* responder dúvidas bloqueantes;
* dividir em tasks menores;
* revisar o escopo;
* voltar para planejamento.

## Regras importantes

* Não execute a task.
* Não implemente código.
* Não altere arquivos.
* Não use `/grill-with-docs`.
* Não crie nem modifique documentação.
* Não aumente o escopo sem necessidade.
* Priorize clareza, simplicidade e segurança.
* KISS é obrigatório.
* Questione apenas o que realmente pode afetar a execução.
* Quando algo puder ser decidido com bom senso, proponha uma decisão padrão.
* Quando encontrar problema crítico, destaque antes de continuar.
* Ao final, entregue uma recomendação objetiva do próximo passo.
