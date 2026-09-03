'use client'

import { useQuery } from "@tanstack/react-query"
import { Period } from "../types"
import { KEYS } from "@/core/keys"
import { getPeriods } from "../services/periods.crud"

export const usePeriods = ({ filters }: { filters?: Partial<Period> } = {}) => {

    return useQuery({
        queryKey: KEYS.period.getAll(),
        queryFn: getPeriods,
        select: data => data.periods
    })

}