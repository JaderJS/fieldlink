'use client'

import { useSortable } from "@dnd-kit/sortable"
import { ReactNode } from "react"
import { CSS } from '@dnd-kit/utilities'
import { cn } from "@/lib/utils"
import { UniqueIdentifier } from "@dnd-kit/core"
import { DefaultRenderCard } from "./default.render.card"
import { Card } from "@/components/ui/card"

export type KanbanItemProps<T = Record<string, unknown>> = {
    id: string
    column: string
} & T

type KanbanCardProps<T> = {
    id: UniqueIdentifier
    item: T
    renderCard?: (item: T) => ReactNode
    onClick?: (item: T) => void
    isOverlay?: boolean
    editable?: boolean
    className?: string
}

export const KanbanCard = <T,>({
    id,
    item,
    renderCard,
    onClick,
    isOverlay = false,
    editable = true,
    className
}: KanbanCardProps<T>) => {

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled: !editable })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={() => onClick?.(item)}
            className={cn(`cursor-${editable ? "grab" : "default"}`, isOverlay && "shadow-xs rotate-2")}
        >
            <Card
                className={cn(
                    'cursor-grab gap-4 rounded-md p-3 shadow-sm',
                    isDragging && 'pointer-events-none cursor-grabbing opacity-30',
                    className
                )}
            >
                {renderCard ? renderCard(item) : DefaultRenderCard({ item })}
            </Card>

        </div>
    )
}