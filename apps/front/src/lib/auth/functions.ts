import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { serverEnv } from "@/env/server";

export const getServerSession = createServerFn({
	method: "GET",
}).handler(async () => {
	const headers = getRequestHeaders();

	const response = await fetch(`${serverEnv.API_URL}/auth/get-session`, {
		headers: headers,
	});

	if (!response.ok) {
		return null;
	}

	return response.json();
});
