# {NOME_PROJETO}

## Contexto do projeto

- Objetivo: [o que este app faz, em uma frase]
- Stack: [linguagens, frameworks e ferramentas usadas neste app]
- Arquitetura: [pastas ou módulos principais e suas responsabilidades]

## Comandos

- Testes: `[comando real ou N/A]`
- Tipagem: `[comando real ou N/A]`
- Lint: `[comando real ou N/A]`
- Build: `[comando real ou N/A]`

## Limites locais

- [integrações, módulos sensíveis, decisões e restrições deste app que o agente deve respeitar]

## Preferências de Código

- Prefira código simples, legível e idiomático. Use nomes claros, tipos adequados e os padrões já adotados no módulo.
- Mantenha as mudanças no escopo pedido. Reaproveite o código existente e só introduza dependências, abstrações ou camadas quando houver necessidade concreta.
- Guarde os resultados de funções, métodos e construções de objetos em variáveis com nomes claros antes de usá-los como argumentos, valores em arrays ou objetos, ou em estruturas de retorno. Literais e acessos simples a variáveis, propriedades ou índices podem ser usados diretamente. Calcule cada valor no bloco, condição ou callback em que ele é usado para preservar a ordem e o momento da execução.
- Use português nos nomes de funções, métodos e classes, respeitando as convenções do framework e do módulo.
- Quando houver commit, escreva a mensagem em português, no formato `{TAREFA}: descrição objetiva`, com a tarefa em maiúsculas e a descrição com substantivos. Exemplo: `ACESSO: ajuste da validação do código`.
- Antes de criar um arquivo ou mudar a estrutura de um Service, Queries, Controller, Request, Page ou Form, leia o molde do Dev Grimoire e o código mais parecido do mesmo módulo. Só fuja do molde quando o projeto já tiver outro padrão consolidado.
- Nomeie o arquivo pelo tipo e coloque o contexto na pasta (`Pedido/Finalizacao/Service.php`), sempre com substantivos. As Queries principais têm só `index`, `show`, `store`, `update` e `destroy`; outras ações vão para uma subpasta.
- Queries, Services de negócio e endpoints JSON retornam `{ sucesso, dados, erros }`. Chamadas HTTP ficam só em `Queries/**`, com `url` e `options` montados antes do `fetch`.
- Nunca desfaça, sobrescreva ou descarte alterações do desenvolvedor que já estejam no worktree, mesmo fora do escopo. Se atrapalharem a tarefa, pare e pergunte.
- Antes de entregar, execute `validar-convencoes-diff.sh` do Dev Grimoire e a validação mais específica do projeto. Falha bloqueia a entrega.
