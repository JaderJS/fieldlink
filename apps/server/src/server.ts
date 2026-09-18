import cors from "@elysia/cors";
import { openapi } from "@elysia/openapi";
import { Elysia } from "elysia";
import { env } from "./env";
import { auth, OpenAPI } from "./lib/auth";

const app = new Elysia()
	.get("/", () => "Hello Elysia")
	.use(
		cors({
			origin: [
				"http://localhost:3000",
				"http://192.168.0.140:9018",
				"https://app.fieldlink.net.br",
			],
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.use(
		openapi({
			documentation: {
				components: await OpenAPI.components,
				paths: await OpenAPI.getPaths(),
			},
		}),
	)
	.mount("/auth", auth.handler)
	.listen(3333);

console.log(`Starting server...`);

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
	`\n📔 OpenAPI documentation: http://${app.server?.hostname}:${app.server?.port}/openapi`,
	`\n SECRETS: ${JSON.stringify(env, null, 2)}`,
);
