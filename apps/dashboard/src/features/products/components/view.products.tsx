'use client'

import { Children, createContext, Fragment, isValidElement, ReactElement, ReactNode, useEffect, useMemo, useState } from "react"
import { useProductsComponent } from "../hooks/use.products.component"
import { RenderTable } from "./table/render.table"
import { Header } from "./view/header"
import { MoreActions } from "./view/more.actions"
import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, PaginationState, RowPinningState, RowSelectionState, Table, useReactTable } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ban, Edit, MoreHorizontal, Trash, Unlink } from "lucide-react"
import { pinDefault, rowSelectDefault } from "../helpers/default"
import { columns } from "../core/columns.products"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UpsertProduct } from "./upsert.product"
import { useUpsertProduct } from "../hooks/use.upsert.product"
import { defaultNewProduct } from "../constants/default.product"
import { useDeleteProduct } from "../hooks/use.delete.product"

export const ProductsTableContext = createContext<{ table: Table<ProductWithOptionalOrder> } | undefined>(undefined)

export const ViewProducts = ({ children }: { children?: ReactNode }) => {
    const { products, clearSelection, selectedProducts } = useProductsComponent()
    const { mutateAsync: upsertProductFn } = useUpsertProduct()
    const { mutateAsync: deleteProductFn } = useDeleteProduct()

    const [editProduct, setEditProduct] = useState<ProductWithOptionalOrder | undefined>(undefined)

    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 5 })
    const [rowSelection, setRowSelection] = useState<RowSelectionState>(rowSelectDefault(selectedProducts))
    const [rowPinning, setRowPinning] = useState<RowPinningState>({ top: pinDefault(selectedProducts), bottom: [] })

    const childArray = useMemo(() => Children.toArray(children), [children])

    const headerSlots = useMemo(() => {
        return childArray.filter(c => isValidElement(c) && (c.type === Header)) as ReactElement<{ children: ReactNode }>[]
    }, [childArray])

    const moreActionsSlots = useMemo(() => {
        return childArray.filter(c => isValidElement(c) && c.type === MoreActions) as ReactElement<{ children: (row: ProductWithOptionalOrder) => ReactNode }>[]
    }, [])

    const tableColumns = useMemo(() => {
        //@ts-ignore
        const cols: ColumnDef<ProductWithOptionalOrder>[] = [...columns]
        if (moreActionsSlots.length > 0) {
            const actionRenderer = moreActionsSlots[0].props.children
            cols.push({
                id: "actions",
                header: "Ações",
                cell: ({ row }) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {actionRenderer(row.original)}
                            <DropdownMenuItem onClick={() => {
                                setEditProduct(() => row.original)
                            }}> <Edit /> Editar?</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                                deleteProductFn(row.original.id)
                            }}> <Trash /> Deletar?</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            })
        }
        return cols
    }, [moreActionsSlots])

    const table = useReactTable({
        data: products,
        columns: tableColumns,
        getRowId: (row) => String(row.id),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onRowPinningChange: setRowPinning,
        globalFilterFn: 'includesString',
        state: {
            rowSelection,
            pagination,
            rowPinning,
        },
        autoResetExpanded: false,
        autoResetPageIndex: false,
        autoResetAll: false,
        meta: {
            addRow: () => {
                upsertProductFn(defaultNewProduct())
            }
        },
    })

    return (
        <ProductsTableContext.Provider value={{ table }}>
            {editProduct && <Dialog open={!!editProduct} onOpenChange={(open) => {
                if (!open) setEditProduct(undefined)
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    {!!editProduct && <UpsertProduct product={editProduct} />}
                    <DialogFooter></DialogFooter>
                </DialogContent>
            </Dialog>}
            {headerSlots.length > 0 && (
                <div className="flex items-center justify-between gap-1">
                    {headerSlots.map((h, i) => <Fragment key={i}>{h.props.children}</Fragment>)}
                    <Button
                        onClick={() => {
                            clearSelection()
                            setRowPinning({ top: [] })
                            setRowSelection({})
                        }}
                        variant={"outline"}
                        size={"icon"}
                    >
                        <Ban />
                    </Button>
                </div>
            )}
            <RenderTable table={table} columns={tableColumns} />
        </ProductsTableContext.Provider>
    )
}

