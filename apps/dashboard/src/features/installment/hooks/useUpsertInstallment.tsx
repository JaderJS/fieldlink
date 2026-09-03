'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { upsertInstallment } from "../service/crud.installments"
import { KEYS } from "@/core/keys"
import { toast } from "sonner"

export const useUpsertInstallment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: upsertInstallment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.installment.getAll(), exact: false })
            queryClient.invalidateQueries({ queryKey: KEYS.notification.getAll() })
            toast.success('Alterações salvas!')
        },
    })
}