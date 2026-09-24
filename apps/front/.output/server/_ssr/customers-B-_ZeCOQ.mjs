import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { useMutation, useQueryClient, useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { Button$1, KEYS, deleteCustomer, getCustomersOPTIONS, upsertCustomer } from "./router-B1dUlNHz.mjs";
import { Input$1 } from "./input-BUi3dJv-.mjs";
import { Trash } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-B-_ZeCOQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var useDeleteCustomer = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteCustomer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: KEYS.customers.findMany() });
		}
	});
};
var useUpsertCustomer = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: upsertCustomer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: KEYS.customers.findMany() });
		}
	});
};
function FormUpsertCustomer() {
	const [name, setName] = (0, import_react.useState)("");
	const { mutate: upsertCustomerFn } = useUpsertCustomer();
	async function handleSubmit(event) {
		event.preventDefault();
		if (!name.trim()) return;
		upsertCustomerFn({ data: { name: name.trim() } });
		setName("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
			value: name,
			onChange: (event) => setName(event.target.value),
			placeholder: "Customer name"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "submit",
			children: "Save"
		})]
	});
}
var ViewCustomers = ({ customers }) => {
	const { mutate: deleteCustomerFn } = useDeleteCustomer();
	const handleDelete = (id) => {
		deleteCustomerFn({ data: id });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Customers" }),
		customers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No customers found." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: customers.map((customer) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [customer.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
			variant: "destructive",
			onClick: () => handleDelete(customer.id),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash, {})
		})] }, customer.id)) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormUpsertCustomer, {})
	] });
};
function RouteComponent() {
	const { data: customers } = useSuspenseQuery(getCustomersOPTIONS);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewCustomers, { customers });
}
//#endregion
export { RouteComponent as component };
