import { csrfToken } from "../../../Utils/variables.js";

export const Queries = {
    store: async function () {
        try {
            const url = route("carros.referencia");

            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
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
    },
};
