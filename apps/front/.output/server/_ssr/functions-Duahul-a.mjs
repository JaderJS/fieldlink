import { createServerFn, getRequestHeaders } from "./ssr.mjs";
import { boolean, object, string, url } from "../_libs/zod.mjs";
import { createServerRpc } from "./createServerRpc-bI0488-W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/functions-Duahul-a.js
var serverEnv = object({ API_URL: url() }).parse(process.env);
var serverSessionSchema = object({
	session: object({
		id: string(),
		expiresAt: string(),
		token: string(),
		createdAt: string(),
		updatedAt: string(),
		ipAddress: string().nullable(),
		userAgent: string().nullable(),
		userId: string()
	}),
	user: object({
		id: string(),
		name: string(),
		email: string(),
		emailVerified: boolean(),
		image: string().nullable(),
		createdAt: string(),
		updatedAt: string()
	})
});
var getServerSession_createServerFn_handler = createServerRpc({
	id: "cd33664f22a3f6072d75575f18b2abf93262d944511d91e5808350642e110e21",
	name: "getServerSession",
	filename: "src/lib/auth/functions.ts"
}, (opts) => getServerSession.__executeServer(opts));
var getServerSession = createServerFn({ method: "GET" }).handler(getServerSession_createServerFn_handler, async () => {
	const headers = getRequestHeaders();
	const response = await fetch(`${serverEnv.API_URL}/auth/get-session`, { headers: { cookie: headers.get("cookie") ?? "" } });
	if (!response.ok) return {
		data: null,
		error: {
			type: "http",
			status: response.status,
			message: `Failed to fetch session: ${response.status}`
		}
	};
	const result = serverSessionSchema.safeParse(await response.json());
	if (!result.success) return {
		data: null,
		error: {
			type: "validation",
			message: result.error.message,
			issues: result.error.issues.map((i) => ({
				path: i.path.map(String),
				message: i.message
			}))
		}
	};
	return {
		data: result.data,
		error: null
	};
});
//#endregion
export { getServerSession_createServerFn_handler };
