'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useUpsertOrder } from "../hooks/use.upsert.order"
import { useBanks } from "@/features/bank/hooks/useBanks"
import { usePeriods } from "@/features/period/hooks/usePeriods"
import { defaultNewOrder } from "../constants/new.order"
import { toast } from "sonner"

export const CreateOrderBtn = () => {
    const { push } = useRouter()

    const { data: banks } = useBanks()
    const { data: periods } = usePeriods()

    const { mutateAsync: upsertOrderFn } = useUpsertOrder()

    const handleCreate = () => {
        if (!banks?.length || !periods?.length) {
            return
        }
        const promise = upsertOrderFn({
            ...defaultNewOrder({ bankId: banks?.[0].id, clientId: -1, companyId: -1 }),
        }).then((resp) => {
            push(`/order/${resp.order.id}`)
        })

        toast.promise(promise, { loading: "Criando nova ordem..." })
    }

    return (
        <Button onClick={handleCreate}>Criar nova ordem de serviço</Button>
    )
}