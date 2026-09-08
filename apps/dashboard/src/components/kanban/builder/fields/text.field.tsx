'use client'

import { LoaderIcon, Text, Type } from "lucide-react"
import { FieldsType, FormField as FormElement, FormFieldInstance, SubmitFunction } from "../types/field.types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FocusEvent, ReactElement, useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { useFormBuilder } from "@/providers/kanban"
import { cn } from "@/lib/utils"

const type: FieldsType = 'TextField'
const extraAttributes = {
    label: 'Campo de texto',
    description: 'Descrição',
    required: false,
    placeholder: 'Valor aqui...'
}

const fieldSchema = z.object({
    label: z.string().min(2).max(50),
    description: z.string().optional(),
    required: z.boolean().default(false),
    placeholder: z.string().min(2).max(25)
})
type FieldSchema = z.infer<typeof fieldSchema>

type CustomInstance = FormFieldInstance & {
    extraAttributes: typeof extraAttributes
}

interface FieldComponentProps {
    fieldInstance: FormFieldInstance,
    submitValue?: SubmitFunction,
    isInvalid?: boolean
    promise?: () => Promise<void>
    defaultValue?: string
    isLoading?: boolean
    isSuccess?: boolean
}

const FieldComponent = ({ fieldInstance, submitValue, isInvalid, defaultValue, ...props }: FieldComponentProps) => {

    const element = fieldInstance as CustomInstance
    const [value, setValue] = useState(defaultValue || "")
    const [error, setError] = useState(false)

    useEffect(() => {
        setError(isInvalid === true)
    }, [isInvalid])

    const handlerBlur = (event: FocusEvent<HTMLInputElement>) => {
        const valid = TextFieldFormElement.validate(element, event.target.value)
        setError(!valid)
        if (!valid) return
        submitValue?.(element._id, event.target.value)
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center">
                <Label className={cn(error && 'text-red-500')}>
                    {element.extraAttributes.label}
                    {element.extraAttributes.required && '*'}
                </Label>
                {props.isLoading && <LoaderIcon className="animate-spin h-3 w-3 text-green-500 ml-2" />}
            </div>
            <Input
                value={value}
                className={cn(
                    error && 'border-red-500',
                    props.isLoading && 'border-green-500'
                )}
                placeholder={element.extraAttributes.placeholder}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handlerBlur}
            />
            {element.extraAttributes.description && <p className={cn(error && 'text-red-500', "text-muted-foreground text-[0.8rem]")}>{element.extraAttributes.description}</p>}
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
                    name="placeholder"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Placeholder</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }} />
                            </FormControl>
                            <FormDescription>
                                O placeholder do campo
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
            <Input readOnly disabled placeholder={element.extraAttributes.placeholder} />
            {element.extraAttributes.description && <p className="text-muted-foreground text-[0.8rem]">{element.extraAttributes.description}</p>}
        </div>
    )
}

export const TextFieldFormElement: FormElement = {
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
        icon: Type,
        label: 'Text field'
    }
}

