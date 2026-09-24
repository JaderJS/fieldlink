import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Link, useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { cva } from "../_libs/class-variance-authority+clsx.mjs";
import { cn } from "../_libs/cn.mjs";
import { Button$1, authClient } from "./router-B1dUlNHz.mjs";
import { Input$1 } from "./input-BUi3dJv-.mjs";
import { Briefcase } from "../_libs/lucide-react.mjs";
import { Separator$1 } from "./separator-BTrxNC1Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sign-in-CellCrxJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card",
		"data-size": size,
		className: cn("group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-header",
		className: cn("group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-title",
		className: cn("font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "card-content",
		className: cn("px-(--card-spacing)", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		"data-slot": "label",
		className: cn("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
		...props
	});
}
function FieldGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "field-group",
		className: cn("group/field-group @container/field-group flex w-full flex-col gap-5 data-[slot=checkbox-group]:gap-3 *:data-[slot=field-group]:gap-4", className),
		...props
	});
}
var fieldVariants = cva("group/field flex w-full gap-2 data-[invalid=true]:text-destructive", {
	variants: { orientation: {
		vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
		horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
		responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px"
	} },
	defaultVariants: { orientation: "vertical" }
});
function Field({ className, orientation = "vertical", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		role: "group",
		"data-slot": "field",
		"data-orientation": orientation,
		className: cn(fieldVariants({ orientation }), className),
		...props
	});
}
function FieldLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
		"data-slot": "field-label",
		className: cn("group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-[>[data-slot=field]]:not-has-[:disabled,[data-disabled]]:hover:bg-muted/50 has-[>[data-slot=field]]:has-[:focus-visible]:border-ring has-[>[data-slot=field]]:has-[:focus-visible]:ring-3 has-[>[data-slot=field]]:has-[:focus-visible]:ring-ring/50 *:data-[slot=field]:p-2.5 dark:has-data-checked:border-primary/20 dark:has-data-checked:bg-primary/10", "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col", className),
		...props
	});
}
function FieldDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		"data-slot": "field-description",
		className: cn("text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-1.5", "last:mt-0 nth-last-2:-mt-1", "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary", className),
		...props
	});
}
function FieldSeparator({ children, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		"data-slot": "field-separator",
		"data-content": !!children,
		className: cn("relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, { className: "absolute inset-0 top-1/2" }), children && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "relative mx-auto block w-fit bg-background px-2 text-muted-foreground",
			"data-slot": "field-separator-content",
			children
		})]
	});
}
var GoogleIcon = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	xmlns: "http://www.w3.org/2000/svg",
	viewBox: "0 0 24 24",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "google logo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
		d: "M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z",
		fill: "currentColor"
	})]
});
function SignInForm({ className, ...props }) {
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");
		if (typeof email !== "string" || typeof password !== "string") return;
		setError(null);
		setLoading(true);
		try {
			const formData = new FormData(event.currentTarget);
			const email = formData.get("email");
			const password = formData.get("password");
			if (typeof email !== "string" || typeof password !== "string") {
				setError("Email e senha são obrigatórios.");
				return;
			}
			const result = await authClient.signIn.email({
				email,
				password
			});
			if (result.error) {
				setError(result.error.message ?? "Email ou senha inválidos.");
				return;
			}
			await navigate({ to: "/dashboard" });
		} catch {
			setError("Não foi possível entrar. Tente novamente.");
		} finally {
			setLoading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-6", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-xl",
				children: "Bem-vindo de volta"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Login com sua conta Google" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
			onSubmit: handleSubmit,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					variant: "outline",
					type: "button",
					disabled: loading,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {})
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldSeparator, {
					className: "*:data-[slot=field-separator-content]:bg-card",
					children: "Ou continue com"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
					htmlFor: "email",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					id: "email",
					name: "email",
					type: "email",
					autoComplete: "email",
					disabled: loading,
					placeholder: "fieldlink@example.com",
					required: true
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "password",
						children: "Senha"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/sign-in",
						className: "ml-auto text-sm underline-offset-4 hover:underline",
						children: "Esqueceu sua senha?"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					id: "password",
					name: "password",
					type: "password",
					autoComplete: "current-password",
					disabled: loading,
					placeholder: "*********",
					required: true
				})] }),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, {
					className: "text-center text-destructive",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					type: "submit",
					disabled: loading,
					children: loading ? "Entrando..." : "Login"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldDescription, {
					className: "text-center",
					children: ["Ainda não tem conta? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/sign-up",
						children: "Inscreva-se"
					})]
				})] })
			] })
		}) })] })
	});
}
function SignInPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-svh lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4 p-6 md:p-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center gap-2 md:justify-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2 font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4" })
					}), "Fieldlink."]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full max-w-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignInForm, {})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative hidden bg-muted lg:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" })
		})]
	});
}
//#endregion
export { SignInPage as component };
