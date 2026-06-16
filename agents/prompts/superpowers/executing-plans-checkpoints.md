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

---

## Branch

### Antes de qualquer alteração

* Antes de modificar qualquer arquivo, perguntar ao dev se a implementação deve ser feita:

  * Em uma nova branch local temporária
  * Diretamente na branch atual

* Informar claramente qual é a branch atual

* Se o dev optar por criar uma nova branch:

  * A branch deve ser usada apenas temporariamente durante o desenvolvimento
  * A branch deve ser criada apenas localmente
  * A branch não deve ser enviada para a nuvem/remoto
  * Nunca executar `git push` dessa branch
  * Solicitar ou sugerir um nome de branch coerente com o escopo do plano
  * Apresentar o comando que será executado
  * Aguardar confirmação explícita antes de criar a branch

* Se o dev optar por seguir na branch atual:

  * Confirmar explicitamente que as alterações serão feitas na branch atual
  * Aguardar aprovação antes de iniciar qualquer implementação

* Nunca criar, trocar ou modificar branches automaticamente sem autorização explícita do dev

### Após finalizar o desenvolvimento

* Após a implementação ser validada e integrada à `main`, a branch temporária deve ser descartada completamente
* A branch temporária não deve permanecer como branch de trabalho ativa
* A branch temporária não deve ser mantida no repositório local após o merge
* Antes de remover a branch temporária, apresentar o comando que será executado e aguardar autorização explícita do dev
* Nunca remover branches automaticamente sem autorização explícita do dev

---

### Durante a execução

* Usar `/executing-plans` para execução
* Seguir de forma linear, sem pular etapas
* Ao atingir cada checkpoint, PARAR e apresentar:

  * O que foi implementado nesse bloco
  * Todos os arquivos alterados, com quais linhas foram adicionadas/removidas e o motivo de cada alteração
  * Como isso está relacionado ao contexto geral do plano, e por que é necessário
  * O que será executado no próximo bloco
* Só avançar para o próximo bloco após confirmação explícita do dev

---

### Padrões

* Seguir os padrões de código já existentes no projeto
* Nunca inventar novos estilos ou convenções
* Sempre utilizar a maneira mais simples e segura, independente da tarefa

---

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

---

### Nunca commitar

* `.env`
* credenciais
* tokens
* arquivos de build
* logs

---

### Autorização obrigatória

* Nunca realizar commits ou pushs automaticamente
* Sempre apresentar o comando e o conteúdo do commit ao dev e aguardar autorização explícita antes de executar
* Isso se aplica a qualquer fluxo, inclusive durante execução de planos
