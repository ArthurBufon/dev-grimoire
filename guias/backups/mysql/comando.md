# Backup do Banco de Dados — MySQL/MariaDB

## 🗄️ Como gerar um dump completo sem bloquear a produção

O comando abaixo realiza um **dump completo** do banco de dados MySQL/MariaDB diretamente no servidor, gerando um arquivo `.sql` com timestamp no nome. É seguro para uso em produção pois não bloqueia tabelas nem interrompe conexões ativas.

```bash
TIMESTAMP=$(date +"%d%m%y_%H%M%S") && \
mysqldump \
  --single-transaction \
  --skip-lock-tables \
  --no-tablespaces \
  --routines --triggers --events \
  --default-character-set=utf8mb4 \
  -h localhost \
  -u user_db \
  -p'senha_db' \
  nome_db \
  > backup_[nome-projeto]_${TIMESTAMP}.sql && \
echo "✅ Dump gerado: backup_[nome-projeto]_${TIMESTAMP}.sql ($(du -sh backup_[nome-projeto]_${TIMESTAMP}.sql | cut -f1))"
```

---

## O que cada parte faz

| Parâmetro                                  | Descrição                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------- |
| `TIMESTAMP=$(date +"%d%m%y_%H%M%S")`       | Gera um timestamp no formato `DDMMAA_HHMMSS` para nomear o arquivo              |
| `--single-transaction`                     | Garante consistência dos dados via transação InnoDB **sem bloquear** a produção |
| `--skip-lock-tables`                       | Evita qualquer tentativa de `LOCK TABLES` nas tabelas                           |
| `--no-tablespaces`                         | Evita erros de permissão relacionados a tablespaces                             |
| `--routines`                               | Inclui stored procedures e functions no dump                                    |
| `--triggers`                               | Inclui triggers no dump                                                         |
| `--events`                                 | Inclui eventos agendados no dump                                                |
| `--default-character-set=utf8mb4`          | Preserva acentos e caracteres especiais corretamente                            |
| `-h localhost`                             | Host do banco de dados                                                          |
| `-u user_db`                               | Usuário do banco                                                                |
| `-p'...'`                                  | Senha entre aspas simples para preservar caracteres especiais                   |
| `nome_db`                                  | Nome do banco de dados                                                          |
| `> backup_[nome-projeto]_${TIMESTAMP}.sql` | Redireciona o dump para o arquivo de saída                                      |

---

## Arquivo gerado

O backup é salvo na raiz do projeto Laravel com o nome no formato:

```text
backup_[nome-projeto]_DDMMAA_HHMMSS.sql
```

Exemplo:

```text
backup_[nome-projeto]_290526_143022.sql
```

---

## Observações

* Funciona de forma segura apenas com tabelas **InnoDB**
* A senha entre aspas simples `'...'` suporta todos os caracteres especiais
* Para compactar o arquivo gerado: `gzip backup_[nome-projeto]_*.sql`
* **Nunca versione este arquivo** — adicione `*.sql` ao `.gitignore`
