# Importação do Banco de Dados — Produção → Local (Docker/WSL2)

Passo a passo para baixar o dump de produção e importar no container Docker rodando no WSL2, usando as mesmas credenciais do `.env` de produção.

---

## Pré-requisitos

* Docker Desktop rodando com WSL2 habilitado
* Repositório do projeto Laravel clonado localmente
* Container do banco de dados em execução (`docker compose up -d`)

---

## Passo 1 — Baixar o .sql do servidor de produção

### Opção A — SCP via Windows Terminal (recomendado)

Mais rápido e prático, sem necessidade de instalar nada além do PuTTY (já disponível).

No **Windows Terminal** ou **PowerShell**:

```powershell
scp -i "C:\Users\SEU_USUARIO\.ssh\sua_chave" usuario@servidor:/caminho/do/projeto/backup_[nome-projeto]_*.sql C:\Users\SEU_USUARIO\Downloads\
```

Na primeira conexão, confirme o fingerprint digitando `yes`. Se a chave tiver passphrase, ela será solicitada.

> ✅ O backup **sempre** deve ser salvo em `C:\Users\SEU_USUARIO\Downloads\`

---

### Opção B — FileZilla (interface gráfica)

1. Abra o **FileZilla** e conecte ao servidor de produção via SFTP
2. No painel **remoto** (direita), navegue até a raiz do projeto:

   ```
   /caminho/do/projeto/
   ```
3. No painel **local** (esquerda), navegue até:

   ```
   C:\Users\SEU_USUARIO\Downloads\
   ```
4. Clique com o botão direito no arquivo `.sql` → **Baixar**
5. Aguarde a transferência concluir

> ✅ O backup **sempre** deve ser salvo em `C:\Users\SEU_USUARIO\Downloads\`

---

## Passo 2 — Abrir o terminal WSL2

No PowerShell ou Terminal do Windows, acesse o WSL2:

```bash
wsl
```

---

## Passo 3 — Criar a pasta temporária de backups MySQL

Crie (uma única vez) o diretório temporário padrão para backups:

```bash
mkdir -p /tmp/mysql-backups
```

---

## Passo 4 — Copiar o .sql do Windows para o WSL2

O disco `C:\` do Windows é acessível dentro do WSL2 em `/mnt/c/`. Copie o arquivo direto da pasta Downloads:

```bash
cp /mnt/c/Users/SEU_USUARIO/Downloads/backup_[nome-projeto]_*.sql /tmp/mysql-backups/
```

> Substitua `SEU_USUARIO` pelo seu usuário Windows, ex: `/mnt/c/Users/arthur/Downloads/`

Confirme que o arquivo foi copiado:

```bash
ls -lh /tmp/mysql-backups/
```

---

## Passo 5 — Carregar as credenciais do .env

Navegue até a raiz do projeto Laravel local e exporte as variáveis do `.env`:

```bash
cd ~/projetos/[nome-projeto]   # ajuste para o caminho do seu repositório

export DB_HOST=$(grep ^DB_HOST .env | cut -d '=' -f2-)
export DB_PORT=$(grep ^DB_PORT .env | cut -d '=' -f2-)
export DB_DATABASE=$(grep ^DB_DATABASE .env | cut -d '=' -f2-)
export DB_USERNAME=$(grep ^DB_USERNAME .env | cut -d '=' -f2-)
export DB_PASSWORD=$(grep ^DB_PASSWORD .env | cut -d '=' -f2-)
```

> ⚠️ O `-f2-` (hífen no final) garante que senhas com `=` e outros caracteres especiais sejam lidas corretamente.

Confirme as variáveis (sem expor a senha):

```bash
echo "Host: $DB_HOST | Banco: $DB_DATABASE | Usuário: $DB_USERNAME"
```

---

## Passo 6 — Copiar o .sql para dentro do container

```bash
docker compose cp /tmp/mysql-backups/backup_[nome-projeto]_*.sql mysql:/tmp/backup.sql
```

---

## Passo 7 — Importar o banco de dados

```bash
docker compose exec mysql bash -c "mysql -h 127.0.0.1 -u '$DB_USERNAME' -p'$DB_PASSWORD' '$DB_DATABASE' < /tmp/backup.sql"
```

Acompanhe a importação (útil para bancos grandes):

```bash
docker compose exec mysql bash -c "pv /tmp/backup.sql | mysql -h 127.0.0.1 -u '$DB_USERNAME' -p'$DB_PASSWORD' '$DB_DATABASE'"
```

> Se `pv` não estiver disponível no container: `docker compose exec mysql apt-get install -y pv`

---

## Passo 8 — Verificar a importação

```bash
docker compose exec mysql mysql -h 127.0.0.1 -u "$DB_USERNAME" -p"$DB_PASSWORD" "$DB_DATABASE" -e "SHOW TABLES;"
```

A lista de tabelas deve ser exibida sem erros.

---

## Passo 9 — Excluir os backups após importação confirmada

Remova o arquivo de dentro do container:

```bash
docker compose exec mysql rm /tmp/backup.sql
```

Remova da pasta temporária do WSL2:

```bash
rm /tmp/mysql-backups/backup_[nome-projeto]_*.sql
```

Remova da pasta Downloads do Windows:

```bash
rm /mnt/c/Users/SEU_USUARIO/Downloads/backup_[nome-projeto]_*.sql
```

Limpe as variáveis de ambiente da sessão:

```bash
unset DB_HOST DB_PORT DB_DATABASE DB_USERNAME DB_PASSWORD
```

---

## Resumo dos comandos

```bash
# 1. [Windows Terminal] Baixar via SCP
scp -i "C:\Users\SEU_USUARIO\.ssh\sua_chave" usuario@servidor:/caminho/do/projeto/backup_[nome-projeto]_*.sql C:\Users\SEU_USUARIO\Downloads\

