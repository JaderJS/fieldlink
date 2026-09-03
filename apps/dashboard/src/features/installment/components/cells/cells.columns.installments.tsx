'use client'
import { cn } from "@/lib/utils"
import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Column, Row, Table } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BanknoteArrowDown, BanknoteArrowUp, CalendarIcon, Check, ChevronDown, ChevronsUpDown, ChevronUp, CircleCheck, CircleDashed, CircleX, Coins, MoreHorizontal, Package, ShoppingBag, ShoppingBasket, Trash, Wrench } from "lucide-react"
import { ChangeEvent, useCallback, useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Link from "next/link"
import { KEYS } from "@/core/keys"
import { getBgColorByWord, getBgColorByWord_, getColorBgByFirstLetter } from "@/components/utils"
import { toast } from "sonner"
import { useAuth } from "@/providers/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Editor } from "@/features/editor"
import { upsertTransaction } from "@/features/adm/services/transaction.crud"
import { getBanks } from "@/features/adm/services/bank.crud"
import { getPeriods } from "@/features/adm/services/period.crud"
import { Transaction } from "@/features/transaction/types"
import { NumberField, Input as InputAria } from "react-aria-components"
import { RiMoneyCnyBoxLine, RiOrderPlayFill, RiReactjsLine, RiShakeHandsLine } from "@remixicon/react"
import { QuestionMarkIcon } from "@radix-ui/react-icons"
import { Badge } from "@/components/ui/badge"
import { useIsMobile } from "@/hooks/use-mobile"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Installment } from "../../types"
import { useUpsertInstallment } from "../../hooks/useUpsertInstallment"
import { usePeriods } from "@/features/period/hooks/usePeriods"
import { useBanks } from "@/features/bank/hooks/useBanks"
import Tower from "@/icons/tower"
import { useDeleteInstallment } from "../../hooks/useDeleteInstallment"
// import { Editor } from "../editor/editor"

interface DefaultCellProps<T> {
    getValue: Function
    row: Row<T>
    column: Column<T>
    table: Table<T>
}

const CellIndex = <T,>({ getValue, row }: DefaultCellProps<Installment>) => {

    const id = getValue()
    const index = row.index

    return (
        <div className="flex group items-center m-0 p-0 w-fit">
            <span className="group-hover:hidden">{index}</span>
            <Button
                variant="link"
                className={
                    cn("invisible group-hover:visible m-0 p-1 h-auto text-xs rounded-sm")
                } asChild>
                <Link target="_blank" rel="noopener noreferrer" href={`/installments/${id}`}>Ver +</Link>
            </Button>
        </div>
    )
}

const CellDescription = <T,>({ getValue, row }: DefaultCellProps<Installment>) => {
    return (
        <>
            <span>{row.original.transaction.title}</span>
        </>
    )
}

const CellType = <T,>({ getValue, row }: DefaultCellProps<Installment>) => {
    return (
        <Select value={String(getValue())}>
            <SelectTrigger
                className="[&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0"
            >
                <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
                <SelectItem value="INPUT">
                    <BanknoteArrowDown size={16} aria-hidden="true" />
                    <span className="truncate">Entrada</span>
                </SelectItem>
                <SelectItem value="OUTPUT">
                    <BanknoteArrowUp size={16} aria-hidden="true" />
                    <span className="truncate">Saída</span>
                </SelectItem>

            </SelectContent>
        </Select>
    )
}

