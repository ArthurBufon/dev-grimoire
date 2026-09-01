// REACT
import type { SubmitEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';

// UI
import Form from '@/Components/Forms/Carro/Form';

// TIPOS
import type { DadosFormulario } from '@/types/carro';

// ROTAS
import CarroController from '@/actions/App/Http/Controllers/Web/Admin/Carro/CarroController';
import { index as adminIndex } from '@/routes/admin';
import { index as carrosIndex } from '@/routes/admin/carros';

const Create = () => {
    const { data, setData, post, processing, errors } = useForm<DadosFormulario>({
        marca: '',
        modelo: '',
        ano: new Date().getFullYear(),
        cor: '',
        placa: '',
        km: 0,
        valor: '0.00',
        data_lancamento: '',
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

        post(CarroController.store.url());
    };

    return (
        <>
            <Head title="Novo carro" />

            <div className="mx-auto w-4/5 p-4">
                <h1 className="mb-6 text-2xl font-semibold">Novo carro</h1>

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

Create.layout = {
    breadcrumbs: [
        { title: 'Painel Admin', href: adminIndex() },
        { title: 'Carros', href: carrosIndex() },
        { title: 'Novo carro', href: CarroController.create() },
    ],
};

export default Create;
