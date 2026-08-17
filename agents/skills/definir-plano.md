---

name: definir-plano
description: Cria planos de implementação detalhados antes de alterar código. Use com "elaborar plano", "write a plan" ou "criar plano de implementação".
---

# Definir Plano

## Regra final

NUNCA desperdiçar tokens — sempre visar economia, mas mantendo qualidade de prompt/resultado.

## Gate anti-slop (bloqueante)

**Leia e aplique** `{GRIMOIRE}/agents/fragments/gate-anti-slop.md` antes de escrever o plano, ao definir cada tarefa e antes de salvar o artefato.

Hard gate desta skill — **não avance** se:

* uma tarefa introduzir arquitetura, arquivo ou abstração além do que a modelagem e os moldes exigem;
* código, assinaturas ou interfaces no plano duplicarem o molde sem eliminar ambiguidade real;
* testes planejados superarem passos de implementação relevantes ou repetirem o mesmo cenário em vários níveis;
* surgirem refatorações, "melhorias" ou NFRs não presentes na modelagem;
* tarefas forem fatiadas em micro-passos só para parecer detalhado;
* o plano crescer em volume sem crescimento proporcional de requisitos (modo L da modelagem → plano enxuto).

Ritual obrigatório antes de salvar: executar o ritual de saída do fragmento para o plano inteiro e, mentalmente, por tarefa.

Crie somente o plano. Não implemente código durante este fluxo.

## Contexto obrigatório

Antes de escrever o plano, leia:

1. Modelagem: `docs/modelagem/{feature}/modelagem/{feature}.md` (**obrigatório** — gerado por `definir-modelagem`; contém comportamento e, quando houver, design técnico)
2. Regras do projeto: `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/` ou equivalentes.
3. **Dev Grimoire** (`../dev-grimoire/`): seguir `{GRIMOIRE}/docs/rules/global.md` (resolução do grimório, rules da stack e mapa de moldes) — leitura obrigatória via Read/Grep; nunca assumir o conteúdo sem ler o filesystem.
4. Specs, ADRs e documentação permanente relevante em `docs/` (fora de `docs/modelagem/`).
5. User rules globais.
6. Estrutura do codebase e arquivos semelhantes.

Use o mesmo slug `{feature}` das demais etapas. Não inicie o plano sem o arquivo de modelagem.

### Uso da modelagem

Alinhe-se ao modo L/M/H e ao campo **Design** do artefato:

* Se a seção **Design técnico** existir → use-a como fonte das decisões técnicas.
* Se **Design: pulado** → derive a abordagem de moldes do Dev Grimoire, padrões do módulo e âncoras registradas (“igual à feature Y”). Não invente arquitetura nova; se surgir decisão técnica não óbvia, pare e sugira retomar `definir-modelagem` (Fase 2) antes de continuar.

Regras do projeto e do usuário têm precedência sobre esta skill. Não invente convenções; quando algo não estiver documentado, siga os padrões existentes no código e no Dev Grimoire.

## Padrões do Dev Grimoire (obrigatório)

Seguir `{GRIMOIRE}/docs/rules/global.md` — rules da stack (`geral.md`, `php.md`, `javascript.md`) e moldes mapeados em `global.md`.

Ao planejar arquivos novos, cite o molde de referência e espelhe assinaturas e estrutura do molde no plano (adaptando entidade, namespace e paths).

Padrões consolidados no módulo alterado do projeto atual têm prioridade sobre o molde quando já estabelecidos (ver prioridades em `global.md`).

Não introduza no plano padrões alternativos, atalhos ou “melhorias” que divergem do Dev Grimoire fora do escopo solicitado.

## Objetivo do plano

Produza um plano executável por alguém que não conhece o projeto, contendo:

