// REACT
import { useState } from 'react';
import type { SubmitEvent } from 'react';
import type { FormDataConvertible } from '@inertiajs/core';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';

// UI
import InputError from '@/Components/InputError';
import { Button } from '@/Components/Ui/Button';
import { Input } from '@/Components/Ui/Input';
import { Label } from '@/Components/Ui/Label';
import { Spinner } from '@/Components/Ui/Spinner';
import { CheckCircle, X } from 'lucide-react';

// ROTAS
import CarroController from '@/actions/App/Http/Controllers/Web/Admin/Carro/CarroController';
import { index as adminIndex } from '@/routes/admin';
import { index as carrosIndex } from '@/routes/admin/carros';

type DadosFormulario = {
    nome: string;
    placa: string;
    modelo: string;
    cor: string;
};

const Create = () => {
    const { errors } = usePage().props;
    const [processing, setProcessing] = useState(false);
    const [errosCliente, setErrosCliente] = useState<string[]>([]);

    const { data, setData } = useForm<DadosFormulario>({
        nome: '',
        placa: '',
        modelo: '',
        cor: '',
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

        router.post(CarroController.store.url(), formatarDadosRequest(), {
            onStart: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        });
    };

    return (
        <>
            <Head title="Novo carro" />

            <div className="mx-auto w-4/5 p-4">
                <h1 className="mb-6 text-2xl font-semibold">Novo carro</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input
                            id="nome"
                            value={data.nome}
                            onChange={(evento) =>
                                handleCampoChange('nome', evento.target.value)
                            }
                            required
                        />
                        <InputError message={errors.nome} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="placa">Placa</Label>
                        <Input
                            id="placa"
                            value={data.placa}
                            onChange={(evento) =>
                                handleCampoChange('placa', evento.target.value)
                            }
                            required
                        />
                        <InputError message={errors.placa ?? errosCliente[0]} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="modelo">Modelo</Label>
                        <Input
                            id="modelo"
                            value={data.modelo}
                            onChange={(evento) =>
                                handleCampoChange('modelo', evento.target.value)
                            }
                            required
                        />
                        <InputError message={errors.modelo} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="cor">Cor</Label>
                        <Input
                            id="cor"
                            value={data.cor}
                            onChange={(evento) =>
                                handleCampoChange('cor', evento.target.value)
                            }
                            required
                        />
                        <InputError message={errors.cor} />
                    </div>

                    <InputError message={errors.geral} />

                    <hr className="my-3 border-gray-200 dark:border-gray-700" />

                    <div className="flex justify-between gap-3">
                        <Button asChild variant="outline">
                            <Link href={carrosIndex()}>
                                <X />
                                Cancelar
                            </Link>
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? <Spinner /> : <CheckCircle />}
                            Salvar
                        </Button>
                    </div>
                </form>
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
