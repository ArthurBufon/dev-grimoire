# Flutter / Dart

## Retorno padronizado
Services que propagam resultado de operações:
```dart
{ 'sucesso': true, 'dados': {}, 'erros': [] }
// ou tipado:
({ bool sucesso, dynamic dados, List<String> erros })
```

## Arquitetura
```
Model → Query → Service → Page
```
- **Models** — Dart puro; `fromMap()` + `toMap()`; sem banco, sem lógica
- **Queries** — SQL simples via `sqflite`; convenção `index/show/store/update/destroy`
- **Services** — lógica de negócio; SQLs complexas; orquestração; API/FTP
- **Pages** — UI exclusivamente; chama services; exibe erros via helper de modal

> ❌ DTO proibido — serialização JSON vai nos Models via `fromMap()` / `toMap()`

## Queries (convenção obrigatória)
```dart
Future<List<T>> index();          // listar todos
Future<T?>      show(int id);     // buscar por ID
Future<int>     store(T model);   // inserir → retorna ID
Future<int>     update(T model);  // atualizar → retorna rows afetadas
Future<int>     destroy(int id);  // deletar → retorna rows afetadas
```
- Retornar Model tipado — nunca `Map` cru para as pages
- Sem lógica de negócio — apenas SQL + mapeamento
- Queries com filtros: parâmetros nomeados `index({int? entidadeId})`

## Tratamento de erros em Services
```dart
Future<void> salvar(Model model) async {
  if (model.campo.isEmpty) {
    throw Exception('Campo obrigatório.');
  }
  try {
    await queries.store(model);
  } catch (e) {
    throw Exception('Erro ao salvar: $e');
  }
}
```
- `try/catch` em todas as operações críticas (banco, API, FTP)
- Lançar exceções tipadas — nunca retornar `null` silencioso em erro
- Pages capturam e exibem via helper de modal — nunca `print()` em produção

## Models
```dart
class Produto {
  final int? id;
  final String descricao;
  final double preco;

  const Produto({this.id, required this.descricao, required this.preco});

  factory Produto.fromMap(Map<String, dynamic> map) => Produto(
    id: map['id'] as int?,
    descricao: map['descricao'] as String,
    preco: (map['preco'] as num).toDouble(),
  );

  Map<String, dynamic> toMap() => {
    if (id != null) 'id': id,
    'descricao': descricao,
    'preco': preco,
  };
}
```

## Widgets e Performance
- **Sempre `const`** em widgets estáticos
- Preferir `StatelessWidget`; `StatefulWidget` apenas com estado local real
- Evitar `setState()` em widgets grandes — isolar em widgets menores
- `SizedBox` para espaçamentos — mais leve que `Container` vazio
- Listas sempre com `ListView.builder` — nunca filhos fixos em listas longas
- Não sobrescrever `operator ==` em widgets

## Nomenclatura
- `UpperCamelCase` para classes, widgets, enums, typedefs
- `lowerCamelCase` para variáveis, funções, parâmetros
- `snake_case` para arquivos e pastas
- `UPPER_SNAKE_CASE` para constantes
