import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
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
