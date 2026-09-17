'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getDocs } from "../services/crud"
import { api } from "@/core/api"

export const useDocs = ({ filters }: { filters?: Partial<Doc> } = {}) => {
    return useQuery({
        queryKey: KEYS.docs.getAll(),
        queryFn: getDocs,
        select: data => data.docs
    })
}