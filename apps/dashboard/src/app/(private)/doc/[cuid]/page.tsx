import { KEYS } from "@/core/keys"
import { getQueryClient } from "@/core/ssr"
import { UpsertDoc } from "@/features/doc/components/upsert.doc"
import { getDocByCuid } from "@/features/doc/services/crud"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function Page({ params }: { params: Promise<{ cuid: string }> }) {

    const cuid = (await params).cuid

    const queryClient = getQueryClient()

    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: KEYS.docs.getByCuid({ cuid: cuid }),
            queryFn: getDocByCuid
        }),
    ])

    return (
        <main className="p-2">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <UpsertDoc doc={{ cuid }} />
            </HydrationBoundary>
        </main>
    )
}