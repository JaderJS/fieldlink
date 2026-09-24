import { radio } from "./stations-BkSUnpAK.mjs";
import { createServerFn } from "./ssr.mjs";
import { createServerRpc } from "./createServerRpc-bI0488-W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DllcyTS1.js
var getCustomers_createServerFn_handler = createServerRpc({
	id: "c2d7642ddf03a7d487900639a32dc0ce3c948b4ae3a383fb6dadb00a67db776c",
	name: "getCustomers",
	filename: "src/features/customers/api.ts"
}, (opts) => getCustomers.__executeServer(opts));
var getCustomers = createServerFn({ method: "GET" }).handler(getCustomers_createServerFn_handler, async () => {
	return await radio.customers.getCustomers();
});
var upsertCustomer_createServerFn_handler = createServerRpc({
	id: "36bec7d5499ec438c211301120fba630bf92287265062e29295366407a9815be",
	name: "upsertCustomer",
	filename: "src/features/customers/api.ts"
}, (opts) => upsertCustomer.__executeServer(opts));
var upsertCustomer = createServerFn({ method: "POST" }).validator((data) => data).handler(upsertCustomer_createServerFn_handler, async ({ data }) => {
	return radio.customers.upsertCustomer(data);
});
var deleteCustomer_createServerFn_handler = createServerRpc({
	id: "71290b1b7391db43eedcf4f12dc9dc674879c2e57ad3d8d794eb86553bcc4fec",
	name: "deleteCustomer",
	filename: "src/features/customers/api.ts"
}, (opts) => deleteCustomer.__executeServer(opts));
var deleteCustomer = createServerFn({ method: "POST" }).validator((id) => id).handler(deleteCustomer_createServerFn_handler, async ({ data }) => {
	return radio.customers.deleteCustomer(data);
});
//#endregion
export { deleteCustomer_createServerFn_handler, getCustomers_createServerFn_handler, upsertCustomer_createServerFn_handler };
