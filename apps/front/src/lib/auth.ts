import { createAuthClient } from "better-auth/react";
import { clientEnv } from "@/env/client";

export const authClient = createAuthClient({
	basePath: "/auth",
	baseURL: clientEnv.VITE_API_URL,
	fetchOptions: {
		credentials: "include",
	},
});
