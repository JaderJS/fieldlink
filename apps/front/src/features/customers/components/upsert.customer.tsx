import type { Customer } from "@fieldlink/application/types";
import { useForm } from "@tanstack/react-form";
import type { ReactElement } from "react";
import { id } from "zod/v4/locales";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpsertCustomer } from "../hooks/use.upsert.customer";

export const UpsertCustomer = ({
	customer,
	children,
}: {
	customer?: Customer;
	children: ReactElement;
}) => {
	const title = customer ? "Editar cliente" : "Crie um novo cliente";
	const description = customer
		? "Edite os dados do cliente"
		: "Adicione os dados do cliente";
	const submitText = customer ? "Salvar" : "Criar";

	const { mutateAsync: upsertCustomerFn } = useUpsertCustomer();

	const form = useForm({
		defaultValues: {
			name: customer?.name ?? "",
			id: customer?.id ?? "",
		},
		onSubmit: async ({ value: { id, name } }) => {
			upsertCustomerFn({ data: { id, name } });
		},
	});

	return (
		<Dialog>
			<DialogTrigger render={<Button>{children}</Button>} />

			<DialogContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col items-center justify-center">
						<form.Field
							name="id"
							children={(field) => {
								return (
									<>
										<label htmlFor={field.name}>First name</label>
										<Input
											readOnly
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
									</>
								);
							}}
						/>
						<form.Field
							name="name"
							children={(field) => {
								return (
									<>
										<label htmlFor={field.name}>First name</label>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
										/>
									</>
								);
							}}
						/>
					</div>
					<DialogFooter className="sm:justify-start">
						<DialogClose render={<Button type="submit">{submitText}</Button>} />
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
