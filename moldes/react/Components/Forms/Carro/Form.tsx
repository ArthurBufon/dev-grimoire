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

// TIPOS
import type { DadosFormulario } from '@/types/carro';

// ROTAS
import { index as carrosIndex } from '@/routes/admin/carros';

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
                <Label htmlFor="marca">Marca</Label>
                <Input
                    id="marca"
                    value={data.marca}
                    onChange={(evento) =>
                        onCampoChange('marca', evento.target.value)
                    }
                    required
                />
                <InputError message={errors.marca} />
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
                <Label htmlFor="ano">Ano</Label>
                <Input
                    id="ano"
                    type="number"
                    value={data.ano}
                    onChange={(evento) =>
                        onCampoChange('ano', Number(evento.target.value))
                    }
                    required
                />
                <InputError message={errors.ano} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="cor">Cor</Label>
                <Input
                    id="cor"
                    value={data.cor}
                    onChange={(evento) =>
                        onCampoChange('cor', evento.target.value)
                    }
                />
                <InputError message={errors.cor} />
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
                <Label htmlFor="km">Km</Label>
                <Input
                    id="km"
                    type="number"
                    value={data.km}
                    onChange={(evento) =>
                        onCampoChange('km', Number(evento.target.value))
                    }
                    required
                />
                <InputError message={errors.km} />
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
