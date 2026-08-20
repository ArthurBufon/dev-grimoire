// REACT
import { useState } from 'react';
import type { ReactNode } from 'react';

// UI
import { ChevronDown, Filter, Search, X } from 'lucide-react';
import { Button } from '@/Components/Ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/Ui/Card';

type Props = {
    children: ReactNode;
    filtrosExtras?: ReactNode;
    onLimpar: () => void;
    onPesquisar: () => void;
    pesquisarDesabilitado?: boolean;
};

const Show = ({
    children,
    filtrosExtras,
    onLimpar,
    onPesquisar,
    pesquisarDesabilitado = false,
}: Props) => {
    const [mostrarExtras, setMostrarExtras] = useState(false);

    return (
        <Card className="gap-0 overflow-hidden py-0 shadow-sm">
            <CardHeader className="border-b px-5 py-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Search className="size-4" />
                    Filtros de pesquisa
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 px-5 py-2">
                {children}

                {filtrosExtras && (
                    <>
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-fit gap-2 px-0 text-muted-foreground hover:text-foreground"
                            onClick={() => setMostrarExtras((anterior) => !anterior)}
                        >
                            <Filter className="size-4" />
                            {mostrarExtras ? 'Ocultar filtros' : '+ Filtros'}
                            <ChevronDown
                                className={`size-4 transition-transform duration-400 ease-in-out ${mostrarExtras ? 'rotate-180' : ''}`}
                            />
                        </Button>

                        <div
                            className={`grid transition-[grid-template-rows] duration-400 ease-in-out ${
                                mostrarExtras ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                            }`}
                        >
                            <div className="flex flex-col gap-3 overflow-hidden">
                                <div className="flex flex-col gap-3 border-t pt-2">{filtrosExtras}</div>
                            </div>
                        </div>
                    </>
                )}
            </CardContent>

            <CardFooter className="justify-between border-t px-5 py-2">
                <Button type="button" variant="outline" onClick={onLimpar}>
                    <X />
                    Limpar
                </Button>

                <Button
                    type="button"
                    onClick={onPesquisar}
                    disabled={pesquisarDesabilitado}
                >
                    <Search />
                    Pesquisar
                </Button>
            </CardFooter>
        </Card>
    );
};

export default Show;
