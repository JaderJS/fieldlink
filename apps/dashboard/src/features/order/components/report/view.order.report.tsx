'use client'

import { Order } from "@/features/order/types"
import { useOrder } from "../../hooks/use.order"
import { generateText } from "@tiptap/core"
import { format, formatDistanceToNow } from "date-fns"
import StarterKit from "@tiptap/starter-kit"
import { ptBR } from "date-fns/locale"
import { Fragment } from "react"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const ViewOrderReport = ({ order }: { order: Pick<Order, "id"> }) => {

    const { data } = useOrder({ order: order })

    const formatMoney = (v: any) => Number(v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })


    if (!data) return null

    const totalSales = data.sales.flatMap(sale => sale.productsOnSale).reduce((acc, sale) => acc + (sale.quantity || 1) * (sale.price || 0), 0)

    return (
        <div className="p-8 max-w-4xl mx-auto text-sm print-full">

            {/* Cabeçalho */}
            <header className="border-b pb-4 mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Relatório da Ordem de serviço <span className="text-muted">#{data.id}</span></h1>
                    <p className="text-gray-600">Gerado em {format(new Date(), "dd/MM/yyyy", { locale: ptBR })}</p>
                    <p className="text-gray-600">
                        Última atualização de {format(data.updatedAt, "dd/MM/yyyy", { locale: ptBR })}
                    </p>
                </div>
            </header>

            <section className="mb-6 ">
                <h2 className="text-xl font-semibold mb-3">Informações da Ordem</h2>

                <div className="grid grid-cols-2 gap-4">
                    <Badge
                        variant={"outline"}
                    >
                        <span className={"size-3 border-0 rounded-full"} style={{ backgroundColor: data.status?.color }} />
                        {data.status?.name}
                    </Badge>
                    <div><strong>Responsável:</strong> { }</div>
                    <div><strong>Data de abertura:</strong> {format(data.createdAt, "dd/MM/yyyy")}</div>
                    {data.updatedAt && (
                        <div><strong>Finalizado em:</strong> {format(data.updatedAt, "dd/MM/yyyy")}</div>
                    )}
                </div>
            </section>

            <section className="mb-6 border-b pb-4">
                <h2 className="text-xl font-semibold mb-3">Dados do Cliente</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div><strong>Cliente:</strong> {data.client?.name}</div>
                    <div><strong>Telefone:</strong> {data.client?.moreInfos?.phone}</div>
                    <div><strong>Endereço:</strong> {data.client?.moreInfos?.address}</div>
                    {data.client?.moreInfos?.email && (
                        <div><strong>Email:</strong> {data.client.moreInfos.email}</div>
                    )}
                </div>
            </section>



            {/* WORKS */}
            <section className="mb-10 flex flex-col gap-3">
                <h2 className="text-xl font-semibold mb-3">Serviços Executados</h2>

                {data.works.map((work, index) => (
                    <Card key={work.id} className="print-avoid-break">
                        <CardHeader>
                            <CardTitle>{work.title}</CardTitle>
                            {work.content && <CardDescription className="text-justify">{generateText(work.content, [StarterKit])}</CardDescription>}
                        </CardHeader>

                        <CardContent className="flex flex-col">

                            {work.sales.length !== 0 && (
                                <div className="border rounded-lg py-2">
                                    <Table>
                                        <TableCaption>Itens do trabalho</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Qtd</TableHead>
                                                <TableHead>Item</TableHead>
                                                <TableHead>Valor unit.</TableHead>
                                                <TableHead>Subtotal</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {work.sales.map((sale) => {
                                                const productsOnSales = sale.productsOnSale

                                                return productsOnSales.map((productOnSale) => (
                                                    <TableRow key={productOnSale.productId + productOnSale.saleId}>
                                                        <TableCell>{productOnSale.quantity}</TableCell>
                                                        <TableCell>{productOnSale.product.name}</TableCell>
                                                        <TableCell>{formatMoney(productOnSale.price)}</TableCell>
                                                        <TableCell>{formatMoney(productOnSale.quantity * productOnSale.price)}</TableCell>
                                                    </TableRow>
                                                ))
                                            })}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TableCell colSpan={3}>Total</TableCell>
                                                <TableCell>
                                                    {formatMoney(work.sales.flatMap(s => s.productsOnSale).reduce((acc, productOnSale) => acc + ((productOnSale.quantity || 1) * (productOnSale.price || 0)), 0))}
                                                </TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                            )}

                            {work.otherValues.length !== 0 && (
                                <div className="border rounded-lg p-2 flex flex-col">
                                    <span className="text-base">Outros valores</span>
                                    {work.otherValues.map((otherValue) => (
                                        <div key={otherValue.id}>{otherValue.name} - {formatMoney(otherValue.price)}</div>
                                    ))}
                                </div>
                            )}


                            {!!work.archives?.length && (
                                <div className="mt-2">
                                    <span className="text-base">Anexos</span>
                                    <div className="grid grid-cols-3 gap-3 mt-4">
                                        {work.archives.map((archive, index) => (
                                            <div key={index} className="rounded">
                                                <img
                                                    src={archive.pathUrl}
                                                    className="w-full h-32 object-cover rounded"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <span><strong>Valor do Serviço:</strong> {formatMoney(work.total)}</span>
                        </CardFooter>

                    </Card>
                ))}
            </section>

            {data.sales?.length > 0 && (
                <section className="flex flex-col gap-4">
                    <p className="text-2xl font-semibold">Itens avulsos</p>

                    <Table className="w-full border text-sm">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Qtd</TableHead>
                                <TableHead>Valor Unit.</TableHead>
                                <TableHead>Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.sales.map((sale) => (
                                <TableRow key={sale.id}>
                                    {sale.productsOnSale.map(productOnSale => (
                                        <Fragment key={productOnSale.productId + productOnSale.saleId}>
                                            <TableCell>{productOnSale.product.name}</TableCell>
                                            <TableCell>{productOnSale.quantity || 1}</TableCell>
                                            <TableCell>{formatMoney(productOnSale.price)}</TableCell>
                                            <TableCell>
                                                {formatMoney((productOnSale.quantity || 1) * productOnSale.price)}
                                            </TableCell>
                                        </Fragment>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="mt-4 text-right font-bold text-lg">
                        Total dos Itens: {formatMoney(totalSales)}
                    </div>
                </section>
            )}

            <div className="print-page-break" />

            <section className="flex flex-col gap-4 print-avoid-break">
                <span className="text-2xl font-semibold">Outros valores</span>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Preço</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.otherValues.map((otherValue, index) => (
                            <TableRow key={otherValue.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{otherValue.name}</TableCell>
                                <TableCell>{formatMoney(otherValue.price)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>


            <section className="flex justify-end items-center mt-10 print-avoid-break">
                <div className="text-xl">

                    {data.discount !== 0 && (
                        <p><strong>Desconto:</strong> -{formatMoney(data.discount)}</p>
                    )}

                    {data.total && (
                        <p className="font-bold mt-2 text-xl flex gap-x-2">
                            Total Final:
                            <span className="text-amber-600">
                                {formatMoney(data.total)}
                            </span>
                        </p>
                    )}
                </div>
            </section>

            {/* Rodapé */}
            <footer className="text-xs text-gray-500 border-t pt-4 mt-10 text-center print:fixed print:bottom-0 print:left-0 print:w-full">
                © {formatDistanceToNow(data.updatedAt, { locale: ptBR })} — Relatório gerado automaticamente
            </footer>

        </div>
    )
}