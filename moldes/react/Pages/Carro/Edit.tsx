// REACT
import { useState } from 'react';
import type { SubmitEvent } from 'react';
import type { FormDataConvertible } from '@inertiajs/core';
import { Head, router, useForm } from '@inertiajs/react';

// TIPOS
import type { Carro } from '@/types/auth';

// ROTAS
import CarroController from '@/actions/App/Http/Controllers/Web/Admin/Carro/CarroController';
import { index as adminIndex } from '@/routes/admin';
import { index as carrosIndex } from '@/routes/admin/carros';

import Form, { type DadosFormulario } from './Form';

type EditProps = {
    carro: Carro;
};

const Edit = ({ carro }: EditProps) => {
    const [processing, setProcessing] = useState(false);
    const [errosCliente, setErrosCliente] = useState<string[]>([]);

    const { data, setData } = useForm<DadosFormulario>({
        nome: carro.nome,
        placa: carro.placa,
        modelo: carro.modelo,
        cor: carro.cor,
    });

    const handleCampoChange = <K extends keyof DadosFormulario>(
        campo: K,
        valor: DadosFormulario[K],
    ) => {
        setData((dadosAnteriores) => ({
            ...dadosAnteriores,
            [campo]: valor,
        }));
    };

    const validarFormulario = () => {
        return {
            sucesso: true,
            dados: {},
            erros: [] as string[],
        };
    };

    const formatarDadosRequest = (): Record<string, FormDataConvertible> => {
        return {
            nome: data.nome,
            placa: data.placa,
            modelo: data.modelo,
            cor: data.cor,
        };
    };

    const handleSubmit = (evento: SubmitEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const validacao = validarFormulario();

        if (!validacao.sucesso) {
            setErrosCliente(validacao.erros);

            return;
        }

        setErrosCliente([]);

        router.put(
            CarroController.update.url(carro.id),
            formatarDadosRequest(),
            {
                onStart: () => setProcessing(true),
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <>
            <Head title={`Editar ${carro.nome}`} />

            <div className="mx-auto w-4/5 p-4">
                <h1 className="mb-6 text-2xl font-semibold">Editar carro</h1>

                <Form
                    data={data}
                    onCampoChange={handleCampoChange}
                    onSubmit={handleSubmit}
                    processing={processing}
                    errosCliente={errosCliente}
                />
            </div>
        </>
    );
};

Edit.layout = {
    breadcrumbs: [
        { title: 'Painel Admin', href: adminIndex() },
        { title: 'Carros', href: carrosIndex() },
        { title: 'Editar', href: '#' },
    ],
};

export default Edit;
