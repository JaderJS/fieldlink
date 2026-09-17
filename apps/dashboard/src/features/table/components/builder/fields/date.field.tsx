import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"
import { CustomFieldElement, FormFieldInstance } from "../field"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { ptBR } from "date-fns/locale"

const RenderField: React.FC<{ context: FormFieldInstance }> = ({ context: { path, row, meta, rowIndex, columnId } }) => {
    const { control, getValues } = useFormContext()
    const rowPath = path.split('.').slice(0, 2).join('.')
    return (
        <FormField
            control={control}
            name={path}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP", { locale: ptBR })
                                    ) : (
                                        <span>Selecione uma data</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                locale={ptBR}
                                selected={field.value}
                                onSelect={(e) => {
                                    field.onChange(e)
                                    const newData = getValues(rowPath)
                                    meta?.onUpdate?.({ rowIndex: String(rowIndex), columnId: columnId, value: newData })
                                }}
                                disabled={(date) =>
                                    date < new Date("1900-01-01")
                                }
                                captionLayout="dropdown"
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage className="text-[0.6rem]" />
                </FormItem>
            )}
        />
    )
}

export const DateField: CustomFieldElement = {
    type: "date",
    render: RenderField
}