import { KEYS } from "@/core/keys";
import { getQueryClient } from "@/core/ssr";
import { getBanks } from "@/features/adm/services/bank.crud";
import { getPeriods } from "@/features/adm/services/period.crud";
import { getClients } from "@/features/client/service/client.crud";
import { UpsertEquipment } from "@/features/equipment/components/upsert.equipment";
import { getEquipment } from "@/features/equipment/services/crud.equipment";
import { UpsertOrder } from "@/features/order/components/upsert.order";
import { getOrderById } from "@/features/order/services/crud.order";
import { getCategories } from "@/features/product/services/category.crud";
import { getProducts } from "@/features/product/services/crud";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";

export default async function UpsertOrderPage({ params }: { params: Promise<{ id: string }> }) {
    const id = Number((await params).id)


    const queryClient = getQueryClient()
    await Promise.all([
        queryClient.fetchQuery({
            queryKey: KEYS.equipment.getById(Number(id)),
            queryFn: getEquipment
        }),
    ])

    // console.log('prefetched order:', queryClient.getQueryData(KEYS.order.getById(Number(id))))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UpsertEquipment equipment={{ id }} />
        </HydrationBoundary>
    )
}