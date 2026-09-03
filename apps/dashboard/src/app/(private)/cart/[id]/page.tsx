import { KEYS } from "@/core/keys";
import { getQueryClient } from "@/core/ssr";
import { UpsertCart } from "@/features/cart/components/upsert.cart";
import { getCartById, getCarts } from "@/features/cart/services/crud";
import { getProducts } from "@/features/product/services/crud";
import { getSuppliers } from "@/features/supplier/service/crud";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function pageCartById({ params }: { params: Promise<{ id: string }> }) {
    const queryClient = getQueryClient()
    const id = Number((await params).id)

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: KEYS.cart.getById(id),
            queryFn: getCartById
        }),
        queryClient.prefetchQuery({
            queryKey: KEYS.product.getAll(),
            queryFn: getProducts
        }),
        queryClient.prefetchQuery({
            queryKey: KEYS.supplier.getAll(),
            queryFn: getSuppliers
        })
    ])
    
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="p-4">
                <UpsertCart cart={{ id }} />
            </div>
        </HydrationBoundary>
    )
}