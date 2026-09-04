export type RetornoPadronizado<TDados = Record<string, unknown>> = {
    sucesso: boolean;
    dados: TDados;
    erros: string[];
};
