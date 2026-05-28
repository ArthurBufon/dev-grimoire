# 🖥️ SSH Nativo no Windows Terminal — Hostgator Hospedagem Compartilhada

> Guia rápido para conectar o Windows Terminal via SSH nativo do Windows em hospedagem compartilhada Hostgator — sem PuTTY, sem Plink, sem digitar senha toda vez.

---

## 🎒 O que você precisa antes de começar

| Item | Onde encontrar |
|---|---|
| 👤 **Usuário cPanel** | Topo do painel cPanel (ex: `usuario123`) |
| 🌐 **IP do servidor** | cPanel → Informações do servidor |
| 🔌 **Porta SSH** | `2222` (padrão Hostgator) |
| 🗝️ **Chave privada OpenSSH** | Arquivo sem extensão ou `.pem` (ex: `hostgator_aguia`) |
| 💻 **Windows 10/11** | SSH nativo já vem instalado |

> ⚠️ **Formato da chave:** use a chave no formato OpenSSH (arquivo sem extensão, `.pem` ou similar). Se você só tiver `.ppk`, converta pelo **PuTTYgen** → Load → Conversions → **Export OpenSSH key**.

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

✅ O agente agora inicia automaticamente com o Windows.

---

### 3️⃣ Adicionar sua chave ao ssh-agent

De volta ao terminal **normal** (não Admin), rode:

```powershell
ssh-add "C:/Users/SEU_USUARIO/.ssh/sua_chave"
```

Digite a passphrase **uma única vez** — ela fica salva em memória. Nas próximas conexões, o agente fornece a chave automaticamente. 🙌

Verifique se a chave foi adicionada:

```powershell
ssh-add -l
```

✅ Deve aparecer o fingerprint da sua chave.

---

### 4️⃣ Testar a conexão no terminal

Antes de criar o perfil, teste a conexão manualmente:

```powershell
ssh -i "C:/Users/SEU_USUARIO/.ssh/sua_chave" usuario@IP_DO_SERVIDOR -p 2222 -t "cd /home/usuario/public_html && bash -l"
```

✅ Se entrar direto pedindo só a passphrase (ou sem pedir nada com o agente ativo), está funcionando!

---

### 5️⃣ Criar o perfil no Windows Terminal

Abra as configurações do Windows Terminal com `Ctrl + ,` → clique em **Abrir JSON** e adicione o bloco abaixo dentro de `"profiles" > "list"`:

```jsonc
{
    "closeOnExit": "automatic",
    "commandline": "ssh -i \"C:/Users/SEU_USUARIO/.ssh/sua_chave\" usuario@IP_DO_SERVIDOR -p 2222 -t \"cd /home/usuario/public_html && bash -l\"",
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
| `usuario` | Seu usuário cPanel |
| `IP_DO_SERVIDOR` | IP do seu servidor |
| `/home/usuario/public_html` | Diretório que deseja abrir ao conectar |

---

### 6️⃣ Conectar! 🎊

Clique no perfil no Windows Terminal.

- 🟢 **ssh-agent rodando com a chave** → conecta direto, sem pedir nada
- 🟡 **ssh-agent sem a chave** → pede a passphrase uma vez

**Ctrl+C, Ctrl+Z e todos os atalhos funcionam normalmente.** ✅

---

## 🆘 Troubleshoot — Problemas comuns

| ❌ Erro | 🔍 Causa | ✅ Solução |
|---|---|---|
| `No such file or directory` | Caminho da chave errado | Verifique com `Get-ChildItem "C:\Users\SEU_USUARIO\.ssh\"` |
| `Too many authentication failures` | SSH tentando várias chaves | Adicione `-o IdentitiesOnly=yes` ao comando |
| Pede senha do cPanel após passphrase | Chave pública não está no servidor | Adicione a chave pública no cPanel → SSH Access → Manage SSH Keys |
| `Too many logins` — conexão fechada | Muitas tentativas seguidas | Aguarde 2-3 minutos e tente novamente |
| Pede passphrase toda vez | ssh-agent não está rodando | Verifique com `Get-Service ssh-agent` — deve estar `Running` |
| `Bad passphrase` no ssh-add | Passphrase incorreta | Tente novamente com a senha correta da chave RSA |
| Chave não aceita (formato errado) | Chave no formato `.ppk`, não OpenSSH | Converta com PuTTYgen: Load → Conversions → Export OpenSSH key |
| Ctrl+C fecha a conexão | Problema do Plink, não do SSH nativo | ✅ Com SSH nativo isso não acontece |
| Texto quebrando linha | Problema do Plink, não do SSH nativo | ✅ Com SSH nativo isso não acontece |
