import { cn } from "@/lib/utils"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ColumnInstance } from "../builder/types/column.types"
import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Grip, PlusCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Column } from "../types"

interface ColumnComponentProps {
    id: string
    title: string
    column: Column
    children: ReactNode,
    onAddCard?: (id: string) => void
}
const ColumnComponent = ({ id, title, column, onAddCard, children }: ColumnComponentProps) => {

    const { attributes, isDragging, setNodeRef, listeners, transform, transition, data } = useSortable({ id, data: { type: 'column', _id: id } })

    return (
        <div
            {...attributes}
            ref={setNodeRef}
            style={{ transition, transform: CSS.Translate.toString(transform) }}
            className={cn('w-full h-full p-4 bg-muted rounded-xl flex flex-col gap-y-4', isDragging && 'opacity-50')}
        >
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-y-1">
                    <h3 className="text-xl">{title}</h3>
                </div>
                <Button {...listeners} variant="ghost"><Grip /></Button>
            </div>
            {<Button onClick={() => onAddCard?.(id)} className="bg-fieldlink hover:bg-fieldlink/80"><PlusCircle /> Novo item</Button>}
            {children}
        </div>
    )
}

export { ColumnComponent }