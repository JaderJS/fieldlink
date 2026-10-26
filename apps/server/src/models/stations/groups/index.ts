import Elysia from "elysia";
import { coreAuth } from "@/core/auth/auth";

export const handleGroups = new Elysia({
	prefix: "/channels/groups",
})
	.use(coreAuth)
	.get(
		"/",
		async () => {
			return;
		},
		{ auth: true },
	);
