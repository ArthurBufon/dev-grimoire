export const Queries = {
    index: async function () {
        return axios.get("/entidades");
    },
};
