'use client'

import { KEYS } from "@/core/keys"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { useForm, UseFormReturn } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { InputCalendar } from "@/components/global/calendar"
import { Button } from "@/components/ui/button"
import { Editor } from "@/features/editor"
import { Input as InputAria } from "react-aria-components"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useAuth } from "@/providers/auth"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CalendarIcon, Check, Coins, Currency, Pyramid } from "lucide-react"
import { formatToBRL } from "@/functions/utils"
import { useMemo } from "react"
import debounce from "lodash.debounce"
import { getBanks } from "@/features/adm/services/bank.crud"
import { getPeriods } from "@/features/adm/services/period.crud"
import { upsertTransactionSchema, UpsertTransactionSchema } from "../../schemas/transaction.schema"
import { DEFAULT_CONTENT_IN_TRANSACTION, DEFAULT_NEW_TRANSACTION } from "../../constants/transaction.default"
import { getTransactionById, upsertTransaction } from "../../services/transaction.crud"
import { getCompanies } from "../../../company/services/company.crud"
import { getArchives } from "@/features/archive/service/archive.service"
import { NumberField } from "react-aria-components"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, formatDistanceToNow } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { ptBR } from "date-fns/locale"
import { ViewArchives } from "@/features/archive/components/view.archives"
import { SelectLinkTransactions } from "./assets/select.link.transactions"
import { Transaction } from "@/features/transaction/types"

const UpsertTransactions = ({ transaction }: { transaction?: Pick<Transaction, "id"> }) => {

    const { hasPermission, user } = useAuth()
    const queryClient = useQueryClient()
    const { data } = useSuspenseQuery({
        queryKey: KEYS.transaction.getById(transaction?.id ?? 0),
        queryFn: getTransactionById,
        select: data => data.transaction
    })

    const { mutateAsync: upsertTransactionFn } = useMutation({
        mutationFn: upsertTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.transaction.getById(transaction?.id ?? 0) })
        }
    })

    const form = useForm<UpsertTransactionSchema>({
        resolver: zodResolver(upsertTransactionSchema),
        // defaultValues: !!transaction ? {
        //     id: data?.id,
        //     title: data?.title,
        //     description: data?.description || "",
        //     hasNfe: data?.hasNfe,
        //     bankId: data?.bank.id,
        //     companyId: 1,
        //     fromAt: data?.fromAt,
        //     content: data?.content,
        //     type: data?.type,
        //     value: data?.value,
        //     billed: data?.billed,
        //     periodId: data?.period.id,
        //     hasNotify: data?.hasNotify,
        // } : DEFAULT_NEW_TRANSACTION
    })

    const submit = (data: UpsertTransactionSchema) => {
        if (!!user && !hasPermission(user, 'transactions', 'create')) {
            toast.error("Você não tem permissão para isso")
        }

        const promise = upsertTransactionFn(data)
        toast.promise(promise, { loading: 'Salvando alterações' })
    }

    const handleSubmitWithDebounce = useMemo(() => debounce(submit, 1000), [])

    return (
        <div className="grid grid-cols-1 gap-3 ">
            <Form {...form}>
                <></>
                {/* <UpsertFormTransactions transaction={data} form={form} onSave={handleSubmitWithDebounce} /> */}
            </Form>
        </div>

    )
}

