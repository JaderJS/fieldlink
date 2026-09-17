import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useKanban } from "@/features/kanban/hooks/kanban.hook"
import { cn } from "@/lib/utils"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import { Fragment, HTMLAttributes, ReactNode, useMemo } from "react"

import { IKanbanItemBase } from "@/features/kanban/providers/kanban.provider"

export type KanbanColumnProps<T extends IKanbanItemBase = IKanbanItemBase> = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'id'> & {
    children: (item: T) => ReactNode
    items: IKanbanItemBase[]
    id: string
}

export const KanbanColumn = <T extends IKanbanItemBase = IKanbanItemBase>({
    id,
    items,
    children,
    className,
    ...props
}: KanbanColumnProps<T>) => {

    const data = useMemo(() => ({ type: "column", column: { id } }), [id])
    const { setNodeRef, isOver } = useDroppable({ id, data })

    return (

        <ScrollArea className={cn("overflow-hidden", className)} >
            <SortableContext id={id} items={items.map(i => String(i.id))} >
                <div
                    ref={setNodeRef}
                    className={cn('flex flex-grow flex-col gap-2 p-2', isOver && "bg-muted", className)}
                    {...props}
                >
                    {items.map((item) => (
                        <Fragment key={item.id}>
                            {children(item as T)}
                        </Fragment>
                    ))}
                </div>
            </SortableContext>
            <ScrollBar orientation="vertical" />
        </ScrollArea>

    )
}