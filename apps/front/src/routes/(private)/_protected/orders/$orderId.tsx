import { createFileRoute } from "@tanstack/react-router";
import { UpsertOrder } from "@/features/orders/domain/upsert.order";

export const Route = createFileRoute("/(private)/_protected/orders/$orderId")({
	component: RouteComponent,
	loader: async ({ params }) => {},
});

function RouteComponent() {
	const { orderId } = Route.useParams();
	return <UpsertOrder />;
}
