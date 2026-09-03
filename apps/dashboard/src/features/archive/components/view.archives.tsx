'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { columns } from "../core/columns.view.archives"
import { DataTable } from "@/features/table/components/table/render"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { UpsertArchive } from "./upsert.archive"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { deleteArchive } from "../service/archive.service"
import { KEYS } from "@/core/keys"
import { Transaction } from "@/features/transaction/types"
import { Archive } from "../types"

interface ViewArchiveProps {
    transaction?: Pick<Transaction, "id">
    archives: Archive[]
}

const ViewArchives = ({ transaction, archives }: ViewArchiveProps) => {

    const [open, setOpen] = useState(false)
    const actionColumn: ColumnDef<Archive> = {
        id: 'actions',
        header: 'Ações',
        cell: ({ row }) => <><MoreActions archive={row.original} transaction={transaction} /></>
    }

    const table = useReactTable<Archive>({
        data: archives,
        columns: [...columns, actionColumn],
        getCoreRowModel: getCoreRowModel(),
        meta: {
            addRow: () => {
                setOpen(true)
            }
        }
    })

    return (
        <>
            <Dialog onOpenChange={setOpen} open={open}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Arquivo</DialogTitle>
                        <DialogDescription>Informações do arquivo</DialogDescription>
                    </DialogHeader>
                    <UpsertArchive connect={{ transaction: { id: transaction?.id } }} />
                </DialogContent>
            </Dialog>
            <DataTable table={table} columns={columns} />
        </>
    )
}

interface MoreActionsProps {
    archive: Archive
    transaction?: Pick<Transaction, "id">
}

const MoreActions = ({ transaction, archive }: MoreActionsProps) => {

    const queryClient = useQueryClient()
    const [openUpsertArchive, setOpenUpsertArchive] = useState(false)

    const { mutate: deleteArchiveFn } = useMutation({
        mutationFn: deleteArchive,
        onSuccess: () => {
            if (transaction?.id) {
                queryClient.invalidateQueries({ queryKey: KEYS.archive.getAll({ transaction: { id: transaction?.id } }) })
                return
            }
            queryClient.invalidateQueries({ queryKey: KEYS.archive.getAll() })

        }
    })

    return (
        <>
            <Dialog open={openUpsertArchive} onOpenChange={setOpenUpsertArchive}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Arquivo</DialogTitle>
                        <DialogDescription>Informações do arquivo</DialogDescription>
                    </DialogHeader>
                    <UpsertArchive {...archive} connect={{ transaction: { id: transaction?.id } }} />
                </DialogContent>
            </Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={"ghost"} size={"icon"}>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuLabel>Mais opções</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setOpenUpsertArchive(true)} onSelect={(e) => e.preventDefault()}>
                            <Edit /> Editar?
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteArchiveFn(archive.cuid)}>
                            <Trash /> Deletar?
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export { ViewArchives }