import { KEYS } from "@/core/keys"
import { getQueryClient } from "@/core/ssr"
import { ViewOrderReport } from "@/features/order/components/report/view.order.report"
import { getOrderById } from "@/features/order/services/crud.order"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function PageOrderReport({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    const queryClient = getQueryClient()
    await Promise.all([
        queryClient.fetchQuery({
            queryKey: KEYS.order.getById(Number(id)),
            queryFn: getOrderById
        })
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ViewOrderReport order={{ id: Number(id) }} />
        </HydrationBoundary>
    )
}