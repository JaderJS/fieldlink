import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import logo from '@/../public/logo.png'
import Link from "next/link"
import Image from "next/image"
import { RiFilePdf2Fill } from "@remixicon/react"
import { IconBrandProducthunt, IconBriefcase, IconBriefcaseFilled, IconDashboard, IconMenuOrder, IconMoneybagHeart, IconPdf, IconPlaystationSquare, IconShoppingBag, IconTower, IconUserSquareRounded, IconWifi } from "@tabler/icons-react"
import { NavMain } from "./nav.main"
import { NavUser } from "./nav.user"
import { NavSecondary } from "./nav.secondary"
import { ViewSidebarDocs } from "@/features/doc/components/view.sidebar.docs"
import { CircleUserRound } from "lucide-react"

const sidebar = {
    navMain: [
        { title: "Dashboard", url: "/adm", icon: IconDashboard },
        { title: "Financeiro", url: "/adm/transaction", icon: IconMoneybagHeart },
        { title: "Produtos", url: "/product", icon: IconBrandProducthunt },
        { title: "Compras", url: "/cart", icon: IconShoppingBag },
        { title: "Vendas/Serviços", url: "/order", icon: IconBriefcase },
    ],
    navSecondary: [
        { name: "Propriedades", url: "/properties", icon: IconTower },
        { name: "Clientes", url: "/clients", icon: IconUserSquareRounded },
        { name: "Sites", url: "/stations", icon: IconWifi },
    ]
}

const AppSideBar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {


    return (
        <>
            <Sidebar collapsible="offcanvas" {...props}>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                className="data-[slot=sidebar-menu-button]:!p-1.5"
                            >
                                <Link href={`/`} className="p-6">
                                    <Image src={logo} alt="Fieldlink solutions" quality={100} className="h-10 w-10 object-contain antialiased" />
                                    <span className="text-xs font-semibold">Soluções em rádio comunicação</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <NavMain items={sidebar.navMain} />
                    <NavSecondary items={sidebar.navSecondary} />
                    <ViewSidebarDocs />
                    {/* <NavSecondary items={sidebar.navSecondary} /> */}
                </SidebarContent>
                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
            </Sidebar>
        </>
    )
}



export { AppSideBar }