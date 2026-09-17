import { Dispatch, SetStateAction } from "react"
import { useFormBuilder } from "@/providers/kanban"
import { Button } from "@/components/ui/button"
import { FormDesigner } from "./designer"

interface ColumnProperties {
}

const ColumnProperties = ({ ...props }: ColumnProperties) => {

    const { selectColumn } = useFormBuilder()

    return (
        <div className="flex grow items-center justify-center h-full w-full">
            {!selectColumn && <h3 className="text-2xl text-muted-foreground">Selecione uma coluna para configura-la</h3>}
            {!!selectColumn && <FormDesigner columnId={selectColumn._id} />}
        </div>
    )
}



export { ColumnProperties }