import { cors } from "@elysia/cors";
import cron from "@elysia/cron";
import { garbageCollectorService } from "@fieldlink/storage";
import { Elysia } from "elysia";
import { coreAuth } from "./core/auth/auth";
import { env } from "./env";
import { handleError } from "./lib/error";
import { handleStorageObject } from "./lib/upload";
import { handleChannels } from "./models/channels";
import { handleCustomers } from "./models/customers";
import { handleFinances } from "./models/finances";

const app = new Elysia()
	.use(handleError)
	.get("/", () => {
		msg: "Heellooo my boos!!";
	})
	.use(
		cron({
			name: "storage-garbage-collector",
			// pattern: "*/30 * * * * *",
			pattern: "0 1 0 * * 0",
			timezone: "America/Cuiaba",
			async run() {
				console.info("[STORAGE GARBAGE COLLECTOR] starting...");
				const msg = await garbageCollectorService.run();
				console.info(msg);
				console.info("[STORAGE GARBAGE COLLECTOR] end.");
			},
		}),
	)
	.use(
		cors({
			origin: [
				"http://localhost:3000",
				"http://192.168.0.140:9018",
				"https://dashboard.fieldlink.net.br",
				"https://app.fieldlink.net.br",
				"https://server.fieldlink.net.br",
				"http://server:9018",
			],
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
		}),
	)
	.use(coreAuth)
	.use(handleStorageObject)
	.use(handleCustomers)
	.use(handleChannels)
	.use(handleFinances)
	.listen(3333);

console.log(
	`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
	`\n📔 OpenAPI documentation: http://${app.server?.hostname}:${app.server?.port}/openapi`,
	`\n SECRETS: ${JSON.stringify(env, null, 2)}`,
);
