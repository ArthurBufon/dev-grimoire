## Execução de Planos

### Antes de qualquer implementação
1. Ler o plano por completo
2. Definir os checkpoints com base no escopo das tarefas, agrupando o que faz sentido ser validado junto
   * O número e nome dos checkpoints devem refletir o que está no plano, não uma divisão genérica
   * Exemplo de formato esperado:
     * `CHECKPOINT 1: TAREFAS FRONT COMPLETAS`
     * `CHECKPOINT 2: TAREFAS BACKEND COMPLETAS`
     * `CHECKPOINT 3: TAREFAS DATABASE COMPLETAS`
3. Apresentar os checkpoints propostos e aguardar aprovação antes de escrever qualquer código

### Durante a execução
* Usar `/executing-plans` para execução
* Seguir de forma linear, sem pular etapas
* Ao atingir cada checkpoint, PARAR e apresentar:
  * O que foi implementado nesse bloco
  * Todos os arquivos alterados, com quais linhas foram adicionadas/removidas e o motivo de cada alteração
  * O que será executado no próximo bloco
* Só avançar para o próximo bloco após confirmação explícita do dev

### Padrões
* Seguir os padrões de código já existentes no projeto
* Nunca inventar novos estilos ou convenções

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
