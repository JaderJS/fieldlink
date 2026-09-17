'use client'

import { format, formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Column, Row, Table } from "@tanstack/react-table"
import Link from "next/link"
import { MoreHorizontal, Trash } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"
import { upsertArchive } from "../../service/archive.service"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Archive } from "../../types"

interface DefaultCellProps<T> {
    getValue: Function
    row: Row<T>
    column: Column<T>
    table: Table<T>
}

const CellIndex = <T,>({ getValue, row }: DefaultCellProps<Archive>) => {

    const id = getValue()
    const index = row.index

    return (
        <span>{index}</span>
    )
}

const CellLinkTo = <T,>({ getValue, row, table }: DefaultCellProps<Archive>) => {
    const href = getValue() as string
    const title = row.original.title
    return (
        <Link href={href} target="_blank" rel="noopener noreferrer">{title}</Link>
    )
}

const CellLastUpdatedAt = <T,>({ getValue, row, table }: DefaultCellProps<T>) => {
    const value = getValue() as string
    const formatted = formatDistanceToNow(value, { locale: ptBR })

    return (
        <span>{formatted}</span>
    )
}

const CellActions = <T,>({ row }: DefaultCellProps<Archive>) => {

    const queryClient = useQueryClient()

    const { mutateAsync: updateTransactionFn } = useMutation({
        mutationFn: upsertArchive,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.archive.getAll() })
        }
    })

    const archive = row.original

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
                    onClick={() => updateTransactionFn({ ...archive })}
                >
                    <Trash /> Deletar?
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export {
    CellIndex,
    CellLinkTo,
    CellLastUpdatedAt,
    CellActions
}
