import Elysia from "elysia";
import { coreAuth } from "@/core/auth/auth";
import { handleGroups } from "@/models/stations/groups";

export const handleStations = new Elysia({
	prefix: "/stations",
	tags: ["Estações"],
})
	.use(coreAuth)
	.use(handleGroups)
	.get(
		"/",
		async () => {
			return;
		},
		{ auth: true },
	);
