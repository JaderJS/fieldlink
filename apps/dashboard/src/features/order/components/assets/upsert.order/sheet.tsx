import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useClient } from "@/features/client/hooks/use.client"
import { useCompanies } from "@/features/company/hooks/use.companies"
import { Nf, PDFDownloadLink } from "@/features/nf"
import ViewReportPDF from "@/features/nf/components/report/view.report"
import { aggregateItens } from "@/features/order/helpers/itens"
import { useOrder } from "@/features/order/hooks/use.order"
import { upsertInvoiceSchema, UpsertInvoiceSchema } from "@/features/order/schema/upsert.invoice.schema"
import { UpsertOrderSchema } from "@/features/order/schema/upsert.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { title } from "node:process"
import { useEffect, useMemo, useRef, useState } from "react"
import { useFieldArray, useForm, UseFormReturn, useWatch } from "react-hook-form"
import { ViewReportSummary } from "./summary/report"
import Link from "next/link"



export const UpsertInvoiceSheet = ({ form }: { form: UseFormReturn<UpsertOrderSchema> }) => {

    const observer = useWatch({ control: form.control })
    const formInvoice = useForm<UpsertInvoiceSchema>({
        resolver: zodResolver(upsertInvoiceSchema),
        defaultValues: {
            company: { id: -1, cnpj: "000.000.000-00", name: "" },
            client: { name: "", cnpj: "000.000.000-00", property: "", state: "", town: "" },
            title: "",
            itens: [],
            otherValues: [],
            type: "Orçamento",
            obs: "",
        }
    })

    const { data: client } = useClient({ client: { id: form.watch('clientId') } })

    const { data: order } = useOrder({ order: { id: form.watch("id") ?? 0 } })

    const { data: companies } = useCompanies()

    const invoice = useMemo(() => {
        const { title, clientId, sales, works, otherValues, discount, total, flag } = form.getValues()

        const salesItens = sales?.flatMap(sale => sale.productsOnSale).map((productOnSale) => ({
            name: productOnSale?.product?.name,
            qtd: productOnSale?.quantity,
            value: productOnSale?.price
        })) ?? []
        const productsInWork = (works || []).filter(work => !work.disabled).flatMap(work => (work.sales || [])).flatMap(sale => (sale.productsOnSale || [])).map((productOnSale) => ({
            name: productOnSale.product.name,
            qtd: productOnSale.quantity,
            value: productOnSale.price,
        })) ?? []

        const otherValuesInWork = (works || []).filter(work => !work.disabled).flatMap(work => (work.otherValues || [])).map(otherValue => ({
            name: otherValue.name,
            value: otherValue.price,
            qtd: 1,
        }))
        const otherValuesInOrder = (otherValues || []).map(otherValue => ({
            name: otherValue.name,
            value: otherValue.price,
            qtd: 1,
        }))

        const itens_ = productsInWork.concat(salesItens)
        const otherValues_ = otherValuesInWork.concat(otherValuesInOrder)
        const discount_ = { value: (1 - discount) * total, percent: discount * 100 }
        const fileName = client ? `${title || "Ordem de serviço"} [${client.name}] at.pdf` : "Ordem de Serviço at.pdf"

        const combinedItens = aggregateItens(itens_)
        const combinedOtherValues = aggregateItens(otherValues_)

        return {
            title,
            itens: combinedItens,
            otherValues: combinedOtherValues,
            money: {
                discountPercent: discount * 100,
                totalWithDiscount: total * (1 - discount),
                total: total,
            }
        }
    }, [observer, companies])

    const dataInvoice = formInvoice.watch()

    const pdfDocument = useMemo(() => {
        return (
            <Nf
                client={{ id: client?.id, cnpj: "000.000.000-00", name: client?.name ?? "", property: client?.property ?? "", state: "MT", town: dataInvoice.client.town }}
                emitter={{ cnpj: dataInvoice.company.cnpj, name: dataInvoice.company.name }}
                itens={dataInvoice.itens}
                otherValues={dataInvoice.otherValues}
                discount={{ percent: invoice.money.discountPercent, value: invoice.money.totalWithDiscount }}
                type={dataInvoice.type}
                obs={dataInvoice.obs}
            />
        )
    }, [client, dataInvoice, invoice])

    const lastResetSig = useRef<string | null>(null)

    useEffect(() => {
        const sig = JSON.stringify({
            title: invoice.title,
            itens: invoice.itens,
            otherValues: invoice.otherValues,
            firstCompanyId: companies?.[0].id ?? null,
            clientId: client?.id ?? null
        })
        if (lastResetSig.current === sig) return

        const fileName = client ? `${invoice.title || "Ordem de serviço"} [${client.name}] at.pdf` : "Ordem de Serviço at.pdf"

        formInvoice.reset({
            company: {
                id: companies?.[0]?.id || 0,
                cnpj: companies?.[0]?.cnpj || "000.000.000-00",
                name: companies?.[0]?.name || "Desconhecido"
            },
            client: {
                name: client?.name || "",
                cnpj: "000.000.000-00",
                property: client?.property || "",
                state: "MT",
                town: client?.property || "Desconhecido"
            },
            title: fileName,
            itens: invoice.itens,
            otherValues: invoice.otherValues,
        })
    }, [invoice, companies, client])

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant={"outline"}>Nota</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="mt-8">
                    <SheetTitle>
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input className="text-xl border-0 ring-0 shadow-none" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </SheetTitle>
                    <SheetDescription></SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-1 px-4 overflow-y-auto">
                    <FormUpsertInvoice form={formInvoice} />
                </div>

                <SheetFooter>

                    <Button asChild>
                        <Link target="_blank" href={`/order/${order?.id}/report`}>Gerar relatório</Link>
                    </Button>

                    {client && <PDFDownloadLink
                        fileName={dataInvoice.title}
                        document={pdfDocument}>
                        {({ loading }) => (
                            <Button className="w-full" disabled={loading}>Gerar PDF</Button>
                        )}
                    </PDFDownloadLink>}
                    <SheetClose asChild>
                        <Button>Sair</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

const FormUpsertInvoice = ({ form }: { form: UseFormReturn<UpsertInvoiceSchema> }) => {

    const { data: companies } = useCompanies()
    const itensArray = useFieldArray({ control: form.control, name: 'itens' })
    const otherValuesArray = useFieldArray({ control: form.control, name: 'otherValues' })

    return (
        <>
            <FormField
                name="type"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <Select
                            {...field}
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Tipo da nota demonstrativa" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Orçamento">Orçamento</SelectItem>
                                <SelectItem value="Manutenção">Manutenção</SelectItem>
                                <SelectItem value="Venda">Venda</SelectItem>
                                <SelectItem value="Manutenção/Venda">Manutenção/Venda</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="client.town"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="company"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <Select
                            value={String(field.value.id)}
                            onValueChange={(value) => {
                                const company = companies?.find(({ id }) => String(id) === value)
                                if (!company) return
                                field.onChange(company)
                            }}
                        >
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a companhia" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {companies?.map((company) => (
                                    <SelectItem key={company.id} value={String(company.id)}>{company.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="itens"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <Table>
                            <TableCaption>Trabalhos e vendas</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Qtd</TableHead>
                                    <TableHead>name</TableHead>
                                    <TableHead>value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {itensArray.fields.map((itens, index) => (
                                    <TableRow key={itens.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{itens.qtd}</TableCell>
                                        <TableCell>
                                            <FormField
                                                name={`itens.${index}.name`}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell>{itens.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="otherValues"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <Table>
                            <TableCaption>Lista com os outros valores</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Qtd</TableHead>
                                    <TableHead>name</TableHead>
                                    <TableHead>value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {otherValuesArray.fields.map((otherValues, index) => (
                                    <TableRow key={otherValues.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{otherValues.qtd}</TableCell>
                                        <TableCell>
                                            <FormField
                                                name={`otherValues.${index}.name`}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </TableCell>
                                        <TableCell>{otherValues.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="obs"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Observação</FormLabel>
                        <FormControl>
                            <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                        <FormDescription>Insira aqui alguma observação útil</FormDescription>
                    </FormItem>
                )}
            />

        </>
    )
}