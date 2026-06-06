# 🚀 Feature Development Workflow

## 1. 🧠 Brainstorm (Superpowers)

Use o **brainstorm** do Superpowers para:

- Explorar abordagens diferentes para a feature
- Analisar trade-offs entre cada abordagem (complexidade, performance, manutenção, tempo)
- Definir a direção mais adequada antes de qualquer planejamento formal

> 💡 Não pule essa etapa — ela evita retrabalho e garante que o plano seja construído sobre a melhor abordagem.

---

## 2. 📝 Escrita do Plano (Superpowers → `writing-plans`)

Com a abordagem definida, use a skill **`writing-plans`** do Superpowers para gerar um plano estruturado da implementação.

---

## 3. 🔍 Revisão Rigorosa do Plano

Antes de qualquer implementação, revise o plano com atenção:

- [ ] O plano cobre todos os cenários relevantes?
- [ ] Existe algum passo ambíguo ou mal definido?
- [ ] A sequência de tarefas faz sentido?
- [ ] É necessário **explodir em múltiplos planos** (ex: separar backend/frontend, ou dividir por fases)?

Ajuste, refine e, se necessário, quebre em planos menores e mais focados.

---

## 4. ⚙️ Implementação (Superpowers → `executing-plans`)

Escolha a abordagem de execução conforme o contexto:

| Modo | Quando usar |
|---|---|
| 🤖 **Subagents** | Tarefas paralelas e independentes — mais rápido quando não há dependências entre os passos |
| 📋 **Task by task** | Tarefas sequenciais ou que exigem revisão entre os passos — mais controle e previsibilidade |
