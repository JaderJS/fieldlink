import { createFileRoute, redirect } from "@tanstack/react-router";

import { SignUpForm } from "@/components/auth/signup.form";
import { authClient } from "@/lib/auth";

export const Route = createFileRoute("/(public)/sign-up")({
	beforeLoad: async () => {
		const { data: session } = await authClient.getSession();

		if (session) {
			throw redirect({
				to: "/dashboard",
			});
		}
	},

	component: SignUpPage,
});

function SignUpPage() {
	return <SignUpForm />;
}
