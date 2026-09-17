import { KEYS } from "@/core/keys"
import { getQueryClient } from "@/core/ssr"
import { ViewStations } from "@/features/station/components/view.stations"
import { getStations } from "@/features/station/services/crud.services"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function PageStations() {


    const queryClient = getQueryClient()
    await Promise.all([
        queryClient.fetchQuery({
            queryKey: KEYS.station.getAll(),
            queryFn: getStations
        }),
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ViewStations />
        </HydrationBoundary>
    )
}