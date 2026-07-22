# Geral

## Regras por stack

Antes de implementar, identifique a stack do projeto e leia a rule correspondente:

| Stack | Arquivo |
|---|---|
| PHP / Laravel | `docs/rules/php.md` |
| JavaScript / React | `docs/rules/javascript.md` |

Leia a rule de cada stack em uso no projeto. Em projetos full stack (ex.: Laravel + React), leia as duas. Detalhes de estrutura, imports, HTTP, formatação e convenções de código ficam nas rules específicas.

---

## Escopo mínimo

**Obrigatório em todo trabalho** — planejamento, revisão, implementação e entrega.

* Alterar somente o que foi pedido
* Solução mais simples primeiro; em dúvida, perguntar ao dev
* Não modificar código não solicitado
* Não adicionar abstrações, arquivos ou camadas sem necessidade concreta
* Não importar dependências desnecessárias
* Não reescrever arquivos inteiros para mudanças pequenas
* Não adicionar tratamento de erro para cenários impossíveis ou extremamente improváveis
* Não refatorar fora do escopo solicitado
* Não mover arquivos sem motivo claro
* Não criar helpers genéricos prematuramente
* Evitar efeitos colaterais fora do escopo da tarefa

### Antes de entregar

* Confirmar que só alterou o código solicitado
* Verificar se existe abordagem mais simples
* Confirmar que nenhum arquivo não solicitado foi tocado

---

## Princípios de Desenvolvimento

* Código idiomático, tipado e legível
* KISS é inegociável
* Preferir soluções simples e previsíveis
* Priorizar reutilização do código existente antes de criar novos componentes
* As melhores práticas gerais só devem ser aplicadas quando não conflitarem
com regras específicas do projeto nem com padrões consolidados no módulo alterado.
Não modernizar, refatorar ou substituir padrões existentes fora do escopo solicitado.

---

## Dúvidas

* Se surgirem dúvidas, perguntar até todas ficarem esclarecidas antes de planejar, implementar ou revisar
* Nunca assumir requisitos implícitos quando houver ambiguidade
* Validar expectativas e critérios de aceite antes de seguir com mudanças que dependam de interpretação

---

## Nomenclatura

* Funções, métodos e classes em português, salvo instrução contrária
* Ao criar novos arquivos, seguir o padrão já existente no projeto

### Regras de diretório e namespace

* Diretórios e namespaces devem usar substantivo nominizável — nunca verbos no infinitivo ou imperativo

#### Exemplos

* ❌ `/Services/Carro/Andar`
* ❌ `/Services/Carro/Listar`
* ✅ `/Services/Carro/Movimentacao`
* ✅ `/Services/Carro/Listagem`

---

## Services e Queries

O padrão deve ser adotado globalmente, independente da linguagem. Para detalhes de implementação, consulte a rule da stack em uso (`docs/rules/php.md` ou `docs/rules/javascript.md`).

O nome do arquivo deve representar apenas o tipo.

Usar subpasta de contexto (ex.: `Finalizacao/Service.php`) é decisão do desenvolvedor. Em dúvida, perguntar ao dev — independente da stack.

### Exemplos

* ❌ `FinalizacaoService.php`
* ✅ `Finalizacao/Service.php`
* ❌ `CancelamentoQueries.tsx`
* ✅ `Cancelamento/Queries.tsx`

O contexto deve estar no namespace/diretório.

### Exemplos

* ✅ `App/Services/Pedido/Finalizacao/Service.php`
* ✅ `resources/js/Queries/Pedido/Cancelamento/Queries.tsx`

---

## Contexto e Docs

* Antes de implementar, analisar `docs/` **local do projeto** para verificar se existe `docs/features/<feature>/specs.md` e se contém informações relevantes à alteração
* Localizar o contexto completo da feature antes de alterar código
* Atualizações relevantes devem refletir no `docs/features/<feature>/specs.md`

### Regras

* Docs do projeto servem como contexto de negócio e arquitetura
* O diretório `docs/` do projeto deve conter somente specs de features (`docs/features/`) e contexto de negócio — convenções ficam no **Dev Grimoire** local (clone irmão: `../dev-grimoire/`)
* Specs e planos gerados por frameworks devem ser descartados após implementação
* O `specs.md` deve ser 100% informativo, com o único intuito de explicar a feature e decisões

---

## Planos

* Planos/designs gerados devem obrigatóriamente ser salvos em `docs/plans/{feature}.md`
* Planos nunca devem ser commitados ou mantidos no repositório (geralmente o `.gitignore` já trata isso em cada projeto)

---

## Git

### Commits

* Commits em português
* Sempre no imperativo
* Todos os commits devem seguir o seguinte padrão:
```
{TAREFA}: descrição objetiva e breve
```

`{TAREFA}` é a feature ou entidade em maiúsculas (ex.: `PRODUTOS`, `CARROS`). Não usar prefixo `CHORE:`.

### Exemplos de commit

Correto:

```
PRODUTOS: ajuste de regra de estoque
CARROS: adicionar filtro por placa
```

Incorreto:

```
CHORE: atualizar dependências
ajustar validação do formulário de produtos
analisar código fonte de variações
```

### Nunca commitar

* `.env`
* credenciais
* tokens
* arquivos de build
* logs

---

## Segurança

* Nunca expor credenciais no código
* Variáveis sensíveis sempre em `.env`
* Nunca logar:

  * senhas
  * tokens
  * documentos pessoais
  * dados sensíveis

---

## Regras Gerais

* SEMPRE esclarecer todas dúvidas pendentes com o dev antes de fazer algo.
* No prompt temos .env para variáveis sensíveis, mas cada projeto/stack pode ter um arquivo diferente, isso deve ser levado em consideração.
