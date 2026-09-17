'use client'

import { cn } from "@/lib/utils"
import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Column, Row, Table } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BookOpenCheck, CalendarIcon, ChevronDown, ChevronsUpDown, ChevronUp, MoreHorizontal, MoreVertical, Package, ShoppingBag, ShoppingBasket, Trash, Wrench } from "lucide-react"
import { ChangeEvent, useCallback, useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { useAuth } from "@/providers/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Editor } from "@/features/editor"
import { Transaction } from "@/features/transaction/types"
import { NumberField, Input as InputAria } from "react-aria-components"
import { useUpsertTransaction } from "../hooks/use.upsert.transaction"
import { RiMoneyCnyBoxLine, RiOrderPlayFill, RiShakeHandsLine } from "@remixicon/react"
import { QuestionMarkIcon } from "@radix-ui/react-icons"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"
import { useBanks } from "@/features/bank/hooks/useBanks"
import { getBgColorByWord, getBgColorByWord_, getColorBgByFirstLetter } from "@/components/utils"

interface DefaultCellProps<T> {
    getValue: Function
    row: Row<T>
    column: Column<T>
    table: Table<T>
}

const CellExpand = <T,>({ row }: DefaultCellProps<Transaction>) => {

    const canExpand = row.getCanExpand()

    return canExpand ?
        <Button onClick={row.getToggleExpandedHandler()} size="icon" variant="ghost">
            {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
        </Button>
        : null
}

const CellIndex = <T,>({ getValue, row }: DefaultCellProps<Transaction>) => {

    const id = getValue()
    const index = row.index

    return (
        <div className="flex group items-center transition-all m-0 p-0">
            <span className="">{index}</span>
        </div>
    )
}

const CellTitle = <T,>({ getValue, row, table }: DefaultCellProps<Transaction>) => {

    const [value, setValue] = useState(getValue())

    const { mutate: upsertTransactionFn } = useUpsertTransaction()

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        upsertTransactionFn({ ...row.original, title: value })
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <Input
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            className="border-0 shadow-none focus:ring-0 outline-none w-fit text-xs"
        />
    )
}

const CellMoney = <T,>({ getValue, row, table }: DefaultCellProps<Transaction>) => {

    return (
        <NumberField
            value={Math.abs(getValue())}
            isReadOnly
            formatOptions={{ currency: "BRL", style: "currency" }}
        >
            <InputAria />
        </NumberField>
    )
}

const CellSelect = <T,>({ getValue, row, table }: DefaultCellProps<Transaction>) => {


    const [value, setValue] = useState<'INPUT' | 'OUTPUT'>(getValue())

    const { mutate: upsertTransactionFn } = useUpsertTransaction()

    const onChange = (value: string) => {
        setValue(value as any)
        upsertTransactionFn({ ...row.original, type: value })
    }

    const isGrouped = row.getIsGrouped()


    return (
        <>
            {!isGrouped && <Select
                value={value}
                onValueChange={onChange}
            >
                <SelectTrigger
                    className={cn('text-xs lg:text-sm', 'dark:text-black', value === 'INPUT' && "bg-emerald-300", value === 'OUTPUT' && "bg-red-300")}
                >
                    <SelectValue placeholder="Tipo?" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Tipo?</SelectLabel>
                        <SelectItem value="INPUT">Entrada</SelectItem>
                        <SelectItem value="OUTPUT">Saida</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>}
            {isGrouped && <span className={cn(value === 'OUTPUT' ? 'text-red-500' : 'text-emerald-500')}>{value}</span >}
        </>

    )
}

const CellBank = <T,>({ getValue, column, row, table }: DefaultCellProps<Transaction>) => {

    const bank = getValue()

    const { data: banks } = useBanks()

    const { mutate: upsertTransactionFn } = useUpsertTransaction()

    const handleChange = (value: string) => {
        upsertTransactionFn({ ...row.original, bankId: value })
    }

    return (
        <>
            <Select
                value={`${bank.id}`}
                onValueChange={handleChange}
            >
                <SelectTrigger className="text-xs lg:text-sm">
                    <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                    {banks?.map(({ id, name }) => (
                        <SelectItem key={id} value={`${id}`}>{name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>

    )
}

const CellActions = <T,>({ row }: DefaultCellProps<Transaction>) => {

    const { hasPermission, user } = useAuth()

    const transaction = row.original
    const { mutateAsync: upsertTransactionFn } = useUpsertTransaction()

    const handleDelete = () => {
        const promise = upsertTransactionFn({ ...transaction, isDelete: true })
        toast.promise(promise, { loading: 'Carregando alterações...' })
    }
    if (!user) return null

    return (
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
                    // disabled={!hasPermission(user, 'transactions', 'delete', transaction)}
                    onClick={handleDelete}
                >
                    <Trash /> Deletar?
                </DropdownMenuItem>
                <DropdownMenuItem
                    asChild
                >
                    <Link href={`/adm/transaction/${transaction.id}`}>
                        <BookOpenCheck /> Ver mais
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="text-xs my-0 py-0">editado há {formatDistanceToNow(transaction.updatedAt, { locale: ptBR })}</DropdownMenuItem>
                <DropdownMenuItem disabled className="text-xs my-0 py-0">criado há {formatDistanceToNow(transaction.createdAt, { locale: ptBR })}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const CellPeriod = <T,>({ getValue, column, row, table }: DefaultCellProps<Transaction>) => {

    const periods = getValue() as string[]

    return (
        <div className="flex flex-col gap-1 line-clamp-2">
            {periods.map((p, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                    {p}
                </Badge>
            ))}
        </div>
    )

}

const SubComponent = <T,>({ row }: { row: Row<Transaction> }) => {
    const transaction = row.original

    // const isService = !!transaction.service?.id
    const isCart = !!transaction.cart?.id
    const isOrder = !!transaction.order?.id

    return (
        <div className="p-6">
            <p>{transaction.id}</p>
            {/* {isService && <Link className="hover:underline" href={`/adm/service/${transaction.service?.id}`}>Ver mais detalhes do serviço</Link>}
            {isCart && <Link className="hover:underline" href={`/adm/purchase/${transaction.cart?.id}`}>Ver mais detalhes da compra</Link>}
            {isOrder && < Link className="hover:underline" href={`/adm/service/${transaction.service?.id}`}>Ver mais detalhes da venda</Link >} */}
            <Editor disabled content={transaction.content} />
        </div>
    )
}

const CellViewMore = <T,>({ row }: { row: Row<Transaction> }) => {

    const isMobile = useIsMobile()
    const order = row.original.order
    const cart = row.original.cart
    const client = row.original.order?.client.name
    const supplier = row.original.cart?.supplier.name

    return (
        <div className="flex flex-row gap-y-2 gap-x-1 items-center">
            {!order && !cart && <QuestionMarkIcon />}
            {!!order && <>
                <Link href={`/order/${order.id}`} prefetch className="flex flex-col items-center justify-center">
                    <RiShakeHandsLine />
                    {!isMobile && <Badge className={cn("text-[0.6rem] w-20 line-clamp-1", getBgColorByWord(client))}>{String(client)}</Badge>}
                </Link>
            </>}
            {!!cart && <>
                <Link href={`/cart/${cart.id}`} prefetch className="flex flex-col items-center justify-center">
                    <Package />
                    {!isMobile && <Badge className={cn("text-[0.6rem] w-20 line-clamp-1", getBgColorByWord(supplier))}>{String(supplier)}</Badge>}
                </Link>
            </>}
        </div>
    )
}

const CellBilled = <T,>({ getValue, row, column }: DefaultCellProps<Transaction>) => {

    const isBilled = row.original.installments.filter(i => !i.billed).length === 0

    const isGrouped = column.getIsGrouped()

    return (
        <>
            {!isGrouped && <Switch
                checked={isBilled}
            />}
            {isGrouped && <span>{isBilled ? "Faturado" : "A faturar"}</span>}
        </>
    )
}


export {
    CellExpand,
    CellIndex,
    CellTitle,
    CellMoney,
    CellSelect,
    CellActions,
    CellBank,
    CellPeriod,
    SubComponent,
    CellViewMore,
    CellBilled
}
