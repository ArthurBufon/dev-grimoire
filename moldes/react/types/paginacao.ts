export type PaginacaoListagem = {
    total: number;
    total_retornado: number;
    pagina: number;
    limite: number;
    total_paginas: number;
};

export type FiltrosListagem = {
    busca_geral: string;
};
