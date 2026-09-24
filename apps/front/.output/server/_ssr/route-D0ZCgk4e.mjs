import { __toESM } from "../_runtime.mjs";
import { AvatarFallback as AvatarFallback$1, AvatarImage as AvatarImage$1, AvatarRoot, DialogBackdrop, DialogClose, DialogDescription, DialogPopup, DialogPortal, DialogRoot, DialogTitle, MenuGroup, MenuGroupLabel, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuRoot, MenuTrigger, Separator, TooltipArrow, TooltipPopup, TooltipPortal, TooltipPositioner, TooltipRoot, TooltipTrigger as TooltipTrigger$1, mergeProps, require_jsx_runtime, require_react, useRender } from "../_libs/@base-ui/react+[...].mjs";
import { Link, Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { cva } from "../_libs/class-variance-authority+clsx.mjs";
import { cn } from "../_libs/cn.mjs";
import { Button$1, authClient } from "./router-B1dUlNHz.mjs";
import "./input-BUi3dJv-.mjs";
import { Bell, CakeSlice, ChevronDown, CreditCard, Ellipsis, LayoutDashboard, LogOut, PanelLeft, User, X } from "../_libs/lucide-react.mjs";
import { Separator$1 } from "./separator-BTrxNC1Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-D0ZCgk4e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlantGearLogo({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 512 512",
		fill: "none",
		"aria-hidden": "true",
		className,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			clipRule: "evenodd",
			d: `M 347,270 348,273 343,287 329,309 308,328 291,337 289,335 291,324 297,312 307,298 323,283 Z M 161,270 181,280 202,299 217,323 221,334 220,338 199,327 182,312 169,294 160,272 Z M 350,240 351,259 327,270 314,279 299,294 286,315 284,313 277,292 286,280 300,266 318,253 334,245 Z M 158,240 172,244 192,254 206,264 225,283 236,299 242,311 250,336 250,344 233,342 230,339 228,328 219,308 207,291 198,282 180,269 158,259 Z M 51,219 52,278 57,282 100,290 102,292 109,313 115,324 91,359 89,364 90,370 131,411 134,412 142,410 177,386 190,393 209,399 211,402 219,444 225,450 283,450 287,448 290,442 298,401 300,399 316,394 331,386 368,411 375,412 379,410 417,372 419,368 418,360 394,325 402,307 406,293 409,290 452,282 457,277 457,218 454,216 396,216 393,219 393,221 397,225 449,226 449,273 445,275 403,283 399,288 394,304 385,322 387,330 411,365 373,403 334,378 328,378 313,386 297,391 291,395 282,440 280,442 228,442 226,438 219,399 214,392 198,387 180,378 174,378 137,403 135,403 98,366 122,329 123,321 114,303 110,289 105,283 59,273 59,226 111,225 114,224 115,218 112,216 54,216 Z M 343,210 346,214 350,231 331,237 313,246 288,265 272,283 260,264 264,258 278,244 298,229 323,216 Z M 165,210 183,215 212,230 228,242 247,261 260,279 271,300 278,320 282,339 271,343 260,344 256,325 250,308 240,289 228,273 215,260 197,247 182,239 158,231 161,218 Z M 313,152 307,170 294,185 287,190 275,195 260,195 266,177 277,164 291,155 307,151 Z M 196,152 201,151 215,154 229,162 243,178 247,187 248,195 234,195 220,189 213,184 202,171 197,160 Z M 254,72 260,79 265,89 268,102 268,111 265,124 260,134 254,141 248,133 241,115 241,98 243,90 249,78 Z M 252,62 245,69 237,82 234,91 232,105 233,117 236,128 242,140 250,149 250,171 249,172 241,161 233,154 220,147 204,143 191,143 187,145 187,154 191,168 199,182 209,192 225,201 250,206 250,249 249,250 231,233 209,218 183,206 166,201 159,201 154,212 150,228 149,259 152,275 163,301 173,315 191,332 212,344 226,349 242,352 267,352 286,348 303,341 320,330 332,319 346,300 353,285 359,262 360,242 357,221 352,206 349,201 342,201 320,208 296,220 275,235 259,251 258,250 258,206 265,204 273,204 286,200 304,188 317,169 321,156 322,147 318,143 304,143 291,146 273,156 259,172 258,171 258,150 267,139 272,129 276,113 276,99 272,84 267,74 257,62 Z`
		})
	});
}
function DropdownMenu({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuRoot, {
		"data-slot": "dropdown-menu",
		...props
	});
}
function DropdownMenuTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuTrigger, {
		"data-slot": "dropdown-menu-trigger",
		...props
	});
}
function DropdownMenuContent({ align = "start", alignOffset = 0, side = "bottom", sideOffset = 4, className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPositioner, {
		className: "isolate z-50 outline-none",
		align,
		alignOffset,
		side,
		sideOffset,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuPopup, {
			"data-slot": "dropdown-menu-content",
			className: cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className),
			...props
		})
	}) });
}
function DropdownMenuGroup({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGroup, {
		"data-slot": "dropdown-menu-group",
		...props
	});
}
function DropdownMenuLabel({ className, inset, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuGroupLabel, {
		"data-slot": "dropdown-menu-label",
		"data-inset": inset,
		className: cn("px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7", className),
		...props
	});
}
function DropdownMenuItem({ className, inset, variant = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuItem, {
		"data-slot": "dropdown-menu-item",
		"data-inset": inset,
		"data-variant": variant,
		className: cn("group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {
		"data-slot": "dropdown-menu-separator",
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function DropdownMenuShortcut({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"data-slot": "dropdown-menu-shortcut",
		className: cn("ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground", className),
		...props
	});
}
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
	const [isMobile, setIsMobile] = import_react.useState(void 0);
	import_react.useEffect(() => {
		const mql = window.matchMedia(`(max-width: 767px)`);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);
	return !!isMobile;
}
function Sheet({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogRoot, {
		"data-slot": "sheet",
		...props
	});
}
function SheetPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal, {
		"data-slot": "sheet-portal",
		...props
	});
}
function SheetOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogBackdrop, {
		"data-slot": "sheet-overlay",
		className: cn("fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs", className),
		...props
	});
}
function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPopup, {
		"data-slot": "sheet-content",
		"data-side": side,
		className: cn("fixed z-50 flex flex-col gap-4 bg-popover bg-clip-padding text-sm text-popover-foreground shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm", className),
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			"data-slot": "sheet-close",
			render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				variant: "ghost",
				className: "absolute top-3 right-3",
				size: "icon-sm"
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function SheetHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sheet-header",
		className: cn("flex flex-col gap-0.5 p-4", className),
		...props
	});
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		"data-slot": "sheet-title",
		className: cn("font-heading text-base font-medium text-foreground", className),
		...props
	});
}
function SheetDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
		"data-slot": "sheet-description",
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function Tooltip$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipRoot, {
		"data-slot": "tooltip",
		...props
	});
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger$1, {
		"data-slot": "tooltip-trigger",
		...props
	});
}
function TooltipContent({ className, side = "top", sideOffset = 4, align = "center", alignOffset = 0, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipPositioner, {
		align,
		alignOffset,
		side,
		sideOffset,
		className: "isolate z-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TooltipPopup, {
			"data-slot": "tooltip-content",
			className: cn("z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
			...props,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipArrow, { className: "z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" })]
		})
	}) });
}
var SIDEBAR_COOKIE_NAME = "sidebar_state";
var SIDEBAR_COOKIE_MAX_AGE = 604800;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = import_react.createContext(null);
function useSidebar() {
	const context = import_react.useContext(SidebarContext);
	if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
	return context;
}
function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange: setOpenProp, className, style, children, ...props }) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = import_react.useState(false);
	const [_open, _setOpen] = import_react.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = import_react.useCallback((value) => {
		const openState = typeof value === "function" ? value(open) : value;
		if (setOpenProp) setOpenProp(openState);
		else _setOpen(openState);
		document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
	}, [setOpenProp, open]);
	const toggleSidebar = import_react.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [
		isMobile,
		setOpen,
		setOpenMobile
	]);
	import_react.useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);
	const state = open ? "expanded" : "collapsed";
	const contextValue = import_react.useMemo(() => ({
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	}), [
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContext.Provider, {
		value: contextValue,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-wrapper",
			style: {
				"--sidebar-width": SIDEBAR_WIDTH,
				"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
				...style
			},
			className: cn("group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar", className),
			...props,
			children
		})
	});
}
function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, dir, ...props }) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
	if (collapsible === "none") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar",
		className: cn("flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground", className),
		...props,
		children
	});
	if (isMobile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open: openMobile,
		onOpenChange: setOpenMobile,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
			dir,
			"data-sidebar": "sidebar",
			"data-slot": "sidebar",
			"data-mobile": "true",
			className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
			style: { "--sidebar-width": SIDEBAR_WIDTH_MOBILE },
			side,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, {
				className: "sr-only",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Sidebar" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Displays the mobile sidebar." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-full w-full flex-col",
				children
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group peer hidden text-sidebar-foreground md:block",
		"data-state": state,
		"data-collapsible": state === "collapsed" ? collapsible : "",
		"data-variant": variant,
		"data-side": side,
		"data-slot": "sidebar",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-gap",
			className: cn("relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear", "group-data-[collapsible=offcanvas]:w-0", "group-data-[side=right]:rotate-180", variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"data-slot": "sidebar-container",
			"data-side": side,
			className: cn("fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear data-[side=left]:left-0 data-[side=left]:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] data-[side=right]:right-0 data-[side=right]:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] md:flex", variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l", className),
			...props,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-sidebar": "sidebar",
				"data-slot": "sidebar-inner",
				className: "flex size-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:shadow-sm group-data-[variant=floating]:ring-1 group-data-[variant=floating]:ring-sidebar-border",
				children
			})
		})]
	});
}
function SidebarTrigger({ className, onClick, ...props }) {
	const { toggleSidebar } = useSidebar();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
		"data-sidebar": "trigger",
		"data-slot": "sidebar-trigger",
		variant: "ghost",
		size: "icon-sm",
		className: cn(className),
		onClick: (event) => {
			onClick?.(event);
			toggleSidebar();
		},
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelLeft, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Toggle Sidebar"
		})]
	});
}
function SidebarHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-header",
		"data-sidebar": "header",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
}
function SidebarFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-footer",
		"data-sidebar": "footer",
		className: cn("flex flex-col gap-2 p-2", className),
		...props
	});
}
function SidebarSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {
		"data-slot": "sidebar-separator",
		"data-sidebar": "separator",
		className: cn("mx-2 w-auto bg-sidebar-border", className),
		...props
	});
}
function SidebarContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-content",
		"data-sidebar": "content",
		className: cn("no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className),
		...props
	});
}
function SidebarGroup({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-group",
		"data-sidebar": "group",
		className: cn("relative flex w-full min-w-0 flex-col p-2", className),
		...props
	});
}
function SidebarGroupLabel({ className, render, ...props }) {
	return useRender({
		defaultTagName: "div",
		props: mergeProps({ className: cn("flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 ring-sidebar-ring outline-hidden transition-[margin,opacity] duration-200 ease-linear group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", className) }, props),
		render,
		state: {
			slot: "sidebar-group-label",
			sidebar: "group-label"
		}
	});
}
function SidebarGroupContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-group-content",
		"data-sidebar": "group-content",
		className: cn("w-full text-sm", className),
		...props
	});
}
function SidebarMenu({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		"data-slot": "sidebar-menu",
		"data-sidebar": "menu",
		className: cn("flex w-full min-w-0 flex-col gap-0", className),
		...props
	});
}
function SidebarMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
		"data-slot": "sidebar-menu-item",
		"data-sidebar": "menu-item",
		className: cn("group/menu-item relative", className),
		...props
	});
}
var sidebarMenuButtonVariants = cva("peer/menu-button group/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm ring-sidebar-ring outline-hidden transition-[width,height,padding] group-has-data-[sidebar=menu-action]/menu-item:pr-8 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-open:hover:bg-sidebar-accent data-open:hover:text-sidebar-accent-foreground data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate", {
	variants: {
		variant: {
			default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
			outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
		},
		size: {
			default: "h-8 text-sm",
			sm: "h-7 text-xs",
			lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function SidebarMenuButton({ render, isActive = false, variant = "default", size = "default", tooltip, className, ...props }) {
	const { isMobile, state } = useSidebar();
	const comp = useRender({
		defaultTagName: "button",
		props: mergeProps({ className: cn(sidebarMenuButtonVariants({
			variant,
			size
		}), className) }, props),
		render: !tooltip ? render : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, { render }),
		state: {
			slot: "sidebar-menu-button",
			sidebar: "menu-button",
			size,
			active: isActive
		}
	});
	if (!tooltip) return comp;
	if (typeof tooltip === "string") tooltip = { children: tooltip };
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip$1, { children: [comp, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
		side: "right",
		align: "center",
		hidden: state !== "collapsed" || isMobile,
		...tooltip
	})] });
}
function SidebarMenuBadge({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-slot": "sidebar-menu-badge",
		"data-sidebar": "menu-badge",
		className: cn("pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium text-sidebar-foreground tabular-nums select-none group-data-[collapsible=icon]:hidden peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[size=default]/menu-button:top-1.5 peer-data-[size=lg]/menu-button:top-2.5 peer-data-[size=sm]/menu-button:top-1 peer-data-active/menu-button:text-sidebar-accent-foreground", className),
		...props
	});
}
function Avatar$1({ className, size = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarRoot, {
		"data-slot": "avatar",
		"data-size": size,
		className: cn("group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten", className),
		...props
	});
}
function AvatarImage({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
		"data-slot": "avatar-image",
		className: cn("aspect-square size-full rounded-full object-cover", className),
		...props
	});
}
function AvatarFallback({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
		"data-slot": "avatar-fallback",
		className: cn("flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs", className),
		...props
	});
}
var useSession = () => {
	return authClient.useSession();
};
function SidebarAccountMenu() {
	const { data: session } = useSession();
	const handleSignOut = () => {
		authClient.signOut();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
		render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
			size: "lg",
			className: "aria-expanded:bg-sidebar-accent aria-expanded:text-sidebar-accent-foreground"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
				src: session?.user.image ?? "https://github.com/shadcn.png",
				alt: ""
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, { children: session?.user.name.trim().split(/\s+/).slice(0, 2).map((name) => name.charAt(0)).join("").toUpperCase() })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "grid min-w-0 flex-1 text-left leading-tight",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate text-sm font-medium",
					children: session?.user.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sidebar-foreground/70 truncate text-xs",
					children: session?.user.email
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {
				className: "ml-auto opacity-60",
				"aria-hidden": "true"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		side: "right",
		align: "end",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: session?.user.name }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuGroup, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { "aria-hidden": "true" }), "Profile"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { "aria-hidden": "true" }), "Billing"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { "aria-hidden": "true" }), "Notifications"] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
				onClick: handleSignOut,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { "aria-hidden": "true" }),
					"Sign out",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuShortcut, { children: "⇧⌘Q" })
				]
			}) })
		]
	})] }) }) });
}
var NAV = [{
	id: "stations",
	label: "Estações",
	to: "/stations",
	icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { "aria-hidden": "true" })
}, {
	id: "clients",
	label: "Clientes",
	to: "/customers",
	icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CakeSlice, { "aria-hidden": "true" })
}];
function AppSidebar() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sidebar, {
		variant: "inset",
		className: "h-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuTrigger, {
				render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
					size: "lg",
					className: "aria-expanded:bg-sidebar-accent aria-expanded:text-sidebar-accent-foreground"
				}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlantGearLogo, { className: "size-12 rounded-lg text-green-800 [&>svg]:size-10" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid min-w-0 flex-1 text-left leading-tight",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-sm font-medium",
							children: "Fieldlink"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "ml-auto" })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "W.I.P" }) }) })] }) }) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarContent, {
				role: "navigation",
				"aria-label": "workspace",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarGroup, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupLabel, { children: "Workspace" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroupContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenu, { children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarMenuItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuButton, {
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						children: [item.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
					}),
					isActive: item.isActive
				}), item.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarMenuBadge, { children: item.badge }) : null] }, item.id)) }) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarGroup, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarSeparator, { className: "mx-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarAccountMenu, {})] })
		]
	});
}
function ProtectedLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SidebarProvider, {
		className: "relative min-h-0 h-full w-full overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "py-2 px-4 h-full w-full bg-accent",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarTrigger, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
		})]
	});
}
//#endregion
export { ProtectedLayout as component };
