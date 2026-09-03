import { KEYS } from "@/core/keys"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { getQueryClient } from "@/core/ssr"
import { ViewTransactions } from "@/features/transaction/components/view.transactions"
import { getTransactions } from "@/features/transaction/services/transaction.crud"
import { getPeriods } from "@/features/period/services/periods.crud"
import { getCompanies } from "@/features/company/services/company.crud"
import { getBanks } from "@/features/bank/services/bank.crud"

export default async function PageViewTransaction() {

    const queryClient = getQueryClient()
    await Promise.all([
        queryClient.prefetchQuery({
            queryKey: KEYS.transaction.getAll(),
            queryFn: getTransactions
        }),
        queryClient.prefetchQuery({
            queryKey: KEYS.period.getAll(),
            queryFn: getPeriods
        }),
        queryClient.prefetchQuery({
            queryKey: KEYS.company.getAll(),
            queryFn: getCompanies
        }),
        queryClient.prefetchQuery({
            queryKey: KEYS.bank.getAll(),
            queryFn: getBanks
        })
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="p-4">
                <ViewTransactions />
            </div>
        </HydrationBoundary>
    )

}