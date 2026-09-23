import {
	BellIcon,
	CreditCardIcon,
	LogOutIcon,
	MoreHorizontalIcon,
	UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/hooks/use.session";
import { authClient } from "@/lib/auth";

export function SidebarAccountMenu() {
	const { data: session } = useSession();

	const handleSignOut = () => {
		const result = authClient.signOut();
	};

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<SidebarMenuButton
								size="lg"
								className="aria-expanded:bg-sidebar-accent aria-expanded:text-sidebar-accent-foreground"
							/>
						}
					>
						<Avatar>
							<AvatarImage
								src={session?.user.image ?? "https://github.com/shadcn.png"}
								alt=""
							/>
							<AvatarFallback>
								{session?.user.name
									.trim()
									.split(/\s+/)
									.slice(0, 2)
									.map((name) => name.charAt(0))
									.join("")
									.toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<span className="grid min-w-0 flex-1 text-left leading-tight">
							<span className="truncate text-sm font-medium">
								{session?.user.name}
							</span>
							<span className="text-sidebar-foreground/70 truncate text-xs">
								{session?.user.email}
							</span>
						</span>
						<MoreHorizontalIcon
							className="ml-auto opacity-60"
							aria-hidden="true"
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent side="right" align="end">
						<DropdownMenuGroup>
							<DropdownMenuLabel>{session?.user.name}</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<UserIcon aria-hidden="true" />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CreditCardIcon aria-hidden="true" />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<BellIcon aria-hidden="true" />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={handleSignOut}>
								<LogOutIcon aria-hidden="true" />
								Sign out
								<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