const UpsertFormTransactions = ({ transaction, form, onSave }: { transaction: Transaction, form: UseFormReturn<UpsertTransactionSchema>, onSave: (data: any) => void }) => {

    const { data: banks } = useQuery({
        queryKey: KEYS.bank.getAll(),
        queryFn: getBanks,
        select: data => data.banks
    })
    const { data: companies } = useQuery({
        queryKey: KEYS.company.getAll(),
        queryFn: getCompanies,
        select: data => data.companies
    })
    const { data: periods } = useQuery({
        queryKey: KEYS.period.getAll(),
        queryFn: getPeriods,
        select: data => data.periods,
    })

    const { data: archives } = useQuery({
        queryKey: KEYS.archive.getAll({ transaction: { id: transaction.id } }),
        queryFn: getArchives,
        select: data => data.archives
    })

    return (
        <>
            <div className="flex flex-wrap">
                <div className="flex flex-auto flex-col p-4 space-y-3">
                    <FormField
                        name="title"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-col items-center justify-center">
                                <FormLabel>Titulo</FormLabel>
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
                                        value={String(field.value)}
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                            form.handleSubmit(onSave)()
                                        }}
                                    >
                                        <FormControl>
                                            <SelectTrigger
                                                className={cn(
                                                    "text-white",
                                                    field.value === 'INPUT' ? "bg-emerald-400" : "bg-red-400"
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
                        <FormField
                            name="value"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full flex flex-col items-center justify-center">
                                    <FormControl>
                                        <NumberField
                                            value={field.value}
                                            onChange={(value) => {
                                                field.onChange(value)
                                                form.handleSubmit(onSave)()
                                            }}
                                            formatOptions={{ currency: "BRL", style: 'currency' }}
                                        >
                                            <InputAria className={"text-xl text-yellow-600 outline-none"} />
                                        </NumberField>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-col items-center justify-center">
                                <FormControl>
                                    <Textarea
                                        rows={3}
                                        {...field}
                                        placeholder="Descrição"
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                            form.handleSubmit(onSave)()
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        name="billed"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
                                <div className="space-y-0.5">
                                    <FormLabel>Faturado?</FormLabel>
                                    <FormDescription>
                                        A transação só é contabilizada quando faturada
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
                                    <FormLabel>Notificação</FormLabel>
                                    <FormDescription>
                                        Deseja marcar em sua agenda esse evento?
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
                        name='fromAt'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Data transação</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP", { locale: ptBR })
                                                ) : (
                                                    <span>Selecione uma data para a transação</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date("1900-01-01")
                                            }
                                            captionLayout="dropdown"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='periodId'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex flex-col pt-3">
                                <FormLabel>Período</FormLabel>
                                <Select
                                    value={String(field.value)}
                                    onValueChange={field.onChange}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Período" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {periods?.map(({ id, name }) => (
                                            <SelectItem key={id} value={`${id}`}>{name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col border rounded p-2 gap-1">
                        {/* {transaction && <ViewGroupTransactions transaction={transaction} />} */}
                        <SelectLinkTransactions
                            transaction={transaction}
                            onSelect={console.log}
                        />
                    </div>

                </div>

                <div className="flex flex-col flex-auto p-4 flex-wrap">
                    {Array.isArray(archives) && (
                        <ViewArchives
                            transaction={transaction}
                            archives={archives}
                        />
                    )}

                    <FormField
                        name="content"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="text-muted-foreground border rounded-lg p-6 flex-auto min-h-80">
                                <FormControl>
                                    <Editor
                                        content={field.value}
                                        onCallback={(value) => {
                                            field.onChange(value)
                                            form.handleSubmit(onSave)()
                                        }}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

            </div>
        </>
    )
}

// const ViewGroupTransactions = ({ transaction }: { transaction: Transaction }) => {

//     if (transaction.group.length === 0) {
//         return (
//             <></>
//         )
//     }
//     return (
//         <>
//             <div className="grid grid-cols-2 gap-1">
//                 {transaction.group.map(({ id, value, billed, fromAt, period }, index) => (
//                     <Button
//                         key={id}
//                         className={cn("flex p-2", billed && "bg-emerald-300")}
//                         variant="outline"
//                         asChild
//                     >
//                         <Link href={`/adm/transaction/${id}`}>
//                             {billed ? <Check /> : <Coins />}
//                             <span>{formatToBRL(value)}</span>
//                             {!billed && <span>{period.name}</span>}
//                             {!billed && <span className="text-xs">{format(new Date(), "PP", { locale: ptBR })}</span>}
//                             <span>{transaction.group.length - (index)}/{transaction.group.length}</span>
//                         </Link>
//                     </Button>
//                 ))}
//             </div>
//         </>
//     )
// }

export { UpsertTransactions }