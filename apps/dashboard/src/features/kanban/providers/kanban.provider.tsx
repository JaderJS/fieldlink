'use client'
import { closestCenter, DndContext, DndContextProps, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

export interface IKanbanItemBase<I = string | number> {
    id: I
}

export interface IKanbanColumnBase {
    id: string
    name: string
    items: IKanbanItemBase[]
    [key: string]: unknown
}

export const KanbanContext = createContext<any>(undefined)

interface IKanbanProviderProps<
    T extends IKanbanItemBase,
    C extends IKanbanColumnBase
> {
    children: (column: C) => React.ReactNode
    data: T[]
    groupBy: keyof T | ((item: T) => string)
    getColumnName?: (columnId: string) => string
    className?: string
}

export function KanbanProvider<
    T extends IKanbanItemBase,
    C extends IKanbanColumnBase
>({
    children,
    data: initialData,
    groupBy,
    getColumnName = (id) => id,
    className,
    ...props
}: IKanbanProviderProps<T, C>) {
    const [activeItem, setActiveItem] = useState<T | null>(null)
    const [data, setData] = useState<T[]>(initialData)

    const getColumnId = useCallback((item: T): string => {
        return typeof groupBy === 'function'
            ? groupBy(item)
            : String(item[groupBy])
    }, [groupBy])

    const columns = useMemo<C[]>(() => {
        const columnMap = new Map<string, C>()
        data.forEach((item) => {
            const columnId = getColumnId(item)
            if (!columnMap.has(columnId)) {
                columnMap.set(columnId, {
                    id: columnId,
                    name: getColumnName(columnId),
                    items: []
                } as unknown as C)
            }
            const col = columnMap.get(columnId)!
            col.items.push(item)
        })
        return Array.from(columnMap.values())
    }, [data, initialData, getColumnId, getColumnName])


    function getItemId(item: any): string {
        if (typeof item === 'object' && item !== null && 'id' in item) {
            return String(item.id)
        }

        if (typeof item === 'string' || typeof item === 'number') {
            return String(item)
        }
        throw new Error('Não foi possível determinar o ID do item')
    }

    const handleDragStart = ({ active }: DragStartEvent) => {
        const items = columns.flatMap(column => column.items)
        const activeItem = items.find((item) => item.id === active.id) as unknown as T | null
        setActiveItem(activeItem)
    }

    const handleDragOver = ({ active, over }: DragOverEvent) => {
        if (!over) return

        if (over.data.current?.type === "column") {
            if (!over.data?.current?.column?.id) return
            const activeItem = data.find(item => item.id === active.id)
            if (!activeItem) return

            const newData = data.map((d) => {
                if (d.id === activeItem.id) {
                    return ({ ...d, [typeof groupBy === "string" ? groupBy : "unknown"]: over.data?.current?.column?.id })
                }
                return d
            })
            setData(newData)
        }

    }

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        setActiveItem(null)
    }

    const contextValue = {
        data,
        columns,
        activeItem,
        getColumnId,
    }

    useEffect(() => {

    }, [data, groupBy])

    return (
        <KanbanContext.Provider value={contextValue} >
            <DndContext
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCenter}
            // {...props}
            >
                <div className="flex gap-4 overflow-x-auto">
                    {columns.map(column => (
                        <div key={column.id} className="flex-1">
                            {children(column)}
                        </div>
                    ))}
                </div>
                <DragOverlay>
                    {activeItem && (
                        <Card className="rounded-md p-3 shadow-sm">
                            <p className="m-0 font-medium text-sm">{activeItem.id}</p>
                        </Card>
                    )}
                </DragOverlay>
            </DndContext>
        </KanbanContext.Provider>
    )
}

// 5. Hook com tipagem segura
export function useKanbanContext<
    T extends IKanbanItemBase,
    C extends IKanbanColumnBase
>() {
    const context = useContext(KanbanContext)

    if (!context) {
        throw new Error('useKanbanContext must be used within a KanbanProvider')
    }
    return context as {
        data: T[]
        columns: C[]
        activeItem: T | null
        getColumnId: (item: T) => string
    }
}