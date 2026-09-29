// TIPOS
import type { RetornoPadronizado } from '@/types/retorno';

type DadosReferencia = {
  referencia: string;
};

const csrfToken = (): string =>
  document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? "";

export default class Queries {
  async store(): Promise<RetornoPadronizado<DadosReferencia>> {
    try {
      const url = "/carros/referencia";

      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          "X-CSRF-Token": csrfToken(),
        },
        credentials: "same-origin" as RequestCredentials,
      };

      const retorno = await fetch(url, options);

      const dados = (await retorno.json()) as RetornoPadronizado<DadosReferencia>;

      return dados;
    } catch (error) {
      console.error(error);

      return {
        sucesso: false,
        dados: [],
        erros: ["Erro ao gerar referência!"],
      };
    }
  }
}
