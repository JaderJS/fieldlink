'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteInstallment } from "../service/crud.installments"
import { KEYS } from "@/core/keys"

export const useDeleteInstallment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteInstallment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.installment.getAll() })
        }
    })
}