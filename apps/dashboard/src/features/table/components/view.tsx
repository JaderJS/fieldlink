'use client'
import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getGroupedRowModel, useReactTable, RowSelectionState, GroupingState, RowPinningState, getPaginationRowModel, DisplayColumnDef, ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react"
import { z, ZodArray } from "zod";
import { createColumnsWithZod, genDescribe } from "./builder";
import { useFieldArray, UseFieldArrayReturn, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { DataTable } from "./table/render";
import { createId } from "@paralleldrive/cuid2";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import debounce from "lodash.debounce";

const schema = z.object({
    rows: z.array(z.object({
        id: z.string(),
        email: z.string().email(),
        date: z.coerce.date(),
        boolean: z.coerce.boolean(),
        amount: z.coerce.number().describe(genDescribe({ type: "money", })),
        name: z.string().min(1, { message: "Por favor insira ao menos um nome" }),
        lastName: z.string().min(1, { message: "Por favor, insira seu sobrenome" }),
        value: z.coerce.number()
    }))
})


type Schema = z.infer<typeof schema>

export const ViewTable = () => {

    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            rows: Array.from({ length: 4 }).map((_, index) => ({ id: String(index), name: "Jader", value: 19, lastName: "JK", amount: 2, boolean: true, date: new Date(), email: 'jader.jader55@gmail.com' }))
        }
    })

    const { fields, update, remove, append } = useFieldArray({ control: form.control, name: "rows", keyName: 'key' })

    const submitRow = (action: 'create' | 'update' | 'delete', data: z.infer<typeof schema>['rows'][number]) => {
        const safe = schema.shape.rows.safeParse([data])
        if (safe.error) {
            return
        }
        console.log(action, data)

    }

    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
    const [grouping, setGrouping] = React.useState<GroupingState>([])
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 5 })
    const [rowPinning, setRowPinning] = React.useState<RowPinningState>({ top: [], bottom: [], })

    const submit = (data: Schema) => {
        console.log("Submitted data", data)
    }

    const debounceSave = React.useMemo(() => debounce(submit, 1000), [])
    const debounceRow = React.useMemo(() => debounce(submitRow, 1000), [])

    const columns = React.useMemo(() => createColumnsWithZod({
        schema: schema,
        name: "rows",
        customRenderes: {
            lastName: {
                header: () => "Sobrenome"
            },
            id: {
                header: () => <p>#</p>,
                cell: (value, { row, rowIndex, form, meta }) => (
                    <div className="flex justify-center items-center group transition-all">
                        <Checkbox
                            className={cn("opacity-0 group-hover:opacity-100", row.getIsSelected() && "opacity-100")}
                            onCheckedChange={(checked) => {
                                row.toggleSelected()
                                row.pin(checked ? 'top' : false)
                            }}
                            checked={row.getIsSelected()}
                            aria-label="select row"
                        />
                        {!row.getIsSelected() && <p className="absolute group-hover:invisible ">{rowIndex}</p>}
                    </div>
                )
            }
        },
        options: {
            enableGroupingColumns: ['name', 'lastName', 'amount', 'email'],
            meta: {
                onUpdate: ({ rowIndex, value }) => {
                    update(Number(rowIndex), value as any)
                    debounceRow('update', value as any)
                    form.handleSubmit(debounceSave)()
                },
                onRemove: ({ rowIndex }) => {
                    remove(rowIndex)
                    debounceRow('delete', { id: rowIndex } as any)
                    form.handleSubmit(debounceSave)()
                },
            }
        }
    }), [])

    const table = useReactTable({
        data: fields,
        columns,
        state: {
            rowSelection,
            grouping,
            pagination,
            rowPinning
        },
        getRowId: ({ id }) => String(id),
        onGroupingChange: setGrouping,
        getCoreRowModel: getCoreRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onRowPinningChange: setRowPinning,
        autoResetPageIndex: false,
        autoResetExpanded: false,
        meta: {
            addRow: () => {
                const newData: Schema['rows'][number] = { id: createId(), lastName: "", name: 'Novo', value: 9999, amount: 0, boolean: false, date: new Date(), email: "" }
                append(newData, { shouldFocus: true })
                debounceRow('create', newData)
                form.handleSubmit(debounceSave)
            },
            deselectRow: () => { },
            addRowWithGrouping: (group) => {
                const newData: Schema['rows'][number] = { id: createId(), lastName: "", name: 'Novo', value: 9999, amount: 0, boolean: false, date: new Date(), email: "" }
                append({ ...newData, ...group }, { shouldFocus: true })
                debounceRow('create', newData)
                form.handleSubmit(debounceSave)
            }
        },

    })

    return (
        <>
            <Form {...form}>
                <DataTable table={table} columns={columns} />
            </Form>
        </>
    )
}