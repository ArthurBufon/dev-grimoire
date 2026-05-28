# 🖥️ SSH no Windows Terminal — Hostgator Hospedagem Compartilhada

> Guia rápido para conectar o Windows Terminal via SSH em hospedagem compartilhada Hostgator usando chave `.ppk` e PuTTY/Plink — sem digitar senha toda vez.

---

## 🎒 O que você precisa antes de começar

| Item | Onde encontrar |
|---|---|
| 👤 **Usuário cPanel** | Topo do painel cPanel (ex: `usuario123`) |
| 🔑 **Senha cPanel** | E-mail de boas-vindas da Hostgator |
| 🌐 **IP do servidor** | cPanel → Informações do servidor |
| 🔌 **Porta SSH** | `2222` (padrão Hostgator) |
| 🗝️ **Chave `.ppk`** | Gerada/exportada pelo PuTTYgen |
| 🐢 **PuTTY instalado** | [putty.org](https://putty.org) — inclui `plink.exe` e `pageant.exe` |

> ⚠️ **Formato da chave:** ela precisa estar no formato `.ppk` (PuTTY). Se você tiver uma chave OpenSSH (`.pem` ou sem extensão), converta pelo **PuTTYgen** → Load → Save private key.

---

## 🚀 Passo a passo

### 1️⃣ Instalar o PuTTY

Baixe e instale em [putty.org](https://putty.org). O instalador já vem com tudo:

- 🔗 `plink.exe` — cliente SSH para linha de comando
- 🛡️ `pageant.exe` — agente de chaves (evita digitar passphrase toda vez)
- 🔧 `puttygen.exe` — gerador/conversor de chaves

Verifique se instalou corretamente no PowerShell:

```powershell
Get-ChildItem "C:\Program Files\PuTTY\plink.exe"
```

✅ Se aparecer o arquivo, está pronto!

---

### 2️⃣ Cachear a chave do servidor *(fazer só uma vez)*

Antes de usar o perfil, você precisa aceitar a chave do servidor manualmente. Rode no PowerShell:

```powershell
& "C:\Program Files\PuTTY\plink.exe" usuario@IP_DO_SERVIDOR -P 2222
```

Vai aparecer algo assim:

```
Store key in cache? (y/n)
```

👉 Digite `y` e pressione Enter. Pronto — nas próximas vezes esse prompt não aparece mais.

---

### 3️⃣ Configurar o Pageant *(opcional, mas recomendado)*

O Pageant é um agente que guarda sua chave na memória — assim o Plink conecta direto, sem pedir passphrase toda vez. 🙌

**Inicie o Pageant com sua chave:**

```powershell
& "C:\Program Files\PuTTY\pageant.exe" "C:\Users\SEU_USUARIO\.ssh\sua_chave.ppk"
```

Digite a passphrase **uma única vez** — ela fica salva em memória até reiniciar o PC.

**💡 Para iniciar automaticamente com o Windows:**

1. Crie um atalho do comando acima
2. Pressione `Win + R` → digite `shell:startup` → Enter
3. Cole o atalho nessa pasta

Pronto! O Pageant vai carregar a chave automaticamente toda vez que ligar o PC. 🎉

---

### 4️⃣ Criar o perfil no Windows Terminal

Abra as configurações do Windows Terminal com `Ctrl + ,` → clique em **Abrir JSON** e adicione o bloco abaixo dentro de `"profiles" > "list"`:

```jsonc
{
    "closeOnExit": "automatic",
    "commandline": "\"C:\\Program Files\\PuTTY\\plink.exe\" -i \"C:\\Users\\SEU_USUARIO\\.ssh\\sua_chave.ppk\" usuario@IP_DO_SERVIDOR -P 2222 -t \"cd /home/usuario/public_html && bash -l\"",
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
| `sua_chave.ppk` | Nome do arquivo da sua chave |
| `usuario` | Seu usuário cPanel |
| `IP_DO_SERVIDOR` | IP do seu servidor |
| `/home/usuario/public_html` | Diretório que deseja abrir ao conectar |

---

### 5️⃣ Conectar! 🎊

Clique no perfil no Windows Terminal.

- 🟢 **Pageant rodando** → conecta direto, sem pedir nada
- 🟡 **Pageant não rodando** → pede a passphrase da chave uma vez

---

## 🆘 Troubleshoot — Problemas comuns

| ❌ Erro | 🔍 Causa | ✅ Solução |
|---|---|---|
| `Too many authentication failures` | SSH tentando várias chaves | Adicione `-o IdentitiesOnly=yes` ao comando |
| `FATAL ERROR: Configured password was not accepted` | `-pw` não funciona com keyboard-interactive | Use a chave `.ppk` com `-i`, não `-pw` |
| `The server's host key is not cached` | Chave do servidor não aceita ainda | Rode o passo 2 e confirme com `y` |
| `plink: command not found` | PuTTY não está no PATH | Use o caminho completo `"C:\\Program Files\\PuTTY\\plink.exe"` |
| Pede passphrase toda vez | Pageant não está rodando | Inicie o Pageant antes de conectar (passo 3) |
| Chave rejeitada / formato errado | Chave no formato OpenSSH, não `.ppk` | Converta com PuTTYgen: Load → Save private key |