* arquivos exatos que serão criados ou alterados;
* responsabilidade de cada arquivo;
* arquitetura e decisões relevantes;
* interfaces, assinaturas e tipos;
* etapas de implementação;
* testes no mínimo essencial (anti-overkill — ver seção **Testes**);
* comandos reais de validação.

Siga KISS, DRY e YAGNI. Não inclua refatorações fora do escopo.

## Escopo

Se houver subsistemas independentes, divida em planos separados.

Cada tarefa deve gerar uma entrega funcional, revisável e testável. Agrupe imports, configuração, scaffolding e documentação pequena à tarefa que depende deles.

## Artefato

Salve o plano em:

`docs/modelagem/{feature}/plano/{feature}.md`

## Política de exclusão

Os arquivos em `docs/modelagem/{feature}/` são **artefatos temporários** de modelagem — não documentação permanente do projeto.

* Não versione conteúdo que deva permanecer no repositório dentro desses paths; transfira o que for necessário para `docs/features/` ou equivalente do projeto.
* Após a feature estar implementada e entregue, **exclua** `docs/modelagem/{feature}/` por completo para evitar lixo acumulado no repositório.
* Só mantenha os artefatos enquanto ainda forem necessários para as etapas seguintes do workflow.

## Política Git

Nunca crie branches, faça commits, push ou altere o histórico sem autorização explícita do usuário.

O plano deve:

* identificar a branch de desenvolvimento existente;
* orientar a implementação nessa branch;
* proibir branches avulsas ou de feature;
* proibir commits durante a implementação;
* exigir revisão final de todos os arquivos alterados.

Não inclua etapas automáticas de commit.

## Estrutura do documento

```markdown
# Plano de Implementação: [Feature]

**Objetivo:** [resultado em uma frase]

**Arquitetura:** [abordagem resumida]

**Stack:** [tecnologias utilizadas]

## Restrições Globais
- Convenções de código: `{GRIMOIRE}/docs/rules/global.md` (não reinterpretar; ler rules e moldes via Read/Grep).
- **Formatação:** proibido usar ferramentas de formatação automática (Pint, Prettier, PHP CS Fixer, `eslint --fix` para estilo, format-on-save, etc.) — nem no plano nem na execução. Seguir as convenções do dev e o estilo já existente no arquivo/módulo; o diff deve mudar só o necessário. PHP: `{GRIMOIRE}/docs/rules/php.md` (seção "Formatação e legibilidade"). JS/TS: mesma política.
- [regras aplicáveis a todas as tarefas]

## Política Git para execução
- Branch: `[branch identificada]`
- Não criar branches.
- Não fazer commits ou push sem autorização.
- Revisar cada arquivo alterado ao final.

## Arquivos
- `caminho/arquivo`: [responsabilidade]
```

Para cada tarefa:

```markdown
### Tarefa N: [Entrega]

**Arquivos:**
- Criar: `caminho/exato`
- Alterar: `caminho/exato`
- Testar: `caminho/exato`

**Responsabilidade:** [resultado produzido]

**Interfaces:**
- Consome: [dependências e assinaturas]
- Produz: [métodos, tipos e comportamentos]

- [ ] Criar só os testes mínimos essenciais (sem overkill)
- [ ] Confirmar que falham pelo motivo esperado
- [ ] Implementar o comportamento
- [ ] Executar os testes relacionados à tarefa
- [ ] Validar lint, tipos e build aplicáveis
- [ ] Explicar arquivos consultados e usados (ver abaixo)

**Encerramento da tarefa — arquivos consultados e usados:**

Ao finalizar a tarefa, documente de forma objetiva:

- **Consultados:** arquivos lidos para contexto (rules, moldes, specs, código existente, ADRs) — sem alteração.
- **Usados:** arquivos criados, alterados ou referenciados diretamente na implementação.

Exemplo:

```markdown
**Arquivos consultados:**
- `../dev-grimoire/docs/rules/php.md`
- `../dev-grimoire/moldes/laravel/app/Services/Carro/Service.php`
- `app/Services/Veiculo/Service.php` (padrão existente no módulo)

