import { z } from "zod";

const env = z
	.object({
		BETTER_AUTH_SECRET: z.string(),
		BETTER_AUTH_URL: z.string(),
		DATABASE_URL: z.url(),
	})
	.parse(process.env);

export { env };
