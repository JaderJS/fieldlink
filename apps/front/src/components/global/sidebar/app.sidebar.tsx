import { Link, LinkProps } from "@tanstack/react-router";
import { CakeSlice, ChevronDown, LayoutDashboardIcon } from "lucide-react";
import { ReactNode } from "react";
import { PlantGearLogo } from "@/components/icons/logo";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
	SidebarSeparator,
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
		<Sidebar variant="inset" className="h-full">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<SidebarMenuButton
										size={"lg"}
										className="aria-expanded:bg-sidebar-accent aria-expanded:text-sidebar-accent-foreground"
									/>
								}
							>
								<PlantGearLogo className="size-12 rounded-lg text-green-800 [&>svg]:size-10" />
								<span className="grid min-w-0 flex-1 text-left leading-tight">
									<span className="truncate text-sm font-medium">
										Fieldlink
									</span>
								</span>
								<ChevronDown className="ml-auto" />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>
									<span>W.I.P</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent role="navigation" aria-label="workspace">
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

			<SidebarFooter>
				<SidebarSeparator className="mx-0" />
				<SidebarAccountMenu />
			</SidebarFooter>
		</Sidebar>
	);
}
