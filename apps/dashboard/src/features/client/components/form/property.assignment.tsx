import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Property } from "@/features/properties/types"
import { DndContext, DragEndEvent, useDraggable, useDroppable } from "@dnd-kit/core"
import { Label } from "radix-ui"

interface PropertyAssignmentProps {
    properties: Property[],
    value: string[],
    onChange: (value: string[]) => void
}

export const PropertyAssignment = ({ properties, value = [], onChange }: PropertyAssignmentProps) => {

    const assigned = value.map(id => properties.find(p => String(p.id) === id)).filter(p => !!p)
    const available = properties.filter(p => !value.includes(String(p.id)))

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return
        const propId = active.id as string
        if (over.id === "assigned") {
            if (!value.includes(propId)) onChange([...value, propId])
        }
        if (over.id === "available") {
            if (value.includes(propId)) onChange(value.filter((i) => i !== propId))
        }
    }

    return (
        <>
            <DndContext
                onDragEnd={handleDragEnd}
            >
                <p className="text-xl">Propriedades</p>
                <div className="grid grid-cols-2 gap-4">
                    
                    <ScrollArea className="h-60 border rounded-md">
                        <DroppableColumn id={"available"} label={`Disponíveis (${available.length})`}>
                            {available.map(property => (
                                <Draggable key={property.id} id={String(property.id)}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-medium">{property.title}</div>
                                        </div>
                                        <div className="opacity-60 text-xs">arraste</div>
                                    </div>
                                </Draggable>
                            ))}
                        </DroppableColumn>
                    </ScrollArea>

                    <ScrollArea className="h-60 border rounded-md">
                        <DroppableColumn id="assigned" label={`Atribuídas (${assigned.length})`}>
                            {assigned.map((p) => (
                                <Draggable key={p.id} id={String(p.id)}>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-sm font-medium">{p.title}</div>
                                        </div>
                                        <div className="opacity-60 text-xs">arraste</div>
                                    </div>
                                </Draggable>
                            ))}
                        </DroppableColumn>
                    </ScrollArea>

                </div>

            </DndContext>
        </>
    )
}

const DroppableColumn = ({ id, label, children }: { id: string, label: string, children: React.ReactNode }) => {
    const { isOver, setNodeRef } = useDroppable({ id })
    return (
        <div ref={setNodeRef} className={`min-h-[200px] p-3 ${isOver ? "border-amber-100 bg-sidebar-accent" : "bg-background"}`}>
            <div className="font-medium mb-2">{label}</div>
            <div className="flex flex-col gap-2">{children}</div>
        </div>
    )
}

const Draggable = ({ id, children }: { id: string, children: React.ReactNode }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id })
    const style: React.CSSProperties = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        zIndex: isDragging ? 50 : undefined,
    }


    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="p-2 rounded-md shadow-sm bg-accent">
            {children}
        </div>
    )
}