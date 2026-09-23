import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getCustomersOPTIONS } from "@/features/customers/api";
import { ViewCustomers } from "@/features/customers/domain/view.customers";

export const Route = createFileRoute("/(private)/_protected/customers/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.query(getCustomersOPTIONS);
	},
});

function RouteComponent() {
	const { data: customers } = useSuspenseQuery(getCustomersOPTIONS);

	return <ViewCustomers customers={customers} />;
}
