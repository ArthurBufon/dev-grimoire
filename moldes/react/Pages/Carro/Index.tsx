// REACT
import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { Head, Link, router } from '@inertiajs/react';

// UI
import { Car, Plus } from 'lucide-react';
import Filtros from '@/Components/Listagem/Card/Filtro/Show';
import ListagemCard from '@/Components/Listagem/Card/Show';
import ListagemCards from '@/Components/Listagem/Card/Index';
import { Button } from '@/Components/Ui/Button';
import { Input } from '@/Components/Ui/Input';

// TIPOS
import type { Carro } from '@/types/carro';
import type { FiltrosListagem, PaginacaoListagem } from '@/types/paginacao';

// ROTAS
import CarroController from '@/actions/App/Http/Controllers/Web/Admin/Carro/CarroController';
import { index as adminIndex } from '@/routes/admin';
import { index as carrosIndex } from '@/routes/admin/carros';

type Props = {
    lista: Carro[];
    paginacao: PaginacaoListagem;
    filtros: FiltrosListagem;
};

const Index = ({ lista, paginacao, filtros }: Props) => {
    const [buscaGeral, setBuscaGeral] = useState(filtros.busca_geral ?? '');

    const numerosPagina = Array.from({ length: 10 }, (_, i) => i + 1);
    const ultimaPaginaDisponivel = Math.min(paginacao.total_paginas, 10);

    const handlePesquisar = (evento: SubmitEvent<HTMLFormElement>) => {
        evento.preventDefault();

        router.get(
            carrosIndex(),
            {
                busca_geral: buscaGeral,
                quantidade: 10,
                pagina: 1,
            },
            { preserveState: true, replace: true },
        );
    };

    const irParaPagina = (pagina: number) => {
        router.get(
            carrosIndex(),
            {
                busca_geral: filtros.busca_geral ?? '',
                quantidade: 10,
                pagina,
            },
            { preserveState: true, replace: true },
        );
    };

    const semResultados = paginacao.total === 0;
    const paginaVazia = paginacao.total > 0 && lista.length === 0;
    const temBusca = Boolean(filtros.busca_geral);

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

                <div className="mx-auto flex w-4/5 flex-col gap-6">
                    <Filtros onSubmit={handlePesquisar}>
                        <Input
                            id="busca_geral"
                            value={buscaGeral}
                            onChange={(evento) =>
                                setBuscaGeral(evento.target.value)
                            }
                            placeholder="Buscar por marca, modelo, ano ou placa"
                        />
                    </Filtros>

                    <p className="text-sm text-muted-foreground">
                        Exibindo {paginacao.total_retornado} de{' '}
                        {paginacao.total} registros
                    </p>

                    {semResultados ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                            <p className="text-muted-foreground">
                                {temBusca
                                    ? 'Nenhum carro encontrado'
                                    : 'Nenhum carro cadastrado'}
                            </p>
                            {!temBusca && (
                                <Button asChild>
                                    <Link href={CarroController.create()}>
                                        <Plus />
                                        Novo carro
                                    </Link>
                                </Button>
                            )}
                        </div>
                    ) : (
                        <>
                            {paginaVazia ? (
                                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                                    <p className="text-muted-foreground">
                                        Nenhum carro nesta página.
                                    </p>
                                </div>
                            ) : (
                                <ListagemCards className="w-full" colunaUnica>
                                    {lista.map((carro) => (
                                        <ListagemCard
                                            key={carro.id}
                                            icone={Car}
                                            titulo={`${carro.marca} ${carro.modelo}`}
                                            detalhes={[
                                                carro.placa,
                                                String(carro.ano),
                                            ]}
                                            acoes={
                                                <Link
                                                    href={CarroController.edit({
                                                        carro: carro.id,
                                                    })}
                                                    className="text-sm text-primary underline"
                                                >
                                                    Editar
                                                </Link>
                                            }
                                        />
                                    ))}
                                </ListagemCards>
                            )}

                            <div className="mx-auto inline-flex overflow-hidden rounded-sm border shadow-sm">
                                {numerosPagina.map((numero) => {
                                    const disponivel =
                                        numero <= ultimaPaginaDisponivel;

                                    return (
                                        <button
                                            key={numero}
                                            type="button"
                                            disabled={!disponivel}
                                            onClick={() => irParaPagina(numero)}
                                            className={`flex size-8 items-center justify-center border-r text-sm tabular-nums last:border-r-0 ${
                                                !disponivel
                                                    ? 'cursor-not-allowed text-muted-foreground/40'
                                                    : numero ===
                                                        paginacao.pagina
                                                      ? 'bg-primary text-primary-foreground'
                                                      : 'text-muted-foreground hover:bg-muted'
                                            }`}
                                        >
                                            {numero}
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
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
