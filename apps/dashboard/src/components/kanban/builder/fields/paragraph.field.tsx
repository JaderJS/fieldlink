'use client'

import { Heading, Pilcrow, Subtitles, Text } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"

const type: FieldsType = 'ParagraphField'
const extraAttributes = {
    text: 'Paragraph',
}

const fieldSchema = z.object({
    text: z.string().min(2).max(500),
})
type FieldSchema = z.infer<typeof fieldSchema>

type CustomInstance = FormFieldInstance & {
    extraAttributes: typeof extraAttributes
}

const FieldComponent = ({ fieldInstance }: { fieldInstance: FormFieldInstance }) => {

    const element = fieldInstance as CustomInstance
    const { text } = element.extraAttributes
    return (
        <p className="text-lg">{text}</p>
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
                    name="text"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titulo</FormLabel>
                            <FormControl>
                                <Textarea rows={5} {...field} onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.blur() }} />
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
    const { text } = extraAttributes

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">Paragraph field</Label>
            <p>{text}</p>
        </div>
    )
}

export const ParagraphFieldForm = {
    type,
    construct: (_id: string) => ({ _id, type, extraAttributes }),
    designerComponent: DesignerComponent,
    formComponent: FieldComponent,
    propertiesComponent: PropertiesField,
    validate: () => true,
    designerBtnElement: {
        icon: Pilcrow,
        label: 'Paragraph'
    }
}

