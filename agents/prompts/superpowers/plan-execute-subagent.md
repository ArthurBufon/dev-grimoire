/subagent-driven-development

Execute o plano.

O plano já foi revisado e aprovado. Não reescreva o plano e não altere o escopo, exceto se encontrar bloqueio real.

Execute uma task por vez, na ordem do plano.
Para cada task:
1. implemente somente o necessário, princípio KISS é chave aqui;
2. rode as verificações/testes indicados;
3. faça revisão de aderência à spec;
4. faça revisão de qualidade de código;
5. corrija findings críticos/importantes antes de avançar.

REGRAS DE DESENVOLVIMENTO
-Seguir melhores práticas atuais (2026)
-Código idiomático, tipado e legível
-KISS é inegociável
-Preferir soluções simples e previsíveis
-Fazer alterações mínimas e localizadas
-Nunca refatorar fora do escopo solicitado
-Nunca criar abstrações, arquivos ou camadas sem necessidade real
-Priorizar reutilização do código existente antes de criar novos componentes

REGRAS GERAIS
-Não alterar padrões arquiteturais sem necessidade
-Não adicionar dependências sem justificativa
-Não criar "helpers genéricos" prematuramente
-Não mover arquivos sem motivo claro
-Evitar efeitos colaterais fora do escopo da tarefa
-Em caso de dúvida, preferir a solução mais simples
-SEMPRE esclarecer todas dúvidas pendentes com o dev antes de fazer algo.
-Ao executar os planos, sempre devem ser consideradas religiosamente: User Rules da IDE + AGENTS.md na raiz

Ao final, apresente resumo do que foi alterado e verificações executadas.
