# User Rule — Geral

## Princípios de Desenvolvimento
- Melhores práticas de 2026: código idiomático, tipagem forte, sem padrões obsoletos
- KISS é inegociável — código simples e legível é manutenção simples
- Alterações mínimas e localizadas — não refatorar o que não foi pedido
- Nunca criar arquivos, classes ou abstrações desnecessárias

## Nomenclatura
- Funções, métodos e classes sempre em português, salvo instrução contrária
- Diretórios, namespaces e classes nunca contêm verbos
  - ❌ `/Services/Carro/Andar.php/js`
  - ✅ `/Services/Carro/Service/Acao/Service.php/js` (método `andar` dentro da classe)
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
## Imports Globais

### Organização de Imports

- Todo import deve ser **agrupado por categoria lógica**, nunca misturado
- As categorias devem ser separadas por **comentários explícitos**
- A ordem dos grupos deve ser **consistente em todo o projeto**

---

### Ordem padrão dos grupos

1. **Utils / Helpers / Libs / Outros**
2. **Queries**
3. **Services**

---

### Regras

- Nunca misturar categorias no mesmo bloco
- Nunca importar de forma desorganizada ou “conforme necessidade”
- Sempre manter a mesma ordem
- Evitar imports desnecessários (remover não utilizados)
- Priorizar clareza sobre “menos linhas”

---

### Exemplo

```php
// LIBS EXTERNAS
use Illuminate\Support\Collection;

// QUERIES
use App\Queries\User\Queries as UserQueries;

// SERVICES
use App\Services\LinkService;
use App\Services\ServerService;
use App\Services\Empresa\EmpresaService;
use App\Services\Catalogo\CatalogoService;
use App\Services\Catalogo\Sacola\Service as SacolaService;

// REPOSITORIES
use App\Repositories\UserRepository;

// UTILS
use App\Utils\DateHelper;

// MODELS
use App\Models\User;
```
