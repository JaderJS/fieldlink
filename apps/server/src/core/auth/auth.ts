import { openapi } from "@elysia/openapi";
import Elysia from "elysia";
import z from "zod";
import { auth, OpenAPI } from "../../lib/auth";

export const coreAuth = new Elysia({ name: "better-auth" })
	.use(
		openapi({
			mapJsonSchema: {
				zod: (schema: any) =>
					z.toJSONSchema(schema, {
						unrepresentable: "any",
						override: (ctx) => {
							if (ctx.zodSchema._zod.def.type === "date") {
								ctx.jsonSchema.type = "string";
								ctx.jsonSchema.format = "date-time";
							}
						},
					}),
			},
			documentation: {
				components: await OpenAPI.components,
				paths: await OpenAPI.getPaths(),
			},
		}),
	)
	.mount("/auth", auth.handler)
	.macro({
		auth: {
			async resolve({ status, request: { headers } }) {
				const session = await auth.api.getSession({
					headers,
				});

				if (!session) return status(401);

				return {
					user: session.user,
					session: session.session,
				};
			},
		},
	});
