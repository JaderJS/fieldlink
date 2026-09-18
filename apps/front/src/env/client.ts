import { z } from "zod";

const schema = z.object({
	VITE_API_URL: z.url(),
});

export const clientEnv = schema.parse(import.meta.env);
