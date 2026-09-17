'use client'

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteOrder, getOrderById, sendOrderOfEmail, upsertOrder } from "../services/crud.order"
import { Controller, FieldValues, useFieldArray, useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { DEFAULT_NEW_TRANSACTION_IN_ORDER, upsertOrderSchema, UpsertOrderSchema } from "../schema/upsert.schema"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import debounce from "lodash.debounce"
import { memo, useCallback, useEffect, useMemo, useRef } from "react"
import { BadgeQuestionMark, CalendarIcon, Check, Cog, DollarSign, Loader, MoreVertical, Newspaper, PanelsTopLeftIcon, Pickaxe, RefreshCcw, Send, Trash, Wrench } from "lucide-react"
import { useAuth } from "@/providers/auth"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
} from '@/components/ui/kibo-ui/combobox'
import { cn } from "@/lib/utils"
import { NumberField, Input as InputAria } from "react-aria-components"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useRouter, useSearchParams } from "next/navigation"
import { FlagUpsertOrder } from "./assets/upsert.order/flag.upsert.order"
import { UpsertInvoiceSheet } from "./assets/upsert.order/sheet"
import { FormUpsertDate } from "./assets/upsert.order/date.upsert.order"
import { useUpsertOrder } from "@/features/order/hooks/use.upsert.order"
import { useOrder } from "../hooks/use.order"
import { useClients } from "@/features/client/hooks/useClients"
import { FormInstallments } from "@/features/installment/components/form/form.installments"
import { FormWork } from "./form/form.work"
import { toast } from "sonner"
import { defaultNewSale, defaultNewWork } from "../constants/new.order"
import { recalculateTotalFn } from "../helpers/calc"
import { FormSeals } from "./form/form.sales"
import { FormStatus } from "./form/form.status"
import { Order } from "../types"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { ButtonGroup } from "@/components/ui/button-group"
import { Analytics } from "./assets/upsert.order/analytics"

export const UpsertOrder = ({ id }: { id: number }) => {

    const { data } = useOrder({ order: { id } })

    const { mutateAsync: upsertOrderFn } = useUpsertOrder()

    const form = useForm<UpsertOrderSchema>({
        mode: "onChange",
        reValidateMode: 'onChange',
        resolver: zodResolver(upsertOrderSchema),
        defaultValues: {
            id: data?.id,
            clientId: data?.clientId,
            title: data?.title,
            total: data?.total,
            statusId: data?.status?.id,
            discount: data?.discount,
            flag: data?.flag,
            date: data?.date ?? undefined,
            otherValues: data?.otherValues,
            transaction: {
                id: data?.transaction.id,
                title: data?.transaction.title,
                bankId: data?.transaction.bankId,
                companyId: data?.transaction.companyId,
                hasNfe: data?.transaction.hasNfe,
                hasNotify: data?.transaction.hasNotify,
                total: data?.transaction.total,
                type: data?.transaction.type,
                content: data?.transaction.content ?? {},
                installments: data?.transaction.installments.map((i) => ({
                    id: i.id,
                    billed: i.billed,
                    value: i.value,
                    dueAt: new Date(i.dueAt),
                    periodId: i.periodId,
                    status: i.status,
                    installmentsNumber: i.installmentsNumber,
                    paymentMethod: i.paymentMethod,
                    transactionId: i.transactionId,
                }))
            },
            works: data?.works.map(w => ({
                ...w,
                sales: w.sales.map(s => ({ ...s, content: {} })),
                content: w.content === null ? undefined : w.content,
                archives: w.archives,
                date: w.date ?? undefined
            })),
            sales: data?.sales.map(s => ({
                ...s,
            }))
        }
    })

    const submit = (data: UpsertOrderSchema) => {
        const promise = upsertOrderFn(data)
        toast.promise(promise, { loading: "Salvando ordem de serviço...", success: "Ordem de serviço salva com sucesso!" })
    }
    const handleSubmit = useRef(debounce(submit, 5000))

    useEffect(() => { console.log(form.formState.errors) }, [form.formState])

    // useEffect(() => {
    //     return () => {
    //         handleSubmit.current.flush()
    //     }
    // })

    return (
        <div className="flex-1 flex flex-col">
            <Form {...form}>
                <FormUpsertOrder
                    form={form}
                    onAutoSave={handleSubmit.current}
                    order={data}
                />
            </Form>
        </div>
    )
}

interface FormProps<T extends FieldValues> {
    form: UseFormReturn<T>
    onAutoSave: (data: T) => void
    className?: string
}

