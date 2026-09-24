import { useGetCustomers } from "@/features/customers/hooks/use.get.customers";

export function UpsertOrder() {
	const { data: customers } = useGetCustomers();
	return (
		<section className="w-full h-full flex flex-col gap-2">
			<div className="h-1/4 flex flex-row gap-6">
				<div className="flex-1 bg-muted-foreground/10 rounded-lg"> Total </div>
				<div className="flex-2 bg-muted-foreground/10 rounded-lg">
					Parcelamentos{" "}
				</div>
			</div>

			<div className="flex-0 bg-amber-50 flex flex-row gap-6">
				<div className="flex-1 bg-muted-foreground/10 rounded-lg"> Total </div>
				<div className="flex-1 bg-muted-foreground/10 rounded-lg">
					Parcelamentos{" "}
				</div>
				<div className="flex-1 bg-muted-foreground/10 rounded-lg">
					<p>Clientes</p>
					{customers?.map((customer) => (
						<div key={customer.id}>{customer.name}</div>
					))}
				</div>
			</div>
			<form className="flex-1 bg-red-300"></form>
		</section>
	);
}
