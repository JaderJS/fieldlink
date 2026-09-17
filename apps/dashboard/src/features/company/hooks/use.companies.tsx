'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getCompanies } from "../services/company.crud"
import { Company } from "../types"

export const useCompanies = ({ filters }: { filters?: Partial<Company> } = {}) => {
    return useQuery({
        queryKey: KEYS.company.getAll(),
        queryFn: getCompanies,
        select: data => data.companies
    })
}