import React from "react"
import { UseFormReturn, Path, ControllerRenderProps } from "react-hook-form"
import { customFieldComponents, getFieldType } from "./fields/index"
import z from "zod"
import { getFieldMeta } from "."
import { BuilderFieldArray } from "./array"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type SchemaData<T extends z.ZodTypeAny> = z.infer<T>

type ExtractZodType<T> =
    T extends z.ZodEffects<infer U> ? U :
    T extends z.ZodObject<any> ? T :
    never

type AddFieldConfig<T extends z.ZodTypeAny> = {
    name: string
    render: (params: {
        field: ControllerRenderProps<any>
        form: UseFormReturn<SchemaData<T>>
    }) => React.ReactNode
    position?: 'before' | 'after' | 'replace'
    relativeTo?: Path<SchemaData<T>>
}

type CustomFields<T extends z.ZodTypeAny> = {
    replace?: { [K in Path<SchemaData<T>>]?: (params: {
        field: ControllerRenderProps<SchemaData<T>>
        form: UseFormReturn<SchemaData<T>>
        schema: z.ZodTypeAny
    }) => React.ReactNode },
    add?: AddFieldConfig<T>[]
}

type GenerateChildrenWithZodProps<T extends z.ZodObject<any> | z.ZodEffects<any>> = {
    schema: T
    form: UseFormReturn<SchemaData<T>>
    formRef: React.RefObject<{ submit: (data: any) => void } | null>
    customFields?: CustomFields<ExtractZodType<T>>
    basePath?: string
}

export const generateChildrenWithZod = <T extends z.ZodObject<any> | z.ZodEffects<any>>({
    schema,
    form,
    formRef,
    customFields,
    basePath = ""
}: GenerateChildrenWithZodProps<T>): React.ReactNode => {

    const shape = schema instanceof z.ZodEffects
        ? (schema._def.schema as z.ZodObject<any>).shape as Record<string, z.ZodTypeAny>
        : schema.shape as Record<string, z.ZodTypeAny>

    const fields: React.ReactNode[] = []

    const addFields = customFields?.add || []

    console.log(`Generating form for basePath: ${basePath}`, {
        shapeKeys: Object.keys(shape),
        customFields: addFields.map(cf => cf.name),
    })

    Object.entries(shape).forEach(([fieldName, fieldSchema]) => {
        const fullPath = basePath ? `${basePath}.${fieldName}` : fieldName
        const key = fullPath as unknown as Path<SchemaData<T>>

        const beforeFields = addFields.filter(f => {
            const isRelativeMatch = f.relativeTo === fullPath
            const isPositionMatch = f.position === 'before'
            return isRelativeMatch && isPositionMatch
        })
        beforeFields.forEach(field => fields.push(renderAddField({ field, form })))

        const fieldNode = renderSchemaField({
            fullPath,
            basePath,
            schema: fieldSchema,
            form,
            formRef,
            key,
            fieldName,
            customFields,
        })

        if (fieldNode) {
            fields.push(fieldNode)
        }

        const afterField = addFields.filter(f => {
            const isRelativeMatch = f.relativeTo === fullPath
            const isPositionMatch = f.position === 'after'
            return isRelativeMatch && isPositionMatch
        })
        afterField.forEach(field => fields.push(renderAddField({ field, form })))

    })

    return (
        <div className="space-y-3">
            {fields}
        </div>
    )
}

const renderAddField = <T extends z.ZodTypeAny>(
    { field, form }: { field: AddFieldConfig<T>, form: UseFormReturn<SchemaData<T>> }
) => {
    return (
        <FormField
            key={field.name}
            name={field.name as Path<SchemaData<T>>}
            control={form.control}
            render={({ field: formField }) => (
                <FormItem>
                    {field.render({ field: formField, form })}
                </FormItem>
            )}
        />
    )
}

const renderSchemaField = <S extends z.ZodObject<any> | z.ZodEffects<any>>(
    {
        fieldName,
        fullPath,
        key,
        schema,
        form,
        formRef,
        basePath,
        customFields,
    }: {
        fieldName: string
        fullPath: string,
        key: Path<SchemaData<S>>,
        schema: z.ZodTypeAny,
        form: UseFormReturn<SchemaData<S>>,
        formRef: React.RefObject<{ submit: (data: any) => void } | null>
        basePath?: string,
        customFields?: CustomFields<ExtractZodType<S>>
    }
) => {
    const renderFn = customFields?.replace?.[key as Path<SchemaData<ExtractZodType<S>>>]
    const absolutePath = basePath ? `${basePath}.${fieldName}` : fieldName
    const meta = getFieldMeta(schema, { name: fieldName })
    const fieldType = getFieldType(schema)
    if (schema instanceof z.ZodObject || schema instanceof z.ZodEffects) {
        return (
            <fieldset key={fullPath} className="border border-accent rounded-xl p-4">
                <legend className="font-bold">{meta.label ?? fieldName}</legend>
                {generateChildrenWithZod({
                    schema: schema as unknown as S,
                    form,
                    formRef,
                    basePath: absolutePath,
                    customFields
                })}
            </fieldset>
        )
    }

    if (schema instanceof z.ZodArray && schema._def.type instanceof z.ZodObject) {
        return (
            <BuilderFieldArray
                key={fullPath}
                methods={form}
                fieldSchema={schema}
                path={fullPath}
                formRef={formRef}
            />
        )
    }

    if (schema instanceof z.ZodEnum || schema instanceof z.ZodNativeEnum) {
        const values = schema._def.values as (string | number)[]
        const options = values.map((v) => ({
            label: String(v),
            value: v
        }))
        const SelectField = customFieldComponents.select
        return (
            <SelectField
                key={fullPath}
                name={fullPath}
                schema={schema}
                formRef={formRef}
                options={options}
            />
        )
    }

    if (renderFn) {
        return (
            <FormField
                key={fullPath}
                name={key}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{fieldName}</FormLabel>
                        <FormControl>
                            {renderFn({ field, schema: schema, form: form })}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        )
    }


    const Field = customFieldComponents[fieldType]
    return (
        <Field
            key={fullPath}
            name={fullPath}
            schema={schema}
            options={[]}
            formRef={formRef}
            label={meta.label}
            description={meta.description}
        />
    )

}
