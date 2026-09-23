import { Link, LinkProps } from "@tanstack/react-router";
import { CakeSlice, LayoutDashboardIcon } from "lucide-react";
import { ReactNode } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SidebarAccountMenu } from "./sidebar.account";

interface NavItem {
	id: string;
	label: string;
	icon: ReactNode;
	to: LinkProps["to"];
	badge?: number;
	isActive?: boolean;
}

const NAV: NavItem[] = [
	{
		id: "stations",
		label: "Estações",
		to: "/stations",
		icon: <LayoutDashboardIcon aria-hidden="true" />,
	},
	{
		id: "clients",
		label: "Clientes",
		to: "/customers",
		icon: <CakeSlice aria-hidden="true" />,
	},
];

export function AppSidebar() {
	return (
		<Sidebar variant="inset">
			{/*<SidebarHeader>
				<WorkspaceSwitcher workspace={workspace} onSelect={setWorkspace} />
			</SidebarHeader>*/}
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Workspace</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{NAV.map((item) => (
								<SidebarMenuItem key={item.id}>
									<SidebarMenuButton
										render={
											<Link to={item.to}>
												{item.icon}
												<span>{item.label}</span>
											</Link>
										}
										isActive={item.isActive}
									></SidebarMenuButton>
									{item.badge ? (
										<SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
									) : null}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup />
			</SidebarContent>
			{/*<SidebarFooter />*/}
			<SidebarAccountMenu />
		</Sidebar>
	);
}
