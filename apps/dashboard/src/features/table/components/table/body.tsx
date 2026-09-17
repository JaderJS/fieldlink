import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { flexRender, Row, Table } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { Fragment } from "react";

export const Body = <T,>({ row, table, subComponent }: { row: Row<T>, table: Table<any>, subComponent?: (props: { row: Row<T> }) => React.ReactElement<any> }) => {

    const groupedCell = row.getVisibleCells().find((cell) => cell.getIsGrouped())
    const columnId = groupedCell?.column.id

    return (
        <>
            <TableRow
                data-state={row.getIsSelected() && "selected"}
            >
                {row.getVisibleCells().map((cell) => (
                    <Fragment key={cell.id}>

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
                                <div
                                    className="flex items-center gap-x-1"
                                    onClick={row.getToggleExpandedHandler()}
                                >
                                    <ChevronsUpDown />
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}{' '}
                                </div>
                            ) : cell.getIsAggregated() ? (
                                <>
                                    {flexRender(
                                        cell.column.columnDef.aggregatedCell ??
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </>
                            ) : (cell.getIsPlaceholder() && !(cell.column.columnDef.meta?.enableDuplicateInGrouping as any)) ? null : (
                                <>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </>
                            )}
                        </TableCell>
                    </Fragment>
                ))}
            </TableRow>
            {row.getIsExpanded() && !row.getIsGrouped() && (
                <TableRow>
                    <TableCell colSpan={row.getVisibleCells().length}>
                        {subComponent?.({ row })}
                    </TableCell>
                </TableRow>
            )}
            {row.getIsGrouped() && row.getIsExpanded() && !!columnId && (
                <TableRow>
                    <TableCell colSpan={row.getVisibleCells().length}>
                        <div className="flex justify-end px-4 py-2">
                            <Button
                                size="sm"
                                variant="link"
                                onClick={() => {
                                    const key = row.getValue(columnId)
                                    table.options.meta?.addRowWithGrouping?.({ [columnId]: key })
                                }}
                            >
                                <span className="text-muted-foreground">+ em {row.getValue(columnId)}</span>
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            )}

        </>
    )
}