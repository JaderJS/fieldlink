'use client'

import { Button } from "@/components/ui/button"
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ReactNode } from "react"
import { KanbanCard } from "../card/kanban.card"

export type KanbanColumnProps<T> = {
    id: string
    title: string
    items: T[]
    renderCard?: (item: T) => ReactNode
    renderHeader?: (group: { id: string, title: string, items: T[] }) => ReactNode
    onAddItem?: (groupId: string) => void
    onItemClick?: (item: T) => void
    editable: boolean
    idExtractor: (item: T) => UniqueIdentifier
}

export const KanbanColumn = <T,>({
    id,
    title,
    items,
    renderCard,
    renderHeader,
    onAddItem,
    onItemClick,
    editable,
    idExtractor
}: KanbanColumnProps<T>) => {

    const { setNodeRef } = useDroppable({ id })

    const sortableItems = items.map(item => idExtractor(item))

    return (
        <>
            <div ref={setNodeRef} className="flex flex-grow flex-col gap-2 p-2">
                <div className="flex justify-between items-center mb-4">
                    {renderHeader ? (
                        renderHeader({ id, title, items })
                    ) : (
                        <p>{title} <span>{items.length}</span></p>
                    )}
                    {editable && onAddItem && (
                        <Button onClick={() => onAddItem(id)}>new</Button>
                    )}
                </div>
                <SortableContext
                    items={sortableItems}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="flex flex-col gap-3">
                        {items.map(item => (
                            <KanbanCard
                                key={idExtractor(item)}
                                id={idExtractor(item)}
                                item={item}
                                renderCard={renderCard}
                                onClick={onItemClick}
                            />
                        ))}
                    </div>
                </SortableContext>
            </div>
        </>
    )
}