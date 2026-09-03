import { KEYS } from "@/core/keys";
import { getQueryClient } from "@/core/ssr";
import { ViewCarts } from "@/features/cart/components/view.carts";
import { getCarts } from "@/features/cart/services/crud";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function pageCart() {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: KEYS.cart.getAll(),
        queryFn: getCarts
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="h-full p-4">
                <ViewCarts />
            </div>
        </HydrationBoundary>
    )
}