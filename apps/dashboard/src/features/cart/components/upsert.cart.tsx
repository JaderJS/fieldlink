'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"
import { useFieldArray, useForm, UseFormRegisterReturn, UseFormReturn } from "react-hook-form"
import { DEFAULT_NEW_OTHER_VALUES, upsertCartSchema, UpsertCartSchema } from "../schema/schema.cart"
import { zodResolver } from "@hookform/resolvers/zod"
import { debounce } from "lodash"
import { throttle } from "lodash"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { ViewProducts } from "@/features/product/components/view.products"
import React, { useCallback, useEffect, useMemo } from "react"
import { getSuppliers } from "@/features/supplier/service/crud"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getPeriods } from "@/features/adm/services/period.crud"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Check, Cog, DollarSign, Loader, MoreVertical, ShoppingBag, Trash, Wrench } from "lucide-react"
import { RiGatsbyLine, RiNextjsLine, RiReactjsLine, RiRoadMapFill } from "@remixicon/react"
import MultipleSelector, { Option } from "@/components/ui/multiselect"
import { getBanks } from "@/features/adm/services/bank.crud"
import { NumberField, Input as InputAria } from "react-aria-components"
import { PopoverAnchor, PopoverContent, PopoverTrigger, Popover } from "@/components/ui/popover"
import Link from "next/link"
import { Cart } from "../types"
import { useCart } from "../hooks/use.cart"
import { useUpsertCart } from "../hooks/use.upsert.cart"
import { FormInstallments } from "@/features/installment/components/form/form.installments"
import { ActionItem, MoreActions, Product, ProviderProducts, SelectedProduct, useProducts, ViewProducts } from "@/features/products"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, useSearchParams } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { FormProductsOnCart } from "./form/products.on.cart"
import { FormConfig } from "./form/form.config"

export const UpsertCart = ({ cart }: { cart: Pick<Cart, 'id'> }) => {

    const { data } = useCart({ cart })

    const { data: suppliers } = useQuery({
        queryKey: KEYS.supplier.getAll(),
        queryFn: getSuppliers,
        select: data => data.suppliers
    })

    const { mutateAsync: upsertCartFn } = useUpsertCart()

    const form = useForm<UpsertCartSchema>({
        resolver: zodResolver(upsertCartSchema),
        mode: "onBlur",
        defaultValues: {
            id: data?.id,
            supplierId: data?.supplierId,
            total: data?.total,
            title: data?.title,
            createdAt: data?.createdAt,
            productsOnCart: data?.productsOnCart,
            transaction: {
                id: data?.transaction.id,
                title: data?.transaction.title,
                hasNfe: data?.transaction.hasNfe,
                total: data?.transaction.total,
                bankId: data?.transaction.bankId,
                companyId: data?.transaction.companyId,
                type: data?.transaction.type,
                content: {},
                installments: data?.transaction.installments.map(i => ({
                    id: i.id,
                    dueAt: new Date(i.dueAt),
                    installmentsNumber: i.installmentsNumber,
                    installmentsTotal: i.installmentsTotal,
                    paidAt: i.paidAt ? new Date(i?.paidAt) : undefined,
                    paymentMethod: i.paymentMethod,
                    periodId: i.periodId,
                    status: i.status,
                    transactionId: i.transactionId,
                    value: i.value,
                    billed: i.billed,
                })),
            },
            otherValues: data?.otherValues
        }
    })

    const installmentsArray = useFieldArray({ control: form.control, name: 'transaction.installments', keyName: "key" })


    const submit = useCallback((data: UpsertCartSchema) => {
        const promise = upsertCartFn(data)
        toast.promise(promise, { success: "Compra salva", loading: "Salvando compra...", error: (error) => String(error) })
    }, [upsertCartFn])

    const handleSubmitWithDebounce = useMemo(() => debounce(submit, 10000, { maxWait: 5000 }), [])

    useEffect(() => {
        console.log(form.formState.errors)
    }, [form.formState.errors])

    return (
        <Form {...form}>
            <section className="grid auto-rows-min gap-2 grid-cols-1 lg:grid-cols-3">
                <div className="flex flex-col justify-center items-center p-6 lg:p-0 rounded-xl bg-muted relative h-full">
                    <ViewTotal form={form} onSave={handleSubmitWithDebounce} />
                </div>
                <div className="lg:col-span-2 flex flex-col justify-center items-center rounded-xl bg-muted p-2">
                    <FormInstallments
                        arrayName="transaction.installments"
                        form={form}
                        formArray={installmentsArray}
                        onSave={handleSubmitWithDebounce}
                    />
                </div>
                <div className="col-span-full bg-muted p-2 rounded-xl">
                    <FormField
                        name="supplierId"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fornecedor</FormLabel>
                                <Select
                                    value={String(field.value)}
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                        form.handleSubmit(handleSubmitWithDebounce)()
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Fornecedor" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {suppliers?.map(({ id, name }) => (
                                            <SelectItem value={String(id)} key={id}>{name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>Selecione o fornecedor</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </section>

            <FormUpsertCart form={form} onSave={handleSubmitWithDebounce} />

        </Form>
    )
}

const FormUpsertCart = ({ form, onSave }: { form: UseFormReturn<UpsertCartSchema>, onSave: (data: any) => void }) => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const tabs = searchParams.get('tab') || 'purchase'

    const purchases = form.watch('productsOnCart')
    const otherValues = form.watch('otherValues')

    const handleTabChange = (newTab: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('tab', newTab)
        router.push(`?${params.toString()}`, { scroll: false })
    }
    return (
        <section>
            <Tabs defaultValue={tabs} onValueChange={handleTabChange} className="mt-2">
                <ScrollArea>
                    <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
                        <TabsTrigger
                            value="purchase"
                            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            <ShoppingBag
                                className="-ms-0.5 me-1.5 opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                            Compras
                            {Array.isArray(purchases) && purchases.length !== 0 && <Badge
                                className="bg-primary/15 ms-1.5 min-w-5 px-1"
                                variant="secondary"
                            >
                                {purchases?.length}
                            </Badge>}
                        </TabsTrigger>

                        <TabsTrigger
                            value="otherValues"
                            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            <MoreVertical
                                className="-ms-0.5 me-1.5 opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                            Outros valores
                            {Array.isArray(otherValues) && otherValues.length !== 0 && <Badge
                                className="bg-primary/15 ms-1.5 min-w-5 px-1"
                                variant="secondary"
                            >
                                {otherValues?.length}
                            </Badge>}
                        </TabsTrigger>
                        <TabsTrigger
                            value="config"
                            className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            <Cog
                                className="-ms-0.5 me-1.5 opacity-60"
                                size={16}
                                aria-hidden="true"
                            />
                            Configurações
                        </TabsTrigger>
                    </TabsList>
                </ScrollArea>

                <TabsContent value="purchase" className="h-full">
                    <FormProductsOnCart form={form} onSave={onSave} />
                </TabsContent>
                <TabsContent value="otherValues" className="h-full">
                    <ViewOtherValues form={form} onSave={onSave} />
                </TabsContent>
                <TabsContent value="config" className="h-full">
                    <FormConfig form={form} onAutoSave={onSave} />
                </TabsContent>
            </Tabs>
        </section>
    )
}

