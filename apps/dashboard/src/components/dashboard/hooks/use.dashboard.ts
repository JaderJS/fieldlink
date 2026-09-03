'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getDashboardFinance } from "../services/crud"

export const useDashboard = () => {
    return useQuery({
        queryKey: KEYS.dashboard.getAll(),
        queryFn: getDashboardFinance,
        select: data => data.dashboard
    })
}