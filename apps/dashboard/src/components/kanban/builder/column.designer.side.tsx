import { useFormBuilder } from "@/providers/kanban"
import { SidebarBtnField } from "./column.btn.field"
import { FormElements } from "./types/field.types"
import { Button } from "@/components/ui/button"
import { Trash, X } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const FormDesignerSide = () => {

    const { selectField, selectColumn, updateColumn, removeColumn } = useFormBuilder()

    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col grow gap-2 border-l-2 border-muted bg-background overflow-y-auto h-full p-3">
            {!selectField && (
                <>
                    <Label>Nome da coluna</Label>
                    <Input
                        value={selectColumn?.title}
                        className="border-0 rounded-none shadow-none"
                        onChange={(e) => {
                            if (!selectColumn) return
                            updateColumn(selectColumn._id, e.target.value)
                        }}
                    />
                </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {!selectField && (
                    <>
                        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Campos de layout</p>
                        <SidebarBtnField formElement={FormElements.TitleField} />
                        <SidebarBtnField formElement={FormElements.SubtitleField} />
                        <SidebarBtnField formElement={FormElements.ParagraphField} />
                        <Separator className="mt-2 col-span-1 md:col-span-2"/>
                        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Campos de formulário</p>
                        <SidebarBtnField formElement={FormElements.TextField} />
                        <SidebarBtnField formElement={FormElements.NumberField} />
                        <SidebarBtnField formElement={FormElements.TextAreaField} />
                        <SidebarBtnField formElement={FormElements.DateField} />
                        <SidebarBtnField formElement={FormElements.SelectField} />
                        <SidebarBtnField formElement={FormElements.CheckboxField} />
                    </>
                )}
            </div>
            {selectField && <PropertiesField />}
            <Button variant={"destructive"} onClick={() => removeColumn(selectColumn?._id)}>
                <Trash />
            </Button>
        </aside>
    )
}

const PropertiesField = () => {

    const { selectField, selectFieldFn } = useFormBuilder()

    if (!selectField) return null

    const PropertiesField = FormElements[selectField?.type].propertiesComponent

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground/70">Propriedades do campo</p>
                <Button variant={"ghost"} size={"icon"} onClick={() => selectFieldFn()}>
                    <X />
                </Button>
            </div>
            <Separator className="mb-4" />
            <PropertiesField fieldInstance={selectField} />
        </div>
    )
}


export { FormDesignerSide }