const ViewTotal = ({ form, onSave }: { form: UseFormReturn<UpsertCartSchema>, onSave: (data: any) => void }) => {
    return (
        <>
            <FormField
                name={`total`}
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <NumberField
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e)
                                    form.handleSubmit(onSave)()
                                }}
                                formatOptions={{
                                    style: "currency",
                                    currency: "BRL",
                                }}
                            >
                                <InputAria className="font-bold text-amber-600 text-center text-2xl outline-none rounded-md flex-1 px-3 py-2" />
                            </NumberField>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}

const ViewOtherValues = ({ form, onSave }: { form: UseFormReturn<UpsertCartSchema>, onSave: (data: any) => void }) => {
    const { fields, append, remove } = useFieldArray({ control: form.control, name: 'otherValues', keyName: 'key' })
    const header = ['#', "Nome", "Valor", "Ação"]

    const handleTotal = (form: UseFormReturn<UpsertCartSchema>) => {
        const productsOnCartTotal = form.getValues('productsOnCart').reduce((acc, p) => acc + (p.price * p.quantity), 0)
        const otherValuesTotal = form.getValues('otherValues').reduce((acc, o) => acc + o.price, 0)
        // const transactions = form.getValues('transactions')
        const total = productsOnCartTotal + otherValuesTotal
        // form.setValue('transactions', transactions.map((t) => ({ ...t, amount: total / (transactions.length === 0 ? 1 : transactions.length) })))
        form.setValue('total', (productsOnCartTotal + otherValuesTotal))
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        {header.map((head) => (
                            <TableHead key={head}>{head}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {fields.map(({ price, name, key, id }, index) => (
                        <TableRow key={key}>
                            <TableCell>{index + 1}</TableCell>

                            {/* Name */}
                            <TableCell>
                                <FormField
                                    name={`otherValues.${index}.name`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl >
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>

                            {/* Amount */}
                            <TableCell>
                                <FormField
                                    name={`otherValues.${index}.price`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <NumberField
                                                ref={field.ref}
                                                value={field.value}
                                                onChange={(e) => {
                                                    field.onChange(e)
                                                    handleTotal(form)
                                                    form.handleSubmit(onSave)()
                                                }}
                                                formatOptions={{
                                                    style: "currency",
                                                    currency: "BRL",
                                                    currencySign: "accounting"
                                                }}
                                            >
                                                <FormControl>
                                                    <InputAria className="outline-none rounded-md text-foreground flex-1 px-3 py-2" />
                                                </FormControl>
                                            </NumberField>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>

                            {/* Actions */}
                            <TableCell>
                                <Button
                                    onClick={() => {
                                        remove(index)
                                        handleTotal(form)
                                        form.handleSubmit(onSave)()
                                    }}
                                    size={"icon"}
                                    variant={"ghost"}
                                    className="text-muted-foreground"
                                >
                                    <Trash />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={header.length}>
                            <Button
                                onClick={() => {
                                    append(DEFAULT_NEW_OTHER_VALUES)
                                    form.handleSubmit(onSave)()
                                }}
                                variant={"link"}
                                size={"sm"}
                            >
                                New
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

        </>
    )
}