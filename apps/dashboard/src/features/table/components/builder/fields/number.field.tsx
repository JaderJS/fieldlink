import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { CustomFieldElement, FormFieldInstance } from "../field"
import { Input } from "@/components/ui/input"

const RenderField: React.FC<{ context: FormFieldInstance }> = ({ context: { path, row, meta, rowIndex, columnId } }) => {
    const { control, getValues } = useFormContext()
    const rowPath = path.split('.').slice(0, 2).join('.')
    return (
        <FormField
            control={control}
            name={path}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            className="border-0 shadow-none"
                            {...field}
                            type="number"
                            onBlur={(e) => {
                                field.onBlur()
                                const newData = getValues(rowPath)
                                meta?.onUpdate?.({ rowIndex: String(rowIndex), columnId: columnId, value: newData })
                            }}
                            onChange={(e) => {
                                field.onChange(e)
                                const newData = getValues(rowPath)
                                meta?.onUpdate?.({ rowIndex: String(rowIndex), columnId: columnId, value: newData })
                            }}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export const NumberField: CustomFieldElement = {
    type: "number",
    render: RenderField
}