// REACT
import type { ReactNode } from 'react';

// UTILS
import { cn } from '@/lib/utils';

type Props = {
    children: ReactNode;
    className?: string;
    width?: string | null;
};

const Show = ({ children, className, width = 'w-4/5' }: Props) => {
    return (
        <div
            className={cn(
                'mx-auto flex w-full flex-col gap-6',
                width === 'w-full' ? 'md:w-full' : width === 'w-4/5' ? 'md:w-4/5' : null,
                className,
            )}
        >
            {children}
        </div>
    );
};

export default Show;
