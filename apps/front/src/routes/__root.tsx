/// <reference types="vite/client" />

import { QueryClient } from "@tanstack/react-query";
import {
	createRootRoute,
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { GlobalError } from "@/components/global/error";
import { NotFound } from "@/components/global/notfound";
import { AppSidebar } from "@/components/global/sidebar/app.sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import css from "../styles/app.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		head: () => ({
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},
				{
					title: "Fieldlink",
				},
			],
			links: [
				{ rel: "stylesheet", href: css },
				{ rel: "icon", type: "image/png", href: "/favicon.png" },
			],
		}),
		component: RootComponent,

		errorComponent: GlobalError,

		notFoundComponent: NotFound,
	},
);

function RootComponent() {
	return (
		<RootDocument>
			<div className="h-dvh w-full">
				<Outlet />
			</div>
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="pt-BR">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
