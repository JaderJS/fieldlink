'use client'

import { HTMLAttributes, ReactNode } from "react"
import { ChevronDown, ChevronRight, MoreVertical, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCards } from "@/features/card/hooks/hook.cards"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface GroupHeaderCardsProps extends HTMLAttributes<HTMLDivElement> {
    groupKey: string
    children: ReactNode | string
    itemCount?: number
    isCollapsed?: boolean
    onToggleCollapse?: () => void
    showToggleButton?: boolean
}

export const GroupHeaderCards = ({
    groupKey,
    children,
    itemCount,
    showToggleButton = true,
    className,
    ...props
}: GroupHeaderCardsProps) => {
    const { toggleGroup, collapsedGroups, activeGroupField } = useCards()

    const isCollapsed = collapsedGroups[groupKey] ?? false

    const handleToggle = () => {
        toggleGroup(groupKey)
    }

    const hasHeader = !!activeGroupField

    if (!hasHeader) return null

    return (
        <div
            {...props}
            className={cn(
                "flex items-center justify-between p-3 bg-muted/50 rounded-md border mb-2",
                "transition-colors duration-200 hover:bg-muted/70",
                className
            )}
        >
            <div className="flex items-center gap-2">
                {showToggleButton && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-md"
                        onClick={handleToggle}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronDown className="h-4 w-4" />
                        )}
                    </Button>
                )}

                <div className="flex flex-col">
                    <h3 className="font-medium text-foreground">
                        {children}
                    </h3>
                    <span className="text-xs text-muted-foreground capitalize">
                        {groupKey.replace(/_/g, ' ')}
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {itemCount !== undefined && (
                    <Badge
                        variant="secondary"
                        className="px-2 py-1 text-xs font-medium"
                    >
                        {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                    </Badge>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size={"icon"} variant={"ghost"}>
                            <MoreVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>New</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}