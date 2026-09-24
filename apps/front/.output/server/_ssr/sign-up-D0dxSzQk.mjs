import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { authClient } from "./router-B1dUlNHz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sign-up-D0dxSzQk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SignUpForm() {
	const navigate = useNavigate();
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function handleSubmit(event) {
		event.preventDefault();
		setError(null);
		setLoading(true);
		const result = await authClient.signUp.email({
			name,
			email,
			password
		});
		setLoading(false);
		if (result.error) {
			setError(result.error.message ?? "Falha ao criar a conta");
			return;
		}
		await navigate({ to: "/dashboard" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: handleSubmit,
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Criar conta" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "text",
				placeholder: "Nome",
				value: name,
				onChange: (event) => setName(event.target.value),
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "email",
				placeholder: "E-mail",
				value: email,
				onChange: (event) => setEmail(event.target.value),
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "password",
				placeholder: "Senha",
				value: password,
				onChange: (event) => setPassword(event.target.value),
				required: true
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: error }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: loading,
				children: loading ? "Criando..." : "Criar conta"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/sign-in",
				children: "Já tenho uma conta"
			})
		]
	});
}
function SignUpPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignUpForm, {});
}
//#endregion
export { SignUpPage as component };
