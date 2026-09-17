'use client'

import { Heading, LetterText, Subtitles, Text } from "lucide-react"
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

const type: FieldsType = 'SubtitleField'
const extraAttributes = {
    title: 'Title',
}

const fieldSchema = z.object({
    title: z.string().min(2).max(50),
})
type FieldSchema = z.infer<typeof fieldSchema>

type CustomInstance = FormFieldInstance & {
    extraAttributes: typeof extraAttributes
}

const FieldComponent = ({ fieldInstance }: { fieldInstance: FormFieldInstance }) => {

    const element = fieldInstance as CustomInstance
    const { title } = element.extraAttributes
    return (
        <p className="text-lg">{title}</p>
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
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titulo</FormLabel>
                            <FormControl>
                                <Input {...field} onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }} />
                            </FormControl>
                            <FormDescription>
                                Informe um titulo para o campo
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </form>
        </Form>
    )
}

const DesignerComponent = ({ fieldInstance }: { fieldInstance: FormFieldInstance }) => {

    const { extraAttributes } = fieldInstance as CustomInstance
    const { title } = extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">Subtitle field</Label>
            <p className="text-lg">{title}</p>
        </div>
    )
}

export const SubtitleFieldForm = {
    type,
    construct: (_id: string) => ({ _id, type, extraAttributes }),
    designerComponent: DesignerComponent,
    formComponent: FieldComponent,
    propertiesComponent: PropertiesField,
    validate: () => true,
    designerBtnElement: {
        icon: LetterText,
        label: 'Subtitle'
    }
}

