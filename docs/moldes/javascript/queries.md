 # 🛠 Utilize o modelo abaixo para gerar arquivos padronizados.

## TODOS os queries devem seguir o mesmo padrão de código fornecido abaixo, visando facilidade de manutenção e legibilidade de código.

### REGRAS
- Seguir regras de /docs/rules/prefs-javascript.md
- Seguir regras de /docs/rules/geral.md

```
import { RetornoPadronizado } from '@/types';

export default class Queries {
	async index(filtros = {}) {
		try {
			const parametros = new URLSearchParams(filtros).toString();

			const url = parametros ? `/carros?${parametros}` : '/carros';

			const options = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				credentials: 'same-origin' as RequestCredentials,
			};

			const retorno = await fetch(url, options);

			const dados = await retorno.json() as RetornoPadronizado;

			return dados;
		} catch (error) {
			return {
				sucesso: false,
				dados: {
					lista: [],
				},
				erros: [
					error instanceof Error ? error.message : 'Erro ao listar carros!',
				],
			};
		}
	}

	async show(filtros = {}) {
		try {
			const id = filtros.id;

			const url = `/carros/${id}`;

			const options = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				credentials: 'same-origin' as RequestCredentials,
			};

			const retorno = await fetch(url, options);

			const dados = await retorno.json() as RetornoPadronizado;

			return dados;
		} catch (error) {
			return {
				sucesso: false,
				dados: {
					model: null,
				},
				erros: [
					error instanceof Error ? error.message : 'Erro ao buscar carro!',
				],
			};
		}
	}

	async store(dados) {
		try {
			const url = '/carros';

			const options = {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				credentials: 'same-origin' as RequestCredentials,
				body: JSON.stringify(dados),
			};

			const retorno = await fetch(url, options);

			const dadosRetorno = await retorno.json() as RetornoPadronizado;

			return dadosRetorno;
		} catch (error) {
			return {
				sucesso: false,
				dados: {},
				erros: [
					error instanceof Error ? error.message : 'Erro ao salvar carro!',
				],
			};
		}
	}

	async update(id: string | number, dados) {
		try {
			const url = `/carros/${id}`;

			const options = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				credentials: 'same-origin' as RequestCredentials,
				body: JSON.stringify(dados),
			};

			const retorno = await fetch(url, options);

			const dadosRetorno = await retorno.json() as RetornoPadronizado;

			return dadosRetorno;
		} catch (error) {
			return {
				sucesso: false,
				dados: {},
				erros: [
					error instanceof Error ? error.message : 'Erro ao atualizar carro!',
				],
			};
		}
	}

	async destroy(id: string | number) {
		try {
			const url = `/carros/${id}`;

			const options = {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
				},
				credentials: 'same-origin' as RequestCredentials,
			};

			const retorno = await fetch(url, options);

			const dados = await retorno.json() as RetornoPadronizado;

			return dados;
		} catch (error) {
			return {
				sucesso: false,
				dados: {},
				erros: [
					error instanceof Error ? error.message : 'Erro ao excluir carro!',
				],
			};
		}
	}
}
```
