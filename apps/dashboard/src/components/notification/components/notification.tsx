'use client'

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Bell, BellDot, DollarSign, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { useNotifications } from "../hooks/use.notifications"
import { cn } from "@/lib/utils"

export function Notification() {
    const { data } = useNotifications()
    const count = data?.length ?? 0
    const displayCount = count > 9 ? "+9" : count > 0 ? String(count) : null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full p-2 hover:bg-muted/50 transition"
                >
                    {/* Ícone do sino */}
                    {count === 0 ? (
                        <Bell className="w-6 h-6 text-muted-foreground" />
                    ) : (
                        <BellDot className="w-6 h-6 text-primary animate-pulse" />
                    )}

                    {displayCount && (
                        <span
                            className={cn(
                                "absolute bottom-0 -right-1 flex items-center justify-center",
                                "rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm",
                                "size-4 min-w-[1rem] px-[2px] leading-none",
                                "animate-in fade-in zoom-in duration-150"
                            )}
                        >
                            {displayCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-80 max-h-[400px] overflow-y-auto rounded-xl border shadow-lg p-0"
            >
                <div className="p-4">
                    <DropdownMenuLabel className="text-base font-semibold">
                        Notificações
                    </DropdownMenuLabel>
                </div>
                <DropdownMenuSeparator />

                {/* Lista de notificações */}
                <div className="flex flex-col divide-y divide-border">
                    {count === 0 && (
                        <div className="py-6 text-center text-sm text-muted-foreground">
                            Nenhuma notificação 🎉
                        </div>
                    )}

                    {data?.map(({ title, dueAt, kind, link, transactionId }, idx) => (
                        <Item
                            key={idx}
                            // variant={read ? "ghost" : "outline"}
                            className={cn(
                                "p-3 transition hover:bg-muted/40",
                                // !read && "border-l-4 border-l-primary/70"
                            )}
                        >
                            <ItemMedia>
                                <div className="bg-primary/10 text-primary p-1.5 rounded-md">
                                    <DollarSign className="w-4 h-4" />
                                </div>
                            </ItemMedia>

                            <ItemContent className="min-w-0">
                                <ItemTitle className="truncate text-sm font-medium">
                                    {title}
                                </ItemTitle>
                                <ItemDescription className="text-xs text-muted-foreground line-clamp-1">
                                    {kind} • {new Date(dueAt).toLocaleDateString("pt-BR")}
                                </ItemDescription>
                            </ItemContent>

                            <ItemActions>
                                {link && (
                                    <Link href={`/adm/transaction/${transactionId}`}>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-7 w-7"
                                            title="Abrir"
                                        >
                                            <LinkIcon className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                )}
                            </ItemActions>
                        </Item>
                    ))}
                </div>

                {count > 0 && (
                    <>
                        <DropdownMenuSeparator />
                        <div className="p-3 flex justify-center">
                            <Button variant="link" size="sm" className="text-primary">
                                Ver todas
                            </Button>
                        </div>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
