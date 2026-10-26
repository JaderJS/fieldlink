import Elysia from "elysia";
import { coreAuth } from "@/core/auth/auth";
import { handleWorks } from "@/models/finances/works";

export const handleFinances = new Elysia({
	prefix: "/finances",
	tags: ["Finances"],
})
	.use(coreAuth)
	.use(handleWorks)
	.get(
		"/",
		async () => {
			return;
		},
		{ auth: true },
	);
