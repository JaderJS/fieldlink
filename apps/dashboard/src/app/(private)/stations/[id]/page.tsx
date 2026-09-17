import { KEYS } from "@/core/keys";
import { getQueryClient } from "@/core/ssr";
import { getBanks } from "@/features/adm/services/bank.crud";
import { getPeriods } from "@/features/adm/services/period.crud";
import { getClients } from "@/features/client/service/client.crud";
import { UpsertOrder } from "@/features/order/components/upsert.order";
import { getOrderById } from "@/features/order/services/crud.order";
import { getCategories } from "@/features/product/services/category.crud";
import { getProducts } from "@/features/product/services/crud";
import { UpsertStation } from "@/features/station/components/upsert.station";
import { getStation } from "@/features/station/services/crud.services";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function UpsertStationPage({ params }: { params: Promise<{ id: string }> }) {
    const id = Number((await params).id)


    const queryClient = getQueryClient()
    await Promise.all([
        queryClient.fetchQuery({
            queryKey: KEYS.station.getById(Number(id)),
            queryFn: getStation
        }),
    ])

    // console.log('prefetched order:', queryClient.getQueryData(KEYS.order.getById(Number(id))))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UpsertStation station={{ id }} className="p-6" />
        </HydrationBoundary>
    )
}