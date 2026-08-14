import { cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const switchVariants = cva(
    'peer inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
);

type Props = {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
} & Omit<React.ComponentProps<'button'>, 'onChange' | 'checked'>;

const Switch = ({ checked, onCheckedChange, disabled, className, ...props }: Props) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            data-state={checked ? 'checked' : 'unchecked'}
            data-slot="switch"
            disabled={disabled}
            onClick={() => onCheckedChange(!checked)}
            className={cn(switchVariants(), className)}
            {...props}
        >
            <span
                data-state={checked ? 'checked' : 'unchecked'}
                className="pointer-events-none block size-4 translate-x-0.5 rounded-full bg-background shadow-xs transition-transform data-[state=checked]:translate-x-4"
            />
        </button>
    );
};

export { Switch, switchVariants };
