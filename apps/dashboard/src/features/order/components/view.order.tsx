'use client'

import { CreateOrderBtn } from "./create.order"
import { KanbanProvider } from "@/features/kanban/providers/kanban.provider"
import { KanbanColumn } from "@/features/kanban/components/comp/column/kanban.column"
import { KanbanHeader } from "@/features/kanban/components/comp/header/kanban.header"
import { KanbanBoard } from "@/features/kanban/components/comp/board/kanban.board"
import { KanbanItem } from "@/features/kanban/components/comp/item/kanban.item"
import { formatToBRL } from "@/functions/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Order } from "../types"
import { useOrders } from "../hooks/use.orders"
import { getBgColorByWord, getBgColorByWord_ } from "@/components/utils"

export const ViewOrders = () => {

    const { data: orders } = useOrders()

    if (!orders) return null

    return (
        <>
            <CreateOrderBtn />
            <KanbanProvider
                data={orders.map(o => ({ ...o, id: String(o.id) }))}
                groupBy={"flag"}
            >
                {(column) => (
                    <KanbanBoard id={column.id} key={column.id}>
                        <KanbanHeader>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-muted animate-pulse" style={{ background: column.items.map(i => (i as any).status.color).at(-1) }} />
                                <span className="font-medium">{column.name}</span>
                                <span className="text-xs text-muted-foreground">
                                    {column.items.length} ordem(s)
                                </span>
                            </div>
                        </KanbanHeader>
                        <KanbanColumn<Order> id={column.id} title={column.name} items={column.items} className="overflow-x-auto">
                            {(order) => (
                                <KanbanItem key={order.id} id={String(order.id)} name={order.title}>
                                    <div className="flex flex-col gap-3">
                                        {/* Header do item */}
                                        <div>
                                            <p className="text-sm capitalize line-clamp-1">{order.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {order.client.name}
                                            </p>
                                        </div>

                                        {/* Blocos de resumo */}
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="col-span-2 flex flex-col items-center p-2 bg-green-50 rounded-xl">
                                                <span className="text-xs text-muted-foreground">Total</span>
                                                <span className="text-green-600 font-bold">
                                                    {formatToBRL(order.total)}
                                                </span>
                                            </div>

                                            <div className="flex flex-col items-center p-2 bg-blue-50 rounded-xl">
                                                <span className="text-xs text-muted-foreground">Desconto</span>
                                                <span className="text-blue-600 font-bold">
                                                    {order.discount * 100}%
                                                </span>
                                            </div>


                                        </div>

                                        <div className="flex gap-1">
                                            <div className="flex flex-col items-center p-2 bg-purple-50 rounded-xl">
                                                <span className="text-xs text-muted-foreground">Trabalhos</span>
                                                <span className="text-purple-600 font-bold">{order.works.length}</span>
                                            </div>

                                            <div className="flex flex-col items-center p-2 bg-pink-50 rounded-xl">
                                                <span className="text-xs text-muted-foreground">Vendas</span>
                                                <span className="text-pink-600 font-bold">{order.sales.length}</span>
                                            </div>

                                            <div className="flex-1 flex flex-col items-center p-2 bg-amber-50 rounded-xl">
                                                <span className="text-xs text-muted-foreground">Status</span>
                                                <span className="text-amber-600 font-bold">{order.flag}</span>
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex justify-between items-center border-t pt-2">
                                            <p className="text-xs text-muted-foreground">
                                                Criada em{" "}
                                                <span className="font-medium">
                                                    {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                                                </span>
                                            </p>
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/order/${order.id}`}>Ver mais</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </KanbanItem>
                            )}
                        </KanbanColumn>
                    </KanbanBoard>

                )}
            </KanbanProvider>
        </>
    )
}