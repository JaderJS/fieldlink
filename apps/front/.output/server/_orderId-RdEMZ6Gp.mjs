import { require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { queryOptions, useQuery } from "./_libs/tanstack__react-query.mjs";
import { KEYS, Route$1, getCustomers } from "./_ssr/router-B1dUlNHz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_orderId-RdEMZ6Gp.js
var import_jsx_runtime = require_jsx_runtime();
var getCustomersOPTIONS = queryOptions({
	queryKey: KEYS.customers.findMany(),
	queryFn: getCustomers
});
function useGetCustomers() {
	return useQuery(getCustomersOPTIONS);
}
function UpsertOrder() {
	const { data: customers } = useGetCustomers();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "w-full h-full flex flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "h-1/4 flex flex-row gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 bg-muted-foreground/10 rounded-lg",
					children: " Total "
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-2 bg-muted-foreground/10 rounded-lg",
					children: ["Parcelamentos", " "]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-0 bg-amber-50 flex flex-row gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 bg-muted-foreground/10 rounded-lg",
						children: " Total "
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 bg-muted-foreground/10 rounded-lg",
						children: ["Parcelamentos", " "]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 bg-muted-foreground/10 rounded-lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Clientes" }), customers?.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: customer.name }, customer.id))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", { className: "flex-1 bg-red-300" })
		]
	});
}
function RouteComponent() {
	const { orderId } = Route$1.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpsertOrder, {});
}
//#endregion
export { RouteComponent as component };
