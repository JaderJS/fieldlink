import { ColumnDef, flexRender, Table as ITable, Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronsUpDown, Eye, Group, Ungroup } from "lucide-react"
import { ChangeEvent, Fragment, ReactNode, useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { TableHeaderComponent } from "./header"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useIsMobile } from "@/hooks/use-mobile"
import { renderCard } from "./table/render.card"

interface RenderTableProps<T> {
    columns: ColumnDef<T>[]
    table: ITable<T> & { options: { meta?: any } }
    subComponent?: (props: { row: Row<T> }) => React.ReactElement<any>
    className?: string
    children?: ReactNode
}

const RenderTable = <T,>({ table, columns, subComponent, className }: RenderTableProps<T>) => {

    const isMobile = useIsMobile()
    const [search, setSearch] = useState<string>("")

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = String(e.target.value)
        table.setGlobalFilter(value)
        setSearch(value)
    }

    const handleNewRow = () => {
        table.options.meta?.addRow?.()
    }

    return (
        <div className={cn(className, "w-full")}>
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Buscar em todas as colunas"
                    value={search}
                    onChange={handleSearch}
                    className="max-w-sm"
                />
                <div className="flex gap-x-3">

                    <Select
                        value={String(table.getState().pagination.pageSize)}
                        onValueChange={(value) => table.setPageSize(Number(value))}
                    >
                        <SelectTrigger className="w-20 text-muted-foreground">
                            <SelectValue placeholder="20" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Tamanho da pagina</SelectLabel>
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <SelectHiddenColumns table={table} />
                </div>

            </div>
            <div className="rounded-md border">
                {false ? (
                    <>
                        <div className="flex flex-col gap-2 p-2">
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map(row => renderCard(row))
                            ) : (
                                <div className="p-6 text-center">Sem resultados.</div>
                            )}
                            <div className="p-2">
                                <Button variant="link" size="sm" className="h-auto" onClick={handleNewRow}>+ new</Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <Table className="text-xs lg:text-sm">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header, index) => (
                                        <TableHeaderComponent key={header.id} header={header} index={index} />
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getTopRows().map((row) => (
                                <PinnedRow key={row.id} row={row} table={table} />
                            ))}
                            {table.getRowModel().rows?.length ? (
                                // table.getCenterRows().rows.map((row, index) => (
                                (table.getCenterRows().map((row, index) => (
                                    <Fragment key={row.id}>
                                        <TableRow
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell
                                                    key={cell.id}
                                                    className={
                                                        cn(
                                                            cell.getIsGrouped() && 'bg-muted',
                                                            cell.getIsAggregated() && 'bg-muted-foreground/10',
                                                            cell.getIsPlaceholder() && 'bg-muted/10'
                                                        )
                                                    }
                                                >
                                                    {/* {console.log(cell.column.columnDef.meta?.enableDuplicateInGrouping)} */}
                                                    {cell.getIsGrouped() ? (
                                                        <Button
                                                            variant="ghost"
                                                            onClick={row.getToggleExpandedHandler()}
                                                        >
                                                            <ChevronsUpDown />
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}{' '}
                                                            {/* ({row.subRows.length}) */}
                                                        </Button>
                                                    ) : cell.getIsAggregated() ? (
                                                        flexRender(
                                                            cell.column.columnDef.aggregatedCell ??
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )
                                                    ) : (cell.getIsPlaceholder() && !(cell.column.columnDef.meta?.enableDuplicateInGrouping as any)) ? null : (
                                                        flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                        {row.getIsExpanded() && !row.getIsGrouped() && (
                                            <TableRow>
                                                <TableCell colSpan={row.getVisibleCells().length}>
                                                    {subComponent?.({ row })}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </Fragment>

                                )))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Sem resultados.
                                    </TableCell>
                                </TableRow>
                            )}
                            <TableRow>
                                <TableCell colSpan={table.getAllColumns().length}>
                                    <Button variant="link" size="sm" className="h-auto" onClick={handleNewRow}>+ new</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>)}
            </div>
            <FooterTable table={table} />
        </div>
    );
}

const FooterTable = <T,>({ table }: { table: ITable<T> }) => {
    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} de{" "}
                {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
            </div>
            <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Anterior
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Proximo
                </Button>
            </div>
        </div>
    )
}

const SelectHiddenColumns = <T,>({ table, placeholder }: { table: ITable<T>, placeholder?: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    <Eye className="text-muted-foreground" /> {placeholder} <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value: any) =>
                                    column.toggleVisibility(!!value)
                                }
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const PinnedRow = ({ row, table }: { row: Row<any>; table: ITable<any> }) => {
    return (
        <TableRow
            className="bg-muted border-l-emerald-500 border-l-2"
            style={{
                position: 'sticky',
                top: row.getIsPinned() === 'top'
                    ? `${row.getPinnedIndex() * 26}px`
                    : undefined,
                bottom: row.getIsPinned() === 'bottom'
                    ? `${(table.getBottomRows().length - 1 - row.getPinnedIndex()) * 26}px`
                    : undefined,
            }}
        >
            {row.getVisibleCells().map(cell => {
                return (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                )
            })}
        </TableRow>
    )
}

const SkeletonTable = () => {
    return (
        <div className="flex flex-col gap-y-6">
            <div className="flex justify-between">
                <Skeleton className="h-8 w-[400px]" />
                <Skeleton className="h-8 w-[80px]" />
            </div>
            <Skeleton className="h-[500px]" />
            <div className="flex justify-between">
                <Skeleton className="h-8 w-[400px]" />
                <div className="flex gap-x-6">
                    <Skeleton className="h-8 w-[80px]" />
                    <Skeleton className="h-8 w-[80px]" />
                </div>
            </div>
        </div>
    )
}

export { RenderTable, FooterTable, SelectHiddenColumns, SkeletonTable }