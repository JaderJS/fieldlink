'use client'
import { UseFormReturn, FieldValues, useFieldArray, Path } from "react-hook-form"
import { UpsertOrderSchema } from "../../schema/upsert.schema"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { usePeriods } from "@/features/period/hooks/usePeriods"
import { Input } from "@/components/ui/input"
import { useBanks } from "@/features/bank/hooks/useBanks"
import { NumberField, Input as InputAria } from "react-aria-components"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, MoreHorizontal, Trash } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { DEFAULT_NEW_INSTALLMENT, newInstallment } from "@/features/installment/constants/new.installment"

interface FormInstallmentsProps<T extends FieldValues> {
    form: UseFormReturn<T>
    path?: string
    onSave: (data: any) => void
    totalFn?: () => void
}

export const FormInstallments = ({ form, path, onSave, totalFn }: FormInstallmentsProps<UpsertOrderSchema>) => {

    const { fields, append, remove } = useFieldArray({ control: form.control, name: 'transaction.installments' })

    const { data: periods } = usePeriods()
    const { data: banks } = useBanks()

    const recalculateTotalFn = () => {
        totalFn?.()
    }

    const handleNewInstallment = () => {
        if (!Array.isArray(periods) || !Array.isArray(banks)) return
        const transactionId = form.getValues("transaction.id")
        if (!transactionId) return

        append(newInstallment({ periodId: periods.at(0)?.id!, transactionId }))
    }

    return (
        <section className="flex flex-col overflow-x-auto lg:p-2 p-1 w-full">
            <div className="flex flex-col space-y-1 w-full">
                <FormField
                    name="transaction.title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    onChange={(value) => {
                                        field.onChange(value)
                                        form.handleSubmit(onSave)()
                                    }}
                                    placeholder="Titulo"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-1">
                    <FormField
                        name="transaction.type"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    value={String(field.value)}
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                        recalculateTotalFn()
                                        form.handleSubmit(onSave)()
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Período" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={"INPUT"}>Entrada</SelectItem>
                                        <SelectItem value={"OUTPUT"}>Saida</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name={`transaction.bankId`}
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <Select
                                    value={String(field.value)}
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                        recalculateTotalFn()
                                        form.handleSubmit(onSave)()
                                    }}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Período" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {banks?.map((bank) => (
                                            <SelectItem key={bank.id} value={String(bank.id)}>{bank.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

            </div>
            <Separator className="my-2" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Período</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Faturado</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {fields.map((installment, index) => (
                        <TableRow key={installment.id}>

                            {/* Index */}
                            <TableCell>{index + 1}</TableCell>

                            {/* Period */}
                            <TableCell>
                                <FormField
                                    name={`transaction.installments.${index}.periodId`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                value={String(field.value)}
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                    recalculateTotalFn()
                                                    form.handleSubmit(onSave)()
                                                }}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Período" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {periods?.map((period) => (
                                                        <SelectItem key={period.id} value={String(period.id)}>{period.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>

                            {/* Value */}
                            <TableCell>
                                <FormField
                                    name={`transaction.installments.${index}.value`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <NumberField
                                                    {...field}
                                                    onChange={(value) => {
                                                        field.onChange(value)
                                                        recalculateTotalFn()
                                                        form.handleSubmit(onSave)()
                                                    }}
                                                    formatOptions={{ currency: "BRL", style: "currency" }}
                                                >
                                                    <InputAria className={"mt-2"}/>
                                                </NumberField>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>

                            {/* Status */}
                            <TableCell>
                                <FormField
                                    name={`transaction.installments.${index}.status`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                value={String(field.value)}
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                    recalculateTotalFn()
                                                    form.handleSubmit(onSave)()
                                                }}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value={"PAID"}>Pago</SelectItem>
                                                    <SelectItem value={"PENDING"}>PENDENTE</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>

                            {/* Billed */}
                            <TableCell>
                                <FormField
                                    name={`transaction.installments.${index}.billed`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={(value) => {
                                                        field.onChange(value)
                                                        recalculateTotalFn()
                                                        form.handleSubmit(onSave)()
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>

                            {/* Date */}
                            <TableCell>
                                <FormField
                                    name={`transaction.installments.${index}.dueAt`}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Popover>
                                                <FormControl>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-fit pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PP", { locale: ptBR })
                                                            ) : (
                                                                <span>Selecione uma data</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </PopoverTrigger>
                                                </FormControl>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(value) => {
                                                            field.onChange(value)
                                                            form.handleSubmit(onSave)()
                                                        }}
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
                            </TableCell>

                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem
                                            // disabled={!hasPermission(user, 'transactions', 'delete', transaction)}
                                            onClick={() => remove(index)}
                                        >
                                            <Trash /> Deletar?
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6} />
                        <TableCell>
                            <Button
                                variant={"link"}
                                size={"sm"}
                                onClick={handleNewInstallment}
                            >
                                Novo
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

        </section>
    )
}