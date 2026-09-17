import { KEYS } from "@/core/keys"
import { getQueryClient } from "@/core/ssr"
import { ViewCardProducts } from "@/features/product/components/view.cards.product"
import { getProducts } from "@/features/product/services/crud"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function Page() {

    const queryClient = getQueryClient()
    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: KEYS.product.getAll(),
            queryFn: getProducts
        })
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="p-2">
                <ViewCardProducts />
            </div>
        </HydrationBoundary>
    )
}