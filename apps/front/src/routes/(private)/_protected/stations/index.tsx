import { createFileRoute } from "@tanstack/react-router";
import { getStations } from "@/features/stations/api/api";
import { ViewStations } from "@/features/stations/domain/view.stations";

export const Route = createFileRoute("/(private)/_protected/stations/")({
	loader: async () => {
		const stations = await getStations();
		return {
			stations,
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { stations } = Route.useLoaderData();
	return <ViewStations stations={stations} />;
}
