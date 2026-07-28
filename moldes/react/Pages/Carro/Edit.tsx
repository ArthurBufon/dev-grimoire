// REACT
import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';

// UI
import Form from '@/Components/Forms/Carro/Form';

// TIPOS
import type { Carro, DadosFormulario } from '@/types/carro';

// ROTAS
import CarroController from '@/actions/App/Http/Controllers/Web/Admin/Carro/CarroController';
import { index as adminIndex } from '@/routes/admin';
import { index as carrosIndex } from '@/routes/admin/carros';

type EditProps = {
    carro: Carro;
};

const Edit = ({ carro }: EditProps) => {
    const [errosCliente, setErrosCliente] = useState<string[]>([]);

    const { data, setData, put, processing } = useForm<DadosFormulario>({
        marca: carro.marca,
        modelo: carro.modelo,
        ano: carro.ano,
        cor: carro.cor ?? '',
        placa: carro.placa,
        km: carro.km,
        valor: carro.valor,
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

    const handleSubmit = (evento: SubmitEvent<HTMLFormElement>) => {
        evento.preventDefault();

        const validacao = validarFormulario();

        if (!validacao.sucesso) {
            setErrosCliente(validacao.erros);

            return;
        }

        setErrosCliente([]);

        put(CarroController.update.url(carro.id));
    };

    return (
        <>
            <Head title={`Editar ${carro.marca}`} />

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
