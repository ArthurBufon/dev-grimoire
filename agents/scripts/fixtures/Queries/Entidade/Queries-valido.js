export const Queries = {
    store: async function () {
        try {
            const url = route("carros.referencia");
            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
            };
            const retorno = await fetch(url, options);

            return await retorno.json();
        } catch (error) {
            return { sucesso: false, dados: [], erros: [error.message] };
        }
    },
};
