import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { CustomFieldElement, FormFieldInstance } from "../field"
import { Input } from "@/components/ui/input"

const RenderField: React.FC<{ context: FormFieldInstance }> = ({ context: { path } }) => {
    const { control } = useFormContext()
    return (
        <FormField
            control={control}
            name={path}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <p>Unknown</p>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export const UnknownField: CustomFieldElement = {
    type: "unknown",
    render: RenderField
}