const FormUpsertOrder = ({ form, order, onAutoSave }: FormProps<UpsertOrderSchema> & { order?: Order }) => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const tabs = searchParams.get('tab') || 'work'

    const works = form.watch('works')
    const sales = form.watch('sales')
    const otherValues = form.watch('otherValues')

    const handleTabChange = (newTab: string) => {
        const params = new URLSearchParams(searchParams)
        params.set('tab', newTab)
        router.push(`?${params.toString()}`, { scroll: false })
    }

    return (
        <>
            <div className="p-2 flex flex-col h-full">
                <PanelOrder form={form} onAutoSave={onAutoSave} order={order} />

                <section className="flex flex-col w-full gap-6 pt-2 h-full">
                    <Tabs defaultValue={tabs} onValueChange={handleTabChange}>
                        <ScrollArea>
                            <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1">
                                <TabsTrigger
                                    value="work"
                                    className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                >
                                    <Wrench
                                        className="-ms-0.5 me-1.5 opacity-60"
                                        size={16}
                                        aria-hidden="true"
                                    />
                                    Trabalhos
                                    {Array.isArray(works) && works.length !== 0 && <Badge
                                        className="bg-primary/15 ms-1.5 min-w-5 px-1"
                                        variant="secondary"
                                    >
                                        {works?.length}
                                    </Badge>}
                                </TabsTrigger>

                                <TabsTrigger
                                    value="sell"
                                    className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                                >
                                    <DollarSign
                                        className="-ms-0.5 me-1.5 opacity-60"
                                        size={16}
                                        aria-hidden="true"
                                    />
                                    Vendas
                                    {Array.isArray(sales) && sales.length !== 0 && <Badge
                                        className="bg-primary/15 ms-1.5 min-w-5 px-1"
                                        variant="secondary"
                                    >
                                        {sales?.length}
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
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                        <TabsContent value="work" className="h-full">
                            <FormWorks form={form} onAutoSave={onAutoSave} className="h-full" />
                        </TabsContent>
                        <TabsContent value="sell" className="h-full">
                            <FormSeals form={form} onAutoSave={onAutoSave} className="h-full" />
                        </TabsContent>
                        <TabsContent value="otherValues" className="h-full">
                            <FormOtherValuesInOrder form={form} onAutoSave={onAutoSave} />
                        </TabsContent>
                        <TabsContent value="config" className="h-full">
                            <PanelConfig form={form} onAutoSave={onAutoSave} />
                        </TabsContent>
                    </Tabs>
                </section>
            </div>
        </>

    )
}

