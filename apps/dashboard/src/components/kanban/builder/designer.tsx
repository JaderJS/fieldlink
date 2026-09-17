import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Trash } from "lucide-react"
import { useFormBuilder } from "@/providers/kanban"
import { FieldsType, FormElements, FormFieldInstance } from "./types/field.types"
import { FormDesignerSide } from "./column.designer.side"
import { idGenerator } from "../utils"
import { Button } from "@/components/ui/button"
import { CustomDataFieldWrapper } from "./drag.overlay.wrapper"

const FormDesigner = ({ columnId }: { columnId: string }) => {

    const { board, fieldsFn, selectFieldFn, addField, removeField } = useFormBuilder()

    const { setNodeRef, isOver, ...droppable } = useDroppable({ id: 'designer-drop-area', data: { isDesignerDropArea: true } })

    const fields = fieldsFn(board._id, columnId)

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event
            if (!active || !over) return
            console.log(active, over)
            const isDesignerBtnElement = active.data.current?.isDesignerBtnElement
            const isDroppingOverDesignerDropArea = over.data.current?.isDesignerDropArea

            const isDroppingOverDesignerElementTopHalf = over.data.current?.isTopHalfDesignerElement
            const isDroppingOverDesignerElementBottomHalf = over.data.current?.isBottomHalfDesignerElement

            //Dropping new field
            if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {
                const type = active.data.current?.type as FieldsType
                const newField = FormElements[type].construct(idGenerator())
                addField(fields.length, columnId, newField)
                return
            }

            const dataActive = active.data.current as CustomDataFieldWrapper
            const dataOver = over.data.current as CustomDataFieldWrapper

            if (dataActive.columnId !== dataOver.columnId) {
                return
            }

            const fields_ = fieldsFn('0', dataActive.columnId)

            if (isDesignerBtnElement && (isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf)) {
                const type = active.data.current?.type as FieldsType
                const newField = FormElements[type].construct(idGenerator())

                const overElementIndex = fields_.findIndex(field => field._id === dataOver.fieldId)
                if (overElementIndex === - 1) {
                    throw new Error('Element not founded')
                }

                let index = overElementIndex
                if (isDroppingOverDesignerElementBottomHalf) {
                    index + 1
                }
                addField(fields.length, columnId, newField)
                return
            }

            const isDraggingDesignerElement = active.data.current?.isDesignerElement
            const draggingDesignerFieldOverAnotherDesignerField = (isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf) && isDraggingDesignerElement
            if (draggingDesignerFieldOverAnotherDesignerField) {

                const activeIndex = fields_.findIndex(field => field._id === dataActive.fieldId)
                const overIndex = fields_.findIndex(field => field._id === dataOver.fieldId)
                if (activeIndex === - 1 || overIndex === -1) {
                    throw new Error('Element not founded')
                }
                const activeElement = { ...fields_[activeIndex] }
                removeField(dataActive.fieldId, columnId)
                let index = overIndex
                if (isDroppingOverDesignerElementBottomHalf) {
                    index + 1
                }
                addField(fields.length, columnId, activeElement)

                return
            }

        }
    })

    return (
        <div className="flex w-full h-full">

            <div className="p-4 w-full" onClick={() => selectFieldFn()}>
                <div
                    ref={setNodeRef}
                    className={cn(
                        isOver && 'ring-2 ring-primary/20 ring-inset',
                        "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col grow items-center justify-start flex-1 overflow-y-auto"
                    )}
                >
                    {!isOver && fields.length === 0 && <p className="text-3xl text-muted-foreground flex grow items-center font-bold">
                        Araste aqui
                    </p>}

                    {isOver && (
                        <div className="p-4 w-full">
                            <div className="h-[120px] rounded-md bg-primary/20"></div>
                        </div>
                    )}

                    {fields.length > 0 && (
                        <div className="flex flex-col w-full gap-2 p-4">

                            {fields.map((field) => (
                                <ViewDesigneElementWrapper
                                    key={field._id}
                                    field={field}
                                    columnId={columnId}
                                />
                            ))}
                        </div>
                    )}

                </div>
            </div>

            <FormDesignerSide />
        </div>
    )
}

const ViewDesigneElementWrapper = ({ field, columnId }: { field: FormFieldInstance, columnId: string }) => {

    const { removeField, selectFieldFn } = useFormBuilder()

    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)

    const topHalf = useDroppable({
        id: field._id + '-top',
        data: { type: field.type, fieldId: field._id, columnId, isTopHalfDesignerElement: true }
    })
    const bottomHalf = useDroppable({
        id: field._id + '-bottom',
        data: { type: field.type, fieldId: field._id, columnId, isBottomHalfDesignerElement: true }
    })
    const draggable = useDraggable({
        id: field._id + '-drag-handler',
        data: { type: field.type, fieldId: field._id, columnId, isDesignerElement: true }
    })

    const DesignerElement = FormElements[field.type].designerComponent

    return (
        <div
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
            onClick={(e) => {
                e.stopPropagation()
                selectFieldFn(field._id)
            }}
        >

            <div ref={topHalf.setNodeRef} className={cn(topHalf.isOver && '', "absolute w-full h-1/2 rounded-t-md")} />
            <div ref={bottomHalf.setNodeRef} className={cn(bottomHalf.isOver && '', "absolute w-full bottom-0 h-1/2 rounded-b-md")} />
            {mouseIsOver && (
                <>
                    <div className="absolute right-0 h-full z-10">
                        <Button
                            variant="destructive"
                            onClick={() => removeField(field._id, columnId)}
                            className="flex justify-center h-full border rounded-md rounded-l-none"
                        >
                            <Trash className="h-6 w-6" />
                        </Button>
                    </div>
                </>
            )}
            <div
                className={cn(
                    "opacity-100 flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none",
                    mouseIsOver && 'opacity-30',
                    topHalf.isOver && 'border-t-4',
                    bottomHalf.isOver && 'border-b-4'
                )}
            >
                <DesignerElement fieldInstance={field} />
            </div>
        </div>
    )
}


export { FormDesigner }