import { KEYS } from "@/core/keys"
import { getQueryClient } from "@/core/ssr"
import { getCompanies } from "@/features/company/services/company.crud"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { UpsertTransaction } from "@/features/transaction/components/upsert.transaction"
import { getTransactionById } from "@/features/transaction/services/transaction.crud"
import { getPeriods } from "@/features/period/services/periods.crud"
import { getBanks } from "@/features/bank/services/bank.crud"

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const id = Number((await params).id)

    const queryClient = getQueryClient()

    await Promise.all([
        queryClient.fetchQuery({
            queryKey: KEYS.transaction.getById(id),
            queryFn: getTransactionById
        }),
        queryClient.prefetchQuery({
            queryKey: KEYS.period.getAll(),
            queryFn: getPeriods
        }),
        queryClient.prefetchQuery({
            queryKey: KEYS.bank.getAll(),
            queryFn: getBanks
        }),
        queryClient.prefetchQuery({
            queryKey: KEYS.company.getAll(),
            queryFn: getCompanies
        }),
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UpsertTransaction transaction={{ id }} />
        </HydrationBoundary>
    )
}