const CellBank = <T,>({ getValue, row }: DefaultCellProps<Installment>) => {

    const { data: banks } = useBanks()

    return (
        <Select value={String(getValue())}>
            <SelectTrigger
                className="[&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0"
            >
                <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
                {banks?.map((bank) => (
                    <SelectItem key={bank.id} value={String(bank.id)}>
                        <span className="truncate">{bank.name}</span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

const CellValue = <T,>({ getValue, row }: DefaultCellProps<Installment>) => {

    const { mutate: upsertInstallmentFn } = useUpsertInstallment()
    const [value, setValue] = useState<number>(getValue() ?? 0)

    const handleChange = (value: number) => {
        setValue(value)
        upsertInstallmentFn({ ...row.original, value: value })
    }

    return (
        <NumberField
            value={value}
            onChange={handleChange}
            formatOptions={{ style: 'currency', currency: 'BRL' }}
        >
            <InputAria className={"outline-none"} />
        </NumberField>
    )
}

const CellActions = <T,>({ row }: DefaultCellProps<Installment>) => {

    const { mutateAsync: deleteInstallmentFn } = useDeleteInstallment()

    const handleDelete = (id: number) => {
        deleteInstallmentFn(id)
    }

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
                    onClick={() => handleDelete(row.original.id)}
                >
                    <Trash /> Deletar?
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="text-xs">editado há {formatDistanceToNow(row.original.updatedAt, { locale: ptBR })}</DropdownMenuItem>
                <DropdownMenuItem disabled className="text-xs">criado há {formatDistanceToNow(row.original.createdAt, { locale: ptBR })}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const CellStatus = <T,>({ getValue, row, column }: DefaultCellProps<Installment>) => {

    const isGrouped = column.getIsGrouped()

    return (
        <>
            {!isGrouped && <Select value={String(getValue())}>
                <SelectTrigger
                    className="[&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0"
                >
                    <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
                    <SelectItem value="PENDING">
                        <CircleDashed size={16} aria-hidden="true" />
                        <span className="truncate">Pendente</span>
                    </SelectItem>
                    <SelectItem value="PAID">
                        <CircleCheck size={16} aria-hidden="true" />
                        <span className="truncate">Pago</span>
                    </SelectItem>
                    <SelectItem value="CANCELLED">
                        <CircleX size={16} aria-hidden="true" />
                        <span className="truncate">Cancelado</span>
                    </SelectItem>
                    <SelectItem value="REFUNDED">
                        <BanknoteArrowUp size={16} aria-hidden="true" />
                        <span className="truncate">Estornado</span>
                    </SelectItem>
                </SelectContent>
            </Select>}
            {isGrouped && <span>{getValue()}</span>}
        </>

    )
}

const CellPaymentMethod = <T,>({ getValue }: DefaultCellProps<Installment>) => {
    return (
        <></>
    )
}

const CellPeriod = <T,>({ getValue, row, column }: DefaultCellProps<Installment>) => {

    const { data: periods } = usePeriods()

    const isGrouped = column.getIsGrouped()

    return (
        <>
            {!isGrouped && <Select value={String(getValue())}>
                <SelectTrigger
                    className="[&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0"
                >
                    <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
                    {periods?.map((period) => (
                        <SelectItem value={String(period.id)} key={period.id}>
                            <span className="truncate">{period.name}</span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>}
            {isGrouped && <span>{periods?.find(p => p.id === getValue())?.name}</span>}
        </>
    )
}

const CellBilled = <T,>({ getValue, row, column }: DefaultCellProps<Installment>) => {

    const { mutate: upsertTransactionFn } = useUpsertInstallment()
    const [value, setValue] = useState<boolean>(Boolean(getValue()))

    const handleChange = useCallback((checked: boolean) => {
        setValue(checked)
        upsertTransactionFn({ ...row.original, billed: checked })
    }, [])

    const isGrouped = column.getIsGrouped()

    return (
        <>
            {!isGrouped && <Switch
                checked={value}
                onCheckedChange={handleChange}
            />}
            {isGrouped && <span>{value ? "Faturado" : "A faturar"}</span>}
        </>
    )
}

const CellDueAt = <T,>({ getValue, row }: DefaultCellProps<Installment>) => {

    const value = useMemo(() => getValue() as string, [])
    const { mutate: upsertInstallmentFn } = useUpsertInstallment()

    const handleChangeDate = useCallback((date: Date | undefined) => {
        if (!date) return
        upsertInstallmentFn({ ...row.original, dueAt: String(date) })
    }, [])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-fit pl-3 text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    {value ? (
                        format(value, "PP", { locale: ptBR })
                    ) : (
                        <span>Selecione uma data</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={new Date(value)}
                    onSelect={(value) => {
                        handleChangeDate(value)
                    }}
                    disabled={(date) =>
                        date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                />
            </PopoverContent>
        </Popover>
    )
}

export {
    CellIndex,
    CellDescription,
    CellType,
    CellBank,
    CellValue,
    CellStatus,
    CellPaymentMethod,
    CellPeriod,
    CellBilled,
    CellDueAt,
    CellActions,
}
