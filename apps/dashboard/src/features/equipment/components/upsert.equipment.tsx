'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, UseFormReturn } from "react-hook-form"
import { UpsertEquipmentSchema, upsertEquipmentSchema } from "../schemas/upsert.equipment.schema"
import { Input } from "@/components/ui/input"
import { useEquipment } from "../hooks/use.equipment"
import { Equipment } from "../types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProducts } from "@/features/products"
import { Button } from "@/components/ui/button"
import { useUpsertEquipment } from "../hooks/use.upsert.quipment"

export const UpsertEquipment = ({ equipment }: { equipment: Pick<Equipment, "id"> }) => {

    const { data } = useEquipment({ equipment })
    const { mutateAsync: upsertEquipmentFn } = useUpsertEquipment()
    
    const form = useForm<UpsertEquipmentSchema>({
        resolver: zodResolver(upsertEquipmentSchema),
        defaultValues: data
    })

    const submit = (data: UpsertEquipmentSchema) => {
        upsertEquipmentFn(data)
    }

    return (
        <>
            <Form {...form}>
                <FormUpsertEquipment form={form} />
                <Button
                    variant={"submit"}
                    onClick={form.handleSubmit(submit)}
                >
                    Salvar
                </Button>
            </Form>
        </>
    )

}

const FormUpsertEquipment = ({ form }: { form: UseFormReturn<UpsertEquipmentSchema> }) => {

    const { data: products } = useProducts()

    return (
        <>
            <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Identificador</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormDescription>Esse identificador é comumente conhecido como id e deve ser único para cada rádio quando se deseja identifica-lo na rede</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="nickname"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Apelido</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormDescription>Dê um apelido para encontrar o rádio mais facilmente</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="sn"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Numero de serial (SN)</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormDescription>Informe o numero de serial, ele deve ser único para cada rádio</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="productId"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Equipamento</FormLabel>
                        <Select
                            value={String(field.value)}
                            onValueChange={(value) => {
                                field.onChange(value)
                            }}
                        >
                            <SelectTrigger
                                // id={id}
                                className="h-auto ps-2 text-left [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
                            >
                                <SelectValue placeholder="Choose a plan" />
                            </SelectTrigger>
                            <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                                {products?.map((product) => (
                                    <SelectItem key={product.id} value={String(product.id)}>
                                        <span className="flex items-center gap-2">
                                            <img
                                                className="rounded-full"
                                                src={product.pictureUrl}
                                                alt={product.name}
                                                width={40}
                                                height={40}
                                            />
                                            <span>
                                                <span className="block font-medium">{product.name}</span>
                                                <span className="text-muted-foreground mt-0.5 block text-xs">
                                                    {product.group}
                                                </span>
                                            </span>
                                        </span>
                                    </SelectItem>
                                ))}

                            </SelectContent>
                        </Select>
                        <FormDescription>Selecione o equipamento que faz jus ao cadastro</FormDescription>
                    </FormItem>
                )}
            />
        </>
    )
}