**Arquivos usados:**
- Criado: `app/Services/Veiculo/Service.php`
- Alterado: `routes/api.php`
```

Inclua código, assinaturas e comandos concretos quando necessários para eliminar ambiguidades. Qualquer código incluído deve obedecer rigidamente aos padrões do Dev Grimoire.
```

## Testes (mínimo essencial — anti-overkill)

Agents tendem a exagerar na quantidade e na granularidade dos testes. **Não faça isso.**

No plano, cubra **somente o básico mínimo** da feature: os poucos casos que realmente protegem o comportamento pedido. Prefira poucos testes de alto valor a uma suíte larga e frágil.

**Incluir (quando aplicável):**

* 1 fluxo feliz principal;
* 1–2 regras de negócio críticas (só as que definem o valor da feature);
* erros/validações que o usuário ou a API realmente encontram;
* regressão pontual se o bug/motivo da mudança for conhecido.

**Não incluir:**

* matriz completa de combinações, edge cases hipotéticos ou “e se”;
* testes de getters/setters, métodos privados ou detalhes internos;
* duplicar o mesmo cenário em unitário + feature + integração;
* mocks excessivos, factories elaboradas ou scaffolding de teste maior que a feature;
* meta de cobertura percentual ou “testar tudo que tocar”.

Regra prática: se o plano listar mais testes do que passos de implementação relevantes, corte até sobrar o mínimo que falharia de forma óbvia se a feature quebrasse. Use o tipo de teste (unitário, integração, feature) que melhor exercita o comportamento real — um nível basta na maioria dos casos.

TDD só quando couber no escopo: escrever o(s) teste(s) essenciais, ver falhar, implementar, passar. Sem expandir a suíte “por precaução”.

## Formatação de código

**Proibido** incluir no plano (ou orientar na execução) o uso de ferramentas de formatação automática — em PHP e em JS/TS.

Exemplos do que **não** usar nem sugerir:

* Laravel Pint, PHP CS Fixer, Prettier, Biome format, `eslint --fix` só para padronizar estilo, format-on-save ou qualquer passo de “normalizar” arquivos tocados.

Ao planejar alterações de código:

* seguir as convenções do dev e os padrões já existentes no arquivo ou módulo;
* manter o diff mínimo — sem “limpar” ou reformatar trechos fora do escopo da tarefa;
* em PHP, obedecer `{GRIMOIRE}/docs/rules/php.md` (seção "Formatação e legibilidade");
* em JS/TS, aplicar a mesma política de preservação de estilo do arquivo.

## Proibições

Não use:

* ferramentas de formatação automática (ver seção acima);
* `TBD`, `TODO` ou “implementar depois”;
* instruções vagas como “tratar erros”;
* testes sem cenários definidos, ou suíte ampla / overkill além do mínimo essencial;
* “igual à tarefa anterior”;
* funções, tipos ou arquivos não definidos;
* comandos incompatíveis com o projeto;
* alterações fora do escopo.

## Autorrevisão

Antes de concluir:

0. Reaplique o gate anti-slop (ritual de saída); corte slop antes de entregar.
1. Confirme que todos os requisitos possuem uma tarefa.
2. Verifique paths, nomes, tipos e assinaturas.
3. Remova placeholders, duplicações e tarefas pequenas demais.
4. Confirme aderência às regras do projeto, do usuário e do Dev Grimoire (rules + moldes citados para cada arquivo novo).
5. Confirme que nenhum commit ou branch será criado sem permissão.
6. Inclua uma etapa final com `git status` e revisão individual dos arquivos.
7. Confirme que o plano referencia a exclusão futura de `docs/modelagem/{feature}/`.

Ao terminar, informe onde o plano foi salvo (`docs/modelagem/{feature}/plano/{feature}.md`) e um resumo breve da modelagem.
