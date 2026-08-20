export type Carro = {
    id: number;
    marca: string;
    modelo: string;
    ano: number;
    cor: string | null;
    placa: string;
    km: number;
    valor: string;
    data_lancamento: string | null;
    created_at: string;
    updated_at: string;
};

export type DadosFormulario = {
    marca: string;
    modelo: string;
    ano: number;
    cor: string;
    placa: string;
    km: number;
    valor: string;
    data_lancamento: string;
};
