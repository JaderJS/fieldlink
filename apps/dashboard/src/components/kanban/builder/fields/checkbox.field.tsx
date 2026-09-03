'use client'

import { ChartGanttIcon, Check, Text, Type } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"

const type: FieldsType = 'CheckboxField'
const extraAttributes = {
    label: 'Text field',
    description: 'Helper text',
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

    const [value, setValue] = useState<boolean>(defaultValue === 'true' ? true : false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(isInvalid === true)
    }, [isInvalid])

    const { _id, extraAttributes: { label, required, description } } = fieldInstance as CustomInstance
    const id_ = `checkbox-${_id}`
    return (
        <div className="flex items-top space-x-4">
            <Checkbox
                id={id_}
                checked={value}
                className={cn(error && 'border-red-500')}
                onCheckedChange={(check) => {
                    let value = true
                    if (check === true) value = true
                    setValue(value)
                    const valid = CheckboxForm.validate(fieldInstance, value ? 'true' : 'false')
                    setError(!valid)
                    submitValue?.(_id, value ? 'true' : 'false')
                }}
            />
            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={id_} className={cn(error && 'text-red-500')}>
                    {label}
                    {required && '*'}
                </Label>
            {description && <p className={cn(error && 'text-red-500', "text-muted-foreground text-[0.8rem]")}>{description}</p>}
            </div>
        </div>
    )
}

const PropertiesField = ({ fieldInstance }: { fieldInstance: FormFieldInstance }) => {

    const { updateField } = useFormBuilder()
    const element = fieldInstance as CustomInstance
    const form = useForm<FieldSchema>({ resolver: zodResolver(fieldSchema), mode: 'onBlur', defaultValues: { ...element.extraAttributes } })

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

    const { _id, extraAttributes: { label, required, description } } = fieldInstance as CustomInstance
    const id_ = `checkbox-${_id}`
    return (
        <div className="flex items-center space-x-4">
        <Checkbox id={id_} />
        <div className="grid gap-1.5 leading-none">
            <Label htmlFor={id_}>
                {label}
                {required && '*'}
            </Label>
            {description && <p className="text-muted-foreground text-[0.8rem]">{description}</p>}
        </div>
    </div>
    )
}

export const CheckboxForm: FormElement = {
    type,
    construct: (_id: string) => ({ _id, type, extraAttributes }),
    designerComponent: DesignerComponent,
    formComponent: FieldComponent,
    propertiesComponent: PropertiesField,
    validate: (formField: FormFieldInstance, currentValue: string): boolean => {
        const field = formField as CustomInstance
        if (field.extraAttributes.required) {
            return currentValue !== 'true'
        }
        return true
    },
    designerBtnElement: {
        icon: Check,
        label: 'Checkbox field'
    }
}

