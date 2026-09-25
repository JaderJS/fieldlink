import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppSidebar } from "@/components/global/sidebar/app.sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getServerSession } from "@/lib/auth/functions";
// import { getServerSession } from "@/lib/auth/server";

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

	component: ProtectedLayout,
});

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
