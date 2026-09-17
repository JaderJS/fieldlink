import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
	basePath: "/auth",
	baseURL: import.meta.env.VITE_AUTH_URL,
});
