# ⚡ Cursor Setup — Arthur

## 🔌 MCPs Configurados

> Arquivo: `/home/arthur/.cursor/mcp.json`

```json
{
  "mcpServers": {
    "context7": {
      "command": "/home/arthur/.nvm/versions/node/v24.15.0/bin/npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "filesystem": {
      "command": "/home/arthur/.nvm/versions/node/v24.15.0/bin/npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/home/arthur/projects"]
    },
    "github": {
      "command": "/home/arthur/.nvm/versions/node/v24.15.0/bin/npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "xxxx"
      }
    }
  }
}
```

### 📦 MCPs Ativos

| MCP | Função |
|---|---|
| 📚 **Context7** | Docs atualizadas das libs em tempo real |
| 📁 **Filesystem** | Agent lê/escreve arquivos do projeto |
| 🐙 **GitHub** | Cria branches, PRs e issues sem sair do Cursor |

### 🔜 MCPs Desejáveis (próximos passos)

| MCP | Função |
|---|---|
| 🎭 **Playwright** | Testes E2E automatizados |
| 🗄️ **MySQL** | Consulta banco direto pelo agent |

> ⚠️ **Regra:** máximo 5 MCPs ativos. Cada um consome tokens de contexto.

---

## 🧩 Plugins Instalados

### ⚡ Superpowers

**O que é:** Metodologia completa de desenvolvimento agentico. Ativa automaticamente skills de brainstorming, planejamento, TDD e debugging antes de qualquer implementação.

**Instalação no Cursor Agent chat:**
```
/add-plugin superpowers
```
> Instalar como **"Add for myself"** (global) — funciona em todos os projetos.

**Como funciona no dia a dia:**

```
Antes:  você pede feature → agent pula direto pro código ❌
Depois: você pede feature → brainstorming → plano → você valida → implementa ✅
```

**Skills automáticas ativadas:**

| Skill | Quando ativa |
|---|---|
| 🧠 **brainstorming** | Ao iniciar qualquer feature nova |
| 📋 **writing-plans** | Após aprovar o design |
| 🧪 **test-driven-development** | Durante implementação |
| 🐛 **systematic-debugging** | Ao encontrar bugs |
| 👀 **requesting-code-review** | Entre tarefas |

> ✅ Nenhum comando manual necessário — tudo é automático.

---

## 📜 User Rules (globais)

**Recomendado:** configurar **User Rules** globais no Cursor. Elas valem em **todos os projetos** e alinham o agente às convenções da equipe (nomenclatura em português, retorno padronizado, arquitetura por stack) sem repetir contexto a cada chat.

**Onde configurar:** **Cursor Settings → Rules, Skills, Subagent → aba User**

**Fonte dos arquivos:** [`.cursor/user-rules/`](../user-rules/) — guia completo em [`README.md`](../user-rules/README.md)

| Arquivo | Quando colar na aba User |
|---|---|
| [`geral.md`](../user-rules/geral.md) | **Sempre** — princípios, Git, segurança |
| [`php.md`](../user-rules/php.md) | Projetos PHP / Laravel |
| [`javascript.md`](../user-rules/javascript.md) | Projetos JS / React |
| [`flutter.md`](../user-rules/flutter.md) | Projetos Flutter / Dart |

**Ordem sugerida:** `geral.md` primeiro; depois só a regra da stack do repo em que você está.

```
Antes:  cada projeto “reinventa” estilo e padrões no prompt ❌
Depois: agent já sabe retorno `{ sucesso, dados, erros }`, estrutura e commits ✅
```

> 💡 **User vs Project:** User Rules são globais; regras em `.cursor/rules/` ou `AGENTS.md` valem só no repositório atual. Use as duas camadas quando o projeto tiver convenções extras.
