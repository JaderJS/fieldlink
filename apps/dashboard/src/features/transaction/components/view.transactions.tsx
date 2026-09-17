'use client'

import { ExpandedState, getCoreRowModel, getGroupedRowModel, PaginationState, RowPinningState, RowSelectionState, useReactTable } from "@tanstack/react-table"
import { columns } from "@/features/transaction/services/columns"
import { RenderTable } from "@/features/table/components/table"
import { Transaction } from "../types"
import { useState } from "react"
import { GroupingState } from "@tanstack/react-table"
import { getExpandedRowModel } from "@tanstack/react-table"
import { getPaginationRowModel } from "@tanstack/react-table"
import { getFilteredRowModel } from "@tanstack/react-table"
import { useUpsertTransaction } from "@/features/transaction/hooks/use.upsert.transaction"
import { DEFAULT_NEW_TRANSACTION } from "../constants/new.transaction"
import { useLocalStorage } from "usehooks-ts"
import { useTransactions } from "../hooks/use.transactions"
import { usePeriods } from "@/features/period/hooks/usePeriods"
import { useBanks } from "@/features/bank/hooks/useBanks"

export const ViewTransactions = () => {

    const { data: transactions } = useTransactions({ initialData: [] })
    const { mutateAsync: upsertTransactionFn } = useUpsertTransaction()

    const { data: banks } = useBanks()
    const { data: periods } = usePeriods()

    const [value, setValue, removeValue] = useLocalStorage<{ grouping?: GroupingState, expanded?: ExpandedState, pagination?: PaginationState }>('view.transactions_', {})

    const [pagination, setPagination] = useState<PaginationState>(value?.pagination ?? { pageIndex: 0, pageSize: 10 })
    const [grouping, setGrouping] = useState<GroupingState>(value?.grouping ?? [])
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [rowPinning, setRowPinning] = useState<RowPinningState>({ top: [], bottom: [], })

    const handleNewTransaction = () => {
        if (!Array.isArray(periods)) return

        upsertTransactionFn({
            ...DEFAULT_NEW_TRANSACTION,
            installments: DEFAULT_NEW_TRANSACTION.installments.map(({ id, transactionId, ...installment }, index) => ({
                ...installment,
                periodId: periods.at(0)?.id,
            })),
            bankId: banks?.[0]?.id ?? -1
        })
    }

    const table = useReactTable<Transaction>({
        columns: columns,
        data: transactions ?? [],
        state: {
            rowSelection,
            grouping,
            pagination,
            rowPinning
        },
        getRowId: ({ id }) => String(id),
        getCoreRowModel: getCoreRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onGroupingChange: (updater) => {
            setGrouping((prevGrouping) => {
                const newGrouping = typeof updater === 'function' ? updater(prevGrouping) : updater
                setValue((prev) => ({ ...prev, grouping: newGrouping }))
                return newGrouping
            })
        },
        onPaginationChange: setPagination,
        onRowPinningChange: setRowPinning,
        autoResetPageIndex: false,
        autoResetExpanded: false,
        meta: {
            addRow: () => {
                handleNewTransaction()
            }
        }
    })

    return (
        <RenderTable table={table} columns={columns} />
    )
}