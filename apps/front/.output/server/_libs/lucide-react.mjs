import { __toESM } from "../_runtime.mjs";
import { require_react } from "./@base-ui/react+[...].mjs";
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string?.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/shared/src/utils/toLucideIconData.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function toLucideIconData(iconName, iconNode, aliases = []) {
	if (iconNode == null) throw new Error("[lucide]: iconNode is required when icon name is used");
	return {
		name: toKebabCase(iconName),
		size: 24,
		node: iconNode,
		...aliases.length > 0 ? { aliases } : {}
	};
}
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => {
	let out = "";
	let upperNext = false;
	for (const ch of string) {
		if (ch === "-" || ch === "_" || ch <= " ") {
			upperNext = out.length > 0;
			continue;
		}
		if (out.length === 0) out += ch.toLowerCase();
		else out += upperNext ? ch.toUpperCase() : ch;
		upperNext = false;
	}
	return out;
};
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/shared/src/build/defaultAttributes.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	"stroke-width": 2,
	"stroke-linecap": "round",
	"stroke-linejoin": "round"
};
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconNode.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function isDefined(value) {
	return value !== null && value !== void 0;
}
function buildLucideIconNode(icon, params = {}) {
	const attributeNames = params.attributeNames ?? {};
	const getAttributeName = (attributeName) => attributeNames[attributeName] ?? attributeName;
	const viewBoxWidth = icon.size ?? icon.width ?? defaultAttributes["width"];
	const viewBoxHeight = icon.size ?? icon.height ?? defaultAttributes["height"];
	const aliasClassNames = icon.aliases?.filter((alias) => typeof alias === "string" && alias.trim() !== "").map((alias) => `lucide-${alias}`) ?? [];
	const iconClassNames = [...icon.name ? [`lucide-${icon.name}`] : [], ...aliasClassNames];
	const classNamesFromClassName = params.className?.split(" ").filter(Boolean) ?? [];
	const className = params.includeDefaultClasses === false ? mergeClasses(...classNamesFromClassName) : mergeClasses("lucide", ...iconClassNames, ...classNamesFromClassName);
	const calculatedStrokeWidth = params.absoluteStrokeWidth ? Number(params.strokeWidth ?? defaultAttributes["stroke-width"]) * Number(icon.size ?? icon.width ?? defaultAttributes["width"]) / Number(params.size ?? params.width ?? defaultAttributes["width"]) : params.strokeWidth ?? defaultAttributes["stroke-width"];
	return [
		"svg",
		{
			...Object.entries(defaultAttributes).reduce((attrs, [attrName, value]) => {
				attrs[getAttributeName(attrName)] = value;
				return attrs;
			}, {}),
			..."color" in params && params.color && { [getAttributeName("stroke")]: params.color },
			..."size" in params && isDefined(params.size) && {
				[getAttributeName("width")]: params.size,
				[getAttributeName("height")]: params.size
			},
			..."width" in params && isDefined(params.width) && { [getAttributeName("width")]: params.width },
			..."height" in params && isDefined(params.height) && { [getAttributeName("height")]: params.height },
			[getAttributeName("stroke-width")]: calculatedStrokeWidth,
			...className && { [getAttributeName("class")]: className },
			[getAttributeName("viewBox")]: `0 0 ${viewBoxWidth} ${viewBoxHeight}`,
			...params.hasA11yProp === false ? { [getAttributeName("aria-hidden")]: "true" } : {},
			..."attributes" in params && params.attributes
		},
		icon.node.map((child) => {
			const [name, attrs, children] = child;
			const nextAttrs = params.nonScalingStroke ? {
				[getAttributeName("vector-effect")]: "non-scaling-stroke",
				...attrs
			} : attrs;
			return children ? [
				name,
				nextAttrs,
				children
			] : [name, nextAttrs];
		})
	];
}
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/shared/src/build/buildLucideIconForReact.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function buildLucideIconForReact(icon, params = {}) {
	return buildLucideIconNode(icon, {
		...params,
		attributeNames: {
			...params.attributeNames,
			class: "className",
			"stroke-width": "strokeWidth",
			"stroke-linecap": "strokeLinecap",
			"stroke-linejoin": "strokeLinejoin",
			"vector-effect": "vectorEffect"
		}
	});
}
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/context.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LucideContext = (0, import_react.createContext)({});
var useLucideContext = () => (0, import_react.useContext)(LucideContext);
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/Icon.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color, size, width, height, strokeWidth, absoluteStrokeWidth, nonScalingStroke, className = "", children, iconNode = [], icon = {
	node: iconNode,
	aliases: [],
	size: 24
}, ...rest }, ref) => {
	const { size: contextSize = 24, strokeWidth: contextStrokeWidth = 2, absoluteStrokeWidth: contextAbsoluteStrokeWidth = false, nonScalingStroke: contextNonScalingStroke = false, color: contextColor = "currentColor", className: contextClass = "" } = useLucideContext() ?? {};
	const hasAccessibleProp = Boolean(children) || hasA11yProp(rest);
	const [name, svgAttributes, builtIconNode = []] = buildLucideIconForReact(icon, {
		color: color ?? contextColor,
		width: width ?? size ?? contextSize,
		height: height ?? size ?? contextSize,
		strokeWidth: strokeWidth ?? contextStrokeWidth,
		absoluteStrokeWidth: absoluteStrokeWidth ?? contextAbsoluteStrokeWidth,
		nonScalingStroke: nonScalingStroke ?? contextNonScalingStroke,
		className: mergeClasses(contextClass, className),
		hasA11yProp: hasAccessibleProp,
		attributes: rest
	});
	return (0, import_react.createElement)(name, {
		ref,
		...svgAttributes
	}, [...builtIconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]);
});
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/createLucideIcon.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
function createLucideIcon(iconDataOrName, iconNode = [], aliases = []) {
	const iconData = typeof iconDataOrName === "string" ? toLucideIconData(iconDataOrName, iconNode, aliases) : iconDataOrName;
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		icon: iconData,
		className,
		...props
	}));
	if (iconData.name) Component.displayName = toPascalCase(iconData.name);
	return Component;
}
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/icons/bell.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$11 = {
	name: "bell",
	size: 24,
	node: [["path", {
		d: "M10.268 21a2 2 0 0 0 3.464 0",
		key: "vwvbt9"
	}], ["path", {
		d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
		key: "11g9vi"
	}]]
};
__iconData$11.node;
var Bell = createLucideIcon(__iconData$11);
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/icons/briefcase.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$10 = {
	name: "briefcase",
	size: 24,
	node: [["path", {
		d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
		key: "jecpp"
	}], ["rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "6",
		rx: "2",
		key: "i6l2r4"
	}]]
};
__iconData$10.node;
var Briefcase = createLucideIcon(__iconData$10);
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/icons/cake-slice.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$9 = {
	name: "cake-slice",
	size: 24,
	node: [
		["path", {
			d: "M16 13H3",
			key: "1wpj08"
		}],
		["path", {
			d: "M16 17H3",
			key: "3lvfcd"
		}],
		["path", {
			d: "m7.2 7.9-3.388 2.5A2 2 0 0 0 3 12.01V20a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-8.654c0-2-2.44-6.026-6.44-8.026a1 1 0 0 0-1.082.057L10.4 5.6",
			key: "1gmhf7"
		}],
		["circle", {
			cx: "9",
			cy: "7",
			r: "2",
			key: "1305pl"
		}]
	]
};
__iconData$9.node;
var CakeSlice = createLucideIcon(__iconData$9);
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$8 = {
	name: "chevron-down",
	size: 24,
	node: [["path", {
		d: "m6 9 6 6 6-6",
		key: "qrunsl"
	}]]
};
__iconData$8.node;
var ChevronDown = createLucideIcon(__iconData$8);
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/icons/credit-card.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$7 = {
	name: "credit-card",
	size: 24,
	node: [
		["rect", {
			width: "20",
			height: "14",
			x: "2",
			y: "5",
			rx: "2",
			key: "ynyp8z"
		}],
		["line", {
			x1: "2",
			x2: "22",
			y1: "10",
			y2: "10",
			key: "1b3vmo"
		}],
		["path", {
			d: "M6 14h2",
			key: "mk7k0u"
		}]
	]
};
__iconData$7.node;
var CreditCard = createLucideIcon(__iconData$7);
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/icons/ellipsis.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$6 = {
	name: "ellipsis",
	size: 24,
	node: [
		["circle", {
			cx: "12",
			cy: "12",
			r: "1",
			key: "41hilf"
		}],
		["circle", {
			cx: "19",
			cy: "12",
			r: "1",
			key: "1wjl8i"
		}],
		["circle", {
			cx: "5",
			cy: "12",
			r: "1",
			key: "1pcz8c"
		}]
	],
	aliases: ["more-horizontal"]
};
__iconData$6.node;
var Ellipsis = createLucideIcon(__iconData$6);
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/icons/layout-dashboard.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$5 = {
	name: "layout-dashboard",
	size: 24,
	node: [
		["rect", {
			width: "7",
			height: "9",
			x: "3",
			y: "3",
			rx: "1",
			key: "10lvy0"
		}],
		["rect", {
			width: "7",
			height: "5",
			x: "14",
			y: "3",
			rx: "1",
			key: "16une8"
		}],
		["rect", {
			width: "7",
			height: "9",
			x: "14",
			y: "12",
			rx: "1",
			key: "1hutg5"
		}],
		["rect", {
			width: "7",
			height: "5",
			x: "3",
			y: "16",
			rx: "1",
			key: "ldoo1y"
		}]
	]
};
__iconData$5.node;
var LayoutDashboard = createLucideIcon(__iconData$5);
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/icons/log-out.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$4 = {
	name: "log-out",
	size: 24,
	node: [
		["path", {
			d: "m16 17 5-5-5-5",
			key: "1bji2h"
		}],
		["path", {
			d: "M21 12H9",
			key: "dn1m92"
		}],
		["path", {
			d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
			key: "1uf3rs"
		}]
	]
};
__iconData$4.node;
var LogOut = createLucideIcon(__iconData$4);
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/icons/panel-left.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$3 = {
	name: "panel-left",
	size: 24,
	node: [["rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2",
		key: "afitv7"
	}], ["path", {
		d: "M9 3v18",
		key: "fh3hqa"
	}]],
	aliases: ["sidebar"]
};
__iconData$3.node;
var PanelLeft = createLucideIcon(__iconData$3);
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/icons/trash.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$2 = {
	name: "trash",
	size: 24,
	node: [
		["path", {
			d: "M10 11v6",
			key: "nco0om"
		}],
		["path", {
			d: "M14 11v6",
			key: "outv1u"
		}],
		["path", {
			d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
			key: "miytrc"
		}],
		["path", {
			d: "M3 6h18",
			key: "d0wm0j"
		}],
		["path", {
			d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
			key: "e791ji"
		}]
	],
	aliases: ["trash-2"]
};
__iconData$2.node;
var Trash = createLucideIcon(__iconData$2);
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/icons/user.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData$1 = {
	name: "user",
	size: 24,
	node: [["path", {
		d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
		key: "975kel"
	}], ["circle", {
		cx: "12",
		cy: "7",
		r: "4",
		key: "17ys0d"
	}]]
};
__iconData$1.node;
var User = createLucideIcon(__iconData$1);
//#endregion
//#region ../../node_modules/.bun/lucide-react@1.47.0+62547eec5a2188e3/node_modules/lucide-react/dist/esm/icons/x.mjs
/**
* @license lucide-react v1.47.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var __iconData = {
	name: "x",
	size: 24,
	node: [["path", {
		d: "M18 6 6 18",
		key: "1bl5f8"
	}], ["path", {
		d: "m6 6 12 12",
		key: "d8bk6v"
	}]]
};
__iconData.node;
var X = createLucideIcon(__iconData);
//#endregion
export { Bell, Briefcase, CakeSlice, ChevronDown, CreditCard, Ellipsis, LayoutDashboard, LogOut, PanelLeft, Trash, User, X };
