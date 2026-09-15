const csrfToken = (): string =>
  document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? "";

export default class Queries {
  async store() {
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

      return await retorno.json();
    } catch (error) {
      console.error(error);

      return {
        sucesso: false,
        dados: {},
        erros: ["Erro ao gerar referência!"],
      };
    }
  }
}
