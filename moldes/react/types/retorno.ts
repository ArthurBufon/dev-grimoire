type RetornoSucesso<TDados> = {
    sucesso: true;
    dados: TDados;
    erros: [];
};

type RetornoFalha = {
    sucesso: false;
    dados: [];
    erros: string[];
};

export type RetornoPadronizado<TDados = Record<string, unknown>> =
    | RetornoSucesso<TDados>
    | RetornoFalha;
