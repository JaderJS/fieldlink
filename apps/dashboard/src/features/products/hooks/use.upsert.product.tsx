'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { upsertProduct } from "../service/crud.product"
import { KEYS } from "@/core/keys"
import { toast } from "sonner"

export const useUpsertProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: upsertProduct,
        onSuccess: () => {
            toast.success("Salvo com sucesso")
            queryClient.invalidateQueries({ queryKey: KEYS.product.getAll() })
        }
    })
}