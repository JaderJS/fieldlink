'use client'

import { ReactNode, useState } from "react"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/global/theme.global"
import { checkIsPublicRoute } from "@/functions/utils"
import { usePathname } from "next/navigation"
import { AuthProvider } from "./auth"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { FormBuilderProvider } from "./kanban"
import { getQueryClient } from "@/core/ssr"
import { QueryClientProvider } from "@tanstack/react-query"
import { AppSideBar } from "@/components/global/sidebar/sidebar"
import { SiteHeader } from "@/components/global/sidebar/site.header"



export default function Provider({ children }: { children: ReactNode }) {
    // const [queryClient] = useState(() => new QueryClient())
    const queryClient = getQueryClient()
    const pathname = usePathname()
    const isPublic = checkIsPublicRoute(pathname)

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <AuthProvider>
                    <Toaster />
                    {!isPublic ? (
                        <SidebarProvider
                            style={{
                                "--sidebar-width": "calc(var(--spacing) * 72)",
                                "--header-height": "calc(var(--spacing) * 12)",
                            } as React.CSSProperties}
                        >
                            <AppSideBar variant="inset" />
                            <SidebarInset>
                                <SiteHeader />
                                <div className="flex flex-1 flex-col">
                                    <div className="@container/main flex flex-1 flex-col gap-2">
                                        {children}
                                    </div>
                                </div>
                            </SidebarInset>
                        </SidebarProvider>
                    ) : <main>{children}</main>}
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}