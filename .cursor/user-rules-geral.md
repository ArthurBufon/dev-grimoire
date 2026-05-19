# User Rule — Geral

## Princípios de Desenvolvimento
- Melhores práticas de 2026: código idiomático, tipagem forte, sem padrões obsoletos
- KISS é inegociável — código simples e legível é manutenção simples
- Alterações mínimas e localizadas — não refatorar o que não foi pedido
- Nunca criar arquivos, classes ou abstrações desnecessárias

## Nomenclatura
- Funções, métodos e classes sempre em português, salvo instrução contrária
- Diretórios, namespaces e classes nunca contêm verbos
  - ❌ `/Services/Carro/Andar.php`
  - ✅ `/Services/Carro/Service/Acao/Service.php` (método `andar` dentro da classe)
- Ao criar arquivo novo, seguir estrutura e nomenclatura dos existentes no projeto

## Comportamento
- Analisar o problema antes de implementar — nunca pular direto para código
- Investigar causa raiz antes de aplicar correção
- Quebrar problemas complexos em passos menores antes de executar

## Git
- Commits em português, imperativo: "Adiciona", "Corrige", "Remove", "Refatora"
- Nunca commitar: `.env`, credenciais, arquivos de build, logs

## Segurança
- Nunca expor credenciais, tokens ou senhas no código
- Variáveis sensíveis sempre em `.env`
- Nunca logar dados sensíveis (senhas, tokens, documentos pessoais)
