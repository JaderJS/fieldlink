import { useState } from "react";
import { Input } from "@/components/ui/input";
import { upsertCustomer } from "../api";
import { useUpsertCustomer } from "../hooks/use.upsert.customer";

export function FormUpsertCustomer() {
	const [name, setName] = useState("");

	const { mutate: upsertCustomerFn } = useUpsertCustomer();

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!name.trim()) {
			return;
		}

		upsertCustomerFn({
			data: {
				name: name.trim(),
			},
		});

		setName("");
	}

	return (
		<form onSubmit={handleSubmit}>
			<Input
				value={name}
				onChange={(event) => setName(event.target.value)}
				placeholder="Customer name"
			/>

			<button type="submit">Save</button>
		</form>
	);
}
