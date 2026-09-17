import { KEYS } from "@/core/keys";
import { getQueryClient } from "@/core/ssr";
import { getBanks } from "@/features/adm/services/bank.crud";
import { getPeriods } from "@/features/adm/services/period.crud";
import { getClients } from "@/features/client/service/client.crud";
import { UpsertOrder } from "@/features/order/components/upsert.order";
import { getOrderById } from "@/features/order/services/crud.order";
import { getCategories } from "@/features/product/services/category.crud";
import { getProducts } from "@/features/product/services/crud";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function UpsertOrderPage({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id

    const queryClient = getQueryClient()
    await Promise.all([
        queryClient.fetchQuery({
            queryKey: KEYS.order.getById(Number(id)),
            queryFn: getOrderById
        }),
        queryClient.fetchQuery({
            queryKey: KEYS.client.getAll(),
            queryFn: getClients,
        }),
        queryClient.fetchQuery({
            queryKey: KEYS.bank.getAll(),
            queryFn: getBanks,
        }),
        queryClient.fetchQuery({
            queryKey: KEYS.period.getAll(),
            queryFn: getPeriods,
        }),
        queryClient.fetchQuery({
            queryKey: KEYS.product.getAll(),
            queryFn: getProducts,
        }),
        queryClient.fetchQuery({
            queryKey: KEYS.productCategories.getAll(),
            queryFn: getCategories,
        })
    ])

    // console.log('prefetched order:', queryClient.getQueryData(KEYS.order.getById(Number(id))))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UpsertOrder id={Number(id)} />
        </HydrationBoundary>
    )
}