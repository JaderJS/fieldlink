import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
// import CurrencyInput from "react-currency-input-field";
import { CustomFieldElement, FormFieldInstance } from "../field"
import { NumberField, Input as InputAria } from "react-aria-components"

const RenderField: React.FC<{ context: FormFieldInstance }> = ({ context: { path, row, meta, rowIndex, columnId } }) => {
    const { control, getValues, setValue } = useFormContext()
    const rowPath = path.split('.').slice(0, 2).join('.')
    return (
        <FormField
            control={control}
            name={path}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <NumberField
                            className={"w-fit"}
                            onChange={(value) => {
                                field.onChange(value)
                                const newData = getValues(rowPath)
                                meta?.onUpdate?.({ rowIndex: String(rowIndex), columnId: columnId, value: newData })
                            }}
                            value={field.value}
                            formatOptions={{
                                currency: "BRL", style: "currency"
                            }}>
                            <InputAria className={"border-0 shadow-none focus-visible:ring-0 outline-none"} />
                        </NumberField>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export const MoneyField: CustomFieldElement = {
    type: "money",
    render: RenderField
}