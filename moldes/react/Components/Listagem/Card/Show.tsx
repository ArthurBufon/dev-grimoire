// UI
import { Card, CardContent } from '@/Components/Ui/Card';
import type { LucideIcon } from 'lucide-react';

// REACT
import type { ReactNode } from 'react';

type Props = {
    icone: LucideIcon;
    titulo: string;
    tituloPrefixo?: ReactNode;
    detalhes?: Array<string | null | undefined>;
    acoes?: ReactNode;
};

const Show = ({ icone: Icone, titulo, tituloPrefixo, detalhes = [], acoes }: Props) => {
    const detalhesVisiveis = detalhes.filter(
        (detalhe): detalhe is string => Boolean(detalhe),
    );

    return (
        <Card className="h-full w-full py-4 shadow">
            <CardContent className="flex h-full items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icone className="size-5" />
                </div>

                <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex min-w-0 items-center gap-2">
                        {tituloPrefixo}
                        <p className="truncate font-semibold">{titulo}</p>
                    </div>

                    {detalhesVisiveis.map((detalhe, indice) => (
                        <p
                            key={`${indice}-${detalhe}`}
                            className="text-muted-foreground truncate text-sm"
                        >
                            {detalhe}
                        </p>
                    ))}

                    {acoes && (
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            {acoes}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default Show;