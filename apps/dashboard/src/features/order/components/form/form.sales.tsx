import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ActionItem, Header, HeaderSearch, MoreActions, ProviderProducts, SelectedProduct, useProducts, ViewProducts } from "@/features/products"
import { useCallback, useMemo } from "react"
import { SaleSchema, UpsertOrderSchema } from "../../schema/upsert.schema"
import { recalculateTotalFn } from "../../helpers/calc"
import { Button } from "@/components/ui/button"
import { BadgeQuestionMark, DollarSign, Trash } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { NumberField, Input as InputAria } from "react-aria-components"
import { useAuth } from "@/providers/auth"
import { FieldValues, useFieldArray, UseFormReturn } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { defaultNewSale } from "../../constants/new.order"
import { cn } from "@/lib/utils"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"

interface FormProps<T extends FieldValues> {
    form: UseFormReturn<T>
    onAutoSave: (data: T) => void
    className?: string
}

export const FormSeals = ({ form, onAutoSave, className }: FormProps<UpsertOrderSchema>) => {

    const { user, hasPermission } = useAuth()
    const sales = useFieldArray({ control: form.control, name: "sales", keyName: 'key' })

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
        form.setValue(`sales.${index}`, sale)
        recalculateTotalFn(form, { saleIndex: index })
        form.handleSubmit(onAutoSave)()
    }, [])

    if (sales.fields.length === 0) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant={"icon"}>
                        <DollarSign />
                    </EmptyMedia>
                    <EmptyTitle>Nenhuma venda direta atribuída</EmptyTitle>
                    <EmptyDescription>
                        Deseja adicionar uma nova venda a essa ordem?
                    </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                    <div className="flex gap-2">
                        <Button onClick={() => sales.append(defaultNewSale())}>Nova venda</Button>
                    </div>
                </EmptyContent>
            </Empty>
        )
    }

    return (
        <div className={cn("flex flex-col justify-start items-center gap-2", className)}>
            <Button variant={"outline"} onClick={() => sales.append(defaultNewSale())}>Nova venda</Button>
            {sales.fields.map((sale, index) => (
                <Card key={sale.key} className="w-full">
                    <CardHeader>
                        <CardTitle></CardTitle>
                        <CardDescription>{!!sale.id ? `# ${sale.id}` : ""}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <FormField
                            name={`sales.${index}.content`}
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="bg-muted rounded">
                                    {/* <Editor
                                        className="bg-muted rounded text-muted-foreground"
                                        content={field.value}
                                        onCallback={(content) => {
                                            field.onChange(content)
                                            form.handleSubmit(onAutoSave)()
                                        }}
                                    /> */}
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            name={`sales.${index}`}
                            control={form.control}
                            render={({ field }) => (
                                <SaleProducts
                                    value={field.value.productsOnSale}
                                    onSelect={(products) => handleSelect(products, index, sale.id)}
                                />
                            )}
                        />
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <FormField
                            control={form.control}
                            name={`sales.${index}.total`}
                            render={({ field }) => (
                                <FormItem className="flex gap-1 items-center">
                                    <FormLabel htmlFor={`sales.${index}.total`}>Total parcial</FormLabel>
                                    <FormControl>
                                        <NumberField
                                            {...field}
                                            onChange={(value) => {
                                                field.onChange(value)
                                                recalculateTotalFn(form, { saleIndex: index })
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
                            onClick={() => {
                                sales.remove(index)
                                recalculateTotalFn(form)
                                form.handleSubmit(onAutoSave)()
                            }}
                            disabled={!hasPermission(user, 'order', 'delete')}
                        >
                            <Trash />
                        </Button>}
                    </CardFooter>

                </Card>
            ))}

        </div>
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