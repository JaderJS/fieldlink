'use client'

import { getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getGroupedRowModel, useReactTable, RowSelectionState, GroupingState, RowPinningState, getPaginationRowModel, ExpandedRow, ExpandedState } from "@tanstack/react-table"
import React from "react"
import { z } from "zod"
import { createColumnsWithZod, genDescribe } from "@/features/table/components/builder"
import { useFieldArray, UseFieldArrayReturn, useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { DataTable } from "@/features/table/components/table/render"
import { cn } from "@/lib/utils"
import debounce from "lodash.debounce"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"
import { deleteTransaction, getTransactions, upsertTransaction } from "@/features/adm/services/transaction.crud"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { getBgColorByWord } from "@/components/utils"
import { getCompanies } from "../../../company/services/company.crud"
import Link from "next/link"
import { DEFAULT_TRANSACTION_IN_VIEW } from "../../constants/transaction"
import { getPeriods } from "../../services/period.crud"
import { useLocalStorage } from 'usehooks-ts'
import { getBanks } from "../../services/bank.crud"
import { useTransactions } from "../../hooks/use.transactions"

export const schema = z.object({
    rows: z.array(z.object({
        id: z.coerce.number().optional(),
        title: z.string(),
        type: z.enum(["INPUT", "OUTPUT"]),
        description: z.string().nullish(),
        isDelete: z.coerce.boolean(),
        hasNfe: z.coerce.boolean(),
        value: z.coerce.number().describe(genDescribe({ type: 'money' })),
        billed: z.coerce.boolean().describe(genDescribe({ type: 'checkbox', label: "Faturado?" })),
        fromAt: z.coerce.date(),
        createCuid: z.string(),
        updatedCuid: z.string(),
        companyId: z.coerce.number(),
        bankId: z.coerce.number(),
        periodId: z.coerce.number(),
        content: z.string(),
        hasNotify: z.coerce.boolean(),
        period: z.object({ name: z.string() }).optional(),
        bank: z.object({ name: z.string() }).optional(),
        company: z.object({ name: z.string() }).optional()
    }))
})


export type Schema = z.infer<typeof schema>

export const ViewTransactions = () => {
    const queryClient = useQueryClient()

    const { data: transactions } = useTransactions()

    const { data: periods } = useQuery({
        queryKey: KEYS.period.getAll(),
        queryFn: getPeriods,
        select: data => data.periods
    })

    const { data: banks } = useQuery({
        queryKey: KEYS.bank.getAll(),
        queryFn: getBanks,
        select: data => data.banks
    })

    const { data: companies } = useQuery({
        queryKey: KEYS.company.getAll(),
        queryFn: getCompanies,
        select: data => data.companies
    })

    const { mutate: upsertTransactionFn } = useMutation({
        mutationFn: upsertTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.transaction.getAll() })
        }
    })

    const form = useForm<Schema>({
        resolver: zodResolver(schema),
        mode: 'onBlur',
        defaultValues: {
            // rows: transactions
        }
    })

    const [value, setValue, removeValue] = useLocalStorage<{ grouping?: Array<any>, expanded?: ExpandedState }>('view.transactions', {})
    const { fields, update, remove, append } = useFieldArray({ control: form.control, name: "rows", keyName: 'key' })

    const submitRow = (action: 'create' | 'update' | 'delete', data: z.infer<typeof schema>['rows'][number]) => {
        const safe = schema.shape.rows.safeParse([data])
        if (safe.error) {
            return
        }
        if (['update'].includes(action)) {
            upsertTransactionFn(data)
            return
        } else if (['create'].includes(action)) {
            const bankId = banks?.[0].id ?? 0
            const periodId = periods?.[0].id ?? 0
            const companyId = companies?.[0].id ?? 0
            const res = { ...data, bankId, companyId }
            upsertTransaction(res)
        } else if (['delete'].includes(action)) {
            upsertTransaction({ ...data, isDelete: true })
        }

    }

    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
    const [expanded, setExpanded] = React.useState<ExpandedState>(value.expanded || {})
    const [grouping, setGrouping] = React.useState<GroupingState>(value?.grouping || [])
    const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 50 })
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
            id: {
                header: () => <>#</>,
                cell: (value, { row }) => (
                    <div className="group">
                        <Link href={`/adm/transaction/${row.original.id}`}>
                            <span className="group-hover:underline">{value}</span>
                        </Link>
                    </div>
                ),
            },
            type: {
                header: () => <>Tipo</>,
                cell: (value, { row }) => (
                    <Select
                        value={value}
                        onValueChange={(e) => {
                            const value = e as "INPUT" | "OUTPUT"
                            update(row.index, { ...row.original, type: value })
                            debounceRow('update', { ...row.original, type: value })
                        }}
                    >
                        <SelectTrigger className={cn(value === "INPUT" ? "bg-emerald-200" : "bg-red-200")}>
                            <SelectValue placeholder="Entrada/Saida" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="INPUT">Entrada</SelectItem>
                            <SelectItem value="OUTPUT">Saida</SelectItem>
                        </SelectContent>
                    </Select>
                )
            },
            periodId: {
                header: () => <>Período</>,
                cell: (value, { row }) => (
                    <Select
                        value={String(value)}
                    >
                        <SelectTrigger className="w-fit">
                            <SelectValue placeholder="Período" />
                        </SelectTrigger>
                        <SelectContent>
                            {periods?.map(({ id, name }) => (
                                <SelectItem key={id} value={String(id)}>{name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ),
            },
            bankId: {
                header: () => <>Banco</>,
                cell: (value, { row }) => (
                    <Badge className={getBgColorByWord(String(value))}>{row.original.bank?.name}</Badge>
                )
            },
            companyId: {
                header: () => <>Empresa</>,
                cell: (value, { row }) => <>{row.original.company?.name}</>
            },
        },
        options: {
            enableGroupingColumns: ['periodId', 'type'],
            meta: {
                onUpdate: ({ rowIndex, value }) => {
                    update(Number(rowIndex), value as any)
                    debounceRow('update', value as any)
                    form.handleSubmit(debounceSave)()
                },
                onRemove: ({ rowIndex, row }) => {
                    remove(rowIndex)
                    submitRow('delete', row)
                    form.handleSubmit(debounceSave)()
                },
            }
        }
    }), [periods])

    const table = useReactTable({
        data: fields,
        columns,
        state: {
            columnVisibility: {
                content: false,
                period: false,
                company: false,
                bank: false,
                description: false,
                createdCuid: false,
                isDelete: false,
                hasNfe: false,
                updatedCuid: false,
                hasNotify: false,
                createCuid: false,
                companyId: false,
            },
            rowSelection,
            grouping,
            pagination,
            rowPinning,
            expanded,
        },
        getRowId: ({ id }) => String(id),
        getCoreRowModel: getCoreRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onRowPinningChange: setRowPinning,
        onExpandedChange: (updater) => {
            setExpanded((prevExpanded) => {
                const newExpanded = typeof updater === 'function' ? updater(prevExpanded) : updater
                setValue((prev) => ({ ...prev, expanded: newExpanded }))
                return newExpanded
            })
        },
        onGroupingChange: (updater) => {
            setGrouping((prevGrouping) => {
                const newGrouping = typeof updater === 'function' ? updater(prevGrouping) : updater
                setValue((prev) => ({ ...prev, grouping: newGrouping }))
                return newGrouping
            })
        },
        autoResetPageIndex: false,
        autoResetExpanded: false,
        meta: {
            addRow: () => {
                const newData: Schema['rows'][number] = { ...DEFAULT_TRANSACTION_IN_VIEW }
                append(newData, { shouldFocus: true })
                debounceRow('create', newData)
                form.handleSubmit(debounceSave)
            },
            deselectRow: () => { },
            addRowWithGrouping: (group) => {
                const newData: Schema['rows'][number] = { ...DEFAULT_TRANSACTION_IN_VIEW, ...group }
                append({ ...newData, ...group }, { shouldFocus: true })
                debounceRow('create', newData)
                form.handleSubmit(debounceSave)
            }
        },

    })

    return (
        <Form {...form}>
            <DataTable table={table} columns={columns} />
        </Form>
    )
}