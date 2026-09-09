export type Fabricante = {
    id: number;
    nome: string;
    descricao: string | null;
    ativo: boolean;
    created_at: string;
    updated_at: string;
};

export type OpcaoVinculo = {
    id: number;
    nome: string;
    ativo?: boolean;
};
