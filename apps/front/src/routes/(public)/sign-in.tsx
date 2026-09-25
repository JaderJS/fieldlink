import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { SignInForm } from "@/components/auth/signin.form";
import { authClient } from "@/lib/auth";

export const Route = createFileRoute("/(public)/sign-in")({
	beforeLoad: async () => {
		const { data: session } = await authClient.getSession();

		if (session) {
			throw redirect({
				to: "/dashboard",
			});
		}
	},

	component: SignInPage,
});

function SignInPage() {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link to="/" className="flex items-center gap-2 font-medium">
						<div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
							<Briefcase className="size-4" />
						</div>
						Fieldlink.
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<SignInForm />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<div className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"></div>
				{/*<img
					src="/logo.png"
					alt="logo"
					className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
				/>*/}
			</div>
		</div>
	);
}
