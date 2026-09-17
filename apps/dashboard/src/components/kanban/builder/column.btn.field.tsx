import { useDraggable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FormField } from "./types/field.types"

const SidebarBtnField = ({ formElement }: { formElement: FormField }) => {
    const { label, icon: Icon } = formElement.designerBtnElement
    const { setNodeRef, isDragging, ...draggable } = useDraggable({
        id: `designer-btn-${formElement.type}`, data: {
            type: formElement.type,
            isDesignerBtnElement: true
        }
    })

    return (
        <Button
            ref={setNodeRef}
            variant={"ghost"}
            className={cn("flex flex-col gap-2 h-[120px] w-[120px]", isDragging && 'ring-2 ring-primary')}
            {...draggable.listeners}
            {...draggable.attributes}
        >
            <Icon className="h-8 w-8 text-primary cursor-grab" />
            <p className="text-xs">{label}</p>
        </Button>
    )
}
const SidebarBtnFieldDragOverlay = ({ formElement }: { formElement: FormField }) => {
    const { label, icon: Icon } = formElement.designerBtnElement

    return (
        <Button
            variant={"ghost"}
            className={cn("flex flex-col gap-2 h-[120px] w-[120px]")}
        >
            <Icon className="h-8 w-8 text-primary cursor-grab" />
            <p className="text-xs">{label}</p>
        </Button>
    )
}

export { SidebarBtnField, SidebarBtnFieldDragOverlay }