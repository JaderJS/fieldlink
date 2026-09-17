import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import { useState } from "react"
import { FieldsType, FormElements } from "./types/field.types"
import { SidebarBtnFieldDragOverlay } from "./column.btn.field"
import { Button } from "@/components/ui/button"
import { useFormBuilder } from "@/providers/kanban"

export type CustomDataFieldWrapper = {
    type: string
    columnId: string
    fieldId: string
    [key: string]: any
}

const DragOverlayWrapper = ({ boardId }: { boardId: string }) => {
    const { selectColumn, fieldsFn } = useFormBuilder()
    const [draggableItem, setDraggableItem] = useState<Active | null>(null)

    useDndMonitor({
        onDragStart: (event) => {
            setDraggableItem(event.active)
        },
        onDragCancel: () => {
            setDraggableItem(null)
        },
        onDragEnd: () => {
            setDraggableItem(null)
        }
    })

    const isSidebarBtnElement = draggableItem?.data.current?.isDesignerBtnElement
    let node = <div>No drag overlay</div>
    const data = draggableItem?.data.current as CustomDataFieldWrapper

    if (isSidebarBtnElement) {
        const type = draggableItem.data.current?.type as FieldsType
        node = <SidebarBtnFieldDragOverlay formElement={FormElements[type]} />
    }

    const isDesignerElement = draggableItem?.data.current?.isDesignerElement
    if (isDesignerElement) {

        const field = fieldsFn(boardId, data.columnId).find(field => field._id === data.fieldId)

        if (!field) {
            node = <div>Element not found!</div>
        } else {
            const DesignerElementComponent = FormElements[field.type].designerComponent
            node = (
                <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-60">
                    <DesignerElementComponent fieldInstance={field} />
                </div>
            )
        }
    }
    return (
        <DragOverlay>
            {node}
        </DragOverlay>
    )
}

export { DragOverlayWrapper }