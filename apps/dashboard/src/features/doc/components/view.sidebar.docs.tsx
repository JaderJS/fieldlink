
'use client'

import Link from "next/link"
import { useDocs } from "../hooks/useDocs"
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { IconDots, IconFolder, IconShare3, IconTrash } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useUpsertDoc } from "../hooks/useUpsertDoc"
import { DEFAULT_NEW_DOC } from "../constants/new.doc"
import { Newspaper } from "lucide-react"

export const ViewSidebarDocs = () => {

    const { data: docs } = useDocs()
    const { mutate: upsertDocFn } = useUpsertDoc()
    const { isMobile } = useSidebar()

    return (


        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Documentos</SidebarGroupLabel>
            <SidebarMenu>
                {docs?.slice(0, 5).map((doc) => (
                    <SidebarMenuItem key={doc.cuid}>
                        <SidebarMenuButton asChild>
                            <Link href={`/doc/${doc.cuid}`}>
                                {/* <doc.icon /> */}
                                <span>{doc.title}</span>
                            </Link>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction
                                    asChild
                                    showOnHover
                                    className="data-[state=open]:bg-accent rounded-sm"
                                >
                                    <Link href={`/doc/${doc.cuid}`}>
                                        <IconDots />
                                        <span className="sr-only">More</span>
                                    </Link>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-24 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                            >
                                <DropdownMenuItem>
                                    <IconFolder />
                                    <span>Open</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <IconShare3 />
                                    <span>Share</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => upsertDocFn({ ...doc, isDeleted: true })}
                                >
                                    <IconTrash />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                    <SidebarMenuButton
                        className="text-sidebar-foreground/70"
                        onClick={() => upsertDocFn({ ...DEFAULT_NEW_DOC })}
                    >
                        <Newspaper className="text-sidebar-foreground/70" />
                        <span>Novo</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}