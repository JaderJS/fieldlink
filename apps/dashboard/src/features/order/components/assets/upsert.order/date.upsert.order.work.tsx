'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { DEFAULT_NEW_DATE_IN_ORDER } from "@/features/order/constants/new.date"
import { UpsertOrderSchema } from "@/features/order/schema/upsert.schema"
import { cn } from "@/lib/utils"
import { differenceInHours, format, max, min } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { FieldValues, UseFormReturn } from "react-hook-form"

interface FormProps<T extends FieldValues> {
    form: UseFormReturn<T>
    onAutoSave: (data: T) => void
    index: number
    className?: string
}

export const FormUpsertDateInWork = ({ form, index, onAutoSave, className }: FormProps<UpsertOrderSchema>) => {

    const haveDate = !!form.watch(`works.${index}.date`)

    const recalculateHoursFn = (form: UseFormReturn<UpsertOrderSchema>) => {

        const date = form.getValues(`works.${index}.date`)
        if (!date?.start || !date.finish) return

        const allDatesInWork = form.getValues('works')?.map(({ date }) => date).filter(date => date !== undefined) ?? []
        const allStartDatesInWork = allDatesInWork.map(date => date.start)
        const allFinishDatesInWork = allDatesInWork.map(date => date.finish)

        const minDate = min(allStartDatesInWork)
        const maxDate = max(allFinishDatesInWork)

        const hours = differenceInHours(date.finish, date.start)
        form.setValue(`works.${index}.date.hours`, hours)
        form.setValue(`date`, { start: minDate, finish: maxDate, hours: differenceInHours(maxDate, minDate) })
    }

    return (
        <div className={cn("border rounded-xl p-2", className)}>
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                    <Label>Adicionar data?</Label>
                    <p className="text-xs text-muted-foreground">
                        Marcando a seleção poderá adicionar uma data para o trabalho.
                    </p>
                </div>
                <Switch
                    checked={!!form.watch(`works.${index}.date`)}
                    onCheckedChange={(value) => {
                        if (!value) {
                            form.setValue(`works.${index}.date`, undefined)
                            form.handleSubmit(onAutoSave)()
                            return
                        }
                        if (value) {
                            form.setValue(`works.${index}.date`, { ...DEFAULT_NEW_DATE_IN_ORDER })
                            form.handleSubmit(onAutoSave)()
                        }
                    }}
                />
            </div>
            {haveDate && <div className="grid auto-cols-fr grid-flow-col gap-12">
                <FormField
                    name={`works.${index}.date.start`}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-col p-1">
                            <FormLabel className="line-clamp-1">Inicio</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal w-fit",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "P", { locale: ptBR })
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        locale={ptBR}
                                        onSelect={(value) => {
                                            field.onChange(value)
                                            recalculateHoursFn(form)
                                            form.handleSubmit(onAutoSave)()
                                        }}
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
                    name={`works.${index}.date.finish`}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-col p-1">
                            <FormLabel className="line-clamp-1">Fim</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal w-fit",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "P", { locale: ptBR })
                                            ) : (
                                                <span>Pick a date</span>
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
                    name={`works.${index}.date.hours`}
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex flex-col p-1">
                            <FormLabel className="line-clamp-1">Horas de trabalho</FormLabel>
                            <Input {...field} readOnly />
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>}

        </div>
    )
}