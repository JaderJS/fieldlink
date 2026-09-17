'use client'

import { Button } from "@/components/ui/button"
import { BadgeQuestionMark, ChevronRightIcon, ShoppingBag, Trash } from "lucide-react"
import { ArrayPath, FieldValues, useFieldArray, UseFieldArrayReturn, UseFormReturn } from "react-hook-form"
import { SaleSchema, UpsertOrderSchema } from "../../schema/upsert.schema"
import { useAuth } from "@/providers/auth"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { NumberField, Input as InputAria } from "react-aria-components"
import { ActionItem, Header, HeaderSearch, MoreActions, ProviderProducts, SelectedProduct, useProducts, ViewProducts } from "@/features/products"
import { defaultNewSale } from "../../constants/new.order"
import { memo, useCallback, useMemo } from "react"
import { recalculateTotalFn } from "../../helpers/calc"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useIsMobile } from "@/hooks/use-mobile"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"

interface FormProps<T extends FieldValues> {
    form: UseFormReturn<T>
    onAutoSave: (data: T) => void
    index: number
    className?: string
}


export const FormSalesInWork = ({ form, onAutoSave, index: workIndex }: FormProps<UpsertOrderSchema>) => {
    const isMobile = useIsMobile()
    const { user, hasPermission } = useAuth()

    const sales = useFieldArray({ control: form.control, name: `works.${workIndex}.sales`, keyName: 'key' })

    const handleSelect = useCallback((products: SelectedProduct[] = [], index: number, saleId?: number) => {

        const total = products.reduce((acc, product) => {
            acc += (product.order?.price ?? 0) * (product?.order?.quantity ?? 1)
            return acc
        }, 0)

        const sale: SaleSchema = {
            id: saleId,
            total: total,
            content: {},
            productsOnSale: products.map(p => ({
                productId: p.id,
                saleId: saleId,
                price: p.order.price,
                quantity: p.order.quantity,
                product: p
            }))
        }
        form.setValue(`works.${workIndex}.sales.${index}`, sale)
        recalculateTotalFn(form, { workIndex: workIndex })
        form.handleSubmit(onAutoSave)()
    }, [])

    return (
        <>
            {sales.fields.length <= 0 && (
                <>
                    <Item variant={"outline"} asChild>
                        <Button className="h-full" onClick={() => sales.append(defaultNewSale())} variant={"ghost"} role="tree">
                            <ItemMedia>
                                <ShoppingBag className="size-5"/>
                            </ItemMedia>
                            <ItemContent className="flex justify-start items-start">
                                <ItemTitle>Produtos?</ItemTitle>
                                <ItemDescription>Adicione produtos utilizados ao trabalho que serão vinculados a esse serviço em especifico</ItemDescription>
                            </ItemContent>
                            <ItemActions>
                                <ChevronRightIcon className="size-4" />
                            </ItemActions>
                        </Button>
                    </Item>
                </>
            )}

            {sales.fields.map((sale, index_) => (
                <Card key={sale.key}>
                    <CardHeader>
                        <CardTitle />
                        <CardDescription />
                    </CardHeader>
                    <CardContent>
                        <FormField
                            name={`works.${workIndex}.sales.${index_}`}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <SaleProducts
                                            value={field.value.productsOnSale}
                                            onSelect={(products) => handleSelect(products, index_, sale.id)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        {!isMobile && <span className="text-sm text-muted-foreground">#{sale.id}</span>}
                        <FormField
                            control={form.control}
                            name={`works.${workIndex}.sales.${index_}.total`}
                            render={({ field }) => (
                                <FormItem className="flex gap-1 items-center">
                                    <FormLabel>Total parcial</FormLabel>
                                    <FormControl>
                                        <NumberField
                                            {...field}
                                            value={form.watch(`works.${workIndex}.sales.${index_}.total`)}
                                            onChange={(value) => {
                                                field.onChange(value)
                                                recalculateTotalFn(form, { workIndex: workIndex })
                                                form.handleSubmit(onAutoSave)()
                                            }}
                                            formatOptions={{
                                                currency: "BRL",
                                                style: "currency"
                                            }}
                                        >
                                            <InputAria className={"text-yellow-600 outline-none"} />
                                        </NumberField>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!!user && <Button
                            size={"icon"}
                            className="text-muted-foreground"
                            variant={"ghost"}
                            onClick={() => {
                                sales.remove(index_)
                                recalculateTotalFn(form, { workIndex: workIndex })
                                form.handleSubmit(onAutoSave)()
                            }}
                        // disabled={!hasPermission(user, 'order', 'delete')}
                        >
                            <Trash />
                        </Button>}
                    </CardFooter>

                </Card>
            ))}

        </>
    )
}

interface SaleProductsProps {
    value: SaleSchema['productsOnSale']
    onSelect: (products: SelectedProduct[], saleId?: number) => void
    saleId?: number
}

const SaleProducts = ({ value, onSelect, saleId }: SaleProductsProps) => {
    const { data: products } = useProducts()

    const productsNormalized = useMemo(() => {
        return products?.map(p => {
            const find = value?.find((i: any) => i.productId === p.id)
            if (!find) return p
            return {
                ...p,
                order: { price: find.price, quantity: find.quantity }
            }
        })
    }, [products])

    return (
        <FormItem>
            {productsNormalized?.length && products?.length &&
                <ProviderProducts
                    data={productsNormalized}
                    // onSelect={console.log}
                    onSelect={(products) => onSelect(products, saleId)}
                >
                    <ViewProducts>
                        <Header>
                            <HeaderSearch />
                        </Header>
                        <MoreActions>
                            {() => <ActionItem>Mais</ActionItem>}
                        </MoreActions>
                    </ViewProducts>
                </ProviderProducts>
            }
            <FormMessage />
        </FormItem>
    )
}

const MemoizedSaleProducts = memo(SaleProducts, (prev, next) => {
    // Comparação personalizada para evitar re-render desnecessário
    return prev.saleId === next.saleId &&
        prev.value.length === next.value.length;
})
