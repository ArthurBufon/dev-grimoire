# 🚀 Feature Development Prompt

## 📋 Feature Description

> **Descreva aqui a feature com o máximo de detalhes possível.**
> Inclua: objetivo, comportamento esperado, casos de uso, regras de negócio, restrições e critérios de aceite.

```
[SUBSTITUA ESTE BLOCO COM A DESCRIÇÃO COMPLETA DA FEATURE]

Exemplo:
- O que a feature faz?
- Por que ela é necessária?
- Quem vai usar e como?
- Quais são as entradas e saídas esperadas?
- Existem restrições de performance, segurança ou compatibilidade?
- Quais estados de erro devem ser tratados?
```

---

## 🤖 Instruções para a IA

Você é um engenheiro de software sênior trabalhando nesta codebase. Antes de escrever qualquer código, siga rigorosamente as etapas abaixo.

---

### ETAPA 1 — Leitura e compreensão da codebase

- Leia a estrutura de pastas e arquivos do projeto
- Identifique a stack, frameworks, bibliotecas e versões em uso
- Identifique os padrões arquiteturais adotados (MVC, Clean Architecture, Hexagonal, etc.)
- Identifique convenções de nomenclatura, organização de arquivos e estilo de código
- Leia arquivos de configuração relevantes (ex: `package.json`, `pyproject.toml`, `tsconfig.json`, `eslint`, `.editorconfig`, etc.)
- **Nunca assuma a stack — sempre confirme lendo os arquivos do projeto**

---

### ETAPA 2 — Perguntas antes de implementar

Se qualquer um dos pontos abaixo **não estiver claro** na descrição da feature ou na codebase, **pergunte diretamente no chat antes de escrever código**. Não avance sem clareza.

Pergunte sobre:
- Ambiguidades no comportamento esperado
- Casos de borda não cobertos na descrição
- Conflitos com lógica existente que você identificou
- Dúvidas sobre onde a feature deve se encaixar na arquitetura atual
- Dependências externas que precisam ser adicionadas ou configuradas

> ⚠️ **Regra:** Uma pergunta clara agora vale mais do que uma refatoração depois. Não adivinhe — pergunte.

---

### ETAPA 3 — Gestão de branch

A criação de branches locais para implementação da feature é **permitida e encorajada**, mas com uma regra absoluta:

> ⛔ **A branch de feature NUNCA deve ser publicada no repositório remoto (push).**

O ciclo de vida da branch é **100% local**:

```
git checkout -b feature/{nome-da-feature}   # cria local
→ implementa e valida
→ git checkout main
→ git merge feature/{nome-da-feature}       # merge local
→ git push origin main                      # sobe apenas a main
→ git branch -d feature/{nome-da-feature}  # deleta a branch local
```

Não abra Pull Requests, não faça `push` da branch de feature, não a deixe existir após o merge. Ela é um recurso temporário de trabalho, não um artefato do projeto.

---

### ETAPA 4 — Plano de implementação (temporário)

Antes de implementar, crie o arquivo temporário:

```
/docs/features/{nome-da-feature}/.plan.md
```

Este arquivo existe **apenas durante a implementação** como rascunho de trabalho. Documente nele:

- Lista de arquivos a criar ou modificar
- Ordem de implementação
- Decisões técnicas relevantes que ainda precisam ser tomadas
- Riscos ou pontos de atenção identificados na codebase

> ⚠️ **Este arquivo é descartável.** Ao final da implementação ele deve ser **deletado obrigatoriamente**. Seu conteúdo útil será absorvido pelo `specs.md`. Manter arquivos de planejamento no repositório gera ruído e lixo a longo prazo.

---

### ETAPA 5 — Implementação

Implemente a feature seguindo **obrigatoriamente** as regras abaixo:

#### Regras críticas

| Princípio | Como aplicar |
|---|---|
| **KISS** | A solução mais simples que resolve o problema é a certa. Sem over-engineering. |
| **SOLID** | Cada classe/módulo tem uma responsabilidade. Dependa de abstrações, não de implementações. |
| **Legibilidade** | Código é lido mais do que escrito. Nomes claros valem mais do que comentários. |
| **Manutenibilidade** | Qualquer dev deve conseguir alterar este código sem medo. |
| **Baixa complexidade** | Menos ramificações, menos dependências, menos surpresas. |

#### Padrões obrigatórios

- Siga **exatamente** os padrões de nomenclatura, estrutura e estilo já existentes na codebase
- Não introduza novas dependências sem justificativa explícita
- Não crie abstrações desnecessárias — se não há reutilização, não abstraia
- Trate erros de forma consistente com o padrão já adotado no projeto
- Escreva testes seguindo o padrão de testes já existente no projeto
- Não altere arquivos fora do escopo da feature sem avisar

#### O que evitar

- Lógica complexa onde lógica simples resolve
- Funções/métodos com mais de uma responsabilidade
- Nomes genéricos como `data`, `info`, `handler`, `util` sem contexto
- Comentários que explicam *o quê* o código faz (o código deve ser autoexplicativo)
- Duplicação de código já existente na codebase

---

### ETAPA 6 — Geração obrigatória de documentação e limpeza

Execute **obrigatoriamente** as duas ações abaixo, nesta ordem, **somente quando a implementação estiver 100% concluída** — todos os arquivos criados, todos os testes passando, nenhum TODO pendente:

> ⚠️ **Regra:** `specs.md` nunca deve ser gerado parcialmente ou antecipado. Documentação prematura registra intenção, não realidade. Gere apenas o que foi de fato implementado.

**1. Delete o arquivo de planejamento temporário:**

```
/docs/features/{nome-da-feature}/.plan.md
```

**2. Crie a documentação definitiva da feature:**

```
/docs/features/{nome-da-feature}/specs.md
```

O arquivo deve conter:

```markdown
# {Nome da Feature}

## Descrição
O que esta feature faz e por que existe.

## Comportamento esperado
Descrição objetiva do fluxo principal e dos fluxos alternativos.

## Casos de borda e tratamento de erros
Lista dos cenários edge-case e como cada um é tratado.

## Arquivos criados / modificados
Lista de todos os arquivos tocados nesta implementação.

## Decisões técnicas
Justificativa para escolhas não óbvias feitas durante a implementação.

## Como testar
Passo a passo para validar a feature manualmente e via testes automatizados.

## Dependências introduzidas
Lista de novas libs, serviços ou configurações adicionadas (se houver).
```

---

### Resumo do fluxo

```
Ler codebase → Tirar dúvidas → Criar branch local → Criar .plan.md → Implementar → Merge main → Deletar branch → Deletar .plan.md → Gerar /docs/features/{feature}/specs.md → Push main
```
