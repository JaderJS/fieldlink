import { z } from "zod";

const schema = z.object({
	API_URL: z.url(),
});

export const serverEnv = schema.parse(process.env);
