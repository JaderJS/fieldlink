import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth";

export const Route = createFileRoute("/(private)/_protected")({
	beforeLoad: async ({ location }) => {
		const { data: session, error } = await authClient.getSession();

		if (error) {
			throw new Error("Não foi possivel verificar a sessão");
		}

		if (!session) {
			throw redirect({
				to: "/sign-in",
				search: {
					redirect: location.href,
				},
			});
		}

		return {
			session,
		};
	},

	// errorComponent: AuthenticationError,

	component: ProtectedLayout,
});

function ProtectedLayout() {
	return <Outlet />;
}

// function AuthenticationError() {
// 	return (
// 		<div className="flex min-h-screen items-center justify-center p-6">
// 			<div className="w-full max-w-md text-center">
// 				<h1 className="text-2xl font-semibold">Problema na autenticação</h1>

// 				<p className="mt-2 text-muted-foreground">
// 					Não foi possível verificar sua sessão. Tente novamente.
// 				</p>
// 			</div>
// 		</div>
// 	);
// }
