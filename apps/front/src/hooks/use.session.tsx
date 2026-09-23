import { authClient } from "@/lib/auth";

export const useSession = () => {
	const session = authClient.useSession();
	return session;
};
