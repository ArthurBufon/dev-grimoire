# Guia de Backup Automatizado: MySQL + Backblaze B2 + rclone + crontab

> **Stack:** Ubuntu VPS · MySQL · Laravel (ou qualquer app PHP) · Backblaze B2 · rclone · cron  
> **Custo:** R$ 0,00 — 100% gratuito e open source, sem trial que expira  
> **Tempo de instalação:** ~15 minutos

---

## Índice

1. [Visão Geral da Solução](#1-visão-geral-da-solução)
2. [Por Que Cada Ferramenta Foi Escolhida](#2-por-que-cada-ferramenta-foi-escolhida)
3. [Pré-requisitos](#3-pré-requisitos)
4. [Configuração do Backblaze B2](#4-configuração-do-backblaze-b2)
5. [Instalação e Configuração do rclone](#5-instalação-e-configuração-do-rclone)
6. [O Script de Backup](#6-o-script-de-backup)
7. [Implantação no Servidor](#7-implantação-no-servidor)
8. [Agendamento com crontab](#8-agendamento-com-crontab)
9. [Testando Manualmente](#9-testando-manualmente)
10. [Troubleshooting: Problemas Encontrados em Produção](#10-troubleshooting-problemas-encontrados-em-produção)
11. [Segurança Adicional](#11-segurança-adicional)
12. [Checklist de Implantação](#12-checklist-de-implantação)

---

## 1. Visão Geral da Solução

O fluxo de backup funciona da seguinte forma, executado automaticamente toda madrugada:

```
cron (03:00)
    └── backup-[projeto].sh
          ├── 1. mysqldump → /tmp/backup-[projeto]-YYYY-MM-DD_HH-MM.sql
          ├── 2. tar -czf  → /var/backups/mysql/[projeto]/backup-[projeto]-YYYY-MM-DD_HH-MM.tar.gz
          ├── 3. Retenção local: mantém os 3 mais recentes, deleta os demais
          ├── 4. rclone copy → Backblaze B2 (bucket da empresa)
          └── 5. Retenção na nuvem: mantém os 3 mais recentes, deleta os demais
```

Cada execução gera um log em `/var/log/backup-mysql/[projeto]/index.log` para auditoria e diagnóstico.

---

## 2. Por Que Cada Ferramenta Foi Escolhida

### mysqldump
- Nativo do MySQL, sem instalação adicional
- A flag `--single-transaction` garante consistência do backup em tabelas InnoDB **sem travar** as tabelas durante o dump — essencial em produção
- As flags `--routines --triggers --events` capturam todo o schema, não apenas os dados

### Compressão tar.gz
- Reduz o arquivo de dump em ~70-80% (um dump de 17 MB vira ~4 MB)
- Nativo no Linux, sem dependências externas
- O timestamp no nome (`YYYY-MM-DD_HH-MM`) permite ordenação cronológica simples por nome de arquivo

### Backblaze B2
- **10 GB gratuitos permanentes** — não é trial, não expira, não precisa de cartão
- Downloads gratuitos via parceria com a Cloudflare (sem custo de egress)
- API compatível com S3, amplamente suportada por ferramentas como rclone
- Interface web simples para verificação manual dos backups
- Alternativas avaliadas e descartadas:
  - *Google Drive*: limite de 15 GB mas requer OAuth complexo
  - *Cloudflare R2*: 10 GB gratuitos mas exige cartão de crédito no cadastro
  - *AWS S3 Free Tier*: expira após 12 meses

### rclone
- Ferramenta open source madura (suporta 70+ providers de nuvem)
- Instalação em um comando, configuração interativa simples
- Suporte nativo ao Backblaze B2
- Gerencia upload, listagem e deleção remota com uma única CLI
- Alternativa ao `b2 CLI` oficial: o rclone é mais genérico e permite trocar de provider no futuro sem reescrever o script

### crontab do sistema (root)
- Nativo do Linux, zero dependências
- Roda como root, garantindo acesso irrestrito ao MySQL e aos diretórios de backup
- Solução mais simples e confiável para tarefas agendadas em VPS

---

## 3. Pré-requisitos

- Ubuntu 20.04 ou superior
- MySQL instalado e rodando
- Acesso SSH com sudo ao servidor
- Conta gratuita no [backblaze.com](https://www.backblaze.com)

Verifique se o mysqldump está disponível:

```bash
which mysqldump
mysqldump --version
```

---

## 4. Configuração do Backblaze B2

### 4.1 Criar conta

Acesse [backblaze.com](https://www.backblaze.com) e crie uma conta gratuita. Não é necessário cartão de crédito para o plano gratuito de 10 GB.

### 4.2 Criar o bucket

1. Acesse **Buckets → Create a Bucket**
2. Defina o nome: `[empresa]-[projeto]` (ex: `minhaempresa-meuprojeto`)
   - O nome deve ser **globalmente único** no Backblaze
3. Privacidade: **Private**
4. Clique em **Create a Bucket**

### 4.3 Criar a Application Key

1. Acesse **App Keys → Add a New Application Key**
2. Preencha:
   - **Name of Key:** `backup-[projeto]`
   - **Allow access to Bucket:** selecione o bucket criado
   - **Type of Access:** `Read and Write`
3. Clique em **Create New Key**
4. **Copie imediatamente** o `keyID` e o `applicationKey` — eles não serão exibidos novamente

> ⚠️ Guarde as credenciais em um gerenciador de senhas. O `applicationKey` some após fechar a página.

---

## 5. Instalação e Configuração do rclone

### 5.1 Instalar o rclone

```bash
curl https://rclone.org/install.sh | sudo bash
```

Verifique a instalação:

```bash
rclone --version
which rclone  # deve retornar /usr/bin/rclone
```

### 5.2 Configurar o remote do Backblaze B2

```bash
rclone config
```

Siga o assistente interativo com os valores abaixo:

```
n                              → New remote
[empresa]-[projeto]            → Nome do remote (anote: será usado no script)
b2                             → Tipo de storage: Backblaze B2
[cole o keyID aqui]
[cole o applicationKey aqui]
true                           → hard_delete (apaga de verdade, não oculta)
n                              → Edit advanced config? Não
y                              → Confirm? Sim
q                              → Quit
```

### 5.3 Verificar a configuração

```bash
rclone lsd [empresa]-[projeto]:
```

Deve listar o bucket criado. Se aparecer erro de "didn't find section in config", o remote não foi salvo — repita o `rclone config`.

### 5.4 Problema crítico: sudo e PATH do rclone

O crontab roda como `root`, mas o rclone é configurado para o usuário atual. É necessário copiar a configuração para o root:

```bash
# Criar o diretório de config do root se não existir
sudo mkdir -p /root/.config/rclone

# Copiar a config do usuário atual para o root
sudo cp ~/.config/rclone/rclone.conf /root/.config/rclone/rclone.conf
```

Verifique se o root enxerga o remote:

```bash
sudo rclone lsd [empresa]-[projeto]:
# Deve listar o bucket sem erros
```

> ⚠️ Este passo é frequentemente esquecido e causa falha silenciosa no cron. O `rclone config show` do root retornará "empty config" se este passo for pulado.

---

## 6. O Script de Backup

Abaixo está o script completo. Substitua os placeholders no bloco de configuração.

```bash
#!/bin/bash
# =============================================================================
# backup-[projeto].sh — Backup automatizado MySQL
# Stack: Ubuntu + MySQL + Backblaze B2 via rclone
# =============================================================================

# ------------------------------------------------------------
# CONFIGURAÇÕES — edite apenas este bloco
# ------------------------------------------------------------
DB_NAME="nome-do-banco"
DB_USER="usuario-mysql"
DB_PASS="senha-mysql"
DB_HOST="127.0.0.1"

BACKUP_DIR="/var/backups/mysql/[projeto]"
MAX_LOCAL=3

RCLONE_REMOTE="[empresa]-[projeto]"        # nome do remote configurado no rclone
RCLONE_BUCKET="[empresa]-[projeto]"        # nome do bucket no Backblaze B2
MAX_CLOUD=3

LOG_FILE="/var/log/backup-mysql/[projeto]/index.log"
# ------------------------------------------------------------

DATE=$(date +"%Y-%m-%d_%H-%M")
FILENAME="backup-[projeto]-${DATE}"
DUMP_FILE="/tmp/${FILENAME}.sql"
ARCHIVE_FILE="${BACKUP_DIR}/${FILENAME}.tar.gz"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# ------------------------------------------------------------
# 1. Criar diretórios necessários
# ------------------------------------------------------------
mkdir -p "$BACKUP_DIR"
mkdir -p "$(dirname "$LOG_FILE")"

log "=== Iniciando backup do banco '$DB_NAME' ==="

# ------------------------------------------------------------
# 2. Dump do MySQL
# --single-transaction: consistência sem travar tabelas InnoDB
# --routines --triggers --events: captura schema completo
# ------------------------------------------------------------
log "Executando mysqldump..."
mysqldump \
    --host="$DB_HOST" \
    --user="$DB_USER" \
    --password="$DB_PASS" \
    --single-transaction \
    --routines \
    --triggers \
    --events \
    "$DB_NAME" > "$DUMP_FILE"

if [ $? -ne 0 ]; then
    log "ERRO: mysqldump falhou. Abortando."
    rm -f "$DUMP_FILE"
    exit 1
fi

log "Dump gerado: $DUMP_FILE ($(du -sh "$DUMP_FILE" | cut -f1))"

# ------------------------------------------------------------
# 3. Compactar em .tar.gz
# ------------------------------------------------------------
log "Compactando arquivo..."
tar -czf "$ARCHIVE_FILE" -C /tmp "${FILENAME}.sql"

if [ $? -ne 0 ]; then
    log "ERRO: Falha na compactação. Abortando."
    rm -f "$DUMP_FILE"
    exit 1
fi

rm -f "$DUMP_FILE"
log "Backup criado: $ARCHIVE_FILE ($(du -sh "$ARCHIVE_FILE" | cut -f1))"

# ------------------------------------------------------------
# 4. Retenção local — manter apenas os últimos MAX_LOCAL backups
# ls -t ordena por data (mais recente primeiro)
# tail -n +N pula os N primeiros (os mais novos)
# xargs rm deleta o restante
# ------------------------------------------------------------
log "Aplicando retenção local (máx: $MAX_LOCAL arquivos)..."
ls -t "$BACKUP_DIR"/backup-[projeto]-*.tar.gz 2>/dev/null \
    | tail -n +$((MAX_LOCAL + 1)) \
    | xargs -r rm -f

REMAINING=$(ls "$BACKUP_DIR"/backup-[projeto]-*.tar.gz 2>/dev/null | wc -l)
log "Backups locais após limpeza: $REMAINING"

# ------------------------------------------------------------
# 5. Envio para Backblaze B2 via rclone
# Envia o diretório inteiro (não o arquivo individual)
# para que o rclone possa fazer sync e comparação correta
# ------------------------------------------------------------
if ! command -v rclone &> /dev/null; then
    log "AVISO: rclone não instalado. Pulando envio para nuvem."
    log "Execute: curl https://rclone.org/install.sh | sudo bash"
else
    log "Enviando para Backblaze B2 (${RCLONE_REMOTE}:${RCLONE_BUCKET})..."
    rclone copy "$BACKUP_DIR/" "${RCLONE_REMOTE}:${RCLONE_BUCKET}/" >> "$LOG_FILE" 2>&1

    if [ $? -ne 0 ]; then
        log "ERRO: Falha no envio para a nuvem."
    else
        log "Upload concluído com sucesso."

        # Retenção na nuvem — manter apenas os últimos MAX_CLOUD backups
        log "Aplicando retenção na nuvem (máx: $MAX_CLOUD arquivos)..."
        CLOUD_FILES=$(rclone lsf "${RCLONE_REMOTE}:${RCLONE_BUCKET}/" \
            --include "backup-[projeto]-*.tar.gz" \
            | sort)

        CLOUD_COUNT=$(echo "$CLOUD_FILES" | grep -c . 2>/dev/null || echo 0)

        if [ "$CLOUD_COUNT" -gt "$MAX_CLOUD" ]; then
            DELETE_COUNT=$((CLOUD_COUNT - MAX_CLOUD))
            echo "$CLOUD_FILES" | head -n "$DELETE_COUNT" | while read -r f; do
                log "Removendo da nuvem: $f"
                rclone delete "${RCLONE_REMOTE}:${RCLONE_BUCKET}/$f"
            done
        fi

        CLOUD_REMAINING=$(rclone lsf "${RCLONE_REMOTE}:${RCLONE_BUCKET}/" \
            --include "backup-[projeto]-*.tar.gz" | wc -l)
        log "Backups na nuvem após limpeza: $CLOUD_REMAINING"
    fi
fi

log "=== Backup finalizado com sucesso ==="
log ""
```

### Placeholders para substituir

| Placeholder | Exemplo real | Onde aparece |
|---|---|---|
| `[projeto]` | `meuprojeto` | Nome dos arquivos, diretórios, filtros |
| `[empresa]` | `minhaempresa` | Nome do remote e bucket no rclone |
| `nome-do-banco` | `meu_banco_producao` | Variável `DB_NAME` |
| `usuario-mysql` | `root` | Variável `DB_USER` |
| `senha-mysql` | `senha_segura_aqui` | Variável `DB_PASS` |

---

## 7. Implantação no Servidor

### 7.1 Copiar o script

**Opção A — via SCP da máquina local:**
```bash
scp backup-[projeto].sh usuario@ip-servidor:/usr/local/bin/backup-[projeto].sh
```

**Opção B — criar diretamente no servidor:**
```bash
sudo nano /usr/local/bin/backup-[projeto].sh
# Cole o conteúdo do script, salve com Ctrl+O → Enter → Ctrl+X
```

### 7.2 Dar permissão de execução

```bash
sudo chmod +x /usr/local/bin/backup-[projeto].sh
```

### 7.3 Criar os diretórios de log

```bash
sudo mkdir -p /var/log/backup-mysql/[projeto]
sudo mkdir -p /var/backups/mysql/[projeto]
```

> ⚠️ O script cria o `BACKUP_DIR` automaticamente, mas **não cria** o diretório de log. Se ele não existir, o `tee` falha silenciosamente e o rclone aborta com erro de "no such file or directory".

### 7.4 Verificar as credenciais do banco

As credenciais estão no `.env` do Laravel:

```bash
grep DB_ /var/www/html/[projeto]/.env
```

---

## 8. Agendamento com crontab

```bash
sudo crontab -e
```

Adicione a linha no final do arquivo:

```
15 3 * * * /usr/local/bin/backup-[projeto].sh
```

Explicação dos campos:
- `15` — minuto 15
- `3` — hora 03:00
- `* * *` — todo dia, todo mês, todo dia da semana

Confirme que foi salvo:

```bash
sudo crontab -l
```

### Se houver outros jobs no mesmo horário

Escalone para evitar sobreposição:

```
0 3 * * * /usr/local/bin/outro-script.sh
15 3 * * * /usr/local/bin/backup-[projeto].sh
```

Verifique o fuso horário do servidor (o cron usa o horário do sistema):

```bash
timedatectl | grep "Time zone"
```

---

## 9. Testando Manualmente

Execute o script como root antes de confiar no cron:

```bash
sudo /usr/local/bin/backup-[projeto].sh
```

Verifique cada etapa:

```bash
# 1. Arquivo local foi criado?
ls -lh /var/backups/mysql/[projeto]/

# 2. Log sem erros?
tail -50 /var/log/backup-mysql/[projeto]/index.log

# 3. Arquivo chegou na nuvem?
sudo rclone lsf [empresa]-[projeto]:[empresa]-[projeto]/

# 4. Teste o upload isolado (diagnóstico)
sudo rclone copy /var/backups/mysql/[projeto]/ [empresa]-[projeto]:[empresa]-[projeto]/ -v
```

O output esperado de um backup bem-sucedido:

```
[2026-05-26 03:15:00] === Iniciando backup do banco 'nome-do-banco' ===
[2026-05-26 03:15:00] Executando mysqldump...
[2026-05-26 03:15:01] Dump gerado: /tmp/backup-[projeto]-2026-05-26_03-15.sql (17M)
[2026-05-26 03:15:01] Compactando arquivo...
[2026-05-26 03:15:01] Backup criado: /var/backups/mysql/[projeto]/backup-[projeto]-2026-05-26_03-15.tar.gz (4.3M)
[2026-05-26 03:15:01] Aplicando retenção local (máx: 3 arquivos)...
[2026-05-26 03:15:01] Backups locais após limpeza: 3
[2026-05-26 03:15:01] Enviando para Backblaze B2 ...
[2026-05-26 03:15:04] Upload concluído com sucesso.
[2026-05-26 03:15:04] Aplicando retenção na nuvem (máx: 3 arquivos)...
[2026-05-26 03:15:05] Backups na nuvem após limpeza: 3
[2026-05-26 03:15:05] === Backup finalizado com sucesso ===
```

---

## 10. Troubleshooting: Problemas Encontrados em Produção

Esta seção documenta os erros reais encontrados durante a implantação e como foram resolvidos.

---

### Problema 1: `tee: /var/log/.../index.log: No such file or directory`

**Causa:** O diretório de log não existia.

**Sintoma:** Todas as linhas do log aparecem no terminal mas não são gravadas; o rclone falha em seguida.

**Solução:**
```bash
sudo mkdir -p /var/log/backup-mysql/[projeto]
```

---

### Problema 2: `rclone copy` falha no script mas funciona manualmente

**Causa A — `--log-file` apontando para diretório inexistente:**

O parâmetro `--log-file="$LOG_FILE"` do rclone falha se o arquivo de destino não existir, retornando exit code 1. A solução é redirecionar a saída do rclone diretamente para o log do shell:

```bash
# ❌ Problemático
rclone copy ... --log-file="$LOG_FILE" --log-level INFO

# ✅ Correto
rclone copy ... >> "$LOG_FILE" 2>&1
```

**Causa B — rclone não configurado para o root:**

O script roda via `sudo`, mas o rclone foi configurado para o usuário comum. O root não conhece o remote.

```bash
# Diagnóstico
sudo rclone config show
# Retorna "empty config" → é este o problema

# Solução
sudo mkdir -p /root/.config/rclone
sudo cp ~/.config/rclone/rclone.conf /root/.config/rclone/rclone.conf

# Verificação
sudo rclone lsd [empresa]-[projeto]:
```

---

### Problema 3: `rclone copy` com arquivo individual em vez de diretório

**Causa:** Passar `"$ARCHIVE_FILE"` (arquivo) em vez de `"$BACKUP_DIR/"` (diretório) faz o rclone não conseguir comparar corretamente com o conteúdo remoto.

**Solução:** Sempre passar o diretório:

```bash
# ❌ Problemático
rclone copy "$ARCHIVE_FILE" "${RCLONE_REMOTE}:${RCLONE_BUCKET}/"

# ✅ Correto
rclone copy "$BACKUP_DIR/" "${RCLONE_REMOTE}:${RCLONE_BUCKET}/"
```

---

### Problema 4: `didn't find section in config file ("nome-do-remote")`

**Causa:** O remote não foi salvo durante o `rclone config` — geralmente por não confirmar com `y` no final.

**Diagnóstico:**
```bash
rclone config show
# Deve mostrar um bloco [nome-do-remote] com type = b2
```

**Solução:** Refazer o `rclone config` do zero, confirmando cada etapa.

---

## 11. Segurança Adicional

### Proteger a senha do banco com `.my.cnf`

Em vez de deixar a senha exposta no script, use o arquivo de credenciais do MySQL:

```bash
sudo nano /root/.my.cnf
```

```ini
[mysqldump]
user=usuario-mysql
password=senha-mysql
```

```bash
sudo chmod 600 /root/.my.cnf
```

No script, remova `--user` e `--password` do `mysqldump`:

```bash
mysqldump \
    --host="$DB_HOST" \
    --single-transaction \
    --routines \
    --triggers \
    --events \
    "$DB_NAME" > "$DUMP_FILE"
```

O mysqldump lerá as credenciais automaticamente do `.my.cnf` do root.

### Permissões dos arquivos

```bash
# Script executável apenas pelo root
sudo chmod 700 /usr/local/bin/backup-[projeto].sh
sudo chown root:root /usr/local/bin/backup-[projeto].sh

# Diretório de backup inacessível para outros usuários
sudo chmod 700 /var/backups/mysql/
```

---

## 12. Checklist de Implantação

Use este checklist ao implantar em um novo servidor:

- [ ] Conta criada no Backblaze B2
- [ ] Bucket criado com nome único (`[empresa]-[projeto]`)
- [ ] Application Key criada com permissão `Read and Write` no bucket
- [ ] `keyID` e `applicationKey` anotados em local seguro
- [ ] rclone instalado (`curl https://rclone.org/install.sh | sudo bash`)
- [ ] Remote configurado com `rclone config` para o usuário atual
- [ ] Config copiada para o root (`sudo cp ~/.config/rclone/rclone.conf /root/.config/rclone/rclone.conf`)
- [ ] `sudo rclone lsd [remote]:` lista o bucket corretamente
- [ ] Script criado em `/usr/local/bin/backup-[projeto].sh`
- [ ] Placeholders substituídos no bloco de configuração do script
- [ ] `sudo chmod +x /usr/local/bin/backup-[projeto].sh`
- [ ] Diretório de log criado (`sudo mkdir -p /var/log/backup-mysql/[projeto]`)
- [ ] Teste manual executado com sucesso (`sudo /usr/local/bin/backup-[projeto].sh`)
- [ ] Arquivo local verificado em `/var/backups/mysql/[projeto]/`
- [ ] Arquivo verificado na nuvem (`sudo rclone lsf [remote]:[bucket]/`)
- [ ] Cron configurado (`sudo crontab -e`) com horário de baixo tráfego
- [ ] `sudo crontab -l` confirma a linha do cron

---

## Referência Rápida de Comandos

```bash
# Testar o backup manualmente
sudo /usr/local/bin/backup-[projeto].sh

# Ver o log em tempo real
tail -f /var/log/backup-mysql/[projeto]/index.log

# Listar backups locais
ls -lh /var/backups/mysql/[projeto]/

# Listar backups na nuvem
sudo rclone lsf [empresa]-[projeto]:[empresa]-[projeto]/

# Ver o cron do root
sudo crontab -l

# Ver a config do rclone do root
sudo rclone config show

# Testar upload isolado com verbose
sudo rclone copy /var/backups/mysql/[projeto]/ [empresa]-[projeto]:[empresa]-[projeto]/ -v
```
