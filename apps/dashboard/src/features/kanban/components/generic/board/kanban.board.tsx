'use client'

import { closestCenter, DndContext, KeyboardSensor, PointerSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { ReactNode, useEffect, useMemo, useState } from "react"
import { KanbanColumn } from "../column/kanban.column"
import { cn } from "@/lib/utils"

export type KanbanItem = {
    id: string
    [key: string]: any
}

type GroupingFn<T> = (item: T) => string

type KanbanBoardProps<T, K extends keyof T> = {
    data: T[]
    groupBy: K | GroupingFn<T>
    groupByOptions?: Array<{
        value: keyof T | string,
        label: string
    }>
    renderCard?: (item: T) => ReactNode
    renderColumnHeader?: (group: { id: string, title: string, items: T[] }) => ReactNode
    onItemChange?: (items: T[]) => void
    onAddItem?: (groupId: string) => void
    onItemClick?: (item: T) => void
    editable?: boolean
    idExtractor: (item: T) => UniqueIdentifier
}

export const KanbanBoard = <T extends object, K extends keyof T>({
    data,
    groupBy,
    renderCard,
    renderColumnHeader,
    onItemChange,
    onItemClick,
    onAddItem,
    editable = false,
    idExtractor
}: KanbanBoardProps<T, K>) => {

    const groupedData = useMemo(() => {
        const groupsMap = data.reduce((map, item) => {
            const groupKey = typeof groupBy === 'function' ? groupBy(item) : String(item[groupBy])

            if (!map.has(groupKey)) {
                map.set(groupKey, [])
            }
            map.get(groupKey)!.push(item)
            return map

        }, new Map<string, T[]>())

        return Array.from(groupsMap.entries()).map(([key, items]) => ({
            id: key,
            title: key,
            items,
        }))
    }, [data, groupBy])

    const [groups, setGroups] = useState(groupedData)
    const [activeItem, setActiveItem] = useState<T | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor)
    )

    useEffect(() => {
        setGroups(groupedData)
    }, [groupedData])

    return (
        <section className={cn("flex size-full min-h-40 divide-y overflow-hidden rounded-md border bg-secondary text-xs shadow-sm ring-2 transition-all")}>
        {/* <section className={cn("flex gap-4 overflow-x-auto p-4")}> */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
            >
                <SortableContext items={groups} strategy={verticalListSortingStrategy}>
                    {groups.map((group => (
                        <KanbanColumn
                            key={group.id}
                            id={group.id}
                            title={group.title}
                            items={group.items}
                            editable={editable}
                            renderCard={renderCard}
                            renderHeader={renderColumnHeader}
                            onItemClick={onItemClick}
                            onAddItem={onAddItem}
                            idExtractor={idExtractor}
                        />
                    )))}
                </SortableContext>
            </DndContext>
        </section>
    )
}    