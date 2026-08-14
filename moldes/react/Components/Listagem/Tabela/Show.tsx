// REACT
import type { ReactNode } from 'react';

// UI
import { Switch } from '@/Components/Ui/Switch';

// UTILS
import { cn } from '@/lib/utils';

type Props = {
    selecionado: boolean;
    onToggleSelecao: (selecionado: boolean) => void;
    celulas: ReactNode[];
    className?: string;
};

const Show = ({ selecionado, onToggleSelecao, celulas, className }: Props) => {
    return (
        <tr className={cn('transition-colors hover:bg-muted/40', className)}>
            <td className="px-4 py-3">
                <Switch checked={selecionado} onCheckedChange={onToggleSelecao} aria-label="Selecionar registro" />
            </td>
            {celulas.map((celula, indice) => (
                <td key={indice} className="px-4 py-3">
                    {celula}
                </td>
            ))}
        </tr>
    );
};

export default Show;
