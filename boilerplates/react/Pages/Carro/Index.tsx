// REACT
import { Head, Link } from '@inertiajs/react';
// UI
import { Car, Plus } from 'lucide-react';
import ListagemCard from '@/Components/Listagem/Card/Show';
import ListagemCards from '@/Components/Listagem/Card/Index';
import { Badge } from '@/Components/Ui/Badge';
import { Button } from '@/Components/Ui/Button';
// TIPOS
import type { Carro } from '@/types/auth';
// ROTAS
import CarroController from '@/actions/App/Http/Controllers/Web/Admin/Carro/CarroController';
import { index as adminIndex } from '@/routes/admin';
import { index as carrosIndex } from '@/routes/admin/carros';
type Props = {
    lista: Carro[];
};
const formatarTipo = (tipo: Carro['tipo']): string => {
    return tipo === 'novo' ? 'Novo' : 'Usado';
};
const Index = ({ lista }: Props) => {
    return (
        <>
            <Head title="Carros" />
            <div className="flex flex-col gap-6 p-4">
                <div className="flex items-center justify-between gap-4">
                    <h1 className="flex items-center gap-2 text-2xl font-semibold">
                        <Car className="size-6 shrink-0 text-primary" aria-hidden />
                        Carros
                    </h1>
                    <Button asChild>
                        <Link href={CarroController.create()}>
                            <Plus />
                            Novo carro
                        </Link>
                    </Button>
                </div>
                <ListagemCards className="md:max-w-2xl" colunaUnica>
                    {lista.map((carro) => (
                        <ListagemCard
                            key={carro.id}
                            icone={Car}
                            titulo={carro.nome}
                            tituloPrefixo={
                                <Badge
                                    variant={carro.tipo === 'novo' ? 'default' : 'secondary'}
                                    className="shrink-0"
                                >
                                    {formatarTipo(carro.tipo)}
                                </Badge>
                            }
                            detalhes={[carro.placa]}
                            acoes={
                                <Link
                                    href={CarroController.edit({ carro: carro.id })}
                                    className="text-primary text-sm underline"
                                >
                                    Editar
                                </Link>
                            }
                        />
                    ))}
                </ListagemCards>
            </div>
        </>
    );
};
Index.layout = {
    breadcrumbs: [
        { title: 'Painel Admin', href: adminIndex() },
        { title: 'Carros', href: carrosIndex() },
    ],
};
export default Index;
