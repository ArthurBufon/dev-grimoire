# Setup — Dev Grimoire local (clone irmão dos apps)

## Propósito

O agente do Cursor precisa ler rules e moldes do Dev Grimoire via **Read/Grep no filesystem**. O Index Docs nativo não crawl repositórios GitHub nem expõe arquivos PHP/TSX às ferramentas do agente.

A solução: manter **um clone local** de `dev-grimoire` como **irmão** de todos os apps, no mesmo diretório pai.

---

## Layout de pastas

O **único nome fixo** é a pasta do grimório: `dev-grimoire`.

O diretório pai que agrupa os apps **não tem nome fixo** — pode ser `projetos`, `projetos-laravel`, `workspace`, ou qualquer outro:

```text
projetos/                  ← nome livre (exemplo)
├── dev-grimoire/          ← nome fixo; clone único
├── app-cliente-a/
├── app-cliente-b/
└── ...
```

---

## Clone

No **mesmo diretório pai dos apps** (ex.: dentro de `projetos/`):

```bash
cd /caminho/para/projetos
git clone https://github.com/ArthurBufon/dev-grimoire.git dev-grimoire
```

O nome da pasta **deve** ser `dev-grimoire` — a User Rule global resolve o grimório por esse marker.

---

## Setup no Cursor

1. Abra **somente o app** no Cursor (ex.: `projetos/app-cliente-a/`) — multi-root não é obrigatório.
2. Copie o conteúdo de [`docs/rules/global.md`](../../docs/rules/global.md) para **Settings → Rules → User**.
3. Não é necessário configurar **Indexing & Docs**.

---

## Validação

Com o app aberto no Cursor, peça ao agente:

> Leia `../dev-grimoire/README.md` e confirme o conteúdo.

Resultado esperado: leitura bem-sucedida do arquivo.

Teste adicional (Laravel):

> Leia `../dev-grimoire/moldes/laravel/app/Models/Carro.php`.

---

## Manutenção

Quando houver mudanças no grimório:

```bash
cd /caminho/para/projetos/dev-grimoire
git pull origin main
```

Um único clone serve todos os apps do mesmo diretório pai.

---

## Troubleshooting

| Problema | Causa provável | Solução |
|---|---|---|
| Agente não encontra o grimório | App fora do layout irmão | Mover app ou clonar `dev-grimoire` no mesmo pai |
| Marker não encontrado | Pasta com nome diferente de `dev-grimoire` | Renomear para `dev-grimoire` ou clonar com o nome correto |
| Read bloqueado em `../` | Restrição do ambiente | Usar multi-root workspace como plano B (adicionar `dev-grimoire` como pasta raiz extra) |
| Conteúdo desatualizado | Clone sem `git pull` | Atualizar o grimório local |
