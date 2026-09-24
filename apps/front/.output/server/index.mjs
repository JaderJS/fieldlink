globalThis.__nitro_main__ = import.meta.url;
import { FastResponse, H3Core, HTTPError, composeMiddleware, createMatcherFromFind, defineHandler, defineLazyEventHandler, headers, memoizeRouteRulesMatcher, serve, toEventHandler } from "./_libs/h3+rou3+srvx.mjs";
import { HookableCore } from "./_libs/hookable.mjs";
import { decodePath, joinURL, withLeadingSlash, withoutTrailingSlash } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon-48x48.png": {
		"type": "image/png",
		"etag": "\"5ad-s1bC1f/N1kjj3yDcmyzSgQVey5M\"",
		"mtime": "2026-09-24T20:00:04.174Z",
		"size": 1453,
		"path": "../public/favicon-48x48.png"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"a55-Sou75dklK43jSdzJ0AUU+W5dw4g\"",
		"mtime": "2026-09-24T20:00:04.174Z",
		"size": 2645,
		"path": "../public/favicon.ico"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"239c-zJHca0rDFjMIogEfLpkcfErHC4I\"",
		"mtime": "2026-09-24T20:00:04.173Z",
		"size": 9116,
		"path": "../public/favicon.png"
	},
	"/linkptt.png": {
		"type": "image/png",
		"etag": "\"7106-gFuYFkpcc/QiytsLbN8XO2ItgIE\"",
		"mtime": "2026-09-24T20:00:04.174Z",
		"size": 28934,
		"path": "../public/linkptt.png"
	},
	"/linkptt_light.png": {
		"type": "image/png",
		"etag": "\"703c-XTMwyoygU8qo4oPXdE3LrtRr4zQ\"",
		"mtime": "2026-09-24T20:00:04.174Z",
		"size": 28732,
		"path": "../public/linkptt_light.png"
	},
	"/logo.png": {
		"type": "image/png",
		"etag": "\"490e-8XqnTOrp6BiSLPv4NXflb5EmMB0\"",
		"mtime": "2026-09-24T20:00:04.174Z",
		"size": 18702,
		"path": "../public/logo.png"
	},
	"/assets/_orderId-CJn6mm1f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4f9-1UtZMWMb64FLkVvw28z9ZqRL0z8\"",
		"mtime": "2026-09-24T20:00:03.493Z",
		"size": 1273,
		"path": "../public/assets/_orderId-CJn6mm1f.js"
	},
	"/assets/api-C2i1YK-4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ca2-3c1HI5XLIHfQ1+jqcdBES8XfPec\"",
		"mtime": "2026-09-24T20:00:03.493Z",
		"size": 15522,
		"path": "../public/assets/api-C2i1YK-4.js"
	},
	"/assets/app-BwBHyVVh.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"12bcb-CnAkcKF/63Hz5Gt5h0hDisQCh2I\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 76747,
		"path": "../public/assets/app-BwBHyVVh.css"
	},
	"/assets/createServerFn-DHGNH2ZA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8fcc-68c5pITk+zLQrRepRUjy8gkY7xM\"",
		"mtime": "2026-09-24T20:00:03.493Z",
		"size": 36812,
		"path": "../public/assets/createServerFn-DHGNH2ZA.js"
	},
	"/assets/customers-CQPNUYdA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f88-X69h3l4iILH7iMaJO/tifhFOZpU\"",
		"mtime": "2026-09-24T20:00:03.493Z",
		"size": 3976,
		"path": "../public/assets/customers-CQPNUYdA.js"
	},
	"/assets/dashboard-BK2hGHHm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e2-x3+l+ekb1Qh6+gHuIzwT37Vt4+A\"",
		"mtime": "2026-09-24T20:00:03.493Z",
		"size": 226,
		"path": "../public/assets/dashboard-BK2hGHHm.js"
	},
	"/assets/input-D6PCrMRR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25d7-mvEYM6zgYL5BejzuN1I6Vp5ZkII\"",
		"mtime": "2026-09-24T20:00:03.493Z",
		"size": 9687,
		"path": "../public/assets/input-D6PCrMRR.js"
	},
	"/assets/index-Bsg_PGpP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6d875-ilj69RBnew3dGEUxgaLKkk+X/ho\"",
		"mtime": "2026-09-24T20:00:03.492Z",
		"size": 448629,
		"path": "../public/assets/index-Bsg_PGpP.js"
	},
	"/assets/jetbrains-mono-cyrillic-wght-normal-D73BlboJ.woff2": {
		"type": "font/woff2",
		"etag": "\"2f4c-WiAGfn140d4QND3ayQWaCHF8rbE\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 12108,
		"path": "../public/assets/jetbrains-mono-cyrillic-wght-normal-D73BlboJ.woff2"
	},
	"/assets/jetbrains-mono-greek-wght-normal-Bw9x6K1M.woff2": {
		"type": "font/woff2",
		"etag": "\"232c-Dnz9DhH4c266e6TziU1pxRkV6FY\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 9004,
		"path": "../public/assets/jetbrains-mono-greek-wght-normal-Bw9x6K1M.woff2"
	},
	"/assets/jetbrains-mono-latin-ext-wght-normal-DBQx-q_a.woff2": {
		"type": "font/woff2",
		"etag": "\"3b5c-HLF7Wvs2Z1IA1cPRs6jnor8OUQ4\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 15196,
		"path": "../public/assets/jetbrains-mono-latin-ext-wght-normal-DBQx-q_a.woff2"
	},
	"/assets/jetbrains-mono-latin-wght-normal-B9CIFXIH.woff2": {
		"type": "font/woff2",
		"etag": "\"9dd4-5yd+cUUhzrXxdMyYebUeD0qml1M\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 40404,
		"path": "../public/assets/jetbrains-mono-latin-wght-normal-B9CIFXIH.woff2"
	},
	"/assets/jetbrains-mono-vietnamese-wght-normal-Bt-aOZkq.woff2": {
		"type": "font/woff2",
		"etag": "\"1d50-/Re0MyD6BV8h81wBPVijGZH5GBs\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 7504,
		"path": "../public/assets/jetbrains-mono-vietnamese-wght-normal-Bt-aOZkq.woff2"
	},
	"/assets/jsx-runtime-BkSabwWG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c1-VkW1xFbt56H2FC99QIi6PTzaFIo\"",
		"mtime": "2026-09-24T20:00:03.493Z",
		"size": 961,
		"path": "../public/assets/jsx-runtime-BkSabwWG.js"
	},
	"/assets/link-Bo7dPxVI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bdd-kL+AT0vWkkfCAl5jfuoFLwiUemY\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 11229,
		"path": "../public/assets/link-Bo7dPxVI.js"
	},
	"/assets/matchContext-BOH7GaXx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be-I4z1fD0Xvc85oxd7VL2ek3LRPHA\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 190,
		"path": "../public/assets/matchContext-BOH7GaXx.js"
	},
	"/assets/not-found-DIgawKw1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-RTB6YH5iXRKeXz1Sn6ZQ+vS0lnc\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 55,
		"path": "../public/assets/not-found-DIgawKw1.js"
	},
	"/assets/orders-DhQlflNH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-jkz00KjeuHIoPWq8vrOysTvkFn8\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 167,
		"path": "../public/assets/orders-DhQlflNH.js"
	},
	"/assets/preload-helper-9NcHzmiV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14b3-GiT3s/fFWp4T8btNocnkoiw549U\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 5299,
		"path": "../public/assets/preload-helper-9NcHzmiV.js"
	},
	"/assets/react-Biqg-U6H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ebf-gH02D69rQx5/7qM2rnLqBJ6aQdg\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 7871,
		"path": "../public/assets/react-Biqg-U6H.js"
	},
	"/assets/route-U6QLixp3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2704d-NINuuNVcLT2OL2Fu4/n/67C9lQ8\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 159821,
		"path": "../public/assets/route-U6QLixp3.js"
	},
	"/assets/routes-BfXzbmKc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"150-Z11dCCgnzd6CNi9rpjkyTSFRJ1Q\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 336,
		"path": "../public/assets/routes-BfXzbmKc.js"
	},
	"/assets/separator-CE3FwJHO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26b-BKXt0TMJIWRPUsyZoFem+H/Eq1g\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 619,
		"path": "../public/assets/separator-CE3FwJHO.js"
	},
	"/assets/sign-in-jbr88bX8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20ae-AtGSwzDTMLlgtbckfB72JdaCjTQ\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 8366,
		"path": "../public/assets/sign-in-jbr88bX8.js"
	},
	"/assets/sign-up-BgET9z_e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4e6-Cu3yokgcoUad+YjdVhXeBlQDcJQ\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 1254,
		"path": "../public/assets/sign-up-BgET9z_e.js"
	},
	"/assets/useBaseQuery-DJ5bQb0q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f3e-1DxUlrqUOpSB4dcal9/gfHMCwiw\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 7998,
		"path": "../public/assets/useBaseQuery-DJ5bQb0q.js"
	},
	"/assets/stations-BjA4bQ77.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-/u1NgqhgyEz1wJAaOWG6K1bShYE\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 355,
		"path": "../public/assets/stations-BjA4bQ77.js"
	},
	"/assets/useNavigate-DTy-TURo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-FB3xRV5ZNIyNvbsPl53tpVmbtTc\"",
		"mtime": "2026-09-24T20:00:03.494Z",
		"size": 251,
		"path": "../public/assets/useNavigate-DTy-TURo.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region ../../node_modules/.bun/nitro@3.0.260903-beta/node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = {
		route: "/assets/**",
		rank: 0,
		rules: [{
			name: "headers",
			route: "/assets/**",
			handler: headers,
			options: { "cache-control": "public, max-age=31536000, immutable" }
		}]
	};
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		let s = p.split("/");
		if (s.length > 1 && s[s.length - 1] === "") {
			s.pop();
			p = p.slice(0, -1);
		}
		if (s.length > 1) {
			if (s[1] === "assets") r.push({
				data: $0,
				params: { "_": p.slice(8) }
			});
		}
		return r.reverse();
	};
})();
var _lazy_ab854c336f70f079 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_ab854c336f70f079
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region ../../node_modules/.bun/nitro@3.0.260903-beta/node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => {
		event.context.routeRules = getRouteRules(event.req.method, event.url.pathname).routeRules;
		return findRoute(event.req.method, event.url.pathname);
	};
	h3App["~middleware"].push(createRouteRulesMiddleware());
	h3App["~middleware"].push(...globalMiddleware);
	return h3App;
}
//#endregion
//#region ../../node_modules/.bun/nitro@3.0.260903-beta/node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
var _matchRouteRules;
function getRouteRules(method, pathname) {
	return (_matchRouteRules ??= memoizeRouteRulesMatcher(createMatcherFromFind(findRouteRules)))(method, pathname);
}
function createRouteRulesMiddleware() {
	const composed = /* @__PURE__ */ new WeakMap();
	const middleware = (event, next) => {
		const ruleMiddleware = getRouteRules(event.req.method, event.url.pathname).routeRuleMiddleware;
		if (ruleMiddleware.length === 0) return next();
		let chain = composed.get(ruleMiddleware);
		if (!chain) {
			chain = composeMiddleware(ruleMiddleware);
			composed.set(ruleMiddleware, chain);
		}
		return chain(event, next);
	};
	return markUntraced(middleware);
}
function markUntraced(middleware) {
	middleware.__traced__ = true;
	return middleware;
}
//#endregion
//#region ../../node_modules/.bun/nitro@3.0.260903-beta/node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region ../../node_modules/.bun/nitro@3.0.260903-beta/node_modules/nitro/dist/runtime/internal/shutdown.mjs
function setupCloseHooks(server) {
	const closeServer = server.close.bind(server);
	let closeHooks;
	server.close = (closeActiveConnections) => closeServer(closeActiveConnections).finally(() => closeHooks ??= callCloseHooks());
}
async function callCloseHooks() {
	try {
		await useNitroHooks().callHook("close");
	} catch (error) {
		console.error("[nitro] Error while calling `close` hooks:", error);
	}
}
//#endregion
//#region ../../node_modules/.bun/nitro@3.0.260903-beta/node_modules/nitro/dist/presets/bun/runtime/bun.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var _fetch = useNitroApp().fetch;
setupCloseHooks(serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: _fetch,
	bun: { websocket: void 0 },
	plugins: [...tracingSrvxPlugins]
}));
trapUnhandledErrors();
var bun_default = {};
//#endregion
export { bun_default as default };
