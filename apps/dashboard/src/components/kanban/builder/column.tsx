import { cn } from "@/lib/utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ReactNode, useState } from "react"
import { Grip, MoveVertical, PlusCircle, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FormElements, FormFieldInstance } from "./types/field.types"
import { ColumnInstance } from "./types/column.types"
import { useFormBuilder } from "@/providers/kanban"

interface BuilderColumnProps {
    id: string
    column: ColumnInstance
    boardId: string
    onClick?: (columnId: string) => void
}

const BuilderColumn = ({ id, column, boardId, onClick, ...props }: BuilderColumnProps) => {

    const { fieldsFn } = useFormBuilder()
    const { attributes, isDragging, isOver, setNodeRef, listeners, transform, transition, data } = useSortable({ id, data: { id, type: 'column', } })
    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)

    const fields = fieldsFn(boardId, column._id)

    return (
        <div
            {...attributes}
            ref={setNodeRef}
            style={{ transition, transform: CSS.Translate.toString(transform) }}
            className={cn('relative w-[600px] p-4 bg-muted rounded-xl flex flex-col shadow-md', isDragging && 'opacity-50')}
            onClick={() => {
                onClick?.(id)
            }}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            <div className={cn("flex flex-col min-h-[200px] opacity-100", mouseIsOver && 'opacity-8 0')}>
                <div className="flex justify-between items-center gap-y-1">
                    <h3 className="text-xl">{column.title}</h3>
                    <Button
                        {...listeners}
                        size={"icon"}
                        variant="ghost"
                        className="bg-fieldlink-secondary hover:bg-fieldlink-secondary/80"
                    >
                        <Grip color="#F2F2F2" />
                    </Button>
                </div>
                <Separator className="my-4" />
                {fields.map((field, index) => {
                    const Field = FormElements[field.type].designerComponent
                    return (
                        <Field fieldInstance={field} key={index} />
                    )
                })}
                {fields.length === 0 && (
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground ">Sem campos configurados</p>
                )}

            </div>
        </div>
    )
}

export { BuilderColumn }