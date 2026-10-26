import { z } from "zod";

export const errorResponse = z.object({
	error: z.object({
		code: z.string(),
		message: z.string(),
		details: z.optional(z.unknown()),
	}),
});

export const errorResponses = {
	400: errorResponse,
	401: errorResponse,
	403: errorResponse,
	404: errorResponse,
	409: errorResponse,
	422: errorResponse,
	500: errorResponse,
} as const;
