'use client'

import { useForm, UseFormReturn } from "react-hook-form"
import { upsertProductSchema, UpsertProductSchema } from "../schema/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductById, getProducts, upsertProduct } from "../services/crud"
import { KEYS } from "@/core/keys"
import { PreviewAndImageUploader } from "@/components/global/preview.uploader.image"
import { getCategories } from "../services/category.crud"
import MultipleSelector from "@/components/ui/multiselect"
import { DEFAULT_NEW_PRODUCT } from "../constants/new.product"
import { NumberField, Input as InputAria } from "react-aria-components"
import debounce from "lodash.debounce"
import { toast } from "sonner"
import { useRef } from "react"

interface UpsertProductProps {
    product?: Product
}

export const UpsertProduct = ({ product }: UpsertProductProps) => {
    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: KEYS.product.getById({ id: product?.id ?? 0 }),
        queryFn: () => getProductById(product?.id ?? 0),
        select: data => data.product,
        initialData: { product }
    })

    const { mutateAsync: upsertProductFn } = useMutation({
        mutationFn: upsertProduct,
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: KEYS.product.getAll() })
            form.setValue("id", res.product.id)
        }
    })

    const form = useForm<UpsertProductSchema>({
        resolver: zodResolver(upsertProductSchema),
        defaultValues: !!data ? {
            ...data,
            categoriesIds: data.categories.map(c => (c.id))
        } : DEFAULT_NEW_PRODUCT
    })

    const submit = (data: UpsertProductSchema) => {
        const promise = upsertProductFn(data)
        toast.promise(promise, { loading: "Salvando...", success: "Produto atualizado!" })
    }
    const handleSubmitWithDebounce = useRef(debounce(submit, 3000))

    return (
        <>
            <Form {...form}>
                <FormUpsertProduct
                    form={form}
                    onAutoSave={handleSubmitWithDebounce.current}
                />
            </Form>
        </>
    )
}

const FormUpsertProduct = ({ form, onAutoSave }: { form: UseFormReturn<UpsertProductSchema>, onAutoSave: (data: UpsertProductSchema) => void }) => {

    const { data: categories } = useQuery({
        queryKey: KEYS.productCategories.getAll(),
        queryFn: getCategories,
        select: data => data.categories,
    })

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
                    <FormItem className="*:not-first:mt-2">
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