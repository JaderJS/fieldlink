import { createFileRoute } from "@tanstack/react-router";
import { InputFileDebug } from "@/features/upload/components/debug";

export const Route = createFileRoute("/(public)/debug/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<InputFileDebug />
		</div>
	);
}
