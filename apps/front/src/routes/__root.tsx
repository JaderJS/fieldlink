/// <reference types="vite/client" />

import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { GlobalError } from "@/components/global/error";
import { NotFound } from "@/components/global/notfound";
import css from "../styles/app.css?url";

export const Route = createRootRoute({
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
});

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
