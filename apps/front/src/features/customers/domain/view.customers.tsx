import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectCustomers } from "../components/select.customers";
import { UpsertCustomer } from "../components/upsert.customer";
import { useDeleteCustomer } from "../hooks/use.delete.customer";
import { FormUpsertCustomer } from "./form.upsert.customer";

export const ViewCustomers = ({ customers }: { customers: any[] }) => {
	const { mutate: deleteCustomerFn } = useDeleteCustomer();

	const handleDelete = (id: string) => {
		deleteCustomerFn({ data: id });
	};

	return (
		<div>
			<h1>Customers</h1>

			<UpsertCustomer>Novo cliente</UpsertCustomer>

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
							<UpsertCustomer customer={customer}>
								<Edit />
							</UpsertCustomer>
						</li>
					))}
				</ul>
			)}

			<FormUpsertCustomer />
		</div>
	);
};
