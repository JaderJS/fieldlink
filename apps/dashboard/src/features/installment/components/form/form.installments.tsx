'use client'

import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { usePeriods } from "@/features/period/hooks/usePeriods"
import { Archive, CalendarIcon, Trash } from "lucide-react"
import { NumberField, Input as InputAria } from "react-aria-components"
import { ArrayPath, FieldArray, FieldValues, Path, UseFieldArrayReturn, UseFormReturn } from "react-hook-form"
import { newInstallment } from "../../constants/new.installment"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { useBanks } from "@/features/bank/hooks/useBanks"
import { ViewArchives } from "@/features/archive/components/view.archives"
import { useArchives } from "@/features/archive/hooks/useArchives"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface FormInstallmentsProps<T extends FieldValues, K extends ArrayPath<T>> {
    form: UseFormReturn<T>
    formArray: UseFieldArrayReturn<T, K, "key">
    arrayName: K
    onSave: (data: T) => void
    onChange?: (data: T) => void
    isRoot?: boolean
    onChangeTitle?: (value: string) => void
}

export const FormInstallments = <
    T extends FieldValues,
    K extends ArrayPath<T>
>({ form, formArray, arrayName, onSave, onChange, onChangeTitle, isRoot = false }: FormInstallmentsProps<T, K>) => {

    const transactionId = form.getValues(`transaction.id` as Path<T>) || form.getValues(`id` as Path<T>)
    const { data: periods } = usePeriods()
    const { data: banks } = useBanks()
    const { data: archives } = useArchives({ filters: { transaction: { id: transactionId } } })

    const handleNewInstallment = () => {
        const newInstallment_ = {
            ...newInstallment({ periodId: periods?.at(0)?.id || -1, transactionId: form.getValues('transaction.id' as any) as number || -1 }),
        } as FieldArray<T, K>

        formArray.append(newInstallment_)
        handleChange()
        form.handleSubmit(onSave)()
    }

    const handleRemoveInstallment = (index: number) => {
        formArray.remove(index)
        handleChange()
        form.handleSubmit(onSave)()
    }

    const handleChange = () => {
        const values = form.getValues(`${arrayName}` as Path<T>)
        onChange?.(values)
    }

    const recalculateTotalFn = () => {

    }


    return (
        <>

            <div className="w-full flex flex-wrap gap-1">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant={"outline"}><Archive /></Button>
                    </SheetTrigger>
                    <SheetContent className="p-2">
                        <SheetHeader>
                            <SheetTitle>Arquivos</SheetTitle>
                            <SheetDescription>Visualizador de arquivos</SheetDescription>
                        </SheetHeader>
                        {archives && <ViewArchives archives={archives} transaction={{ id: transactionId }} />}
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button variant="outline">Close</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <FormField
                    control={form.control}
                    name={isRoot ? `title` : `transaction.title` as any}
                    render={({ field }) => (
                        <FormItem className="flex-1 min-w-fit">
                            <FormControl>
                                <Input
                                    {...field}
                                    onChange={(event) => {
                                        field.onChange(event.target.value)
                                        onChangeTitle?.(event.target.value)
                                    }}
                                    onBlur={() => {
                                        form.handleSubmit(onSave)()
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={isRoot ? `bankId` : `transaction.bankId` as any}
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                value={String(field.value)}
                                onValueChange={(value) => {
                                    field.onChange(value)
                                    form.handleSubmit(onSave)()
                                }}
                            >
                                <FormControl>
                                    <SelectTrigger className="bg-background">
                                        <SelectValue placeholder="Banco" />
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
                <FormField
                    control={form.control}
                    name={isRoot ? `type` : `transaction.type` as any}
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                value={String(field.value)}
                                onValueChange={(value) => {
                                    field.onChange(value)
                                    form.handleSubmit(onSave)()
                                }}
                            >
                                <FormControl>
                                    <SelectTrigger className="bg-background">
                                        <SelectValue placeholder="Tipo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value={"INPUT"}>Entrada</SelectItem>
                                    <SelectItem value={"OUTPUT"}>Saída</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Pago</TableHead>
                        <TableHead>Período</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Ações</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {formArray.fields.map((installment, index) => (
                        <TableRow key={installment.key}>
                            {/* Index */}
                            <TableCell>{index + 1}</TableCell>

                            {/* Valor */}
                            <TableCell>
                                <FormField
                                    name={`${arrayName}.${index}.value` as any}
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
                                                    formatOptions={{ style: 'currency', currency: 'BRL' }}
                                                >
                                                    <InputAria className={"mt-2 w-auto outline-none"} />
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
                                    name={`${arrayName}.${index}.status` as any}
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
                                                    <SelectTrigger className="bg-background">
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="PENDING">Pendente</SelectItem>
                                                    <SelectItem value="PAID">Pago</SelectItem>
                                                    <SelectItem value="PARTIAL">Parcial</SelectItem>
                                                    <SelectItem value="CANCELLED">Cancelado</SelectItem>
                                                    <SelectItem value="REFUNDED">Estornado</SelectItem>
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
                                    name={`${arrayName}.${index}.billed` as any}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={(value) => {
                                                        field.onChange(value)
                                                        form.handleSubmit(onSave)()
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>

                            {/* Period */}
                            <TableCell>
                                <FormField
                                    name={`${arrayName}.${index}.periodId` as any}
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
                                                    <SelectTrigger className="bg-background">
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
                            </TableCell>

                            {/* Data */}
                            <TableCell>
                                <FormField
                                    name={`${arrayName}.${index}.dueAt` as any}
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-fit pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "P", { locale: ptBR })
                                                            ) : (
                                                                <span>Data</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        locale={ptBR}
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(value) => {
                                                            field.onChange(value)
                                                            form.handleSubmit(onSave)()
                                                        }}
                                                        defaultMonth={field.value ?? new Date()}
                                                        disabled={(date) =>
                                                            date < new Date("1900-01-01")
                                                        }
                                                        endMonth={new Date(new Date().getFullYear() + 3, 11, 31)}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </TableCell>

                            <TableCell>
                                <Button className="text-muted-foreground" variant={"ghost"} size="icon" onClick={() => handleRemoveInstallment(index)}>
                                    <Trash />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={6}></TableCell>
                        <TableCell>
                            <Button
                                size={"sm"}
                                variant={"link"}
                                onClick={handleNewInstallment}
                            >
                                Novo</Button>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )
}
