// REACT
import type { ReactNode } from 'react';

// UTILS
import { cn } from '@/lib/utils';

type Props = {
    cabecalho: ReactNode[];
    children: ReactNode;
    className?: string;
    selecionavel?: boolean;
};

const Index = ({ cabecalho, children, className, selecionavel = false }: Props) => {
    return (
        <div className={cn('w-full overflow-x-auto rounded-xl border border-input shadow-sm', className)}>
            <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <tr>
                        {selecionavel && (
                            <th scope="col" className="px-4 py-3 font-medium">
                                <span className="sr-only">Seleção</span>
                            </th>
                        )}
                        {cabecalho.map((celula, indice) => (
                            <th key={indice} className="px-4 py-3 font-medium">
                                {celula}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">{children}</tbody>
            </table>
        </div>
    );
};

export default Index;
