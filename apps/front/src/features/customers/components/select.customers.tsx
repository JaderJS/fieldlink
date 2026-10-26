import type { ComponentPropsWithRef } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useGetCustomers } from "../hooks/use.get.customers";

interface SelectCustomersProps
	extends Omit<ComponentPropsWithRef<typeof Select>, "onChange" | "value"> {
	value?: string;
	onValueChange?: (value: string) => void;
}

export const SelectCustomers = ({
	onValueChange,
	value,
	...props
}: SelectCustomersProps) => {
	const { data: customers } = useGetCustomers();

	const selectedCustomer = customers?.find((customer) => customer.id === value);

	return (
		<Select
			{...props}
			value={value}
			onValueChange={(value) => {
				if (value) {
					onValueChange?.(value as string);
				}
			}}
		>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Selecione um cliente">
					{selectedCustomer?.name}
				</SelectValue>
			</SelectTrigger>

			<SelectContent>
				<SelectGroup>
					<SelectLabel>Lista de clientes</SelectLabel>

					{customers?.map((customer) => (
						<SelectItem key={customer.id} value={customer.id}>
							{customer.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
