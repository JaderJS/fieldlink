'use client'

import { Calendar as CalendarIcon, Text } from "lucide-react"
import { FieldsType, FormField as FormElement, FormFieldInstance, SubmitFunction } from "../types/field.types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { useFormBuilder } from "@/providers/kanban"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const type: FieldsType = 'DateField'
const extraAttributes = {
    label: 'Selecione uma data',
    description: 'Selecione uma data',
    required: false,
}

const fieldSchema = z.object({
    label: z.string().min(2).max(50),
    description: z.string().optional(),
    required: z.boolean().default(false),
})
type FieldSchema = z.infer<typeof fieldSchema>

type CustomInstance = FormFieldInstance & {
    extraAttributes: typeof extraAttributes
}

const FieldComponent = ({ fieldInstance, submitValue, isInvalid, defaultValue }: { fieldInstance: FormFieldInstance, submitValue?: SubmitFunction, isInvalid?: boolean, defaultValue?: string }) => {

    const element = fieldInstance as CustomInstance
    const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined)
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(isInvalid === true)
    }, [isInvalid])

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(error && 'text-red-500')}>
                {element.extraAttributes.label}
                {element.extraAttributes.required && '*'}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"ghost"}
                        className={cn(
                            "w-full justify-start text-left font-normal border",
                            !date && 'text-muted-foreground',
                            error && 'border-red-500'
                        )}
                    >

                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>

                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        initialFocus
                        onSelect={(date) => {
                            setDate(date)
                            const value = date?.toUTCString() || ""
                            const valid = DateFieldForm.validate(element, value)
                            setError(!valid)
                            submitValue?.(element._id, value)
                        }}
                    />

                </PopoverContent>
            </Popover>
            {element.extraAttributes.description && <p className={cn(error && 'text-red-500', "text-muted-foreground text-[0.8rem]")}>{element.extraAttributes.description}</p>}
        </div >
    )
}

const PropertiesField = ({ fieldInstance }: { fieldInstance: FormFieldInstance }) => {

    const { updateField } = useFormBuilder()
    const element = fieldInstance as CustomInstance
    const form = useForm<FieldSchema>({ resolver: zodResolver(fieldSchema as any), mode: 'onBlur', defaultValues: { ...element.extraAttributes } })

    const applyChanges = (values: FieldSchema) => {
        updateField(element._id, { ...element, extraAttributes: values })
    }

    useEffect(() => {
        form.reset(element.extraAttributes)
    }, [element, form])

    return (
        <Form {...form}>
            <form onBlur={form.handleSubmit(applyChanges)} onSubmit={e => e.preventDefault()} className="space-y-3">
                <FormField
                    name="label"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }} />
                            </FormControl>
                            <FormDescription>
                                Informe o nome que melhor descreve o campo
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }} />
                            </FormControl>
                            <FormDescription>
                                Descrição do campo
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    name="required"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-xs">
                            <div className="space-y-0.5">
                                <FormLabel>Campo obrigatório?</FormLabel>
                                <FormDescription>
                                    Informe se o campo é obrigatório para avançar para a próxima etapa
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </form>
        </Form>
    )
}

const DesignerComponent = ({ fieldInstance }: { fieldInstance: FormFieldInstance }) => {

    const element = fieldInstance as CustomInstance

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {element.extraAttributes.label}
                {element.extraAttributes.required && '*'}
            </Label>
            <Button variant={"ghost"} className="w-full justify-start text-left font-normal border">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Selecione uma data</span>
            </Button>
            {element.extraAttributes.description && <p className="text-muted-foreground text-[0.8rem]">{element.extraAttributes.description}</p>}
        </div>
    )
}

export const DateFieldForm: FormElement = {
    type,
    construct: (_id: string) => ({ _id, type, extraAttributes }),
    designerComponent: DesignerComponent,
    formComponent: FieldComponent,
    propertiesComponent: PropertiesField,
    validate: (formField: FormFieldInstance, currentValue: string): boolean => {
        const field = formField as CustomInstance
        if (field.extraAttributes.required) {
            return currentValue.length > 0
        }
        return true
    },
    designerBtnElement: {
        icon: CalendarIcon,
        label: 'Date field'
    }
}

