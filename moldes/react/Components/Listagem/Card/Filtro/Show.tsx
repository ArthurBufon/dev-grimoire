// REACT
import type { ReactNode, SubmitEvent } from 'react';

// UI
import { Search } from 'lucide-react';
import { Button } from '@/Components/Ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/Ui/Card';

// UTILS
import { cn } from '@/lib/utils';

type Props = {
    children: ReactNode;
    onSubmit: (evento: SubmitEvent<HTMLFormElement>) => void;
    botaoLabel?: string;
    acoes?: ReactNode;
    className?: string;
};

const Show = ({
    children,
    onSubmit,
    botaoLabel = 'Pesquisar',
    acoes,
    className,
}: Props) => {
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Search className="size-4" />
                    </span>
                    <span className="text-base tracking-tight">
                        Filtros de pesquisa
                    </span>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={onSubmit}
                    className="flex flex-col gap-3 sm:flex-row sm:items-end"
                >
                    <div className="grid flex-1 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] sm:items-end">
                        {children}
                    </div>
                    <div className="flex shrink-0 flex-wrap items-end gap-2">
                        {acoes}
                        <Button type="submit">
                            <Search />
                            {botaoLabel}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default Show;
