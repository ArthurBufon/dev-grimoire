// NOTA (molde): este arquivo é a variante "tabela" da listagem, ao lado de Index.tsx (variante "card" / default).
// Em projetos reais NUNCA cria-se IndexTabela.tsx — a listagem sempre é Pages/{Entidade}/Index.tsx.
// O grimório mantém os dois nomes só para poder mostrar as duas referências lado a lado sem conflito de arquivo.
// Escolha uma das duas ao criar a Page real e nomeie o arquivo resultante como Index.tsx.

// REACT
import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

// UI
import { Car, Plus } from 'lucide-react';
import Filtros from '@/Components/Listagem/Card/Filtro/Show';
import Tabela from '@/Components/Listagem/Tabela/Index';
import TabelaLinha from '@/Components/Listagem/Tabela/Show';
import { Button } from '@/Components/Ui/Button';
import { Input } from '@/Components/Ui/Input';
import { Label } from '@/Components/Ui/Label';

// TIPOS
import type { Carro } from '@/types/carro';
import type { OpcaoVinculo } from '@/types/fabricante';
import type { FiltrosListagem, PaginacaoListagem } from '@/types/paginacao';

// ROTAS
import CarroController from '@/actions/App/Http/Controllers/Web/Admin/Carro/CarroController';
import { index as adminIndex } from '@/routes/admin';
import { index as carrosIndex } from '@/routes/admin/carros';

type Props = {
    lista: Carro[];
    paginacao: PaginacaoListagem;
    filtros: FiltrosListagem;
    fabricantes: OpcaoVinculo[];
};

const normalizarFabricanteId = (
    valor: FiltrosListagem['fabricante_id'],
): number | '' => {
    if (valor === undefined || valor === null || valor === '') {
        return '';
    }

    const id = Number(valor);

    return Number.isFinite(id) ? id : '';
};

const IndexTabela = ({ lista, paginacao, filtros: filtrosIniciais, fabricantes }: Props) => {
    const [filtros, setFiltros] = useState({
        busca_geral: filtrosIniciais.busca_geral ?? '',
        fabricante_id: normalizarFabricanteId(filtrosIniciais.fabricante_id),
        data_lancamento_inicio: filtrosIniciais.data_lancamento_inicio ?? '',
        data_lancamento_fim: filtrosIniciais.data_lancamento_fim ?? '',
    });

    const numerosPagina = Array.from({ length: 10 }, (_, i) => i + 1);
    const ultimaPaginaDisponivel = Math.min(paginacao.total_paginas ?? 0, 10);

    const montarParametrosListagem = (pagina: number) => {
        const parametros: Record<string, string | number> = {
            busca_geral: filtros.busca_geral,
            data_lancamento_inicio: filtros.data_lancamento_inicio,
            data_lancamento_fim: filtros.data_lancamento_fim,
            quantidade: 10,
            pagina,
        };

        if (filtros.fabricante_id !== '') {
            parametros.fabricante_id = filtros.fabricante_id;
        }

        return parametros;
    };

    const handlePesquisar = () => {
        router.get(
            carrosIndex(),
            montarParametrosListagem(1),
            { preserveState: true, replace: true },
        );
    };

    const handleLimpar = () => {
        setFiltros({
            busca_geral: '',
            fabricante_id: '',
            data_lancamento_inicio: '',
            data_lancamento_fim: '',
        });
        router.get(carrosIndex());
    };

    const irParaPagina = (pagina: number) => {
        router.get(
            carrosIndex(),
            montarParametrosListagem(pagina),
            { preserveState: true, replace: true },
        );
    };

    const semResultados = paginacao.total === 0;
    const paginaVazia = paginacao.total > 0 && lista.length === 0;
    const temBusca = Boolean(
        filtros.busca_geral ||
            filtros.fabricante_id !== '' ||
            filtros.data_lancamento_inicio ||
            filtros.data_lancamento_fim,
    );

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
                    <Filtros
                        onLimpar={handleLimpar}
                        onPesquisar={handlePesquisar}
                        filtrosExtras={
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="fabricante_id">Fabricante</Label>
                                    <select
                                        id="fabricante_id"
                                        value={filtros.fabricante_id}
                                        onChange={(evento) =>
                                            setFiltros((atual) => ({
                                                ...atual,
                                                fabricante_id: evento.target.value === ''
                                                    ? ''
                                                    : Number(evento.target.value),
                                            }))
                                        }
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                                    >
                                        <option value="">Todos os fabricantes</option>
                                        {fabricantes.map((fabricante) => (
                                            <option key={fabricante.id} value={fabricante.id}>
                                                {fabricante.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="data_lancamento_inicio">Lançamento (início)</Label>
                                    <Input
                                        id="data_lancamento_inicio"
                                        type="date"
                                        value={filtros.data_lancamento_inicio}
                                        onChange={(evento) =>
                                            setFiltros((atual) => ({ ...atual, data_lancamento_inicio: evento.target.value }))
                                        }
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="data_lancamento_fim">Lançamento (fim)</Label>
                                    <Input
                                        id="data_lancamento_fim"
                                        type="date"
                                        value={filtros.data_lancamento_fim}
                                        onChange={(evento) =>
                                            setFiltros((atual) => ({ ...atual, data_lancamento_fim: evento.target.value }))
                                        }
                                    />
                                </div>
                            </div>
                        }
                    >
                        <Input
                            id="busca_geral"
                            value={filtros.busca_geral}
                            onChange={(evento) =>
                                setFiltros((atual) => ({ ...atual, busca_geral: evento.target.value }))
                            }
                            onKeyDown={(evento) => evento.key === 'Enter' && handlePesquisar()}
                            placeholder="Buscar por fabricante, modelo, ano ou placa"
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
                                <Tabela
                                    cabecalho={[
                                        'Fabricante',
                                        'Modelo',
                                        'Ano',
                                        'Placa',
                                        'Ações',
                                    ]}
                                >
                                    {lista.map((carro) => (
                                        <TabelaLinha
                                            key={carro.id}
                                            celulas={[
                                                carro.fabricante?.nome ?? '—',
                                                carro.modelo,
                                                String(carro.ano),
                                                carro.placa,
                                                <Link
                                                    key="acoes"
                                                    href={CarroController.edit({
                                                        carro: carro.id,
                                                    })}
                                                    className="text-sm text-primary underline"
                                                >
                                                    Editar
                                                </Link>,
                                            ]}
                                        />
                                    ))}
                                </Tabela>
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

IndexTabela.layout = {
    breadcrumbs: [
        { title: 'Painel Admin', href: adminIndex() },
        { title: 'Carros', href: carrosIndex() },
    ],
};

export default IndexTabela;
