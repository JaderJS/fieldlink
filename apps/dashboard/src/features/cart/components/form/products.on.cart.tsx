import { useFieldArray, UseFormReturn } from "react-hook-form";
import { UpsertCartSchema } from "../../schema/schema.cart";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { ActionItem, Header, HeaderSearch, MoreActions, ProviderProducts, SelectedProduct, useProducts, ViewProducts } from "@/features/products";
import { useCallback } from "react";
import { recalculateTotalFn } from "../../helpers/total";

export const FormProductsOnCart = ({ form, onSave }: { form: UseFormReturn<UpsertCartSchema>, onSave: (data: any) => void }) => {

    const { data: products } = useProducts()

    const { replace: replaceProducts } = useFieldArray({ control: form.control, name: 'productsOnCart', keyName: 'key' })

    const handleSelect = useCallback((products: SelectedProduct[]) => {
        const selectedProducts = products.map(p => ({
            quantity: p.order.quantity,
            price: p.order.price,
            productId: p.id,
            cartId: form.getValues("id") || -1
        }))
        replaceProducts(selectedProducts)
        recalculateTotalFn(form)
        form.handleSubmit(onSave)()
    }, [form, onSave, replaceProducts])


    return (
        <>
            <FormField
                name="productsOnCart"
                control={form.control}
                render={({ field }) => {

                    const productsNormalized = products?.map(p => {
                        const find = field.value.find(i => i.productId === p.id)
                        if (!find) return p
                        return ({
                            ...p,
                            order: { price: find.price, quantity: find.quantity }
                        })
                    })

                    return (
                        <FormItem>
                            {productsNormalized?.length && <ProviderProducts
                                data={productsNormalized}
                                onSelect={handleSelect}
                            >
                                <ViewProducts>
                                    <Header>
                                        <HeaderSearch />
                                    </Header>
                                    <MoreActions>
                                        {() => (
                                            <ActionItem>Mais</ActionItem>
                                        )}
                                    </MoreActions>
                                </ViewProducts>
                            </ProviderProducts>}
                            <FormMessage />
                        </FormItem>
                    )
                }}
            />
        </>
    )
}