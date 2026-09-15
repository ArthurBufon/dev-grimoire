export const Queries = {
    gerarReferencia: async function () {
        const url = route("entidades.referencia");
        const options = { method: "POST" };
        const retorno = await fetch(url, options);
        return await retorno.json();
    },
};
