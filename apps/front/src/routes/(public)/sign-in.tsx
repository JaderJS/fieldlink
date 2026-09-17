import { createFileRoute, redirect } from "@tanstack/react-router";

import { SignInForm } from "@/components/auth/signin.form";
import { authClient } from "@/lib/auth";

export const Route = createFileRoute("/(public)/sign-in")({
	beforeLoad: async () => {
		const { data: session } = await authClient.getSession();

		if (session) {
			throw redirect({
				to: "/sign-in",
			});
		}
	},

	component: SignInPage,
});

function SignInPage() {
	return <SignInForm />;
}
