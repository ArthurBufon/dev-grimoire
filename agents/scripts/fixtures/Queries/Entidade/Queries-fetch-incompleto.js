export const Queries = {
    store: async function () {
        try {
            const url = route("entidades.store");
            const options = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,
                },
            };
            const retorno = await fetch(url);

            return await retorno.json();
        } catch (error) {
            return { sucesso: false, dados: [], erros: [error.message] };
        }
    },
};
