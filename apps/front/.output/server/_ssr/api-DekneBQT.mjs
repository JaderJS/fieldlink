import { radio } from "./stations-BkSUnpAK.mjs";
import { createServerFn } from "./ssr.mjs";
import { createServerRpc } from "./createServerRpc-bI0488-W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DekneBQT.js
var getStations_createServerFn_handler = createServerRpc({
	id: "377a79c83ebee1c882603c04c55513dc8dc4187df5afd49c2045d82412f61386",
	name: "getStations",
	filename: "src/features/stations/api/api.ts"
}, (opts) => getStations.__executeServer(opts));
var getStations = createServerFn({ method: "GET" }).handler(getStations_createServerFn_handler, async () => {
	return radio.stations.getStations();
});
var createStation_createServerFn_handler = createServerRpc({
	id: "eaed7870e51636405d7a4bb8b2ea19ba857d845d137abaed0eca71fbbe7dad9b",
	name: "createStation",
	filename: "src/features/stations/api/api.ts"
}, (opts) => createStation.__executeServer(opts));
var createStation = createServerFn({ method: "POST" }).validator((data) => data).handler(createStation_createServerFn_handler, async ({ data }) => {
	return radio.stations.createStation(data);
});
//#endregion
export { createStation_createServerFn_handler, getStations_createServerFn_handler };
