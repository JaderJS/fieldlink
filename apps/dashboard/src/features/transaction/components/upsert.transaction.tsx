'use client'

import { KEYS } from "@/core/keys"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useAuth } from "@/providers/auth"
import { useEffect, useMemo, useRef } from "react"
import debounce from "lodash.debounce"
import { getBanks } from "@/features/adm/services/bank.crud"
import { getPeriods } from "@/features/adm/services/period.crud"
import { upsertTransactionSchema, UpsertTransactionSchema } from "@/features/transaction/schemas/upsert.transaction.schema"
import { NumberField, Input as InputAria } from "react-aria-components"
import { getCompanies } from "@/features/company/services/company.crud"
import { useTransaction } from "@/features/transaction/hooks/use.transaction"
import { useUpsertTransaction } from "@/features/transaction/hooks/use.upsert.transaction"
import { DEFAULT_NEW_TRANSACTION } from "../constants/new.transaction"
import { FormInstallments } from "@/features/installment/components/form/form.installments"
import { EditorProvider } from "@/features/newEditor/providers/editor.provider"
import { EditorFloatingMenu, EditorFormatBold, EditorLinkSelector, EditorNodeHeading1, EditorNodeTable, } from "@/features/newEditor/components/floating.menu"
import { EditorBubbleMenu, EditorNodeText } from "@/features/newEditor/components/bubble.menu"
import { EditorSelector } from "@/features/newEditor/components/selector"
import { EditorTableColumnAfter, EditorTableColumnBefore, EditorTableColumnDelete, EditorTableColumnMenu, EditorTableDelete, EditorTableFix, EditorTableGlobalMenu, EditorTableHeaderColumnToggle, EditorTableHeaderRowToggle, EditorTableMenu, EditorTableMergeCells, EditorTableRowAfter, EditorTableRowBefore, EditorTableRowDelete, EditorTableRowMenu, EditorTableSplitCell } from "@/features/newEditor/components/table/table"
import { Editor } from "@tiptap/core"
import { ViewArchives } from "@/features/archive/components/view.archives"
import { useArchives } from "@/features/archive/hooks/useArchives"
import { Transaction } from "../types"
import { useBanks } from "@/features/bank/hooks/useBanks"
import { useCompanies } from "@/features/company/hooks/use.companies"
import { usePeriods } from "@/features/period/hooks/usePeriods"
import { Item, ItemActions, ItemContent, ItemMedia, ItemTitle } from "@/components/ui/item"
import { ChevronRightIcon, Pickaxe, ShoppingBag } from "lucide-react"

export const UpsertTransaction = ({ transaction }: { transaction?: Pick<Transaction, "id"> }) => {

    const { hasPermission, user } = useAuth()

    const { data } = useTransaction({ transaction: { id: transaction?.id ?? -1 } })
    const { mutate: upsertTransactionFn } = useUpsertTransaction()

    const form = useForm<UpsertTransactionSchema>({
        resolver: zodResolver(upsertTransactionSchema),
        defaultValues: !!transaction?.id && !!data ? {
            id: transaction.id,
            title: data.title,
            hasNotify: data.hasNotify,
            hasNfe: data.hasNfe,
            bankId: data.bank.id,
            companyId: 1,
            total: data.total,
            type: data.type,
            installments: data.installments.map((installment) => ({
                id: installment.id,
                value: installment.value,
                billed: installment.billed,
                dueAt: new Date(installment.dueAt),
                installmentsNumber: installment.installmentsNumber,
                paymentMethod: installment.paymentMethod,
                transactionId: installment.transactionId,
                paidAt: installment.paidAt ? new Date(installment.paidAt) : undefined,
                status: installment.status,
                periodId: installment.periodId
            }))
        } : DEFAULT_NEW_TRANSACTION
    })

    const submit = (data: UpsertTransactionSchema) => {
        if (!!user && !hasPermission(user, 'transactions', 'create')) {
            toast.error("Você não tem permissão para isso")
        }
        const promise = upsertTransactionFn(data)
    }

    useEffect(() => {
        console.log(form.formState.errors)
    }, [form.formState.errors])

    const handleSubmit = useRef(debounce(submit, 3000))

    return (
        <div className="grid grid-cols-1 gap-3 ">
            <Form {...form}>
                <UpsertFormTransactions form={form} onSave={handleSubmit.current} transaction={data} />
            </Form>
        </div>

    )
}

