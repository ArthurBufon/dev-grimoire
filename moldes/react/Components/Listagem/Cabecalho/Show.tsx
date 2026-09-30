// REACT
import { Children, type ElementType, type ReactNode } from 'react';

// UI
import { Button } from '@/Components/Ui/Button';

// UTILS
import { cn } from '@/lib/utils';

type Props = {
    titulo: string;
    icone: ElementType;
    acao?: ReactNode;
    className?: string;
};

const Show = ({ titulo, icone: Icone, acao, className }: Props) => {
    const multiplasAcoes = Children.count(acao) > 1;

    return (
        <div
            className={cn(
                'flex flex-col gap-4 md:flex-row md:items-center md:justify-between',
                className,
            )}
        >
            <h1
                className={cn(
                    'items-center gap-2 text-2xl font-semibold',
                    acao ? 'hidden md:flex' : 'flex',
                )}
            >
                <Icone className="size-6 shrink-0 text-primary" aria-hidden />
                {titulo}
            </h1>
            {acao &&
                (multiplasAcoes ? (
                    <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
                        {acao}
                    </div>
                ) : (
                    <Button asChild className="w-full md:w-auto">
                        {acao}
                    </Button>
                ))}
        </div>
    );
};

export default Show;
