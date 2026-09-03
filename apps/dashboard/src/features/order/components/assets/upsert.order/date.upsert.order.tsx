import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { DEFAULT_NEW_DATE_IN_ORDER } from "@/features/order/constants/new.date"
import { UpsertOrderSchema } from "@/features/order/schema/upsert.schema"
import { cn } from "@/lib/utils"
import { differenceInHours, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { FieldValues, UseFormReturn } from "react-hook-form"

interface FormProps<T extends FieldValues> {
    form: UseFormReturn<T>
    onAutoSave: (data: T) => void
    className?: string
}

export const FormUpsertDate = ({ form, onAutoSave, className }: FormProps<UpsertOrderSchema>) => {

    const haveDate = !!form.watch(`date`)

    const recalculateHoursFn = (form: UseFormReturn<UpsertOrderSchema>) => {
        const date = form.getValues(`date`)
        if (!date?.start || !date.finish) return
        const hours = differenceInHours(date.finish, date.start)
        form.setValue(`date.hours`, hours)
    }

    return (
        <div className={cn("p-1", className)}>
            <div className="flex flex-row items-center justify-between rounded-lg p-3">
                <div className="space-y-0.5">
                    <Label>Adicionar data?</Label>
                    <p className="text-xs text-muted-foreground">
                        Marcando a seleção poderá adicionar uma data para o trabalho.
                    </p>
                </div>
                <Switch
                    checked={!!form.watch(`date`)}
                    onCheckedChange={(value) => {
                        if (!value) {
                            form.setValue(`date`, undefined)
                            form.handleSubmit(onAutoSave)()
                        }
                        if (value) {
                            form.setValue(`date`, { ...DEFAULT_NEW_DATE_IN_ORDER })
                            form.handleSubmit(onAutoSave)()
                        }
                    }}
                />
            </div>
            {haveDate && <div className="flex flex-wrap gap-2 p-3">
                <FormField
                    name={`date.start`}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-col space-y-0 flex-1 min-w-fit">
                            <FormLabel>Inicio</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "P", { locale: ptBR })
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
                                        selected={field.value}
                                        onSelect={(value) => {
                                            field.onChange(value)
                                            recalculateHoursFn(form)
                                            form.handleSubmit(onAutoSave)()
                                        }}
                                        locale={ptBR}
                                        disabled={(date) =>
                                            date < new Date("1900-01-01")
                                        }
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name={`date.finish`}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-col space-y-0 flex-1 min-w-fit">
                            <FormLabel>Fim</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "P", { locale: ptBR })
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
                                        selected={field.value}
                                        onSelect={(value) => {
                                            field.onChange(value)
                                            recalculateHoursFn(form)
                                            form.handleSubmit(onAutoSave)()
                                        }}
                                        locale={ptBR}
                                        disabled={(date) =>
                                            date < new Date("1900-01-01")
                                        }
                                        captionLayout="dropdown"
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <FormField
                    name={`date.hours`}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-col flex-[2]">
                            <FormLabel>Horas de trabalho</FormLabel>
                            <Input {...field} readOnly />
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
            </div>}

        </div>
    )
}