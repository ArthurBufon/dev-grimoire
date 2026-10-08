export const Queries = {
    store: async function () {
        const url = route("entidades.store");
        const options = { method: "POST" };
        const retorno = await fetch(url, options);

        return await retorno.json();
    },
};
