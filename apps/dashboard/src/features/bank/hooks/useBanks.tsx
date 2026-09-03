'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getBanks } from "../services/bank.crud"

export const useBanks = () => {
    return useQuery({
        queryKey: KEYS.bank.getAll(),
        queryFn: getBanks,
        select: data => data.banks
    })
}