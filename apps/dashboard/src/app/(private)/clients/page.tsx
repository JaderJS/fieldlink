import { KEYS } from "@/core/keys"
import { getQueryClient } from "@/core/ssr"
import { ViewClients } from "@/features/client/components/view.clients"
import { getClients } from "@/features/client/service/client.crud"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function ClientsPage() {

    const queryClient = getQueryClient()
    
    await Promise.all([
        queryClient.fetchQuery({
            queryKey: KEYS.product.getAll(),
            queryFn: getClients,
        })
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ViewClients />
        </HydrationBoundary>
    )
}