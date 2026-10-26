/// <reference types="vite/client" />

import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { NuqsAdapter } from "nuqs/adapters/tanstack-router";
import type { ReactNode } from "react";
import { GlobalError } from "@/components/global/error";
import { NotFound } from "@/components/global/notfound";
import { Toaster } from "@/components/ui/toast";
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
				<NuqsAdapter>
					<Outlet />
				</NuqsAdapter>
				<Toaster />
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
