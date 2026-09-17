import { KEYS } from "@/core/keys"
import { getQueryClient } from "@/core/ssr"
import { ViewInstallments } from "@/features/installment/components/view.installments"
import { getInstallments } from "@/features/installment/service/crud.installments"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"

export default async function InstallmentsPage() {

    const queryClient = getQueryClient()
    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: KEYS.installment.getAll(),
            queryFn: getInstallments,
        })
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ViewInstallments />
        </HydrationBoundary>
    )
}