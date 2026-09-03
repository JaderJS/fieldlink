import { UseFormReturn } from "react-hook-form"
import { z, ZodTypeAny } from "zod"
import { FormFieldText } from "./text"
import { FormFieldSelect, SelectFieldHandle, SelectFieldProps } from "./select"
import React from "react"
import { FormFieldDate } from "./date"

export type BaseFieldProps = {
    name: string
    formRef: React.RefObject<{ submit: (data: any) => void } | null>
    schema: ZodTypeAny,
    label?: string
    description?: string
    showLabel?: boolean
    children?: (params: {
        field: any
        fieldSchema: ZodTypeAny
        form: UseFormReturn<any>
    }) => React.ReactNode
}

export type TypeCustomFields = "text" | "select" | "date"// | "custom" | "checkbox" | string

type FieldComponents = {
    text: React.ForwardRefExoticComponent<
        BaseFieldProps & React.RefAttributes<HTMLInputElement>
    >
    select: React.ForwardRefExoticComponent<
        SelectFieldProps & React.RefAttributes<SelectFieldHandle>
    >
    date: React.ForwardRefExoticComponent<
        BaseFieldProps & React.RefAttributes<HTMLInputElement>
    >
}

export const customFieldComponents: FieldComponents = {
    text: FormFieldText,
    select: FormFieldSelect,
    date: FormFieldDate
} as const

export const getFieldType = (schema: ZodTypeAny): TypeCustomFields => {
    if (schema instanceof z.ZodEnum || schema._def.typeName === 'ZodEnum') {
        return 'select'
    }


    if (schema instanceof z.ZodString) {
        const checks = schema._def.checks || []
        if (checks.some(c => c.kind === 'uuid')) return 'text'
        return 'text'
    }

    if (schema instanceof z.ZodDate) return 'date'

    return 'text'
}
