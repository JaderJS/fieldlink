import { z } from "zod";

const env = z
	.object({
		BETTER_AUTH_SECRET: z.string().min(1),
		BETTER_AUTH_URL: z.url(),
		DATABASE_URL: z.url().refine((url) => url.startsWith("postgresql://"), {
			message: "DATABASE_URL must be a PostgreSQL URL",
		}),
	})
	.parse(process.env);

export { env };
