'use client'
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { faker } from "@faker-js/faker"
import { closestCorners, DndContext, DragEndEvent, DragMoveEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, UniqueIdentifier, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Board } from "../builder/types/board.types"
import { ColumnComponent } from "../column/column"
import { CardComponent } from "../card/card"
import { useQueryClient } from "@tanstack/react-query"
import { Card, Column } from "../types"
import { idGenerator } from "../utils"
import { ColumnInstance } from "../builder/types/column.types"

interface BoardProps {
    board: Board
    board_?: Board
    className?: string
    onChange?: (data: any) => void
}

const BoardComponent = ({ board, className, onChange, ...props }: BoardProps) => {
    const queryClient = useQueryClient()

    const newColumns: Column[] = board.columns.map((column, index) => ({
        id: column._id,
        title: column.title,
        order: index,
        cards: column.cards.map(({ _id, title, content, ...card }) => ({ id: _id, title: title, content: content, ...card })),
        fields: column.fields
    }))
    //const newColumns2: ColumnInstance[] = props.board_.columns
    const [columns, setColumns] = useState<Column[]>(newColumns)
    const [activeCard, setActiveCard] = useState<Card & { fields: any[], boardId: string, columnId: string } | null>(null)
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        const activeId = active.id as UniqueIdentifier

        columns.forEach((column) => {
            const card = column.cards.find((c) => c.id === activeId)
            if (card) {
                setActiveCard({ ...card, fields: column.fields, columnId: column.id, boardId: board._id })
            }
        })
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over || !active) {
            return
        }
        // console.log(active, over)
        if (active.data.current?.type === 'card' && over.data.current?.type === 'column') {
            setColumns((prev) => {
                let movedCard: any = null

                // Remover o card da coluna original
                const updatedColumns = prev.map((column) => {
                    if (column.cards.some((card) => card.id === active.data.current?._id)) {
                        // Salva o card removido
                        movedCard = column.cards.find((card) => card.id === active.data.current?._id)
                        // Remove o card da coluna
                        return {
                            ...column,
                            cards: column.cards.filter((card) => card.id !== active.data.current?._id),
                        }
                    }
                    return column
                })

                if (!movedCard) {
                    console.error("Card não encontrado.")
                    return prev // Retorna sem alterações se o card não foi encontrado
                }

                // Adicionar o card à nova coluna
                return updatedColumns.map((column) => {
                    if (column.id === over.data.current?._id) {
                        return {
                            ...column,
                            cards: [...column.cards, movedCard],
                        }
                    }
                    return column
                })
            })
        }
    }

    const handleCreateOneCard = (id: string) => {

        const newCard: Card = { id: idGenerator(), title: 'New card' }

        setColumns((prev) => {
            return prev.map((column) => (column.id === id ? { ...column, cards: [...column.cards, newCard] } : { ...column }))
        })
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    )


    return (
        <div className={cn(className, 'flex p-4 gap-x-2')}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={columns.map(column => column.id)}>
                    {columns.map((column) => (
                        <ColumnComponent
                            key={column.id}
                            id={column.id}
                            column={column}
                            title={column.title}
                            onAddCard={handleCreateOneCard}
                        >
                            <SortableContext items={column.cards.map((card) => card.id)}>
                                {column.cards.map((card) => (
                                    <CardComponent
                                        key={card.id}
                                        id={card.id}
                                        boardId={board._id}
                                        columnId={column.id}
                                        title={card.title}
                                        card={{ _id: card.id, content: card.content, ...card }}
                                        fields={column.fields}
                                    ></CardComponent>
                                ))}
                            </SortableContext>
                        </ColumnComponent>
                    ))}
                </SortableContext>
                <DragOverlay adjustScale={false}>
                    {activeCard && <CardComponent
                        id={activeCard.id}
                        columnId={activeCard.columnId}
                        boardId={activeCard.boardId}
                        card={{ _id: activeCard.id, content: activeCard.content, ...activeCard }}
                        title={activeCard.title}
                        fields={activeCard.fields}
                    />}
                </DragOverlay>
            </DndContext>
        </div>

    )
}
export { BoardComponent }