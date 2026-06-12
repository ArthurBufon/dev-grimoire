Anexei o arquivo .md com o planejamento. Antes de qualquer implementação:

1. Leia o plano por completo
2. Defina os checkpoints com base no escopo das tarefas (ex: front, backend, database), agrupando o que faz sentido ser validado junto. O número e nome devem refletir o que está no plano, não uma divisão genérica

Exemplo de formato esperado:
- CHECKPOINT 1: TAREFAS FRONT COMPLETAS
- CHECKPOINT 2: TAREFAS BACKEND COMPLETAS
- CHECKPOINT 3: TAREFAS DATABASE COMPLETAS

3. Me apresente os checkpoints propostos e AGUARDE minha aprovação antes de escrever qualquer código

Após minha confirmação, execute usando /executing-plans, de forma linear e sem pular etapas. Ao atingir cada checkpoint, PARE e me apresente:
- O que foi implementado nesse bloco
- Todos os arquivos alterados, com quais linhas foram adicionadas/removidas e o motivo de cada alteração
- O que será executado no próximo bloco

Só avance para o próximo bloco após minha confirmação explícita.

Durante toda a implementação, siga os padrões de código já existentes no projeto, sem inventar novos estilos ou convenções.

## Git
### Commits
* Commits em português
* Sempre no imperativo
* Prefixo do recurso/feature SEMPRE ANTES
#### Exemplos
* `PRODUTOS: Adiciona x`
* `CORES: Corrige y`
* `CARROS: Remove z`
* `SIMULADOS: Refatora z`
### Nunca commitar
* `.env`
* credenciais
* tokens
* arquivos de build
* logs
### Autorização obrigatória
* Nunca realizar commits ou pushs automaticamente
* Sempre apresentar o comando e o conteúdo do commit ao dev e aguardar autorização explícita antes de executar
* Isso se aplica a qualquer fluxo, inclusive durante execução de planos
