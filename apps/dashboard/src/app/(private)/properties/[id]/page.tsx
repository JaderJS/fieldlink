import { KEYS } from "@/core/keys";
import { getQueryClient } from "@/core/ssr";
import { UpsertProperty } from "@/features/properties/components/upsert.property";
import { getProperties, getPropertyById } from "@/features/properties/services/crud.properties";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function UpsertOrderPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    const queryClient = getQueryClient()
    await Promise.all([
        queryClient.fetchQuery({
            queryKey: KEYS.property.getById(Number(id)),
            queryFn: getPropertyById
        }),
    ])


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UpsertProperty property={{ id: Number(id) }} />
        </HydrationBoundary>
    )
}