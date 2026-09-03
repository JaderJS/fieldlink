import { KEYS } from "@/core/keys"
import { getQueryClient } from "@/core/ssr"
import { ViewOrders } from "@/features/order/components/view.order"
import { getOrders } from "@/features/order/services/crud.order"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function ViewOrder() {

    const queryClient = getQueryClient()

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: KEYS.order.getAll(),
            queryFn: getOrders
        }),
    ])

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ViewOrders />
            </HydrationBoundary>
        </>
    )
}