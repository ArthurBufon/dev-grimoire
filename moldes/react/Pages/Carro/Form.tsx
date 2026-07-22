// REACT
import type { SubmitEvent } from 'react';
import { Link, usePage } from '@inertiajs/react';

// UI
import InputError from '@/Components/InputError';
import { Button } from '@/Components/Ui/Button';
import { Input } from '@/Components/Ui/Input';
import { Label } from '@/Components/Ui/Label';
import { Spinner } from '@/Components/Ui/Spinner';
import { CheckCircle, X } from 'lucide-react';

// ROTAS
import { index as carrosIndex } from '@/routes/admin/carros';

export type DadosFormulario = {
    nome: string;
    placa: string;
    modelo: string;
    cor: string;
};

type FormProps = {
    data: DadosFormulario;
    onCampoChange: <K extends keyof DadosFormulario>(
        campo: K,
        valor: DadosFormulario[K],
    ) => void;
    onSubmit: (evento: SubmitEvent<HTMLFormElement>) => void;
    processing: boolean;
    errosCliente: string[];
};

const Form = ({
    data,
    onCampoChange,
    onSubmit,
    processing,
    errosCliente,
}: FormProps) => {
    const { errors } = usePage().props;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input
                    id="nome"
                    value={data.nome}
                    onChange={(evento) =>
                        onCampoChange('nome', evento.target.value)
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
                        onCampoChange('placa', evento.target.value)
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
                        onCampoChange('modelo', evento.target.value)
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
                        onCampoChange('cor', evento.target.value)
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
    );
};

export default Form;
