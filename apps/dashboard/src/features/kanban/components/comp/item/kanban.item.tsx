import { Card } from "@/components/ui/card"
import { useKanban } from "@/features/kanban/hooks/kanban.hook"
import { IKanbanItemBase } from "@/features/kanban/providers/kanban.provider"
import { cn } from "@/lib/utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Grab, GripVertical } from "lucide-react"
import { ReactNode } from "react"

export type KanbanItemProps<T extends IKanbanItemBase = IKanbanItemBase> = T & {
    name: string
    children?: ReactNode
    className?: string
}

export const KanbanItem = <T extends IKanbanItemBase = IKanbanItemBase>({
    id,
    name,
    children,
    className,
}: KanbanItemProps<T>) => {
    const { attributes, listeners, setNodeRef, transition, transform, isDragging } = useSortable({ id })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "relative rounded-md shadow-sm flex flex-col p-0",
                isDragging && "opacity-30 cursor-grabbing"
            )}
        >
            <div {...listeners} {...attributes} className="absolute top-5 right-3 cursor-grab p-0" suppressHydrationWarning>
                <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>

            <div className="flex flex-col gap-2 bg-background p-4 rounded-xl">
                {children ?? <p className="font-medium text-sm">{name}</p>}
            </div>
        </div>
    )
}