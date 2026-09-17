import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

export type KanbanHeaderProps = HTMLAttributes<HTMLDivElement>

export const KanbanHeader = ({ className, ...props }: KanbanHeaderProps) => (
    <div className={cn('m-0 p-2 font-semibold text-sm', className)} {...props} />
)