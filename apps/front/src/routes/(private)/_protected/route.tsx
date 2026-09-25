import {
	createFileRoute,
	type ErrorComponentProps,
	Link,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { AppSidebar } from "@/components/global/sidebar/app.sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getServerSession } from "@/lib/auth/functions";

export const Route = createFileRoute("/(private)/_protected")({
	beforeLoad: async ({ location }) => {
		const { data: session, error } = await getServerSession();

		if (error) {
			console.log(error);
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

	errorComponent: ErrorLayout,
	component: ProtectedLayout,
});

export function ErrorLayout({ error }: ErrorComponentProps) {
	return (
		<div className="flex min-h-screen items-center justify-center p-6">
			<div className="w-full max-w-md text-center">
				<h1 className="text-2xl font-semibold">
					Não foi possível verificar a sessão
				</h1>

				<p className="my-2 text-muted-foreground">
					Não conseguimos recuperar os dados da sessão.
				</p>

				{import.meta.env.VITE_DEV && (
					<pre className="mt-4 overflow-auto rounded-md bg-muted p-4 text-left text-xs">
						<p>{error instanceof Error ? error.message : String(error)}</p>
						<p>
							{error instanceof Error && Object.entries(error).length > 0
								? JSON.stringify(error, null, 2)
								: String(error)}
						</p>
					</pre>
				)}

				<Link
					to="/sign-in"
					className="mt-6 rounded-md bg-primary px-4 py-2 text-primary-foreground"
				>
					Tentar login novamente
				</Link>
			</div>
		</div>
	);
}

function ProtectedLayout() {
	return (
		<SidebarProvider className="relative min-h-0 h-full w-full overflow-hidden">
			<AppSidebar />
			<main className="py-2 px-4 h-full w-full bg-accent">
				<SidebarTrigger />
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
