---
name: quick-fix
description: >-
  Executa ajustes rápidos solicitados diretamente no chat, sem criar plano,
  sem subagents e sem expandir escopo. Use quando o usuário pedir um fix simples,
  alteração pontual, correção pequena ou ajuste direto no código.
  disable-model-invocation: true
---

# Quick Fix

Executa ajustes rápidos e pontuais solicitados pelo dev diretamente no chat.

Esta skill **não cria plano**, **não usa subagents**, **não reestrutura código** e **não altera arquivos fora do escopo**. O objetivo é aplicar exatamente o ajuste pedido, com o menor impacto possível.

## Quando usar

Use esta skill quando o usuário pedir algo como:

* “corrija isso”
* “ajuste esse comportamento”
* “mude esse texto”
* “adicione essa validação simples”
* “arrume esse bug rápido”
* “faça esse quick fix”
* “altere somente esse ponto”
* “troque X por Y”
* “remova esse campo”
* “adicione esse botão”
* “corrija esse erro simples”

## Quando não usar

Não usar esta skill quando:

* O ajuste exige arquitetura nova
* O pedido envolve múltiplas features
* O escopo está ambíguo demais
* A alteração exige planejamento
* A alteração exige refatoração ampla
* O usuário pediu explicitamente um plano
* O usuário pediu execução com subagents
* O impacto provável passa de um ajuste pontual

Nesses casos, sugerir `plan-write` ou outra skill apropriada.

## Regras obrigatórias

* Fazer exatamente o que foi pedido
* Não gerar plano
* Não chamar subagents
* Não expandir o escopo
* Não refatorar fora do necessário
* Não alterar arquivos não relacionados ao ajuste
* Não mudar arquitetura
* Não criar abstrações sem necessidade real
* Não adicionar dependências sem autorização explícita
* Não alterar comportamento não solicitado
* Não “melhorar” partes do código que não fazem parte do pedido
* Preferir a menor alteração segura possível
* Manter o padrão existente do projeto
* Seguir User Rules da IDE quando disponíveis
* Seguir `AGENTS.md`, `.cursor/rules/`, `CLAUDE.md` ou equivalente quando disponível
* Sempre que disponível, carregar e seguir as regras em `/docs/regras`

## Precedência de regras

Quando houver conflito, seguir esta ordem:

1. Instrução explícita do dev no chat
2. Regras em `/docs/regras`
3. User Rules da IDE
4. `AGENTS.md`, `.cursor/rules/`, `CLAUDE.md` ou equivalente
5. Padrões existentes no código
6. Defaults desta skill

## Fluxo de execução

1. Entender o ajuste solicitado no chat
2. Identificar os arquivos mínimos necessários
3. Ler as regras aplicáveis:

   * `/docs/regras`, se existir
   * User Rules da IDE, se disponíveis
   * `AGENTS.md`, `.cursor/rules/`, `CLAUDE.md` ou equivalente, se existir
4. Implementar somente o ajuste solicitado
5. Rodar verificações relevantes e proporcionais ao ajuste
6. Revisar se a alteração ficou restrita ao escopo
7. Informar o que foi alterado e quais verificações foram feitas

## Verificações

Executar somente verificações proporcionais ao ajuste.

Exemplos:

* Teste específico relacionado ao bug
* Lint do arquivo alterado
* Typecheck, se for rápido e padrão no projeto
* Teste manual simples, quando aplicável

Não rodar suítes pesadas sem necessidade, a menos que o projeto ou o dev exija.

## Dúvidas

Se houver dúvida não bloqueante, escolher a opção mais simples e aderente ao padrão existente.

Se houver dúvida bloqueante que possa causar alteração errada ou fora do escopo, parar e perguntar ao dev.

## Resumo final obrigatório

Ao finalizar, responder de forma curta:

```markdown
## Quick fix concluído

### Alterações
- [arquivo/módulo]&#58; [descrição objetiva do ajuste]

### Verificações
- [comando/verificação executada]
- [resultado]

### Observações
- [se houver; senão: "Nenhuma"]
```

## Anti-patterns

* Criar plano para ajuste simples
* Usar subagents
* Refatorar código não relacionado
* Alterar arquivos fora do escopo
* Melhorar código “aproveitando”
* Criar helpers genéricos
* Adicionar dependências sem autorização
* Mudar arquitetura
* Fazer alterações grandes para resolver problema pequeno
* Ignorar `/docs/regras` quando disponível

## Trigger phrases

* `/quick-fix`
* `quick fix`
* `ajuste rápido`
* `corrige isso`
* `arruma isso`
* `faz só esse ajuste`
* `altera somente isso`
* `sem plano`
* `não precisa planejar`
* `faz direto`
