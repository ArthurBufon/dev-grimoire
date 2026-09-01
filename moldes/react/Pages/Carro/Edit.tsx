// REACT
import type { SubmitEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';

// UI
import CardErros from '@/Components/Forms/CardErros/Show';
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
    const { data, setData, put, processing, errors } = useForm<DadosFormulario>({
        marca: carro.marca,
        modelo: carro.modelo,
        ano: carro.ano,
        cor: carro.cor ?? '',
        placa: carro.placa,
        km: carro.km,
        valor: carro.valor,
        data_lancamento: carro.data_lancamento ?? '',
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

    const handleSubmit = (evento: SubmitEvent<HTMLFormElement>) => {
        evento.preventDefault();

        put(CarroController.update.url(carro.id));
    };

    return (
        <>
            <Head title={`Editar ${carro.marca}`} />

            <div className="mx-auto w-4/5 p-4">
                <h1 className="mb-6 text-2xl font-semibold">Editar carro</h1>

                <CardErros erros={errors} />

                <Form
                    data={data}
                    erros={errors}
                    onCampoChange={handleCampoChange}
                    onSubmit={handleSubmit}
                    processing={processing}
                />
            </div>
        </>
    );
};

Edit.layout = {
    breadcrumbs: [
        { title: 'Painel Admin', href: adminIndex() },
        { title: 'Carros', href: carrosIndex() },
        {
            title: 'Editar',
            href: CarroController.edit({ carro: carro.id }),
        },
    ],
};

export default Edit;
