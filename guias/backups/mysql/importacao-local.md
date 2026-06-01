# Importação do Banco de Dados — Produção → Local (Docker/WSL2)

Passo a passo para baixar o dump de produção via FileZilla e importar no container Docker rodando no WSL2, usando as mesmas credenciais do `.env` de produção.

---

## Pré-requisitos

- FileZilla instalado e configurado com acesso SFTP ao servidor de produção
- Docker Desktop rodando com WSL2 habilitado
- Repositório do projeto Laravel clonado localmente
- Container do banco de dados em execução (`docker compose up -d`)

---

## Passo 1 — Baixar o .sql via FileZilla

1. Abra o **FileZilla** e conecte ao servidor de produção
2. No painel **remoto** (direita), navegue até a raiz do projeto:
   ```
   /home/aguiae38/public_html/AGUIAWEB/
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
cp /mnt/c/Users/SEU_USUARIO/Downloads/backup_producao_*.sql /tmp/mysql-backups/
```

> Substitua `SEU_USUARIO` pelo seu usuário Windows, ex: `/mnt/c/Users/joao/Downloads/`

Confirme que o arquivo foi copiado:

```bash
ls -lh /tmp/mysql-backups/
```

---

## Passo 5 — Carregar as credenciais do .env de produção

Navegue até a raiz do projeto Laravel local e exporte as variáveis do `.env`:

```bash
cd ~/projetos/aguiaweb   # ajuste para o caminho do seu repositório

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

O serviço do banco neste projeto é `mysql`. O `docker compose cp` usa o **nome do serviço** definido no `docker-compose.yml`, não o nome real do container (ex: `aguiaweb_mysql`):

```bash
docker compose cp /tmp/mysql-backups/backup_producao_*.sql mysql:/tmp/backup.sql
```

---

## Passo 7 — Importar o banco de dados

```bash
docker compose exec mysql bash -c "mysql -h 127.0.0.1 -u '$DB_USERNAME' -p'$DB_PASSWORD' '$DB_DATABASE' < /tmp/backup.sql"
```

As credenciais são lidas diretamente das variáveis exportadas do `.env` no Passo 5 — as mesmas de produção.

Acompanhe a importação (útil para bancos grandes):

```bash
docker compose exec db bash -c "pv /tmp/backup.sql | mysql -h 127.0.0.1 -u '$DB_USERNAME' -p'$DB_PASSWORD' '$DB_DATABASE'"
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
rm /tmp/mysql-backups/backup_producao_*.sql
```

Remova da pasta Downloads do Windows:

```bash
rm /mnt/c/Users/SEU_USUARIO/Downloads/backup_producao_*.sql
```

Limpe as variáveis de ambiente da sessão:

```bash
unset DB_HOST DB_PORT DB_DATABASE DB_USERNAME DB_PASSWORD
```

---

## Resumo dos comandos

```bash
# 1. Criar pasta temporária (apenas na primeira vez)
mkdir -p /tmp/mysql-backups

# 2. Copiar do Downloads Windows para WSL2
cp /mnt/c/Users/SEU_USUARIO/Downloads/backup_producao_*.sql /tmp/mysql-backups/

# 3. Carregar credenciais do .env (na raiz do projeto)
export DB_HOST=$(grep ^DB_HOST .env | cut -d '=' -f2-)
export DB_DATABASE=$(grep ^DB_DATABASE .env | cut -d '=' -f2-)
export DB_USERNAME=$(grep ^DB_USERNAME .env | cut -d '=' -f2-)
export DB_PASSWORD=$(grep ^DB_PASSWORD .env | cut -d '=' -f2-)

# 4. Copiar .sql para o container (serviço: mysql)
docker compose cp /tmp/mysql-backups/backup_producao_*.sql mysql:/tmp/backup.sql

# 5. Importar
docker compose exec mysql bash -c "mysql -h 127.0.0.1 -u '$DB_USERNAME' -p'$DB_PASSWORD' '$DB_DATABASE' < /tmp/backup.sql"

# 6. Verificar
docker compose exec mysql mysql -h 127.0.0.1 -u "$DB_USERNAME" -p"$DB_PASSWORD" "$DB_DATABASE" -e "SHOW TABLES;"

# 7. Excluir backups
docker compose exec mysql rm /tmp/backup.sql
rm /tmp/mysql-backups/backup_producao_*.sql
rm /mnt/c/Users/SEU_USUARIO/Downloads/backup_producao_*.sql
unset DB_HOST DB_PORT DB_DATABASE DB_USERNAME DB_PASSWORD
```

---

## Problemas comuns

| Erro | Causa | Solução |
|---|---|---|
| `No such file or directory` no cp | Nome do arquivo diferente | Verificar com `ls /mnt/c/Users/SEU_USUARIO/Downloads/*.sql` |
| `no container found for service` | Usando nome real do container em vez do serviço | Usar sempre `mysql` (nome do serviço), não `aguiaweb_mysql` |
| `Access denied` | Credenciais não carregadas | Repetir o Passo 5 e confirmar com `echo $DB_USERNAME` |
| `Unknown database` | Banco não existe no container | Criar com `CREATE DATABASE nome_do_banco;` antes de importar |
| `Table already exists` | Banco local com dados antigos | Dropar e recriar: `DROP DATABASE nome; CREATE DATABASE nome;` |
| Importação travada | Arquivo muito grande | Usar `pv` para acompanhar progresso (Passo 8) |%   
