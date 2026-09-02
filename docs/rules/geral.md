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
* Após alterar código, executar a validação mais específica disponível para a mudança. Se não puder executá-la, informar o motivo e não declarar a tarefa concluída sem registrar essa limitação.

### Proteção de alterações do desenvolvedor

**É proibido desfazer, sobrescrever, apagar, restaurar ou descartar alterações que já existiam no worktree ou que surgirem durante a execução.** Elas devem ser tratadas como alterações do desenvolvedor, mesmo que estejam fora do escopo do plano, staged, unstaged ou untracked.

* Antes de planejar, implementar, delegar ou revisar, registrar um baseline com `git status`, os diffs staged/unstaged e um snapshot do conteúdo de arquivos untracked relevantes.
* Durante a execução, detectar alterações concorrentes antes de iniciar cada tarefa, antes de aplicar correções de subagents e antes da entrega.
* Em arquivo compartilhado, preservar integralmente os trechos concorrentes e integrar apenas a mudança necessária para a tarefa.
* Se preservar uma alteração impedir a implementação, gerar conflito sem resolução inequívoca ou exigir modificar/remover aquele trecho, parar e pedir instrução explícita ao desenvolvedor.
* Nunca usar `git restore`, `git checkout --`, `git reset`, `git clean`, stash, exclusão de arquivo ou reescrita integral para eliminar alterações fora da tarefa.
* Na revisão e na entrega, comparar o estado com o baseline e rejeitar qualquer regressão, remoção ou sobrescrita não autorizada de alteração preexistente ou concorrente.

Essa proteção tem prioridade sobre a regra de manter o escopo mínimo: “fora do escopo” significa **não tocar**, nunca desfazer.

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

O nome do arquivo deve representar apenas o tipo (Service.* ou Queries.*).

Regras de negócio específicas devem ficar localizadas nos services.

Queries básicas sempre devem ficar em Queries (index/show/store/update/destroy)

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

## Retornos

Prioridade máxima: sempre usar o padrão `sucesso` / `dados` / `erros`, independente da stack.

```txt
{ sucesso, dados, erros }
```

* Sucesso: `{ sucesso: true, dados: {...}, erros: [] }`
* Falha: `{ sucesso: false, dados: [], erros: ['...'] }`

Detalhes de sintaxe e uso por stack ficam em `docs/rules/php.md` e `docs/rules/javascript.md`. Não inventar outro formato de retorno quando esse padrão se aplicar.

---

## Organização de Imports

Obrigatório em PHP e JavaScript/React: agrupar imports por categoria lógica, cada grupo com comentário de seção em maiúsculas. Nunca misturar categorias no mesmo bloco.

```txt
// CATEGORIA
import/use ...
```

* Só criar a seção se existir ao menos um import daquela categoria
* Priorizar o diretório de nível mais baixo ao nomear a seção (ex.: `Eloquent\Builder` → `// ELOQUENT`)
* Manter ordem consistente dentro do arquivo; remover imports não utilizados

Lista de seções e ordem por stack: `docs/rules/php.md` e `docs/rules/javascript.md`. Em dúvida, seguir o padrão do arquivo ou módulo alterado.

---

## Contexto e Docs

* Antes de implementar, analisar `docs/` **local do projeto** para verificar se existe `docs/features/<feature>/specs.md` e se contém informações relevantes à alteração
* Localizar o contexto completo da feature antes de alterar código
* Atualizações relevantes devem refletir no `docs/features/<feature>/specs.md`

### Regras

* Docs do projeto servem como contexto de negócio e arquitetura
* O diretório `docs/` do projeto deve conter somente specs de features (`docs/features/`) e contexto de negócio — convenções ficam no **Dev Grimoire** local (clone irmão: `../dev-grimoire/`)
* Specs e planos gerados por frameworks devem ser descartados após implementação
* O `specs.md` deve ser 100% informativo, com o único intuito de explicar a feature e decisões (evitar tom de changelog. 100% informativo)

---

## Planos

* Planos de implementação devem ser salvos em `docs/modelagem/{feature}/plano/{feature}.md`
* Artefatos em `docs/modelagem/{feature}/` (modelagem, plano) são temporários — não documentação permanente do repositório
* Após a feature estar implementada e entregue, excluir `docs/modelagem/{feature}/` por completo

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
