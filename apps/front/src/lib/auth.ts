import { createAuthClient } from "better-auth/client";
import { clientEnv } from "@/env/client";

export const authClient = createAuthClient({
	basePath: "/auth",
	baseURL: clientEnv.VITE_API_URL,
});
