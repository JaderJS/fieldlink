'use client'

import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { KEYS } from "@/core/keys"
import { PreviewAndImageUploader } from "@/components/global/preview.uploader.image"
import MultipleSelector from "@/components/ui/multiselect"
import { NumberField, Input as InputAria } from "react-aria-components"
import debounce from "lodash.debounce"
import { toast } from "sonner"
import { useUpsertProduct } from "../hooks/use.upsert.product"
import { useProduct } from "../hooks/use.product"
import { defaultNewProduct } from "../constants/default.product"
import { upsertProductSchema, UpsertProductSchema } from "../schema/schema.product"
import { useProductCategories } from "@/features/product.category/hooks/use.product.categories"
import { Product } from "../types"

interface UpsertProductProps {
    product?: ProductWithOptionalOrder
}

export const UpsertProduct = ({ product }: UpsertProductProps) => {

    const { data } = useProduct({ product: { id: product?.id ?? -1 }, initialData: product as unknown as Product })

    const { mutateAsync: upsertProductFn } = useUpsertProduct()

    const form = useForm<UpsertProductSchema>({
        resolver: zodResolver(upsertProductSchema),
        defaultValues: !!data ? { ...data, categoriesIds: data.categories.map(c => (c.id)) } : defaultNewProduct()
    })

    const submit = (data: UpsertProductSchema) => {
        upsertProductFn(data)
    }

    const submitWithDebounce = debounce(submit, 1000)

    return (
        <>
            <Form {...form}>
                <FormUpsertProduct
                    form={form}
                    onAutoSave={submitWithDebounce}
                />
            </Form>
        </>
    )
}

const FormUpsertProduct = ({ form, onAutoSave }: { form: UseFormReturn<UpsertProductSchema>, onAutoSave: (data: UpsertProductSchema) => void }) => {

    const { data: categories } = useProductCategories()

    return (
        <section className="grid grid-cols-1">
            <FormField
                name="pictureUrl"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <PreviewAndImageUploader
                                src={field.value}
                                onUpdate={(pathUrl) => {
                                    field.onChange(pathUrl)
                                    form.handleSubmit(onAutoSave)()
                                }} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="categoriesIds"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Categorias</FormLabel>
                        <FormControl>
                            <MultipleSelector
                                placeholder="Selecione uma ou mais categorias"
                                commandProps={{ label: "Selecione uma ou mais categorias" }}
                                value={categories?.filter(({ id }) => field.value?.includes(id)).map(({ id, name }) => ({ label: name, value: String(id) }))}
                                options={categories?.map(({ id, name }) => ({ label: name, value: String(id) }))}
                                emptyIndicator={<p className="text-center text-sm">Sem resultados</p>}
                                hidePlaceholderWhenSelected
                                onChange={(options) => {
                                    field.onChange(options.map(({ value }) => Number(value)))
                                    form.handleSubmit(onAutoSave)()
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome para o produto</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type="text"
                                placeholder="Nome do produto"
                                onBlur={() => {
                                    form.handleSubmit(onAutoSave)()
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type="text"
                                placeholder="Nome do produto"
                                onBlur={() => {
                                    form.handleSubmit(onAutoSave)()
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Preço de venda</FormLabel>
                        <FormControl>
                            <NumberField
                                {...field}
                                onChange={(value) => {
                                    field.onChange(value)
                                    form.handleSubmit(onAutoSave)()
                                }}
                                formatOptions={{ currency: "BRL", style: "currency" }}
                            >
                                <InputAria className={"text-sm w-full p-2 border rounded-sm"} />
                            </NumberField>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                name="cost"
                control={form.control}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Preço de custo</FormLabel>
                        <FormControl>
                            <NumberField
                                {...field}
                                onChange={(value) => {
                                    field.onChange(value)
                                    form.handleSubmit(onAutoSave)()
                                }}
                                formatOptions={{ currency: "BRL", style: "currency" }}
                            >
                                <InputAria className={"text-sm w-full p-2 border rounded-md"} />
                            </NumberField>
                        </FormControl>
                    </FormItem>
                )}
            />
        </section>
    )
}