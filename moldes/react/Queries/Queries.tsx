// TIPOS
import type { Carro, DadosFormulario } from '@/types/carro';
import type { PaginacaoListagem } from '@/types/paginacao';
import type { RetornoPadronizado } from '@/types/retorno';

// CONTROLLERS
import CarroController from '@/actions/App/Http/Controllers/Web/Admin/Carro/CarroController';

type FiltrosIndex = Record<string, string | number | boolean>;

type FiltrosShow = {
  id: string | number;
};

const csrfToken = (): string =>
  document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

export default class Queries {
  async index(filtros: FiltrosIndex = {}): Promise<RetornoPadronizado<{ lista: Carro[]; paginacao: PaginacaoListagem }>> {
    try {
      const url = CarroController.index.url({ query: filtros });

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-Token": csrfToken(),
        },
        credentials: "same-origin" as RequestCredentials,
      };

      const retorno = await fetch(url, options);

      const dados = (await retorno.json()) as RetornoPadronizado<{ lista: Carro[]; paginacao: PaginacaoListagem }>;

      return dados;
    } catch (error) {
      return {
        sucesso: false,
        dados: [],
        erros: [
          error instanceof Error ? error.message : "Erro ao listar carros!",
        ],
      };
    }
  }

  async show(filtros: FiltrosShow): Promise<RetornoPadronizado<{ model: Carro | null }>> {
    try {
      const id = filtros.id;

      const url = `/carros/${id}`;

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-Token": csrfToken(),
        },
        credentials: "same-origin" as RequestCredentials,
      };

      const retorno = await fetch(url, options);

      const dados = (await retorno.json()) as RetornoPadronizado<{ model: Carro | null }>;

      return dados;
    } catch (error) {
      return {
        sucesso: false,
        dados: [],
        erros: [
          error instanceof Error ? error.message : "Erro ao buscar carro!",
        ],
      };
    }
  }

  async store(dados: DadosFormulario): Promise<RetornoPadronizado> {
    try {
      const url = CarroController.store.url();

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-Token": csrfToken(),
        },
        credentials: "same-origin" as RequestCredentials,
        body: JSON.stringify(dados),
      };

      const retorno = await fetch(url, options);

      const dadosRetorno = (await retorno.json()) as RetornoPadronizado;

      return dadosRetorno;
    } catch (error) {
      return {
        sucesso: false,
        dados: [],
        erros: [
          error instanceof Error ? error.message : "Erro ao salvar carro!",
        ],
      };
    }
  }

  async update(id: string | number, dados: Partial<DadosFormulario>): Promise<RetornoPadronizado> {
    try {
      const url = CarroController.update.url({ carro: id });

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-Token": csrfToken(),
        },
        credentials: "same-origin" as RequestCredentials,
        body: JSON.stringify(dados),
      };

      const retorno = await fetch(url, options);

      const dadosRetorno = (await retorno.json()) as RetornoPadronizado;

      return dadosRetorno;
    } catch (error) {
      return {
        sucesso: false,
        dados: [],
        erros: [
          error instanceof Error ? error.message : "Erro ao atualizar carro!",
        ],
      };
    }
  }

  async destroy(id: string | number): Promise<RetornoPadronizado> {
    try {
      const url = CarroController.destroy.url({ carro: id });

      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-Token": csrfToken(),
        },
        credentials: "same-origin" as RequestCredentials,
      };

      const retorno = await fetch(url, options);

      const dados = (await retorno.json()) as RetornoPadronizado;

      return dados;
    } catch (error) {
      return {
        sucesso: false,
        dados: [],
        erros: [
          error instanceof Error ? error.message : "Erro ao excluir carro!",
        ],
      };
    }
  }
}