# 2. [WSL2] Criar pasta temporária (apenas na primeira vez)
mkdir -p /tmp/mysql-backups

# 3. [WSL2] Copiar do Downloads Windows para WSL2
cp /mnt/c/Users/SEU_USUARIO/Downloads/backup_[nome-projeto]_*.sql /tmp/mysql-backups/

# 4. [WSL2] Carregar credenciais do .env (na raiz do projeto)
export DB_HOST=$(grep ^DB_HOST .env | cut -d '=' -f2-)
export DB_DATABASE=$(grep ^DB_DATABASE .env | cut -d '=' -f2-)
export DB_USERNAME=$(grep ^DB_USERNAME .env | cut -d '=' -f2-)
export DB_PASSWORD=$(grep ^DB_PASSWORD .env | cut -d '=' -f2-)

# 5. Copiar .sql para o container (serviço: mysql)
docker compose cp /tmp/mysql-backups/backup_[nome-projeto]_*.sql mysql:/tmp/backup.sql

# 6. Importar
docker compose exec mysql bash -c "mysql -h 127.0.0.1 -u '$DB_USERNAME' -p'$DB_PASSWORD' '$DB_DATABASE' < /tmp/backup.sql"

# 7. Verificar
docker compose exec mysql mysql -h 127.0.0.1 -u "$DB_USERNAME" -p"$DB_PASSWORD" "$DB_DATABASE" -e "SHOW TABLES;"

# 8. Excluir backups
docker compose exec mysql rm /tmp/backup.sql
rm /tmp/mysql-backups/backup_[nome-projeto]_*.sql
rm /mnt/c/Users/SEU_USUARIO/Downloads/backup_[nome-projeto]_*.sql
unset DB_HOST DB_PORT DB_DATABASE DB_USERNAME DB_PASSWORD
```

---

## Problemas comuns

| Erro                                  | Causa                                                       | Solução                                                       |
| ------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| `No such file or directory` no cp     | Nome do arquivo diferente                                   | Verificar com `ls /mnt/c/Users/SEU_USUARIO/Downloads/*.sql`   |
| `no container found for service`      | Usando nome real do container em vez do serviço             | Usar sempre `mysql` (nome do serviço)                         |
| `Access denied`                       | Credenciais não carregadas                                  | Repetir o Passo 5 e confirmar com `echo $DB_USERNAME`         |
| `Unknown database`                    | Banco não existe no container                               | Criar com `CREATE DATABASE nome_do_banco;` antes de importar  |
| `Table already exists`                | Banco local com dados antigos                               | Dropar e recriar: `DROP DATABASE nome; CREATE DATABASE nome;` |
| `You do not have the SUPER privilege` | Backup com ROUTINES/TRIGGERS e usuário sem privilégio SUPER | Ver seção abaixo                                              |
| Importação travada                    | Arquivo muito grande                                        | Usar `pv` para acompanhar progresso (Passo 7)                 |

---

## Erro: SUPER privilege / log_bin_trust_function_creators

Ocorre quando o backup contém ROUTINES ou TRIGGERS. Solução mais rápida — setar via root:

```bash
docker compose exec mysql bash -c "mysql -h 127.0.0.1 -u root -p'SENHA_ROOT' -e 'SET GLOBAL log_bin_trust_function_creators = 1;'"
```

Depois importe normalmente e reverta:

```bash
docker compose exec mysql bash -c "mysql -h 127.0.0.1 -u root -p'SENHA_ROOT' -e 'SET GLOBAL log_bin_trust_function_creators = 0;'"
```

Se não tiver acesso ao root, remova os DEFINERs do backup antes de importar:

```bash
sed 's/\sDEFINER=`[^`]*`@`[^`]*`//g' /tmp/mysql-backups/backup_[nome-projeto]_*.sql > /tmp/mysql-backups/backup_clean.sql
docker compose cp /tmp/mysql-backups/backup_clean.sql mysql:/tmp/backup.sql
```
