'use client'

import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable"
import { BuilderColumn } from "./column"
import { Button } from "@/components/ui/button"
import { ColumnProperties } from "./column.properties"
import { useFormBuilder } from "@/providers/kanban"
import { idGenerator } from "../utils"
import { DragOverlayWrapper } from "./drag.overlay.wrapper"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getDatabase, upsertKanbanForm } from "@/functions/kanban"
import { KEYS } from "@/core/keys"
import { ChangeEvent, useEffect } from "react"
import { Board } from "./types/board.types"
import { Input } from "@/components/ui/input"


const KanbanBuilder = ({ boardId }: { boardId?: string }) => {

    const { data } = useQuery({
        queryKey: KEYS.database.getById(boardId!),
        enabled: !!boardId,
        queryFn: getDatabase
    })
    const { mutateAsync: upsertKanban } = useMutation({ mutationFn: upsertKanbanForm })
    const { board, setBoard, boardUpdate, addColumn, selectColumnFn } = useFormBuilder()

    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 300, tolerance: 5 } })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!active || !over) return

        const activeContainerIndex = board.columns.findIndex(
            (column) => column._id === active.id,
        )
        const overContainerIndex = board.columns.findIndex(
            (column) => column._id === over.id,
        )

        let newColumns = [...board.columns]
        newColumns = arrayMove(newColumns, activeContainerIndex, overContainerIndex)
        boardUpdate(board._id, board.title, newColumns)

    }

    const publish = () => {
        const promise = upsertKanban({ _id: board._id, name: board.title, columns: board.columns })
        toast.promise(promise, {
            loading: 'Submetendo formulário...',
            success: 'Formulário submetido com sucesso'
        })
    }

    useEffect(() => {
        if (!data?.database) return

        const board = data?.database

        setBoard(() => ({
            _id: board._id,
            title: board.name,
            columns: board.columns.map(({ _id, title, cards, ...column }) => ({
                _id,
                title,
                cards: cards.map(({ _id, title, ...card }) => ({ _id, title, fields: column.fields })),
                fields: column.fields
            })),
        }))
    }, [data])

    if (!board) {
        return (<>Loading...</>)
    }

    const handleTitleBoard = (event: ChangeEvent<HTMLInputElement>) => {
        setBoard((prev) => ({ ...prev, title: event.target.value }))
    }

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <main className="flex flex-col w-full">
                <nav className="flex justify-between border-b-2 gap-3 items-center p-3 ">
                    <Input value={board.title} className="bg-transparent text-xl " onChange={(e) => handleTitleBoard(e)} />
                    {/* <p className="text-xs text-muted-foreground">{board._id}</p> */}
                    <div className="flex items-center gap-2">
                        <Button className="bg-linear-to-r from-indigo-400 to-cyan-400" onClick={publish}>Save</Button>
                    </div>
                </nav>

                <div className="flex w-full relative bg-accent bg-[url(/paper.svg)] overflow-x-auto overflow-y-hidden">
                    <div className="flex w-full h-full p-6 gap-3">
                        <SortableContext items={board?.columns?.map((column) => column._id)}>
                            {board?.columns?.map((column) => (
                                <BuilderColumn
                                    key={column._id}
                                    id={column._id}
                                    column={column}
                                    boardId={board._id}
                                    onClick={(columnId) => selectColumnFn(columnId)}
                                />
                            ))}

                            <div className="w-[200px] min-h-[300px] p-4 bg-muted rounded-xl flex flex-col shadow-md items-center justify-center">
                                <Button
                                    size={"icon"}
                                    variant={"ghost"}
                                    onClick={() => addColumn(0, { _id: idGenerator(), title: 'Nova coluna', fields: [], cards: [] })}
                                >
                                    <Plus />
                                </Button>
                            </div>

                        </SortableContext>
                    </div>
                </div>
                <div className="flex flex-1 p-3">
                    <ColumnProperties />
                </div>
            </main >
            <DragOverlayWrapper boardId={board._id} />
        </DndContext >
    )
}

export { KanbanBuilder }