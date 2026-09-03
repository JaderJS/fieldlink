import { Row } from "@tanstack/react-table"
import { type IProduct, NestedKeys, useProductTableContext } from "../../providers/provider.products"
import { TableCell } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { getAtPath } from "../../helpers/paths"
import { NumberField, Input as InputAria } from "react-aria-components"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

// type ProductTableCellProps = {
//     row: Row<IProduct>;
//     path: string[]; // ex: ["order","quantity"]
//     parse?: (v: string) => any; // opcional: parse pra number, date, etc.
//     className?: string;
// }

export const ProductTableCell = <Path extends NestedKeys<IProduct>>({
    row,
    path,
    parse = (v) => v,
    className
}: {
    row: Row<IProduct>;
    path: Path;
    parse?: (v: string) => any;
    className?: string;
}) => {
    const { data, setData } = useProductTableContext()
    const rowIndex = row.index
    const rawValue = getAtPath(row.original as any, String(path))
    const value = rawValue ?? ""

    return (
        <TableCell className={cn("p-2", className)}>
            <Input
                value={value ?? "" as any}
                onChange={(e) => {
                    const newValue = e.target.value
                }}
                className="w-full"
            />
        </TableCell>
    )
}

export const PriceCell = ({ product }: { product: IProduct }) => {
    return (
        <div
            className="flex flex-col"
        >
            <NumberField
                value={product.price}
                className={"font-medium text-amber-600"}
                formatOptions={{
                    currency: "BRL",
                    style: "currency"
                }}
            >
                <InputAria />
            </NumberField>
            <div className="flex">
                {product.details?.costPrice && (
                    <NumberField
                        value={product.details.costPrice}
                        className={"font-xs text-amber-600"}
                        formatOptions={{
                            currency: "BRL",
                            style: "currency"
                        }}
                    >
                        <InputAria />
                    </NumberField>
                )}
                {product.details?.salePrice && (
                    <NumberField
                        value={product.details.costPrice}
                        className={"font-xs text-amber-600"}
                        formatOptions={{
                            currency: "BRL",
                            style: "currency"
                        }}
                    >
                        <InputAria />
                    </NumberField>
                )}
            </div>
        </div>
    )
}

export const StockStepperCell = ({ row }: { row: Row<IProduct> }) => {

    const { setData } = useProductTableContext()

    const update = (delta: number) => {
        setData((prev) => {
            const copy = [...prev]
            copy[row.index] = {
                ...copy[row.index],
                order: { quantity: Math.max(0, copy[row.index].stock + delta), value: 0 }
            }
            return copy
        })
    }

    return (
        <div className="flex items-center gap-2">
            <Button size={"icon-sm"} variant={"ghost"} onClick={() => update(-1)}>
                <Minus className="size-4" />
            </Button>
            <span className="w-6 text-center text-sm">
                {row.original.stock}
            </span>
            <Button size={"icon-sm"} variant={"ghost"} onClick={() => update(1)}>
                <Plus className="size-4" />
            </Button>
        </div>
    )
}