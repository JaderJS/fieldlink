import { KEYS } from "@/core/keys"
import { getQueryClient } from "@/core/ssr"
import { UpsertClient } from "@/features/client/components/upsert.client"
import { getClient } from "@/features/client/service/client.crud"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function ClientPage({ params }: { params: Promise<{ id: string }> }) {
    const id = Number((await params).id)
    const queryClient = getQueryClient()

    await Promise.all([
        queryClient.fetchQuery({
            queryKey: KEYS.client.getById(id),
            queryFn: getClient,
        })
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UpsertClient client={{ id }} />
        </HydrationBoundary>
    )
}