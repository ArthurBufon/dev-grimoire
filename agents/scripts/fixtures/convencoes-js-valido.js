export const Queries = {
    store: async function () {
        const url = route("carros.referencia");
        const options = { method: "POST" };
        const retorno = await fetch(url, options);
        return await retorno.json();
    },
};
