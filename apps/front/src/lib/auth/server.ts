import { getRequestHeaders } from "@tanstack/react-start/server";
import { authClient } from "@/lib/auth";

export async function getServerSession() {
	const headers = getRequestHeaders();
	return authClient.getSession({
		fetchOptions: { headers },
	});
}
