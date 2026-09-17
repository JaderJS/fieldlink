'use client'

import { ExpandedState, getCoreRowModel, getGroupedRowModel, PaginationState, RowPinningState, RowSelectionState, useReactTable } from "@tanstack/react-table"
import { columns } from "@/features/installment/core/columns.installment"
import { RenderTable } from "@/features/table/components/table"
import { useState } from "react"
import { GroupingState } from "@tanstack/react-table"
import { getExpandedRowModel } from "@tanstack/react-table"
import { getPaginationRowModel } from "@tanstack/react-table"
import { getFilteredRowModel } from "@tanstack/react-table"
import { useLocalStorage } from "usehooks-ts"
import { Installment } from "../types"
import { useInstallments } from "../hooks/useInstallments"
import { usePeriods } from "@/features/period/hooks/usePeriods"
import { useUpsertInstallment } from "../hooks/useUpsertInstallment"
import { DEFAULT_NEW_INSTALLMENT } from "../constants/new.installment"
import { useQueryClient } from "@tanstack/react-query"
import { Transaction } from "@/features/transaction/types"

interface ViewInstallmentsProps {
    initialData?: Installment[]
    transaction?: Pick<Transaction, "id">
}

export const ViewInstallments = ({ transaction }: ViewInstallmentsProps) => {

    const { data: installments } = useInstallments({ transaction })
    const { mutateAsync: upsertInstallmentFn } = useUpsertInstallment()

    const [value, setValue, removeValue] = useLocalStorage<{ grouping?: GroupingState, expanded?: ExpandedState, pagination?: PaginationState }>('view.installments', {})

    const [pagination, setPagination] = useState<PaginationState>(value?.pagination ?? { pageIndex: 0, pageSize: 10 })
    const [grouping, setGrouping] = useState<GroupingState>(value?.grouping ?? [])
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
    const [rowPinning, setRowPinning] = useState<RowPinningState>({ top: [], bottom: [], })

    const handleNewTransaction = () => {
        upsertInstallmentFn({ ...DEFAULT_NEW_INSTALLMENT, transactionId: transaction?.id })
    }

    const table = useReactTable<Installment>({
        columns: columns,
        data: installments ?? [],
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