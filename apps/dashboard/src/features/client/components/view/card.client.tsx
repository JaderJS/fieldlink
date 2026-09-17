'use client'

import React, { useMemo } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge" // se não existir, substitua por <span>
import { format, formatDistanceToNow } from "date-fns" // opcional — se não usar, comente e usa formatDate abaixo
import { ClientSummary, computeOrderTotal, summaryFn } from "@/features/client/helpers/client.helpers"
import { formatToBRL } from "@/components/utils"
import { Client } from "../../type"

export const ClientCard = ({ client, onView, }: { client: Client & ClientSummary; onView?: (c: Client) => void }) => {
    const orders = client

    return (
        <Card className="flex flex-col justify-between h-full">
            <CardHeader>
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <CardTitle className="flex items-center gap-1">
                            {client.property ?? "—"}
                        </CardTitle>
                        <CardDescription className="mt-1 text-xs text-muted-foreground">
                            {client.name}
                            {/* {formatDistanceToNow(summary.lastPropertyUpdate)} */}
                        </CardDescription>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                        <div className="text-right">
                            <div className="text-sm text-muted-foreground">Gasto total</div>
                            <div className="font-medium">{formatToBRL(client.summary.total)}</div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="py-3">

                <div className="flex flex-col gap-2">
                    <Badge>{client.summary.openOrders} abertos</Badge>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Último pedido</span>
                        <span>{client.summary.lastOrder ? `${client.summary.lastOrder.flag ?? "-"} • ${formatDistanceToNow(client.summary.lastOrder.createdAt)}` : "—"}</span>
                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Última transação</span>
                        {/* <span>{client.summary.lastTransaction ? `${formatToBRL(client.summary.lastTransaction.value)} • ${formatDistanceToNow(client.summary.lastTransaction.createdAt)}` : "—"}</span> */}
                    </div>

                    <div>
                        <div className="text-xs text-muted-foreground mb-1">Últimos pedidos: </div>
                        <ul className="text-sm space-y-1">
                            {/* {client.summary.lastTransaction.length === 0 && <li className="text-xs text-muted-foreground">Nenhum pedido</li>} */}
                            {/* {client.summary.lastOrder.map((order) => (
                                <li key={order.id} className="flex justify-between items-center">
                                    <div className="truncate">
                                        <span className="font-medium">{order.title ?? `Pedido #${order.id}`}</span>
                                        <span className="text-muted-foreground text-xs ml-2">{order.flag}</span>
                                    </div>
                                    <div className="text-sm">{formatToBRL(computeOrderTotal(order))}</div>
                                </li>
                            ))} */}
                        </ul>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button className="flex-1" variant="outline" onClick={() => onView?.(client)}>Ver mais</Button>
            </CardFooter>
        </Card>
    )
}
