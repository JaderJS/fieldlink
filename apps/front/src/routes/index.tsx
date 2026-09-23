import { createFileRoute } from "@tanstack/react-router";
import { getCustomersOPTIONS } from "@/features/customers/api";

export const Route = createFileRoute("/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		await context.queryClient.query(getCustomersOPTIONS);
	},
});

function RouteComponent() {
	return (
		<div className="h-dvh w-full">
			<div className="h-full flex flex-col justify-center items-center">
				<p className="text-4xl">FIELDLINK</p>
				<p>W.I.P</p>
			</div>
		</div>
	);
}
