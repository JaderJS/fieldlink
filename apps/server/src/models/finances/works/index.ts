import Elysia from "elysia";
import { coreAuth } from "@/core/auth/auth";

export const handleWorks = new Elysia({
	prefix: "/works",
	tags: ["Works"],
})
	.use(coreAuth)
	.get(
		"/",
		async () => {
			return;
		},
		{ auth: true },
	);
