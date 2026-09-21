import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/_protected/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="h-full w-full flex justify-center items-center">
			<span>Dashboard</span>
		</div>
	);
}
