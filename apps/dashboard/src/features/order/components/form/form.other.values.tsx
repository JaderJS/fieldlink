'use client'

import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BadgeQuestionMark, ChevronRightIcon, CircleQuestionMark, ShoppingBag, Trash } from "lucide-react"
import { NumberField, Input as InputAria } from "react-aria-components"
import { FieldArrayWithId, FieldValues, Path, UseFormReturn, ArrayPath, UseFieldArrayReturn } from "react-hook-form"
import { recalculateTotalFn } from "../../helpers/calc"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"

interface FormProps<T extends FieldValues> {
    form: UseFormReturn<T>
    formArray: UseFieldArrayReturn<T, ArrayPath<T>, "key">
    arrayName: ArrayPath<T>
    workIndex: number
    onAutoSave: (data: T) => void
    className?: string
}

export const FormOtherValues = <T extends FieldValues,>({ form, formArray, arrayName, workIndex, onAutoSave }: FormProps<T>) => {

    const handleNewOtherValue = () => {
        formArray.append({ name: "Novo item", price: 0 } as any)
    }

    if (formArray.fields.length === 0) {
        return (
            <Item variant={"outline"} asChild>
                <Button className="h-full" onClick={handleNewOtherValue} variant={"ghost"} role="tree">
                    <ItemMedia>
                        <BadgeQuestionMark className="size-5"/>
                    </ItemMedia>
                    <ItemContent className="flex justify-start items-start">
                        <ItemTitle>Outros valores?</ItemTitle>
                        <ItemDescription>Adicione outros valores a vinculados a esse serviço em especifico</ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <ChevronRightIcon className="size-4" />
                    </ItemActions>
                </Button>
            </Item>
        )
    }


    return (
        <>
            <FormField
                name={`${arrayName}` as Path<T>}
                control={form.control}
                render={() => (
                    <FormItem>
                        <FormControl>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Descrição</TableHead>
                                        <TableHead>Valor</TableHead>
                                        <TableHead>Opções</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {formArray.fields.map((item, index) => (
                                        <TableRow key={item.key}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <FormField
                                                    name={`${arrayName}.${index}.name` as Path<T>}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem className="">
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
                                                    name={`${arrayName}.${index}.price` as Path<T>}
                                                    control={form.control}
                                                    render={({ field }) => (
                                                        <FormItem className="max-w-14">
                                                            <FormControl>
                                                                <NumberField
                                                                    {...field}
                                                                    onChange={(value) => {
                                                                        field.onChange(value)
                                                                        recalculateTotalFn(form as any, { workIndex })
                                                                        form.handleSubmit(onAutoSave)()
                                                                    }}
                                                                    formatOptions={{ currency: "BRL", style: "currency" }}
                                                                >
                                                                    <InputAria className={"outline-none mt-2"} />
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
                                                    onClick={() => {
                                                        formArray.remove(index)
                                                        recalculateTotalFn(form as any)
                                                        form.handleSubmit(onAutoSave)()
                                                    }}>
                                                    <Trash />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={3} />
                                        <TableCell>
                                            <Button variant={"link"} size={"sm"} onClick={handleNewOtherValue}>Novo</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    )
}