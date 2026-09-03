import { flexRender, Row } from "@tanstack/react-table"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import Link from "next/link"
import { SubComponent } from "@/features/transaction/services/cells"
import { Transaction } from "@/features/transaction/types"
import { Button } from "@/components/ui/button"


export const renderCard = <T,>(row: Row<T>) => {
    const titleCell = row.getVisibleCells().find(c => c.column.id === 'title')
    const totalCell = row.getVisibleCells().find(c => c.column.id === 'total')
    const typeCell = row.getVisibleCells().find(c => c.column.id === 'type')
    const bankCell = row.getVisibleCells().find(c => c.column.id === 'bank')
    const periodCell = row.getVisibleCells().find(c => c.column.id === 'period')

    const typeValue = row.getValue('type')
    const totalValue = totalCell ? flexRender(totalCell.column.columnDef.cell, totalCell.getContext()) : row.getValue('total')

    return (
        <Item key={row.id} variant="outline" className="p-2">
            <ItemMedia>
                {/* pequeno ícone para diferenciar tipo (personalize) */}
                <div className="w-6 h-6 flex items-center justify-center rounded-sm bg-muted/30 text-xs">
                    {typeof typeValue === "string"
                        ? typeValue[0]
                        : Array.isArray(typeValue) && typeof typeValue[0] === "string"
                            ? typeValue[0]
                            : "?"}
                </div>
            </ItemMedia>

            <ItemContent className="min-w-0">
                <ItemTitle className="truncate text-sm">
                    {titleCell ? flexRender(titleCell.column.columnDef.cell, titleCell.getContext()) : row.getValue('title')}
                </ItemTitle>

                <ItemDescription className="mt-1 flex flex-row gap-2 items-center text-xs text-muted-foreground">
                    {/* banco */}
                    {bankCell && (
                        <span className="truncate max-w-[120px]">{flexRender(bankCell.column.columnDef.cell, bankCell.getContext())}</span>
                    )}
                    {/* períodos como badges */}
                    {periodCell && (() => {
                        const val = row.getValue('period') as string[] | undefined
                        if (!val) return null
                        return (
                            <div className="flex gap-1 overflow-hidden">
                                {val.slice(0, 2).map((p, i) =>
                                    <Badge key={i} className="text-xs">{p}</Badge>
                                )}
                                {val.length > 2 && <span className="text-xs text-muted-foreground">+{val.length - 2}</span>}
                            </div>
                        )
                    })()}
                </ItemDescription>

                {/* detalhe expandido (aparece quando row.getIsExpanded()) */}
                {row.getIsExpanded() && (
                    <div className="mt-2 text-sm">
                        { /* usa seu subComponent se existir */}
                        {/* {SubComponent?.({ row })} */}
                    </div>
                )}
            </ItemContent>

            <ItemActions className="flex gap-2 items-center">
                {/* total à direita */}
                <div className="font-medium text-sm">{String(totalValue)}</div>

                {/* ação rápida — abrir, editar etc. */}
                <Link href={`/adm/transaction/${row.id}`} className="inline-flex items-center">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Eye className="w-4 h-4" />
                    </Button>
                </Link>
            </ItemActions>
        </Item>
    )
}
