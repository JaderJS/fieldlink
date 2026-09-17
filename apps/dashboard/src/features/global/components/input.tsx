import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input as InputBase } from '@/components/ui/input';

const moneyFormatter = Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

type CurrencyInputProps = {
    className?: string;
    defaultValue?: string | number
    onCallback?: (value: number) => void;
};

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & CurrencyInputProps;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, defaultValue = "", onCallback, ...props }, ref) => {
        const val = typeof defaultValue === 'number' ? defaultValue : Number(defaultValue.replace(/\D/g, ""))
        const formattedDefault = moneyFormatter.format(val);
        const [value, setValue] = React.useReducer(
            (_: any, next: string) => {
                const digits = next.replace(/\D/g, "");
                return moneyFormatter.format(Number(digits) / 100);
            },
            formattedDefault
        );

        function handleChange(formattedValue: string) {
            const digits = formattedValue.replace(/\D/g, "");
            const realValue = Number(digits) / 100;
            onCallback && onCallback(realValue);
        }

        return (
            <InputBase
                ref={ref}
                className={cn('w-full text-yellow-700 dark:text-yellow-400 ', className)}
                value={value}
                onChange={(e: any) => {
                    setValue(e.target.value);
                    handleChange(e.target.value);
                }}
                {...props}
            />
        );
    }
);

Input.displayName = 'CurrencyInput';

export { Input };