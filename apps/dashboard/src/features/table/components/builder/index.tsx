import React from "react";
import { createColumnHelper, Row } from "@tanstack/react-table";
import { UseFieldArrayUpdate, useFormContext, UseFormReturn } from "react-hook-form";
import { z, ZodArray, ZodObject, ZodTypeAny } from "zod";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { fieldElements, FieldsType } from "./field"

export type TableMeta = {
    onUpdate?: (params: {
        rowIndex: string
        columnId: string
        value: unknown
    }) => void
    onRemove?: (params: { rowIndex: number, row: any }) => void
    onSubmit?: () => void
}

type CustomRenderContext<T extends ZodObject<any>> = {
    row: Row<z.infer<T>>
    rowIndex: number
    form: UseFormReturn<z.infer<T>>
    meta?: TableMeta
}

type CustomRenderes<T extends ZodObject<any>> = {
    [K in keyof T['shape']]?: {
        cell?: (value: z.infer<T['shape'][K]>, context: CustomRenderContext<T>) => React.ReactNode | string,
        header?: (props: { column: Column<any> }) => React.ReactNode;
        footer?: (props: { column: Column<any> }) => React.ReactNode;
        label?: (props: { column: Column<any> }) => React.ReactNode
    }
}
export type ColumnOptions<T extends ZodObject<any>> = {
    meta?: TableMeta
    enableGroupingColumns?: (keyof T['shape'])[]
}

type ExtractArrayKey<T extends z.ZodRawShape> = {
    [K in keyof T]: T[K] extends ZodArray<ZodObject<any>> ? K : never
}[keyof T]

type InferItemSchema<
    T extends z.ZodObject<any>,
    K extends ExtractArrayKey<T['shape']>
> = T['shape'][K] extends z.ZodArray<infer U>
    ? U extends z.ZodObject<any> ? U : never
    : never

export const createColumnsWithZod = <
    TSchema extends ZodObject<any>,
    TKey extends ExtractArrayKey<TSchema['shape']> = ExtractArrayKey<TSchema['shape']>,
    TData extends ZodObject<any> = InferItemSchema<TSchema, TKey>,
>(
    { schema, name, customRenderes, options }: {
        schema: TSchema,
        name: TKey,
        customRenderes?: CustomRenderes<TData>,
        options?: ColumnOptions<TData>
    }
) => {
    const columnHelper = createColumnHelper<z.infer<TData>>()
    const arraySchema = schema.shape[name] as ZodArray<ZodObject<any>>
    const rowSchema = arraySchema._def.type as ZodObject<any>
    const shape = rowSchema.shape
    const fields = Object.keys(shape)

    return [...fields.map((field) => {
        const fieldSchema = shape[field] as ZodTypeAny
        const columnType = getColumnTypeFromZod(fieldSchema)
        const isGrouped = options?.enableGroupingColumns?.includes(field as keyof TSchema['shape']) || false
        const customRenderer = customRenderes?.[field]

        const type = getColumnTypeFromZod(fieldSchema)
        const meta = options?.meta

        const headerLabel = customRenderer?.header
            ? customRenderer.header
            : field.replace(/([A-Z])/g, " $1").replace(/^./, (str) =>
                String(str).toUpperCase()
            );


        const baseColumn = columnHelper.accessor(field as any, {
            id: field,
            header: customRenderer?.header ? customRenderer.header : field.replace(`/([A-Z])/g`, ' $1').replace(`/^./`, (str) => str.toUpperCase()),
            enableGrouping: isGrouped,
            // aggregatedCell:
            aggregationFn: 'auto',
            cell: (info) => {
                const form = useFormContext()
                const rowIndex = info.row.index
                const row = info.row
                const columnId = info.column.id
                if (customRenderer?.cell) {
                    return customRenderer.cell(info.getValue(), { rowIndex, form, row })
                }
                const Field = fieldElements[type].render
                const path = `${String(name)}.${rowIndex}.${field}`
                return (
                    <Field
                        context={{
                            path, row, rowIndex, columnId,
                            meta: {
                                onUpdate: meta?.onUpdate,
                                onSubmit: meta?.onSubmit,
                                onRemove: meta?.onRemove ? (rowIndex: number) => meta.onRemove!({ rowIndex, row }) : undefined
                            }
                        }} />
                )
            },
        })
        return {
            ...baseColumn,
            meta: {
                label: headerLabel,
                ...baseColumn.meta,
                zodType: columnType,
                required: !fieldSchema.isOptional(),

            }
        }
    }),
    columnHelper.display({
        id: 'actions',
        header: 'Ações',
        cell: (info) => (
            <Button
                className="text-muted-foreground"
                variant="ghost"
                size="icon"
                onClick={() => options?.meta?.onRemove?.({ rowIndex: info.row.index, row: info.row.original })}
            >
                <Trash />
            </Button>
        )
    })]
}

export const genDescribe = ({ type, label }: { type: FieldsType, label?: string }) => {
    return JSON.stringify({ type })
}

const getColumnTypeFromZod = (schema_: ZodTypeAny): FieldsType => {
    const schema = unwrapSchema(schema_)

    if (schema.description) {
        try {
            const meta = JSON.parse(schema.description)
            if (meta?.type === 'money') return 'money'
        } catch {
        }
    }

    if (schema._def.typeName === 'ZodString') return 'text'
    if (schema._def.typeName === 'ZodNumber') return 'number'
    if (schema._def.typeName === 'ZodBoolean') return 'switch'

    if (schema._def.typeName === 'ZodDate') return 'date'
    return 'unknown'
}

const unwrapSchema = (schema: ZodTypeAny): ZodTypeAny => {
    while (schema._def.typeName === 'ZodEffects') {
        schema = schema._def.schema;
    }
    return schema;
}