import { require_jsx_runtime } from "../_libs/@base-ui/react+[...].mjs";
import { cn } from "../_libs/cn.mjs";
import { Route } from "./router-B1dUlNHz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stations-CxvR-zo2.js
var import_jsx_runtime = require_jsx_runtime();
function ViewStations({ className, stations, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(className),
		...props,
		children: (stations ?? []).map((station) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: station.id }, station.id))
	});
}
function RouteComponent() {
	const { stations } = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewStations, { stations });
}
//#endregion
export { RouteComponent as component };
