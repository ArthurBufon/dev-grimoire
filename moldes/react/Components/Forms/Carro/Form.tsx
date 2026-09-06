// REACT
import type { SubmitEvent } from 'react';
import { Link } from '@inertiajs/react';

// UI
import InputError from '@/Components/InputError';
import { Button } from '@/Components/Ui/Button';
import { Input } from '@/Components/Ui/Input';
import { Label } from '@/Components/Ui/Label';
import { Spinner } from '@/Components/Ui/Spinner';
import { CheckCircle, X } from 'lucide-react';

// TIPOS
import type { DadosFormulario } from '@/types/carro';

// UTILS
import {
    extrairDecimalDoInput,
    formatarDinheiroParaReal,
} from '@/Utils/dinheiro';

// ROTAS
import { index as carrosIndex } from '@/routes/admin/carros';

type ErrosFormulario = Partial<Record<keyof DadosFormulario, string>> & {
    geral?: string;
};

type FormProps = {
    data: DadosFormulario;
    erros: ErrosFormulario;
    onCampoChange: <K extends keyof DadosFormulario>(
        campo: K,
        valor: DadosFormulario[K],
    ) => void;
    onSubmit: (evento: SubmitEvent<HTMLFormElement>) => void;
    processing: boolean;
};

const Form = ({
    data,
    erros,
    onCampoChange,
    onSubmit,
    processing,
}: FormProps) => {
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
                <InputError message={erros.marca} />
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
                <InputError message={erros.modelo} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="ano">Ano</Label>
                <Input
                    id="ano"
                    type="number"
                    min={1900}
                    max={2100}
                    value={data.ano}
                    onChange={(evento) =>
                        onCampoChange('ano', Number(evento.target.value))
                    }
                    required
                />
                <InputError message={erros.ano} />
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
                <InputError message={erros.cor} />
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
                <InputError message={erros.placa} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="km">Km</Label>
                <Input
                    id="km"
                    type="number"
                    min={0}
                    value={data.km}
                    onChange={(evento) =>
                        onCampoChange('km', Number(evento.target.value))
                    }
                    required
                />
                <InputError message={erros.km} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="valor">Valor</Label>
                <Input
                    id="valor"
                    type="text"
                    inputMode="decimal"
                    value={formatarDinheiroParaReal(data.valor)}
                    onChange={(evento) =>
                        onCampoChange(
                            'valor',
                            extrairDecimalDoInput(evento.target.value),
                        )
                    }
                    required
                />
                <InputError message={erros.valor} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="data_lancamento">Data de lançamento</Label>
                <Input
                    id="data_lancamento"
                    type="date"
                    value={data.data_lancamento}
                    onChange={(evento) =>
                        onCampoChange('data_lancamento', evento.target.value)
                    }
                />
                <InputError message={erros.data_lancamento} />
            </div>

            <InputError message={erros.geral} />

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
