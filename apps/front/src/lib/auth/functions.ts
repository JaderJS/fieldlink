import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import z from "zod";
import { serverEnv } from "@/env/server";

const serverSessionSchema = z.object({
	session: z.object({
		id: z.string(),
		expiresAt: z.string(),
		token: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
		ipAddress: z.string().nullable(),
		userAgent: z.string().nullable(),
		userId: z.string(),
	}),
	user: z.object({
		id: z.string(),
		name: z.string(),
		email: z.string(),
		emailVerified: z.boolean(),
		image: z.string().nullable(),
		createdAt: z.string(),
		updatedAt: z.string(),
	}),
});

type ServerSession = z.infer<typeof serverSessionSchema>;

type GetServerSessionError =
	| { type: "http"; status: number; message: string }
	| {
			type: "validation";
			message: string;
			issues: { path: string[]; message: string }[];
	  };

type GetServerSessionResult =
	| { data: ServerSession; error: null }
	| { data: null; error: GetServerSessionError };

export const getServerSession = createServerFn({ method: "GET" }).handler(
	async (): Promise<GetServerSessionResult> => {
		const headers = getRequestHeaders();
		const response = await fetch(`${serverEnv.API_URL}/auth/get-session`, {
			headers: { cookie: headers.get("cookie") ?? "" },
		});

		if (!response.ok) {
			return {
				data: null,
				error: {
					type: "http",
					status: response.status,
					message: `Failed to fetch session: ${response.status}`,
				},
			};
		}

		const result = serverSessionSchema.safeParse(await response.json());
		if (!result.success) {
			return {
				data: null,
				error: {
					type: "validation",
					message: result.error.message,
					issues: result.error.issues.map((i) => ({
						path: i.path.map(String),
						message: i.message,
					})),
				},
			};
		}

		return { data: result.data, error: null };
	},
);