const PanelOrder = ({ form, order, onAutoSave }: { form: UseFormReturn<UpsertOrderSchema>, onAutoSave: (data: UpsertOrderSchema) => void } & { order?: Order }) => {


    const { isPending, mutate: sendOrderOfEmailFn } = useMutation({
        mutationFn: sendOrderOfEmail
    })

    const { data: clients } = useClients()

    const data = form.watch()
    const money = useMemo(() => ({
        total: data.total,
        totalWithDiscount: data.total * (1 - data.discount),
        discountInMoney: data.total * (data.discount / (1 - data.discount))
    }), [data.total, data.discount])

    const fieldInstallments = useFieldArray({ control: form.control, name: 'transaction.installments', keyName: "key" })


    return (
        <div className="grid auto-rows-min gap-2 grid-cols-1 lg:grid-cols-3">

            <div className="flex flex-col justify-center items-center p-6 lg:p-0 rounded-xl bg-muted relative h-full">

                <ButtonGroup className="absolute top-2 left-2">
                    {order?.id && <Analytics order={{ id: order?.id }} />}
                    <Button
                        variant="outline"
                        onClick={() => recalculateTotalFn(form)}
                        size="icon"
                    >
                        <RefreshCcw />
                    </Button>
                    <Button
                        variant={"submit"}
                        size={"icon"}
                        onClick={form.handleSubmit(onAutoSave)}
                        disabled={!form.formState.isValid || form.formState.isSubmitting}
                    >
                        <Send />
                    </Button>
                </ButtonGroup>

                {/* Total */}
                <FormField
                    control={form.control}
                    name={`total`}
                    render={({ field }) => (
                        <FormItem >
                            <NumberField
                                value={field.value}
                                formatOptions={{
                                    currency: "BRL",
                                    style: "currency"
                                }}
                            >
                                <InputAria
                                    className={cn("text-3xl text-center outline-none text-yellow-600 font-bold", form.watch('discount') !== 0 && "line-through")}
                                />
                            </NumberField>
                            <FormControl>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.watch('discount') !== 0 && (
                    <NumberField
                        value={money.totalWithDiscount}
                        isReadOnly
                        formatOptions={{
                            currency: "BRL",
                            style: "currency"
                        }}
                    >
                        <InputAria
                            className={cn("text-xl text-center outline-none text-yellow-600 font-extrabold")}
                        />
                    </NumberField>
                )}

                <FormField
                    name="discount"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <NumberField
                                    {...field}
                                    onChange={(value) => {
                                        field.onChange(value)
                                        recalculateTotalFn(form)
                                        form.handleSubmit(onAutoSave)()
                                    }}
                                    formatOptions={{
                                        maximumFractionDigits: 2,
                                        minimumFractionDigits: 0,
                                        style: "percent"
                                    }}
                                >
                                    <InputAria placeholder="Desconto" className={"text-xs text-center outline-none text-emerald-600 font-bold"} />
                                </NumberField>
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

            </div>

            <div className="lg:col-span-2 flex flex-col p-2 justify-center items-center rounded-xl bg-muted">
                <FormInstallments
                    form={form}
                    formArray={fieldInstallments}
                    arrayName="transaction.installments"
                    onSave={onAutoSave}
                    onChangeTitle={(value) => form.setValue("title", value)}
                />
            </div>

            <div className="grid grid-cols-1 lg:col-span-3 lg:grid-cols-4 gap-2">
                <div
                    className="flex justify-center items-center rounded-xl bg-muted p-3"
                >
                    <FormStatus form={form} onAutoSave={onAutoSave} />
                </div>
                <div
                    className="flex justify-center items-center rounded-xl bg-muted p-3"
                >
                    <FormField
                        control={form.control}
                        name={`clientId`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cliente</FormLabel>
                                <Combobox
                                    data={clients?.map(({ id, name }) => ({ value: String(id), label: name })) ?? []}
                                    type="clients"
                                    value={String(field.value)}
                                    onValueChange={(value) => {
                                        const id = value.split(" ")[0]
                                        field.onChange(id)
                                        form.handleSubmit(onAutoSave)()
                                    }}
                                >
                                    <FormControl>
                                        <ComboboxTrigger className="w-full" />
                                    </FormControl>
                                    <ComboboxContent>
                                        <ComboboxInput placeholder="Buscar cliente..." />
                                        <ComboboxEmpty />
                                        <ComboboxList>
                                            <ComboboxGroup>
                                                {clients?.map(({ id, name, property }) => (
                                                    <ComboboxItem
                                                        key={String(id)}
                                                        value={`${String(id)} ${name} ${property}`}
                                                        className="line-clamp-2"
                                                    >
                                                        {property} - {name}
                                                    </ComboboxItem>
                                                ))}
                                            </ComboboxGroup>
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                                <FormDescription>Informe o cliente ao qual a ordem de serviço será encaminhada</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-center items-center rounded-xl bg-muted">
                    <FormUpsertDate form={form} onAutoSave={onAutoSave} />
                </div>

                <div className="flex flex-col gap-1 justify-center items-center rounded-xl bg-muted">
                    <Label>Gerar demonstrativo</Label>
                    {/* <Button
                        disabled={isPending}
                        onClick={() => {
                            sendOrderOfEmail({
                                id: form.getValues('id') as number,
                                subject: "Ordem de serviço",
                                to: 'jader.jader55@gmail.com'
                            })
                        }}
                    >
                        Gerar relatório
                    </Button> */}
                    <UpsertInvoiceSheet form={form} />
                    <span className="text-xs text-muted-foreground">Gere um PDF da nota e emita ao cliente</span>
                </div>
            </div>

        </div >

    )
}

const FormWorks = ({ form, onAutoSave, className }: FormProps<UpsertOrderSchema>) => {

    const { user, hasPermission } = useAuth()
    const works = useFieldArray({ control: form.control, name: "works", keyName: 'key' })

    if (works.fields.length === 0) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant={"icon"}>
                        <Pickaxe />
                    </EmptyMedia>
                    <EmptyTitle>Nenhum trabalho atribuído</EmptyTitle>
                    <EmptyDescription>
                        Deseja adicionar um trabalho a ordem?
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex gap-2">
                        <Button onClick={() => works.append(defaultNewWork())}>Criar trabalho</Button>
                    </div>
                </EmptyContent>
            </Empty>
        )
    }

    return (
        <div className={cn("flex flex-col justify-start items-center gap-2", className)}>
            <Button className="w-full" variant="outline" onClick={() => works.append(defaultNewWork())}>Novo trabalho </Button>
            {works.fields.map((work, index) => (
                <FormWork key={work.key} index={index} form={form} formArray={works} fields={work} onAutoSave={onAutoSave} />
            ))}
        </div>

    )
}

