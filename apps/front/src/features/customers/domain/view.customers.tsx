import type { Customer } from "@fieldlink/database/domain";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteCustomer } from "../hooks/use.delete.customer";
import { FormUpsertCustomer } from "./form.upsert.customer";

export const ViewCustomers = ({ customers }: { customers: Customer[] }) => {
	const { mutate: deleteCustomerFn } = useDeleteCustomer();

	const handleDelete = (id: string) => {
		deleteCustomerFn({ data: id });
	};

	return (
		<div>
			<h1>Customers</h1>

			{customers.length === 0 ? (
				<p>No customers found.</p>
			) : (
				<ul>
					{customers.map((customer) => (
						<li key={customer.id}>
							{customer.name}
							<Button
								variant={"destructive"}
								onClick={() => handleDelete(customer.id)}
							>
								<Trash />
							</Button>
						</li>
					))}
				</ul>
			)}

			<FormUpsertCustomer />
		</div>
	);
};
