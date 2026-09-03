import { cn } from "@/lib/utils"
import { useDroppable } from "@dnd-kit/core"
import { ReactNode } from "react"

export type KanbanBoardProps = {
    id: string
    children: ReactNode
    className?: string
}

export const KanbanBoard = ({ id, children, className }: KanbanBoardProps) => {
    const { isOver, setNodeRef } = useDroppable({ id, data: { type: 'column', column: { column: { id: id } } } })

    return (
        <div
            className={cn(
                'flex size-full min-h-40 flex-col divide-y rounded-md bg-secondary text-xs shadow-sm border transition-all',
                // isOver ? 'ring-primary' : 'ring-transparent',
                className
            )}
            ref={setNodeRef}
        >
            {children}
        </div>
    )
}