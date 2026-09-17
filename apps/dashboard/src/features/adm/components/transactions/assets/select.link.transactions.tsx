'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { KEYS } from "@/core/keys"
import { getTransactions } from "@/features/adm/services/transaction.crud"
import { Period } from "@/features/period/types"
import { Transaction } from "@/features/transaction/types"
import { cn } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"

interface SelectLinkTransactionsProps {
    transaction: Transaction,
    onSelect?: (transactions: Transaction[]) => void
}

export const SelectLinkTransactions = ({ transaction, onSelect }: SelectLinkTransactionsProps) => {

    const { data: transactionsQuery } = useQuery({
        queryKey: KEYS.transaction.getAll(),
        queryFn: getTransactions,
        select: data => data.transactions
    })

    const [selectedIds, setSelectedIds] = useState<number[]>([])

    const groupedTransactions = Object.values(transactionsQuery?.reduce<Record<number, { period: Period; transactions: Transaction[] }>>(
        (acc, transaction) => {
            // const periodId = transaction.period.id
            // if (!acc[periodId]) {
            //     acc[periodId] = { period: transaction.period, transactions: [] }
            // }
            // acc[periodId].transactions.push(transaction)
            return acc
        }
        , {}
    ) ?? {}
    )

    const toggleSelection = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const handleSubmit = async () => {
        if (!transaction) return

        const selectedTransactions = transactionsQuery?.filter(t => selectedIds.includes(t.id))
        if (!selectedTransactions) return

        // onSelect?.(selectedTransactions)
    }


    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Ver relações</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-1">
                        {transactionsQuery?.filter((t) => selectedIds.includes(t.id)).map((t) => (
                            <Card
                                key={t.id}
                                className="flex justify-around items-center p-2 gap-1"
                            >
                                <Checkbox
                                    checked={selectedIds.includes(t.id)}
                                    onCheckedChange={() => toggleSelection(t.id)}
                                />
                                {/* <div className="flex flex-col text-sm">
                                    <span className="line-clamp-1">{t.title}</span>
                                    <Badge variant={"outline"} className="line-clamp-1 p-0.5">{t.period.name}</Badge>
                                    <span className="line-clamp-1 text-xs">{t.description}</span>
                                </div>
                                <span>R${Math.abs(t.value)}</span> */}
                            </Card>
                        ))}
                        {selectedIds.length === 0 && (
                            <>
                                <span className="col-span-2 text-muted-foreground text-center">Nenhum grupo</span>
                            </>
                        )}
                    </div>

                    <ScrollArea className="h-92 grid">
                        {groupedTransactions?.map(group => (
                            <div key={group.period.id} className="space-y-2">
                                <h3 className="mt-2 text-base font-medium">
                                    {group.period.name}
                                </h3>
                                <div className="space-y-1">
                                    {group.transactions.map(t => (
                                        <Card
                                            key={t.id}
                                            className={cn("flex justify-between items-center p-2 gap-1", t.type === "INPUT" ? 'bg-red-300' : "bg-green-300")}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    className="mx-2"
                                                    checked={selectedIds.includes(t.id)}
                                                    onCheckedChange={() => toggleSelection(t.id)}
                                                />
                                                {/* <div className="flex flex-col text-sm">
                                                    <span className="line-clamp-1">{t.title}</span>
                                                    <Badge variant={"secondary"} className="line-clamp-1 p-0.5">{t.period.name}</Badge>
                                                    <span className="line-clamp-1 text-xs">{t.description}</span>
                                                </div> */}
                                            </div>
                                            {/* <span>R${Math.abs(t.value)}</span> */}
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                    <DialogFooter>
                        <Button
                            onClick={handleSubmit}
                            disabled={selectedIds.length === 0}
                        >
                            Salvar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}