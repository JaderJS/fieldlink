import { useCallback, useContext } from "react"
import { IKanbanColumnBase, IKanbanItemBase, KanbanContext } from "../providers/kanban.provider"
import { arrayMove } from "@dnd-kit/sortable"

interface IKanbanContext<T extends IKanbanItemBase, C extends IKanbanColumnBase> {
    data: T[]
    columns: C[]
    activeItem: T | null
    getColumnId: (item: T) => string
    getItemsByColumnId: (columnId: string) => T
}

export const useKanban = <
    T extends IKanbanItemBase = IKanbanItemBase,
    C extends IKanbanColumnBase = IKanbanColumnBase
>() => {
    const context = useContext(KanbanContext) as IKanbanContext<T, C>
    if (!context) {
        throw new Error('useKanban must be used within a KanbanProvider')
    }


    return {
        ...context,
        getItemsByColumn: (columnId: string) => context.data.filter(item =>
            context.getColumnId(item) === columnId
        ),
    }
}
