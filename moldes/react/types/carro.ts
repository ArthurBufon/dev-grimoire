// TIPOS
import type { Fabricante } from '@/types/fabricante';

export type Carro = {
    id: number;
    fabricante_id: number;
    fabricante?: Fabricante;
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
    fabricante_id: number | '';
    modelo: string;
    ano: number;
    cor: string;
    placa: string;
    km: number;
    valor: string;
    data_lancamento: string;
};
