'use client'

import { Column, Table } from "@tanstack/react-table"
import { Row } from "@tanstack/react-table"
import Image from "next/image"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { ArrowBigDown, Coins, DollarSign, Edit, Minus, MoreHorizontal, Plus, Trash } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { formatToBRL, getBgColorByWord, getColorBgByFirstLetter } from "@/components/utils"
import { Badge } from "@/components/ui/badge"
import { CheckedState } from "@radix-ui/react-checkbox"
import { NumberField, Input as InputAria, Group, Button as ButtonAria } from "react-aria-components"
import { Input } from "@/components/ui/input"
import { useProductsComponent } from "../../hooks/use.products.component"


interface DefaultCellProps<T> {
    getValue: Function
    row: Row<T>
    column: Column<T>
    table: Table<T>
}

const CellIndex = <T,>({ getValue, row, column, table }: DefaultCellProps<ProductWithOptionalOrder>) => {

    const { append, remove } = useProductsComponent()
    const { order, ...product } = row.original
    const isSelect = row.getIsSelected()
    const isPined = row.getIsPinned()

    const handleSelect = (checked: CheckedState) => {
        row.toggleSelected(!!checked)
        if (checked) {
            append({ product })
            row.pin('top')
        }
        if (!checked) {
            table.options.meta?.deselectRow?.(row.index)
            remove(product.id)
            row.pin(false)
        }
    }

    return (
        <div className="group flex items-center">
            {/* {!isSelect && <span className="group-hover:invisible">{row.index}</span>} */}
            <Checkbox
                className={cn("", isSelect && 'visible')}
                checked={row.getIsSelected()}
                onCheckedChange={handleSelect}
                aria-label="Select row"
            />
        </div>
    )
}

const CellImage = <T,>({ getValue, row }: DefaultCellProps<T>) => {
    const src = getValue() as string
    return (
        <>
            <Image src={src} alt="miniature" height={60} width={60} className="h-[60px] w-auto" />
        </>
    )
}

const CellMoney = <T,>({ table, column, row, getValue }: DefaultCellProps<ProductWithOptionalOrder>) => {

    const { update } = useProductsComponent()

    const product = row.original
    const order = product.order
    const isSelect = row.getIsSelected()

    const [amount, setAmount] = useState<number>(order && order.quantity > 0 ? order.price : product.price)

    const onChange = (value: number) => {
        setAmount(value)
        update(product.id, { price: value, })
        table.options.meta?.updateData?.(row.index, column.id, { ...product, order: { ...order, price: value } })
    }

    return (
        <>
            <div className="flex flex-col justify-center">
                <div className="flex items-center">
                    <NumberField
                        value={amount}
                        onChange={(value) => {
                            onChange(value)
                        }}
                        formatOptions={{ currency: "BRL", style: "currency" }}
                    >
                        <InputAria className={"ml-1 border-0 outline-none text-sm text-yellow-600"} />
                    </NumberField>
                </div>

                {isSelect && <div className="flex flex-wrap">
                    <div className="flex items-center px-1">
                        <DollarSign className="h-3 w-3 text-emerald-500" />
                        <span className="text-xs">{formatToBRL(product.price)}</span>
                    </div>
                    <div className="flex items-center">
                        <Coins className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs">{formatToBRL(product.cost)}</span>
                    </div>
                </div>}
            </div>
        </>
    )
}

const CellOrder = <T,>({ table, column, row, getValue }: DefaultCellProps<ProductWithOptionalOrder>) => {
    const { update, selectedProducts } = useProductsComponent()
    const product = row.original
    const stock = product.stock

    const [order, setOrder] = useState<number>(product.order && product.order?.quantity > 0 ? product.order?.quantity : 1)

    const isSelected = row.getIsSelected()

    const handleUp = () => {
        const quantity = order <= 0 ? 1 : order + 1
        const price = !!product.order && product.order.quantity <= 0 ? product.price : product.order?.price
        const newOrder = { quantity, price }

        setOrder(newOrder.quantity)
        update(product.id, { quantity: newOrder.quantity })
    }

    const handleDown = () => {
        const quantity = order <= 0 ? 0 : order - 1
        const price = !!product.order && product.order.quantity <= 0 ? product.price : product.order?.price

        const newOrder = { quantity, price }
        update(product.id, { price: newOrder.price ?? 0, quantity: newOrder.quantity })
        setOrder(newOrder.quantity)
    }

    const handleOrder = (value: string | number) => {
        if (typeof value !== 'number') return
        if (value < 0) return
        setOrder(value)
    }

    return (
        <div className="flex items-center overflow-hidden w-fit">
            {isSelected && <Button size="icon" variant="ghost" onClick={handleUp}>
                <Plus />
            </Button>}
            {isSelected && (
                <Input
                    value={order}
                    min={0}
                    step={1}
                    onChange={(e) => handleOrder(Number(e.target.value))}
                    className={cn("w-6 m-0 p-0 ring-0 outline-none focus-visible:ring-0  border-none shadow-none ", order > stock && 'text-red-500')}
                />
            )}
            {!isSelected && <span>{stock}</span>}
            {isSelected && <Button disabled={order <= 0} size="icon" variant="ghost" onClick={handleDown} className="">
                <Minus />
            </Button>}
        </div>
    )
}

const CellActions = <T,>({ row }: DefaultCellProps<ProductWithOptionalOrder>) => {

    const queryClient = useQueryClient()

    const [showModal, setShowModal] = useState(false)

    const product = row.original

    return (
        <>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <DialogTitle>Produto</DialogTitle>
                    <DialogDescription>Altere os dados do produto alterando cada campo em especifico</DialogDescription>
                    {/* <UpsertProduct product={product as Product} /> */}
                </DialogContent>
            </Dialog>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    // onClick={() => deleteProductFn(product.id)}
                    >
                        <Trash /> Deletar?
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.stopPropagation()
                            setTimeout(() => setShowModal(true), 100)
                        }}
                    >
                        <Edit className="h-4 w-4" /> Editar?
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>

    )
}

const CellCategories = <T,>({ getValue, row }: DefaultCellProps<ProductWithOptionalOrder>) => {

    const categories = row.original.categories

    return (
        <div className="flex gap-x-0.5">
            {categories.length !== 0 ? categories.map((category) => (
                <Badge key={category.id} className={getBgColorByWord(category.name)}>{category.name}</Badge>
            )) :
                <Badge>Desconhecido</Badge>
            }
        </div>
    )
}

export {
    CellIndex,
    CellImage,
    CellOrder,
    CellMoney,
    CellActions,
    CellCategories
}