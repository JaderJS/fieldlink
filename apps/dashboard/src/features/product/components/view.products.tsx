'use client'

import { KEYS } from "@/core/keys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, RowPinningState, useReactTable } from "@tanstack/react-table"
import { getProducts, upsertProduct } from "../services/crud"
import { UpsertProductDialog } from "./upsert.btn.product"
import { Button } from "@/components/ui/button"
import { columns } from "../services/columns"
import { useEffect, useState } from "react"
import { DEFAULT_NEW_PRODUCT } from "../constants/new.product"
import { RowSelectionState } from "@tanstack/react-table"
import { rowSelectDefault } from "../services/utils"
import { updateRow } from "../core/row.update"
import { pinDefault } from "../core/utils"
import { DataTable } from "@/features/table/components/table/render"
import { useProducts } from "../hooks/use.products"

interface ViewProductsProps {
    products: ProductWithOptionalOrder[]
    enableQuery?: boolean
    onCallback?: (data: ProductWithOptionalOrder[]) => void
    onSelect?: (data: ProductWithOptionalOrder[]) => void
}

export const ViewProducts = ({ products, enableQuery = true, onCallback, onSelect }: ViewProductsProps) => {
    const queryClient = useQueryClient()

    const { data: productsQuery } = useProducts({ initialValues: products })

    const { mutateAsync: upsertProductFn } = useMutation({
        mutationFn: upsertProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.product.getAll() })
        }
    })

    const [data, setData] = useState<ProductWithOptionalOrder[]>(productsQuery.products)
    const [rowSelection, setRowSelection] = useState<RowSelectionState>(rowSelectDefault(productsQuery.products))
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
    const [rowPinning, setRowPinning] = useState<RowPinningState>({
        top: pinDefault(products ?? []),
        bottom: [],
    })

    const table = useReactTable({
        data,
        columns: columns,
        getRowId: (row) => String(row.id),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onRowPinningChange: setRowPinning,
        state: {
            rowSelection,
            pagination,
            rowPinning,
        },
        autoResetExpanded: false,
        autoResetPageIndex: false,
        autoResetAll: false,
        meta: {
            updateData: (rowIndex, columnId, values) => {
                const newData = updateRow(data, rowIndex, values, columnId as keyof ProductWithOptionalOrder)
                setData(newData)
                onCallback?.(newData)
                const selectedRowsIds = table.getSelectedRowModel().rows.map((row) => row.original.id)
                const selectedRows = newData.filter(({ id }) => selectedRowsIds.includes(id))
                onSelect?.(selectedRows)
            },
            deselectRow: (rowIndex) => {
                const selectedRows = table.getSelectedRowModel().rows.filter((row) => row.index !== rowIndex).map(row => row.original)
                onSelect?.(selectedRows)
            },
            addRow: () => {
                upsertProductFn(DEFAULT_NEW_PRODUCT)
            }
        }
    })

    useEffect(() => {
        setData(productsQuery.products)
    }, [productsQuery])

    return (
        <>
            <DataTable table={table} columns={columns} />
        </>
    )
}