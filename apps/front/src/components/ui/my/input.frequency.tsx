// components/frequency-input.tsx
import { Input } from "@/components/ui/input";
import { maskMHz, padMHz } from "@/lib/utils";

type Props = Omit<React.ComponentProps<typeof Input>, "onChange"> & {
	onValueChange: (value: string) => void;
};

export const InputFrequency = ({
	value,
	onValueChange,
	onBlur,
	...props
}: Props) => (
	<div className="relative">
		<Input
			{...props}
			value={value}
			inputMode="decimal"
			placeholder="000,000MHz"
			autoComplete="off"
			className="pr-14"
			onChange={(e) => onValueChange(maskMHz(e.target.value))}
			onBlur={(e) => {
				onValueChange(padMHz(String(value ?? "")));
				onBlur?.(e);
			}}
		/>
		<span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-muted-foreground text-sm">
			MHz
		</span>
	</div>
);