const FormOtherValuesInOrder = ({ form, onAutoSave }: FormProps<UpsertOrderSchema>) => {
    const { user, hasPermission } = useAuth()
    const otherValues = useFieldArray({ control: form.control, name: "otherValues", keyName: 'key' })

    const header = ['#', 'Nome', 'Valor', 'Ação']

    const total = form.watch('otherValues')?.reduce((acc, { price }) => {
        acc += price
        return acc
    }, 0) ?? 0

    const handleNewOtherValues = () => {
        otherValues.append({ name: '', price: 0 })
        form.handleSubmit(onAutoSave)()
    }

    if (otherValues.fields.length === 0) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant={"icon"}>
                        <BadgeQuestionMark />
                    </EmptyMedia>
                    <EmptyTitle>Nenhum outro valor atribuído</EmptyTitle>
                    <EmptyDescription>
                        Deseja adiciona algum outro valor a ordem de serviço?
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex gap-2">
                        <Button onClick={handleNewOtherValues}>Adicionar outro valor</Button>
                    </div>
                </EmptyContent>
            </Empty>
        )
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
                    {otherValues.fields.map((otherValue, index) => (
                        <TableRow key={otherValue.key}>
                            <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                            <TableCell>
                                <FormField
                                    control={form.control}
                                    name={`otherValues.${index}.name`}
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
                            <TableCell>
                                <FormField
                                    control={form.control}
                                    name={`otherValues.${index}.price`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <NumberField
                                                    {...field}
                                                    value={field.value}
                                                    onChange={(value) => {
                                                        field.onChange(value)
                                                        recalculateTotalFn(form)
                                                        form.handleSubmit(onAutoSave)()
                                                    }}
                                                    formatOptions={{
                                                        currency: "BRL",
                                                        style: "currency"
                                                    }}
                                                >
                                                    <InputAria className={"outline-none text-yellow-600 font-bold"} />
                                                </NumberField>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant={"ghost"}
                                    size={"icon"}
                                    className="text-muted-foreground"
                                    onClick={() => {
                                        otherValues.remove(index)
                                        recalculateTotalFn(form)
                                        form.handleSubmit(onAutoSave)()
                                    }}
                                // disabled={!hasPermission(user, 'order', 'delete')}
                                >
                                    <Trash />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={header.length - 3}></TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>
                            <NumberField
                                value={total}
                                formatOptions={{
                                    style: "currency",
                                    currency: "BRL"
                                }}
                                className="text-yellow-600 font-bold"
                            >
                                <InputAria className={"outline-none"} />
                            </NumberField>
                        </TableCell>
                        <TableCell>
                            <Button
                                onClick={() => {
                                    otherValues.append({ name: '', price: 0 })
                                    form.handleSubmit(onAutoSave)()
                                }}
                                variant="link"
                            >
                                Novo
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )
}

const PanelConfig = ({ form, onAutoSave }: FormProps<UpsertOrderSchema>) => {
    const { user, hasPermission } = useAuth()
    const { push } = useRouter()

    const { mutateAsync: deleteOrderFn } = useMutation({
        mutationFn: (id: number) => deleteOrder(id),
        onSuccess: () => {
            push('/order')
        },
    })

    return (
        <>
            <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Titulo</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                onBlur={(e) => {
                                    field.onChange(e.target.value)
                                    form.handleSubmit(onAutoSave)()
                                }}
                            />
                        </FormControl>
                        <FormDescription>
                            Título da ordem, ex: "Ordem de serviço #123"
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="flex justify-between p-12 rounded-lg bg-destructive/50">
                <div className="flex flex-col">
                    <Label>Excluir ordem?</Label>
                    <span>Tem certeza que deseja fazer isso? Isso é irreversível</span>
                </div>
                {!!user && <Button
                    disabled={!hasPermission(user, 'order', 'delete')}
                    size={"icon"}
                    variant={"destructive"}
                    onClick={() => deleteOrderFn(form.getValues('id') ?? 0)}
                >
                    <Trash />
                </Button>}
            </div>
        </>
    )
}