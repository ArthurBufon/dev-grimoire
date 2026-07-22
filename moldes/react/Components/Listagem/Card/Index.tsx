// REACT
import type { ReactNode } from 'react';

// UTILS
import { cn } from '@/lib/utils';

type Props = {
    children: ReactNode;
    className?: string;
    colunaUnica?: boolean;
};

const Index = ({ children, className, colunaUnica = false }: Props) => {
    return (
        <div className={cn('mx-auto w-4/5', className)}>
            <div
                className={cn(
                    'grid w-full gap-4',
                    colunaUnica
                        ? 'grid-cols-1'
                        : '[grid-template-columns:repeat(auto-fit,minmax(min(100%,20rem),1fr))]',
                )}
            >
                {children}
            </div>
        </div>
    );
};

export default Index;