const UpsertFormTransactions = ({ form, onSave, transaction }: { form: UseFormReturn<UpsertTransactionSchema>, onSave: (data: any) => void, transaction?: Transaction }) => {

    const { data: banks } = useBanks()
    const { data: companies } = useCompanies()
    const formArray = useFieldArray({ control: form.control, name: 'installments', keyName: 'key' })

    const handleContent = ({ editor }: { editor: Editor }) => {
        form.setValue("content", editor.getJSON())
        form.handleSubmit(onSave)()
    }

    console.log(transaction)
    return (
        <>
            <div className="flex flex-wrap">
                <div className="flex flex-auto flex-col p-2 space-y-3">
                    <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-col items-center justify-center">
                                <FormControl>
                                    <Input
                                        placeholder="Titulo"
                                        {...field}
                                        onBlur={() => {
                                            field.onBlur()
                                            form.handleSubmit(onSave)()
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="total"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <NumberField
                                        {...field}
                                        onChange={(value) => {
                                            field.onChange(value)
                                            form.handleSubmit(onSave)()
                                        }}
                                        formatOptions={{
                                            style: 'currency',
                                            currency: 'BRL',
                                        }}
                                    >
                                        <InputAria className={"text-sm h-8 px-3 w-full border rounded  shadow-xs  outline-none"} />
                                    </NumberField>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-x-2">
                        <FormField
                            name="bankId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full flex flex-col items-center justify-center">
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                            form.handleSubmit(onSave)()
                                        }}
                                        value={String(field.value)}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="selecione o tipo do equipamento..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {banks?.map((bank) => (
                                                <SelectItem key={bank.id} value={`${bank.id}`}>{bank.name}</SelectItem>
                                            ))}
                                            {banks?.length === 0 && <p className="text-sm p-2">Nenhum banco encontrado</p>}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="companyId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full flex flex-col items-center justify-center">
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                            form.handleSubmit(onSave)()
                                        }}
                                        value={String(field.value)}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="selecione o tipo do equipamento..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {companies?.map((company) => (
                                                <SelectItem key={company.id} value={`${company.id}`}>{company.name}</SelectItem>
                                            ))}
                                            {companies?.length === 0 && <p className="text-sm p-2">Nenhum banco encontrado</p>}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>


                    <div className="flex gap-x-2">
                        <FormField
                            name="type"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full flex flex-col items-center justify-center">
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                            form.handleSubmit(onSave)()
                                        }}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                className={cn(
                                                    "text-white",
                                                    field.value === 'INPUT' ? "bg-emerald-500" : "bg-red-500"
                                                )}
                                            >
                                                <SelectValue placeholder="selecione o tipo de transação..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="INPUT">Entrada</SelectItem>
                                            <SelectItem value="OUTPUT">Saída</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        name="hasNfe"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
                                <div className="space-y-0.5">
                                    <FormLabel>Emitir Nfe?</FormLabel>
                                    <FormDescription>
                                        Emitir nota fiscal, contabiliza o valor na companhia
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={(value) => {
                                            field.onChange(value)
                                            form.handleSubmit(onSave)()
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="hasNotify"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
                                <div className="space-y-0.5">
                                    <FormLabel>Me notificar?</FormLabel>
                                    <FormDescription>
                                        Envie uma notificação para sua agenda
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={(value) => {
                                            field.onChange(value)
                                            form.handleSubmit(onSave)()
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {!!transaction?.order && <Item variant="outline" size="sm" asChild>
                        <a href={`/order/${transaction.order.id}`}>
                            <ItemMedia>
                                <Pickaxe className="size-5" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{transaction.order.title}</ItemTitle>
                            </ItemContent>
                            <ItemActions>
                                <ChevronRightIcon className="size-4" />
                            </ItemActions>
                        </a>
                    </Item>}

                    {!!transaction?.cart && <Item variant="outline" size="sm" asChild>
                        <a href={`/cart/${transaction.cart.id}`}>
                            <ItemMedia>
                                <ShoppingBag className="size-5" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{transaction.cart.title}</ItemTitle>
                            </ItemContent>
                            <ItemActions>
                                <ChevronRightIcon className="size-4" />
                            </ItemActions>
                        </a>
                    </Item>}

                </div>
                <div className="flex flex-col items-start overflow-x-auto p-2">
                    <FormInstallments form={form} onSave={onSave} formArray={formArray} arrayName="installments" isRoot />
                </div>

                <div className="flex w-full h-32 p-2">
                    <EditorProvider
                        className="h-full w-full overflow-y-auto rounded-lg border bg-background p-4 text-muted-foreground"
                        onUpdate={handleContent}
                        content={form.getValues("content") ?? "Adicione algo aqui"}
                    >
                        <EditorFloatingMenu>
                            <EditorNodeHeading1 hideName />
                            <EditorNodeTable hideName />
                            <EditorFormatBold hideName />
                        </EditorFloatingMenu>
                        <EditorBubbleMenu>
                            <EditorSelector title="text">
                                <EditorNodeText />
                                <EditorNodeHeading1 />
                            </EditorSelector>
                            <EditorLinkSelector />
                        </EditorBubbleMenu>
                        <EditorTableMenu>
                            <EditorTableColumnMenu>
                                <EditorTableColumnBefore />
                                <EditorTableColumnAfter />
                                <EditorTableColumnDelete />
                            </EditorTableColumnMenu>
                            <EditorTableRowMenu>
                                <EditorTableRowBefore />
                                <EditorTableRowAfter />
                                <EditorTableRowDelete />
                            </EditorTableRowMenu>
                            <EditorTableGlobalMenu>
                                <EditorTableHeaderColumnToggle />
                                <EditorTableHeaderRowToggle />
                                <EditorTableDelete />
                                <EditorTableMergeCells />
                                <EditorTableSplitCell />
                                <EditorTableFix />
                            </EditorTableGlobalMenu>
                        </EditorTableMenu>
                    </EditorProvider>
                </div>
            </div>
        </>
    )
}



