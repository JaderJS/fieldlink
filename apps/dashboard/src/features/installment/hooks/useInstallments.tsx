'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getInstallments } from "../service/crud.installments"
import { Installment } from "../types"

interface UseInstallmentsProps {
    filters?: Partial<Installment>,
    transaction?: { id: number }
}

export const useInstallments = ({ filters, transaction }: UseInstallmentsProps = {}) => {
    return useQuery({
        queryKey: KEYS.installment.getAll({ transaction }),
        queryFn: getInstallments,
        select: data => data.installments
    })
}