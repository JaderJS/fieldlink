import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { authClient } from "@/lib/auth";

export const Route = createFileRoute("/(private)/_protected")({
	beforeLoad: async ({ location }) => {
		const { data: session } = await authClient.getSession();

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

	component: ProtectedLayout,
});

function ProtectedLayout() {
	return <Outlet />;
}
