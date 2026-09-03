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
import { KEYS } from "@/core/keys"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { formatToBRL, getBgColorByWord, getColorBgByFirstLetter } from "@/components/utils"
import { Badge } from "@/components/ui/badge"
import { deleteProduct } from "../services/crud"
import { UpsertProduct } from "./upsert.product"
import { CheckedState } from "@radix-ui/react-checkbox"
import { NumberField, Input as InputAria } from "react-aria-components"
import { Input } from "@/components/ui/input"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"


interface DefaultCellProps<T> {
    getValue: Function
    row: Row<T>
    column: Column<T>
    table: Table<T>
}

const CellIndex = <T,>({ getValue, row, column, table }: DefaultCellProps<ProductWithOptionalOrder>) => {

    const { order, ...product } = row.original
    const isSelect = row.getIsSelected()
    const isPined = row.getIsPinned()

    const handleSelect = (checked: CheckedState) => {
        row.toggleSelected(!!checked)
        if (!checked) {
            table.options.meta?.deselectRow?.(row.index)
        }
    }

    return (
        <div className="group flex items-center">
            {!isSelect && <span className="group-hover:invisible">{row.index}</span>}
            <Checkbox
                className={cn("invisible group-hover:visible", isSelect && 'visible')}
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

    const product = row.original
    const order = product.order
    const isSelect = row.getIsSelected()

    const [amount, setAmount] = useState<number>(order && order.quantity > 0 ? order.price : product.price)

    const onChange = (value: number) => {
        setAmount(value)
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
    const product = row.original
    const stock = product.stock

    const [order, setOrder] = useState<number>(product.order && product.order?.quantity > 0 ? product.order?.quantity : product.stock)

    const isSelected = row.getIsSelected()

    const handleUp = () => {
        const quantity = order <= 0 ? 1 : order + 1
        const price = product.order && product.order.quantity <= 0 ? product.price : product.order?.price
        const newOrder = { quantity, price }
        setOrder(newOrder.quantity)
        table.options.meta?.updateData?.(row.index, column.id, { ...product, order: newOrder })
    }

    const handleDown = () => {
        const quantity = order <= 0 ? 0 : order - 1
        const price = !!product.order && product.order.quantity <= 0 ? product.price : product.order?.price
        const newOrder = { quantity, price }
        setOrder(newOrder.quantity)
        table.options.meta?.updateData?.(row.index, column.id, { ...product, order: newOrder })
    }

    const handleOrder = (value: string | number) => {
        if (typeof value !== 'number') return
        if (value < 0) return
        setOrder(value)
    }

    return (
        <>
            <div className="flex flex-nowrap items-center">
                {isSelected && <Button size="icon" variant="ghost" onClick={handleUp}>
                    <Plus />
                </Button>}
                {/* {isSelected && <span className={cn(order > stock && 'text-red-500')}>{order}</span>} */}
                {isSelected && (
                    <Input
                        value={order}
                        onChange={(e) => handleOrder(Number(e.target.value))}
                        className={cn("w-8 p-0 border-0 ring-0 text-center", order > stock && 'text-red-500')}
                    />
                )}
                {!isSelected && <span>{stock}</span>}
                {isSelected && <Button disabled={order <= 0} size="icon" variant="ghost" onClick={handleDown}>
                    <Minus />
                </Button>}
            </div>

        </>
    )
}

const CellActions = <T,>({ row }: DefaultCellProps<ProductWithOptionalOrder>) => {

    const queryClient = useQueryClient()

    const [showModal, setShowModal] = useState(false)

    const product = row.original

    const { mutateAsync: deleteProductFn } = useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.product.getAll() })
        }
    })

    return (
        <>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <DialogTitle>Produto</DialogTitle>
                    <DialogDescription>Altere os dados do produto alterando cada campo em especifico</DialogDescription>
                    <UpsertProduct product={product as Product} />
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
                        onClick={() => deleteProductFn(product.id)}
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