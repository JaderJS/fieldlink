import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { CustomFieldElement, FormFieldInstance } from "../field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

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
                        <Checkbox
                            {...field}
                            checked={field.value}
                            onCheckedChange={(checked) => {
                                field.onChange(checked)
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

export const CheckboxField: CustomFieldElement = {
    type: "checkbox",
    render: RenderField
}