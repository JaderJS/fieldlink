import { flexRender, Header } from "@tanstack/react-table"
import { EllipsisVertical, Group, Ungroup } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TableHead } from "@/components/ui/table"

interface TableHeaderProps<T> {
    header: Header<T, unknown>
    index: number
}

const TableHeaderComponent = <T,>({ header, index }: TableHeaderProps<T>) => {

    const isPlaceholder = header.isPlaceholder
    const isGrouped = header.column.getIsGrouped()
    const canGrouped = header.column.getCanGroup()

    const isSorted = header.column.getIsSorted()
    const canStored = header.column.getCanSort()

    const enabled = canGrouped || isSorted

    return (
        <TableHead>
            {!isPlaceholder && <div className="flex items-center justify-start p-1 gap-x-1">
                {!enabled && flexRender(header.column.columnDef.header, header.getContext())}
                {enabled && <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {canGrouped && <DropdownMenuItem onClick={header.column.getToggleGroupingHandler()}>
                            {!isGrouped ?
                                <><Group /> Agrupar</> : <><Ungroup /> Desagrupar</>}
                        </DropdownMenuItem>}
                        {canStored && <DropdownMenuItem onClick={header.column.getToggleSortingHandler()}>
                            {isSorted === "desc" ? "Crescente" : "Decrescente"}
                        </DropdownMenuItem>}
                    </DropdownMenuContent>
                </DropdownMenu>}
            </div>}
        </TableHead>
    )
}

export { TableHeaderComponent }

// return (
//     <TableHead key={header.id}>
//         {header.isPlaceholder ? null : (
//             <>
//                 {header.column.getCanGroup() ? (
//                     <>
//                         {header.column.getCanGroup() && <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={header.column.getToggleGroupingHandler()}
//                         >
//                             {header.column.getIsGrouped()
//                                 ? <><Group /><span className="">({header.column.getGroupedIndex()})</span></>
//                                 : <Ungroup />}
//                         </Button>
//                         }
//                     </>
//                 ) : null}
//                 {flexRender(header.column.columnDef.header, header.getContext())}
//             </>
//         )}
//     </TableHead>
// )