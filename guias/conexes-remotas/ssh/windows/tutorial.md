# 🖥️ SSH Nativo no Windows Terminal — Conectar a Qualquer Servidor Linux

> Guia rápido para conectar o Windows Terminal via SSH nativo do Windows a qualquer servidor Linux — sem PuTTY, sem Plink, sem digitar senha toda vez.

---

## 🎒 O que você precisa antes de começar

| Item | Onde encontrar |
|---|---|
| 👤 **Usuário do servidor** | Fornecido pelo provedor (ex: `ubuntu`, `root`, `usuario`) |
| 🌐 **IP ou hostname** | Painel do provedor ou e-mail de boas-vindas |
| 🔌 **Porta SSH** | Padrão é `22` — alguns provedores usam outra (ex: `2222`) |
| 🗝️ **Chave privada OpenSSH** | Arquivo sem extensão, `.pem` ou `.key` |
| 💻 **Windows 10/11** | SSH nativo já vem instalado |

> ⚠️ **Formato da chave:** use a chave no formato OpenSSH (arquivo sem extensão, `.pem` ou `.key`). Se você só tiver `.ppk`, converta pelo **PuTTYgen** → Load → Conversions → **Export OpenSSH key**.

---

## 🚀 Passo a passo

### 1️⃣ Verificar se o SSH nativo está disponível

No PowerShell, confirme que o SSH está instalado:

```powershell
ssh -V
```

✅ Se retornar uma versão (ex: `OpenSSH_9.x`), está pronto. Se não, instale em **Configurações → Apps → Recursos opcionais → OpenSSH Client**.

---

### 2️⃣ Ativar o ssh-agent *(fazer só uma vez, como Administrador)*

Abra o PowerShell como **Administrador** (`Win + X → Terminal (Administrador)`) e rode:

```powershell
Set-Service ssh-agent -StartupType Automatic
Start-Service ssh-agent
```

✅ O agente agora inicia automaticamente com o Windows. Não precisa repetir isso.

---

### 3️⃣ Carregar sua chave no ssh-agent

De volta ao terminal **normal** (não Admin), rode:

```powershell
ssh-add "C:/Users/SEU_USUARIO/.ssh/sua_chave"
```

Digite a passphrase **uma única vez** — ela fica salva em memória até você reiniciar o PC. 🙌

Verifique se a chave foi adicionada com sucesso:

```powershell
ssh-add -l
```

✅ Deve aparecer o fingerprint da sua chave.

> ⚠️ **Se reiniciar o PC:** o agente perde as chaves da memória. Basta rodar o `ssh-add` novamente antes de conectar — só pede a passphrase, nada mais.

---

### 🔄 Fluxo completo resumido

```
1. ssh-add → carrega a chave na memória (uma vez por sessão)
2. ssh     → conecta direto, sem pedir nada
```

Toda vez que ligar o PC, rode o `ssh-add` uma vez antes de conectar. Depois disso, todas as conexões do dia funcionam sem pedir senha.

---

### 4️⃣ Testar a conexão no terminal

Antes de criar o perfil, teste a conexão manualmente:

```powershell
ssh -i "C:/Users/SEU_USUARIO/.ssh/sua_chave" usuario@IP_DO_SERVIDOR -p PORTA -t "cd /caminho/desejado && bash -l"
```

✅ Se entrar direto sem pedir nada, está tudo funcionando!

---

### 5️⃣ Criar o perfil no Windows Terminal

Abra as configurações do Windows Terminal com `Ctrl + ,` → clique em **Abrir JSON** e adicione o bloco abaixo dentro de `"profiles" > "list"`:

```jsonc
{
    "closeOnExit": "automatic",
    "commandline": "ssh -i \"C:/Users/SEU_USUARIO/.ssh/sua_chave\" usuario@IP_DO_SERVIDOR -p PORTA -t \"cd /caminho/desejado && bash -l\"",
    "hidden": false,
    "historySize": 9001,
    "icon": "✨",
    "name": "SSH - MEU SERVIDOR",
    "startingDirectory": "%USERPROFILE%",
    "suppressApplicationTitle": true,
    "tabTitle": "SSH - MEU SERVIDOR"
}
```

**✏️ Substitua os valores:**

| Placeholder | Valor real |
|---|---|
| `SEU_USUARIO` | Seu usuário do Windows |
| `sua_chave` | Nome do arquivo da sua chave OpenSSH |
| `usuario` | Usuário do servidor Linux (ex: `ubuntu`, `root`) |
| `IP_DO_SERVIDOR` | IP ou hostname do servidor |
| `PORTA` | Porta SSH do servidor (padrão: `22`) |
| `/caminho/desejado` | Diretório que deseja abrir ao conectar |

---

### 6️⃣ Conectar! 🎊

Clique no perfil no Windows Terminal.

- 🟢 **ssh-agent com chave carregada** → conecta direto, sem pedir nada
- 🟡 **Após reiniciar o PC** → rode `ssh-add` uma vez, depois conecta direto

**Ctrl+C, Ctrl+Z e todos os atalhos funcionam normalmente.** ✅

---

## 📋 Referência rápida — Comandos essenciais

| Comando | O que faz |
|---|---|
| `ssh-add "C:/caminho/sua_chave"` | Carrega a chave na memória — roda uma vez por sessão |
| `ssh-add -l` | Lista as chaves atualmente carregadas no agente |
| `Get-Service ssh-agent` | Verifica se o agente está rodando (`Running` = ok) |
| `ssh -i "chave" usuario@ip -p PORTA` | Conecta ao servidor usando a chave especificada |

---

## 🆘 Troubleshoot — Problemas comuns

| ❌ Erro | 🔍 Causa | ✅ Solução |
|---|---|---|
| `No such file or directory` | Caminho da chave errado | Verifique com `Get-ChildItem "C:\Users\SEU_USUARIO\.ssh\"` |
| `Too many authentication failures` | SSH tentando várias chaves | Adicione `-o IdentitiesOnly=yes` ao comando |
| Pede senha do servidor após passphrase | Chave pública não está autorizada no servidor | Adicione o conteúdo de `sua_chave.pub` ao `~/.ssh/authorized_keys` no servidor |
| `Too many logins` — conexão fechada | Muitas tentativas seguidas | Aguarde alguns minutos e tente novamente |
| Pede passphrase toda vez | ssh-agent não está rodando ou chave não carregada | Rode `Get-Service ssh-agent` e depois `ssh-add` |
| `Bad passphrase` no ssh-add | Passphrase incorreta | Tente novamente com a senha correta da chave |
| Chave não aceita (formato errado) | Chave no formato `.ppk`, não OpenSSH | Converta com PuTTYgen: Load → Conversions → Export OpenSSH key |
| `Connection refused` | Porta errada ou SSH não habilitado | Confirme a porta com o provedor e tente `22` ou `2222` |
| `Permission denied (publickey)` | Chave não autorizada no servidor | Verifique o `~/.ssh/authorized_keys` no servidor |
