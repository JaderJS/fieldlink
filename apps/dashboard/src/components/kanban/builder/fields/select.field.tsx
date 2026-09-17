'use client'

import { BoxSelect, Calendar as CalendarIcon, Plus, SquareMousePointer, Text, X } from "lucide-react"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar } from '@/components/ui/calendar'
import { MultiSelect } from "@/components/ui/multi-select"

const type: FieldsType = 'SelectField'
const extraAttributes = {
    label: 'Select field',
    description: 'Helper text',
    placeholder: 'Value here...',
    options: [],
    required: false,
}

const fieldSchema = z.object({
    label: z.string().min(2).max(50),
    description: z.string().optional(),
    placeholder: z.string().min(2).max(200),
    options: z.array(z.string()).default([]),
    required: z.boolean().default(false),
})
type FieldSchema = z.infer<typeof fieldSchema>

type CustomInstance = FormFieldInstance & {
    extraAttributes: typeof extraAttributes
}

const FieldComponent = ({ fieldInstance, submitValue, isInvalid }: { fieldInstance: FormFieldInstance, submitValue?: SubmitFunction, isInvalid?: boolean }) => {

    const field = fieldInstance as CustomInstance
    const { label, required, options, description } = field.extraAttributes
    const [value, setValue] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(isInvalid === true)
    }, [isInvalid])

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(error && 'text-red-500')}>
                {label}
                {required && '*'}
            </Label>
            <MultiSelect
                options={options?.map(value => ({ label: value, value }))}
                className={cn(error && 'border-red-500')}
                onValueChange={(value) => {
                    setValue(value[0])
                    const valid = SelectFieldForm.validate(field, value[0])
                    setError(!valid)
                    submitValue?.(field._id, value[0])
                }}
            />
            {description && <p className={cn(error && 'text-red-500', "text-muted-foreground text-[0.8rem]")}>{description}</p>}
        </div>
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
                    name="options"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center">
                                <FormLabel>Opções</FormLabel>
                            </div>
                            <Button
                                variant={"outline"}
                                className="gap-2"
                                onClick={(e) => {
                                    e.preventDefault()
                                    form.setValue('options', field.value.concat("New option"))
                                }}
                            >
                                <Plus />
                            </Button>
                            <div className="flex flex-col gap-2">
                                {form.watch('options')?.map((option, index) => (
                                    <div key={index} className="flex items-center justify-between gap-1">
                                        <Input
                                            placeholder=""
                                            value={option}
                                            onChange={(e) => {
                                                field.value[index] = e.target.value
                                                field.onChange(field.value)
                                            }}
                                        />
                                        <Button
                                            variant={"ghost"}
                                            size={"icon"}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                const newOptions = [...field.value]
                                                newOptions.splice(index, 1)
                                                field.onChange(newOptions)
                                            }}
                                        >
                                            <X />
                                        </Button>
                                    </div>
                                ))}
                            </div>
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

    const field = fieldInstance as CustomInstance
    const { label, required, options, description } = field.extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && '*'}
            </Label>
            <MultiSelect onValueChange={(value) => { }} options={options?.map(value => ({ label: value, value }))} />
            {description && <p className="text-muted-foreground text-[0.8rem]">{description}</p>}
        </div>
    )
}

export const SelectFieldForm: FormElement = {
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
        icon: SquareMousePointer,
        label: 'Select field'
    }
}

