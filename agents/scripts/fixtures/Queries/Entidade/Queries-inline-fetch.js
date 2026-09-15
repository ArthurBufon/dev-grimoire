export const Queries = {
    store: async function () {
        const retorno = await fetch(route("entidades.referencia"), { method: "POST" });
        return await retorno.json();
    },
};
