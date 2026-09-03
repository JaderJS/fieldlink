'use client'

import { Alert, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useOrderAnalytics } from "@/features/order/hooks/use.order"
import { Order } from "@/features/order/types"
import { AlertTriangle, Brain, CheckCircle2, TrendingUp } from "lucide-react"

interface AnalyticsProps {
    order: Pick<Order, "id">
}

export const Analytics = ({ order }: AnalyticsProps) => {

    const { data } = useOrderAnalytics({ order })

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={'outline'}>
                    <Brain />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Analise detalhada</SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 p-2">
                    <div className="space-y-6 mt-4">
                        {/* === Resumo Financeiro === */}
                        <div className="grid grid-cols-2 gap-3">
                            <Card>
                                <CardHeader className="p-2 pb-0">
                                    <CardTitle className="text-xs font-medium text-muted-foreground">Receita</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 pt-1 text-lg font-semibold">
                                    R$ {data?.summary.totalSale.toFixed(2)}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="p-2 pb-0">
                                    <CardTitle className="text-xs font-medium text-muted-foreground">Custo Total</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 pt-1 text-lg font-semibold text-red-600">
                                    R$ {data?.summary.totalCost.toFixed(2)}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="p-2 pb-0">
                                    <CardTitle className="text-xs font-medium text-muted-foreground">Lucro Bruto</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 pt-1 text-lg font-semibold text-green-600">
                                    R$ {data?.summary.totalProfit.toFixed(2)}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="p-2 pb-0">
                                    <CardTitle className="text-xs font-medium text-muted-foreground">Margem</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 pt-1 text-lg font-semibold">
                                    {data?.summary.profitMargin.toFixed(1)}%
                                </CardContent>
                            </Card>

                        </div>
                    </div>

                    <div className="mt-2">
                        <span className="text-sm font-semibold mb-2">Produtos Envolvidos</span>
                        <Table className="w-full text-sm">
                            <TableHeader className="bg-muted/40">
                                <TableRow>
                                    <TableHead>Produto</TableHead>
                                    <TableHead>Qtd</TableHead>
                                    <TableHead>Custo</TableHead>
                                    <TableHead>Venda</TableHead>
                                    <TableHead>Margem</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data?.products.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell>{p.name}</TableCell>
                                        <TableCell className="">{p.quantity}</TableCell>
                                        <TableCell className="">R$ {p.totalCost.toFixed(2)}</TableCell>
                                        <TableCell className="">R$ {p.totalSale.toFixed(2)}</TableCell>
                                        <TableCell className="">{0}%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div>
                        <p className="text-sm font-semibold mb-2">Recomendações</p>
                        <div className="space-y-1">
                            {data?.summary.recommendations.map((rec: string, i: number) => (
                                <Alert key={i}>
                                    <AlertTitle className="text-xs">{rec}</AlertTitle>
                                </Alert>
                            ))}

                        </div>
                    </div>

                </ScrollArea>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}